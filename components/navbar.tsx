"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, LogIn, ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const pathName = usePathname();
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      setMobileMenuOpen(false);
      setMobileUserMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileUserMenuOpen) setMobileUserMenuOpen(false);
  };

  const toggleMobileUserMenu = () => {
    setMobileUserMenuOpen(!mobileUserMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Tonmoy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/projects" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/services"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/services" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Services
          </Link>
          <Link
            href="/reviews"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/reviews" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Reviews
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/about" ? "text-[#6397ff] underline" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/blogs"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/blogs" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Blogs
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            </>
          )}
          <Button 
            variant="default" 
            size="sm" 
            asChild 
            className="hidden lg:flex bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileUserMenu}
              className="flex items-center gap-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileUserMenuOpen ? "rotate-180" : ""}`} />
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <LogIn className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/40 max-h-[80vh] overflow-y-auto">
          <div className="container py-4 space-y-4">
            {/* User Info in Mobile Menu */}
            {user && (
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/projects" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/services"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/services" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/reviews"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/reviews" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/about" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blogs"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/blogs" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              
              {/* Mobile User Menu Items */}
              {user && (
                <>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Auth Links for Non-Logged In Users */}
              {!user && (
                <>
                  <Link
                    href="/login"
                    className="transition-colors hover:text-[#6397ff]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="transition-colors hover:text-[#6397ff]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}

              <Link
                href="/contact"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/contact" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile User Menu Dropdown (separate from main menu) */}
      {mobileUserMenuOpen && !mobileMenuOpen && (
        <div className="md:hidden absolute right-4 top-16 bg-background border border-border rounded-lg shadow-lg w-56 p-2 z-50">
          <div className="flex flex-col space-y-1 p-2">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.displayName || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="px-2 py-2 text-sm hover:bg-muted rounded-md transition-colors"
              onClick={() => setMobileUserMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="px-2 py-2 text-sm hover:bg-muted rounded-md transition-colors"
              onClick={() => setMobileUserMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMobileUserMenuOpen(false);
              }}
              className="px-2 py-2 text-sm text-red-600 hover:bg-muted rounded-md transition-colors text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}