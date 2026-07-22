// app/dashboard/manage-feedback/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FaStar,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaSpinner,
  FaSearch,
  FaCheck,
  FaTimes,
  FaUser,
  FaCalendar,
  FaEllipsisV,
  FaList,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";
import { Feedback } from "@/types/feedback.types";

type TabType = "all" | "shown" | "hidden";

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/allfeedbacks`
      );
      const data = await response.json();
      if (data.success) {
        // Reverse the data to show newest first
        const reversedData = data.feedback.reverse();
        setFeedbacks(reversedData);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const toggleWebShow = async (id: string, currentStatus: boolean) => {
    const loadingToast = toast.loading("Updating feedback status...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback/${id}/webshow`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ webShow: !currentStatus }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setFeedbacks(
          feedbacks.map((f) =>
            f._id === id ? { ...f, webShow: !currentStatus } : f
          )
        );
        toast.success(
          `Feedback ${!currentStatus ? "shown" : "hidden"} on website!`,
          {
            id: loadingToast,
          }
        );
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update status", {
        id: loadingToast,
      });
    }
  };

  const deleteFeedback = async () => {
    if (!selectedFeedback) return;
    if (deleteConfirmName !== selectedFeedback.name) {
      toast.error("Name doesn't match. Please type the correct name.");
      return;
    }

    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting feedback...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback/${selectedFeedback._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setFeedbacks(feedbacks.filter((f) => f._id !== selectedFeedback._id));
        toast.success("Feedback deleted successfully!", { id: loadingToast });
        setIsDeleteOpen(false);
        setSelectedFeedback(null);
        setDeleteConfirmName("");
      } else {
        throw new Error(data.message || "Failed to delete feedback");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete feedback", {
        id: loadingToast,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setDeleteConfirmName("");
    setIsDeleteOpen(true);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFilteredFeedbacks = () => {
    let filtered = feedbacks;

    if (activeTab === "shown") {
      filtered = filtered.filter((f) => f.webShow);
    } else if (activeTab === "hidden") {
      filtered = filtered.filter((f) => !f.webShow);
    }

    return filtered.filter(
      (f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredFeedbacks = getFilteredFeedbacks();

  const stats = {
    total: feedbacks.length,
    shown: feedbacks.filter((f) => f.webShow).length,
    hidden: feedbacks.filter((f) => !f.webShow).length,
    avgRating: feedbacks.length
      ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(
          1
        )
      : 0,
  };

  const tabs = [
    { id: "all", label: "All", icon: <FaList className="h-4 w-4" />, count: stats.total },
    { id: "shown", label: "Shown", icon: <FaCheckCircle className="h-4 w-4" />, count: stats.shown },
    { id: "hidden", label: "Hidden", icon: <FaBan className="h-4 w-4" />, count: stats.hidden },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Feedback</h1>
            <p className="text-muted-foreground">
              View, approve, and manage user feedback
            </p>
          </div>
          <Button onClick={fetchFeedbacks} variant="outline" className="gap-2">
            <FaSpinner className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{stats.shown}</div>
              <div className="text-sm text-muted-foreground">Shown</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{stats.hidden}</div>
              <div className="text-sm text-muted-foreground">Hidden</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.avgRating}⭐</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`gap-2 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => setActiveTab(tab.id as TabType)}
            >
              {tab.icon}
              {tab.label}
              <Badge
                variant={activeTab === tab.id ? "secondary" : "outline"}
                className="ml-1"
              >
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or review content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedbacks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No feedback found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFeedbacks.map((feedback) => (
                    <TableRow key={feedback._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={feedback.avatar} alt={feedback.name} />
                            <AvatarFallback>{getInitials(feedback.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{feedback.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {feedback.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{renderStars(feedback.rating)}</TableCell>
                      <TableCell>
                        <p className="max-w-[200px] truncate">{feedback.review}</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={feedback.webShow ? "default" : "secondary"}
                          className={
                            feedback.webShow
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                          }
                        >
                          {feedback.webShow ? (
                            <>
                              <FaCheck className="h-3 w-3 mr-1" />
                              Shown
                            </>
                          ) : (
                            <>
                              <FaTimes className="h-3 w-3 mr-1" />
                              Hidden
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {feedback.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FaEllipsisV className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedFeedback(feedback);
                                setIsDetailsOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <FaEye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toggleWebShow(feedback._id, feedback.webShow)}
                              className="cursor-pointer"
                            >
                              {feedback.webShow ? (
                                <>
                                  <FaEyeSlash className="h-4 w-4 mr-2" />
                                  Hide from Website
                                </>
                              ) : (
                                <>
                                  <FaEye className="h-4 w-4 mr-2" />
                                  Show on Website
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(feedback)}
                              className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                              <FaTrash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>Detailed view of the feedback</DialogDescription>
          </DialogHeader>

          {selectedFeedback && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedFeedback.avatar} alt={selectedFeedback.name} />
                  <AvatarFallback>{getInitials(selectedFeedback.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedFeedback.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFeedback.email}
                  </p>
                  {selectedFeedback.company && (
                    <p className="text-sm text-muted-foreground">
                      {selectedFeedback.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaStar className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">{selectedFeedback.rating}/5</span>
                </div>
                <Badge
                  variant={selectedFeedback.webShow ? "default" : "secondary"}
                  className={
                    selectedFeedback.webShow
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }
                >
                  {selectedFeedback.webShow ? "Shown" : "Hidden"}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Review</p>
                <p className="text-sm text-muted-foreground">
                  {selectedFeedback.review}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FaCalendar className="h-4 w-4" />
                  <span>{selectedFeedback.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUser className="h-4 w-4" />
                  <span>{selectedFeedback.likes || 0} likes</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Feedback</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              feedback from {selectedFeedback?.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm font-medium mb-2">
              Type{" "}
              <span className="font-bold text-destructive">
                {selectedFeedback?.name}
              </span>{" "}
              to confirm deletion
            </p>
            <Input
              placeholder={`Type "${selectedFeedback?.name}" to confirm`}
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={deleteFeedback}
              disabled={deleteConfirmName !== selectedFeedback?.name || isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash className="h-4 w-4 mr-2" />
                  Delete Feedback
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageFeedback;