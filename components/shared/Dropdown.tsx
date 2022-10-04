import styled from "styled-components";

type Props = {
  value: string;
  onHandleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  options: any[];
  readonly className: string;
};

const UnstyledDropdown = ({
  className,
  value,
  onHandleChange,
  options,
}: Props) => {
  return (
    <select className={className} value={value} onChange={onHandleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const Dropdown = styled(UnstyledDropdown)<Props>`
  width: 100%;
  padding: 1rem;
`;
