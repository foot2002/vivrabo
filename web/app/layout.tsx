import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PermissionProvider } from "@/lib/permissionSimulator";
import ConditionalUserLayout from "@/components/layouts/ConditionalUserLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIBBRAVO 프로토타입",
  description: "VIBBRAVO 프로토타입 - 화면설계서 기반 High-fi 프로토타입",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PermissionProvider>
          <ConditionalUserLayout>{children}</ConditionalUserLayout>
        </PermissionProvider>
      </body>
    </html>
  );
}
