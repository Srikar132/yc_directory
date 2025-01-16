import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownIt from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownIt();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post , {select : editorPicks}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, {id,}),
    client.fetch(PLAYLIST_BY_SLUG,{slug : "editor-picks"})
  ])

  if (!post) return notFound();


  const parsedData = md.render(post?.pitch || "");

  return (
    <>
      <section className={`pink_container !min-h-[230px]`}>
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post?.title}</h1>

        <p className="sub-heading">{post?.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 w-full mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={post?.author?._id ? `/user/${post.author._id}` : "#"}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post?.author?.image || "/default-avatar.png"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-lg font-medium">{post?.author?.username}</p>
                <p className="text-lg font-medium text-gray-500">
                  {post?.author?.name}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post?.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>

         {parsedData ? (
            <article 
            className="porse max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{__html : parsedData}}/>
         ) : (
            <p className="no-result">No details provided</p>
         )}
          
        </div>

        <hr className="divider"/>

          {editorPicks?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Editor Picks</p>

              <ul className="card_grid-sm mt-7">
                {editorPicks.map((post:StartupTypeCard) => (
                  <StartupCard key={post._id} post={post}/>
                ))}
              </ul>
            </div>
          )}
      </section>

      <Suspense fallback={<Skeleton className="view_skeleton"/>}>
            <View id={id}/>
      </Suspense>
    </>
  );
};

export default page;
