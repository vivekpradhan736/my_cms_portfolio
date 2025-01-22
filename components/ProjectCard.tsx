import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"

type skillImageOption = {
    value: string;
    name: string;
  };
  
  const skillImage: skillImageOption[] = [
    {
        name: "HTML",
        value: "html.svg",
        },
    {
        name: "CSS",
        value: "css.svg",
        },
    {
        name: "JavaScript",
        value: "javascript.svg",
        },
    {
        name: "TypeScript",
        value: "typescript.svg",
        },
    {
        name: "React",
        value: "reactjs.svg",
        },
    {
        name: "Next",
        value: "nextjs.svg",
        },
    {
        name: "Node",
        value: "nodejs.svg",
        },
    {
        name: "MongoDB",
        value: "mongodb.svg",
        },
    {
        name: "Express",
        value: "express.svg",
        },
    {
        name: "Tailwind",
        value: "tailwindcss.svg",
        },
    {
        name: "Bootstrap",
        value: "bootstrap.svg",
        },
    {
        name: "C++",
        value: "c++.svg",
        },
    {
        name: "Python",
        value: "python.svg",
        },
    {
        name: "Figma",
        value: "figma.svg",
        },
    {
        name: "Git",
        value: "git.svg",
        },
    {
        name: "GitHub",
        value: "github.svg",
        },
    {
        name: "Docker",
        value: "docker.svg",
    },
  ];

export default function ProjectCard({ project }: { project: any }) {
    return (
        <div className="grid md:grid-cols-2 gap-20 items-center pb-12">
            <div className="space-y-6">
                <Link
                    href={`/projects/${project.id}`}
                >
                    <h2 className="text-4xl font-bold hover:underline cursor-pointer">{project.title}</h2>
                </Link>
                <p className="text-gray-600 text-lg line-clamp-3">{project.description}</p>

                <div className="space-y-4">
                    <div className="flex gap-16">
                        <div className="w-52">
                            <h3 className="font-semibold mb-2">Technologies</h3>
                            {/* <p>{project.tags}</p> */}
                            <ul className="flex gap-2 mt-2">
                            {project.tags.slice(0, 3).map((tag: string, index: number) => (
    <li
      key={index.toString()}
      className="text-sm font-medium text-slate-800"
    >
      {tag}
    </li>
  ))}
  {project.tags.length > 3 && (
    <li className="text-sm font-medium text-slate-600 ">
      +{project.tags.length - 3}
    </li>
  )}
                            </ul>
                        </div>
                        {project?.start_date && project.end_date &&
                        <>
                        <div>
                            <h3 className="font-semibold mb-2">Start Date</h3>
                            <p className="text-sm font-medium text-slate-800">{project.start_date && format(project.start_date, "PPP")}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">End Date</h3>
                            <p className="text-sm font-medium text-slate-800">{project.end_date && format(project.end_date, "PPP")}</p>
                        </div>
                        </>
                        }
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-2">
                        {project.tags.map((tag: string, i: number) => {
    // Find the image corresponding to the current tag
    const image = skillImage.find((skill) => skill.name === tag);
    return (
      image && (
        <Image
          key={i}
          alt={tag}
          src={`/images/${image.value}`}
          width={30}
          height={30}
          className="rounded-full object-scale-down border-2  text-green-500 bg-white"
        />
      )
    );
  })}
                        </div>
                        <Link
                            href={`/projects/${project.id}`}
                        >
                            <Button variant="link" className="text-blue-600 font-semibold">
                                View Case Study
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {project.images ? (
                <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image: string, index: number) => (
                        <div key={index} className="relative h-[200px] bg-blue-100 rounded-lg overflow-hidden">
                            <Image
                                src={image}
                                alt={`${project.title} image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative h-[350px] bg-blue-100 rounded-2xl overflow-hidden group duration-500">
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center p-6 z-10">
        <p className="text-white text-lg font-sans font-semibold hover:text-green-400 hover:underline duration-500 text-center cursor-pointer">
          See live
        </p>
      </div>
      <Image
        src={project.cover_url}
        alt={`${project.title} project screenshot`}
        fill
        className="object-cover group-hover:blur-sm transition-all duration-500"
      />
    </div>
            )}
        </div>
    )
}