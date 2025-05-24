import { useSidebar } from '@/context/hooks/use-sidebar';

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="bg-opacity-50/50 fixed inset-0 z-40 bg-gray-900 lg:hidden"
      onClick={toggleMobileSidebar}
      role="button"
      tabIndex={0}
      aria-label="Close sidebar"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMobileSidebar();
        }
      }}
    />
  );
};

export default Backdrop;
