// T4: 숏폼 플레이어 (9:16, 스크롤 힌트, 오버레이 버튼)
"use client";

import { useState } from "react";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { LockedContent, usePermissions } from "@/lib/permissionSimulator";

export default function T4_ShortsPlayer() {
  const [liked, setLiked] = useState(false);
  const { permissions } = usePermissions();

  return (
    <div className="flex justify-center">
      <Card className="max-w-sm w-full">
        <CardBody>
          {/* 샘플구간 안내 */}
          {permissions.showSampleOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-blue-800">
                <span>💡</span>
                <span className="font-semibold">샘플구간 재생 중</span>
              </div>
              <p className="text-blue-700 mt-1 text-xs">
                60초 샘플만 재생됩니다. 전체 콘텐츠를 보려면 구독이 필요합니다.
              </p>
            </div>
          )}

          {/* 9:16 플레이어 - 권한 체크 */}
          <LockedContent requireLogin={false} requireSubscribe={true} showSample={permissions.showSampleOnly}>
            <div className="relative aspect-[9/16] w-full rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 overflow-hidden">
            {/* 오버레이 컨트롤 */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white mb-4">
                <h3 className="font-semibold text-lg mb-1">콘텐츠 제목</h3>
                <p className="text-sm text-gray-200">작가명 · 장르</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-full transition-colors ${
                      liked ? "bg-red-500" : "bg-white/20"
                    }`}
                  >
                    <span className="text-xl">{liked ? "❤️" : "🤍"}</span>
                  </button>
                  <button className="p-2 rounded-full bg-white/20">
                    <span className="text-xl">⭐</span>
                  </button>
                  <button className="p-2 rounded-full bg-white/20">
                    <span className="text-xl">💬</span>
                  </button>
                </div>
                <button className="p-2 rounded-full bg-white/20">
                  <span className="text-xl">⋯</span>
                </button>
              </div>
            </div>

            {/* 스크롤 힌트 */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2">
              <div className="w-1 h-8 bg-white/30 rounded-full"></div>
              <div className="w-1 h-8 bg-white/50 rounded-full"></div>
              <div className="w-1 h-8 bg-white/30 rounded-full"></div>
            </div>
          </div>
          </LockedContent>

          {/* 설명 */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">
              ⬆️ 위로 스크롤: 이전 콘텐츠
            </p>
            <p className="text-xs text-gray-500">
              ⬇️ 아래로 스크롤: 다음 콘텐츠
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

