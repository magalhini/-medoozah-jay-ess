import styled from "styled-components";

type Props = {
  id?: string;
  value: number;
  min?: number;
  max?: number;
  readonly className?: string;
  onChange(value: number): number;
};

const UnstyledNumericInput = ({
  min = 0,
  max = 100000, // Potentially also given by the store configuration, if present?
  value,
  id,
  className,
  onChange,
}: Props) => {
  const onHandleChange = (event) => {
    onChange(event.currentTarget.value);
  };

  return (
    <input
      id={id}
      onChange={onHandleChange}
      className={className}
      value={value}
      type="number"
      min={min}
      max={max}
    />
  );
};

export const NumericInput = styled(UnstyledNumericInput)`
  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  width: 100%;
  padding: 1em;
`;
