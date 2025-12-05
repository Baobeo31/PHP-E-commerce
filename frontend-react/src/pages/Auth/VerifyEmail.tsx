import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutation';
import { verifyEmail } from '../../services/UserService';
import { toast } from 'react-toastify';

const VerifyEmail: React.FC = () => {
    const { id, token } = useParams<{ id: string; token: string }>()
    const navigate = useNavigate();

    const mutation = useMutationHooks(
        (data: { id: string; token: string }) => verifyEmail(data)
    );
    console.log(id, token);
    
    const { mutate, isPending, isError, error, isSuccess, data } = mutation;
    console.log(data,isError, isSuccess);
    
    useEffect(() => {
        if (id && token) {
            mutate({ id, token });
        }
    }, [id, token, mutate]);
    

    useEffect(() => {
        if (isSuccess) {
            toast.success('Xác thực email thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        if (isError) {
            const errorMessage = (error as any)?.response?.data?.message || 'Xác thực thất bại. Vui lòng thử lại.';
            toast.error(errorMessage);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [isSuccess, isError, error, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Đang xác thực Email...</h2>
                {isPending && (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                )}
                {isSuccess && (
                    <p className="text-green-600">Xác thực thành công! Đang chuyển hướng...</p>
                )}
                {isError && (
                    <p className="text-red-600">Xác thực thất bại. Đang chuyển hướng...</p>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;