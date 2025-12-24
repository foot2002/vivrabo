// A4: 검수 큐 (미리보기+승인/반려+코멘트)
"use client";

import { useState } from "react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Tab from "@/components/ui/Tab";

export default function A4_ReviewQueue() {
  const [selectedTab, setSelectedTab] = useState(0);

  const reviewItems = [
    {
      id: 1,
      title: "콘텐츠 제목 1",
      type: "요약",
      submittedAt: "2024-01-15 10:30",
      status: "대기",
    },
    {
      id: 2,
      title: "콘텐츠 제목 2",
      type: "번역",
      submittedAt: "2024-01-15 09:15",
      status: "대기",
    },
    {
      id: 3,
      title: "콘텐츠 제목 3",
      type: "TTS",
      submittedAt: "2024-01-14 16:45",
      status: "대기",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 검수 대기 목록 */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader title="검수 대기" right={<Badge variant="warning">3</Badge>} />
          <CardBody>
            <div className="space-y-2">
              {reviewItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.title}</span>
                    <Badge variant="default" size="sm">{item.type}</Badge>
                  </div>
                  <div className="text-xs text-gray-500">{item.submittedAt}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 미리보기 및 승인/반려 */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader title="검수 미리보기" />
          <CardBody>
            <div className="space-y-6">
              {/* 콘텐츠 정보 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">콘텐츠 제목 1</h3>
                <div className="flex gap-2 text-sm text-gray-600 mb-4">
                  <span>요약</span>
                  <span>·</span>
                  <span>2024-01-15 10:30 제출</span>
                </div>
              </div>

              {/* 미리보기 탭 */}
              <Tab
                items={["요약 영상", "번역 텍스트", "TTS 오디오"]}
                activeIndex={selectedTab}
                onChange={setSelectedTab}
              />

              {/* 미리보기 영역 */}
              <div className="space-y-4">
                {selectedTab === 0 && (
                  <div className="aspect-video w-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    요약 영상 미리보기
                  </div>
                )}
                {selectedTab === 1 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      번역된 텍스트 내용이 여기에 표시됩니다. 원본과 비교하여 품질을 확인할 수
                      있습니다.
                    </p>
                  </div>
                )}
                {selectedTab === 2 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-4">
                      <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        ▶️
                      </button>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 코멘트 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  검수 코멘트
                </label>
                <textarea
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="검수 결과 및 코멘트를 입력하세요"
                />
              </div>

              {/* 승인/반려 버튼 */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button fullWidth>✅ 승인</Button>
                <Button variant="danger" fullWidth>❌ 반려</Button>
                <Button variant="ghost">임시 저장</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

