import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { Button } from '../Button/Button';

interface Props {
  id: string;
  name: string;
  date: string;
  value: number;
  onRemove: (id: string) => void;
}

export const UserRow = ({ id, date, name, value, onRemove }: Props) => {
  return (
    <tr className="hover:bg-border/5 hover:transition-colors duration-100 whitespace-nowrap">
      <td className="px-3 py-2 text-size-16 color-text max-w-[150px] truncate">
        {name}
      </td>
      <td className="px-3 py-2 text-size-16 color-text max-w-[120px] truncate">
        {date}
      </td>
      <td className="px-3 py-2 text-size-16 color-text max-w-[100px] truncate">
        {value}
      </td>
      <td className="px-3 py-2">
        <div className="flex gap-2 justify-around">
          <Button
            onClick={() => console.log('edit')}
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
