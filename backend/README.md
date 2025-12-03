# 명지대학교 국제교류센터 게시판 - 백엔드

간단한 게시판 CRUD와 Prometheus 메트릭(/actuator/prometheus)을 제공하는 Spring Boot 백엔드야.

## 로컬 실행 방법

```bash
# Java 17, Gradle 8.x 가 설치되어 있다고 가정
cd mju-global-board-be

# 빌드 & 실행
gradle bootRun
```

기본 포트는 `8080`이고, 주요 엔드포인트는 다음과 같아:

- `GET  /api/posts?category=NOTICE` : 목록 조회 (카테고리 옵션)
- `GET  /api/posts/{id}` : 단건 조회
- `POST /api/posts` : 작성
- `PUT  /api/posts/{id}` : 수정
- `DELETE /api/posts/{id}` : 삭제
- `GET  /actuator/health` : 헬스체크
- `GET  /actuator/prometheus` : Prometheus 메트릭
- `GET  /h2-console` : H2 콘솔 (개발용)
```
