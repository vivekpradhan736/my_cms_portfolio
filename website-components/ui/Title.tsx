import React from "react";

function Title({ title = 'Welcome' }: { title: string }) {
    return (
        <h2 className="text-md text-primaryColor border border-primaryColor inline-block p-2 rounded-[100%] mb-4" data-aos="fade-up">{title}</h2>
    )
}

export default Title;