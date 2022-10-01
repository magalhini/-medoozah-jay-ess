import Layout from "../../components/layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Date from "../../components/date";
import medusa from "../../lib/config";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ productDetails: { product } }) {
  console.log(product);
  return (
    <Layout home={false}>
      <Head>
        <title></title>
      </Head>
      <article>dummy content here</article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productDetails = await medusa.products
    .retrieve(query.id)
    .then(({ product }) => ({ product }));

  return {
    props: {
      productDetails,
    },
  };
};
