import Head from "next/head";
import { GetServerSideProps } from "next";
import { Product } from "@medusajs/medusa";
import styled from "styled-components";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import medusa from "../lib/config";

import { extractStoreNameFromProduct } from "../lib/utils";

import {
  CardProductLabel,
  ProductItem,
  ProductImage,
  CardProductPrice,
  ProductLabelWrapper,
} from "../components/Home/Products";

interface HomeProps {
  products: Product[];
  totalCount: boolean;
}

const HomeGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
`;

const HomeLink = styled.a`
  text-decoration: none;
`;

export default function Home({ products, totalCount }: HomeProps) {
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
              <a key={product.id} href={`/products/${product.id}`}>
                <ProductItem>
                  <ProductImage src={product.thumbnail} />
                  <ProductLabelWrapper>
                    <CardProductLabel>
                      {extractStoreNameFromProduct(product.title)}
                    </CardProductLabel>
                    <CardProductPrice>$25</CardProductPrice>
                  </ProductLabelWrapper>
                </ProductItem>
              </a>
            );
          })}
        </HomeGrid>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await medusa.products
    .list()
    .then(({ products, count }) => ({ products, count }));
  return {
    props: {
      products: products.products,
      totalCount: products.count,
    },
  };
};
