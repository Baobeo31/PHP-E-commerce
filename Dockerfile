# Sử dụng PHP 8.2 với FPM
FROM php:8.2-fpm

# Cài extension cần cho Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    nodejs \
    npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Cài Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Tạo thư mục app
WORKDIR /var/www

# Copy source code Laravel
COPY . /var/www

# Cấp quyền cho storage & bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Chạy Composer install
RUN composer install --no-dev --optimize-autoloader

# Build frontend nếu dùng Vite
RUN npm install && npm run build

EXPOSE 9000

CMD ["php-fpm"]
