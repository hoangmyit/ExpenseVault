import { FC, ReactNode, useEffect, useRef } from 'react';

import clsx from 'clsx';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Dropdown: FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'shadow-theme-lg dark:bg-gray-dark absolute right-0 z-40 mt-2 rounded-xl border border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Dropdown;
