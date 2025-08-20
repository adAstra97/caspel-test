import { cn } from '../../utils/tailwindClsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: Props) => {
  return (
    <div
      className={cn(
        'px-4 py-3 sm:px-6 xl:px-10 max-w-[1100px] mx-auto min-w-[320px] w-screen xl:w-[70vw]',
        className
      )}
    >
      {children}
    </div>
  );
};
