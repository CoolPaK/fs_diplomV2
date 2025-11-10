<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ИдёмВКино</title>
    <link rel="stylesheet" href="css/client_styles.css">
    <link rel="stylesheet" href="css/all_normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
</head>

<body>
<header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
</header>

<main>
    <section class="ticket">

        <header class="ticket__check">
            <h2 class="ticket__check-title">Вы выбрали билеты:</h2>
        </header>

        <div class="ticket__info-wrapper">
            <p class="ticket__info">На фильм: <span class="ticket__details ticket__title">{{ $movie_title }}</span></p>
            <p class="ticket__info">Ряд/Место: <span class="ticket__details ticket__chairs">{{ $places }}</span></p>
            <p class="ticket__info">В зале: <span class="ticket__details ticket__hall">{{ $hall_name }}</span></p>
            <p class="ticket__info">Начало сеанса: <span class="ticket__details ticket__start">{{ $start_time }}</span></p>
            <p class="ticket__info">Стоимость: <span class="ticket__details ticket__cost">{{ $price }}</span> рублей</p>

            <button class="acceptin-button" onclick="location.href=`{{ route('ticket', ['movie_title' => $movie_title, 'places' => $places, 'hall_name' => $hall_name, 'price' => $price, 'start_time' => $start_time, 'taken_places' => $taken_places]) }}`">Получить код бронирования</button>

            <p class="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
            <p class="ticket__hint">Приятного просмотра!</p>
        </div>
    </section>
</main>

</body>
</html>
