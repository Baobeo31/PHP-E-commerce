<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Mã OTP đặt lại mật khẩu</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">Xin chào,</h2>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
        <p>Mã OTP của bạn là:</p>
        <h1 style="color: #ff6600; text-align: center;">{{ $otp }}</h1>
        <p>Mã này sẽ hết hạn sau <strong>5 phút</strong>. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email
            này.</p>
        <p>Trân trọng,<br>Đội ngũ hỗ trợ</p>
    </div>
</body>

</html>
