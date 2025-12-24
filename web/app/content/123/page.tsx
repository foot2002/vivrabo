"use client";

import { USER_SCREENS } from "@/components/screenRegistry";
import { PageScaffold } from "@/components/PageScaffold";

export default function Page() {
  const spec = USER_SCREENS.find(s => s.path === "/content/[contentId]");

  if (!spec) return <div className="p-6">정의된 사용자 화면이 없습니다: /content/[contentId]</div>;

  return <PageScaffold spec={spec} />;
}

