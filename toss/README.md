# 건들북 — 토스 미니앱 빌드

웹판(저장소 루트 `index.html` + `assets/`)과 토스판은 **같은 파일**을 씁니다. 토스 빌드에만 앱인토스 SDK가 `window.AIT`로 들어가고, 그때만 토스 전용 동작(클립보드·공유 시트·뒤로가기·서점 링크 숨김·토스 분석)이 켜집니다.

- `apps-in-toss.config.ts` — appName `gundle-book`, 내비게이션 바, 권한(클립보드 쓰기)
- `build.mjs` — 루트 웹판 → `dist/` (SDK를 `vendor/ait.js`로 묶어 넣음)
- `store/` — 콘솔용 로고 600×600, 스크린샷 636×1048
- `CONSOLE.md` — 콘솔에 적을 값
- `../ANALYTICS.md` — 이벤트·퍼널

## 빌드
```
npm install
node build.mjs
npx ait build        # → gundle-book.ait
```
로컬 확인: `dist/`를 아무 웹서버로 열면 웹으로 돕니다. 주소 끝 `#events`로 최근 이벤트 보기, `?b=<책id>`로 그 책 바로 열기.
