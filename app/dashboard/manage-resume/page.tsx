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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredResumes = resumes.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: resumes.length,
    active: resumes.filter((r) => r.isActive).length,
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Resumes</h1>
            <p className="text-muted-foreground">
              Upload and manage your resume files
            </p>
          </div>
          <Button onClick={fetchResumes} variant="outline" className="gap-2">
            <FaSpinner className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Resumes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{stats.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Area - Drag & Drop + Click */}
        <div className="mb-6">
          <div
            {...getRootProps()}
            onClick={handleClickUpload}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
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

            <div className="flex flex-col items-center gap-4">
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
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FaCloudUploadAlt className="h-12 w-12 text-primary" />
                  </div>
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
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes by name..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResumes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "No resumes found" : "No resumes uploaded yet"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResumes.map((resume) => (
                    <TableRow key={resume._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <FaFilePdf className="h-6 w-6 text-red-500" />
                          <div>
                            <p className="font-medium truncate max-w-[200px]">{resume.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatFileSize(resume.size)}</TableCell>
                      <TableCell>{formatDate(resume.uploadedAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={resume.isActive ? "default" : "secondary"}
                          className={
                            resume.isActive
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {resume.isActive ? (
                            <>
                              <FaCheck className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <FaTimes className="h-3 w-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </Badge>
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
                                setSelectedResume(resume);
                                setIsPreviewOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <FaEye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => window.open(resume.url, "_blank")}
                              className="cursor-pointer"
                            >
                              <FaDownload className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(resume)}
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