import Head from "next/head";
import { useCallback } from "react";
import { GetServerSideProps } from "next";
import { Product, ProductVariant } from "@medusajs/medusa";
import styled from "styled-components";
import Layout, { siteTitle } from "../components/layout";
import medusa from "../lib/config";

import { extractStoreNameFromProduct, formatCurrency } from "../lib/utils";

import {
  CardProductLabel,
  CardProductPrice,
  ProductItem,
  ProductImage,
  ProductImageWrapper,
  ProductLabelWrapper,
  ProductCardLink,
} from "../components/Home/Products";

import { Spacing } from "../components/shared";
interface HomeProps {
  products: Product[];
  collections: any; // no Collections type?
}

const HomeGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1em;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function Home({ products, collections }: HomeProps) {
  // Find lowest price in all variants to display "From: $"
  const findLowestPrice = useCallback((product) => {
    const prices = product.variants.map(
      (item: ProductVariant) => item.prices[0].amount
    );
    return Math.min(...prices);
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <h2>Our Products</h2>
      <HomeGrid>
        {products.map((product) => {
          return (
            <ProductCardLink key={product.id} href={`/products/${product.id}`}>
              <ProductItem>
                <ProductImageWrapper>
                  <ProductImage alt={product.title} src={product.thumbnail} />
                </ProductImageWrapper>
                <ProductLabelWrapper>
                  <CardProductLabel>
                    {extractStoreNameFromProduct(product.title)}
                  </CardProductLabel>
                  <CardProductPrice>
                    {formatCurrency(findLowestPrice(product))}
                  </CardProductPrice>
                </ProductLabelWrapper>
              </ProductItem>
            </ProductCardLink>
          );
        })}
      </HomeGrid>

      <Spacing top="xxl">
        <h2>Collections</h2>
        {collections.collections.length === 0 ? (
          <p>We don't have any collections right now</p>
        ) : null}
      </Spacing>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await medusa.products
    .list()
    .then(({ products, count }) => ({ products, count }));

  const collections = await medusa.collections
    .list()
    .then(({ collections }) => ({
      collections,
    }));

  return {
    props: {
      products: products.products,
      collections,
    },
  };
};
