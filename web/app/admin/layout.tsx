// app/admin/layout.tsx
// 관리자 라우트 레이아웃

import AdminLayoutComponent from "@/components/layouts/AdminLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}



