 
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegHeart } from "react-icons/fa";
import { FeedbackStars } from "./FeedbackStars";
import { Review } from "@/types/feedback.types";

interface FeedbackCardProps {
  review: Review;
  onLike: (id: string) => void;
}

export const FeedbackCard = ({ review, onLike }: FeedbackCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{review.name}</p>
                {review.company && (
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{review.date}</div>
          </div>

          <div className="mb-3">
            <FeedbackStars rating={review.rating} size="sm" />
          </div>

          <p className="text-muted-foreground text-base leading-relaxed">
            {review.review}
          </p>

          <div className="mt-4 pt-4 border-t border-border flex items-center gap-4">
            <button
              onClick={() => onLike(review._id || review.id || "")}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
            >
              <FaRegHeart className="h-5 w-5 group-hover:text-red-500 transition-colors" />
              <span>{review.likes || 0} likes</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};