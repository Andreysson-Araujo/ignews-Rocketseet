import { SignInButton } from "../SingInButton"
import styles from "./styles.module.scss"
import Link from "next/link"
import { ActiveLink } from "../activeLink"

export function Header() {
 
    
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/img/logo.svg" alt="ig.news" />
                <nav>
                <ActiveLink activeClassName={styles.active} href="/" legacyBehavior>
                    <a>Home</a>
                </ActiveLink>                        
                <ActiveLink activeClassName={styles.active} href="/posts" legacyBehavior>
                    <a>Posts</a>
                </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}