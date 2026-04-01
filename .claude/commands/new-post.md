# /new-post 명령어

새로운 블로그 포스트를 생성합니다.

## 사용법

`/new-post [주제 또는 옵션]`

$ARGUMENTS 에 작성할 주제나 키워드를 전달합니다.
$ARGUMENTS 가 비어있으면, 어떤 주제의 포스트를 작성할지 질문합니다.

## 절차

1. 사용자에게 다음 정보를 확인한다 ($ARGUMENTS 에서 유추 가능한 항목은 생략):
   - **제목** (title): 포스트 제목
   - **요약** (summary): 한 줄 요약
   - **카테고리**: 일반 포스트(`src/posts/`) 또는 하위 디렉토리(`src/posts/TIL/`, `src/posts/R3F/` 등)
   - **파일명**: slug로 사용될 파일명 (예: `my-post.mdx`). TIL의 경우 날짜 형식 `YYYY.MM.DD.mdx`

2. 포스트 파일을 생성한다:
   - 경로: `src/posts/{카테고리}/{파일명}.mdx`
   - frontmatter 포함:
     ```
     ---
     title: "{제목}"
     publishedAt: "{오늘 날짜 YYYY-MM-DD}"
     summary: "{요약}"
     ---
     ```

3. $ARGUMENTS 에 주제가 포함되어 있다면, 해당 주제에 대한 초안 구조(헤딩, 섹션)를 제안한다.

4. 생성된 파일 경로를 알려준다.

## 참고

- 기존 포스트 목록: `src/posts/` 하위의 `.mdx` 파일들
- frontmatter 필수 필드: `title`, `publishedAt`, `summary`
- `image` 필드는 선택사항
- 날짜 형식: `YYYY-MM-DD`
- 파일명은 URL slug로 사용되므로 영문 소문자, 하이픈, 숫자만 사용 (TIL 제외)
