"use client";

import React, { useState } from "react";
import { fromUnixTime } from "date-fns";
import { format, parseISO } from "date-fns";
import { BsCalendarCheck } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa";
import { ProposalCardProps } from "~~/types/utils";

const ProposalCard: React.FC<ProposalCardProps> = ({
  title,
  details,
  userRatingStatus,
  createdAt,
  finalDate,
  rating,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(userRatingStatus.length > 0);
  const [noOfLikes, setNoOfLikes] = useState<number>(rating.length);
  const [showFullDetails, setShowFullDetails] = useState<boolean>(false);

  const dateFinal = fromUnixTime(finalDate);
  const dateCreated = fromUnixTime(createdAt);

  const formattedFinalDate = format(parseISO(dateFinal.toISOString()), "MMM d, yyyy");
  const formattedCreatedAt = format(parseISO(dateCreated.toISOString()), "MMM d, yyyy");

  const handleLike = () => {
    setIsLiked(likeStatus => !likeStatus);
    setNoOfLikes(currentNumber => (!isLiked ? ++currentNumber : --currentNumber));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
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
        <p className={`text-gray-600 line-clamp-3`}>{details}</p>
        {details.length > 100 && (
          <button
            className=" float-right text-xs text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={() => setShowFullDetails(!showFullDetails)}
          >
            {showFullDetails ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-500">
          <BsCalendarCheck />
          <span>{formattedFinalDate.toString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <div
            onClick={handleLike}
            className={`cursor-pointer 
    ${isLiked ? "text-red-500" : "hover:text-red-500"} `}
          >
            <FaRegThumbsUp />
          </div>
          <span>{isLiked ? "Liked" : "Like"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
