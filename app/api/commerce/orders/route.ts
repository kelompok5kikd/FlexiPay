import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserForSession } from "@/lib/auth-db";
import { getUserCommerceOrders } from "@/lib/commerce-db";
export async function GET(){const jar=await cookies(),user=await getUserForSession(jar.get("flexipay_session")?.value);if(!user)return NextResponse.json({error:"Silakan login."},{status:401});return NextResponse.json({orders:await getUserCommerceOrders(user.id)})}
