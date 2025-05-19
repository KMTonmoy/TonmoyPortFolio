"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const MySwal = withReactContent(Swal);

interface Skill {
  _id: string;
  name: string;
  image: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed  inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          {...fadeIn}
          initial="initial"
          animate="animate"
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 sm:p-8 relative"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    </>
  );
};

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: "", image: "" });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:8000/skills");
      setSkills(res.data);
    } catch {
      toast.error("Failed to fetch skills");
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name || !newSkill.image) return toast.error("Please fill all fields");
    try {
      await axios.post("http://localhost:8000/skills", newSkill);
      setNewSkill({ name: "", image: "" });
      setAddModalOpen(false);
      fetchSkills();
      toast.success("Skill added successfully");
    } catch {
      toast.error("Failed to add skill");
    }
  };

  const handleUpdateSkill = async () => {
    if (!editingSkill) return;
    if (!editingSkill.name || !editingSkill.image) return toast.error("Please fill all fields");
    try {
      await axios.patch(`http://localhost:8000/skills/${editingSkill._id}`, editingSkill);
      setEditingSkill(null);
      setEditModalOpen(false);
      fetchSkills();
      toast.success("Skill updated successfully");
    } catch {
      toast.error("Failed to update skill");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/skills/${id}`);
        fetchSkills();
        toast.success("Skill deleted successfully");
      } catch {
        toast.error("Failed to delete skill");
      }
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">Skills</h1>

      <div className="flex justify-center mb-6">
        <Button onClick={() => setAddModalOpen(true)}>Add New Skill</Button>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add Skill">
        <div className="space-y-4">
          <Input
            placeholder="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
          <Input
            placeholder="Image URL"
            value={newSkill.image}
            onChange={(e) => setNewSkill({ ...newSkill, image: e.target.value })}
          />
          <Button onClick={handleAddSkill} className="w-full">
            Submit
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setEditingSkill(null);
          setEditModalOpen(false);
        }}
        title="Update Skill"
      >
        <div className="space-y-4">
          <Input
            placeholder="Skill Name"
            value={editingSkill?.name || ""}
            onChange={(e) =>
              setEditingSkill((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
          />
          <Input
            placeholder="Image URL"
            value={editingSkill?.image || ""}
            onChange={(e) =>
              setEditingSkill((prev) => (prev ? { ...prev, image: e.target.value } : null))
            }
          />
          <Button onClick={handleUpdateSkill} className="w-full">
            Update
          </Button>
        </div>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="p-6 border rounded-xl shadow-md hover:shadow-xl flex flex-col items-center relative transition-shadow duration-300"
          >
            <img
              src={skill.image}
              alt={skill.name}
              className="h-28 w-28 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">{skill.name}</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setEditingSkill(skill);
                  setEditModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={`Edit ${skill.name}`}
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                aria-label={`Delete ${skill.name}`}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
