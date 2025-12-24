import Link from "next/link";
import { USER_SCREENS, ADMIN_SCREENS } from "@/components/screenRegistry";

function ScreenTable({
  title,
  items,
}: {
  title: string;
  items: { id: string; name: string; path: string }[];
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
        <div className="text-sm text-neutral-600">총 {items.length}개</div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-700">
            <tr>
              <th className="px-4 py-3 w-[140px]">화면ID</th>
              <th className="px-4 py-3">화면명</th>
              <th className="px-4 py-3">경로</th>
              <th className="px-4 py-3 w-[120px]">이동</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id} className="border-b border-neutral-100 last:border-b-0">
                <td className="px-4 py-3 font-mono text-xs text-neutral-700">{s.id}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{s.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-600">{s.path}</td>
                <td className="px-4 py-3">
                  <Link
                    href={s.path === "/admin" ? "/admin" : s.path}
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-3 py-2 text-xs text-white hover:bg-neutral-800"
                  >
                    열기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-neutral-500">
        * 동적 경로(예: /content/[contentId])는 실제 접속 시 /content/123 처럼 숫자로 바꿔서 접근하세요.
      </div>
    </section>
  );
}

export default function ScreensIndexPage() {
  const userItems = USER_SCREENS.map((s) => ({
    id: s.id,
    name: s.name,
    path:
      s.path
        .replace("/[contentId]", "/123")
        .replace("/[playlistId]", "/1")
        .replace("/[id]", "/1"),
  }));

  const adminItems = ADMIN_SCREENS.map((s) => ({
    id: s.id,
    name: s.name,
    path: s.path.replace("/[id]", "/1"),
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-neutral-900">화면설계서 링크 목록</h1>
        <p className="text-sm text-neutral-600">
          아래 표에서 원하는 화면을 클릭하면 해당 화면설계서(와이어프레임)로 이동합니다.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/"
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            사용자 홈
          </Link>
          <Link
            href="/admin"
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            관리자 대시보드
          </Link>
        </div>
      </header>

      <ScreenTable title="사용자 화면" items={userItems} />
      <ScreenTable title="관리자 화면" items={adminItems} />
    </div>
  );
}
