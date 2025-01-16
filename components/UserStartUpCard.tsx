import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY_BY_ID } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserStartUpCard = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_QUERY_BY_ID, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard, index: number) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts found.</p>
      )}
    </>
  );
};

export default UserStartUpCard;
