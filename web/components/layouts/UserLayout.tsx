"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const pathname = usePathname();
  
  const navItems = [
    { path: "/", label: "홈", icon: "🏠" },
    { path: "/category", label: "카테고리", icon: "📁" },
    { path: "/search", label: "검색", icon: "🔍" },
    { path: "/favorites", label: "보관함", icon: "⭐" },
    { path: "/me", label: "마이", icon: "👤" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-gray-900">
            VIBBRAVO
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex-1 pb-20">{children}</main>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-lg">
        <div className="container mx-auto flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

