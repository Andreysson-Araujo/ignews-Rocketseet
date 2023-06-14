import Head from "next/head";
import styles from "./styles.module.scss"
import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import { getPrismicClient } from "@/services/prismic";

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>14 outubro 2000</time>
                        <strong>Creating a Monorepo & Yarn Workspace</strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Pedit rem ab sunt sed quisquam, fugit optio qui nobis eaque!</p>
                    </a>
                    <a href="#">
                        <time>14 outubro 2000</time>
                        <strong>Creating a Monorepo & Yarn Workspace</strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Pedit rem ab sunt sed quisquam, fugit optio qui nobis eaque!</p>
                    </a>
                    <a href="#">
                        <time>14 outubro 2000</time>
                        <strong>Creating a Monorepo & Yarn Workspace</strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Pedit rem ab sunt sed quisquam, fugit optio qui nobis eaque!</p>
                    </a>
                </div>
            </main>
        </>
    );
}

/*export const getStaticProps: GetStaticProps = async  () => {
    const prismic = getPrismicClient()

    const response = await prismic.getByType([
        Prismic.predicate.at("document.type", "publication")
    ],{
        fetch: ["publication.title", "publication.content"],
        pageSize: 100,
    })
    return {
        props: {}
    }
}
*/