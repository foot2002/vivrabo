// A1: 대시보드 (지표 카드+차트 placeholder+알림)
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function A1_Dashboard() {
  const metrics = [
    { label: "전체 콘텐츠", value: "1,234", change: "+12%", positive: true },
    { label: "활성 구독자", value: "5,678", change: "+8%", positive: true },
    { label: "월간 매출", value: "₩12,345,678", change: "+15%", positive: true },
    { label: "AI 작업 대기", value: "23", change: "-5", positive: true },
  ];

  const alerts = [
    { id: 1, type: "error", message: "AI 요약 작업 실패: 콘텐츠 #1001", time: "5분 전" },
    { id: 2, type: "warning", message: "검수 대기 콘텐츠 5개", time: "10분 전" },
    { id: 3, type: "info", message: "새로운 구독자 3명", time: "1시간 전" },
  ];

  return (
    <div className="space-y-6">
      {/* 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardBody>
              <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className={`text-xs ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                {metric.change}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="월간 매출 추이" />
          <CardBody>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              차트 영역 (Chart.js / Recharts 등)
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="콘텐츠 유형별 통계" />
          <CardBody>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              파이 차트 영역
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 알림 */}
      <Card>
        <CardHeader title="최근 알림" right={<Badge variant="error">3</Badge>} />
        <CardBody>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      alert.type === "error"
                        ? "error"
                        : alert.type === "warning"
                        ? "warning"
                        : "primary"
                    }
                    size="sm"
                  >
                    {alert.type === "error" ? "오류" : alert.type === "warning" ? "경고" : "정보"}
                  </Badge>
                  <span className="text-sm text-gray-700">{alert.message}</span>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

