<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password as RulesPassword;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.mixedCase' => 'Mật khẩu phải có ít nhất 1 chữ hoa và 1 chữ thường.',
            'password.letters' => 'Mật khẩu phải có ít nhất 1 chữ cái.',
            'password.numbers' => 'Mật khẩu phải có ít nhất 1 số.',
            'password.symbols' => 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt.',
            'password_confirmation.same' => 'Xác nhận mật khẩu không khớp.',
        ];
    }
}
