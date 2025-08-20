import { IoMdAdd } from 'react-icons/io';

interface Props {
  onClick: () => void;
}

export const ControlPanel = ({ onClick }: Props) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between mt-3 mb-5 w-full">
      <input
        type="search"
        placeholder="Search.."
        className="border-b-2 border-text focus:border-button outline-0 flex items-center gap-2 text-white px-4 py-2 min-w-[250px]"
      />
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 text-button cursor-pointer border-2 border-button rounded-2xl px-4 py-2 min-w-[100px] justify-center hover:scale-105 will-change-transform transition-transform duration-200"
      >
        <IoMdAdd size={20} />
        Add user
      </button>
    </div>
  );
};
