import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${hover ? "hover:shadow-md transition-shadow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
  className = "",
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between border-b border-gray-100 px-5 py-4 ${className}`}>
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        {subtitle && <div className="mt-0.5 text-xs text-gray-500">{subtitle}</div>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

