"use client";

import { ReactNode } from "react";

export type AuthMode = "login" | "register";

export function AuthTrigger({ mode, className, children }: { mode: AuthMode; className: string; children: ReactNode }) {
  return <button className={className} type="button" onClick={() => window.dispatchEvent(new CustomEvent("flexipay:auth", { detail: { mode } }))}>{children}</button>;
}
