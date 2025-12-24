// A3: 폼 (등록/수정)
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tab from "@/components/ui/Tab";

export default function A3_Form() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader title="콘텐츠 등록" />
        <CardBody>
          <Tab items={["기본 정보", "콘텐츠 파일", "메타데이터", "상태 설정"]} />

          <div className="mt-6 space-y-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>
              <Input label="제목" placeholder="콘텐츠 제목을 입력하세요" />
              <Input label="작가명" placeholder="작가명을 입력하세요" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    유형
                  </label>
                  <select className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>SHORTS</option>
                    <option>SUMMARY_VIDEO</option>
                    <option>AUDIO</option>
                    <option>NOVEL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    장르
                  </label>
                  <select className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>액션</option>
                    <option>로맨스</option>
                    <option>드라마</option>
                    <option>판타지</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="언어" placeholder="KO" />
                <Input label="등급" placeholder="15+" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  설명
                </label>
                <textarea
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="콘텐츠 설명을 입력하세요"
                />
              </div>
            </div>

            {/* 파일 업로드 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">콘텐츠 파일</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="text-4xl mb-2">📁</div>
                <p className="text-sm text-gray-600 mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                <Button variant="ghost" size="sm">파일 선택</Button>
              </div>
            </div>

            {/* 상태 설정 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">상태 설정</h3>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="status" value="draft" defaultChecked />
                  <span className="text-sm text-gray-700">작성중</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="status" value="review" />
                  <span className="text-sm text-gray-700">검수 요청</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="status" value="published" />
                  <span className="text-sm text-gray-700">게시</span>
                </label>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Button>저장</Button>
              <Button variant="secondary">임시 저장</Button>
              <Button variant="ghost">취소</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

