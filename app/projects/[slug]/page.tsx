"use client";

import React, { useState, useEffect, useReducer } from "react";
import WebsiteMainLayout from "@/website-components/layout/WebsiteMainLayout";
import SubTitle from "@/website-components/ui/SubTitle";
import Paragraph from "@/website-components/ui/Paragraph";
import Image from "next/image";
import { Editor } from "novel";
import Link from "next/link";
import Button from "@/website-components/ui/Button";
import { FaGithub } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

interface ProjectProps {
  params: {
    slug: string;
  };
}

function Project({ params }: ProjectProps) {
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
    <WebsiteMainLayout>
      <section className="pt-4 pb-10 relative z-10">
        {response?.loading ? (
          <div className="animate-pulse flex space-x-4 mt-12">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-28 w-full bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
          <div className="flex justify-between w-full">
            <ul className="flex mb-2 gap-3 h-fit w-1/2 flex-wrap">
              {response.data?.tags?.slice(0, visibleTags).map((tag: string, index: number) => (
                <li
                  className="text-xs text-slate-400 border border-slate-400 px-2 py-1 rounded "
                  key={index.toString()}
                >
                  {tag}
                </li>
              ))}
            <div className="text-sm mt-2 text-[#777575]">
              <button onClick={toggleShowTags}>
                {showAllTags ? "less..." : "more..."}
              </button>
            </div>
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
            <SubTitle title={response?.data?.title} />
            <Paragraph content={response?.data?.description} />
            <div>
              <Image
                src={response?.data?.cover_url}
                width={500}
                height={500}
                className="w-full"
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