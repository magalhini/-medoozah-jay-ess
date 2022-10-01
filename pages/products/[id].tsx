import Head from "next/head";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { Button } from "../../components/shared/Button";
import { Dropdown, StyledDropdown } from "../../components/shared/Dropdown";
import Layout from "../../components/layout";
import {
  ProductImage,
  ProductImageWrapper,
  Details,
  Title,
  Description,
} from "../../components/Product/Details.styled";
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

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedVariant, setSelectedVariant] = useState("");
  const { variants } = product;

  const variantOptions = variants.map((variant) => {
    return {
      label: variant.title,
      value: variant.id,
    };
  });

  console.log(variantOptions);

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
          <StyledDropdown
            onHandleChange={(event) => setSelectedVariant(event.target.value)}
            value={selectedVariant || variantOptions[0].value}
            options={variantOptions}
          />
          <p>drop down</p>
          <p>quantity</p>

          <Button
            fullWidth
            onClick={(event) => {
              console.log(event);
            }}
            primary
          >
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
