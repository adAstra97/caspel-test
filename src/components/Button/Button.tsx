import React from 'react';

import { cn } from '../../utils/tailwindClsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: React.ReactNode;
}

export const Button = ({ onClick, icon, title, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 text-button cursor-pointer border-2 border-button rounded-2xl px-4 py-2 min-w-[100px] justify-center hover:scale-105 will-change-transform transition-transform duration-200',
        className
      )}
    >
      {icon}
      {title}
    </button>
  );
};
