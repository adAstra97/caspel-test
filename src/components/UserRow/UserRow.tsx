import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { Button } from '../Button/Button';

interface Props {
  name: string;
  date: string;
  value: number;
}

export const UserRow = ({ date, name, value }: Props) => {
  return (
    <tr className="hover:bg-border/5 hover:transition-colors duration-100 whitespace-nowrap">
      <td className="px-3 py-2 text-size-16 color-text">{name}</td>
      <td className="px-3 py-2 text-size-16 color-text">{date}</td>
      <td className="px-3 py-2 text-size-16 color-text">{value}</td>
      <td className="px-3 py-2">
        <div className="flex gap-2 justify-around">
          <Button
            onClick={() => console.log('edit')}
            icon={<FiEdit size={20} />}
            className="text-button min-w-0 px-2 border-0 hover:scale-110"
          />

          <Button
            onClick={() => console.log('delete')}
            icon={<FiTrash2 size={20} />}
            className="text-remove min-w-0 px-2 border-0 hover:scale-110"
          />
        </div>
      </td>
    </tr>
  );
};
