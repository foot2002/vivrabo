// permissionSimulator.tsx
// 권한 시뮬레이션 토글 컴포넌트

"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import Card, { CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface PermissionState {
  isLoggedIn: boolean;
  isAdultVerified: boolean;
  isSubscribed: boolean;
  showSampleOnly: boolean;
}

const PermissionContext = createContext<{
  permissions: PermissionState;
  setPermissions: (perms: Partial<PermissionState>) => void;
} | null>(null);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [permissions, setPermissionsState] = useState<PermissionState>({
    isLoggedIn: false,
    isAdultVerified: false,
    isSubscribed: false,
    showSampleOnly: true,
  });

  const setPermissions = (newPerms: Partial<PermissionState>) => {
    setPermissionsState((prev) => ({ ...prev, ...newPerms }));
  };

  return (
    <PermissionContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within PermissionProvider");
  }
  return context;
}

export function PermissionToggle() {
  const { permissions, setPermissions } = usePermissions();

  return (
    <Card className="mb-6">
      <CardBody>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-gray-900 mb-3">권한 시뮬레이션</div>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">로그인 상태</span>
              {permissions.isLoggedIn && <Badge variant="success" size="sm">ON</Badge>}
            </div>
            <input
              type="checkbox"
              checked={permissions.isLoggedIn}
              onChange={(e) => setPermissions({ isLoggedIn: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">성인인증</span>
              {permissions.isAdultVerified && <Badge variant="success" size="sm">ON</Badge>}
            </div>
            <input
              type="checkbox"
              checked={permissions.isAdultVerified}
              onChange={(e) => setPermissions({ isAdultVerified: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={!permissions.isLoggedIn}
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">구독 상태</span>
              {permissions.isSubscribed && <Badge variant="success" size="sm">ON</Badge>}
            </div>
            <input
              type="checkbox"
              checked={permissions.isSubscribed}
              onChange={(e) => setPermissions({ isSubscribed: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={!permissions.isLoggedIn}
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">샘플구간만 표시</span>
              {permissions.showSampleOnly && <Badge variant="warning" size="sm">ON</Badge>}
            </div>
            <input
              type="checkbox"
              checked={permissions.showSampleOnly}
              onChange={(e) => setPermissions({ showSampleOnly: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </CardBody>
    </Card>
  );
}

export function LockedContent({ 
  children, 
  requireLogin = false,
  requireAdult = false,
  requireSubscribe = false,
  showSample = false,
}: {
  children: ReactNode;
  requireLogin?: boolean;
  requireAdult?: boolean;
  requireSubscribe?: boolean;
  showSample?: boolean;
}) {
  const { permissions } = usePermissions();

  const isLocked = 
    (requireLogin && !permissions.isLoggedIn) ||
    (requireAdult && !permissions.isAdultVerified) ||
    (requireSubscribe && !permissions.isSubscribed) ||
    (showSample && permissions.showSampleOnly);

  if (isLocked) {
    const reasons: string[] = [];
    if (requireLogin && !permissions.isLoggedIn) reasons.push("로그인");
    if (requireAdult && !permissions.isAdultVerified) reasons.push("성인인증");
    if (requireSubscribe && !permissions.isSubscribed) reasons.push("구독");
    if (showSample && permissions.showSampleOnly) reasons.push("샘플구간");

    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none opacity-50">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-xs">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">콘텐츠 잠금</div>
            <div className="text-xs text-gray-600 mb-3">
              {reasons.join(", ")} 필요
            </div>
            {showSample && permissions.showSampleOnly && (
              <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                💡 샘플구간만 이용 가능합니다
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

