import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from './usersSlice';
import { Input, Button, Pagination, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Loader from '../../components/Loader';
import UserList from './UserList';
import UserCard from './UserCard';
import UserModal from './UserModal';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector(s => s.users);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('list');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [isModalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => { dispatch(fetchUsers(1)); }, [dispatch]);

  const filtered = useMemo(() => {
    if (!list) return [];
    return list.filter(u =>
      (`${u.first_name} ${u.last_name}`).toLowerCase().includes(query.toLowerCase())
    );
  }, [list, query]);

  const total = filtered.length;
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (status === 'loading') return <Loader />;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 space-y-2 md:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Input.Search
            placeholder="Search by name"
            value={query}
            onSearch={v => setQuery(v)}
            onChange={e => setQuery(e.target.value)}
            allowClear
            className="w-full sm:w-64"
          />
          <Button
            onClick={() => setView(v => (v === 'list' ? 'card' : 'list'))}
            className="bg-gray-200 hover:bg-gray-300"
          >
            {view === 'list' ? 'Card View' : 'List View'}
          </Button>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => { setEditUser(null); setModalOpen(true); }}
          className="mt-2 md:mt-0"
        >
          Create User
        </Button>
      </div>

      {/* Users */}
      {view === 'list' ? (
        <UserList
          users={pageItems}
          onEdit={u => { setEditUser(u); setModalOpen(true); }}
          onDelete={id => dispatch(deleteUser(id))}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pageItems.map(u => (
            <UserCard
              key={u.id}
              user={u}
              onEdit={() => { setEditUser(u); setModalOpen(true); }}
              onDelete={() => dispatch(deleteUser(u.id))}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={p => setPage(p)}
        />
      </div>

      {/* Modal */}
      <UserModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        editUser={editUser}
      />
    </div>
  );
};

export default UsersPage;
