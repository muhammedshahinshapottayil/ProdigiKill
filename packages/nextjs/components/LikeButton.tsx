import { FaRegThumbsUp } from "react-icons/fa";

function LikeButton({ isLiked, handleLike }: { isLiked: boolean; handleLike: () => void }) {
  return (
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
  );
}

export default LikeButton;
