import { useState } from 'react';

import { Container } from '../components/Container/Container';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';
import { HeaderCell } from '../components/HeaderCell/HeaderCell';
import { Modal } from '../components/Modal/Modal';
import { NoData } from '../components/NoData/NoData';
import { UserRow } from '../components/UserRow/UserRow';
import { useFormValidation } from '../hooks/useFormValidation';
import { useUsers } from '../hooks/useUsers';
import type { RowData, SortKey } from '../shared/types';

const Home = () => {
  const {
    users,
    searchQuery,
    setSearchQuery,
    addUser,
    updateUser,
    removeUser,
    sortBy,
    sortConfig,
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<RowData | null>(null);

  const { formData, setFormData, errors, validate, setErrors } =
    useFormValidation({
      name: '',
      date: '',
      value: null,
    });

  const handleSubmit = () => {
    if (!validate()) return;

    const rowData = {
      name: formData.name,
      date: formData.date,
      value: formData.value ?? 0,
    };

    if (editingUser) {
      updateUser(editingUser.id, rowData);
    } else {
      addUser(rowData);
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

  const handleEdit = (user: RowData) => {
    setEditingUser(user);
    setFormData({ name: user.name, date: user.date, value: user.value });
    setErrors({ name: '', date: '', value: '' });
    setIsModalOpen(true);
  };

  return (
    <Container>
      <h1 className="text-size-32 mb-3 text-center font-light">Manage Data</h1>
      <div className="py-3 px-4 border-2 rounded-2xl border-border shadow-sm shadow-border">
        <ControlPanel
          onClick={handleAdd}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {!!users.length && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <caption className="mb-3 text-size-20 text-left">
                Users 2025
              </caption>
              <thead className="select-none border-b-2 border-border/5 bg-border/10">
                <tr>
                  {['name', 'date', 'value'].map((item) => (
                    <HeaderCell
                      key={item}
                      title={item[0].toUpperCase() + item.slice(1)}
                      onClick={() => sortBy(item as SortKey)}
                      isSorted={sortConfig?.key === item}
                      ascending={sortConfig?.ascending ?? true}
                    />
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    {...user}
                    onEdit={handleEdit}
                    onRemove={removeUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!users.length && <NoData />}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          errors={errors}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          isEditing={!!editingUser}
        />
      )}
    </Container>
  );
};

export default Home;
