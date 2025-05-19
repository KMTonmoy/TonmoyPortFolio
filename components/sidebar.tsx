"use client";

import Link from "next/link";
import { ReactElement, useState } from "react";
import {
  FaBars,
  FaBook,
  FaCogs,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

interface NavLink {
  name: string;
  icon: ReactElement;
  path: string;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const links: NavLink[] = [
    { name: "Customize Skills", icon: <FaCogs />, path: "/dashboard/customize-skills" },
    { name: "Manage Blogs", icon: <FaBook />, path: "/dashboard/manage-blogs" },
    { name: "Manage Projects", icon: <FaEdit />, path: "/dashboard/manage-projects" },
  ];

  return (
    <div className="flex md:w-[300px] z-50 min-h-screen bg-gray-800 text-white">
      {/* Toggle Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 text-2xl focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Content */}
      <div
        className={`fixed lg:static bg-gray-900 w-64 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto overflow-x-hidden`}
      >
        <div className="p-5 flex flex-col items-center bg-gray-800">
          <img
            src="https://tonmoy-pro.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmyimage.3e7e1486.jpg&w=828&q=75"
            alt="User Avatar"
            className="h-16 w-16 rounded-full object-cover"
          />
          <p className="mt-2 text-lg font-semibold">Tonmoy Pro</p>
        </div>

        <nav className="mt-8 px-2">
          {links.map(({ name, icon, path }) => (
            <Link
              key={name}
              href={path}
              className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition hover:scale-105"
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
