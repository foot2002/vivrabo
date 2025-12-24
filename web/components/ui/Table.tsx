import { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

export default function Table({ headers, children, className = "" }: TableProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 ${className}`}>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function TableRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <tr className={`hover:bg-gray-50 transition-colors ${className}`}>{children}</tr>;
}

export function TableCell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-gray-900 ${className}`}>{children}</td>;
}

