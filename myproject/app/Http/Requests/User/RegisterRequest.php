<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password as RulesPassword;

class RegisterRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => $validator->errors()->first(), // lấy message đầu tiên
                'errors' => $validator->errors(), // full list lỗi
            ], 422)
        );
    }
    public function authorize(): bool
    {
        return true;
    }

    /** 
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                RulesPassword::min(8)
                    ->mixedCase() //1 chữ hoa + 1 chữ thường
                    ->letters() //có chữ cái
                    ->numbers() //có số
                    ->symbols() // có ký tự đặc biệt
                    ->uncompromised() //kiểm tra xem không nằm trong list mật khẩu bị lộ

            ],
            'password_confirmation' => 'required|same:password'
        ];
    }
    public function messages()
    {
        return [
            'password.required' => 'Mật khẩu không được bỏ trống.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.mixedCase' => 'Mật khẩu phải có ít nhất 1 chữ hoa và 1 chữ thường.',
            'password.letters' => 'Mật khẩu phải có ít nhất 1 chữ cái.',
            'password.numbers' => 'Mật khẩu phải có ít nhất 1 số.',
            'password.symbols' => 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt.',
            'password.uncompromised' => 'Mật khẩu này đã bị lộ, vui lòng chọn mật khẩu khác.',

            'password_confirmation.required' => 'Xác nhận mật khẩu không được bỏ trống.',
            'password_confirmation.same' => 'Xác nhận mật khẩu không khớp.',



            'email.unique' => 'Email đã được sử dụng',
            'email.required' => 'Email không được bỏ trống',
            'email.email' => 'Email không hợp lệ',
        ];
    }
}
