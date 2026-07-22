 
"use client";

import { motion } from "framer-motion";
import { FeedbackCard } from "./FeedbackCard";
import { Review } from "@/types/feedback.types";

interface FeedbackListProps {
  reviews: Review[];
  loading: boolean;
  onLike: (id: string) => void;
}

export const FeedbackList = ({ reviews, loading, onLike }: FeedbackListProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        <p className="mt-4 text-muted-foreground">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No reviews yet. Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <FeedbackCard
          key={review._id || review.id}
          review={review}
          onLike={onLike}
        />
      ))}
    </div>
  );
};