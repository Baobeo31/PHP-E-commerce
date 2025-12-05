import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutation";
import { resendVerificationEmail } from "../../services/UserService";
import type { ResendVerificationRequest, ResendVerificationResponse } from "../../types/user";

const ResendVerification: React.FC = () => {
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const mutation = useMutationHooks<ResendVerificationResponse, ResendVerificationRequest>(resendVerificationEmail);

    const { mutate, isPending } = mutation;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Vui lòng nhập địa chỉ email của bạn.");
            return;
        }
        mutate({ email }, {
            onSuccess: (res) => {
                if (res.success) {
                    toast.success(res.message);
                    setIsSuccess(true);
                } else {
                    toast.error(res.message);
                }
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Đã xảy ra lỗi khi gửi lại email xác thực.");
            }
        });
    };

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                {isSuccess ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Email đã được gửi
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Chúng tôi đã gửi một liên kết xác minh mới đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến của bạn.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={handleLogin}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                            >
                                Quay lại trang Đăng nhập
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-3xl font-extrabold text-center text-gray-900">
                            Gửi lại email xác thực
                        </h2>
                        <p className="text-center text-gray-600">
                            Nhập địa chỉ email của bạn để nhận liên kết xác minh mới.
                        </p>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm text-left font-medium text-gray-700 mb-1">
                                    Địa chỉ Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        placeholder="you@example.com"
                                        disabled={isPending}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition duration-200 ${isPending
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
                                        }`}
                                >
                                    {isPending ? "Đang gửi..." : "Gửi lại Email"}
                                </button>
                            </div>
                        </form>
                        <div className="text-sm text-center">
                            <span
                                className="cursor-pointer text-indigo-600 hover:underline"
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResendVerification;