"use client";

import React, { useEffect, useReducer } from "react";
import WebsiteMainLayout from "@/website-components/layout/WebsiteMainLayout";
import Link from "next/link";
import SubTitle from "@/website-components/ui/SubTitle";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";

function Projects() {
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

  const fetchProjects = async () => {
    setResponse({ loading: true });
    const res = await fetch(`/api/projects?limit=10`, {
      method: "GET",
    });
    const response = await res.json();
    console.log("response", response)

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
      <section className="py-10 relative z-10">
        <SubTitle title="Selected Projects" />
        {response?.loading == false && !response?.data && (
          <div>
            <Image src="/empty.png" width={100} height={100} alt="Profile" className="max-w-sm w-80 m-auto" data-aos="fade-up"/> 
          </div>
        )}
        {response?.loading ? (
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-32">
            {/* <div className="flex-1 space-y-6 py-1">
              <div className="h-28 w-full bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div> */}
            <ProjectCardSkeleton />
          </div>
        ) : (
          <div className="mt-8">
            {response?.data?.map((project: { id: string; title: string; description: string; tags: string[]; cover_url: string }, index: number) => (
              <ProjectCard key={project.id} project={project} />
              // <div key={index.toString()} className="mb-6 ">
              //   <Link
              //     href={`/projects/${project.id}`}
              //     className="text-2xl font-normal text-green-400"
              //   >
              //     {project.title}
              //   </Link>
              //   <p className="mt-2 text-slate-500">{project.description}</p>
              //   <ul className="flex gap-3 mt-2">
              //     {project.tags.map((tag: string, index: number) => (
              //       <li
              //         key={index.toString()}
              //         className="text-xs border px-1 border-slate-300 rounded text-slate-400"
              //       >
              //         {tag}
              //       </li>
              //     ))}
              //   </ul>
              // </div>
            ))}
          </div>
        )}
      </section>
    </WebsiteMainLayout>
  );
}

export default Projects;