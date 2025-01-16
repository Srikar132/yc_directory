export const experimental_ppr = true;

import { auth } from "@/auth";
import { StartupSkeletion } from "@/components/StartupCard";
import UserStartUpCard from "@/components/UserStartUpCard";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const Page =async ({params} : {params : Promise<{id : string}>}) => {
    const id = (await params).id;
    const session = await auth();
    const user = await client.fetch(AUTHOR_BY_ID,{id});

    if(!user) notFound();


  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.image}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">@{user?.username}</p>
          <p className="text-14-normal mt-1 text-center">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All" } Startups
          </p>

          <ul className="card_grid-sm gap-5">
            <Suspense fallback={<StartupSkeletion/>}>
              <UserStartUpCard id={id}/>
            </Suspense>
          </ul>
        </div>

      </section>
    </>
  )
}

export default Page