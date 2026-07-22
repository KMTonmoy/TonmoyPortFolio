 
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { FaHeart } from "react-icons/fa";
import { FeedbackStars } from "./FeedbackStars";
import { FeedbackFormData } from "@/types/feedback.types";

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const FeedbackForm = ({ onSubmit, isSubmitting }: FeedbackFormProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write your feedback");
      return;
    }

    const feedbackData: FeedbackFormData = {
      name: user?.displayName || "Anonymous",
      email: user?.email || "",
      company: "",
      rating: rating,
      review: reviewText,
      avatar: user?.photoURL || "",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    await onSubmit(feedbackData);
    setRating(0);
    setReviewText("");
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
              <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-lg">{user?.displayName || "Anonymous"}</p>
              <p className="text-sm text-muted-foreground">{user?.email || "No email"}</p>
            </div>
          </div>

          <div>
            <Label className="block mb-2">Your Rating *</Label>
            <FeedbackStars
              rating={rating}
              interactive={true}
              onRatingChange={setRating}
              hoverRating={hoverRating}
              onHoverChange={setHoverRating}
            />
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {rating === 5 && "⭐ Excellent!"}
                {rating === 4 && "👍 Great!"}
                {rating === 3 && "👌 Good"}
                {rating === 2 && "😕 Not great"}
                {rating === 1 && "😞 Poor"}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="review">Your Review *</Label>
            <Textarea
              id="review"
              placeholder="Share your experience working with me..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={6}
              required
              className="mt-1 resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="w-full gap-2"
          >
            <FaHeart className="h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};