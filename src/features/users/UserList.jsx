import React from 'react';
import { Avatar, Button } from 'antd';

const UserList = ({ users, onEdit, onDelete }) => {
      const getAvatarFallback = (user) => `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <Avatar
                  size={40}
                  src={user.avatar}
                  style={{ backgroundColor: !user.avatar ? '#1890ff' : undefined }}
                >
                  {!user.avatar && getAvatarFallback(user)}
                </Avatar>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                {user.first_name} {user.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => onEdit(user)}
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                >
                  Edit
                </Button>
                <Button
                  type="default"
                  size="small"
                  onClick={() => onDelete(user.id)}
                  className="!bg-red-600 !hover:bg-red-700 !border-none !text-white"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
