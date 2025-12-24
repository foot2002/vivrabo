// T3: 상세 (썸네일/메타+탭+CTA+추천)
"use client";

import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Tab from "@/components/ui/Tab";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { mockContents } from "@/lib/mockData";
import ContentGrid from "./shared/ContentGrid";
import { LockedContent, usePermissions } from "@/lib/permissionSimulator";

export default function T3_Detail() {
  const content = mockContents[0];
  const { permissions } = usePermissions();

  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 썸네일 */}
            <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
              썸네일 이미지
            </div>

            {/* 메타 정보 */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>{content.author}</span>
                  <span>·</span>
                  <span>{content.genre}</span>
                  <span>·</span>
                  <span>{content.language}</span>
                  <span>·</span>
                  <span>{content.rating}</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="primary">{content.type}</Badge>
                  <Badge>{content.genre}</Badge>
                </div>
              </div>

              {/* 탭 - 비브라보 4타입 콘텐츠 */}
              <Tab items={["숏폼", "요약", "본편", "텍스트"]} />

              {/* 샘플구간 안내 */}
              {permissions.showSampleOnly && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 text-blue-800">
                    <span>💡</span>
                    <span className="font-semibold">샘플구간 안내</span>
                  </div>
                  <p className="text-blue-700 mt-1">
                    현재 <strong>전체 이용구간</strong>만 표시됩니다. 전체 콘텐츠를 보려면 로그인/구독이 필요합니다.
                  </p>
                </div>
              )}

              {/* CTA 버튼 - 권한별 분기 */}
              <div className="flex gap-2 pt-2">
                {!permissions.isSubscribed && (
                  <Button fullWidth>구독하기</Button>
                )}
                {!permissions.isAdultVerified && (
                  <Button variant="secondary">성인인증</Button>
                )}
                {!permissions.isLoggedIn && (
                  <Button variant="ghost">로그인</Button>
                )}
                {permissions.isLoggedIn && permissions.isAdultVerified && permissions.isSubscribed && (
                  <Button fullWidth variant="success">재생하기</Button>
                )}
              </div>

              {/* 통계 */}
              <div className="flex gap-4 pt-2 text-sm text-gray-600">
                <span>👁 {content.views.toLocaleString()}</span>
                <span>❤️ {content.likes}</span>
                <span>⭐ 4.5</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 추천 콘텐츠 - 권한 체크 */}
      <Card>
        <CardHeader title="추천 콘텐츠" />
        <CardBody>
          <LockedContent requireLogin={false} showSample={permissions.showSampleOnly}>
            <ContentGrid contents={mockContents.slice(1)} count={8} />
          </LockedContent>
        </CardBody>
      </Card>
    </div>
  );
}

