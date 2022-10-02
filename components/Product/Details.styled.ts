import styled from "styled-components";

export const ProductImageWrapper = styled.div``;
export const ProductImage = styled.img``;
export const Details = styled.div``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.l};
  margin-bottom: ${({ theme }) => theme.spacing.s};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.s};
  padding-top: ${({ theme }) => theme.spacing.m};
  padding-bottom: ${({ theme }) => theme.spacing.m};
`;

export const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

export const OptionLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.medium};
`;
