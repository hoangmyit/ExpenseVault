export interface ISelectOption<T> {
  label: string;
  value: keyof T;
  disabled?: boolean;
}
