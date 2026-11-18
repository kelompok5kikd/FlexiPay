import "server-only";
import "@/lib/auth-db";
import "@/lib/credit-applications";
import { DatabaseSync as NodeDatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from "node:crypto";
import { verifyUserPin } from "@/lib/auth-db";

type Statement={run:(...args:unknown[])=>{changes:number};get:(...args:unknown[])=>Record<string,unknown>|undefined;all:(...args:unknown[])=>Record<string,unknown>[]};
type Database={exec:(sql:string)=>void;prepare:(sql:string)=>Statement};
const DatabaseSync=NodeDatabaseSync as unknown as new(path:string)=>Database;
const dataDirectory=join(process.cwd(),"data");mkdirSync(dataDirectory,{recursive:true});
const db=new DatabaseSync(join(dataDirectory,"flexipay.db"));
function privateRecordKey(){const key=process.env.FLEXIPAY_DATA_ENCRYPTION_KEY;if(!key||! /^[a-f0-9]{64}$/i.test(key))throw new Error("FLEXIPAY_DATA_ENCRYPTION_KEY belum dikonfigurasi.");return Buffer.from(key,"hex")}
function encryptPrivateRecord(value:unknown){const iv=randomBytes(12);const cipher=createCipheriv("aes-256-gcm",privateRecordKey(),iv);const encrypted=Buffer.concat([cipher.update(Buffer.from(JSON.stringify(value),"utf8")),cipher.final()]);return Buffer.concat([Buffer.from("FP1"),iv,cipher.getAuthTag(),encrypted]).toString("base64")}
function decryptPrivateRecord<T>(value:string):T{const encrypted=Buffer.from(value,"base64");if(encrypted.length<31||encrypted.subarray(0,3).toString()!=="FP1")throw new Error("Data transaksi terenkripsi tidak valid.");const decipher=createDecipheriv("aes-256-gcm",privateRecordKey(),encrypted.subarray(3,15));decipher.setAuthTag(encrypted.subarray(15,31));return JSON.parse(Buffer.concat([decipher.update(encrypted.subarray(31)),decipher.final()]).toString("utf8")) as T}
db.exec(`
 PRAGMA foreign_keys=ON; PRAGMA busy_timeout=10000;
 CREATE TABLE IF NOT EXISTS commerce_products(
  id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL, image_url TEXT NOT NULL,
  price INTEGER NOT NULL CHECK(price>0), stock_quantity INTEGER NOT NULL CHECK(stock_quantity>=0), is_active INTEGER NOT NULL DEFAULT 1
 );
 CREATE TABLE IF NOT EXISTS rental_owners(
  id TEXT PRIMARY KEY, owner_name TEXT NOT NULL, phone_number TEXT NOT NULL, whatsapp_number TEXT NOT NULL, email TEXT
 );
 CREATE TABLE IF NOT EXISTS rental_listings(
  id TEXT PRIMARY KEY, owner_id TEXT NOT NULL REFERENCES rental_owners(id), title TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK(property_type IN ('kos','kontrakan')), description TEXT NOT NULL,
  address_line TEXT NOT NULL, city TEXT NOT NULL, province TEXT NOT NULL, postal_code TEXT NOT NULL,
  monthly_price INTEGER NOT NULL CHECK(monthly_price>0), image_url TEXT NOT NULL, is_active INTEGER NOT NULL DEFAULT 1,
  available_from TEXT NOT NULL DEFAULT (date('now'))
 );
 CREATE TABLE IF NOT EXISTS commerce_orders(
  id TEXT PRIMARY KEY, reference_number TEXT NOT NULL UNIQUE, user_id TEXT NOT NULL REFERENCES users(id),
  order_type TEXT NOT NULL CHECK(order_type IN ('product','rental')), item_id TEXT NOT NULL,
  item_name_snapshot TEXT NOT NULL, quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity BETWEEN 1 AND 10),
  duration_months INTEGER CHECK(duration_months IS NULL OR duration_months BETWEEN 1 AND 12),
  recipient_snapshot TEXT NOT NULL, owner_snapshot TEXT, rental_start TEXT, rental_end TEXT,
  total_amount INTEGER NOT NULL CHECK(total_amount>0),
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK(status IN ('confirmed','processing','completed','cancelled')),
  idempotency_key TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
 );
 CREATE INDEX IF NOT EXISTS idx_commerce_orders_user_date ON commerce_orders(user_id,created_at DESC);
 CREATE INDEX IF NOT EXISTS idx_commerce_orders_type_date ON commerce_orders(order_type,created_at DESC);
 CREATE TABLE IF NOT EXISTS credit_limit_ledger(
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), order_id TEXT NOT NULL UNIQUE REFERENCES commerce_orders(id),
  entry_type TEXT NOT NULL CHECK(entry_type IN ('purchase','rental')), amount INTEGER NOT NULL CHECK(amount>0),
  direction TEXT NOT NULL CHECK(direction IN ('debit','credit')), balance_after INTEGER NOT NULL CHECK(balance_after>=0),
  reference_number TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
 );
 CREATE INDEX IF NOT EXISTS idx_credit_ledger_user_date ON credit_limit_ledger(user_id,created_at DESC);
 CREATE TABLE IF NOT EXISTS transaction_pin_attempts(user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, failed_count INTEGER NOT NULL DEFAULT 0, window_started_at TEXT NOT NULL);
`);

const orderColumns=db.prepare("PRAGMA table_info(commerce_orders)").all().map((column)=>String(column.name));
if(!orderColumns.includes("rental_start"))db.exec("ALTER TABLE commerce_orders ADD COLUMN rental_start TEXT");
if(!orderColumns.includes("rental_end"))db.exec("ALTER TABLE commerce_orders ADD COLUMN rental_end TEXT");

const products=[
 {id:"cat-food-pouch-001",name:"Makanan Kucing Premium 100 g",category:"Pet Supplies",description:"Pakan kering untuk kucing dewasa dengan rasa ayam.",image:"/products/cat-food-premium.svg",price:1000,stock:50},
 {id:"everyday-tote",name:"Everyday Tote Bag",category:"Accessories",description:"Tas serbaguna untuk aktivitas harian.",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85",price:189000,stock:18},
 {id:"classic-sneakers",name:"Classic Sneakers",category:"Footwear",description:"Sneakers kasual untuk gaya sehari-hari.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",price:459000,stock:12},
 {id:"minimalist-watch",name:"Minimalist Watch",category:"Accessories",description:"Jam tangan bergaya minimalis.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",price:329000,stock:10},
 {id:"urban-backpack",name:"Urban Backpack",category:"Bags",description:"Ransel ringkas untuk kerja dan perjalanan.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",price:279000,stock:15},
];
const extraProducts=[
 {id:"fp-product-01",name:'Everyday Canvas Backpack',category:'Bags',description:'Tas kanvas ringan untuk aktivitas harian.',image:"https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=1000&q=85",price:349000,stock:12},
 {id:"fp-product-02",name:'Classic Leather Wallet',category:'Accessories',description:'Dompet kulit ringkas dengan banyak slot kartu.',image:"https://images.unsplash.com/photo-1677694666910-0d61253494c4?auto=format&fit=crop&w=1000&q=85",price:229000,stock:12},
 {id:"fp-product-03",name:'Wireless Headphones',category:'Electronics',description:'Headphone nirkabel nyaman untuk bekerja dan perjalanan.',image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",price:799000,stock:12},
 {id:"fp-product-04",name:'Smart Fitness Watch',category:'Electronics',description:'Jam pintar untuk memantau aktivitas harian.',image:"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1000&q=85",price:899000,stock:12},
 {id:"fp-product-05",name:'Minimalist Sunglasses',category:'Accessories',description:'Kacamata dengan desain sederhana untuk penggunaan sehari-hari.',image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",price:279000,stock:12},
 {id:"fp-product-06",name:'Everyday Running Shoes',category:'Footwear',description:'Sepatu ringan untuk olahraga dan kegiatan luar ruang.',image:"https://images.unsplash.com/photo-1687444334081-8ca04ed2a1a3?auto=format&fit=crop&w=1000&q=85",price:629000,stock:12},
 {id:"fp-product-07",name:'Compact Travel Backpack',category:'Bags',description:'Ransel ringkas dengan kompartemen laptop.',image:"https://images.unsplash.com/photo-1622560257067-108402fcedc0?auto=format&fit=crop&w=1000&q=85",price:429000,stock:12},
 {id:"fp-product-08",name:'Insulated Water Bottle',category:'Lifestyle',description:'Botol minum tahan suhu untuk dibawa bepergian.',image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=85",price:159000,stock:12},
 {id:"fp-product-09",name:'Desk Lamp Studio',category:'Home',description:'Lampu meja dengan cahaya nyaman untuk bekerja.',image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85",price:319000,stock:12},
 {id:"fp-product-10",name:'Bluetooth Speaker Mini',category:'Electronics',description:'Speaker portabel dengan suara jernih.',image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1000&q=85",price:389000,stock:12},
 {id:"fp-product-11",name:'Everyday Crossbody Bag',category:'Bags',description:'Tas selempang praktis untuk membawa barang penting.',image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",price:299000,stock:12},
 {id:"fp-product-12",name:'Classic Analog Watch',category:'Accessories',description:'Jam analog dengan tampilan bersih dan elegan.',image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",price:549000,stock:12},
 {id:"fp-product-13",name:'Urban Slip-on Shoes',category:'Footwear',description:'Sepatu slip-on nyaman untuk perjalanan singkat.',image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=85",price:399000,stock:12},
 {id:"fp-product-14",name:'Travel Organizer Set',category:'Travel',description:'Set organizer untuk merapikan barang di koper.',image:"https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=1000&q=85",price:189000,stock:12},
 {id:"fp-product-15",name:'Wireless Mouse Pro',category:'Electronics',description:'Mouse nirkabel ergonomis untuk meja kerja.',image:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1000&q=85",price:249000,stock:12},
 {id:"fp-product-16",name:'Mechanical Keyboard Compact',category:'Electronics',description:'Keyboard mekanis ringkas untuk ruang kerja.',image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85",price:699000,stock:12},
 {id:"fp-product-17",name:'Soft Cotton Hoodie',category:'Apparel',description:'Hoodie katun lembut untuk cuaca sejuk.',image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",price:379000,stock:12},
 {id:"fp-product-18",name:'Everyday Polo Shirt',category:'Apparel',description:'Polo shirt nyaman dengan potongan kasual.',image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",price:219000,stock:12},
 {id:"fp-product-19",name:'Classic Denim Jacket',category:'Apparel',description:'Jaket denim serbaguna untuk gaya santai.',image:"https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=85",price:589000,stock:12},
 {id:"fp-product-20",name:'Running Cap',category:'Apparel',description:'Topi ringan untuk olahraga dan kegiatan luar ruang.',image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=85",price:129000,stock:12},
 {id:"fp-product-21",name:'Ceramic Coffee Set',category:'Home',description:'Set cangkir keramik untuk menikmati kopi di rumah.',image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",price:269000,stock:12},
 {id:"fp-product-22",name:'Home Aroma Diffuser',category:'Home',description:'Diffuser minimalis untuk melengkapi suasana ruangan.',image:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=85",price:339000,stock:12},
 {id:"fp-product-23",name:'Portable Power Bank',category:'Electronics',description:'Power bank praktis untuk mengisi daya saat bepergian.',image:"https://images.unsplash.com/photo-1609592806596-b43bada0f3a6?auto=format&fit=crop&w=1000&q=85",price:359000,stock:12},
 {id:"fp-product-24",name:'Charging Hub 4-Port',category:'Electronics',description:'Hub pengisian daya untuk beberapa perangkat.',image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=85",price:279000,stock:12},
 {id:"fp-product-25",name:'Leather Card Holder',category:'Accessories',description:'Tempat kartu tipis yang mudah dibawa.',image:"https://images.unsplash.com/photo-1512412046876-6b7a51e5d1c9?auto=format&fit=crop&w=1000&q=85",price:149000,stock:12},
 {id:"fp-product-26",name:'Weekend Duffel Bag',category:'Bags',description:'Tas duffel untuk perjalanan akhir pekan.',image:"https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1000&q=85",price:469000,stock:12},
 {id:"fp-product-27",name:'Everyday Sneakers White',category:'Footwear',description:'Sneakers putih untuk padu padan sehari-hari.',image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=85",price:579000,stock:12},
 {id:"fp-product-28",name:'Slip-resistant Sandals',category:'Footwear',description:'Sandal ringan dengan sol yang nyaman.',image:"https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1000&q=85",price:199000,stock:12},
 {id:"fp-product-29",name:'Insulated Lunch Box',category:'Lifestyle',description:'Kotak makan berinsulasi untuk dibawa ke kantor.',image:"https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=1000&q=85",price:239000,stock:12},
 {id:"fp-product-30",name:'Stainless Travel Tumbler',category:'Lifestyle',description:'Tumbler baja tahan karat untuk minuman favorit.',image:"https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1000&q=85",price:179000,stock:12},
 {id:"fp-product-31",name:'Compact Tablet Stand',category:'Electronics',description:'Dudukan tablet untuk meja kerja dan belajar.',image:"https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&w=1000&q=85",price:169000,stock:12},
 {id:"fp-product-32",name:'Soft Knit Throw Blanket',category:'Home',description:'Selimut rajut lembut untuk ruang santai.',image:"https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=85",price:429000,stock:12},
];
// Keep each listing tied to its curated item photo. Updating these seed rows
// also repairs images in existing local databases without changing orders.
products.push(...extraProducts);
const owners=[
 {id:"owner-cipete",name:"Raka Pratama",phone:"081234567801",wa:"6281234567801",email:"raka.pemilik@example.id"},
 {id:"owner-sidoarjo",name:"Maya Putri",phone:"081234567802",wa:"6281234567802",email:"maya.pemilik@example.id"},
 {id:"owner-cibiru",name:"Dimas Saputra",phone:"081234567803",wa:"6281234567803",email:"dimas.pemilik@example.id"},
 {id:"owner-setiabudi",name:"Nadia Rahma",phone:"081234567804",wa:"6281234567804",email:"nadia.pemilik@example.id"},
];
const rentals=[
 {id:"kontrakan-asri-cipete",owner:"owner-cipete",title:"Kontrakan Asri Cipete",type:"kontrakan",description:"Rumah nyaman dengan halaman hijau, ruang keluarga luas, dan akses mudah ke transportasi umum.",address:"Jl. Damai Raya No. 19",city:"Jakarta Selatan",province:"DKI Jakarta",postal:"12410",price:5800000,image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"},
 {id:"kontrakan-sidoarjo-garden",owner:"owner-sidoarjo",title:"Kontrakan Sidoarjo Garden",type:"kontrakan",description:"Hunian modern dengan pencahayaan alami dan halaman kecil untuk keluarga.",address:"Jl. Taman Pinang Indah No. 22",city:"Sidoarjo",province:"Jawa Timur",postal:"61215",price:3000000,image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"},
 {id:"kontrakan-taman-cibiru",owner:"owner-cibiru",title:"Kontrakan Taman Cibiru",type:"kontrakan",description:"Kontrakan dengan ruang terbuka, area keluarga, dan lingkungan yang tenang.",address:"Jl. Manisi No. 14",city:"Bandung",province:"Jawa Barat",postal:"40614",price:2800000,image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"},
 {id:"kost-mentari-setiabudi",owner:"owner-setiabudi",title:"Kost Mentari Setiabudi",type:"kos",description:"Kamar kos furnished dengan ruang bersama nyaman dan akses internet.",address:"Jl. Setiabudi Tengah No. 7",city:"Jakarta Selatan",province:"DKI Jakarta",postal:"12910",price:2100000,image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"},
];
const extraRentals=[
 {id:'kos-mentari-depok',owner:"owner-kos-mentari-depok",title:'Kost Mentari Margonda',type:'kos',description:'Kamar furnished dengan akses mudah ke kampus dan transportasi.',address:'Jl. Margonda Raya No. 88',city:'Depok',province:'Jawa Barat',postal:'16424',price:1850000,image:"https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-paviliun-tebet',owner:"owner-kos-paviliun-tebet",title:'Kost Paviliun Tebet',type:'kos',description:'Kamar nyaman di lingkungan tenang dengan area bersama.',address:'Jl. Tebet Barat Dalam No. 16',city:'Jakarta Selatan',province:'DKI Jakarta',postal:'12810',price:2350000,image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-pinus-jogja',owner:"owner-kos-pinus-jogja",title:'Kost Pinus Yogyakarta',type:'kos',description:'Kamar terang dengan meja belajar dan akses internet.',address:'Jl. Gejayan No. 21',city:'Yogyakarta',province:'DI Yogyakarta',postal:'55281',price:1450000,image:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-melati-bekasi',owner:"owner-kontrakan-melati-bekasi",title:'Kontrakan Melati Bekasi',type:'kontrakan',description:'Rumah keluarga dengan halaman depan dan dua kamar.',address:'Jl. Kemang Pratama No. 12',city:'Bekasi',province:'Jawa Barat',postal:'17116',price:3200000,image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-kemang-baru',owner:"owner-kos-kemang-baru",title:'Kost Kemang Baru',type:'kos',description:'Kamar pribadi dekat pusat kuliner dan perkantoran.',address:'Jl. Bangka Raya No. 5',city:'Jakarta Selatan',province:'DKI Jakarta',postal:'12720',price:2800000,image:"https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-sakura-bogor',owner:"owner-kontrakan-sakura-bogor",title:'Kontrakan Sakura Bogor',type:'kontrakan',description:'Rumah sejuk dengan ruang keluarga dan parkir kendaraan.',address:'Jl. Pajajaran Indah No. 31',city:'Bogor',province:'Jawa Barat',postal:'16143',price:3700000,image:"https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-pondok-indah',owner:"owner-kos-pondok-indah",title:'Kost Pondok Indah Residence',type:'kos',description:'Kamar berperabot dengan fasilitas dapur bersama.',address:'Jl. Radio Dalam No. 44',city:'Jakarta Selatan',province:'DKI Jakarta',postal:'12140',price:2600000,image:"https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-citra-depok',owner:"owner-kontrakan-citra-depok",title:'Kontrakan Citra Depok',type:'kontrakan',description:'Hunian praktis untuk keluarga kecil di area perumahan.',address:'Jl. Nusantara No. 27',city:'Depok',province:'Jawa Barat',postal:'16432',price:2950000,image:"https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-sukajadi-bandung',owner:"owner-kos-sukajadi-bandung",title:'Kost Sukajadi Bandung',type:'kos',description:'Kamar dekat pusat kota dengan ruang belajar pribadi.',address:'Jl. Sukajadi No. 102',city:'Bandung',province:'Jawa Barat',postal:'40162',price:1700000,image:"https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-dago-asri',owner:"owner-kontrakan-dago-asri",title:'Kontrakan Dago Asri',type:'kontrakan',description:'Rumah dengan suasana sejuk dan akses ke area Dago.',address:'Jl. Tubagus Ismail No. 9',city:'Bandung',province:'Jawa Barat',postal:'40134',price:4100000,image:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-karang-malang',owner:"owner-kos-karang-malang",title:'Kost Karang Malang',type:'kos',description:'Kamar sederhana nyaman dekat area pendidikan.',address:'Jl. Soekarno Hatta No. 15',city:'Malang',province:'Jawa Timur',postal:'65141',price:1350000,image:"https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-sawojajar',owner:"owner-kontrakan-sawojajar",title:'Kontrakan Sawojajar',type:'kontrakan',description:'Rumah dengan dua kamar dan akses jalan lingkungan.',address:'Jl. Danau Toba No. 8',city:'Malang',province:'Jawa Timur',postal:'65139',price:2600000,image:"https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-gubeng-surabaya',owner:"owner-kos-gubeng-surabaya",title:'Kost Gubeng Residence',type:'kos',description:'Kamar furnished dengan area komunal dan laundry.',address:'Jl. Gubeng Kertajaya No. 33',city:'Surabaya',province:'Jawa Timur',postal:'60282',price:1950000,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-rungkut',owner:"owner-kontrakan-rungkut",title:'Kontrakan Rungkut Harmoni',type:'kontrakan',description:'Hunian keluarga dekat kawasan perkantoran Rungkut.',address:'Jl. Rungkut Asri No. 20',city:'Surabaya',province:'Jawa Timur',postal:'60293',price:3300000,image:"https://images.unsplash.com/photo-1783125127199-860da9744dcc?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-pasteur',owner:"owner-kos-pasteur",title:'Kost Pasteur Bandung',type:'kos',description:'Kamar nyaman dekat akses tol dan fasilitas umum.',address:'Jl. Dr. Djunjunan No. 18',city:'Bandung',province:'Jawa Barat',postal:'40173',price:2100000,image:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-cibubur',owner:"owner-kontrakan-cibubur",title:'Kontrakan Cibubur Garden',type:'kontrakan',description:'Rumah dengan teras dan lingkungan perumahan yang tertata.',address:'Jl. Alternatif Cibubur No. 40',city:'Bekasi',province:'Jawa Barat',postal:'17435',price:4500000,image:"https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-cilandak',owner:"owner-kos-cilandak",title:'Kost Cilandak Corner',type:'kos',description:'Kamar modern dengan akses transportasi dan pusat belanja.',address:'Jl. Cilandak KKO No. 11',city:'Jakarta Selatan',province:'DKI Jakarta',postal:'12560',price:2450000,image:"https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-kelapa-gading',owner:"owner-kontrakan-kelapa-gading",title:'Kontrakan Kelapa Gading',type:'kontrakan',description:'Rumah rapi untuk keluarga dengan akses fasilitas kota.',address:'Jl. Boulevard Timur No. 7',city:'Jakarta Utara',province:'DKI Jakarta',postal:'14240',price:5400000,image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-pamulang',owner:"owner-kos-pamulang",title:'Kost Pamulang Square',type:'kos',description:'Kamar berperabot dekat area kampus dan transportasi.',address:'Jl. Siliwangi No. 29',city:'Tangerang Selatan',province:'Banten',postal:'15417',price:1550000,image:"https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-bintaro',owner:"owner-kontrakan-bintaro",title:'Kontrakan Bintaro Residence',type:'kontrakan',description:'Rumah nyaman dengan ruang keluarga dan carport.',address:'Jl. Bintaro Utama No. 52',city:'Tangerang Selatan',province:'Banten',postal:'15224',price:4800000,image:"https://images.unsplash.com/photo-1748063578185-3d68121b11ff?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-cicendo',owner:"owner-kos-cicendo",title:'Kost Cicendo',type:'kos',description:'Kamar dengan jendela besar dan ruang bersama.',address:'Jl. Arjuna No. 17',city:'Bandung',province:'Jawa Barat',postal:'40172',price:1600000,image:"https://images.unsplash.com/photo-1600210491040-6f65a1a6f127?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-sleman',owner:"owner-kontrakan-sleman",title:'Kontrakan Sleman Asri',type:'kontrakan',description:'Rumah sederhana dengan halaman kecil di lingkungan tenang.',address:'Jl. Kaliurang Km 7 No. 14',city:'Sleman',province:'DI Yogyakarta',postal:'55581',price:2800000,image:"https://images.unsplash.com/photo-1766603636700-e9d80473f40f?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-seturan',owner:"owner-kos-seturan",title:'Kost Seturan Living',type:'kos',description:'Kamar furnished dengan dapur bersama dan area parkir.',address:'Jl. Seturan Raya No. 6',city:'Sleman',province:'DI Yogyakarta',postal:'55281',price:1650000,image:"https://images.unsplash.com/photo-1723470917581-1afc06ba49ec?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-denpasar',owner:"owner-kontrakan-denpasar",title:'Kontrakan Denpasar Timur',type:'kontrakan',description:'Hunian dengan dua kamar dan akses dekat pusat kota.',address:'Jl. Gatot Subroto No. 25',city:'Denpasar',province:'Bali',postal:'80239',price:3600000,image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-renon',owner:"owner-kos-renon",title:'Kost Renon Garden',type:'kos',description:'Kamar berperabot di lingkungan yang nyaman dan rindang.',address:'Jl. Tukad Yeh Aya No. 13',city:'Denpasar',province:'Bali',postal:'80226',price:2200000,image:"https://images.unsplash.com/photo-1615749250437-8f3fd29f9118?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-medan-baru',owner:"owner-kontrakan-medan-baru",title:'Kontrakan Medan Baru',type:'kontrakan',description:'Rumah keluarga dengan ruang luas dan halaman kecil.',address:'Jl. Iskandar Muda No. 36',city:'Medan',province:'Sumatera Utara',postal:'20154',price:3400000,image:"https://images.unsplash.com/photo-1600573472550-8090b5e0745f?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-setiabudi-medan',owner:"owner-kos-setiabudi-medan",title:'Kost Setiabudi Medan',type:'kos',description:'Kamar nyaman dekat kampus dan fasilitas harian.',address:'Jl. Setiabudi No. 48',city:'Medan',province:'Sumatera Utara',postal:'20132',price:1400000,image:"https://images.unsplash.com/photo-1692735067981-3b06067932b8?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-panakkukang',owner:"owner-kontrakan-panakkukang",title:'Kontrakan Panakkukang',type:'kontrakan',description:'Rumah dengan akses mudah ke pusat aktivitas kota.',address:'Jl. Adhyaksa No. 19',city:'Makassar',province:'Sulawesi Selatan',postal:'90231',price:3150000,image:"https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-tamalanrea',owner:"owner-kos-tamalanrea",title:'Kost Tamalanrea',type:'kos',description:'Kamar sederhana furnished dengan area parkir.',address:'Jl. Perintis Kemerdekaan No. 32',city:'Makassar',province:'Sulawesi Selatan',postal:'90245',price:1250000,image:"https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-palembang',owner:"owner-kontrakan-palembang",title:'Kontrakan Ilir Barat',type:'kontrakan',description:'Hunian keluarga dengan area depan dan akses kendaraan.',address:'Jl. Demang Lebar Daun No. 23',city:'Palembang',province:'Sumatera Selatan',postal:'30137',price:2900000,image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"},
 {id:'kos-sukajadi-pekanbaru',owner:"owner-kos-sukajadi-pekanbaru",title:'Kost Sukajadi Pekanbaru',type:'kos',description:'Kamar furnished dekat fasilitas umum dan pusat kota.',address:'Jl. Tuanku Tambusai No. 41',city:'Pekanbaru',province:'Riau',postal:'28126',price:1500000,image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0b?auto=format&fit=crop&w=1200&q=85"},
 {id:'kontrakan-samarinda',owner:"owner-kontrakan-samarinda",title:'Kontrakan Samarinda Seberang',type:'kontrakan',description:'Rumah dengan ruang keluarga dan lingkungan yang tenang.',address:'Jl. Bung Tomo No. 10',city:'Samarinda',province:'Kalimantan Timur',postal:'75242',price:2750000,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159e?auto=format&fit=crop&w=1200&q=85"},
];
rentals.push(...extraRentals);
for(const p of products){db.prepare(`INSERT OR IGNORE INTO commerce_products(id,name,category,description,image_url,price,stock_quantity) VALUES(?,?,?,?,?,?,?)`).run(p.id,p.name,p.category,p.description,p.image,p.price,p.stock);if(p.id.startsWith("fp-product-"))db.prepare("UPDATE commerce_products SET image_url=? WHERE id=?").run(p.image,p.id)}
// Keep the first 12 added items alongside the original four. The remaining
// imported rows stay stored but hidden so order references remain valid.
for(const [index,product] of extraProducts.entries())db.prepare("UPDATE commerce_products SET is_active=? WHERE id=?").run(index<12?1:0,product.id);
for(const r of extraRentals){const n=String(extraRentals.indexOf(r)+1).padStart(2,"0");owners.push({id:`owner-${r.id}`,name:`Pemilik ${r.title}`,phone:`080000000${n}`,wa:`628000000${n}`,email:`pemilik${n}@contoh.flexipay.invalid`})}
for(const o of owners)db.prepare(`INSERT OR IGNORE INTO rental_owners(id,owner_name,phone_number,whatsapp_number,email) VALUES(?,?,?,?,?)`).run(o.id,o.name,o.phone,o.wa,o.email);
for(const r of rentals){db.prepare(`INSERT OR IGNORE INTO rental_listings(id,owner_id,title,property_type,description,address_line,city,province,postal_code,monthly_price,image_url) VALUES(?,?,?,?,?,?,?,?,?,?,?)`).run(r.id,r.owner,r.title,r.type,r.description,r.address,r.city,r.province,r.postal,r.price,r.image);if(extraRentals.some(seed=>seed.id===r.id))db.prepare("UPDATE rental_listings SET image_url=? WHERE id=?").run(r.image,r.id)}
for(const [index,rental] of extraRentals.entries())db.prepare("UPDATE rental_listings SET is_active=? WHERE id=?").run(index<12?1:0,rental.id);

export type CatalogProduct={id:string;name:string;category:string;description:string;imageUrl:string;price:number;stock:number};
export type RentalListing={id:string;ownerId:string;title:string;propertyType:string;description:string;addressLine:string;city:string;province:string;postalCode:string;monthlyPrice:number;imageUrl:string;ownerName:string;ownerPhone:string;whatsappNumber:string};
function mapProduct(r:Record<string,unknown>):CatalogProduct{return{id:String(r.id),name:String(r.name),category:String(r.category),description:String(r.description),imageUrl:String(r.image_url),price:Number(r.price),stock:Number(r.stock_quantity)}}
function mapRental(r:Record<string,unknown>):RentalListing{return{id:String(r.id),ownerId:String(r.owner_id),title:String(r.title),propertyType:String(r.property_type),description:String(r.description),addressLine:String(r.address_line),city:String(r.city),province:String(r.province),postalCode:String(r.postal_code),monthlyPrice:Number(r.monthly_price),imageUrl:String(r.image_url),ownerName:String(r.owner_name),ownerPhone:String(r.phone_number),whatsappNumber:String(r.whatsapp_number)}}
export function getCommerceCatalog(){return{products:db.prepare("SELECT * FROM commerce_products WHERE is_active=1 AND stock_quantity>0 ORDER BY name").all().map(mapProduct),rentals:db.prepare(`SELECT rental_listings.*,rental_owners.owner_name,rental_owners.phone_number,rental_owners.whatsapp_number FROM rental_listings JOIN rental_owners ON rental_owners.id=rental_listings.owner_id WHERE rental_listings.is_active=1 AND date(rental_listings.available_from)<=date('now') AND NOT EXISTS (SELECT 1 FROM commerce_orders WHERE commerce_orders.order_type='rental' AND commerce_orders.item_id=rental_listings.id AND commerce_orders.status IN ('confirmed','processing') AND commerce_orders.rental_start<=date('now') AND commerce_orders.rental_end>date('now')) ORDER BY rental_listings.title`).all().map(mapRental)}}
export function getCatalogProduct(id:string){const row=db.prepare("SELECT * FROM commerce_products WHERE id=? AND is_active=1 AND stock_quantity>0").get(id);return row?mapProduct(row):null}
export function getRentalListing(id:string){const row=db.prepare(`SELECT rental_listings.*,rental_owners.owner_name,rental_owners.phone_number,rental_owners.whatsapp_number FROM rental_listings JOIN rental_owners ON rental_owners.id=rental_listings.owner_id WHERE rental_listings.id=? AND rental_listings.is_active=1 AND date(rental_listings.available_from)<=date('now') AND NOT EXISTS (SELECT 1 FROM commerce_orders WHERE commerce_orders.order_type='rental' AND commerce_orders.item_id=rental_listings.id AND commerce_orders.status IN ('confirmed','processing') AND commerce_orders.rental_start<=date('now') AND commerce_orders.rental_end>date('now'))`).get(id);return row?mapRental(row):null}

export function getAvailableCredit(userId:string){const approved=db.prepare(`SELECT approved_limit FROM credit_applications WHERE user_id=? AND status='approved' ORDER BY reviewed_at DESC LIMIT 1`).get(userId);if(!approved)return 0;const ledger=db.prepare("SELECT COALESCE(SUM(CASE direction WHEN 'debit' THEN amount ELSE -amount END),0) AS spent FROM credit_limit_ledger WHERE user_id=?").get(userId);return Math.max(0,Number(approved.approved_limit)-Number(ledger?.spent??0))}
export type AdminCommerceOrder={id:string;referenceNumber:string;userId:string;userEmail:string;fullName:string;orderType:string;itemName:string;quantity:number;durationMonths:number|null;recipient:Record<string,unknown>;owner:Record<string,unknown>|null;totalAmount:number;status:string;createdAt:string};
export function getAdminCommerceOrders():AdminCommerceOrder[]{return db.prepare(`SELECT commerce_orders.*,users.email AS user_email,users.full_name FROM commerce_orders JOIN users ON users.id=commerce_orders.user_id ORDER BY commerce_orders.created_at DESC`).all().map(r=>({id:String(r.id),referenceNumber:String(r.reference_number),userId:String(r.user_id),userEmail:String(r.user_email),fullName:String(r.full_name),orderType:String(r.order_type),itemName:String(r.item_name_snapshot),quantity:Number(r.quantity),durationMonths:r.duration_months==null?null:Number(r.duration_months),recipient:decryptPrivateRecord<Record<string,unknown>>(String(r.recipient_snapshot)),owner:r.owner_snapshot?decryptPrivateRecord<Record<string,unknown>>(String(r.owner_snapshot)):null,totalAmount:Number(r.total_amount),status:String(r.status),createdAt:String(r.created_at)}))}
export type UserCommerceOrder=Omit<AdminCommerceOrder,"userId"|"userEmail"|"fullName">;
export function getUserCommerceOrders(userId:string):UserCommerceOrder[]{return db.prepare(`SELECT * FROM commerce_orders WHERE user_id=? ORDER BY created_at DESC`).all(userId).map(r=>({id:String(r.id),referenceNumber:String(r.reference_number),orderType:String(r.order_type),itemName:String(r.item_name_snapshot),quantity:Number(r.quantity),durationMonths:r.duration_months==null?null:Number(r.duration_months),recipient:decryptPrivateRecord<Record<string,unknown>>(String(r.recipient_snapshot)),owner:r.owner_snapshot?decryptPrivateRecord<Record<string,unknown>>(String(r.owner_snapshot)):null,totalAmount:Number(r.total_amount),status:String(r.status),createdAt:String(r.created_at)}))}

export type CheckoutInput={userId:string;kind:"product"|"rental";itemId:string;quantity:number;durationMonths:number|null;idempotencyKey:string;pin:string;recipient?:{name:string;phone:string;email:string;address:string;postalCode:string}};
export function submitCommerceCheckout(input:CheckoutInput){
 const prior=db.prepare("SELECT * FROM commerce_orders WHERE idempotency_key=? AND user_id=?").get(input.idempotencyKey,input.userId);
 if(prior)return{success:true as const,referenceNumber:String(prior.reference_number),totalAmount:Number(prior.total_amount),availableLimit:getAvailableCredit(input.userId),whatsappNumber:prior.owner_snapshot?decryptPrivateRecord<{whatsappNumber:string}>(String(prior.owner_snapshot)).whatsappNumber:null};
 db.exec("BEGIN IMMEDIATE");
 try{
  const lockedPrior=db.prepare("SELECT * FROM commerce_orders WHERE idempotency_key=? AND user_id=?").get(input.idempotencyKey,input.userId);
  if(lockedPrior){db.exec("COMMIT");return{success:true as const,referenceNumber:String(lockedPrior.reference_number),totalAmount:Number(lockedPrior.total_amount),availableLimit:getAvailableCredit(input.userId),whatsappNumber:lockedPrior.owner_snapshot?decryptPrivateRecord<{whatsappNumber:string}>(String(lockedPrior.owner_snapshot)).whatsappNumber:null}}
  let item:Record<string,unknown>|undefined;let total=0;let ownerSnapshot:Record<string,unknown>|null=null;let name="";
  if(input.kind==="product"){
   if(!Number.isInteger(input.quantity)||input.quantity<1||input.quantity>10)throw new CommerceFailure("invalid");
   item=db.prepare("SELECT * FROM commerce_products WHERE id=? AND is_active=1").get(input.itemId);if(!item||Number(item.stock_quantity)<input.quantity)throw new CommerceFailure("unavailable");
   total=Number(item.price)*input.quantity;name=String(item.name);
   if(!input.recipient||Object.values(input.recipient).some(v=>!String(v).trim())||!/^[0-9]{5,10}$/.test(input.recipient.postalCode))throw new CommerceFailure("invalid");
  }else{
   if(!Number.isInteger(input.durationMonths)||Number(input.durationMonths)<1||Number(input.durationMonths)>12)throw new CommerceFailure("invalid");
   item=db.prepare(`SELECT rental_listings.*,rental_owners.owner_name,rental_owners.phone_number,rental_owners.whatsapp_number,rental_owners.email AS owner_email FROM rental_listings JOIN rental_owners ON rental_owners.id=rental_listings.owner_id WHERE rental_listings.id=? AND rental_listings.is_active=1 AND date(rental_listings.available_from)<=date('now')`).get(input.itemId);
   if(!item)throw new CommerceFailure("unavailable");
   const today=new Date().toISOString().slice(0,10);const end=new Date(Date.UTC(new Date(today).getUTCFullYear(),new Date(today).getUTCMonth()+Number(input.durationMonths),new Date(today).getUTCDate())).toISOString().slice(0,10);
   const conflict=db.prepare(`SELECT id FROM commerce_orders WHERE order_type='rental' AND item_id=? AND status IN ('confirmed','processing') AND rental_start<? AND rental_end>?`).get(input.itemId,end,today);
   if(conflict)throw new CommerceFailure("unavailable");
   total=Number(item.monthly_price)*Number(input.durationMonths);name=String(item.title);
   ownerSnapshot={name:String(item.owner_name),phone:String(item.phone_number),whatsappNumber:String(item.whatsapp_number),email:String(item.owner_email),address:`${item.address_line}, ${item.city}, ${item.province} ${item.postal_code}`};
  }
  const available=getAvailableCredit(input.userId);
  if(available<total)throw new CommerceFailure("limit",available);
  const pinAttempt=db.prepare("SELECT failed_count,window_started_at FROM transaction_pin_attempts WHERE user_id=?").get(input.userId);const withinWindow=pinAttempt&&Date.now()-new Date(String(pinAttempt.window_started_at)).getTime()<15*60*1000;
  if(withinWindow&&Number(pinAttempt.failed_count)>=5)throw new CommerceFailure("pin_locked");
  if(!verifyUserPin(input.userId,input.pin)){
   const count=withinWindow?Number(pinAttempt!.failed_count)+1:1;db.prepare(`INSERT INTO transaction_pin_attempts(user_id,failed_count,window_started_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET failed_count=excluded.failed_count,window_started_at=excluded.window_started_at`).run(input.userId,count,withinWindow?String(pinAttempt!.window_started_at):new Date().toISOString());db.exec("COMMIT");return{success:false as const,reason:count>=5?"pin_locked" as const:"pin" as const};
  }
  db.prepare("DELETE FROM transaction_pin_attempts WHERE user_id=?").run(input.userId);
  const id=randomUUID();const reference=`FP-${input.kind==="product"?"ORD":"RNT"}-${randomUUID().slice(0,8).toUpperCase()}`;
  const recipient=input.kind==="product"?{...input.recipient}:{};
  const rentalStart=input.kind==="rental"?new Date().toISOString().slice(0,10):null;
  let rentalEnd:string|null=null;
  if(input.kind==="rental"&&input.durationMonths){const start=new Date(),end=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+input.durationMonths,start.getUTCDate()));rentalEnd=end.toISOString().slice(0,10)}
  db.prepare(`INSERT INTO commerce_orders(id,reference_number,user_id,order_type,item_id,item_name_snapshot,quantity,duration_months,recipient_snapshot,owner_snapshot,rental_start,rental_end,total_amount,status,idempotency_key) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(id,reference,input.userId,input.kind,input.itemId,name,input.kind==="product"?input.quantity:1,input.durationMonths,encryptPrivateRecord(recipient),ownerSnapshot?encryptPrivateRecord(ownerSnapshot):null,rentalStart,rentalEnd,total,"confirmed",input.idempotencyKey);
  if(input.kind==="product"){const stock=db.prepare("UPDATE commerce_products SET stock_quantity=stock_quantity-? WHERE id=? AND stock_quantity>=?").run(input.quantity,input.itemId,input.quantity);if(stock.changes!==1)throw new CommerceFailure("unavailable")}
  const balanceAfter=available-total;db.prepare(`INSERT INTO credit_limit_ledger(id,user_id,order_id,entry_type,amount,direction,balance_after,reference_number) VALUES(?,?,?,?,?,?,?,?)`).run(randomUUID(),input.userId,id,input.kind==="product"?"purchase":"rental",total,"debit",balanceAfter,reference);
  db.exec("COMMIT");return{success:true as const,referenceNumber:reference,totalAmount:total,availableLimit:balanceAfter,whatsappNumber:ownerSnapshot?String(ownerSnapshot.whatsappNumber):null};
 }catch(error){try{db.exec("ROLLBACK")}catch{}if(error instanceof CommerceFailure)return{success:false as const,reason:error.reason,availableLimit:error.availableLimit};throw error}
}
class CommerceFailure extends Error{constructor(public reason:"invalid"|"unavailable"|"limit"|"pin_locked",public availableLimit?:number){super(reason)}}

export function getUserCommerceOrder(userId:string,referenceNumber:string):UserCommerceOrder|null{const row=db.prepare("SELECT * FROM commerce_orders WHERE user_id=? AND reference_number=?").get(userId,referenceNumber);if(!row)return null;return{id:String(row.id),referenceNumber:String(row.reference_number),orderType:String(row.order_type),itemName:String(row.item_name_snapshot),quantity:Number(row.quantity),durationMonths:row.duration_months==null?null:Number(row.duration_months),recipient:decryptPrivateRecord<Record<string,unknown>>(String(row.recipient_snapshot)),owner:row.owner_snapshot?decryptPrivateRecord<Record<string,unknown>>(String(row.owner_snapshot)):null,totalAmount:Number(row.total_amount),status:String(row.status),createdAt:String(row.created_at)}}
