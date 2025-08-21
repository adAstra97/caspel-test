import { IoMdAdd } from 'react-icons/io';

import { Button } from '../Button/Button';
import { InputField } from '../InputField/InputField';

interface Props {
  onClick: () => void;
}

export const ControlPanel = ({ onClick }: Props) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between mt-3 mb-8 sm:my-3 w-full">
      <InputField type="search" placeholder="Search.." />
      <Button
        icon={<IoMdAdd size={20} />}
        title="Add user"
        onClick={onClick}
        className="max-h-11"
      />
    </div>
  );
};
