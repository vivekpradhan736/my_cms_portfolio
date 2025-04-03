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
// import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useImageUpload } from "@/hooks/useImageUpload";
import { useEditor } from "@tiptap/react";
import { Image } from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

type Variants = "blog" | "project";

type Inputs = {
  title: string;
  content: string;
  description: string;
  tags: number;
  cover_url: string;
  github_link: string;
  live_link: string;
  start_date: string;
  end_date: string;
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
  if (value?.length > 0) {
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

  const [uploading, setUploading] = useState(false);
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
      live_link: value?.live_link || "",
      start_date: value?.start_date || "",
      end_date: value?.end_date || ""
    }
  );
  console.log("blogForm",blogForm)

  const updateContent = useCallback((data: editorProps) => {
    console.log("updateContent",data)
    setBlogForm({ content: data.getJSON() });
  }, []);

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  // const editor = useEditor({
  //   extensions: [
  //     StarterKit.configure({ history: false }),
  //     Image,
  //   ],
  //   content: value?.content || "",
  // });

  // const handleImageUpload = useImageUpload(editor);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      console.log("response",response)

      const data = await response.json();
      console.log("data",data)
      if (data.filename) {
        // ✅ FIX: Ensure correct URL for serving images from GridFS
        const uploadedFileUrl = `/api/files/${data.filename}`;

        // setBlogForm((prev: any) => ({ ...prev, cover_url: uploadedFileUrl }));
        setBlogForm({cover_url: uploadedFileUrl});
        setValue("cover_url", uploadedFileUrl);
        console.log("uploadedFileUrl",uploadedFileUrl)
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

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

    setLoading(false);

    if (response?.data?._id) {
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
      live_link: blogForm?.live_link || "",
      start_date: blogForm?.start_date || "",
      end_date: blogForm?.end_date || ""
    }
    console.log("ProjectData",ProjectData)

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

    if (response?.data?._id) {
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
          {/* {blogForm?.cover_url && (
            <Image
              src={blogForm?.cover_url}
              width={500}
              height={500}
              alt="image"
              className="w-full h-auto rounded-md"
            />
          )} */}
        </div>
        <input type="hidden" value={blogForm.cover_url} {...register("cover_url", { required: true })} />
        <Input
          id="picture"
          type="file"
          className={`mt-2 ${errors.cover_url ? "bg-red-100 border-red-500" : ""}`}
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <p className="text-sm mt-1 text-gray-500">Uploading...</p>}
        {errors.cover_url && <span className="text-sm mt-1 text-red-500">This field is required</span>}
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
          // extensions={[StarterKit.configure({ history: false }), Image]}
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
          <div className="md:flex md:justify-between md:w-[50%]">
      <div className="mt-4">
        <Label htmlFor="email" className="capitalize">
          {variant} Start Date
        </Label>
        <div>
<Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal border-[1.7px] border-gray-300 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-2 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={(startDate) => {
            setStartDate(startDate); // Set the date
            setBlogForm({ start_date: startDate }); // Update the blog form
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </div>
      </div>

<div className="mt-4">
<Label htmlFor="email" className="capitalize">
  {variant} End Date
</Label>
<div>
<Popover>
<PopoverTrigger asChild>
<Button
  variant={"outline"}
  className={cn(
    "w-[280px] justify-start text-left font-normal border-[1.7px] border-gray-300 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-2 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
    !endDate && "text-muted-foreground"
  )}
>
  <CalendarIcon />
  {endDate ? format(endDate, "PPP") : <span>Pick a end date</span>}
</Button>
</PopoverTrigger>
<PopoverContent className="w-auto p-0">
<Calendar
  mode="single"
  selected={endDate}
  onSelect={(endDate) => {
    setEndDate(endDate); // Set the date
    setBlogForm({ end_date: endDate }); // Update the blog form
  }}
  initialFocus
/>
</PopoverContent>
</Popover>
</div>
</div>
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