// pathMatch.ts
// Next.js 동적 라우트 패턴과 실제 경로를 매칭하는 유틸리티

/**
 * Next.js 라우트 패턴(예: /content/[contentId])을 정규식으로 변환
 * @param pattern - Next.js 라우트 패턴 (예: "/content/[contentId]", "/")
 * @returns 정규식 패턴
 */
export function patternToRegex(pattern: string): RegExp {
  // 루트 경로는 특별 처리
  if (pattern === "/") {
    return new RegExp("^/$");
  }

  // 정확한 경로 매칭을 위해 시작과 끝 앵커 추가
  const escaped = pattern
    .replace(/\//g, "\\/") // 슬래시 이스케이프
    .replace(/\[\[\.\.\.(\w+)\]\]/g, "(.*)") // optional catch-all: [[...slug]] -> (.*)
    .replace(/\[\.\.\.(\w+)\]/g, "(.+)") // catch-all: [...slug] -> (.+)
    .replace(/\[(\w+)\]/g, "([^/]+)"); // 동적 세그먼트: [id] -> ([^/]+)

  return new RegExp(`^${escaped}$`);
}

/**
 * 경로가 패턴과 일치하는지 확인
 * @param pathname - 실제 경로 (예: "/content/123")
 * @param pattern - Next.js 라우트 패턴 (예: "/content/[contentId]")
 * @returns 일치 여부
 */
export function matchPath(pathname: string, pattern: string): boolean {
  const regex = patternToRegex(pattern);
  return regex.test(pathname);
}

/**
 * 여러 패턴 중 경로와 일치하는 첫 번째 패턴 찾기
 * @param pathname - 실제 경로
 * @param patterns - 패턴 배열
 * @returns 일치하는 패턴 또는 null
 */
export function findMatchingPattern(
  pathname: string,
  patterns: string[]
): string | null {
  for (const pattern of patterns) {
    if (matchPath(pathname, pattern)) {
      return pattern;
    }
  }
  return null;
}

/**
 * 경로에서 동적 세그먼트 값 추출
 * @param pathname - 실제 경로 (예: "/content/123")
 * @param pattern - Next.js 라우트 패턴 (예: "/content/[contentId]")
 * @returns 파라미터 객체 (예: { contentId: "123" })
 */
export function extractParams(
  pathname: string,
  pattern: string
): Record<string, string> {
  const params: Record<string, string> = {};

  // 루트 경로는 파라미터 없음
  if (pattern === "/" || pathname === "/") {
    return params;
  }

  // 패턴에서 파라미터 이름 추출
  const paramNames: string[] = [];
  const paramPattern = pattern.replace(
    /\[\[\.\.\.(\w+)\]\]|\[\.\.\.(\w+)\]|\[(\w+)\]/g,
    (match, optionalCatchAll, catchAll, single) => {
      const name = optionalCatchAll || catchAll || single;
      paramNames.push(name);
      if (optionalCatchAll) {
        return "(.*)"; // optional catch-all
      } else if (catchAll) {
        return "(.+)"; // catch-all
      } else {
        return "([^/]+)"; // single segment
      }
    }
  );

  // 경로에서 값 추출
  const regex = new RegExp(`^${paramPattern.replace(/\//g, "\\/")}$`);
  const matches = pathname.match(regex);

  if (matches) {
    paramNames.forEach((name, index) => {
      params[name] = matches[index + 1] || "";
    });
  }

  return params;
}

