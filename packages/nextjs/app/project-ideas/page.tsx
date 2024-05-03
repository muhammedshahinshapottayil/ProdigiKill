"use client";

import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import Spinner from "~~/components/Spinner";
import { IdeaCard } from "~~/components/cards";
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
      return ideaData.proposals.length > 0 ? ideaData.proposals : [];
    }
    return [];
  }, [ideaData, loading, address, IsLoading]);

  return IsLoading ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100 min-h-screen">
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
                    userAddress={item.userAddress}
                    title={item.title}
                    details={item.details}
                    createdAt={item.createdAt}
                    rating={item?.rating}
                    userRatingStatus={item?.userRatingStatus}
                    key={item.id}
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
