// app/(user)/[[...slug]]/page.tsx
// 사용자 라우트 캐치올 페이지

import { notFound } from "next/navigation";
import { USER_SCREENS } from "@/components/screenRegistry";
import { matchPath } from "@/components/pathMatch";
import { PageScaffold } from "@/components/PageScaffold";

interface UserPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { slug } = await params;
  const pathname = slug ? `/${slug.join("/")}` : "/";

  // 경로와 일치하는 화면 찾기
  const screen = USER_SCREENS.find((s) => matchPath(pathname, s.path));

  if (!screen) {
    notFound();
  }

  return <PageScaffold spec={screen} />;
}

// 동적 라우트를 위한 generateStaticParams는 선택사항
// 필요시 추가 가능



