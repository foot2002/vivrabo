"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: "/admin", label: "대시보드", icon: "📊" },
    { path: "/admin/content", label: "콘텐츠 관리", icon: "📝" },
    { path: "/admin/review", label: "검수/승인", icon: "✅" },
    { path: "/admin/ai-jobs", label: "AI 작업관리", icon: "🤖" },
    { path: "/admin/distribution", label: "배포관리", icon: "🚀" },
    { path: "/admin/banners", label: "배너관리", icon: "🖼️" },
    { path: "/admin/users", label: "사용자관리", icon: "👥" },
    { path: "/admin/master", label: "마스터관리", icon: "⚙️" },
    { path: "/admin/settlement", label: "정산 리포트", icon: "💰" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 좌측 사이드바 */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } fixed left-0 top-0 h-full border-r border-gray-200 bg-white transition-all duration-300`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          {sidebarOpen && <h1 className="text-lg font-bold text-gray-900">관리자</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="p-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname?.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <div className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300`}>
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">관리자 대시보드</h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </header>

        {/* 본문 */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

