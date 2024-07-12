"use client";

import React, { useEffect, useReducer, useState } from "react";
import WebsiteMainLayout from "@/website-components/layout/WebsiteMainLayout";
import SubTitle from "@/website-components/ui/SubTitle";
import Paragraph from "@/website-components/ui/Paragraph";
import Image from "next/image";
import { Editor } from "novel";
import Profile2 from "@/public/images/MyPic.png";
import Link from "next/link";

interface BlogProps {
  params: {
    slug: string;
  };
}

function Blog({ params }: BlogProps) {
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



  const fetchBlogs = async () => {
    setResponse({ loading: true });
    const res = await fetch(`/api/blogs?id=${params.slug}`, {
      method: "GET",
    });
    const response = await res.json();
    console.log("response",response)

    setResponse({
      data: response.data,
      loading: false,
    });
  };

  // const textSize = response?.data?.content?.length;
  // console.log("textSize",textSize)

  useEffect(() => {
    fetchBlogs();
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
    <WebsiteMainLayout>
      <section className="pt-4 pb-10 relative z-10">
        {response?.loading ? (
          <div
            className="animate-pulse flex space-x-4 mt-12"
          >
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
          <div className="flex flex-col sm:mx-12">
            {/* <SubTitle title={response?.data?.title} /> */}
            <h1 className="text-[2rem] sm:text-[3rem] font-semibold">{response?.data?.title}</h1>
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
                  <h3 className="text-[#6e6e6e] text-[1rem]">Published in <a className="hover:underline text-[#111111ec] font-mono" href="https://medium.com/@vivekpradhan736">Medium</a></h3>
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
                    return false;
                  },
                }}
                onDebouncedUpdate={() => {}}
                defaultValue={response?.data?.content}
                className="border-none sm:w-full w-[29.8rem]"
                disableLocalStorage
              />
            </div>
          </>
        )}
      </section>
    </WebsiteMainLayout>
  );
}

export default Blog;