import React from "react";

function SubTitle({ title = 'Welcome' }: { title: string }) {
    return (
        <h3 className="text-6xl text-green-600 dark:text-white font-semibold mb-2 " data-aos="fade-up">{title}</h3>
    )
}

export default SubTitle;