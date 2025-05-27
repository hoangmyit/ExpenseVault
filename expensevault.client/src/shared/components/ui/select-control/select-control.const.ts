export interface SelectControlProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: React.ReactNode;
  options: SelectControlOptions[];
}

export type SelectControlOptions = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type SelectControlComponentProps = SelectControlProps & {
  ref?: React.ForwardedRef<HTMLSelectElement>;
};
