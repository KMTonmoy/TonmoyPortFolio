"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
  FaSave,
  FaSpinner,
  FaArrowLeft,
  FaImage,
  FaTimes,
  FaUpload,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaEdit,
  FaEye,
  FaPen,
  FaPlus,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";

interface HeroData {
  name: string;
  title: string;
  description: string;
  typewriterWords: string[];
  image: string;
  resumeLink: string;
  viewResumeLink: string;
  facebook: string;
  github: string;
  linkedin: string;
}

const ManageHero = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<{ label: string; value: string; key: string; type: string } | null>(null);
  const [typewriterDialogOpen, setTypewriterDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dummy data
  const [heroData, setHeroData] = useState<HeroData>({
    name: "Tonmoy",
    title: "Web Developer",
    description: "I build modern, scalable, and beautiful web experiences tailored to your goals.",
    typewriterWords: ["Web Developer", "Creative Coder", "UI/UX Enthusiast"],
    image: "https://res.cloudinary.com/dgwknm4yi/image/upload/v1758275707/wmremove-transformed-Picsart-AiImageEnhance_epxzfm.jpg",
    resumeLink: "/myresume.pdf",
    viewResumeLink: "https://drive.google.com/file/d/1Ez3x8Kugc3LqakxptVCvg9QCCRU9k7kT/view?usp=sharing",
    facebook: "https://www.facebook.com/profile.php?id=100088205996277",
    github: "https://github.com/KMTonmoy",
    linkedin: "https://www.linkedin.com/in/tonmoy-ahamed",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newTypewriterWord, setNewTypewriterWord] = useState("");
  const [tempTypewriterWords, setTempTypewriterWords] = useState<string[]>([]);

  // Initialize temp words when dialog opens
  useEffect(() => {
    if (typewriterDialogOpen) {
      setTempTypewriterWords([...heroData.typewriterWords]);
      setNewTypewriterWord("");
    }
  }, [typewriterDialogOpen, heroData.typewriterWords]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setHeroData({ ...heroData, image: URL.createObjectURL(file) });
      toast.success('Image updated successfully!');
    }
  };

  const openEditDialog = (label: string, value: string, key: string, type: string = "text") => {
    setEditingField({ label, value, key, type });
    setEditValue(value);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!editingField) return;
    setHeroData({ ...heroData, [editingField.key]: editValue });
    setEditDialogOpen(false);
    setEditingField(null);
    toast.success(`${editingField.label} updated successfully!`);
  };

  const handleAddTypewriterWord = () => {
    if (newTypewriterWord.trim() && !tempTypewriterWords.includes(newTypewriterWord.trim())) {
      setTempTypewriterWords([...tempTypewriterWords, newTypewriterWord.trim()]);
      setNewTypewriterWord("");
    }
  };

  const handleRemoveTypewriterWord = (word: string) => {
    setTempTypewriterWords(tempTypewriterWords.filter(w => w !== word));
  };

  const handleSaveTypewriterWords = () => {
    setHeroData({
      ...heroData,
      typewriterWords: tempTypewriterWords
    });
    setTypewriterDialogOpen(false);
    toast.success('Typewriter words updated successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Saving hero data...");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Hero data saved successfully!", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to save hero data", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const EditFieldDialog = () => (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {editingField?.label}</DialogTitle>
          <DialogDescription>
            Update the {editingField?.label?.toLowerCase()} for your hero section
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {editingField?.type === "textarea" ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
              className="resize-none"
              placeholder={`Enter ${editingField?.label?.toLowerCase()}`}
            />
          ) : editingField?.type === "url" ? (
            <Input
              type="url"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={`Enter ${editingField?.label?.toLowerCase()} URL`}
            />
          ) : (
            <Input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={`Enter ${editingField?.label?.toLowerCase()}`}
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditSave} className="gap-2">
            <FaSave className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const TypewriterDialog = () => (
    <Dialog open={typewriterDialogOpen} onOpenChange={setTypewriterDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Typewriter Words</DialogTitle>
          <DialogDescription>
            Add or remove words for the typewriter effect
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a word (e.g. Developer)"
              value={newTypewriterWord}
              onChange={(e) => setNewTypewriterWord(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTypewriterWord();
                }
              }}
            />
            <Button onClick={handleAddTypewriterWord} className="gap-2" type="button">
              <FaPlus className="h-4 w-4" />
              Add
            </Button>
          </div>
          
          <div className="mt-4">
            <Label className="text-sm font-medium">Current Words ({tempTypewriterWords.length})</Label>
            <div className="flex flex-wrap gap-2 mt-2 max-h-[200px] overflow-y-auto p-3 border rounded-lg bg-muted/30 min-h-[60px]">
              {tempTypewriterWords.map((word, index) => (
                <Badge key={index} variant="secondary" className="gap-2 py-2 px-3 text-sm group">
                  <span className="font-medium">{word}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTypewriterWord(word)}
                    className="hover:text-destructive transition-colors opacity-70 hover:opacity-100"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {tempTypewriterWords.length === 0 && (
                <p className="text-sm text-muted-foreground w-full text-center py-2">
                  No words added yet. Add some words above.
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setTypewriterDialogOpen(false)} type="button">
            Cancel
          </Button>
          <Button onClick={handleSaveTypewriterWords} className="gap-2" type="button">
            <FaSave className="h-4 w-4" />
            Save Words
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Hero Preview Component with Click-to-Edit
  const HeroPreview = () => {
    const handleButtonClick = (e: React.MouseEvent, key: string, label: string, value: string) => {
      e.preventDefault();
      openEditDialog(label, value, key, "url");
    };

    const handleSocialClick = (e: React.MouseEvent, key: string, label: string, value: string) => {
      e.preventDefault();
      openEditDialog(label, value, key, "url");
    };

    return (
      <section className="container max-w-screen-2xl py-12 md:py-20 px-4 md:px-8 relative">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
            {/* Name - Click to Edit */}
            <div className="group relative">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
                Hey, I'm{" "}
                <span 
                  className="cursor-pointer hover:text-primary transition-colors relative inline-block"
                  onClick={() => openEditDialog("Name", heroData.name, "name")}
                >
                  {heroData.name}
                  <span className="absolute -top-1 -right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPen className="h-4 w-4 text-primary" />
                  </span>
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text cursor-pointer relative group/typewriter">
                  <Typewriter
                    words={heroData.typewriterWords}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={60}
                    deleteSpeed={40}
                    delaySpeed={1500}
                  />
                  <span 
                    className="absolute -top-1 -right-8 opacity-0 group-hover/typewriter:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => setTypewriterDialogOpen(true)}
                  >
                    <FaPen className="h-4 w-4 text-primary" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Description - Click to Edit */}
            <div 
              className="group relative cursor-pointer"
              onClick={() => openEditDialog("Description", heroData.description, "description", "textarea")}
            >
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 group-hover:text-primary transition-colors">
                {heroData.description}
              </p>
              <span className="absolute -top-1 -right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPen className="h-3 w-3 text-primary" />
              </span>
            </div>

            {/* Buttons - Click to Edit Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="group relative">
                <Button 
                  size="lg" 
                  className="shadow-lg cursor-pointer"
                  onClick={(e) => handleButtonClick(e, "resumeLink", "Resume Link", heroData.resumeLink)}
                >
                  Download Resume
                </Button>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-1 shadow-md">
                  <FaPen className="h-2 w-2 text-primary" />
                </span>
              </div>
              <div className="group relative">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="shadow-lg cursor-pointer"
                  onClick={(e) => handleButtonClick(e, "viewResumeLink", "View Resume Link", heroData.viewResumeLink)}
                >
                  View Resume
                </Button>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-1 shadow-md">
                  <FaPen className="h-2 w-2 text-primary" />
                </span>
              </div>
            </div>

            {/* Socials - Click to Edit */}
            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              <div 
                className="group relative cursor-pointer"
                onClick={(e) => handleSocialClick(e, "facebook", "Facebook URL", heroData.facebook)}
              >
                <div className="p-3 rounded-full border shadow-md hover:bg-blue-100 transition-all">
                  <FaFacebookF size={20} />
                </div>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-1 shadow-md">
                  <FaPen className="h-2 w-2 text-primary" />
                </span>
              </div>
              <div 
                className="group relative cursor-pointer"
                onClick={(e) => handleSocialClick(e, "github", "GitHub URL", heroData.github)}
              >
                <div className="p-3 rounded-full border shadow-md hover:bg-gray-100 transition-all">
                  <FaGithub size={20} />
                </div>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-1 shadow-md">
                  <FaPen className="h-2 w-2 text-primary" />
                </span>
              </div>
              <div 
                className="group relative cursor-pointer"
                onClick={(e) => handleSocialClick(e, "linkedin", "LinkedIn URL", heroData.linkedin)}
              >
                <div className="p-3 rounded-full border shadow-md hover:bg-blue-50 transition-all">
                  <FaLinkedinIn size={20} />
                </div>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-1 shadow-md">
                  <FaPen className="h-2 w-2 text-primary" />
                </span>
              </div>
            </div>
          </div>

          {/* Right: Image - Click to Edit */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl group cursor-pointer">
              <div 
                className="absolute -inset-4 -z-10 bg-gradient-to-tr from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"
                onClick={() => fileInputRef.current?.click()}
              />
              <div 
                className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image
                  src={heroData.image}
                  alt="Hero Banner"
                  width={600}
                  height={600}
                  className="object-cover w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <FaUpload className="h-5 w-5" />
                    <span>Change Image</span>
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (previewMode) {
    return (
      <div className="p-6 md:p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPreviewMode(false)}
            >
              <FaArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Hero Preview</h1>
              <p className="text-muted-foreground">Click on any element to edit it</p>
            </div>
          </div>
          <Badge variant="default" className="bg-primary/20 text-primary gap-2">
            <FaPen className="h-3 w-3" />
            Click to Edit
          </Badge>
        </div>
        <HeroPreview />
        <EditFieldDialog />
        <TypewriterDialog />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Hero Section</h1>
            <p className="text-muted-foreground">Click "Preview" to see and edit your hero section live</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(true)}
              className="gap-2"
            >
              <FaEye className="h-4 w-4" />
              Preview & Edit
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Typewriter Words</h2>
                <p className="text-sm text-muted-foreground">
                  {heroData.typewriterWords.length} words configured
                </p>
              </div>
              <Button onClick={() => setTypewriterDialogOpen(true)} variant="outline" className="gap-2">
                <FaEdit className="h-4 w-4" />
                Manage Words
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {heroData.typewriterWords.map((word, index) => (
                <Badge key={index} variant="secondary" className="py-1 px-3">
                  {word}
                </Badge>
              ))}
              {heroData.typewriterWords.length === 0 && (
                <p className="text-sm text-muted-foreground">No words configured</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={() => setPreviewMode(true)}
            variant="gradient"
            className="gap-2 w-full"
          >
            <FaEye className="h-4 w-4" />
            Open Preview & Edit
          </Button>
        </div>
      </motion.div>

      <EditFieldDialog />
      <TypewriterDialog />
    </div>
  );
};

export default ManageHero;