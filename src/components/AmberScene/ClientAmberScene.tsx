"use client";

import dynamic from "next/dynamic";

const AmberScene = dynamic(() => import("./AmberScene"), { ssr: false });

export default function ClientAmberScene() {
    return <AmberScene />;
}
