import { FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
