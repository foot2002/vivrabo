"use client";

import { usePathname } from "next/navigation";
import UserLayoutComponent from "./UserLayout";

export default function ConditionalUserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return <UserLayoutComponent>{children}</UserLayoutComponent>;
}

