# VIBBRAVO 프로토타입

비브라보 프로젝트의 High-fi 프로토타입입니다. 화면설계서와 요구사항정의서를 기반으로 구현되었습니다.

## 프로젝트 구조

```
vibbravo-proto/
└── web/                    # Next.js 프로젝트
    ├── app/                # App Router
    │   ├── (user)/        # 사용자 라우트 그룹
    │   └── admin/         # 관리자 라우트
    ├── components/        # 컴포넌트
    │   ├── layouts/      # 레이아웃 컴포넌트
    │   ├── templates/    # 화면 템플릿 (T1~T10, A1~A5)
    │   └── ui/           # UI 컴포넌트
    ├── lib/              # 유틸리티 및 데이터
    └── public/           # 정적 파일
```

## 주요 기능

### 화면 템플릿 시스템
- **사용자 템플릿 (T1~T10)**: 홈, 리스트, 상세, 플레이어, 리더, 마이페이지, 결제, 시스템 상태
- **관리자 템플릿 (A1~A5)**: 대시보드, 테이블 목록, 폼, 검수 큐, 리포트

### 디자인 시스템
- 그레이 기반 색상 + 블루 포인트 컬러
- 일관된 타이포그래피, 간격, 라운드, 그림자 규칙
- 재사용 가능한 UI 컴포넌트 (Button, Input, Tab, Badge, Card, Table, Modal, Toast)

### 권한 시뮬레이션
- 로그인/성인인증/구독 상태 토글로 시뮬레이션
- 샘플구간 정책 시각화
- 권한별 콘텐츠 잠금 표시

### 비브라보 요구사항 구현
- 콘텐츠 4타입: SHORTS, SUMMARY, AUDIO, NOVEL
- 뷰어 기능: 배속, N초 이동, 이어듣기/읽기
- 월정기구독: 요금제 카드, 결제 프로세스
- 본인인증: PortOne SDK 기반 인증 안내
- SNS 배포: YouTube/X/Facebook/Instagram 배포 관리

## 시작하기

### 설치

```bash
cd web
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

서버는 `http://localhost:8000`에서 실행됩니다.

### 빌드

```bash
npm run build
npm start
```

## 기술 스택

- **Next.js 16.1.1** (App Router)
- **React 19.2.3**
- **TypeScript**
- **Tailwind CSS 4**

## 화면 구조

모든 화면은 `screenRegistry.ts`에 정의되어 있으며, 자동으로 적절한 템플릿에 매핑됩니다.

- 사용자 화면: `/`, `/login`, `/content/[contentId]`, `/shorts/[contentId]` 등
- 관리자 화면: `/admin`, `/admin/content`, `/admin/review` 등

## 주요 파일

- `components/screenRegistry.ts`: 화면 설계서 기반 레지스트리
- `lib/templateMapper.ts`: 화면을 템플릿으로 자동 매핑
- `lib/requirementRegistry.ts`: 요구사항정의서 기반 레지스트리
- `lib/permissionSimulator.tsx`: 권한 시뮬레이션 컴포넌트
- `components/templates/`: 화면 템플릿 컴포넌트

## 라이선스

프로젝트 내부 사용

