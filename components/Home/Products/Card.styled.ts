import styled from "styled-components";

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: ${({ theme }) => theme.borders.faint};
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const ProductImage = styled.img`
  max-width: 100%;
  display: block;
  border-radius: 4px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ProductImageWrapper = styled.div`
  overflow: hidden;
`;

export const ProductLabelWrapper = styled.div`
  align-items: baseline;
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

export const ProductCardLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;
