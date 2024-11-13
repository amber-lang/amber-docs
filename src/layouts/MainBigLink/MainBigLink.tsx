"use client"

import useVersion from "@/contexts/VersionContext/useVersion";
import { FlatDoc } from "@/utils/docs";
import { generateUrl } from "@/utils/urls";
import Link from "next/link";
import styles from "./MainBigLink.module.css";

interface Props {
    toc: FlatDoc[];
}

export default function MainBigLink({ toc }: Props) {
    const { version } = useVersion();
    return (
        <Link href={generateUrl(version, toc[0].path)} className={styles["big-link"]}>
            {toc[0].title}
        </Link>
    )
}
