<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
                'email' => 'required|email',
                'password' => 'required|string|min:6'
        ];
    }
    public function messages()
    {
        return [
            'email.required' => 'Email không được bỏ trống',
            'email.email' => 'Email không đúng định dạng',
        ];
    }

}
