import { useState } from 'react';

import type { Errors, FormData } from '../shared/types';

export const useFormValidation = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    date: '',
    value: '',
  });

  const validate = () => {
    const newErrors: Errors = { name: '', date: '', value: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }
    if (formData.value === null) {
      newErrors.value = 'Value is required';
    } else if (isNaN(formData.value)) {
      newErrors.value = 'Enter correct value';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  return { formData, setFormData, errors, validate, setErrors };
};
