import styled, { css } from "styled-components";

type ButtonIcons = "plus" | "cross";

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  fullWidth?: boolean;
  icon?: ButtonIcons;
  disabled?: boolean;
  onClick(): void;
};

export const Button = styled.button<ButtonProps>`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  transition: background-color 0.1s ease-in-out;

  :disabled {
    opacity: 0.4;
  }

  ${(props: ButtonProps) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.medium};
  }
`;
