<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{

    public function render($request, Throwable $exception)
    {
        // Nếu là API request (ví dụ request header Accept: application/json)
        if ($request->wantsJson()) {

            if ($exception instanceof AppError) {
                return response()->json([
                    'success' => false,
                    'mes' => $exception->getMessage(),
                    'stack' => config('app.env') === 'production' ? null : $exception->getTraceAsString()
                ], $exception->getStatusCode());
            }

            // Các lỗi khác cũng trả về JSON
            return response()->json([
                'success' => false,
                'mes' => $exception->getMessage(),
                'stack' => config('app.env') === 'production' ? null : $exception->getTraceAsString()
            ], 500);
        }

        // Nếu không phải API request thì dùng render mặc định (trả về HTML)
        return parent::render($request, $exception);
    }
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
