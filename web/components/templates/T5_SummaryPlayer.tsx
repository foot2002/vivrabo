// T5: 요약 플레이어 (16:9, 배속/N초 버튼, 스크립트/이미지 오버레이 샘플)
"use client";

import { useState } from "react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { LockedContent, usePermissions } from "@/lib/permissionSimulator";

export default function T5_SummaryPlayer() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const { permissions } = usePermissions();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="요약 영상 플레이어" subtitle="≤ 10분" />
        <CardBody>
          {/* 샘플구간 안내 */}
          {permissions.showSampleOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-blue-800">
                <span>💡</span>
                <span className="font-semibold">샘플구간 재생 중</span>
              </div>
              <p className="text-blue-700 mt-1">
                현재 샘플구간만 재생됩니다. 전체 영상을 보려면 구독이 필요합니다.
              </p>
            </div>
          )}

          {/* 16:9 플레이어 - 권한 체크 */}
          <LockedContent requireLogin={false} requireSubscribe={true} showSample={permissions.showSampleOnly}>
            <div className="relative aspect-video w-full rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 overflow-hidden mb-4">
            {/* 플레이어 오버레이 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setPlaying(!playing)}
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-2xl hover:bg-white transition-colors"
              >
                {playing ? "⏸️" : "▶️"}
              </button>
            </div>

            {/* 스크립트 오버레이 샘플 */}
            <div className="absolute bottom-20 left-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
              현재 재생 중인 스크립트 텍스트가 여기에 표시됩니다...
            </div>

            {/* 타임라인 */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/30">
              <div className="h-full bg-blue-500" style={{ width: "35%" }}></div>
            </div>
          </div>
          </LockedContent>

          {/* 컨트롤 버튼 */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={() => setPlaying(!playing)}>
              {playing ? "⏸️ 일시정지" : "▶️ 재생"}
            </Button>
            <Button variant="ghost" onClick={() => setSpeed(speed === 2 ? 1 : speed + 0.5)}>
              배속 {speed}x
            </Button>
            <Button variant="ghost">⏪ -15초</Button>
            <Button variant="ghost">⏩ +15초</Button>
            <Button variant="ghost">⭐ 즐겨찾기</Button>
          </div>
        </CardBody>
      </Card>

      {/* 이미지 오버레이 샘플 */}
      <Card>
        <CardHeader title="스크립트 및 이미지" />
        <CardBody>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                [00:15] 이 장면에서 주요 인물이 등장합니다.
              </p>
              <div className="aspect-video w-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                삽입 이미지
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                [00:30] 다음 장면으로 전환됩니다...
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

