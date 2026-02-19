# /spell 명령어

$ARGUMENTS 경로의 MDX 파일에 대해 맞춤법 교정을 수행합니다. 
$ARGUMENTS 가 없는 경우, posts 의 mdx 중 선택할 수 있도록 한다.

1. 해당 파일을 읽는다
2. `pnpm spell $ARGUMENTS` 로 맞춤법 검사를 실행한다
3. 검사 결과를 분석하고, 코드 블록/import/export 구문은 무시한다
4. 한국어 텍스트 부분만 교정사항을 적용한다
5. 교정 전/후를 비교하여 보여준다
```

사용 예:
```
/spell ./src/posts/TIL/2026.02.08.mdx