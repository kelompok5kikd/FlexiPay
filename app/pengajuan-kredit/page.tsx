import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { getAvailableCredit } from "@/lib/commerce-db";
import { getCreditApplicationForUser } from "@/lib/credit-applications";
import { SiteHeader } from "../site-header";
import { CreditApplicationFlow } from "./credit-application-flow";
export const metadata={title:"Pengajuan kredit — FlexiPay"};
export const instant=false;
export default async function Page(){await connection();const user=await getCurrentUser();if(!user)redirect("/login?next=%2Fpengajuan-kredit");const application=getCreditApplicationForUser(user.id);return <main className="credit-page"><SiteHeader user={user} activePath="/pengajuan-kredit" totalLimit={getAvailableCredit(user.id)}/><CreditApplicationFlow user={user} application={application}/></main>}
