"use client";

import { ReactNode } from "react";

interface TabProps {
  items: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

export default function Tab({
  items,
  activeIndex = 0,
  onChange,
  className = "",
}: TabProps) {
  return (
    <div className={`flex gap-2 border-b border-gray-200 ${className}`}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index)}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
            index === activeIndex
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

