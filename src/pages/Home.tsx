import { useMemo, useState } from 'react';

import { Container } from '../components/Container/Container';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';
import { HeaderCell } from '../components/HeaderCell/HeaderCell';
import { Modal } from '../components/Modal/Modal';
import { NoData } from '../components/NoData/NoData';
import { UserRow } from '../components/UserRow/UserRow';
import { useDebounce } from '../hooks/useDebounce';
import { useFormValidation } from '../hooks/useFormValidation';
import { MOCKED_DATA } from '../shared/constants';
import type { RowData } from '../shared/types';

type SortKey = keyof Omit<RowData, 'id'>;

interface SortConfig {
  key: SortKey;
  ascending: boolean;
}

const Home = () => {
  const [users, setUsers] = useState<RowData[]>(MOCKED_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<RowData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { formData, setFormData, errors, validate, setErrors } =
    useFormValidation({
      name: '',
      date: '',
      value: null,
    });

  const sortedUsers = useMemo(() => {
    if (!sortConfig) return users;

    const { key, ascending } = sortConfig;

    return [...users].sort((a, b) => {
      let comparison = 0;

      if (key === 'value') comparison = a.value - b.value;
      if (key === 'name') comparison = a.name.localeCompare(b.name);
      if (key === 'date')
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();

      return ascending ? comparison : -comparison;
    });
  }, [users, sortConfig]);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return sortedUsers;

    return sortedUsers.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [sortedUsers, debouncedSearch]);

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

  const sortBy = (key: SortKey) => {
    setSortConfig((prev) => {
      const ascending = prev?.key === key ? !prev.ascending : true;
      return { key, ascending };
    });
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
        {!!filteredUsers.length && (
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
        {!filteredUsers.length && <NoData />}
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
