import { HiMiniArrowLongUp } from 'react-icons/hi2';

import { cn } from '../../utils/tailwindClsx';

interface Props {
  title: string;
  isSorted?: boolean;
  ascending?: boolean;
  onClick: () => void;
}

export const HeaderCell = ({ onClick, title, isSorted, ascending }: Props) => {
  return (
    <th
      className="px-3 py-2 text-left cursor-pointer opacity-85 hover:opacity-100 hover:transition-opacity duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between text-size-18">
        {title}
        <HiMiniArrowLongUp
          className={cn(
            'ml-2 transition-transform duration-300',
            isSorted ? (ascending ? 'rotate-0' : 'rotate-180') : 'opacity-30'
          )}
        />
      </div>
    </th>
  );
};
