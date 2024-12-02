"use client";

import axios from "axios";
import { Heart, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LikeButton = ({
  userId,
  isLiked,
}: {
  userId: string;
  isLiked: boolean;
}) => {
  const [likeStatus, setLikeStatus] = useState(isLiked);
  const handleLikeProfile = async () => {
    try {
      const res = await axios.post("/api/likes", {
        likedToId: userId,
      });
      toast.success(res.data.message);
      setLikeStatus(!likeStatus);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <button
      onClick={handleLikeProfile}
      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
    >
      {likeStatus ? (
        <div className="flex items-center gap-1.5">
          <HeartCrack />
          Unlike Profile
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <Heart className="h-5 w-5 mr-2" />
          Like Profile
        </div>
      )}
    </button>
  );
};

export default LikeButton;
