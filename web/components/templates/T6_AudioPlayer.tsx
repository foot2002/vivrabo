// T6: 오디오 플레이어 (타임라인, 배속, 에피소드 리스트)
"use client";

import { useState } from "react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { LockedContent, usePermissions } from "@/lib/permissionSimulator";

export default function T6_AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(125); // 초
  const totalTime = 3600; // 초
  const { permissions } = usePermissions();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const episodes = [
    { id: 1, title: "에피소드 1: 시작", duration: "45:30", active: true },
    { id: 2, title: "에피소드 2: 전개", duration: "52:15", active: false },
    { id: 3, title: "에피소드 3: 클라이맥스", duration: "48:20", active: false },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="오디오 플레이어" />
        <CardBody>
          {/* 샘플구간 안내 */}
          {permissions.showSampleOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-blue-800">
                <span>💡</span>
                <span className="font-semibold">샘플구간 재생 중</span>
              </div>
              <p className="text-blue-700 mt-1">
                현재 샘플구간만 재생됩니다. 전체 오디오를 들으려면 구독이 필요합니다.
              </p>
            </div>
          )}

          {/* 플레이어 컨트롤 - 권한 체크 */}
          <LockedContent requireLogin={false} requireSubscribe={true} showSample={permissions.showSampleOnly}>
            <div className="space-y-4">
            {/* 재생 정보 */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">에피소드 1: 시작</h3>
              <p className="text-sm text-gray-500">작가명 · 장르</p>
            </div>

            {/* 타임라인 */}
            <div className="space-y-2">
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-full bg-blue-600 rounded-full"
                  style={{ width: `${(currentTime / totalTime) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalTime)}</span>
              </div>
            </div>

            {/* 컨트롤 버튼 */}
            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="sm">⏮️</Button>
              <Button onClick={() => setPlaying(!playing)}>
                {playing ? "⏸️" : "▶️"}
              </Button>
              <Button variant="ghost" size="sm">⏭️</Button>
              <Button variant="ghost" size="sm" onClick={() => setSpeed(speed === 2 ? 1 : speed + 0.5)}>
                {speed}x
              </Button>
              <Button variant="ghost" size="sm">⏪ -15s</Button>
              <Button variant="ghost" size="sm">⏩ +15s</Button>
            </div>

            {/* 추가 액션 */}
            <div className="flex justify-center gap-2">
              <Button variant="ghost" size="sm">⭐ 즐겨찾기</Button>
              <Button variant="ghost" size="sm">📥 다운로드</Button>
            </div>
          </div>
          </LockedContent>
        </CardBody>
      </Card>

      {/* 에피소드 리스트 */}
      <Card>
        <CardHeader title="에피소드 목록" />
        <CardBody>
          <div className="space-y-2">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  ep.active
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {ep.id}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{ep.title}</div>
                    <div className="text-xs text-gray-500">{ep.duration}</div>
                  </div>
                </div>
                {ep.active && <Badge variant="primary">재생 중</Badge>}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

