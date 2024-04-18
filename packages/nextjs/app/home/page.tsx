"use client";

import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import ProposalCard from "~~/components/ProposalCard";
import Spinner from "~~/components/Spinner";
import { Proposal } from "~~/types/utils";

const HomePage: React.FC = () => {
  enum Status {
    Pending,
    Accepted,
    Rejected,
    INCompleted,
    Completed,
  }

  const [IsLoading, setIsLoading] = useState<boolean>(true);
  const [status] = useState<Status>(Status.Pending);

  const { address } = useAccount();
  const PROPOSAL_GRAPHQL = `
  query MyQuery($address: String!, $currentDate: BigInt!,$status:Int) {
    proposals(where: {finalDate_gt: $currentDate, withdrawal: false,status:$status}
      orderBy: createdAt
      orderDirection: desc
    ) {
      withdrawal
      userAddress
      updatedAt
      transactionHash
      title
      status
      id
      finalDate
      details
      createdAt
      userRatingStatus: proposalRating(where: {userAddress: $address}) {
        status
        updatedAt
        userAddress
        id
      }
      rating: proposalRating (where: {status: true}) {
        status
      }
    }
  }
`;

  const PROPOSAL_GQL = gql(PROPOSAL_GRAPHQL);
  const currentDate = Math.floor(Date.now() / 1000);
  const { data: proposalData, loading } = useQuery(PROPOSAL_GQL, {
    variables: { address, currentDate, status },
    fetchPolicy: "network-only",
  });

  const data: Proposal[] = useMemo(() => {
    if (proposalData && !loading && address) {
      return proposalData.proposals.length > 0 ? proposalData.proposals : [];
    }
    setIsLoading(false);
    return [];
  }, [proposalData, loading, address]);

  return IsLoading ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-900 text-white py-6">
        <h1 className="text-center text-2xl font-bold">A Platform to Combat Procrastination</h1>
      </header>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 &&
            data.map((item: Proposal) => (
              <ProposalCard
                id={item.id}
                finalDate={item.finalDate}
                userAddress={item.userAddress}
                title={item.title}
                details={item.details}
                createdAt={item.createdAt}
                rating={item.rating}
                status={item.status}
                userRatingStatus={item.userRatingStatus}
                key={item.transactionHash}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
