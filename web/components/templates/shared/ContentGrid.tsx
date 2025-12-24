// 공유 컴포넌트: 콘텐츠 그리드
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { mockContents } from "@/lib/mockData";

interface ContentCardProps {
  content: typeof mockContents[0];
}

function ContentCard({ content }: ContentCardProps) {
  return (
    <Link href={`/content/${content.id}`} className="group">
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[16/10] w-full relative bg-gray-100">
          <Image
            src={content.thumbnail}
            alt={content.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="primary" size="sm">{content.type}</Badge>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">{content.title}</h3>
          <p className="text-xs text-gray-500 mb-2">{content.author}</p>
          <div className="flex gap-1.5 flex-wrap mb-2">
            <Badge variant="default" size="sm">{content.genre}</Badge>
            <Badge variant="default" size="sm">{content.language}</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>👁 {content.views.toLocaleString()}</span>
            <span>❤️ {content.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ContentGridProps {
  contents?: typeof mockContents;
  count?: number;
}

export default function ContentGrid({ contents = mockContents, count = 8 }: ContentGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4">
      {contents.slice(0, count).map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
}

