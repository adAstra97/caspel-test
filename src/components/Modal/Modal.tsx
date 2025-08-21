import { FiPlus } from 'react-icons/fi';

import type { Errors, FormData } from '../../shared/types';
import { Button } from '../Button/Button';
import { InputField } from '../InputField/InputField';

interface Props {
  errors: Errors;
  formData: FormData;
  onClose: () => void;
  onSubmit: () => void;
  setFormData: (data: FormData) => void;
}

export const Modal = ({
  errors,
  formData,
  onClose,
  onSubmit,
  setFormData,
}: Props) => {
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
        <div className="space-y-4 mb-8">
          <InputField
            type="text"
            placeholder="Enter name"
            error={errors.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <InputField
            type="date"
            placeholder="Enter date"
            error={errors.date}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <InputField
            type="number"
            placeholder="Enter value"
            error={errors.value}
            value={formData.value ?? ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                value: e.target.value === '' ? null : Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            title="Cancel"
            onClick={onClose}
            className="border-secondary-text text-secondary-text"
          />
          <Button icon={<FiPlus size={20} />} title="Add" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};
