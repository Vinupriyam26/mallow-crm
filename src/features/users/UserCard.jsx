import React from 'react';
import { Avatar, Button } from 'antd';

const UserCard = ({ user, onEdit, onDelete }) => {
    const avatarFallback = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center hover:shadow-lg transition-shadow duration-200">
            <Avatar size={64} src={user.avatar} style={{ backgroundColor: !user.avatar ? '#1890ff' : undefined }}>
                {!user.avatar && avatarFallback} 
            </Avatar>

            <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                    {user.first_name} {user.last_name} 
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex space-x-2">
                <Button
                    type="primary"
                    size="small"
                    onClick={onEdit}
                    className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                >
                    Edit
                </Button>
                <Button
                    type="default"
                    size="small"
                    onClick={onDelete}
                    className="!bg-red-600 border-none !text-white"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default UserCard;
