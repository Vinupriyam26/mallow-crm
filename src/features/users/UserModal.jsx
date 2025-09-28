import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from './usersSlice';

const UserModal = ({ open, onClose, editUser }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editUser) form.setFieldsValue(editUser);
    else form.resetFields();
  }, [editUser, form]);

  const onFinish = (values) => {
    if (editUser) {
      dispatch(updateUser({ id: editUser.id, payload: values })).then(() => onClose());
    } else {
      dispatch(createUser(values)).then(() => onClose());
    }
  };

  return (
    <Modal
      title={editUser ? 'Edit User' : 'Create User'}
      open={open}
      onCancel={onClose}
      footer={null}
      className="rounded-lg"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
        >
          <Input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </Form.Item>

        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {editUser ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserModal;
