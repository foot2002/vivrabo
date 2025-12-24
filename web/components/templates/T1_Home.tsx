// T1: 홈 (배너+유형탭+섹션)
"use client";

import Card, { CardBody } from "@/components/ui/Card";
import Tab from "@/components/ui/Tab";
import Badge from "@/components/ui/Badge";
import { mockContents } from "@/lib/mockData";
import ContentGrid from "./shared/ContentGrid";
import { LockedContent, usePermissions } from "@/lib/permissionSimulator";

export default function T1_Home() {
  const { permissions } = usePermissions();

  return (
    <div className="space-y-6">
      {/* 비로그인 공개범위 안내 */}
      {!permissions.isLoggedIn && (
        <Card>
          <CardBody>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
              <div className="flex items-center gap-2 text-yellow-800">
                <span>ℹ️</span>
                <span className="font-semibold">비로그인 공개범위</span>
              </div>
              <p className="text-yellow-700 mt-1">
                일부 콘텐츠는 로그인 후 이용 가능합니다.
              </p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 배너 슬라이더 */}
      <Card>
        <CardBody>
          <div className="aspect-[16/6] w-full rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            🎬 특별 기획 콘텐츠
          </div>
        </CardBody>
      </Card>

      {/* 콘텐츠 유형 탭 - 비브라보 4타입 (유형 우선 노출) */}
      <Card>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Tab items={["SHORTS", "SUMMARY", "AUDIO", "NOVEL"]} />
            <Badge variant="primary" size="sm">유형 우선 노출</Badge>
          </div>
          
          {/* 인기 섹션 - 비로그인 공개범위 적용 */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">인기 콘텐츠</h2>
              <button className="text-sm text-blue-600 hover:underline">더보기</button>
            </div>
            <LockedContent requireLogin={false} showSample={permissions.showSampleOnly}>
              <ContentGrid contents={mockContents} count={8} />
            </LockedContent>
          </div>

          {/* 신규 섹션 */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">신규 콘텐츠</h2>
              <button className="text-sm text-blue-600 hover:underline">더보기</button>
            </div>
            <ContentGrid contents={[...mockContents].reverse()} count={8} />
          </div>

          {/* 추천 섹션 */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">추천 콘텐츠</h2>
              <button className="text-sm text-blue-600 hover:underline">더보기</button>
            </div>
            <ContentGrid contents={mockContents.slice(0, 4)} count={4} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

