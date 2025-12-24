// A5: 리포트 (정산/집계 테이블+다운로드)
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Table, { TableRow, TableCell } from "@/components/ui/Table";
import { mockSettlement } from "@/lib/mockData";

export default function A5_Report() {
  const totalRevenue = mockSettlement.reduce((sum, item) => sum + item.revenue, 0);
  const totalAmount = mockSettlement.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* 필터 */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Input type="date" label="시작일" />
            <Input type="date" label="종료일" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                콘텐츠
              </label>
              <select className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>전체</option>
                <option>콘텐츠 A</option>
                <option>콘텐츠 B</option>
                <option>콘텐츠 C</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button fullWidth>조회</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 집계 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="text-sm text-gray-500 mb-1">총 매출</div>
            <div className="text-2xl font-bold text-gray-900">
              ₩{totalRevenue.toLocaleString()}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-500 mb-1">총 정산 금액</div>
            <div className="text-2xl font-bold text-gray-900">
              ₩{totalAmount.toLocaleString()}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-500 mb-1">정산 건수</div>
            <div className="text-2xl font-bold text-gray-900">{mockSettlement.length}건</div>
          </CardBody>
        </Card>
      </div>

      {/* 정산 테이블 */}
      <Card>
        <CardHeader
          title="정산 상세"
          right={
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">📥 Excel 다운로드</Button>
              <Button variant="ghost" size="sm">📄 PDF 다운로드</Button>
            </div>
          }
        />
        <CardBody>
          <Table
            headers={["기간", "콘텐츠", "매출", "배분율", "정산 금액", "상태"]}
          >
            {mockSettlement.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.period}</TableCell>
                <TableCell className="font-medium">{item.content}</TableCell>
                <TableCell>₩{item.revenue.toLocaleString()}</TableCell>
                <TableCell>{(item.share * 100).toFixed(0)}%</TableCell>
                <TableCell className="font-semibold">
                  ₩{item.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-green-600">완료</span>
                </TableCell>
              </TableRow>
            ))}
          </Table>

          {/* 합계 행 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">합계</div>
                <div className="text-lg font-bold text-gray-900">
                  ₩{totalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

