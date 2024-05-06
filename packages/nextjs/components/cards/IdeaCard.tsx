"use client";

import React, { useState } from "react";
import LikeButton from "../LikeButton";
import { CustomModal } from "../custom-common";
import { Address } from "../scaffold-eth";
import { format, fromUnixTime, parseISO } from "date-fns";
import { BsCalendarCheck } from "react-icons/bs";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { IdeaCardProps } from "~~/types/utils";
import { getID } from "~~/utils";

const IdeaCard: React.FC<IdeaCardProps> = ({
  winner,
  address,
  title,
  details,
  createdAt,
  id,
  currentAddress,
  userRatingStatus = [],
  rating = [],
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(userRatingStatus.length > 0);

  const [noOfLikes, setNoOfLikes] = useState<number>(rating.length);

  const dateCreated = fromUnixTime(createdAt);

  const formattedCreatedAt = format(parseISO(dateCreated.toISOString()), "MMM d, yyyy");

  const { writeAsync: rateProposedIdea } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "rateProposedIdea",
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
      rateProposedIdea();
    } catch (error) {
      console.error(error);
    }
  };

  const ReadMore = ({ isReadMore }: { isReadMore: boolean }) =>
    isReadMore && (
      <CustomModal
        clickElement={
          <button className=" float-right text-xs text-blue-500 hover:text-blue-700 focus:outline-none">
            Read More
          </button>
        }
      >
        <div className="max-h-96 min-h-60 min-w-lg max-w-lg">
          <p className={`text-gray-600`}>{details}</p>
        </div>
      </CustomModal>
    );

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full ${
        winner && "border-l-4 border-green-500"
      }`}
    >
      <div>
        <Address address={address.toLowerCase()} />
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
        <p className={`text-gray-600 line-clamp-3`}>{details}</p>
        <ReadMore isReadMore={details.length > 100} />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-500">
          <BsCalendarCheck />
          <span>{formattedCreatedAt.toString()}</span>
        </div>
        {currentAddress.toLowerCase() !== address.toLowerCase() && (
          <LikeButton handleLike={handleLike} isLiked={isLiked} />
        )}
      </div>
    </div>
  );
};

export default IdeaCard;
