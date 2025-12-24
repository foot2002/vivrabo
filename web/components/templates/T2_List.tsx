// T2: 리스트 (필터+그리드/리스트)
"use client";

import { useState } from "react";
import Card, { CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { mockContents } from "@/lib/mockData";
import ContentGrid from "./shared/ContentGrid";

export default function T2_List() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          {/* 필터 바 */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4 mb-6">
            <Input placeholder="검색어 입력" />
            <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>전체 유형</option>
              <option>SHORTS</option>
              <option>SUMMARY</option>
              <option>AUDIO</option>
              <option>NOVEL</option>
            </select>
            <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>전체 장르</option>
              <option>액션</option>
              <option>로맨스</option>
              <option>드라마</option>
              <option>판타지</option>
            </select>
            <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>전체 언어</option>
              <option>한국어</option>
              <option>영어</option>
            </select>
          </div>

          {/* 뷰 모드 토글 */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              총 <span className="font-semibold text-gray-900">{mockContents.length}</span>개
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                그리드
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                리스트
              </Button>
            </div>
          </div>

          {/* 콘텐츠 그리드/리스트 */}
          {viewMode === "grid" ? (
            <ContentGrid contents={mockContents} count={12} />
          ) : (
            <div className="space-y-4">
              {mockContents.map((content) => (
                <div
                  key={content.id}
                  className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{content.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{content.author}</p>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span>👁 {content.views.toLocaleString()}</span>
                      <span>❤️ {content.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

