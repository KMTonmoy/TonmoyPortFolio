"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FeedbackHeader } from "@/components/feedback/FeedbackHeader";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { FeedbackSuccessDialog } from "@/components/feedback/FeedbackSuccessDialog";
import { Review, FeedbackFormData } from "@/types/feedback.types";

const Feedback = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState("");

  const fetchPublicReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/showfeedback`,
      );
      const data = await response.json();

      if (data.success) {
        setReviews(data.feedback);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicReviews();
  }, []);

  const handleSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting feedback...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addfeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit feedback");
      }

      setSubmittedRating(data.rating);
      setSubmittedReview(data.review);

      await fetchPublicReviews();

      toast.success("Feedback submitted successfully!", { id: loadingToast });
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error(error.message || "Failed to submit feedback", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (reviewId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback/${reviewId}/like`,
        {
          method: "PATCH",
        },
      );

      if (response.ok) {
        setReviews(
          reviews.map((review) => {
            if (review._id === reviewId || review.id === reviewId) {
              return {
                ...review,
                likes: (review.likes || 0) + 1,
              };
            }
            return review;
          }),
        );
      }
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <FeedbackHeader />

        <div className="mb-12">
          <FeedbackForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">
            What People Say
          </h2>
          <FeedbackList
            reviews={reviews}
            loading={loading}
            onLike={handleLike}
          />
        </div>
      </div>

      <FeedbackSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        rating={submittedRating}
        review={submittedReview}
      />
    </div>
  );
};

export default Feedback;
