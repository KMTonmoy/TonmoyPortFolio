"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface Blog {
  title: string;
  description: string;
  image: string;
}
const BlogEditorPage: React.FC = () => {
  const router = useRouter(); 
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const config = {
    readonly: false,
    height: 400,
    toolbarSticky: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "ul",
      "ol",
      "indent",
      "outdent",
      "|",
      "image",
      "video",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
      "|",
      "source",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const saveBlog = async () => {
    if (!title || !image || !description) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields: title, image URL, and description.",
      });
      return;
    }

    const blogData: Blog = {
      title,
      description,
      image,
    };

    try {
      const res = await fetch("http://localhost:8000/editor-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Blog Saved",
          text: "Your blog was saved successfully!",
        });

        setTitle("");
        setImage("");
        setDescription("");
          setTimeout(() => {
          router.push("/dashboard/manage-blogs"); 
        }, 1600);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Something went wrong.",
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: err.message || "Check your server or connection.",
      });
    }
  };

  return (
    <div className=" w-full text-black mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>

      <label className="block mb-2 text-lg font-medium">Blog Title</label>
      <input
        type="text"
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
      />

      <label className="block mb-2 text-lg font-medium">Image URL</label>
      <input
        type="text"
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Paste image URL here"
      />

      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt="Preview"
            className="w-full max-h-60 object-cover rounded-lg"
          />
        </div>
      )}

      <label className="block mb-2 text-lg font-medium">Description</label>
      <JoditEditor
        value={description}
        config={config}
        onBlur={(newContent: string) => setDescription(newContent)}
      />

      <button
        className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
        onClick={saveBlog}
      >
        Save Blog
      </button>
    </div>
  );
};

export default BlogEditorPage;
