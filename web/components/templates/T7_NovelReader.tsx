// T7: 웹소설 리더 (타이포, 이미지 삽입, 설정 바)
"use client";

import { useState } from "react";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { LockedContent, usePermissions } from "@/lib/permissionSimulator";

export default function T7_NovelReader() {
  const [fontSize, setFontSize] = useState("md");
  const [theme, setTheme] = useState("light");
  const { permissions } = usePermissions();

  return (
    <div className="space-y-6">
      {/* 설정 바 */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(fontSize === "sm" ? "md" : fontSize === "md" ? "lg" : "sm")}
              >
                폰트 크기
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                테마
              </Button>
              <Button variant="ghost" size="sm">이어읽기</Button>
            </div>
            <div className="text-sm text-gray-500">1/10 페이지</div>
          </div>
        </CardBody>
      </Card>

      {/* 리더 본문 */}
      <Card>
        <CardBody>
          {/* 샘플구간 안내 */}
          {permissions.showSampleOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-blue-800">
                <span>💡</span>
                <span className="font-semibold">샘플구간 읽기 중</span>
              </div>
              <p className="text-blue-700 mt-1">
                현재 샘플구간(챕터/페이지)만 표시됩니다. 전체 소설을 읽으려면 구독이 필요합니다.
              </p>
            </div>
          )}

          <LockedContent requireLogin={false} requireSubscribe={true} showSample={permissions.showSampleOnly}>
            <div
              className={`space-y-6 leading-relaxed ${
                fontSize === "sm" ? "text-sm" : fontSize === "md" ? "text-base" : "text-lg"
              } ${theme === "dark" ? "bg-gray-900 text-gray-100" : "text-gray-700"}`}
              style={{ minHeight: "600px", padding: "2rem" }}
            >
            <h2 className="text-2xl font-bold mb-4">제 1장: 시작</h2>
            <p>
              이것은 웹소설 리더의 예시 텍스트입니다. 사용자는 여기서 소설의 내용을 읽을 수
              있습니다. 텍스트는 가독성을 위해 적절한 줄간격과 폰트 크기로 표시됩니다.
            </p>
            <p>
              이미지가 삽입된 경우에도 자연스럽게 표시됩니다. 사용자는 폰트 크기와 테마를 변경할
              수 있어 자신의 취향에 맞게 읽을 수 있습니다.
            </p>

            {/* 삽입 이미지 */}
            <div className="my-8">
              <div className="aspect-video w-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                삽입 이미지
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">[이미지 설명]</p>
            </div>

            <p>
              계속해서 텍스트가 이어지며, 사용자는 스크롤을 통해 다음 페이지로 이동할 수
              있습니다. 이어읽기 기능을 사용하면 마지막으로 읽은 위치에서 계속 읽을 수 있습니다.
            </p>
            <p>
              리더는 다양한 설정을 제공하여 사용자가 최적의 읽기 환경을 만들 수 있도록
              도와줍니다.
            </p>
          </div>
          </LockedContent>

          {/* 페이지 네비게이션 */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <Button variant="ghost">이전 페이지</Button>
            <div className="text-sm text-gray-500">1 / 10</div>
            <Button variant="ghost">다음 페이지</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

