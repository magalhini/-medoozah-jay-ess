import styled from "styled-components";

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: ${({ theme }) => theme.borders.faint};
  border-radius: 4px;
`;

export const ProductImage = styled.img`
  max-width: 100%;
  display: block;
`;

export const ProductLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s};
  width: 100%;
`;

export const CardProductPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.s};
  color: ${({ theme }) => theme.colors.text};
`;

export const CardProductLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 1px;
`;
