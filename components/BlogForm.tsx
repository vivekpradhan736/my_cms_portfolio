"use client";
// @ts-ignore
import { Editor, editorProps } from "novel";
import { Button } from "@/components/ui/button";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Select, { MultiValue, OptionProps } from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";

type Variants = "blog" | "project";

type Inputs = {
  title: string;
  content: string;
  description: string;
  tags: number;
  cover_url: string;
  github_link: string;
  live_link: string;
};

interface BlogFormProps {
  id?: string;
  variant?: Variants;
  value?: Inputs;
}

type TagOption = {
  label: string;
  value: string;
  name: string;
};

const blogsTags: TagOption[] = [
  {
    label: "HTML",
    value: "HTML",
    name: "HTML",
  },
  {
    label: "CSS",
    value: "CSS",
    name: "CSS",
  },
  {
    label: "JavaScript",
    value: "JavaScript",
    name: "JavaScript",
  },
];

const getDefaultValue = (value: string[]) => {
  if (value.length > 0) {
    return value.map((v) => {
      return {
        label: v,
        name: v,
        value: v,
      };
    });
  }

  return [];
};

export default function BlogForm({
  id,
  value,
  variant = "blog",
}: BlogFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>({
    defaultValues: {
      title: value?.title || "",
      description: value?.description || "",
      cover_url: value?.cover_url || ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [blogForm, setBlogForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      title: value?.title || "",
      content: value?.content || "",
      description: value?.description || "",
      cover_url: value?.cover_url || "",
      github_link: value?.github_link || "",
      live_link: value?.live_link || ""
    }
  );

  const updateContent = useCallback((data: editorProps) => {
    setBlogForm({ content: data.getJSON() });
  }, []);

  const onSubmitBlog: SubmitHandler<Inputs> = async (data) => {
    let req;
    const blogData = {
      title: data?.title || "",
      content: blogForm?.content || "",
      description: data?.description || "",
      cover_url: blogForm?.cover_url || "",
    }

    setLoading(true);

    if (id) {
      req = await fetch(`/api/blogs?id=${id}`, {
        method: "PATCH",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
    } else {
      req = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
    }

    const response = await req.json();
    console.log("response",response)

    setLoading(false);

    if (response?.data?.id) {
      router.push("/admin/blogs");
    }
  };

  const onSubmitProject: SubmitHandler<Inputs> = async (data) => {    
    let req;

    const ProjectData = {
      title: data?.title || "",
      content: blogForm?.content || "",
      description: data?.description || "",
      tags: blogForm?.tags || [],
      cover_url: blogForm?.cover_url || "",
      github_link: blogForm?.github_link || "",
      live_link: blogForm?.live_link || ""
    }

    setLoading(true);

    if (id) {
      req = await fetch(`/api/projects?id=${id}`, {
        method: "PATCH",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(ProjectData),
      });
    } else {
      req = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(ProjectData),
      });
    }

    const response = await req.json();

    setLoading(false);

    if (response?.data?.id) {
      router.push("/admin/projects");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        variant === "blog" ? onSubmitBlog : onSubmitProject
      )}
    >
      <div>
        <Label htmlFor="email" className="capitalize">
          {variant} Title
        </Label>
        <Input
          type="text"
          {...register("title", { required: true })}
          placeholder="Title"
          className={`mt-2 ${
            errors.title ? "bg-red-100 border-red-500" : ""
          }`}
        />
        {errors.title && (
          <span className="text-sm mt-1 text-red-500">
            This field is required
          </span>
        )}
      </div>
      <div className="mt-5">
        <Label htmlFor="description" className="capitalize">
          {variant} Description
        </Label>
        <Textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className={`mt-2 ${
            errors.description ? "bg-red-100 border-red-500" : ""
          }`}
        />
        {errors.description && (
          <span className="text-sm mt-1 text-red-500">
            This field is required
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="capitalize">
            {variant} Cover Image
          </Label>
          <div className="max-w-[120px]">
            {blogForm?.cover_url && (
              <Image
                src={blogForm?.cover_url}
                width={500}
                height={500}
                alt="image"
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
          <input type="hidden" value={blogForm.cover_url} {...register("cover_url", { required: true })}/>
          <Input
            id="picture"
            type="file"
            className={`mt-2 ${
              errors.cover_url ? "bg-red-100 border-red-500" : ""
            }`}
            onChange={async (e) => {
              let files = (e.target as HTMLInputElement).files;

              if (files && files?.length > 0) {
                const file = files[0];
                const response = await fetch("/api/upload", {
                  method: "POST",
                  headers: {
                    "Content-type": file.type,
                    "X-Vercel-Filename": file.name,
                  },
                  body: file,
                }).then((res) => res.json());

                setBlogForm({
                  cover_url: response.url,
                });
                setValue("cover_url", response.url)
              }
            }}
          />
          {errors.cover_url && (
            <span className="text-sm mt-1 text-red-500">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="content" className="capitalize">
          {variant} Content
        </Label>
        <Editor
          editorProps={{}}
          onDebouncedUpdate={updateContent}
          defaultValue={blogForm.content}
          className="border rounded pb-8 mt-2"
          disableLocalStorage
        />
      </div>
      {
        variant === "project" && (
          <div className="mt-4">
          <Label htmlFor="content" className="capitalize">{variant} Tags</Label>
          <CreatableSelect
            defaultValue={getDefaultValue(blogForm.tags)}
            isMulti
            name="tags"
            options={blogsTags}
            onChange={(value: MultiValue<TagOption>) => {
              const tags = value.map((v) => v.value);
              setBlogForm({ tags });
            }}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        )
      }
      {
        variant === "project" && (
      <div className="mt-4">
        <Label htmlFor="email" className="capitalize">
          {variant} Github URL
        </Label>
        <Input
          type="url"
          pattern="https://.*"
          value={blogForm.github_link}
          {...register("github_link", { required: false })}
          placeholder="Github URL"
          className={`mt-2 ${
            errors.github_link ? "bg-red-100 border-red-500" : ""
          }`}
          onChange={(e) =>
            setBlogForm({ github_link: e.target.value })
          }
        />
      </div>
        )
      }
      {
        variant === "project" && (
      <div className="mt-4">
        <Label htmlFor="email" className="capitalize">
          {variant} Live URL
        </Label>
        <Input
          type="url"
          pattern="https://.*"
          value={blogForm.live_link}
          {...register("live_link", { required: false })}
          placeholder="Live URL"
          className={`mt-2 ${
            errors.live_link ? "bg-red-100 border-red-500" : ""
          }`}
          onChange={(e) =>
            setBlogForm({ live_link: e.target.value })
          }
        />
      </div>
        )
      }
      <div className="mt-4 text-right">
        <Button
          variant={"secondary"}
          onClick={() => {
            variant === "blog"
              ? router.push("/admin/blogs")
              : router.push("/admin/projects");
          }}
        >
          Cancel
        </Button>
        <Button className="ml-5">
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <CheckIcon className="mr-2" />
              Save
            </>
          )}
        </Button>
      </div>
    </form>
  );
}