// T10: 시스템 상태 (권한차단/점검 안내)
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function T10_SystemStatus() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 권한 차단 */}
      <Card>
        <CardBody>
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900">콘텐츠 이용 권한이 필요합니다</h2>
            <p className="text-gray-600">
              이 콘텐츠를 이용하려면 다음 중 하나가 필요합니다:
            </p>
            <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="warning">필수</Badge>
                <span className="text-sm text-gray-700">로그인</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning">필수</Badge>
                <span className="text-sm text-gray-700">성인인증 (19세 이상)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="primary">선택</Badge>
                <span className="text-sm text-gray-700">프리미엄 구독</span>
              </div>
            </div>
            <div className="flex gap-2 justify-center pt-4">
              <Button>로그인하기</Button>
              <Button variant="secondary">성인인증</Button>
              <Button variant="ghost">구독하기</Button>
            </div>
            <p className="text-xs text-gray-500 pt-2">
              샘플 구간은 전체 이용 가능합니다. 전체 콘텐츠를 보려면 위 조건을 충족해주세요.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* 점검 안내 */}
      <Card>
        <CardBody>
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🔧</div>
            <h2 className="text-2xl font-bold text-gray-900">시스템 점검 중</h2>
            <p className="text-gray-600">
              더 나은 서비스를 위해 시스템 점검을 진행하고 있습니다.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <div className="text-sm font-semibold text-gray-900 mb-2">점검 일정</div>
              <div className="text-sm text-gray-700">
                <div>시작: 2024년 1월 20일 00:00</div>
                <div>종료: 2024년 1월 20일 06:00 (예상)</div>
              </div>
            </div>
            <div className="flex gap-2 justify-center pt-4">
              <Button variant="ghost">공지사항 보기</Button>
              <Button variant="ghost">FAQ 보기</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

