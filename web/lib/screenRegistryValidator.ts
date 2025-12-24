// screenRegistryValidator.ts
// screenRegistry 정합성 검증 및 보강 유틸리티

import { ScreenSpec } from "@/components/screenRegistry";
import { getAllRequirementIds } from "./requirementRegistry";

/**
 * 동적 라우트 경로를 샘플값으로 변환
 * 예: /content/[contentId] -> /content/123
 */
export function pathToSample(path: string): string {
  return path
    .replace(/\[contentId\]/g, "123")
    .replace(/\[playlistId\]/g, "playlist-001")
    .replace(/\[id\]/g, "456")
    .replace(/\[\.\.\.slug\]/g, "sample")
    .replace(/\[\[\.\.\.slug\]\]/g, "");
}

/**
 * screenRegistry 정합성 검증
 */
export function validateScreenRegistry(screens: ScreenSpec[]): {
  valid: boolean;
  errors: string[];
  warnings: string[];
  missingReqs: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const missingReqs: string[] = [];
  const validReqIds = getAllRequirementIds();

  screens.forEach((screen, index) => {
    // 필수 필드 검증
    if (!screen.id) {
      errors.push(`Screen ${index}: ID 누락`);
    }
    if (!screen.name) {
      errors.push(`Screen ${index}: 이름 누락`);
    }
    if (!screen.path) {
      errors.push(`Screen ${index}: 경로 누락`);
    }
    if (!screen.req || screen.req.length === 0) {
      warnings.push(`Screen ${screen.id}: 요구사항ID 누락`);
    }

    // 요구사항ID 유효성 검증
    if (screen.req) {
      screen.req.forEach((reqId) => {
        // (연계) 같은 표기 제거
        const cleanReqId = reqId.replace(/\s*\(연계\)\s*/, "").trim();
        
        // 범위 표기 처리 (예: AI-REQ-002~007)
        if (cleanReqId.includes("~")) {
          const [prefix, range] = cleanReqId.split("~");
          const baseMatch = prefix.match(/^([A-Z]+-REQ-)(\d+)$/);
          if (baseMatch) {
            const [, reqPrefix, startNum] = baseMatch;
            const endNum = parseInt(range);
            const start = parseInt(startNum);
            for (let i = start; i <= endNum; i++) {
              const fullReqId = `${reqPrefix}${i.toString().padStart(3, "0")}`;
              if (!validReqIds.includes(fullReqId)) {
                missingReqs.push(`${screen.id}: ${fullReqId}`);
              }
            }
          }
        } else if (!validReqIds.includes(cleanReqId)) {
          missingReqs.push(`${screen.id}: ${cleanReqId}`);
        }
      });
    }

    // 동적 라우트 샘플값 생성 가능 여부 확인
    if (screen.path.includes("[") && !screen.path.includes("sample")) {
      // 경고만 (에러 아님)
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    missingReqs: [...new Set(missingReqs)],
  };
}

/**
 * ScreenSpec에 샘플 경로 추가
 */
export function enhanceScreenWithSample(screen: ScreenSpec): ScreenSpec & { samplePath: string } {
  return {
    ...screen,
    samplePath: pathToSample(screen.path),
  };
}

