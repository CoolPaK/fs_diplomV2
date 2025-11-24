# Дипломный проект
## Способ реализации

Laravel

## Версия PHP

8.2

## Версия Laravel

9.52.10

## Инструкция

1. Сделать git clone данного репозитория
2. Изменить название файла "env.example" на ".env" в директории проекта
3. Настроить подключение к базе данных в файле .env
    ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=/absolute/path/to/database.sqlite
   Создайте файл: touch database/database.sqlite
4. В папке с проектом запустить команду: composer install
5. Выполнить php artisan key:generate
6. Выполнить миграции базы данных: php artisan migrate
7. Запустить сервер php artisan serve

## Возможности для клиента

- Просматривать репертуар и расписание
- Выбирать место, бронировать билеты

## Возможности для администратора

- Создавать и настраивать залы, фильмы, расписание сеансов

## Доступы

- http://127.0.0.1:8000/admin
- login: admin@admin
- password: 1234