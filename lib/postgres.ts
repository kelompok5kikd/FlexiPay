import "server-only";
import { Pool, type PoolClient, type QueryResultRow } from "@neondatabase/serverless";
import { postgresSchema } from "./postgres-schema";

export type DbRow = QueryResultRow;
export type DbClient = PoolClient;

let pool: Pool | undefined;
let schemaInitialization: Promise<void> | undefined;

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL belum dikonfigurasi.");
  pool ??= new Pool({ connectionString, max: 5 });
  return pool;
}

async function ensureSchema() {
  schemaInitialization ??= getPool().query(postgresSchema).then(() => undefined).catch((error: unknown) => {
    schemaInitialization = undefined;
    throw error;
  });
  await schemaInitialization;
}

export async function queryRows<T extends DbRow = DbRow>(text: string, values: readonly unknown[] = []) {
  await ensureSchema();
  const result = await getPool().query<T>(text, [...values]);
  return result.rows;
}

export async function queryOne<T extends DbRow = DbRow>(text: string, values: readonly unknown[] = []) {
  return (await queryRows<T>(text, values))[0];
}

export async function execute(text: string, values: readonly unknown[] = []) {
  await ensureSchema();
  const result = await getPool().query(text, [...values]);
  return result.rowCount ?? 0;
}

export async function withTransaction<T>(operation: (client: DbClient) => Promise<T>): Promise<T> {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await operation(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Neon transaction rollback failed:", rollbackError);
    }
    throw error;
  } finally {
    client.release();
  }
}
