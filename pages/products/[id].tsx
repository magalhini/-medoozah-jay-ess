import { useCallback, useMemo } from "react";
import styled from "styled-components";
import Head from "next/head";
import { Product } from "@medusajs/medusa";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { Button } from "../../components/shared/Button";
import { Dropdown } from "../../components/shared/Dropdown";
import { NumericInput } from "../../components/shared/NumericInput";
import Layout from "../../components/layout";
import {
  ProductImage,
  ProductImageWrapper,
  Details,
  Title,
  Description,
  Price,
  OptionLabel,
} from "../../components/Product/Details.styled";
import medusa from "../../lib/config";
import { formatCurrency } from "../../lib/utils";

type ProductPageProps = {
  product: Product;
};

const ProductPageGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3em;
`;

export default function ProductPage({ product }: ProductPageProps) {
  const { variants, options } = product;
  const [selectedVariant, setSelectedVariant] = useState(variants[0].id);
  const [amount, setAmount] = useState(0);

  // const variantTypes = options.map((variant) => ({
  //   label: variant.title,
  //   values: variant.values,
  // }));

  const variantOptions = useMemo(() => {
    return variants.map((variant) => ({
      label: variant.title,
      value: variant.id,
    }));
  }, [variants]);

  console.log(product, "- product");
  console.log(variantOptions);

  const productDetails = useMemo(() => {
    return variants.find(({ id }) => id === selectedVariant);
  }, [selectedVariant]);

  console.log(productDetails);

  return (
    <Layout home={false}>
      <Head>
        <title>{product.title}</title>
      </Head>
      <ProductPageGrid>
        <ProductImageWrapper>
          <ProductImage alt={product.title} src={product.images[0].url} />
        </ProductImageWrapper>
        <Details>
          <Title>{product.title}</Title>
          <Price>{formatCurrency(productDetails.prices[0].amount)}</Price>
          <Description>{product.description}</Description>
          <OptionLabel>Options:</OptionLabel>
          <Dropdown
            onHandleChange={(event) => setSelectedVariant(event.target.value)}
            value={selectedVariant || variantOptions[0].value}
            options={variantOptions}
          />
          <NumericInput onChange={setAmount} value={amount} />
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
