import { useMemo, useState } from 'react';

import { Container } from '../components/Container/Container';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';
import { HeaderCell } from '../components/HeaderCell/HeaderCell';
import { Modal } from '../components/Modal/Modal';
import { UserRow } from '../components/UserRow/UserRow';
import { useDebounce } from '../hooks/useDebounce';
import { useFormValidation } from '../hooks/useFormValidation';
import { MOCKED_DATA } from '../shared/constants';
import type { RowData } from '../shared/types';

const Home = () => {
  const [users, setUsers] = useState<RowData[]>(MOCKED_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<RowData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { formData, setFormData, errors, validate, setErrors } =
    useFormValidation({
      name: '',
      date: '',
      value: null,
    });

  const handleSubmit = () => {
    if (!validate()) return;

    const rowData: Omit<RowData, 'id'> = {
      name: formData.name,
      date: formData.date,
      value: formData.value ?? 0,
    };

    if (editingUser) {
      setUsers((prev) =>
        prev.map((item) =>
          item.id === editingUser.id ? { ...item, ...rowData } : item
        )
      );
    } else {
      setUsers((prev) => [{ ...rowData, id: Date.now().toString() }, ...prev]);
    }

    setFormData({ name: '', date: '', value: null });
    setErrors({ name: '', date: '', value: '' });
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: '', date: '', value: null });
    setErrors({ name: '', date: '', value: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (userData: RowData) => {
    setEditingUser(userData);
    setFormData({
      name: userData.name,
      date: userData.date,
      value: userData.value,
    });
    setErrors({ name: '', date: '', value: '' });
    setIsModalOpen(true);
  };

  const handleRemove = (id: string) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;

    return users.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [users, debouncedSearch]);

  return (
    <Container>
      <h1 className="text-size-32 mb-3 text-center font-light">Manage Data</h1>
      <div className="py-3 px-4 border-2 rounded-2xl border-border shadow-sm shadow-border">
        <ControlPanel
          onClick={handleAdd}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {!!filteredUsers.length && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <caption className="mb-3 text-size-20 text-left">
                Users 2025
              </caption>
              <thead className="select-none border-b-2 border-border/5 bg-border/10">
                <tr>
                  <HeaderCell
                    title="Name"
                    onClick={() => console.log('sort by name')}
                  />
                  <HeaderCell
                    title="Date"
                    onClick={() => console.log('sort by date')}
                  />
                  <HeaderCell
                    title="Value"
                    onClick={() => console.log('sort by value')}
                  />
                  <th className="px-3 py-2 text-size-18">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((item) => (
                  <UserRow
                    key={item.id}
                    {...item}
                    onRemove={handleRemove}
                    onEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!filteredUsers.length && (
          <div className="text-size-24 text-center min-h-[138px] flex items-center justify-center">
            No data found 😢
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          errors={errors}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </Container>
  );
};

export default Home;
