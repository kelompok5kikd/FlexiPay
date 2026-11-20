export const postgresSchema = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'pending_verification', 'suspended')),
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
  pin_hash TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique ON users (lower(email));
CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
  expires_at TEXT NOT NULL,
  revoked_at TEXT
);
CREATE TABLE IF NOT EXISTS registration_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('account_created')),
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  birth_date TEXT,
  address TEXT,
  avatar_url TEXT,
  avatar_mime TEXT,
  avatar_data BYTEA,
  updated_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE TABLE IF NOT EXISTS admin_accounts (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  pin_hash TEXT NOT NULL,
  role_code TEXT NOT NULL DEFAULT 'super_admin' CHECK (role_code IN ('admin_viewer','credit_reviewer','credit_approver','super_admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','locked')),
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE UNIQUE INDEX IF NOT EXISTS admin_accounts_email_lower_unique ON admin_accounts (lower(email));
CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL REFERENCES admin_accounts(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT
);
CREATE TABLE IF NOT EXISTS auth_activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  admin_id TEXT REFERENCES admin_accounts(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('login_success','login_failed','logout')),
  channel TEXT NOT NULL,
  occurred_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE INDEX IF NOT EXISTS idx_auth_activity_user_time ON auth_activity_logs(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_activity_email_time ON auth_activity_logs(lower(email), occurred_at DESC);
CREATE TABLE IF NOT EXISTS admin_credit_reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  admin_id TEXT NOT NULL REFERENCES admin_accounts(id),
  review_status TEXT NOT NULL CHECK (review_status IN ('in_review','needs_revision','eligible','not_eligible')),
  approved_limit DOUBLE PRECISION CHECK (approved_limit IS NULL OR approved_limit > 0),
  decision_reason TEXT NOT NULL,
  assessment_notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE INDEX IF NOT EXISTS idx_admin_reviews_user_time ON admin_credit_reviews(user_id, created_at DESC);
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL REFERENCES admin_accounts(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE TABLE IF NOT EXISTS credit_applications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  private_data TEXT NOT NULL,
  documents TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','in_review','needs_revision','approved','rejected')),
  admin_note TEXT,
  approved_limit INTEGER CHECK (approved_limit IS NULL OR approved_limit > 0),
  approved_tenor INTEGER CHECK (approved_tenor IS NULL OR approved_tenor BETWEEN 1 AND 24),
  reviewed_by TEXT REFERENCES admin_accounts(id),
  submitted_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
  reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_credit_applications_user_date ON credit_applications(user_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_credit_applications_status_date ON credit_applications(status, submitted_at DESC);
CREATE TABLE IF NOT EXISTS application_documents (
  application_id TEXT NOT NULL REFERENCES credit_applications(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('ktp','selfie','income')),
  content BYTEA NOT NULL,
  mime_type TEXT NOT NULL,
  extension TEXT NOT NULL,
  PRIMARY KEY (application_id, kind)
);
CREATE TABLE IF NOT EXISTS credit_application_decisions (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES credit_applications(id) ON DELETE CASCADE,
  admin_id TEXT NOT NULL REFERENCES admin_accounts(id),
  status TEXT NOT NULL CHECK (status IN ('in_review','needs_revision','approved','rejected')),
  admin_note TEXT NOT NULL,
  approved_limit INTEGER,
  approved_tenor INTEGER,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE TABLE IF NOT EXISTS commerce_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0),
  is_active SMALLINT NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS rental_owners (
  id TEXT PRIMARY KEY,
  owner_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT
);
CREATE TABLE IF NOT EXISTS rental_listings (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES rental_owners(id),
  title TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('kos','kontrakan')),
  description TEXT NOT NULL,
  address_line TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  monthly_price INTEGER NOT NULL CHECK (monthly_price > 0),
  image_url TEXT NOT NULL,
  is_active SMALLINT NOT NULL DEFAULT 1,
  available_from DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE IF NOT EXISTS commerce_orders (
  id TEXT PRIMARY KEY,
  reference_number TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL REFERENCES users(id),
  order_type TEXT NOT NULL CHECK (order_type IN ('product','rental')),
  item_id TEXT NOT NULL,
  item_name_snapshot TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity BETWEEN 1 AND 10),
  duration_months INTEGER CHECK (duration_months IS NULL OR duration_months BETWEEN 1 AND 12),
  recipient_snapshot TEXT NOT NULL,
  owner_snapshot TEXT,
  rental_start TEXT,
  rental_end TEXT,
  total_amount INTEGER NOT NULL CHECK (total_amount > 0),
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','processing','completed','cancelled')),
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE INDEX IF NOT EXISTS idx_commerce_orders_user_date ON commerce_orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commerce_orders_type_date ON commerce_orders(order_type, created_at DESC);
CREATE TABLE IF NOT EXISTS credit_limit_ledger (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  order_id TEXT NOT NULL UNIQUE REFERENCES commerce_orders(id),
  entry_type TEXT NOT NULL CHECK (entry_type IN ('purchase','rental')),
  amount INTEGER NOT NULL CHECK (amount > 0),
  direction TEXT NOT NULL CHECK (direction IN ('debit','credit')),
  balance_after INTEGER NOT NULL CHECK (balance_after >= 0),
  reference_number TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE INDEX IF NOT EXISTS idx_credit_ledger_user_date ON credit_limit_ledger(user_id, created_at DESC);
CREATE TABLE IF NOT EXISTS transaction_pin_attempts (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  failed_count INTEGER NOT NULL DEFAULT 0,
  window_started_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS installments (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES credit_applications(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  installment_no INTEGER NOT NULL CHECK (installment_no > 0),
  due_date TEXT NOT NULL,
  amount INTEGER NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid','paid')),
  paid_at TEXT,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
  UNIQUE (application_id, installment_no)
);
CREATE INDEX IF NOT EXISTS idx_installments_user_due ON installments(user_id, due_date);
CREATE TABLE IF NOT EXISTS installment_payments (
  id TEXT PRIMARY KEY,
  installment_id TEXT NOT NULL REFERENCES installments(id) ON DELETE CASCADE,
  order_id TEXT NOT NULL UNIQUE,
  midtrans_transaction_id TEXT,
  amount INTEGER NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL CHECK (status IN ('creating','pending','settlement','capture','expire','cancel','deny','failure','refund')),
  payment_type TEXT,
  redirect_url TEXT,
  created_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
  updated_at TEXT NOT NULL DEFAULT to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
);
CREATE INDEX IF NOT EXISTS idx_installment_payments_installment ON installment_payments(installment_id, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_installment_single_open_payment ON installment_payments(installment_id) WHERE status IN ('creating','pending');
`;
