"use client";

import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import Spinner from "~~/components/Spinner";
import { IdeaCard } from "~~/components/cards";
import { PostIdeas } from "~~/components/contract-action-comps";
import { CustomModal } from "~~/components/custom-common";
import { PROPOSED_IDEAS_GRAPHQL } from "~~/services/graphQL/queries";
import { IdeaCardProps } from "~~/types/utils";

const HomePage: React.FC = () => {
  const { address } = useAccount();
  const [IsLoading, setIsLoading] = useState<boolean>(true);
  const [DataLoading, setDataLoading] = useState<boolean>(true);

  const PROPOSAL_GQL = gql(PROPOSED_IDEAS_GRAPHQL);
  const { data: ideaData, loading } = useQuery(PROPOSAL_GQL, {
    variables: { address },
    fetchPolicy: "network-only",
  });

  const data: IdeaCardProps[] = useMemo(() => {
    if (IsLoading) setIsLoading(false);
    setDataLoading(true);
    if (ideaData && !loading && address) {
      setDataLoading(false);
      return ideaData.proposalIdeas.length > 0 ? ideaData.proposalIdeas : [];
    }
    return [];
  }, [ideaData, loading, address, IsLoading]);

  return IsLoading ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <div className="absolute right-1 top-2">
        <CustomModal
          clickElement={
            <button
              className={`px-4 py-2 rounded-lg text-white transition-colors duration-300  font-semibold
           bg-green-600 hover:bg-green-500`}
            >
              Post Idea
            </button>
          }
        >
          <div>
            <PostIdeas />
          </div>
        </CustomModal>
      </div>
      <div className="container mx-auto py-8">
        {!DataLoading ? (
          data.length === 0 ? (
            <h1 className="text-center text-2xl font-bold mb-4">No Data</h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.length > 0 &&
                data.map((item: IdeaCardProps) => (
                  <IdeaCard
                    id={item.id}
                    winner={item.winner}
                    address={item.address}
                    title={item.title}
                    details={item.details}
                    createdAt={item.createdAt}
                    rating={item?.rating}
                    userRatingStatus={item?.userRatingStatus}
                    key={item.id}
                    currentAddress={address ?? ""}
                  />
                ))}
            </div>
          )
        ) : (
          <Spinner isCenter={false} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
