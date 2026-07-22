 
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { FeedbackStars } from "./FeedbackStars";

interface FeedbackSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rating: number;
  review: string;
}

export const FeedbackSuccessDialog = ({
  open,
  onOpenChange,
  rating,
  review,
}: FeedbackSuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <FeedbackStars rating={rating} size="lg" />
            </div>
            <p className="text-sm text-muted-foreground">{review}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};