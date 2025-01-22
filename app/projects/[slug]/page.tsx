"use client";

import React, { useState, useEffect, useReducer, useCallback } from "react";
import WebsiteMainLayout from "@/website-components/layout/WebsiteMainLayout";
import SubTitle from "@/website-components/ui/SubTitle";
import Paragraph from "@/website-components/ui/Paragraph";
import Image from "next/image";
import { Editor } from "novel";
import Link from "next/link";
import Button from "@/website-components/ui/Button";
import { FaGithub } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import Profile2 from "@/public/images/MyPic.png";

interface ProjectProps {
  params: {
    slug: string;
  };
}

function Project({ params }: ProjectProps) {
  const [mode, setMode] = useState("darkMode");
  const [readTime, setReadTime] = useState<number | undefined>(undefined)
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

  const toggleTheme = useCallback(() => {
        const newMode = mode === "darkMode" ? "lightMode" : "darkMode";
        setMode(newMode);
        localStorage.setItem("colorTheme", newMode);
      }, [mode]);

  const [showAllTags, setShowAllTags] = useState(false);
  const [visibleTags, setVisibleTags] = useState<number>(5); // Initially show 5 tags

  const toggleShowTags = () => {
    setShowAllTags(!showAllTags);
    if (!showAllTags) {
      setVisibleTags(response?.data?.tags?.length); // Show all tags
    } else {
      setVisibleTags(5); // Show only 5 tags
    }
  };

  const fetchProjects = async () => {
    setResponse({ loading: true });
    const res = await fetch(`/api/projects?id=${params.slug}`, {
      method: "GET",
    });
    const response = await res.json();
    setResponse({
      data: response.data,
      loading: false,
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const calculateTextSize = (contentArray: any[]): number => {
      let totalLength = 0;
      contentArray.forEach((item) => {
        if (item.text) {
          totalLength += item.text.length;
        }
        if (item.content && Array.isArray(item.content)) {
          totalLength += calculateTextSize(item.content);
        }
      });
      return totalLength;
    };

    if (response.data && response.data.content && Array.isArray(response.data.content.content)) {
      const totalTextSize = calculateTextSize(response.data.content.content);
      const readTime = Math.floor(totalTextSize / 500);
      setReadTime(readTime);
    } else {
      console.log('Content or response data is missing or not an array.');
    }
  }, [response.data]);
  return (
    <WebsiteMainLayout toggleTheme={toggleTheme}>
      <section className="pt-4 pb-10 relative z-10">
        {response?.loading ? (
          <div className="w-full max-w-4xl mx-auto animate-pulse">
          <div className="flex justify-between w-full sm:mx-12 mb-4">
            <div className="w-1/2">
              <div className="flex flex-wrap gap-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-6 w-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 w-1/2 justify-end">
              <div className="h-10 w-20 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-20 bg-gray-300 rounded-md"></div>
            </div>
          </div>
    
          <div className="sm:mx-12 mb-4">
            <div className="h-8 w-3/4 bg-gray-300 mb-2"></div>
            <div className="h-4 w-full bg-gray-300 mb-1"></div>
            <div className="h-4 w-full bg-gray-300 mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-300"></div>
          </div>
    
          <div className="flex items-center gap-3 py-1 mb-5 sm:mx-12">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 w-40 bg-gray-300 mb-2"></div>
              <div className="flex gap-2">
                <div className="h-4 w-24 bg-gray-300"></div>
                <div className="h-4 w-24 bg-gray-300"></div>
                <div className="h-4 w-24 bg-gray-300"></div>
              </div>
            </div>
          </div>
    
          <div className="flex flex-col items-center">
            <div className="h-64 w-full max-w-2xl bg-gray-300 mb-4"></div>
            <div className="w-full">
              <div className="h-4 w-full bg-gray-300 mb-2"></div>
              <div className="h-4 w-full bg-gray-300 mb-2"></div>
              <div className="h-4 w-full bg-gray-300 mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 mb-2"></div>
            </div>
          </div>
        </div>
        ) : (
          <>
          <div className="flex justify-between w-full sm:mx-12">
            <ul className="flex mb-2 gap-3 h-fit w-1/2 flex-wrap">
              {response.data?.tags?.slice(0, visibleTags).map((tag: string, index: number) => (
                <li
                  className="text-xs text-slate-400 border border-slate-400 px-2 py-1 rounded "
                  key={index.toString()}
                >
                  {tag}
                </li>
              ))}{
                response.data?.tags?.length > 5 && (
            <div className="text-sm mt-2 text-[#777575]">
              <button onClick={toggleShowTags}>
                {showAllTags ? "less..." : "more..."}
              </button>
            </div>
                )}
            </ul>
            <div className="flex gap-3 w-1/2 justify-end">
              {
                response?.data?.github_link && (
              <Link href={response?.data?.github_link} className="group">
              <div className="flex justify-around items-center rounded-md w-20 md:h-10 h-8 py-4 px-2 bg-green-600 hover:bg-green-700">
                <FaGithub className="w-fit md:h-5 h-4 group-hover:rotate-[360deg] duration-500 text-white " /> <h1 className="md:text-base text-sm text-white">Code</h1>
                </div>
              </Link>
                )
              }
              {
                response?.data?.live_link && (
              <Link href={response?.data?.live_link} className="group">
              <div className="flex justify-around items-center rounded-md w-20 md:h-10 h-8 py-4 px-2 bg-green-600 hover:bg-green-700">
                <FaArrowCircleRight className="w-fit md:h-5 h-4 -rotate-45 group-hover:rotate-0 duration-200 text-white" /> <h1 className="md:text-base text-sm text-white">Live</h1>
                </div>
              </Link>
                )
              }
            </div>
            </div>
            <div className="sm:mx-12">
            <SubTitle title={response?.data?.title} />
            <Paragraph content={response?.data?.description} />
            </div>
            <div className=" flex items-center gap-3 py-1 mb-5 sm:mx-12">
            <div>
                <Image src={Profile2} alt="Profile" className="max-w-sm w-12" data-aos="fade-up"/> 
            </div>
              <div className="">
                <div className="flex text-lg font-sans font-medium">
                  <h3>Vivek Pradhan •</h3>
                  <h3><Link
                      href="/#contact"
                      className="text-lg text-green-500 hover:text-green-700 pl-2 cursor-pointer"
                      property=""
                    > contact
                    </Link></h3>
                </div>
                <div className="flex items-center text-base ">
                  <h3 className="text-[#6e6e6e] text-[1rem]">Deployed in <a className="hover:underline text-[#111111ec] font-mono" href="">Server</a></h3>
                  <h3 className="text-[#6e6e6e] text-[0.9rem] pl-2">• {readTime} min read</h3>
                  <h3 className="text-[#6e6e6e] text-[0.9rem] pl-2">• {new Date(response?.data?.created_at).toLocaleDateString('en-US', {year: 'numeric',month: 'short',day: 'numeric'})}</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={response?.data?.cover_url}
                width={500}
                height={500}
                className=""
                alt={response?.data?.title}
              />
              <Editor
                editorProps={{
                  editable: () => {
                    return false
                  }
                }}
                onDebouncedUpdate={() => {}}
                defaultValue={response?.data?.content}
                className="mt-2 border-none p-0 m-0"
                disableLocalStorage
              />
            </div>
          </>
        )}
      </section>
    </WebsiteMainLayout>
  );
}

export default Project;