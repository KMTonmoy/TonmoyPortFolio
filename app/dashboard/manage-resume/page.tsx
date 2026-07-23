// app/dashboard/manage-resumes/page.tsx

"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FaUpload,
  FaTrash,
  FaSpinner,
  FaSearch,
  FaEllipsisV,
  FaFilePdf,
  FaEye,
  FaDownload,
  FaCloudUploadAlt,
  FaTimes,
  FaCheck,
  FaFile,
  FaCalendar,
  FaRocket,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

interface Resume {
  _id: string;
  name: string;
  url: string;
  publicId: string;
  size: number;
  uploadedAt: string;
  isActive: boolean;
}

const ManageResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    upload,
    isUploading,
    progress: uploadProgress,
    reset: resetUpload,
  } = useCloudinaryUpload({ resourceType: "raw", folder: "resumes" });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes`);
      const data = await response.json();
      if (data.success) {
        setResumes(data.resumes);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    setUploadedFileName(file.name);
    const loadingToast = toast.loading("Uploading resume...");

    try {
      const { url, publicId } = await upload(file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: file.name,
          url,
          publicId,
          size: file.size,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save resume");
      }

      setResumes((prev) => [data.resume, ...prev]);
      toast.success("Resume uploaded successfully!", { id: loadingToast });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Error uploading resume:", error);
      toast.error(error.message || "Failed to upload resume", { id: loadingToast });
    } finally {
      setUploadedFileName("");
      resetUpload();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: isUploading,
    noClick: true,
  });

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload([files[0]]);
    }
  };

  const deleteResume = async () => {
    if (!selectedResume) return;
    if (deleteConfirmName !== selectedResume.name) {
      toast.error("Name doesn't match. Please type the correct name.");
      return;
    }

    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting resume...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resumes/${selectedResume._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setResumes((prev) => prev.filter((r) => r._id !== selectedResume._id));
        toast.success("Resume deleted successfully!", { id: loadingToast });
        setIsDeleteOpen(false);
        setSelectedResume(null);
        setDeleteConfirmName("");
      } else {
        throw new Error(data.message || "Failed to delete resume");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete resume", {
        id: loadingToast,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (resume: Resume) => {
    setSelectedResume(resume);
    setDeleteConfirmName("");
    setIsDeleteOpen(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredResumes = resumes.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: resumes.length,
    active: resumes.filter((r) => r.isActive).length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    hover: {
      y: -8,
      scale: 1.01,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
  };

  const ResumeCard = ({ resume }: { resume: Resume }) => {
    const isHovered = hoveredCard === resume._id;

    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        onHoverStart={() => setHoveredCard(resume._id)}
        onHoverEnd={() => setHoveredCard(null)}
        layout
      >
        <Card className={`relative overflow-hidden border transition-all duration-500 ${
          isHovered 
            ? "border-primary/50 shadow-2xl shadow-primary/20 bg-gradient-to-br from-card to-primary/5" 
            : "border-border/50 shadow-lg shadow-black/5 hover:shadow-xl"
        }`}>
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`} />
          
          {/* Glow effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`} />

          <CardContent className="relative p-6 z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Animated icon container */}
                <motion.div 
                  className="relative"
                  animate={{
                    rotate: isHovered ? [0, -5, 5, -3, 3, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isHovered 
                      ? "bg-gradient-to-br from-red-500/30 to-red-600/20 shadow-lg shadow-red-500/20" 
                      : "bg-red-500/10"
                  }`}>
                    <FaFilePdf className={`h-7 w-7 transition-all duration-500 ${
                      isHovered ? "text-red-400 scale-110" : "text-red-500"
                    }`} />
                  </div>
                  
                  {/* Pulsing ring */}
                  {resume.isActive && (
                    <motion.div
                      className="absolute -inset-1 rounded-xl border-2 border-green-500/30"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <motion.h3 
                    className={`font-bold text-lg line-clamp-1 transition-colors duration-300 ${
                      isHovered ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {resume.name}
                  </motion.h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <motion.span 
                      className="flex items-center gap-1"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                      }}
                    >
                      <FaFile className="h-3 w-3" />
                      {formatFileSize(resume.size)}
                    </motion.span>
                    <span className="flex items-center gap-1">
                      <FaCalendar className="h-3 w-3" />
                      {formatDate(resume.uploadedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-2">
                {/* Animated status badge */}
                <motion.div
                  animate={{
                    scale: resume.isActive ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Badge
                    variant={resume.isActive ? "default" : "secondary"}
                    className={`${
                      resume.isActive
                        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30"
                        : "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/30"
                    } border transition-all duration-300`}
                  >
                    {resume.isActive ? (
                      <>
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <FaCheck className="h-3 w-3 mr-1" />
                        </motion.span>
                        Active
                      </>
                    ) : (
                      <>
                        <FaTimes className="h-3 w-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </Badge>
                </motion.div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                      <FaEllipsisV className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedResume(resume);
                        setIsPreviewOpen(true);
                      }}
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      <FaEye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => window.open(resume.url, "_blank")}
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      <FaDownload className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => openDeleteDialog(resume)}
                      className="cursor-pointer text-red-600 hover:bg-red-500/10 focus:text-red-600"
                    >
                      <FaTrash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Upload progress bar */}
            {isUploading && uploadedFileName === resume.name && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-muted-foreground">Uploading...</p>
                  <p className="text-xs font-medium text-primary">{uploadProgress}%</p>
                </div>
              </motion.div>
            )}

            {/* Futuristic corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className={`absolute top-0 right-0 w-20 h-20 rotate-45 translate-x-10 -translate-y-10 transition-all duration-500 ${
                isHovered ? "bg-gradient-to-r from-primary/20 to-purple-500/20" : "bg-transparent"
              }`} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading resumes...</p>
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
        {/* Futuristic Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Resume Vault
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Manage your professional documents
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button onClick={fetchResumes} variant="outline" className="gap-2 hover:bg-primary/10">
              <FaSpinner className="h-4 w-4" />
              Sync
            </Button>
          </motion.div>
        </div>

        {/* Stats with animations */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Total", value: stats.total, icon: FaFile, color: "from-blue-500/20 to-cyan-500/20", textColor: "text-blue-500" },
            { label: "Active", value: stats.active, icon: FaRocket, color: "from-green-500/20 to-emerald-500/20", textColor: "text-green-500" },
            { label: "Inactive", value: stats.total - stats.active, icon: FaShieldAlt, color: "from-yellow-500/20 to-orange-500/20", textColor: "text-yellow-500" },
            { label: "Total Size", value: resumes.length > 0 
                ? `${(resumes.reduce((acc, r) => acc + r.size, 0) / (1024 * 1024)).toFixed(1)} MB`
                : "0 MB", 
              icon: FaStar, 
              color: "from-purple-500/20 to-pink-500/20", 
              textColor: "text-purple-500" 
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Card className={`bg-gradient-to-br ${stat.color} border-0 backdrop-blur-sm`}>
                <CardContent className="p-4 text-center">
                  <stat.icon className={`h-6 w-6 ${stat.textColor} mx-auto mb-2 opacity-70`} />
                  <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Upload Area */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div
            {...getRootProps()}
            onClick={handleClickUpload}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-500 ${
              isDragActive
                ? "border-primary bg-primary/5 scale-[1.02] shadow-lg shadow-primary/20"
                : "border-border hover:border-primary/50 hover:bg-muted/30 hover:scale-[1.01]"
            } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
          >
            <input {...getInputProps()} />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <motion.div 
              className="flex flex-col items-center gap-4"
              animate={{
                scale: isDragActive ? 1.02 : 1,
              }}
            >
              {isUploading ? (
                <>
                  <div className="relative">
                    <FaSpinner className="h-16 w-16 text-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{uploadProgress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium">Uploading...</p>
                    <p className="text-sm text-muted-foreground">{uploadedFileName}</p>
                    <div className="w-64 h-2 bg-muted rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <motion.div 
                    className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    animate={{
                      scale: isDragActive ? 1.1 : 1,
                      rotate: isDragActive ? 5 : 0,
                    }}
                  >
                    <FaCloudUploadAlt className="h-12 w-12 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-lg font-medium">
                      {isDragActive ? "Drop your PDF here" : "Drag & drop your resume here"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or <span className="text-primary font-medium">click to browse</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports PDF files up to 10MB
                    </p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <FaFilePdf className="h-3 w-3" />
                    PDF Only
                  </Badge>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
        </motion.div>

        {/* Resume Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredResumes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-6xl mb-4">🚀</div>
                </motion.div>
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? "No resumes found" : "Your resume vault is empty"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {searchTerm ? "Try adjusting your search" : "Upload your first resume to get started"}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResumes.map((resume) => (
                  <ResumeCard key={resume._id} resume={resume} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FaFilePdf className="h-5 w-5 text-red-500" />
              {selectedResume?.name}
            </DialogTitle>
            <DialogDescription>Resume preview</DialogDescription>
          </DialogHeader>
          <div className="flex-1 min-h-[500px] bg-muted/30 rounded-lg overflow-hidden">
            {selectedResume?.url && (
              <iframe
                src={selectedResume.url}
                className="w-full h-[600px]"
                title="Resume Preview"
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => window.open(selectedResume?.url, "_blank")}>
              <FaDownload className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              resume "{selectedResume?.name}".
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm font-medium mb-2">
              Type{" "}
              <span className="font-bold text-destructive">
                {selectedResume?.name}
              </span>{" "}
              to confirm deletion
            </p>
            <Input
              placeholder={`Type "${selectedResume?.name}" to confirm`}
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={deleteResume}
              disabled={deleteConfirmName !== selectedResume?.name || isDeleting}
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
                  Delete Resume
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageResumes;