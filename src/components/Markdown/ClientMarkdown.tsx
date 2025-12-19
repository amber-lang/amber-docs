"use client";

import Markdown from "./Markdown";
import { usePathname } from "next/navigation";

interface Props {
    content: string;
    /** Initial path for SSR, will use client path after hydration */
    initialPath?: string;
}

export default function ClientMarkdown({ content, initialPath }: Props) {
    // Use client-side path after hydration, fall back to initialPath for SSR
    const pathname = usePathname();
    const currentPath = pathname || initialPath || '/';
    
    return <Markdown content={content} currentPath={currentPath} />;
}

