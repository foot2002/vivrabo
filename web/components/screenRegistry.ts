// screenRegistry.ts
// 40개 화면설계서(화면ID/경로/구성/항목/체크/요구사항ID) 기반 레지스트리
// - Next.js(App Router) 패턴을 사용: /content/[contentId] 등
// - 캐치올 라우터에서 pathname 매칭(matchPath)으로 사용하기 좋게 설계

export type ScreenSpec = {
  /** 화면(보고서) ID */
  id: string;
  /** 화면(보고서)명 */
  name: string;
  /**
   * 화면(보고서) 경로 (Next.js route pattern)
   * 예) /content/[contentId]
   */
  path: string;
  /** 화면(보고서) 구성 설명 */
  layout: string;
  /** 주요 항목 설명 */
  keyItems: string[];
  /** 주요 체크 사항 */
  checks: string[];
  /** 관련 요구사항ID */
  req: string[];
  /** 와이어(이미지) 박스 구성(선택) */
  area?: { title: string; height?: number }[];
};

export const USER_SCREENS: ScreenSpec[] = [
  {
    id: "USR-001",
    name: "메인 홈",
    path: "/",
    layout:
      "상단: 로고/검색아이콘/언어토글(옵션) / 본문: 배너슬라이더 + [콘텐츠유형 탭] + 인기/신규/추천 섹션 / 하단: 네비(홈/카테고리/보관함/마이)",
    keyItems: [
      "배너, 콘텐츠 섹션(유형별), 진입 CTA(구독/인증 유도)",
      "배너 슬라이더",
      "유형 우선 노출 섹션",
      "인기/신규 섹션 및 추천 섹션(옵션)",
    ],
    checks: [
      "비로그인 공개범위 적용",
      "유형 우선 노출 정책 적용",
      "성능(평균 응답 2초 목표) 고려",
    ],
    req: ["USER-REQ-004", "USER-REQ-007", "COM-REQ-008", "COM-REQ-005"],
    area: [
      { title: "Top Bar + Quick Links", height: 70 },
      { title: "Banner Slider", height: 160 },
      { title: "Type Tabs + Sections", height: 240 },
      { title: "Bottom Navigation", height: 70 },
    ],
  },
  {
    id: "USR-002",
    name: "로그인",
    path: "/login",
    layout:
      "입력폼(이메일/비밀번호) + 로그인버튼 + 비밀번호찾기 + 회원가입 링크",
    keyItems: [
      "이메일 입력",
      "비밀번호 입력",
      "로그인 버튼",
      "비밀번호 찾기/회원가입 링크",
    ],
    checks: ["에러 메시지 표준화", "로그인 성공 시 JWT 저장/리다이렉트"],
    req: ["USER-REQ-001", "COM-REQ-004"],
  },
  {
    id: "USR-003",
    name: "회원가입",
    path: "/signup",
    layout:
      "약관동의(필수/선택) + 이메일/비밀번호/기본정보 + 가입완료",
    keyItems: [
      "약관 동의(필수/선택)",
      "기본정보 수집(최소)",
      "약관 버전 저장",
      "가입 완료 후 로그인 유도",
    ],
    checks: ["개인정보 최소수집/보관정책 연결", "약관 버전 저장 필수"],
    req: ["USER-REQ-002", "COM-REQ-012"],
  },
  {
    id: "USR-004",
    name: "비밀번호 찾기",
    path: "/password/forgot",
    layout:
      "이메일 입력 + 인증(코드/링크) 안내 + 재설정 이동",
    keyItems: [
      "이메일 입력",
      "인증 코드/링크 발송 안내",
      "재전송/만료 안내",
    ],
    checks: ["메일 미수신/재전송/만료 처리", "스팸/오발송 방지 정책"],
    req: ["USER-REQ-003"],
  },
  {
    id: "USR-006",
    name: "인기 콘텐츠 목록",
    path: "/popular",
    layout:
      "필터(유형/장르/언어) + 카드 리스트 + 페이지네이션/무한스크롤",
    keyItems: [
      "유형/장르/언어 필터",
      "랭킹 기준(조회/청취/구매 등) 노출(옵션)",
      "카드 리스트",
      "페이지네이션/무한스크롤",
    ],
    checks: ["정렬 기준/기간 정의", "게시(공개) 상태만 노출", "성능(스크롤/페이징)"],
    req: ["USER-REQ-005", "AI-REQ-009(연계)"],
  },
  {
    id: "USR-007",
    name: "신규 콘텐츠 목록",
    path: "/new",
    layout:
      "필터(유형/장르/언어) + 카드 리스트 + 페이지네이션/무한스크롤",
    keyItems: ["유형/장르/언어 필터", "신규 기준(등록일)", "카드 리스트", "페이지네이션/무한스크롤"],
    checks: ["콘텐츠 검수 완료(게시 상태)만 노출", "정렬 기준 명확화"],
    req: ["USER-REQ-006", "ADMIN-REQ-003"],
  },
  {
    id: "USR-008",
    name: "카테고리 탐색",
    path: "/category",
    layout:
      "콘텐츠유형 1차 탭 + 장르/태그 2차 필터 + 결과 리스트",
    keyItems: [
      "유형 우선 구조(비브라보 요구)",
      "장르/태그 필터",
      "결과 리스트",
    ],
    checks: ["마스터데이터 연동(장르/태그/언어)", "유형 우선 노출 정책 반영"],
    req: ["USER-REQ-007", "COM-REQ-013", "ADMIN-REQ-013"],
  },
  {
    id: "USR-013",
    name: "검색",
    path: "/search",
    layout:
      "검색창 + 추천키워드(옵션) + 결과(유형/장르 필터)",
    keyItems: ["키워드(제목/작가/태그) 검색", "장르 필터", "유형 필터"],
    checks: ["검색 인덱싱/성능 고려", "오타/빈결과 UX"],
    req: ["USER-REQ-008", "COM-REQ-013"],
  },
  {
    id: "USR-009",
    name: "콘텐츠 상세",
    path: "/content/[contentId]",
    layout:
      "상단: 썸네일/제목/메타(유형/장르/언어/가격/등급) / 본문: 탭(숏폼/요약/본편/텍스트) + CTA(구독/인증/로그인) / 하단: 추천 콘텐츠",
    keyItems: [
      "콘텐츠 메타 + 권한별 CTA 분기",
      "타입별 탭(숏폼/요약/원본/텍스트)",
      "추천 콘텐츠 영역",
    ],
    checks: [
      "권한정책(로그인/성인/구독) 분기",
      "샘플구간 안내(‘전체 이용구간’)",
      "메타데이터 일관성",
    ],
    req: ["USER-REQ-009", "COM-REQ-002", "COM-REQ-009", "USER-REQ-018"],
  },
  {
    id: "USR-014",
    name: "숏폼 뷰어(60초)",
    path: "/shorts/[contentId]",
    layout:
      "전체화면 플레이어 + 위/아래 스크롤로 다음/이전 + 좋아요/즐겨찾기(옵션)",
    keyItems: ["60초 영상 재생", "스크롤 넘김 UX", "재생 로그 적재", "즐겨찾기(옵션)"],
    checks: ["프리로딩/네트워크 정책", "데이터 사용량", "다음 콘텐츠 로딩 실패 처리"],
    req: ["USER-REQ-010", "USER-REQ-014", "COM-REQ-005"],
    area: [
      { title: "Full-screen Player", height: 420 },
      { title: "Overlay Controls (favorite etc.)", height: 120 },
    ],
  },
  {
    id: "USR-015",
    name: "요약 뷰어(<=10분)",
    path: "/summary/[contentId]",
    layout:
      "플레이어(재생/일시정지) + 배속 변경 + N초 앞으로/뒤로 + 진행바 + 즐겨찾기",
    keyItems: ["10분 이내 요약 영상 재생", "배속 변경", "N초 이동", "즐겨찾기"],
    checks: ["N초 값 정책 확정", "요약/본편 권한 분리", "wall-to-wall 텍스트 가독성"],
    req: ["USER-REQ-011", "AI-REQ-003", "COM-REQ-009"],
  },
  {
    id: "USR-016",
    name: "원본 오디오 플레이어",
    path: "/audio/[contentId]",
    layout:
      "오디오 플레이어(배속, N초 이동, 챕터/에피소드, 이어듣기) + 즐겨찾기",
    keyItems: ["롱폼 오디오 재생", "배속 변경", "N초 이동", "이전/다음 에피소드", "이어듣기"],
    checks: ["서명URL/DRM 정책", "샘플구간 정책", "네트워크 끊김/재시도 처리"],
    req: ["USER-REQ-012", "COM-REQ-009"],
  },
  {
    id: "USR-017",
    name: "웹소설 리더",
    path: "/novel/[contentId]",
    layout:
      "리더(텍스트+이미지 삽입) + 글꼴/줄간격(옵션) + 이어읽기 + 즐겨찾기",
    keyItems: ["텍스트 표시(리더)", "이미지 삽입 표시", "이어읽기", "즐겨찾기"],
    checks: ["샘플구간(챕터/페이지) 정책", "가독성(폰트/줄간격)", "저작권/복사 방지(옵션)"],
    req: ["USER-REQ-013", "COM-REQ-009"],
  },
  {
    id: "USR-018",
    name: "즐겨찾기 목록",
    path: "/favorites",
    layout:
      "필터(유형) + 리스트 + 삭제/정렬",
    keyItems: ["즐겨찾기 추가/해제", "즐겨찾기 목록", "타입별 필터"],
    checks: ["로그인 필요 여부 정책(권장: 로그인 필수)", "권한 콘텐츠 잠금 표시"],
    req: ["USER-REQ-014"],
  },
  {
    id: "USR-010",
    name: "플레이리스트 목록",
    path: "/playlists",
    layout:
      "플레이리스트 카드 목록 + 검색(옵션)",
    keyItems: ["플레이리스트 목록", "검색(옵션)", "상세 진입"],
    checks: ["사용자 생성 여부/범위 확정", "권한 콘텐츠 표시 정책"],
    req: ["USER-REQ-015"],
  },
  {
    id: "USR-011",
    name: "플레이리스트 상세",
    path: "/playlists/[playlistId]",
    layout:
      "플레이리스트 메타 + 포함 콘텐츠 리스트 + 재생/이동",
    keyItems: ["플레이리스트 메타", "포함 콘텐츠 리스트", "재생/이동"],
    checks: ["권한 콘텐츠는 잠금 표시", "정렬/삭제 정책"],
    req: ["USER-REQ-015", "COM-REQ-002"],
  },
  {
    id: "USR-012",
    name: "마이페이지",
    path: "/me",
    layout:
      "프로필 요약 + 구독상태 + 성인인증 상태 + 최근 재생/열람 + 설정(언어)",
    keyItems: ["사용자 기본정보", "구독 상태", "성인인증 상태", "최근 재생/열람", "언어 설정"],
    checks: ["개인정보 노출 최소화", "상태값 동기화(구독/성인)", "권한 차단 UX 진입"],
    req: ["USER-REQ-016", "PAY-REQ-001", "PAY-REQ-003"],
  },
  {
    id: "PAY-001",
    name: "구독(월 정기)",
    path: "/subscribe",
    layout:
      "요금안내 + 구독하기 버튼 + 약관/환불정책 링크 + 구독상태 표시",
    keyItems: ["월 정기구독 안내", "구독하기(결제) 버튼", "약관/환불정책 링크", "구독상태 표시"],
    checks: ["3/6/12개월 선결제 없음(정책)", "결제 실패 UX", "해지/환불 정책 고지"],
    req: ["PAY-REQ-001", "PAY-REQ-005"],
  },
  {
    id: "PAY-002",
    name: "성인인증",
    path: "/verify/adult",
    layout:
      "본인인증 시작 버튼 + 진행상태 + 완료/실패 안내",
    keyItems: ["PortOne SDK 기반 휴대폰 본인인증", "성인 여부 플래그 저장", "완료/실패 UI"],
    checks: ["인증 실패/재시도/만료 처리", "개인정보 보관/파기 정책(마스킹/접근기록)"],
    req: ["PAY-REQ-003", "COM-REQ-012"],
  },
  {
    id: "CS-001",
    name: "공지 목록/상세",
    path: "/notice",
    layout:
      "목록(제목/일자) + 상세(본문)",
    keyItems: ["공지 목록", "공지 상세"],
    checks: ["점검 공지와 연동 가능", "운영자 노출 정책"],
    req: ["CS-REQ-003", "CS-REQ-004"],
  },
  {
    id: "CS-002",
    name: "FAQ",
    path: "/faq",
    layout:
      "카테고리 탭 + Q&A 아코디언",
    keyItems: ["FAQ 카테고리", "Q/A 아코디언 UI"],
    checks: ["구독/인증/재생 오류 FAQ 우선 배치"],
    req: ["CS-REQ-003"],
  },
  {
    id: "SYS-401",
    name: "권한 차단/전환",
    path: "/system/blocked",
    layout:
      "사유(로그인/성인/구독/연령) + 샘플 범위 안내 + CTA 버튼",
    keyItems: ["차단 사유 표시", "샘플 범위(전체 이용구간) 안내", "CTA(로그인/성인인증/구독)"],
    checks: ["정책(COM-REQ-008/009)과 완전 일치", "전환 KPI 측정을 위한 이벤트 로깅"],
    req: ["USER-REQ-018", "COM-REQ-008", "COM-REQ-009"],
  },
  {
    id: "SYS-MAINT",
    name: "점검/장애 안내",
    path: "/system/maintenance",
    layout:
      "점검 안내문 + 문의/공지 링크",
    keyItems: ["점검/장애 안내문", "공지/FAQ/문의 링크"],
    checks: ["운영자가 노출 제어 가능", "모니터링/알림(COM-REQ-010)과 연동 권장"],
    req: ["CS-REQ-004", "COM-REQ-010"],
  },
];

export const ADMIN_SCREENS: ScreenSpec[] = [
  {
    id: "ADM-001",
    name: "관리자 로그인",
    path: "/admin/login",
    layout:
      "아이디/비밀번호 입력 + 로그인",
    keyItems: ["관리자 계정/비밀번호", "로그인 버튼", "세션 만료 처리(옵션)"],
    checks: ["역할 기반 접근통제(RBAC) 적용", "로그인 실패 처리/잠금 정책(옵션)"],
    req: ["ADMIN-REQ-001", "COM-REQ-004"],
  },
  {
    id: "ADM-002",
    name: "관리자 대시보드",
    path: "/admin",
    layout:
      "지표 카드(콘텐츠/구독/매출/AI Job) + 차트 + 알림(실패목록)",
    keyItems: ["운영 지표 카드", "최근 실패 목록", "바로가기 링크"],
    checks: ["AI Job/웹훅 실패 알림", "KPI 리포트 연결(증빙)"],
    req: ["ADMIN-REQ-002", "COM-REQ-010"],
  },
  {
    id: "ADM-003",
    name: "콘텐츠 목록",
    path: "/admin/content",
    layout:
      "필터(유형/상태/장르/언어) + 리스트 + 등록 버튼",
    keyItems: ["콘텐츠 테이블 목록", "유형/상태/장르/언어 필터", "등록 버튼"],
    checks: ["게시상태/검수상태 기준 명확화", "대량 조회 성능(페이징/인덱스)"],
    req: ["ADMIN-REQ-003", "ADMIN-REQ-004"],
  },
  {
    id: "ADM-004",
    name: "콘텐츠 등록/수정",
    path: "/admin/content/new",
    layout:
      "폼(메타) + 파일업로드 + 타입별 필수자산 섹션 + 상태변경(작성/검수/게시)",
    keyItems: ["메타 입력 폼", "타입별 필수 자산 업로드", "상태 변경(작성/검수/게시)", "미리보기(옵션)"],
    checks: ["규격검증 실패 메시지", "대용량 업로드 재개 정책", "저장 전 검수/미리보기 흐름"],
    req: ["ADMIN-REQ-003", "ADMIN-REQ-004", "COM-REQ-007"],
    // 참고: 수정 화면(/admin/content/[id])도 동일 설계로 사용 가능
  },
  {
    id: "ADM-005",
    name: "검수/승인 큐",
    path: "/admin/review",
    layout:
      "대상 목록 + 미리보기(요약/번역/TTS) + 승인/반려 + 코멘트",
    keyItems: ["검수 대상 목록", "미리보기(요약/번역/TTS)", "승인/반려", "반려 사유 코멘트", "버전 비교(옵션)"],
    checks: ["검수자/일시 기록", "반려→재요청 흐름", "결과물 버전관리"],
    req: ["ADMIN-REQ-014", "ADMIN-REQ-008"],
  },
  {
    id: "ADM-006",
    name: "AI 작업관리",
    path: "/admin/ai-jobs",
    layout:
      "Job 리스트(요약/번역/TTS) + 상태/로그 + 재시도 + 결과 미리보기",
    keyItems: ["요약/번역/TTS Job 리스트", "상태/로그", "재시도 버튼", "결과 미리보기"],
    checks: ["실패 재시도 횟수/정책", "비용/트래픽 모니터링(옵션)", "작업 큐 안정성"],
    req: ["ADMIN-REQ-008", "AI-REQ-002~007", "COM-REQ-010"],
  },
  {
    id: "ADM-007",
    name: "배포관리",
    path: "/admin/distribution",
    layout:
      "콘텐츠 선택 + 채널 선택(YouTube/X 등) + 배포요청 + 상태/링크/실패사유",
    keyItems: ["배포 대상 채널 선택", "배포 요청", "상태/실패 사유", "배포 링크 저장", "배포 이력"],
    checks: ["채널 확장 가능한 구조", "배포 실패 재시도", "상태 표준화"],
    req: ["ADMIN-REQ-007", "ADMIN-REQ-016"],
  },
  {
    id: "ADM-008",
    name: "글로벌 연동 설정",
    path: "/admin/integrations",
    layout:
      "플랫폼별 연동키/상태 + 매핑키 관리 + 테스트 호출(옵션)",
    keyItems: ["플랫폼별 API 키/연동 상태", "콘텐츠 매핑키 관리", "테스트 호출(옵션)"],
    checks: ["1차(설정) vs 2차(자동배포) 범위 분리", "키 보안/회전 정책"],
    req: ["ADMIN-REQ-015"],
  },
  {
    id: "ADM-009",
    name: "배너관리",
    path: "/admin/banners",
    layout:
      "배너 리스트 + 등록/수정 + 노출기간/순서",
    keyItems: ["배너 CRUD", "노출기간", "노출순서", "연결 링크(콘텐츠/외부)"],
    checks: ["이미지 규격/용량 검증", "기간 겹침/중복 노출 검증"],
    req: ["ADMIN-REQ-005"],
  },
  {
    id: "ADM-010",
    name: "사용자관리",
    path: "/admin/users",
    layout:
      "검색/필터 + 사용자 상세(구독/성인인증 상태) + 제한(정책)",
    keyItems: ["사용자 목록/검색", "구독상태/성인인증 상태 조회", "정지/복구(정책에 따라)"],
    checks: ["개인정보 마스킹", "접근/조회 로그 기록", "권한 분리(운영/CS)"],
    req: ["ADMIN-REQ-006", "COM-REQ-012"],
  },
  {
    id: "ADM-011",
    name: "마스터관리",
    path: "/admin/master",
    layout:
      "장르/태그/언어/채널 탭 + CRUD",
    keyItems: ["장르/태그/언어/채널 마스터 CRUD", "검색/필터", "변경 이력"],
    checks: ["사용중 항목 삭제 제한", "마스터 변경 영향도(검색/배포/추천)"],
    req: ["ADMIN-REQ-013", "COM-REQ-013"],
  },
  {
    id: "ADM-012",
    name: "IP 정보 관리",
    path: "/admin/ip",
    layout:
      "콘텐츠 선택 + 저작권 등록정보 + 증빙첨부",
    keyItems: ["저작권 등록정보(저작자/기관/번호/일자)", "증빙 첨부", "콘텐츠 매핑"],
    checks: ["권한 분리(법무/운영)", "증빙 파일 접근정책"],
    req: ["ADMIN-REQ-009"],
  },
  {
    id: "ADM-013",
    name: "계약/만료 알림",
    path: "/admin/contracts",
    layout:
      "계약 목록 + 조건(기간/지역/매체) + 만료 D-day 알림 설정",
    keyItems: ["라이선스 조건 관리", "계약기간 이력", "만료 알림 규칙(D-30/D-7 등)", "알림 수신자"],
    checks: ["알림 채널/수신자 정책 확정", "갱신 이력 관리", "만료 시 콘텐츠 노출 정책 연계"],
    req: ["ADMIN-REQ-010", "ADMIN-REQ-011"],
  },
  {
    id: "ADM-014",
    name: "제3자 사용 이력",
    path: "/admin/revenue/usage",
    layout:
      "외부 사용처/국가/기간/채널/성과 기록 + 첨부",
    keyItems: ["사용처/국가/기간/채널", "성과(링크/조회 등)", "증빙 첨부"],
    checks: ["증빙 수준 표준화", "감사/분쟁 대응 수준으로 기록 유지"],
    req: ["ADMIN-REQ-017"],
  },
  {
    id: "ADM-015",
    name: "수익화 계약/배분",
    path: "/admin/revenue/contracts",
    layout:
      "계약 상대/배분율/정산주기/예외 + 이력",
    keyItems: ["계약 상대", "배분율", "정산 주기", "예외 조항", "계약 이력"],
    checks: ["법무/정산 권한 분리", "버전/이력 관리"],
    req: ["ADMIN-REQ-018"],
  },
  {
    id: "ADM-016",
    name: "정산 리포트",
    path: "/admin/settlement",
    layout:
      "기간/콘텐츠/계약 조건 필터 + 집계표 + 다운로드(엑셀)",
    keyItems: ["기간/콘텐츠 필터", "매출 집계표", "정산 금액 산출", "엑셀 다운로드"],
    checks: ["PG 데이터/웹훅 정합성", "누락 탐지 및 보정(PAY-REQ-006) 연계"],
    req: ["ADMIN-REQ-019", "PAY-REQ-006"],
  },
  {
    id: "ADM-017",
    name: "B2B 카탈로그",
    path: "/admin/b2b/catalog",
    layout:
      "콘텐츠 선택(패키지) + 권리범위/언어/샘플 링크 + Export(PDF/엑셀)",
    keyItems: ["카탈로그 패키지 생성", "권리범위/언어/샘플 링크 포함", "PDF/엑셀 Export"],
    checks: ["다운로드/공유 링크 방식 결정", "권한/권리 정보 포함 여부 확정"],
    req: ["ADMIN-REQ-020"],
  },
];

// 화면ID로 찾기(선택)
export const ALL_SCREENS: ScreenSpec[] = [...USER_SCREENS, ...ADMIN_SCREENS];

export function getScreenById(id: string) {
  return ALL_SCREENS.find((s) => s.id === id);
}
