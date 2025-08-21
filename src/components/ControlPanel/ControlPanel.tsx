import { IoMdAdd } from 'react-icons/io';

import { Button } from '../Button/Button';
import { InputField } from '../InputField/InputField';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClick: () => void;
}

export const ControlPanel = ({
  onClick,
  searchQuery,
  setSearchQuery,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between mt-3 mb-8 sm:my-3 w-full">
      <InputField
        type="search"
        placeholder="Search.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        icon={<IoMdAdd size={20} />}
        title="Add user"
        onClick={onClick}
        className="max-h-11"
      />
    </div>
  );
};
