 
"use client";

import { useState } from "react";
import { 
  FaHome,
  FaCogs, 
  FaEdit, 
  FaUsers,
  FaImage,
  FaFileAlt,
  FaEnvelope,
  FaChartBar,
  FaBlog,
  FaProjectDiagram,
  FaCode,
  FaPalette,
  FaRocket,
  FaShieldAlt,
  FaStar,
  FaChevronDown
} from "react-icons/fa";
import { SidebarLink } from "./SidebarLink";
import { SidebarNavProps, NavLink } from "@/types/sidebar.types";

export const SidebarNav = ({ isAdmin }: SidebarNavProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  const commonLinks: NavLink[] = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  ];

  const adminLinks: NavLink[] = [
    { 
      name: "Management", 
      icon: <FaShieldAlt />, 
      path: "#",
      subLinks: [
        { name: "Users", icon: <FaUsers />, path: "/dashboard/manage-users" },
        { name: "Projects", icon: <FaProjectDiagram />, path: "/dashboard/manage-projects" },
        { name: "Blogs", icon: <FaBlog />, path: "/dashboard/manage-blogs" },
        { name: "Skills", icon: <FaCode />, path: "/dashboard/manage-skills" },
      ]
    },
    { 
      name: "Content", 
      icon: <FaStar />, 
      path: "#",
      subLinks: [
        { name: "Banners", icon: <FaImage />, path: "/dashboard/manage-banners", badge: "New" },
        { name: "Resume", icon: <FaFileAlt />, path: "/dashboard/manage-resume" },
      ]
    },
    { name: "Send Email", icon: <FaEnvelope />, path: "/dashboard/send-email", badge: "Beta" },
     { name: "Featured Projects", icon: <FaRocket />, path: "/dashboard/featured-projects" },
  ];

  const userLinks: NavLink[] = [
    { 
      name: "My Content", 
      icon: <FaEdit />, 
      path: "#",
      subLinks: [
        { name: "My Projects", icon: <FaProjectDiagram />, path: "/dashboard/my-projects" },
        { name: "My Blogs", icon: <FaBlog />, path: "/dashboard/my-blogs" },
        { name: "My Skills", icon: <FaCogs />, path: "/dashboard/my-skills" },
      ]
    },
  ];

  const links = [...commonLinks, ...(isAdmin ? adminLinks : userLinks)];

  return (
    <nav className="mt-6 px-3 space-y-1">
      {links.map((link) => {
        const hasSubLinks = link.subLinks && link.subLinks.length > 0;
        const isExpanded = expandedMenus.includes(link.name);

        if (hasSubLinks) {
          return (
            <div key={link.name} className="mb-2">
              <button
                onClick={() => toggleMenu(link.name)}
                className="w-full flex items-center px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
              >
                <span className="text-gray-400">{link.icon}</span>
                <span className="ml-3 flex-1 text-sm font-medium text-left">{link.name}</span>
                <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  <FaChevronDown className="h-3 w-3" />
                </span>
              </button>
              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-2">
                  {link.subLinks?.map((subLink) => (
                    <SidebarLink key={subLink.path} link={subLink} depth={1} />
                  ))}
                </div>
              )}
            </div>
          );
        }

        return <SidebarLink key={link.path} link={link} />;
      })}
    </nav>
  );
};