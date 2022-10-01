import styled from "styled-components";

type Props = {
  value: string;
  onHandleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  options: any[];
};

export const Dropdown = ({ value, onHandleChange, options }: Props) => {
  return (
    <select value={value} onChange={onHandleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const StyledDropdown = styled(Dropdown)`
  width: 100%;
`;
