"use client";

import SideNavigation from "./SideNavigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import NavigationHeading from "./NavigationHeading";
import { useRouter } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter(); // ✅ Use Next.js router
  const [userData, setUserData] = useState<any>(null); // Use `any` or a type for userData
  const [userDataLoading, setUserDataLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuthenticated = async () => {
      if (typeof window !== "undefined") {
        const userDetails = localStorage.getItem("userDetails");
        if (userDetails) {
          const user = JSON.parse(userDetails);
          setUserData(user);
        }
      }
      setUserDataLoading(false);
    };

    isAuthenticated();
  }, []);

  // Redirect if no user data and not loading
  useEffect(() => {
    if (!userDataLoading && !userData) {
      router.push("/login");
    }
  }, [userData, userDataLoading, router]);

  const signOut = () => {
    window.location.href = "/login";
  };

  if (userDataLoading) {
    return <p>Loading user data...</p>; // Show loading while user data is being fetched
  }

  return (
    <main className="flex">
      <SideNavigation />
      <section className="w-full">
        <header className="p-3 fixed z-10 left-60 bg-white border-b right-0">
          <div className="container flex justify-between items-center">
            <div>
              <NavigationHeading />
            </div>
            <div className="flex gap-6 justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}>
                    <PlusIcon className="mr-2" /> Create
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <Link href={"/admin/projects/create"}>
                    <DropdownMenuItem className="text-gray-500 cursor-pointer">
                      Project
                    </DropdownMenuItem>
                  </Link>
                  <Link href={"/admin/blogs/create"}>
                    <DropdownMenuItem className="text-gray-500 cursor-pointer">
                      Blog
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>{userData?.email && userData.email[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem className="text-gray-500">
                    {userData?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <form action={signOut}>
                    <button className="py-2 px-2 text-sm block hover:bg-gray-100 rounded-md no-underline bg-btn-background w-full text-left">
                      Logout
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="absolute left-60 bottom-0 top-24 right-0">
          <div className="container">{children}</div>
        </div>
      </section>
    </main>
  );
}
