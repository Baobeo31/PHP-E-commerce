import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutation";
import type { LoginResponse, LoginRequest } from "../../types/user";
import { useAuth } from "../../context/AuthContext";


interface LoginFormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({ 
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  // React Query mutation
  const mutation = useMutationHooks<LoginResponse, LoginRequest>(loginUser);

  const { error, isPending, isError, mutate } = mutation;
  const [message, setMessage] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    console.log(email, password);
    mutate({ email, password }, {
      onSuccess: (res) => {
        console.log("Login response:", res);

        if (res.data.status === "OK") {
          // Lấy token từ res.data
          localStorage.setItem("access_token", res.data.access_token);
          login(res.data.access_token, res.data.user);
          // Chuyển hướng
          navigate("/home");
        } else {
          setMessage(res.message || "Đăng nhập thất bại");
        }
      },
      onError: (err: any) => {
        setMessage(err?.response?.data?.message || "Đăng nhập không thành công");
      },
    });
  }
  const handleRegister = () => navigate("/register");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Đăng nhập</h2>

        {isError && (
          <div
            className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200"
            role="alert"
          >
            {(error as any)?.response?.data?.message || "Lỗi đăng nhập"}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-left font-medium text-gray-700 mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
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

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition duration-200 ${isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              }`}
          >
            {isPending ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="text-sm text-center">
          <span
            className="cursor-pointer text-indigo-600 hover:underline"
            onClick={handleRegister}
          >
            Đăng ký
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;