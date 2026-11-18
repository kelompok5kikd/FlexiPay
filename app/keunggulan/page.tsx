import { connection } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { FeaturePage } from "../feature-page";
export const instant = false;
export const metadata = { title: "Keunggulan — FlexiPay" };
export default async function Page() { await connection(); return <FeaturePage page="keunggulan" user={await getCurrentUser()} />; }
