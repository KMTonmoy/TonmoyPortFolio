"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, LogIn, ChevronDown, Heart, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Funny random shame messages for blocked users
const SHAME_MESSAGES = [
  "🚫 Oops! Looks like you've been caught red-handed! The admin has blocked you. Time to reflect on your life choices!",
  "😅 Well, well, well... someone's been naughty! The admin said 'NO' to you. Maybe try being a better human?",
  "🤡 Congratulations! You've been officially blocked! The admin has decided you're not cool enough. Better luck next lifetime!",
  "💀 You've been blocked! Did you think you could get away with it? The admin says 'BYE FELICIA!'",
  "🙈 The admin has blocked you! They said you're 'too spicy' for this platform. Go cool down somewhere!",
  "🎪 Welcome to the blocked club! The admin thinks you're a circus clown. Take a bow and exit stage left!",
  "🚀 You've been blocked! The admin said 'To infinity and BEYOND... without you!'",
  "🍕 The admin blocked you! They said you ordered pineapple pizza one too many times. The horror!",
  "😤 You're blocked! The admin said your vibes are OFF. Go find some new vibes!",
  "🌮 The admin blocked you! They said you're not 'taco-tastic' enough. Get your life together!",
  "🎮 Game Over! The admin hit the 'block' button on your life. Press 'F' to pay respects!",
  "🐢 You've been blocked! The admin said you're moving slower than a snail in quicksand. Speed up or ship out!",
  "🧠 The admin blocked you! They said your brain is 'on airplane mode.' Connect to reality and try again!",
  "🔥 You've been blocked! The admin said you're 'too hot to handle'... and not in a good way!",
  "🥴 The admin blocked you! They said your energy is giving 'main character syndrome.' Time to be a side character!",
  "👻 You've been blocked! The admin said you're giving 'ghosted' vibes. Get a life and come back!",
  "🤖 The admin blocked you! They said you're acting like a bot. Are you even human?",
  "🎭 You've been blocked! The admin said your drama is too much for this platform. Take it to Broadway!",
  "🧙‍♂️ The admin blocked you! They said 'You shall not pass!' - Gandalf approved!",
  "🦄 You've been blocked! The admin said you're not magical enough. Sorry, no unicorn status for you!",
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const [showBlockAlert, setShowBlockAlert] = useState(false);
  const [shameMessage, setShameMessage] = useState("");
  const pathName = usePathname();
  const { user, logOut } = useAuth();
  const { isAdmin, isBlocked, loading } = useUserRole();

  // Check if user is blocked and show alert
  useEffect(() => {
    if (!loading && isBlocked && user) {
      const randomMessage = SHAME_MESSAGES[Math.floor(Math.random() * SHAME_MESSAGES.length)];
      setShameMessage(randomMessage);
      setShowBlockAlert(true);
    }
  }, [isBlocked, loading, user]);

  const handleLogout = async () => {
    try {
      await logOut();
      setMobileMenuOpen(false);
      setMobileUserMenuOpen(false);
      setShowBlockAlert(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleBlockedOk = async () => {
    setShowBlockAlert(false);
    await handleLogout();
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
    <>
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
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/feedback" className="cursor-pointer">
                         Give Feedback
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
            <Button variant="gradient" size="sm" asChild className="hidden lg:flex">
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
                    {isAdmin && (
                      <Link
                        href="/dashboard"
                        className="transition-colors hover:text-[#6397ff]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href="/feedback"
                      className="transition-colors hover:text-[#6397ff] flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart className="h-4 w-4 text-red-500" />
                      Give Feedback
                    </Link>
                    <Link
                      href="/profile"
                      className="transition-colors hover:text-[#6397ff]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
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
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="px-2 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/feedback"
                className="px-2 py-2 text-sm hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                onClick={() => setMobileUserMenuOpen(false)}
              >
                <Heart className="h-4 w-4 text-red-500" />
                Give Feedback
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

      {/* Blocked User Alert */}
      <AlertDialog open={showBlockAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              You've Been Blocked! 🚫
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              {shameMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={handleBlockedOk} 
              className="bg-red-600 hover:bg-red-700"
            >
              OK, I'll Leave 😔
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}