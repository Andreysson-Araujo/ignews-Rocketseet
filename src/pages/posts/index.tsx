import Head from "next/head";
import styles from "./styles.module.scss"
import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import { getPrismicClient } from "@/services/prismic";
import { RichText } from "prismic-dom"


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostProps {
    posts: Post[]
};

export default function Posts({ posts }: PostProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <a href="#" key={post.slug}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}

//Chamada para api
export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.getByType("publication", {
        fetch: ["publication.title", "publication.content"],
        pageSize: 100,
    });

    const posts = response.results.map((post) => {
        const excerpt = post.data.content
            .map((content) => {
                if (content.type === "paragraph" && content.text) {
                    return content.text;
                }
                return ""; // Retorna uma string vazia se o tipo não for "paragraph" ou não houver texto disponível
            })
            .join(""); // Junta todos os trechos de texto em uma única string

        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: excerpt,
            updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
        };
    });

    return {
        props: {
            posts,
        },
    };
};
