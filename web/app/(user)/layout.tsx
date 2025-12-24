// app/(user)/layout.tsx
// 사용자 라우트 그룹 레이아웃

import UserLayoutComponent from "@/components/layouts/UserLayout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayoutComponent>{children}</UserLayoutComponent>;
}



