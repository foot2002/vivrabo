// T9: 결제/구독 (요금제 카드, 결제 버튼, 약관/환불)
"use client";

import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

export default function T9_Payment() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 요금제 카드 */}
      <Card>
        <CardHeader title="구독 요금제" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 기본 요금제 */}
            <div className="p-4 rounded-xl border-2 border-gray-200">
              <div className="text-sm font-semibold text-gray-900 mb-2">베이직</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₩9,900<span className="text-sm font-normal text-gray-500">/월</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mt-4 mb-4">
                <li>✓ 기본 콘텐츠 이용</li>
                <li>✓ 광고 포함</li>
                <li>✓ 모바일/웹 접근</li>
              </ul>
              <Button variant="ghost" fullWidth>
                선택
              </Button>
            </div>

            {/* 프리미엄 요금제 */}
            <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50 relative">
              <Badge variant="primary" className="absolute top-2 right-2">
                추천
              </Badge>
              <div className="text-sm font-semibold text-gray-900 mb-2">프리미엄</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₩14,900<span className="text-sm font-normal text-gray-500">/월</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">월 정기구독 (자동 갱신)</div>
              <ul className="text-sm text-gray-600 space-y-1 mt-4 mb-4">
                <li>✓ 전체 콘텐츠 이용</li>
                <li>✓ 광고 없음</li>
                <li>✓ 오프라인 다운로드</li>
                <li>✓ 우선 고객 지원</li>
              </ul>
              <Button fullWidth>구독하기</Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                * 3/6/12개월 선결제 없음
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 결제 정보 */}
      <Card>
        <CardHeader title="결제 정보" />
        <CardBody>
          <div className="space-y-4">
            <Input label="카드번호" placeholder="1234 5678 9012 3456" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="만료일" placeholder="MM/YY" />
              <Input label="CVC" placeholder="123" />
            </div>
            <Input label="카드 소유자명" placeholder="홍길동" />
          </div>
        </CardBody>
      </Card>

      {/* 약관 및 환불 정책 */}
      <Card>
        <CardHeader title="약관 및 정책" />
        <CardBody>
          <div className="space-y-3">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm text-gray-700">
                <span className="text-blue-600 underline cursor-pointer">이용약관</span>에 동의합니다 (필수)
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm text-gray-700">
                <span className="text-blue-600 underline cursor-pointer">개인정보 처리방침</span>에 동의합니다 (필수)
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm text-gray-700">
                <span className="text-blue-600 underline cursor-pointer">환불 정책</span>을 확인했습니다 (필수)
              </span>
            </label>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              • 구독은 매월 자동 갱신됩니다. 취소는 구독 기간 종료 전까지 가능합니다.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              • 환불은 구독 시작 후 7일 이내에만 가능합니다.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* 결제 버튼 */}
      <div className="flex gap-2">
        <Button fullWidth size="lg">결제하기</Button>
        <Button variant="ghost" fullWidth size="lg">취소</Button>
      </div>
    </div>
  );
}

