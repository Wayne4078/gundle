# 건들북 — 이벤트·퍼널 (빌드 1.0.0)

모든 기록은 `track(name, params)` 하나로 남깁니다. 개인 정보와 직접 쓴 글은 남기지 않습니다.

**공통 봉투**: `ts`, `seq`, `sid`(열 때마다 새로), `uid`(기기에만 있는 익명 키), `build`, `platform`(web / toss), `lang`, `screen`, `day`(처음 연 날로부터 며칠째, 한국 시각)

**쌓이는 곳**
- 기기 `localStorage['gundle-events']` 최근 300개
- 토스 `Analytics.log` (토스 5.208.0+, 실서비스만, 콘솔 분석 > 이벤트에 다음 날)
- `gtag` / `dataLayer` 있으면
- 주소 끝 `#events` → 왼쪽 아래에 최근 14개

## 이벤트
| 단계 | 이벤트 | 주요 값 |
|---|---|---|
| 유입 | `first_open` | utm_*, ref (처음 한 번) |
| 유입 | `app_open` | first, session_no, utm_* |
| 유입 | `deeplink_open` | book (받은 링크 `?b=`로 열림) |
| 시작 | `loading_complete` | ms, intro(일러두기 떴는지) |
| 온보딩 | `intro_close` / `intro_reopen` | wait_s |
| 이동 | `screen_view` | screen, from, book |
| 활성 | `book_start` | book, preset, from(today/shelf) |
| 읽기 | `preset_change` | to |
| 읽기 | `deep_open` | book, open |
| 읽기 | `line_copy` | book, preset |
| 읽기 | `flip` | book, q, locked |
| **핵심** | `receipt_view` | book, preset, touch_s, flipped, book_no(평생 몇 번째 영수증) |
| 약관 | `terms_agree` | how(read/skip) |
| 숨은 층 | `pocket_open` → `pocket_step` → `cheat_len` → `cheat_view` / `cheat_copy` / `pocket_close` | book, len, preset |
| 퍼뜨리기 | `share_click` / `share_done` | book, as(toss/copy) |
| 바깥 | `store_click` | book (웹만) |
| 투표 | `movie_poll`, `next_vote` | to |
| 재방문 | `ask_answer` | to(a/b/later), k |
| 이탈 | `app_background` / `app_foreground` | session_s / away_s |

## 퍼널
app_open → loading_complete → intro_close → book_start → screen_view(three) → screen_view(line) → screen_view(test) → receipt_view → share_click → share_done

**바이럴 고리**: share_done → (받은 분) first_open(utm_source=share, utm_campaign=receipt) → deeplink_open → receipt_view → share_done …

## 지표
- 활성 = book_start ÷ first_open
- 완독(?)률 = receipt_view ÷ book_start
- 공유율 = share_click ÷ receipt_view (기획서 목표 15%)
- 숨은 층 발견율 = pocket_open ÷ receipt_view
- D1·D7 = day 1·7의 app_open
- 이탈 = 화면별 app_background

## 마케팅 전환
| 전환 | 이벤트 |
|---|---|
| 설치·열기 | `first_open` |
| 활성 | `book_start` |
| 핵심 | `receipt_view` |
| 깊이 쓰는 사람 | `receipt_view`의 book_no 3 이상 |
| 재방문 | day = 1인 `app_open` |
| 퍼뜨리기 | `share_done` |
| 바이럴 유입 | `deeplink_open` |
