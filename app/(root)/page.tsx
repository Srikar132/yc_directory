import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

 const Home =  async ({
    searchParams
}: { searchParams: Promise<{ query: string }> }) => {
    const query = (await searchParams)?.query;
    const params = {
        search : query || null
    }
     const {data : posts} = await sanityFetch({query : STARTUPS_QUERY , params});
  return (
    <>
        <section className={`pink_container`}>
            <h1 className={"heading !max-w-3xl"}
            >Pitch Your Starup , <br/> Connect with Entrprepreneurs</h1>
            <p className={`sub-heading !max-w-3xl `}>Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competetions</p>

            <SearchForm query={query} />
        </section>

        <section className={`section_container`}>
            <p className={'text-30-semibold'}>
                {query ? `Search results for ${query}` : 'All Startups'}
            </p>

            <ul className={`mt-7 card_grid`}>
                {posts.length > 0 ? (
                    posts.map((post : StartupTypeCard) => (
                        <StartupCard post={post} key={post?._id} />
                    ))
                ) : (
                   "No results found for this page."
                )}
            </ul>
        </section>

        <SanityLive/>
    </>
  );
};


export default Home
