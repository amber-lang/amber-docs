"use client";

import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("./Markdown"), { ssr: false });

interface Props {
    content: string;
}

export default function ClientMarkdown({ content }: Props) {
    return <Markdown content={content} />;
}
