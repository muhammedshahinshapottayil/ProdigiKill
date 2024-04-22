import { useState } from "react";
import LikeButton from "./LikeButton";
import { format, fromUnixTime, parseISO } from "date-fns";
import { BsCalendarCheck } from "react-icons/bs";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { RenewRequest } from "~~/types/utils";
import { getID } from "~~/utils";

function RenewCard({
  date,
  createdAt,
  reason,
  userAddress,
  renewalRating = [],
  userLiked = [],
  currentUser,
  id,
}: RenewRequest & { currentUser: string; id: string }) {
  const [isLiked, setIsLiked] = useState<boolean>(userLiked.length > 0);
  const [noOfLikes, setNoOfLikes] = useState<number>(renewalRating.length);

  const dateFinal = fromUnixTime(date);
  const dateCreated = fromUnixTime(createdAt);

  const formattedFinalDate = format(parseISO(dateFinal.toISOString()), "MMM d, yyyy");
  const formattedCreatedAt = format(parseISO(dateCreated.toISOString()), "MMM d, yyyy");

  const { writeAsync: rateRenewApplication } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "rateRenewApplication",
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

  const handleLike = () => {
    setIsLiked(likeStatus => !likeStatus);
    setNoOfLikes(currentNumber => (!isLiked ? ++currentNumber : --currentNumber));
    rateRenewApplication();
  };
  return (
    <div className="max-h-96 min-h-60 min-w-lg max-w-lg">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between ">
        <div>
          <span>{formattedCreatedAt.toString()}</span>
          <div className="flex justify-between items-center mt-1 mb-4">
            <h3 className="text-lg font-bold">Renew Request</h3>
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
          <p className={`text-gray-600`}>{reason}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-500">
            <BsCalendarCheck />
            <span>{formattedFinalDate.toString()}</span>
          </div>
          {currentUser.toLowerCase() !== userAddress.toLowerCase() ? (
            <LikeButton handleLike={handleLike} isLiked={isLiked} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default RenewCard;
