// T8: 마이/설정 (구독/성인인증 상태 카드, 히스토리)
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { mockContents, mockPlaylists } from "@/lib/mockData";
import ContentGrid from "./shared/ContentGrid";

export default function T8_MySettings() {
  return (
    <div className="space-y-6">
      {/* 상태 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">구독 상태</div>
              <Badge variant="success">활성</Badge>
            </div>
            <div className="text-lg font-semibold text-gray-900 mb-1">프리미엄</div>
            <div className="text-xs text-gray-500">2024.01.15 ~ 2024.02.15</div>
            <Button variant="ghost" size="sm" className="mt-3 w-full">
              구독 관리
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">성인인증</div>
              <Badge variant="success">완료</Badge>
            </div>
            <div className="text-lg font-semibold text-gray-900 mb-1">인증 완료</div>
            <div className="text-xs text-gray-500">2024.01.10 인증</div>
            <Button variant="ghost" size="sm" className="mt-3 w-full">
              재인증
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">언어 설정</div>
            </div>
            <div className="text-lg font-semibold text-gray-900 mb-1">한국어</div>
            <div className="text-xs text-gray-500">기본 언어</div>
            <Button variant="ghost" size="sm" className="mt-3 w-full">
              변경
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* 즐겨찾기 */}
      <Card>
        <CardHeader title="즐겨찾기" right={<Button variant="ghost" size="sm">전체보기</Button>} />
        <CardBody>
          <ContentGrid contents={mockContents.slice(0, 8)} count={8} />
        </CardBody>
      </Card>

      {/* 플레이리스트 */}
      <Card>
        <CardHeader title="내 플레이리스트" right={<Button size="sm">+ 새 플레이리스트</Button>} />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-pink-400 to-rose-600 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{playlist.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{playlist.description}</p>
                  <div className="text-xs text-gray-500">{playlist.contentCount}개 콘텐츠</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* 최근 이력 */}
      <Card>
        <CardHeader title="최근 시청/열람" />
        <CardBody>
          <div className="space-y-3">
            {mockContents.slice(0, 5).map((content) => (
              <div
                key={content.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-10 rounded bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{content.title}</div>
                  <div className="text-xs text-gray-500">2일 전</div>
                </div>
                <Button variant="ghost" size="sm">이어보기</Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

