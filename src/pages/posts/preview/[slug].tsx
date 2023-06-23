import { GetServerSideProps, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import Head from "next/head";
import styles from "../post.module.scss";
import { getPrismicClient } from "../../../services/prismic";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as NextApiRequest;
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient({ req });

  const { slug } = context.params || {};

  const response = await prismic.getByUID("publication", String(slug), {});

  if (!response) {
    return {
      notFound: true,
    };
  }

  const post = {
    slug: String(slug),
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return {
    props: {
      post,
    },
  };
};
