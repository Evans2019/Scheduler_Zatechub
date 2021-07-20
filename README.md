# Scheduler_Zatechub

## Installation

1. Clone the repo
```
git clone https://github.com/EvansTL/Scheduler_Zatechub.git
```

2. Create a local environment and update the variables
```
cp .env.example .env
```


5. Install all composer dependencies
```
composer install
```

6. Genarate an application key
```
php artisan key:generate
```
7. Run all migrations
```
php artisan migrate
```

8. Install node modules
```
npm install && npm run dev
```

7. Serve the application
```
php artisan serve
```
- Application will start on [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
```