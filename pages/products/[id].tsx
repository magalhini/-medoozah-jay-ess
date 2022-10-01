import Head from "next/head";
import { GetServerSideProps } from "next";
import { Button } from "../../components/shared/Button";
import Layout from "../../components/layout";
import { Product } from "@medusajs/medusa";
import styled from "styled-components";
import medusa from "../../lib/config";

type ProductPageProps = {
  product: Product;
};

const ProductPageGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3em;
`;

const ProductImageWrapper = styled.div``;
const ProductImage = styled.img``;
const Details = styled.div``;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.l};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.s};
  padding-top: ${({ theme }) => theme.spacing.m};
  padding-bottom: ${({ theme }) => theme.spacing.m};
`;

export default function ProductPage({ product }: ProductPageProps) {
  console.log(product);
  return (
    <Layout home={false}>
      <Head>
        <title>{product.title}</title>
      </Head>
      <ProductPageGrid>
        <ProductImageWrapper>
          <ProductImage src={product.images[0].url} />
        </ProductImageWrapper>
        <Details>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <p>drop down</p>
          <p>drop down</p>
          <p>quantity</p>

          <Button fullWidth onHandleClick={() => {}} primary>
            Add to cart
          </Button>
        </Details>
      </ProductPageGrid>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productDetails = await medusa.products
    .retrieve(query.id)
    .then(({ product }) => ({ product }));

  return {
    props: {
      product: productDetails.product as ProductPageProps,
    },
  };
};
