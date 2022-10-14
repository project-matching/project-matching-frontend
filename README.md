## 프로젝트 소개

---

다양한 직군이 모여 프로젝트를 함께 진행하기 위한 구인 사이트

[프로젝트 주소](http://ec2-3-37-7-111.ap-northeast-2.compute.amazonaws.com:3000/)

## 프로젝트 기간

---

2022년 07월 4일~2022년 10월 15일

## 프론트엔드 사용 기술

---

- NextJS
- TypeScript
- emotion
- Redux
- Redux-saga

## 프로젝트 구조

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7d71d03d-4d93-467a-8eb5-73d57db746af/Untitled.png)

## 프로젝트 목표

---

- 사용자 편의성을 위한 일관적이고 직관적인 UX/UI
- git을 활용한 원활한 협업
  - git-flow 브랜치 전략 이용
  - 일관된 git commit 메시지 작성을 위한 commitlint
  - 구체적인 branch 이름
  - 매 push 마다 빌드 및 테스트 검사 후 통과 시에만 remote 레포지토리로 push
- NextJS를 통한 SEO에 유리한 SSR 앱 구축
- Lighthouse 모든 지수 80% 이상
- 코드 리뷰와 리팩토링을 통한 코드 품질 유지

## 유즈케이스

---

[유즈케이스 주소](https://www.notion.so/5e6e4ff5d5ba462f8da22a56ee696740)

## 와이어 프레임

---

[와이어 프레임 주소](https://www.figma.com/file/oziJXYjB3leZwpyObhXsPx/project-matching?node-id=0%3A1)

## 문제 해결 과정

---

- [인가 방법 리서치](https://str21.notion.site/b5c29ee9a63f47e69712ad6ba95fc2ae)
- [OAuth 팝업 구현 과정](https://str21.notion.site/OAuth-8b3ca9206d914a12a7c67adbafce9951)
- [로그인 구현](https://str21.notion.site/7457612bfb874045a6e8b430317d2a17)
- [NextJS SSG 구현](https://str21.notion.site/NextJS-SSG-4cf6fde668c044ed9e46e2d27dd93701)
- [Momont.js에서 Day.js로: 라이브러리 변경기](https://str21.notion.site/Momont-js-Day-js-12f952ee97274582b5e9e90af8134f5e)
- [중복 렌더링 이슈](https://str21.notion.site/90b6649752b74d7aa20ffa9dc80c9e80)
- [불필요한 API 호출 해결](https://str21.notion.site/API-1a92693a8cc14a01b4d5ef0009299ca0)

## 추후 개선 사항

---

- 유닛 테스트 및 통합 테스트 구축
- 서버 통신 및 캐싱 방법 변경 (redux-saga → react-query)
- 효율성 개선
