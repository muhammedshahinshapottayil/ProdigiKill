"use client";

import React, { useState } from "react";
import { ProposalCardProps } from "~~/types/utils";

const ProposalCard: React.FC<ProposalCardProps> = ({ title, description }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between min-h-[200px] relative">
      <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 line-clamp-3">{description}</p>
      </div>
      <button
        className={`text-2xl ${
          isLiked ? "text-red-500" : "text-gray-400"
        } hover:text-red-500 absolute bottom-4 right-4`}
        onClick={handleLike}
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default ProposalCard;
