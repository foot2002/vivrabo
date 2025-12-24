// PageScaffold.tsx
// 템플릿 기반 페이지 스캐폴드

import { ScreenSpec } from "@/components/screenRegistry";
import { mapTemplate, TemplateType } from "@/lib/templateMapper";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { PermissionToggle } from "@/lib/permissionSimulator";
import { pathToSample } from "@/lib/screenRegistryValidator";

// 템플릿 컴포넌트 import
import T1_Home from "@/components/templates/T1_Home";
import T2_List from "@/components/templates/T2_List";
import T3_Detail from "@/components/templates/T3_Detail";
import T4_ShortsPlayer from "@/components/templates/T4_ShortsPlayer";
import T5_SummaryPlayer from "@/components/templates/T5_SummaryPlayer";
import T6_AudioPlayer from "@/components/templates/T6_AudioPlayer";
import T7_NovelReader from "@/components/templates/T7_NovelReader";
import T8_MySettings from "@/components/templates/T8_MySettings";
import T9_Payment from "@/components/templates/T9_Payment";
import T10_SystemStatus from "@/components/templates/T10_SystemStatus";
import A1_Dashboard from "@/components/templates/A1_Dashboard";
import A2_TableList from "@/components/templates/A2_TableList";
import A3_Form from "@/components/templates/A3_Form";
import A4_ReviewQueue from "@/components/templates/A4_ReviewQueue";
import A5_Report from "@/components/templates/A5_Report";

const templateComponents: Record<TemplateType, React.ComponentType> = {
  T1: T1_Home,
  T2: T2_List,
  T3: T3_Detail,
  T4: T4_ShortsPlayer,
  T5: T5_SummaryPlayer,
  T6: T6_AudioPlayer,
  T7: T7_NovelReader,
  T8: T8_MySettings,
  T9: T9_Payment,
  T10: T10_SystemStatus,
  A1: A1_Dashboard,
  A2: A2_TableList,
  A3: A3_Form,
  A4: A4_ReviewQueue,
  A5: A5_Report,
};

export function PageScaffold({ spec }: { spec: ScreenSpec }) {
  const templateType = mapTemplate(spec);
  const TemplateComponent = templateComponents[templateType];

  const samplePath = pathToSample(spec.path);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 권한 시뮬레이션 토글 (사용자 화면에만 표시) */}
      {!spec.path.startsWith("/admin") && (
        <div className="mb-6">
          <PermissionToggle />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽: 실제 UI (2/3) */}
        <div className="lg:col-span-2">
          <TemplateComponent />
        </div>

        {/* 오른쪽: 설계서 패널 (1/3) */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader title="화면 정보" />
            <CardBody>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">템플릿</div>
                  <Badge variant="primary">{templateType}</Badge>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">화면 ID</div>
                  <div className="text-sm font-mono text-gray-900">{spec.id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">경로</div>
                  <div className="text-sm font-mono text-gray-900">{spec.path}</div>
                  {samplePath !== spec.path && (
                    <div className="text-xs text-gray-500 mt-1">
                      샘플: <span className="font-mono">{samplePath}</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">화면명</div>
                  <div className="text-sm font-semibold text-gray-900">{spec.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2">관련 요구사항</div>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.req.map((r) => (
                      <Badge key={r} variant="primary" size="sm">
                        {r}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="화면 구성 설명" />
            <CardBody>
              <div className="text-sm text-gray-700 leading-relaxed">{spec.layout}</div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="주요 항목" />
            <CardBody>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-700">
                {spec.keyItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="체크 사항" />
            <CardBody>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-700">
                {spec.checks.map((check, i) => (
                  <li key={i}>{check}</li>
                ))}
              </ul>
            </CardBody>
          </Card>

          {spec.area && spec.area.length > 0 && (
            <Card>
              <CardHeader title="와이어 구성" />
              <CardBody>
                <div className="space-y-3">
                  {spec.area.map((area, i) => (
                    <div
                      key={i}
                      className="rounded-lg border-2 border-dashed border-gray-300 p-3 bg-gray-50"
                      style={area.height ? { minHeight: `${area.height}px` } : {}}
                    >
                      <div className="text-xs font-medium text-gray-600">{area.title}</div>
                      {area.height && (
                        <div className="text-xs text-gray-500 mt-1">{area.height}px</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
