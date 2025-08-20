import { FiEdit, FiTrash2 } from 'react-icons/fi';

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
          <button
            className="cursor-pointer text-button hover:scale-110 hover:transition-transform duration-200"
            onClick={() => console.log('edit')}
          >
            <FiEdit size={20} />
          </button>
          <button
            className="cursor-pointer text-remove hover:scale-110 hover:transition-transform duration-200"
            onClick={() => console.log('delete')}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
