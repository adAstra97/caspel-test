import { FiPlus } from 'react-icons/fi';

import { Button } from '../Button/Button';
import { InputField } from '../InputField/InputField';

interface Props {
  onClose: () => void;
}

export const Modal = ({ onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-background/90 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-2xl max-w-[500px] w-full transform transition-all duration-300 scale-100 py-6 px-4 xs:px-10 border-2 border-border"
      >
        <h2 className="text-size-24 text-center">Modal Window</h2>
        <div className="space-y-4">
          <InputField type="text" placeholder="Enter name" error="Error Name" />
          <InputField type="date" placeholder="Enter date" error="Error Date" />
          <InputField
            type="number"
            placeholder="Enter value"
            error="Error Value"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            title="Cancel"
            onClick={onClose}
            className="border-secondary-text text-secondary-text"
          />
          <Button
            icon={<FiPlus size={20} />}
            title="Add"
            onClick={() => console.log('Add')}
          />
        </div>
      </div>
    </div>
  );
};
