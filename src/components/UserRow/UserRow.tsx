import { FiEdit, FiTrash2 } from 'react-icons/fi';

import type { RowData } from '../../shared/types';
import { Button } from '../Button/Button';

interface Props {
  id: string;
  name: string;
  date: string;
  value: number;
  onRemove: (id: string) => void;
  onEdit: (userData: RowData) => void;
}

export const UserRow = ({ id, date, name, value, onRemove, onEdit }: Props) => {
  return (
    <tr className="hover:bg-border/5 hover:transition-colors duration-100 whitespace-nowrap">
      {[name, date, value].map((item) => (
        <td
          key={item}
          className="px-3 py-2 text-size-16 color-text max-w-[150px] truncate"
        >
          {item}
        </td>
      ))}
      <td className="px-3 py-2">
        <div className="flex gap-2 justify-around">
          <Button
            onClick={() => onEdit({ id, name, date, value })}
            icon={<FiEdit size={20} />}
            className="text-button min-w-0 px-2 border-0 hover:scale-110"
          />
          <Button
            onClick={() => onRemove(id)}
            icon={<FiTrash2 size={20} />}
            className="text-remove min-w-0 px-2 border-0 hover:scale-110"
          />
        </div>
      </td>
    </tr>
  );
};
