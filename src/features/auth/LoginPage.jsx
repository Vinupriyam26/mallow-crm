import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';

const LoginPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector(s => s.auth);

    const onFinish = (values) => {
        // console.log('Form values:', values);
        dispatch(login({
            email: values.email.trim(),
            password: values.password.trim()
        }))
            .unwrap()
            .then(() => navigate('/users'))
            .catch(() => { });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full sm:max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Mallow - Login</h2>

                {error && (
                    <Alert
                        style={{ marginBottom: '1rem' }}
                        message={error?.error || error}
                        type="error"
                        showIcon
                    />
                )}

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ email: 'eve.holt@reqres.in', password: 'cityslicka' }}
                >
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Email</span>}
                        name="email"
                        rules={[{ required: true, message: 'Email required' }]}
                    >
                        <Input className="border border-gray-300 shadow-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Password required' }]}
                    >
                        <Input.Password className="border border-gray-300 shadow-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={status === 'loading'}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
