"use client";

import React, { useState } from "react";
import LikeButton from "../LikeButton";
import { PostRenewal, PostSubmit } from "../contract-action-comps";
import { CustomModal } from "../custom-common";
import RenewCard from "./RenewCard";
import { format, fromUnixTime, parseISO } from "date-fns";
import { BsCalendarCheck } from "react-icons/bs";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ProposalCardProps, Status } from "~~/types/utils";
import { getID } from "~~/utils";
import { notification } from "~~/utils/scaffold-eth";

const ProposalCard: React.FC<ProposalCardProps> = ({
  title,
  details,
  createdAt,
  finalDate,
  id,
  status,
  currentAddress,
  userAddress,
  toggle,
  withdrawStatus,
  userRatingStatus = [],
  rating = [],
  submitProof = [],
  renewRequest = [],
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    status === Status.Accepted
      ? submitProof.length > 0
        ? submitProof[0].userLiked.length > 0
        : userRatingStatus.length > 0
      : userRatingStatus.length > 0,
  );

  const [noOfLikes, setNoOfLikes] = useState<number>(
    status === Status.Accepted
      ? submitProof.length > 0
        ? submitProof[0].submitRating.length
        : rating.length
      : rating.length,
  );

  const dateFinal = fromUnixTime(finalDate);
  const dateCreated = fromUnixTime(createdAt);

  const formattedFinalDate = format(parseISO(dateFinal.toISOString()), "MMM d, yyyy");
  const formattedCreatedAt = format(parseISO(dateCreated.toISOString()), "MMM d, yyyy");

  const { writeAsync: rateApplication } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "rateApplication",
    args: [getID(id)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
    onError: () => {
      setIsLiked(likeStatus => !likeStatus);
      setNoOfLikes(currentNumber => (!isLiked ? ++currentNumber : --currentNumber));
    },
  });

  const { writeAsync: withdrawCollateral } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "withdrawCollateral",
    args: [getID(id)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: withdrawReward } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "withdrawReward",
    args: [getID(id)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: rateCompletedProof } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "rateCompletedProof",
    args: [getID(id)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
    onError: () => {
      setIsLiked(likeStatus => !likeStatus);
      setNoOfLikes(currentNumber => (!isLiked ? ++currentNumber : --currentNumber));
    },
  });

  const handleLike = async () => {
    try {
      setIsLiked(likeStatus => !likeStatus);
      setNoOfLikes(currentNumber => (!isLiked ? ++currentNumber : --currentNumber));
      switch (status) {
        case Status.Pending:
          await rateApplication();
          break;
        case Status.Accepted:
          await rateCompletedProof();
          break;
        default:
          notification.error("Something went wrong");
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const withdraw = async () => {
    try {
      if (!toggle) return;
      if (status === Status.Rejected) await withdrawCollateral();
      if (status === Status.Completed) await withdrawReward();
    } catch (error) {
      console.error(error);
    }
  };

  const ReadMore = ({ isReadMore }: { isReadMore: boolean }) =>
    isReadMore && (
      <CustomModal
        clickElement={
          <button className=" float-right text-xs text-blue-500 hover:text-blue-700 focus:outline-none">
            Read more
          </button>
        }
      >
        <div className="max-h-96 min-h-60 min-w-lg max-w-lg">
          <p className={`text-gray-600`}>
            {status === Status.Accepted && submitProof.length > 0 ? submitProof[0].proof : details}
          </p>
        </div>
      </CustomModal>
    );

  const ReadProposals = ({ isReadMore }: { isReadMore: boolean }) =>
    isReadMore && (
      <CustomModal
        clickElement={
          <button className=" float-right text-xs text-blue-500 hover:text-blue-700 focus:outline-none">
            Read Proposal
          </button>
        }
      >
        <div className="max-h-96 min-h-60 min-w-lg max-w-lg">
          <p className={`text-gray-600`}>{details}</p>
        </div>
      </CustomModal>
    );
  console.log(renewRequest.length);

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full border-l-4  ${
        status === Status.Pending
          ? `border-blue-500`
          : status === Status.Accepted
          ? `border-green-500`
          : status === Status.Rejected
          ? `border-red-500`
          : status === Status.INCompleted
          ? `border-yellow-500`
          : status === Status.Completed
          ? `border-purple-500`
          : ""
      }`}
    >
      <div>
        <span>{formattedCreatedAt.toString()}</span>
        <div className="flex justify-between items-center mt-1 mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              noOfLikes < 10
                ? "bg-red-100 text-red-500"
                : noOfLikes < 30
                ? "bg-yellow-100 text-yellow-500"
                : "bg-green-100 text-green-500"
            }`}
          >
            {noOfLikes}
          </span>
        </div>
        <p className={`text-gray-600 line-clamp-3`}>
          {status === Status.Accepted && submitProof.length > 0 ? submitProof[0].proof : details}
        </p>

        {status === Status.Accepted && submitProof.length > 0 ? (
          <ReadMore isReadMore={submitProof[0].proof.length > 100} />
        ) : (
          <ReadMore isReadMore={details.length > 100} />
        )}
      </div>
      {status !== Status.Pending ? (
        renewRequest.length > 0 ? (
          <CustomModal
            clickElement={
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 cursor-pointer hover:bg-green-300  ">
                Renewal Applied
              </span>
            }
          >
            <RenewCard
              createdAt={renewRequest[0].createdAt}
              currentUser={currentAddress}
              date={renewRequest[0].date}
              id={id}
              reason={renewRequest[0].reason}
              renewalRating={renewRequest[0].renewalRating}
              userAddress={userAddress}
              userLiked={renewRequest[0].userLiked}
            />
          </CustomModal>
        ) : toggle && status === Status.Accepted ? (
          <CustomModal
            clickElement={
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 cursor-pointer hover:bg-green-300  ">
                Apply Renewal
              </span>
            }
          >
            <PostRenewal currentFinalDate={formattedFinalDate.toString()} id={id} />
          </CustomModal>
        ) : (
          ""
        )
      ) : (
        ""
      )}{" "}
      {status === Status.Accepted ? <ReadProposals isReadMore={submitProof.length > 0} /> : ""}
      <div className="mt-2">
        {toggle && !withdrawStatus ? (
          status === Status.Rejected || status === Status.Completed ? (
            <span
              onClick={withdraw}
              className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 cursor-pointer hover:bg-red-300  "
            >
              Withdraw
            </span>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {toggle && status === Status.Accepted && submitProof.length === 0 ? (
          <CustomModal
            clickElement={
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-300  ">
                Submit Proof
              </span>
            }
          >
            <PostSubmit id={id} />
          </CustomModal>
        ) : (
          ""
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-500">
          <BsCalendarCheck />
          <span>{formattedFinalDate.toString()}</span>
        </div>
        {userAddress.toLowerCase() !== currentAddress.toLowerCase() ? (
          status === Status.Pending || (status === Status.Accepted && submitProof.length > 0) ? (
            <LikeButton handleLike={handleLike} isLiked={isLiked} />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProposalCard;
