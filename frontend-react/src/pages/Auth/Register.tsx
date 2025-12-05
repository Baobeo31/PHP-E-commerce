import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutation';
import { registerUser } from '../../services/UserService';
import type { RegisterRequest, RegisterResponse } from '../../types/user';

interface LoginFormState {
  name: string,
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const mutation = useMutationHooks<RegisterResponse, RegisterRequest>(registerUser);


  const { isError, isPending, mutate, error } = mutation;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;
    if (!email || !password || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ Email, Mật khẩu và Xác nhận mật khẩu.');
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    mutate({ name, email, password, password_confirmation: confirmPassword }, {
      onSuccess: (res) => {
        console.log("Register response", res);
        if (res.success === true) {
          alert(res.message || "Đăng ký thành công");
          navigate('/login');
        } else {
          alert(res.message || "Đăng ký không thành công")
        }
      },
      onError: (err: any) => {
        alert(err?.response?.data?.message || "Đăng ký không thành công")
      }
    })
  };

  const handleLogin = () => {
    navigate('/login');
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Đăng ký
        </h2>

        {isError && (
          <div
            className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200"
            role="alert"
          >
            {(error as any)?.response?.data?.message || "Lỗi đăng Ký"}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm text-left font-medium text-gray-700 mb-1">
              Tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-left font-medium text-gray-700 mb-1">
              Địa chỉ Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="confirm-password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition duration-200 ${isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
              }`}
          >
            {isPending ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <div className="text-sm text-center">
          <span
            className="cursor-pointer text-indigo-600 hover:underline"
            onClick={handleLogin}
          >
            Đăng nhập
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
