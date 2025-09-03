@component('mail::message')
    # Xác thực email

    Chào bạn,

    Nhấn vào nút dưới đây để xác thực email của bạn:

    @component('mail::button', ['url' => $verifyUrl])
        Xác thực email
    @endcomponent

    Link sẽ hết hạn sau 60 phút.

    Cảm ơn,
    {{ config('app.name') }}
@endcomponent
