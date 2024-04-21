"use client";

import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import ProposalCard from "~~/components/ProposalCard";
import Spinner from "~~/components/Spinner";
import StatusTabs from "~~/components/StatusTabs";
import {
  PROPOSAL_ACCEPTED_GRAPHQL,
  PROPOSAL_PENDING_GRAPHQL,
  PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL,
  USER_PROPOSAL_ACCEPTED_GRAPHQL,
  USER_PROPOSAL_PENDING_GRAPHQL,
  USER_PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL,
} from "~~/services/graphQL/queries";
import { Proposal, Status } from "~~/types/utils";

const HomePage: React.FC = () => {
  const { address } = useAccount();
  const [IsLoading, setIsLoading] = useState<boolean>(true);
  const [DataLoading, setDataLoading] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(Status.Pending);

  const PROPOSAL_GQL = gql(
    toggle === false
      ? status === Status.Pending
        ? PROPOSAL_PENDING_GRAPHQL
        : status === Status.Accepted
        ? PROPOSAL_ACCEPTED_GRAPHQL
        : status === Status.Rejected || status === Status.INCompleted || status === Status.Completed
        ? PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL
        : ""
      : toggle === true
      ? status === Status.Pending
        ? USER_PROPOSAL_PENDING_GRAPHQL
        : status === Status.Accepted
        ? USER_PROPOSAL_ACCEPTED_GRAPHQL
        : status === Status.Rejected || status === Status.INCompleted || status === Status.Completed
        ? USER_PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL
        : ""
      : "",
  );
  const currentDate = Math.floor(Date.now() / 1000);
  const { data: proposalData, loading } = useQuery(PROPOSAL_GQL, {
    variables: { address, currentDate, status },
    fetchPolicy: "network-only",
  });

  const data: Proposal[] = useMemo(() => {
    if (IsLoading) setIsLoading(false);
    setDataLoading(true);
    if (proposalData && !loading && address && status in Status) {
      setDataLoading(false);
      return proposalData.proposals.length > 0 ? proposalData.proposals : [];
    }
    return [];
  }, [proposalData, loading, address, status, IsLoading]);

  return IsLoading ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <StatusTabs setToggle={setToggle} toggle={toggle} status={status} setStatus={setStatus} />

      <div className="container mx-auto py-8">
        {!DataLoading ? (
          data.length === 0 ? (
            <h1 className="text-center text-2xl font-bold mb-4">No Data</h1>
          ) : (
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
                    rating={item?.rating}
                    status={item.status}
                    userRatingStatus={item?.userRatingStatus}
                    currentAddress={address ?? ""}
                    renewRequest={item?.renewRequest}
                    submitProof={item?.submitProof}
                    key={item.transactionHash}
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
