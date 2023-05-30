import Head from "next/head";

import styles from "./home.module.scss"
import { SubscribeButton } from "../components/SubscribeButton";


export default function Home() {
    return (
        <>
            <Head>
                <title>Home | ig.news</title>
            </Head>
            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👏 Hey, welcome</span>
                    <h1>News aboute the <span>React</span> world</h1>

                    <p>
                        Get acesss to all the publications <br />
                        <span>for $9.90 </span>
                    </p>
                    <SubscribeButton />
                </section>

                <img src="/img/avatar.svg" alt="Girl coding" />
            </main>
        </>
    )
}
