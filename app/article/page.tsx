"use client"
// import { notFound } from "next/navigation";
import LiveTimeStamp from "../LiveTimeStamp";
import { useSearchParams } from "next/navigation";

// type Props = {
//   searchParams?: Article;
// };
const ArticlePage = () => {
  const searchParams = useSearchParams()
  // if (
  //   (searchParams && Object.entries(searchParams).length === 0) ||
  //   !searchParams
  // ) {
  //   return notFound();
  // }

  // const article: Article = searchParams;
  const image = searchParams.get('image');
  const title = searchParams.get('title');
  const author = searchParams.get('author');
  const published_at = searchParams.get('published_at');
  const description = searchParams.get('description');
  const source = searchParams.get('source');

  return (
    <article>
      <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
        {image && (
          <img
            className="h-80 max-w-md mx-auto md:max-w-lg lg:max-w-200 object-cover rounded-lg shadow-md"
            src={image}
            // alt={title}
          />
        )}
        <div className="px-10">
          <h1 className="headerTitle px-0 no-underline pb-2">
            {title}
          </h1>
        </div>
        <div className="flex divide-x-2 space-x-4">
          <h2 className="font-bold pl-4">By: {author}</h2>
          <h2 className="font-bold">Source: {source}</h2>
          <p className="pl-4">
            {/* <LiveTimeStamp time={published_at} /> */}
            {published_at}
          </p>
        </div>
        <p className="pl-4">{description}</p>
      </section>
    </article>
  );
};

export default ArticlePage;
