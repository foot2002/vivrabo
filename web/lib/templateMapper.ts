// templateMapper.ts
// screenRegistry의 path/name을 기준으로 템플릿 자동 매핑

import { ScreenSpec } from "@/components/screenRegistry";

export type TemplateType =
  | "T1" // 홈
  | "T2" // 리스트
  | "T3" // 상세
  | "T4" // 숏폼 플레이어
  | "T5" // 요약 플레이어
  | "T6" // 오디오 플레이어
  | "T7" // 웹소설 리더
  | "T8" // 마이/설정
  | "T9" // 결제/구독
  | "T10" // 시스템 상태
  | "A1" // 관리자 대시보드
  | "A2" // 테이블 목록
  | "A3" // 폼
  | "A4" // 검수 큐
  | "A5"; // 리포트

export function mapTemplate(spec: ScreenSpec): TemplateType {
  const path = spec.path.toLowerCase();
  const name = spec.name.toLowerCase();
  const id = spec.id.toLowerCase();

  // 관리자 화면
  if (path.startsWith("/admin")) {
    if (path === "/admin" || name.includes("대시보드") || id.includes("adm-002")) {
      return "A1";
    }
    if (
      name.includes("목록") ||
      name.includes("관리") ||
      (path.includes("/content") && !path.includes("/new") && !path.includes("/[id]")) ||
      path.includes("/users") ||
      path.includes("/banners") ||
      path.includes("/master")
    ) {
      return "A2";
    }
    if (
      name.includes("등록") ||
      name.includes("수정") ||
      path.includes("/new") ||
      path.includes("/[id]")
    ) {
      return "A3";
    }
    if (name.includes("검수") || name.includes("승인") || path.includes("/review")) {
      return "A4";
    }
    if (
      name.includes("리포트") ||
      name.includes("정산") ||
      name.includes("집계") ||
      path.includes("/settlement") ||
      path.includes("/revenue")
    ) {
      return "A5";
    }
    // 기본 관리자 화면은 테이블 목록
    return "A2";
  }

  // 사용자 화면
  if (path === "/" || name.includes("메인") || name.includes("홈")) {
    return "T1";
  }

  if (
    name.includes("숏폼") ||
    path.includes("/shorts/") ||
    (path.includes("/shorts") && path.includes("[contentid]"))
  ) {
    return "T4";
  }

  if (
    name.includes("요약") ||
    path.includes("/summary/") ||
    (path.includes("/summary") && path.includes("[contentid]"))
  ) {
    return "T5";
  }

  if (
    name.includes("오디오") ||
    name.includes("플레이어") ||
    (path.includes("/audio/") && !name.includes("요약"))
  ) {
    return "T6";
  }

  if (name.includes("웹소설") || name.includes("리더") || path.includes("/novel/")) {
    return "T7";
  }

  if (
    name.includes("상세") ||
    (path.includes("/content/") && path.includes("[contentid]"))
  ) {
    return "T3";
  }

  if (
    name.includes("구독") ||
    name.includes("결제") ||
    name.includes("요금") ||
    path.includes("/subscribe")
  ) {
    return "T9";
  }

  if (
    name.includes("성인인증") ||
    name.includes("인증") ||
    path.includes("/verify")
  ) {
    return "T9"; // 인증도 결제/구독 템플릿 사용
  }

  if (
    name.includes("마이") ||
    name.includes("마이페이지") ||
    name.includes("즐겨찾기") ||
    name.includes("플레이리스트") ||
    name.includes("보관함") ||
    path.includes("/me") ||
    path.includes("/favorites") ||
    path.includes("/playlists")
  ) {
    return "T8";
  }

  if (
    name.includes("권한") ||
    name.includes("차단") ||
    name.includes("점검") ||
    name.includes("장애") ||
    name.includes("안내") ||
    path.includes("/system")
  ) {
    return "T10";
  }

  if (
    name.includes("로그인") ||
    name.includes("회원가입") ||
    name.includes("비밀번호") ||
    path.includes("/login") ||
    path.includes("/signup") ||
    path.includes("/password")
  ) {
    return "T9"; // 인증 화면도 결제/구독 템플릿 사용
  }

  if (
    name.includes("목록") ||
    name.includes("인기") ||
    name.includes("신규") ||
    name.includes("카테고리") ||
    name.includes("검색") ||
    name.includes("탐색") ||
    path.includes("/popular") ||
    path.includes("/new") ||
    path.includes("/category") ||
    path.includes("/search")
  ) {
    return "T2";
  }

  // 기본값: 리스트
  return "T2";
}

