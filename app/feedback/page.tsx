"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { FaStar, FaHeart, FaCheckCircle, FaClock } from "react-icons/fa";

interface Review {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  webShow: boolean;
}

interface FeedbackFormData {
  name: string;
  email: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
  date: string;
}

const Feedback = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPublicReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/showfeedback`
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

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting feedback...");

    try {
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addfeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit feedback");
      }

      setSubmittedRating(rating);
      setSubmittedReview(reviewText);

      await fetchPublicReviews();
      setRating(0);
      setReviewText("");

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

  const openReviewDialog = (review: Review) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const renderStars = (rating: number, interactive = false, onClick?: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: interactive ? 1.2 : 1 }}
            whileTap={{ scale: interactive ? 0.9 : 1 }}
            onClick={() => {
              if (interactive && onClick) {
                onClick(star);
              }
            }}
            onMouseEnter={() => {
              if (interactive) {
                setHoverRating(star);
              }
            }}
            onMouseLeave={() => {
              if (interactive) {
                setHoverRating(0);
              }
            }}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <FaStar
              className={`text-2xl transition-colors ${
                star <= (hoverRating || rating) 
                  ? "text-yellow-400" 
                  : "text-gray-300"
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  const renderDialogStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-3xl transition-colors ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Write a Review</h1>
          <p className="text-muted-foreground">
            Share your experience working with me
          </p>
        </motion.div>

        {/* Review Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
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
                  <div className="flex gap-1">
                    {renderStars(rating, true, setRating)}
                  </div>
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
        </motion.div>

        {/* Reviews Grid - 2 columns */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">What People Say</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
              <p className="mt-4 text-muted-foreground">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => {
                const shouldTruncate = review.review.length > 150;
                const displayText = shouldTruncate 
                  ? review.review.slice(0, 150) + "..." 
                  : review.review;

                return (
                  <motion.div
                    key={review._id || review.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-lg p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30 flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/20 mr-4">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{review.name}</h3>
                        {review.company && (
                          <p className="text-sm text-muted-foreground">{review.company}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>

                    <div className="flex-1">
                      <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-wrap">
                        {displayText}
                      </p>
                      {shouldTruncate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-primary hover:text-primary/80 p-0 h-auto font-medium"
                          onClick={() => {
                            setSelectedReview(review);
                            setIsDialogOpen(true);
                          }}
                        >
                          Read More
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <FaCheckCircle className="h-8 w-8 text-green-500" />
              Review Submitted!
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Thank you for sharing your experience!
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
              <FaClock className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-500">Pending Approval</p>
                <p className="text-sm text-muted-foreground">
                  Your review has been submitted and is waiting for admin approval. 
                  Once approved, it will appear publicly on this page.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Your Review:</p>
              <div className="mb-2">
                {renderDialogStars(submittedRating)}
              </div>
              <p className="text-sm text-muted-foreground">{submittedReview}</p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedReview?.avatar} alt={selectedReview?.name} />
                <AvatarFallback>{getInitials(selectedReview?.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{selectedReview?.name}</p>
                {selectedReview?.company && (
                  <p className="text-sm text-muted-foreground">{selectedReview?.company}</p>
                )}
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-1">
                  {selectedReview && renderStars(selectedReview.rating)}
                </div>
                <span className="text-sm text-muted-foreground">{selectedReview?.date}</span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-wrap">
              {selectedReview?.review}
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Feedback;