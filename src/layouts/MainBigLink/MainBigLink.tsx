"use client"

import useVersion from "@/contexts/VersionContext/useVersion";
import { FlatDoc } from "@/utils/docs";
import { generateUrl } from "@/utils/urls";
import Link from "next/link";
import styles from "./MainBigLink.module.css";

interface Props {
    title: string;
    path: string;
    isFull?: boolean;
}

export default function MainBigLink({ title, path, isFull }: Props) {
    const { version } = useVersion();
    return (
        <Link href={generateUrl(version, path)} className={styles[isFull ? "big-link-full" : "big-link"]}>
            {title}
        </Link>
    )
}
