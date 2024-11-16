import Navigation from "@/components/Navigation/Navigation";
import styles from './NavigationLayout.module.css';

interface Props {
    children: React.ReactNode;
    hideSearch?: boolean;
}

export default function NavigationLayout({ children, hideSearch = false }: Props) {
    return (
        <>
            <Navigation hideSearch={hideSearch} />
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}
