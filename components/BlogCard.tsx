import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"

export default function BlogCard({ blog }: { blog: any }) {
    return (
        <div className="grid md:grid-cols-2 gap-20 items-center pb-12">
            <div className="space-y-4">
                <Link
                    href={`/blogs/${blog.id}`}
                >
                    <h2 className="text-3xl font-bold hover:underline cursor-pointer">{blog.title}</h2>
                </Link>
                <p className="text-gray-600 text-lg line-clamp-3">{blog.description}</p>

                <div className="space-y-4">
                    <div className="flex gap-16">
                        <>
                        <div>
                            <h3 className="font-semibold mb-2">Published at</h3>
                            <p className="text-sm font-medium text-slate-800">{blog.created_at && format(blog.created_at, "PPP")}</p>
                        </div>
                        </>
                    </div>

                    <div className="">
                        <Link
                            href={`/blogs/${blog.id}`}
                        >
                            <button className="text-blue-600 text-sm font-semibold underline-offset-4 hover:underline duration-1000">
                                View Case Study
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
                <div className="relative h-[300px] bg-blue-100 rounded-2xl overflow-hidden group duration-500">
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center p-6 z-10">
        <p className="text-white text-lg font-sans font-semibold hover:text-green-400 hover:underline duration-500 text-center cursor-pointer">
          See live
        </p>
      </div>
      <Image
        src={blog.cover_url}
        alt={`${blog.title} project screenshot`}
        fill
        className="object-cover group-hover:blur-sm transition-all duration-500"
      />
    </div>
        </div>
    )
}