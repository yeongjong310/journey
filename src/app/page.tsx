import { BlogPosts } from "./components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Tory&apos;s Journey
      </h1>
      <p className="mb-4">
        면목 모동네에서 태어났다. 그 어린아이의 집은 만화방을 했다. 그의
        어머니는 만화를 보고 돈을 안내는 조직 폭력배들에게 찬물을 끼얹었다.
        (강직하셨다는거야 어머님이) 그 동네에서는 처음으로 22인치 흑백 TV가
        있었다. 그때부터 TV와 너무 친해지게 되었다. 엎어지고 넘어지는 슬랩 스틱
        코미디를 처음 맛본 4살 먹은...
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
