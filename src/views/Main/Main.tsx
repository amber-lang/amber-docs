import style from "./Main.module.css";
import { getTableOfContents } from "@/utils/docsServer";
import SideBar from "@/components/SideBar/SideBar";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar/SearchBar";
import Sheet from "@/components/Sheet/Sheet";
import SettingsGrid from "@/components/SettingsGrid/SettingsGrid";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import NavigationLayout from "@/layouts/NavigationLayout/NavigationLayout";
import MainBigLink from "@/layouts/MainBigLink/MainBigLink";
import { Location } from "@/utils/urls";
const AmberScene = dynamic(() => import("@/components/AmberScene/AmberScene"), { ssr: false });

interface Props {
    location?: Location;
}

export default async function Main({ location }: Props) {
    const toc = await getTableOfContents(location?.version);
    const whatsNew = toc[0].docs.find(item => item.path === 'getting_started/whats_new')

    return (
        <NavigationLayout hideSearch>
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
                        <MainBigLink title={toc[0].title} path={toc[0].path} />
                    )}
                    {Boolean(whatsNew) && (
                        <MainBigLink title={whatsNew!.title} path={whatsNew!.path} isFull />
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
