"use client";

import { ADMIN_SCREENS } from "@/components/screenRegistry";
import { PageScaffold } from "@/components/PageScaffold";

export default function Page() {
  const spec = ADMIN_SCREENS.find(s => s.path === "/admin/review");

  if (!spec) return <div className="p-6">정의된 관리자 화면이 없습니다: /admin/review</div>;

  return <PageScaffold spec={spec} />;
}

