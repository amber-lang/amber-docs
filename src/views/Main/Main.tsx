import style from "./Main.module.css";
import { getTableOfContents, TocSection } from "@/utils/docsServer";
import SideBar from "@/components/SideBar/SideBar";
import Link from "next/link";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar/SearchBar";
import Sheet from "@/components/Sheet/Sheet";
import SettingsGrid from "@/components/SettingsGrid/SettingsGrid";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import NavigationLayout from "@/layouts/NavigationLayout/NavigationLayout";
const AmberScene = dynamic(() => import("@/components/AmberScene/AmberScene"), { ssr: false });

interface Props {
    version: string;
}

export default async function Main({ version }: Props) {
    const toc = await getTableOfContents();

    return (
        <NavigationLayout version={version}>
            <div className="left">
                <SideBar toc={toc} headers={[]} isFixed />
            </div>
            <div className="right">
                <div className={style.container}>
                    <div className={style.jumbotron}>
                        <ErrorBoundary fallback={<div className={[style["jumbotron-bg"], style.fallback].join(' ')} />}>
                            <div className={style["jumbotron-bg"]} />
                            <Suspense>
                                <AmberScene />
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                    <div className={style.title}>
                        <span className={style.bold}>Amber</span>
                        <span className={style.light}>Docs</span>
                    </div>
                    <div className={style.search}>
                        <SearchBar variant="title" />
                    </div>
                    {Boolean(toc.length) && (
                        <Link href={toc[0].path} className={style["big-link"]}>
                            {toc[0].title}
                        </Link>
                    )}
                </div>
            </div>
            <Sheet>
                <SideBar toc={toc} headers={[]} />
                <SettingsGrid />
            </Sheet>
        </NavigationLayout>
    );
}
