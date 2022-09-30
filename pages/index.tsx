import Head from "next/head";
import { Product } from "@medusajs/medusa";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import medusa from "../lib/config";
import Link from "next/link";
import Date from "../components/date";

interface HomeProps {
  products: Product[];
  totalCount: Boolean;
}

export default function Home({ products, totalCount }: HomeProps) {
  console.log(products);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}></section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        {/* <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link> */}
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const products = await medusa.products
    .list()
    .then(({ products, limit, count }) => ({ products, count }));
  return {
    props: {
      products: products.products,
      totalCount: products.count,
    },
  };
}
