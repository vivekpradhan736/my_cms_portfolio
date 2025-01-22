"use client";

import React, { useEffect, useReducer, useCallback, useState } from "react";
import WebsiteMainLayout from "@/website-components/layout/WebsiteMainLayout";
import Link from "next/link";
import SubTitle from "@/website-components/ui/SubTitle";
import ThemeContext from "../context/ThemeContext";
import BlogCard from "@/components/BlogCard";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

function Blogs() {
  const [response, setResponse] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      data: [],
      loading: true,
      searchTerm: "",
      page: 0,
    }
  );

  const [mode, setMode] = useState(localStorage.getItem("colorTheme") || "darkMode");

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    const newMode = mode === "darkMode" ? "lightMode" : "darkMode";
    setMode(newMode);
    localStorage.setItem("colorTheme", newMode);
  }, [mode]);

  const fetchProjects = async () => {
    setResponse({ loading: true });
    const res = await fetch(`/api/blogs?limit=6`, {
      method: "GET",
    });
    const response = await res.json();
    console.log("response",response)

    setResponse({
      data: response.data,
      loading: false,
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ThemeContext.Provider  value={mode}>
    <WebsiteMainLayout toggleTheme={toggleTheme}>
      <section className={`py-10 relative z-10`}>
        <SubTitle title="Selected Blogs" />
        {response?.loading ? (
          <ProjectCardSkeleton />
          // <div className="animate-pulse flex space-x-4 mt-12">
          //   <div className="flex-1 space-y-6 py-1">
          //     <div className="h-28 w-full bg-slate-200 rounded"></div>
          //     <div className="space-y-3">
          //       <div className="h-2 bg-slate-200 rounded"></div>
          //       <div className="h-2 bg-slate-200 rounded"></div>
          //     </div>
          //   </div>
          // </div>
        ) : (
          <div className="mt-8">
            {response?.data?.map((blog: { id: string; title: string; description: string }, index: number) => (
              <BlogCard key={blog.id} blog={blog} />
              // <div key={index.toString()} className="mb-6 ">
              //   <Link
              //     href={`/blogs/${blog.id}`}
              //     className="text-2xl font-normal text-green-400"
              //   >
              //     {blog.title}
              //   </Link>
              //   <p className="mt-2 text-slate-500">{blog.description}</p>
              // </div>
            ))}
          </div>
        )}
      </section>
    </WebsiteMainLayout>
    </ThemeContext.Provider>
  );
}

export default Blogs;
