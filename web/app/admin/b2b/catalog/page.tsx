"use client";

import { ADMIN_SCREENS } from "@/components/screenRegistry";
import { PageScaffold } from "@/components/PageScaffold";

export default function Page() {
  const spec = ADMIN_SCREENS.find(s => s.path === "/admin/b2b/catalog");

  if (!spec) return <div className="p-6">정의된 관리자 화면이 없습니다: /admin/b2b/catalog</div>;

  return <PageScaffold spec={spec} />;
}

