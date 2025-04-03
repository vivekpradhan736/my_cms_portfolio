"use client";

import React, { useEffect, useReducer, useState } from "react";
import Title from "./ui/Title";
import { config } from "@/constant";
import SubTitle from "./ui/SubTitle";
import Paragraph from "./ui/Paragraph";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Button from "./ui/Button";
import { ArrowTopRightIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProjectProps {
  title: string;
  cover_url: string;
  description: string;
  _id: string;
  github_link: string;
  live_link: string;
}

function Projects() {
  const router = useRouter();

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
    const res = await fetch(`/api/projects?limit=6`, {
      method: "GET",
    });
    const response = await res.json();

    setResponse({
      data: response,
      loading: false,
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="py-12 flex flex-col lg:items-center" id="portfolio">
      <div className="lg:text-center">
        <Title title={config.portfolio.title} />
        <SubTitle title={config.portfolio.subTitle} />
        <Paragraph content={config.portfolio.content} />
      </div>
      <div className="mt-1">
        <Carousel
          opts={{
            align: "start",
          }}
          data-aos="fade-in"
          className="w-full max-w-sm md:max-w-5xl m-auto"
        >
          <CarouselContent>
            {response.loading ? (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="p-4">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-28 w-full bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ) : (
              <>
                {response?.data?.map((project: ProjectProps, index: number) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                    data-aos="fade-up"
                  >
                    <div className="p-1">
                      <Card className="p-1">
                        <CardHeader>
                          <Link href={`/projects/${project?._id}`}>
                          <CardTitle className="text-xl text-primaryColor font-medium block">{project.title}</CardTitle>
                          </Link>
                          <CardDescription className="mt-1 text-base text-slate-400 font-light line-clamp-4">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex aspect-square items-center justify-center">
                          <Image
                            width={300}
                            height={300}
                            src={project?.cover_url}
                            alt="Project"
                            className="w-auto h-auto"
                          />
                        </CardContent>
                        <CardFooter className="flex justify-between gap-4">
                          <Button
                            onClick={() => {
                              router.push(`/projects/${project._id}`);
                            }}
                          >
                            <EyeOpenIcon /> Details
                          </Button>
                          <div>
                          {
                            project?.github_link && (
                              <Link href={project?.github_link} className="group w-fit px-1 py-1 rounded-sm flex items-center gap-1 hover:bg-[#f3f1f1] text-gray-400 duration-200">
                                <p className="group-hover:text-black">Source code</p> <ArrowTopRightIcon className="group-hover:text-black transition group-hover:translate-x-1 group-hover:rotate-45 ease-in-out" />
                              </Link>
                            )
                          }
                          {
                            project?.live_link && (
                              <Link href={project?.live_link} className="group w-fit px-2 py-1 rounded-sm flex items-center gap-1 text-gray-400 hover:bg-[#f3f1f1] duration-200">
                                <p className="group-hover:text-black">Live here</p> <ArrowTopRightIcon className="group-hover:text-black transition group-hover:translate-x-1 group-hover:rotate-45 ease-in-out" />
                              </Link>
                            )
                          }
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="inline-block" data-aos="fade-up">
          <Button
            onClick={() => {
              router.push("/projects");
            }}
          >
            <span className="mr-1">
              <EyeOpenIcon />
            </span>{" "}
            View All Projects
          </Button>
        </div>
    </div>
  );
}

export default Projects;