import Head from "next/head";
import { Product } from "@medusajs/medusa";
import styled, { css } from "styled-components";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import medusa from "../lib/config";
import Link from "next/link";
import Date from "../components/date";

interface HomeProps {
  products: Product[];
  totalCount: Boolean;
}

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  display: block;
`;

const ProductLabel = styled.span`
  font-size: 1rem;
`;

export default function Home({ products, totalCount }: HomeProps) {
  console.log(products);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>headingMd</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        <HomeGrid>
          {products.map((product) => {
            return (
              <ProductItem>
                <ProductImage src={product.thumbnail} />
                <ProductLabel>{product.title}</ProductLabel>
              </ProductItem>
            );
          })}
        </HomeGrid>

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
    .then(({ products, count }) => ({ products, count }));
  return {
    props: {
      products: products.products,
      totalCount: products.count,
    },
  };
}
