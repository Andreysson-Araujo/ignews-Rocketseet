import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./home.module.scss";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "@/services/stripe";



interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News aboute the <span>React</span> world
          </h1>

          <p>
            Get acesss to all the publications <br />
            <span>for {product.amount} mounth </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/img/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetStaticProps<HomeProps> = async () => {
  const price = await stripe.prices.retrieve("price_1NDr8MEMshT8GRwqlVm4EW8y");

  const product = {
    priceId: price.id,
    amount:price.unit_amount ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price.unit_amount / 100) : "",
  };

  return {
    props: {
      product,
      revalidate: 60 * 60 * 24 //24HORAS
    },
  };
};
