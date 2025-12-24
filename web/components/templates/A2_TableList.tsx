// A2: 테이블 목록 (필터바+테이블+행 액션)
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Table, { TableRow, TableCell } from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { mockAdminContent } from "@/lib/mockData";
import Link from "next/link";

export default function A2_TableList() {
  return (
    <Card>
      <CardHeader title="콘텐츠 목록" right={<Button>+ 등록</Button>} />
      <CardBody>
        {/* 필터 바 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 mb-6">
          <Input placeholder="검색어" />
          <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>전체 유형</option>
            <option>SHORTS</option>
            <option>SUMMARY_VIDEO</option>
            <option>AUDIO</option>
            <option>NOVEL</option>
          </select>
          <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>전체 상태</option>
            <option>게시</option>
            <option>검수중</option>
            <option>작성중</option>
          </select>
          <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>전체 언어/장르</option>
            <option>한국어</option>
            <option>영어</option>
          </select>
        </div>

        {/* 테이블 */}
        <Table
          headers={["ID", "제목", "유형", "상태", "조회수", "등록일", "액션"]}
        >
          {mockAdminContent.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono text-xs">{item.id}</TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "게시"
                      ? "success"
                      : item.status === "검수중"
                      ? "warning"
                      : "default"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{item.views.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-gray-500">{item.createdAt}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href="#" className="text-blue-600 hover:underline text-sm">
                    수정
                  </Link>
                  <button className="text-red-600 hover:underline text-sm">삭제</button>
                  <button className="text-green-600 hover:underline text-sm" title="SNS 배포">
                    🚀 배포
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>

        {/* SNS 배포 섹션 */}
        <Card className="mt-6">
          <CardHeader title="SNS 배포 관리" />
          <CardBody>
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-3">
                선택한 콘텐츠를 SNS 채널에 배포할 수 있습니다.
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <span>📺</span> YouTube
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <span>🐦</span> X (Twitter)
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <span>📘</span> Facebook
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <span>📷</span> Instagram
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                * 배포 상태 및 링크는 배포관리 화면에서 확인할 수 있습니다.
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold">{mockAdminContent.length}</span>개
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">이전</Button>
            <Button variant="ghost" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">다음</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

