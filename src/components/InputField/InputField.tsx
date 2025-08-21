import { useRef } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { cn } from '../../utils/tailwindClsx';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const InputField = ({
  className,
  placeholder,
  type,
  error,
  ...rest
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        {...rest}
        className={cn(
          'border-b-2 border-text focus:border-button outline-0 flex items-center gap-2 text-white px-4 py-2 min-w-[250px]',
          className
        )}
      />
      {type === 'date' && (
        <FaRegCalendarAlt
          className="absolute right-3 top-5 -translate-y-1/2 text-white cursor-pointer"
          onClick={() => inputRef.current?.showPicker()}
        />
      )}
      {error && <p className="text-size-14 text-remove">{error}</p>}
    </div>
  );
};
