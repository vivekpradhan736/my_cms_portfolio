import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    let response;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const term = searchParams.get("term") || "";
    const page = parseInt(searchParams.get("page") || '0');
    const limit = parseInt(searchParams.get("limit") || '10');
    // Start index from 0 
    const programLimit = limit - 1;
    const from = page * limit;
    const to = from + programLimit;
    
    if(id) {
        response = await supabase.from("blogs").select().eq('id', id).single();
    } else {
        response = await supabase.from("blogs").select().ilike('title', `%${term}%`).range(from, to);
    }
    return NextResponse.json(response)
}

export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await request.json();
    
    const response = await supabase.from("blogs").insert(data).select().single();

    return NextResponse.json(response)   
}

export async function PATCH(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    const response = await supabase.from("blogs").update(data).eq('id', id).select().single();

    return NextResponse.json(response)
}

// export async function DELETE(request: Request) {
//     const cookieStore = cookies();
//     const supabase = createClient(cookieStore);
//     const data = await request.json();
    
//     const response = await supabase.from("blogs").delete().eq('id', data.id);

//     return NextResponse.json(response) 
// }

export async function DELETE(request: Request) {
    try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const data = await request.json();

        const { error } = await supabase.from("blogs").delete().eq('id', data.id);

        if (error) {
            return NextResponse.json({ status: 'error', message: error.message }, { status: 400 });
        }

        return new NextResponse(null, { status: 204 }); // Return 204 No Content without a body
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}