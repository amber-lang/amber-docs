import Navigation from "@/components/Navigation/Navigation";
import styles from './NavigationLayout.module.css';

interface Props {
    children: React.ReactNode;
    version: string;
}

export default function NavigationLayout({ children, version }: Props) {
    return (
        <>
            <Navigation version={version} />
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}
