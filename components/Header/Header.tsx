import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};

  @media screen and (min-width: 475px) {
    font-size: ${({ theme }) => theme.fontSizes.s};
    line-height: 1.5;
  }
`;
