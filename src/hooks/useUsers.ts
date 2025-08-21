import { useMemo, useState } from 'react';

import { MOCKED_DATA } from '../shared/constants';
import type { RowData, SortConfig, SortKey } from '../shared/types';
import { useDebounce } from './useDebounce';

export const useUsers = (initialData: RowData[] = MOCKED_DATA) => {
  const [users, setUsers] = useState<RowData[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);

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

  const addUser = (rowData: Omit<RowData, 'id'>) => {
    setUsers((prev) => [{ ...rowData, id: Date.now().toString() }, ...prev]);
  };

  const updateUser = (id: string, rowData: Omit<RowData, 'id'>) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...rowData } : item))
    );
  };

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
  };

  const sortBy = (key: SortKey) => {
    setSortConfig((prev) => {
      const ascending = prev?.key === key ? !prev.ascending : true;
      return { key, ascending };
    });
  };

  return {
    users: filteredUsers,
    searchQuery,
    setSearchQuery,
    addUser,
    updateUser,
    removeUser,
    sortBy,
    sortConfig,
  };
};
