'use client';

import BlogForm from "@/components/BlogForm";
import { useEffect, useReducer } from "react";

interface ParamProps {
    slug: string;
}

interface ProjectDetailPageProps {
    params: ParamProps
}

export default function ProjectDetailPage({ params }:ProjectDetailPageProps) {
    const [response, setResponse] = useReducer((prev: any, next: any) => {
        return { ...prev, ...next }
    }, {
        loading: true,
        data: {}
    })

    const fetchBlog = async () => {
        const response = await fetch(`/api/projects?id=${params.slug}`).then(res => res.json());
        
        setResponse({ data: response, loading: false })
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    if(response.loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <BlogForm id={params.slug} variant="project" value={response?.data}/>
    )
}