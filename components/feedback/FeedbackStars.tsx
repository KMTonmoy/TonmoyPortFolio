 
"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

interface FeedbackStarsProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  hoverRating?: number;
  onHoverChange?: (rating: number) => void;
}

export const FeedbackStars = ({
  rating,
  interactive = false,
  onRatingChange,
  size = "md",
  hoverRating = 0,
  onHoverChange,
}: FeedbackStarsProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: interactive ? 1.2 : 1 }}
          whileTap={{ scale: interactive ? 0.9 : 1 }}
          onClick={() => {
            if (interactive && onRatingChange) {
              onRatingChange(star);
            }
          }}
          onMouseEnter={() => {
            if (interactive && onHoverChange) {
              onHoverChange(star);
            }
          }}
          onMouseLeave={() => {
            if (interactive && onHoverChange) {
              onHoverChange(0);
            }
          }}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <FaStar
            className={`${sizeClasses[size]} transition-colors ${
              star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
};