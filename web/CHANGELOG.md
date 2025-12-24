# 변경 사항 요약

## 변경된 파일 목록

### 1. 요구사항 및 권한 관리
- **`lib/requirementRegistry.ts`** (신규)
  - 요구사항정의서 기반 요구사항 레지스트리
  - 주요 비브라보 요구사항 정의 (COM-REQ, USER-REQ, ADMIN-REQ, AI-REQ, PAY-REQ, CS-REQ)

- **`lib/permissionSimulator.tsx`** (신규)
  - 권한 시뮬레이션 토글 컴포넌트
  - PermissionProvider, PermissionToggle, LockedContent 컴포넌트
  - 로그인/성인인증/구독/샘플구간 상태 관리

- **`lib/screenRegistryValidator.ts`** (신규)
  - screenRegistry 정합성 검증 유틸리티
  - 동적 라우트 샘플값 생성 (pathToSample)
  - 요구사항ID 유효성 검증

### 2. 레이아웃 및 스캐폴드
- **`app/layout.tsx`**
  - PermissionProvider 추가
  - 메타데이터 업데이트

- **`components/PageScaffold.tsx`**
  - PermissionToggle 통합 (사용자 화면에만 표시)
  - 동적 라우트 샘플 경로 표시
  - pathToSample 함수 활용

### 3. 템플릿 업데이트 (체크 사항 및 비브라보 요구사항 반영)

#### 사용자 템플릿
- **`components/templates/T1_Home.tsx`**
  - 비로그인 공개범위 안내 배지 추가
  - 유형 우선 노출 배지 표시
  - LockedContent로 권한 체크

- **`components/templates/T3_Detail.tsx`**
  - 샘플구간 안내 배지 추가
  - 권한별 CTA 버튼 분기 (로그인/성인인증/구독)
  - LockedContent로 추천 콘텐츠 권한 체크

- **`components/templates/T4_ShortsPlayer.tsx`**
  - 샘플구간 안내 추가
  - LockedContent로 플레이어 권한 체크

- **`components/templates/T5_SummaryPlayer.tsx`**
  - 샘플구간 안내 추가
  - LockedContent로 플레이어 권한 체크

- **`components/templates/T6_AudioPlayer.tsx`**
  - 샘플구간 안내 추가
  - LockedContent로 플레이어 권한 체크

- **`components/templates/T7_NovelReader.tsx`**
  - 샘플구간 안내 추가
  - LockedContent로 리더 본문 권한 체크

- **`components/templates/T9_Payment.tsx`**
  - 월정기구독 안내 추가 ("월 정기구독 (자동 갱신)")
  - 3/6/12개월 선결제 없음 정책 표시

#### 관리자 템플릿
- **`components/templates/A2_TableList.tsx`**
  - SNS 배포 관리 섹션 추가
  - YouTube/X/Facebook/Instagram 배포 버튼
  - 배포 상태 및 링크 안내

## 반영한 요구사항ID 목록

### 공통 요구사항 (COM-REQ)
- COM-REQ-001: 콘텐츠 유형 4종 지정 (SHORTS, SUMMARY, AUDIO, NOVEL)
- COM-REQ-002: 콘텐츠 메타데이터 관리
- COM-REQ-004: 인증/세션 관리
- COM-REQ-005: 성능 최적화
- COM-REQ-007: 파일 업로드 관리
- COM-REQ-008: 비로그인 공개범위
- COM-REQ-009: 샘플구간 정책
- COM-REQ-010: 모니터링/알림
- COM-REQ-012: 개인정보 보호
- COM-REQ-013: 마스터데이터 관리

### 사용자 요구사항 (USER-REQ)
- USER-REQ-001: 회원가입
- USER-REQ-002: 회원가입 프로세스
- USER-REQ-003: 비밀번호 찾기
- USER-REQ-004: 메인 홈
- USER-REQ-005: 인기 콘텐츠
- USER-REQ-006: 신규 콘텐츠
- USER-REQ-007: 유형 우선 노출
- USER-REQ-008: 검색 기능
- USER-REQ-009: 콘텐츠 상세
- USER-REQ-010: 숏폼 뷰어
- USER-REQ-011: 요약 뷰어
- USER-REQ-012: 오디오 플레이어
- USER-REQ-013: 웹소설 리더
- USER-REQ-014: 즐겨찾기
- USER-REQ-015: 플레이리스트
- USER-REQ-016: 마이페이지
- USER-REQ-018: 권한 정책

### 결제 요구사항 (PAY-REQ)
- PAY-REQ-001: 월 정기구독
- PAY-REQ-003: 성인인증 (PortOne SDK)
- PAY-REQ-005: 결제/환불 정책
- PAY-REQ-006: 정산 관리

### 관리자 요구사항 (ADMIN-REQ)
- ADMIN-REQ-001: 관리자 인증 (RBAC)
- ADMIN-REQ-002: 대시보드
- ADMIN-REQ-003: 콘텐츠 관리
- ADMIN-REQ-004: 콘텐츠 등록/수정
- ADMIN-REQ-005: 배너 관리
- ADMIN-REQ-006: 사용자 관리
- ADMIN-REQ-007: 배포 관리
- ADMIN-REQ-008: AI 작업 관리
- ADMIN-REQ-009: IP 정보 관리
- ADMIN-REQ-010: 계약 관리
- ADMIN-REQ-011: 만료 알림
- ADMIN-REQ-013: 마스터 관리
- ADMIN-REQ-014: 검수/승인
- ADMIN-REQ-015: 글로벌 연동
- ADMIN-REQ-016: SNS 배포
- ADMIN-REQ-017: 제3자 사용 이력
- ADMIN-REQ-018: 수익화 계약
- ADMIN-REQ-019: 정산 리포트
- ADMIN-REQ-020: B2B 카탈로그

### AI 요구사항 (AI-REQ)
- AI-REQ-002: AI 요약 생성
- AI-REQ-003: 요약 품질 관리
- AI-REQ-009: AI 추천 연계

### 고객서비스 요구사항 (CS-REQ)
- CS-REQ-003: 공지/FAQ
- CS-REQ-004: 점검 안내

## 누락/결정필요(TBD) 항목 리스트

### 1. screenRegistry.ts 정합성
- ✅ 동적 라우트 샘플값 자동 생성 구현 완료
- ⚠️ 일부 요구사항ID 범위 표기 (예: AI-REQ-002~007) 처리 필요
  - 현재는 범위를 개별 ID로 확장하여 검증하도록 구현됨

### 2. 체크 사항 UI 반영
- ✅ 비로그인 공개범위: T1_Home에 안내 배지 추가
- ✅ 샘플구간: 모든 뷰어 템플릿에 안내 배지 추가
- ✅ 성인인증: T3_Detail에 CTA 버튼 분기
- ✅ 구독 상태: 모든 뷰어 템플릿에 잠금 표시
- ✅ 권한별 토글: PermissionToggle 컴포넌트로 시뮬레이션 가능

### 3. 비브라보 요구사항 구현
- ✅ 콘텐츠 4타입: SHORTS, SUMMARY, AUDIO, NOVEL 모든 템플릿에 반영
- ✅ 뷰어 기능: 각 뷰어 템플릿에 배속/N초 이동/이어듣기 등 구현
- ✅ 월정기구독: T9_Payment에 월 정기구독 안내 및 정책 표시
- ✅ 본인인증: T9_Payment에 PortOne SDK 기반 인증 안내
- ✅ SNS배포: A2_TableList에 YouTube/X/Facebook/Instagram 배포 기능 추가

### 4. TBD 항목
- ⚠️ 실제 PortOne SDK 연동 (현재는 UI만 구현)
- ⚠️ 실제 결제 프로세스 (현재는 UI만 구현)
- ⚠️ 실제 SNS API 연동 (현재는 UI만 구현)
- ⚠️ AI 작업 모니터링 실제 연동 (A1_Dashboard 차트 placeholder)
- ⚠️ 정산 리포트 실제 데이터 연동 (A5_Report)
- ⚠️ B2B 카탈로그 Export 기능 (A2_TableList, A5_Report)

### 5. screenRegistry.ts 보강 필요 사항
- ⚠️ USR-005 화면 누락 확인 필요 (이미지에서 확인되지 않음)
- ✅ 동적 라우트 샘플값은 pathToSample 함수로 자동 생성됨
- ✅ 모든 화면의 요구사항ID 매핑 확인 완료

## 주요 개선 사항

1. **권한 시뮬레이션**: 모든 사용자 화면에서 권한 상태를 토글로 시뮬레이션 가능
2. **체크 사항 시각화**: 각 화면의 체크 사항을 배지/안내문으로 표시
3. **비브라보 요구사항 명시**: 4타입 콘텐츠, 월정기구독, 본인인증, SNS배포 등 핵심 요구사항 UI 구현
4. **샘플구간 정책**: 모든 뷰어에 샘플구간 안내 및 잠금 표시
5. **동적 라우트 샘플값**: screenRegistry의 동적 라우트를 샘플값으로 자동 변환하여 표시

