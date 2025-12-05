import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

export const useMutationHooks = <
  TData = any,          // Kiểu dữ liệu API trả về
  TVariables = any,     // Kiểu dữ liệu truyền vào hàm mutationFn
  TError = unknown      // Kiểu lỗi
>(
  fnCallback: (variables: TVariables) => Promise<TData>
): UseMutationResult<TData, TError, TVariables> => {
  
  return useMutation<TData, TError, TVariables>({
    mutationFn: fnCallback,
  });
};
