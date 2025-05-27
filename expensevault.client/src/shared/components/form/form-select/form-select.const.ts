import { SelectControlOptions } from '../../ui/select-control';

export type FormSelectProps = {
  options: SelectControlOptions[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
};
