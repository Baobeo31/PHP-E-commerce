<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyEmailMail extends Mailable
{
    use Queueable, SerializesModels;

    public $verifyUrl;

    public function __construct($verifyUrl)
    {
        $this->verifyUrl = $verifyUrl;
    }

    public function build()
    {
        return $this->subject('Xác thực email của bạn')
            ->markdown('emails.verify-email') // Laravel hỗ trợ HTMl
            ->with(['verifyUrl' => $this->verifyUrl]); // truyền giá trị vào view 
    }
}
