// app/admin/[[...slug]]/page.tsx
// 관리자 라우트 캐치올 페이지

import { notFound } from "next/navigation";
import { ADMIN_SCREENS } from "@/components/screenRegistry";
import { matchPath } from "@/components/pathMatch";
import { PageScaffold } from "@/components/PageScaffold";

interface AdminPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { slug } = await params;
  const pathname = slug ? `/admin/${slug.join("/")}` : "/admin";

  // 경로와 일치하는 화면 찾기
  const screen = ADMIN_SCREENS.find((s) => matchPath(pathname, s.path));

  if (!screen) {
    notFound();
  }

  return <PageScaffold spec={screen} />;
}



