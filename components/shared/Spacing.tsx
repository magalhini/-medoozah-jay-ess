import styled, { DefaultTheme } from "styled-components";

type ISpacing = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxl";

interface Props {
  bottom?: ISpacing;
  top?: ISpacing;
  right?: ISpacing;
  left?: ISpacing;
  children: React.ReactNode;
  theme: DefaultTheme;
}

export const Spacing = styled.div<Props>`
  margin-bottom: ${(props) =>
    props.bottom ? props.theme.spacing[props.bottom] : 0};
  margin-top: ${(props) => (props.top ? props.theme.spacing[props.top] : 0)};
  margin-left: ${(props) => (props.left ? props.theme.spacing[props.left] : 0)};
  margin-right: ${(props) =>
    props.right ? props.theme.spacing[props.right] : 0};
`;
