<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>ИдёмВКино</title>
    <link rel="stylesheet" href="css/all_normalize.css">
    <link rel="stylesheet" href="css/admin_styles.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
</head>

<body>

<header class="page-header">
{{--    <h1 class="page-header__title">Идём<span>в</span>кино</h1>--}}
{{--    <span class="page-header__subtitle">Администраторррская</span>--}}
    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <h1 class="page-header__title"> <a class="logout_admin" href="{{ route('logout') }}"
                                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">Идём<span>в</span>кино</a></h1>
        <span class="page-header__subtitle">Администраторррская</span>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
        </form>
    </div>
</header>

{{--Popup add Hall--}}
<div class="popup" id="addPopup">
    <div class="popup__container">
        <div class="popup__content">
            <div class="popup__header">
                <h2 class="popup__title">
                    Добавление зала
                    <a class="popup__dismiss" href="#"><img src="i/close.png" alt="Закрыть" id="addModalDismiss"></a>
                </h2>

            </div>
            <div class="popup__wrapper">
                <form accept-charset="utf-8" name="hallAddForm" id="hallAddForm">
                    @csrf
                    <label class="conf-step__label conf-step__label-fullsize" for="name">
                        Название зала
                        <input class="conf-step__input" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="name" id="hallNameAdd" required>
                    </label>
                    <div class="conf-step__buttons text-center">
                        <input type="submit" value="Добавить зал" class="conf-step__button conf-step__button-accent" name="addHall">
                        <button class="conf-step__button conf-step__button-regular">Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{{--Popup delete Hall--}}
<div class="popup" id="deletePopup">
    <div class="popup__container">
        <div class="popup__content">
            <div class="popup__header">
                <h2 class="popup__title">
                    Удаление зала
                    <a class="popup__dismiss" href="#"><img src="i/close.png" alt="Закрыть" id="delModalDismiss"></a>
                </h2>

            </div>
            <div class="popup__wrapper">
                <form accept-charset="utf-8" id="hallDeleteForm">
                    @csrf
                    <p class="conf-step__paragraph">Вы действительно хотите удалить зал <span class="popupHallName"></span>?</p>
                    <!-- В span будет подставляться название зала -->
                    <div class="conf-step__buttons text-center">
                        <input type="submit" value="Удалить" class="conf-step__button conf-step__button-accent">
                        <button class="conf-step__button conf-step__button-regular">Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


{{--Movie add Popup--}}
<div class="popup" id="addMoviePopup">
    <div class="popup__container">
        <div class="popup__content">
            <div class="popup__header">
                <h2 class="popup__title">
                    Добавление фильма
                    <a class="popup__dismiss" href="#"><img src="i/close.png" alt="Закрыть" id="moviePopupDismiss"></a>
                </h2>
            </div>
            <div class="popup__wrapper">
                <form accept-charset="utf-8" id="addMovieForm" enctype="multipart/form-data">
                    @csrf
                    <label class="conf-step__label conf-step__label-fullsize" for="name">
                        Название фильма
                        <input class="conf-step__input" type="text" placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="title" id="movieName" required>
                    </label>
                    <label class="conf-step__label conf-step__label-fullsize" for="name">
                        Продолжительность фильма
                        <input class="conf-step__input" type="text" placeholder="Например, &laquo;86&raquo;" name="duration" id="movieDuration" required>
                    </label>
                    <label class="conf-step__label conf-step__label-fullsize" for="name">
                        Описание фильма
                        <textarea class="conf-step__input" type="text" placeholder="Например, &laquo;Гражданин Кейн был бравым офицером и т.д и тп.&raquo;" name="description" id="movieDescription" required></textarea>
                    </label>
                    <label class="conf-step__label conf-step__label-fullsize" for="name">
                        Страна
                        <input class="conf-step__input" type="text" placeholder="Например, &laquo;Индия&raquo;" name="country" id="movieCountry" required>
                    </label>
                    <label class="conf-step__label conf-step__label-fullsize" for="poster">
                        Постер фильма
                        <input class="conf-step__input" type="file" accept="image/*" name="poster" id="moviePoster" required>
                        <small style="color: #666; font-size: 12px; display: block; margin-top: 5px;">
                            Рекомендуемые форматы: JPG, PNG, WEBP. Максимальный размер: 5MB
                        </small>
                    </label>

                    <div class="conf-step__buttons text-center">
                        <input type="submit" value="Добавить фильм" class="conf-step__button conf-step__button-accent" id="addMovieToDbBtn">
                        <button class="conf-step__button conf-step__button-regular" type="button">Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>



{{--ShowTime add--}}
<div class="popup" id="addShowTimePopup">
    <div class="popup__container">
        <div class="popup__content">
            <div class="popup__header">
                <h2 class="popup__title">
                    Добавление сеанса
                    <a class="popup__dismiss" href="#"><img src="i/close.png" alt="Закрыть" id="showTimePopupDismiss"></a>
                </h2>

            </div>
            <div class="popup__wrapper">
                <form accept-charset="utf-8" id="seanceAddForm">
                    @csrf
                    <label class="conf-step__label conf-step__label-fullsize" for="hall_id">
                        Название зала
                        <select class="conf-step__input" name="hall_id" id="seance_hallName" required>
                            @foreach($halls as $hall)
                            <option value="{{ $hall->id }}" selected>{{ $hall->name }}</option>
                            @endforeach
                        </select>
                    </label>
                    <label class="conf-step__label conf-step__label-fullsize" for="name">
                        Время начала
                        <input class="conf-step__input" type="time" value="00:00" name="start_time" id="seance_startTime" required>
                    </label>


                    <label class="conf-step__label conf-step__label-fullsize" for="movie_id">
                        Название фильма
                    <input class="conf-step__input movie_name" type="text" placeholder="Например, &laquo;Альфа&raquo;" name="movie_name" id="seance_movieName" required>
                    </label>

                    <div class="conf-step__buttons text-center">
                        <input type="submit" value="Добавить" class="conf-step__button conf-step__button-accent">
                        <button class="conf-step__button conf-step__button-regular">Отменить</button>
                        <button type="button" class="conf-step__button conf-step__button-accent" id="movie_delete_btn">Удалить фильм</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{{--showTime delete--}}
<div class="popup" id="delShowtimePopup">
    <div class="popup__container">
        <div class="popup__content">
            <div class="popup__header">
                <h2 class="popup__title">
                    Снятие с сеанса
                    <a class="popup__dismiss" href="#"><img src="i/close.png" alt="Закрыть" id="delShowTimePopupDismiss"></a>
                </h2>

            </div>
            <div class="popup__wrapper">
                <form accept-charset="utf-8" id="delete_hall_show">
                    @csrf
                    <p class="conf-step__paragraph">Вы действительно хотите снять с сеанса фильм <span class="popupMovieName"></span>?</p>
                    <!-- В span будет подставляться название фильма -->
                    <div class="conf-step__buttons text-center">
                        <input type="submit" value="Удалить" class="conf-step__button conf-step__button-accent">
                        <button class="conf-step__button conf-step__button-regular">Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<main class="conf-steps">
        <section class="conf-step">
            <header class="conf-step__header conf-step__header_opened">
                <h2 class="conf-step__title">Управление залами</h2>
            </header>
            <div class="conf-step__wrapper">
                <p class="conf-step__paragraph">Доступные залы:</p>
                <ul class="conf-step__list">
                    @foreach($halls as $hall)
                    <li class="hallDeleteList">{{ $hall->name }}
                        <button class="conf-step__button conf-step__button-trash" type="button" id="{{ $hall->id }}" data-delHall-id="{{ $hall->id }}"></button>
                    </li>
                    @endforeach
                </ul>
                <button class="conf-step__button conf-step__button-accent" id="hallAddPopupShow">Создать зал</button>
            </div>
        </section>


    <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Конфигурация залов</h2>
        </header>
        <div class="conf-step__wrapper">
            <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <ul class="conf-step__selectors-box tabs__caption">
                @foreach($halls as $hall)
                <li><input type="radio" class="conf-step__radio hide" name="chairs-hall" value="{{ $hall->id }}"><span class="conf-step__selector">{{ $hall->name }}</span></li>
                @endforeach
            </ul>
            <p class="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div class="conf-step__legend">
                <label class="conf-step__label">Рядов, шт<input type="text" class="conf-step__input" placeholder="10" id="input_rows_count"></label>
                <span class="multiplier">x</span>
                <label class="conf-step__label">Мест, шт<input type="text" class="conf-step__input" placeholder="8" id="input_places_count"></label>
            </div>
            <p class="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div class="conf-step__legend">
                <span class="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                <span class="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                <span class="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
                <p class="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>


            @for($i = 0; $i < $halls->count(); $i++)

            <div class="conf-step__hall" style="display: none">
                <div class="conf-step__hall-wrapper">
                    @for($j = 0; $j < count($seats[$halls[$i]->name]); $j++)
                    <div class="conf-step__row">
                        @for($k = 0; $k < count($seats[$halls[$i]->name][0]); $k++)
                        <span class="conf-step__chair conf-step__chair_{{ $seats[$halls[$i]->name][$j][$k][0] }}"></span>
                        @endfor
                    </div>
                    @endfor
                </div>
            </div>
            @endfor

            <fieldset class="conf-step__buttons text-center">
                <button class="conf-step__button conf-step__button-regular">Отмена</button>
                <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent" id="hallSizeSaveBtn">
            </fieldset>
        </div>
    </section>

    <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Конфигурация цен</h2>
        </header>
        <div class="conf-step__wrapper">
            <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <ul class="conf-step__selectors-box">
                @foreach($halls as $hall)
                <li><input type="radio" class="conf-step__radio" name="prices-hall" value="{{ $hall->id }}"><span class="conf-step__selector">{{ $hall->name }}</span></li>
                @endforeach
            </ul>

            <p class="conf-step__paragraph">Установите цены для типов кресел:</p>
            <div class="conf-step__legend">
                <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input" id="standartPrice"></label>
                за <span class="conf-step__chair conf-step__chair_standart"></span> обычные кресла
            </div>
            <div class="conf-step__legend">
                <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input" id="vipPrice"></label>
                за <span class="conf-step__chair conf-step__chair_vip"></span> VIP кресла
            </div>

            <fieldset class="conf-step__buttons text-center">
                <button class="conf-step__button conf-step__button-regular">Отмена</button>
                <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent" id="savePrice">
            </fieldset>
        </div>
    </section>

    <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Сетка сеансов</h2>
        </header>
        <div class="conf-step__wrapper">
            <p class="conf-step__paragraph">
                <button class="conf-step__button conf-step__button-accent" id="addMovie" name="addMovie">Добавить фильм</button>
            </p>
            <div class="conf-step__movies">
                @foreach($movies as $movie)
                <div class="conf-step__movie">
                    <img class="conf-step__movie-poster" alt="poster" src="i/posters/{{ $movie->title }}.jpg">
                    <h3 class="conf-step__movie-title" id="addForm-movie-title">{{ $movie->title }}</h3>
                    <p class="conf-step__movie-duration">{{ $movie->duration }}</p>
                </div>
                @endforeach
            </div>

            <div class="conf-step__seances">
                @for($i = 0; $i < $halls->count(); $i++)
                <div class="conf-step__seances-hall">
                    <h3 class="conf-step__seances-title">{{ $halls[$i]->name }}</h3>
                    <div class="conf-step__seances-timeline">
                        @for($j = 0; $j < $halls[$i]->seances->count(); $j++)
                        <div class="conf-step__seances-movie" data-hallShow-id="{{ $halls[$i]->id }}"  style="width: {{ $hallSeances[$halls[$i]->id][$j][0] }}px; background-color: rgb(133, 255, 137); left: {{ $hallSeances[$halls[$i]->id][$j][1] }}px; cursor: pointer">
                            <p class="conf-step__seances-movie-title" data-hallShow-title="{{ $halls[$i]->name }}">{{ $hallSeances[$halls[$i]->id][$j][2] }}</p>
                            <p class="conf-step__seances-movie-start">{{ $halls[$i]->seances[$j]->start_time }}</p>
                        </div>
                        @endfor
                    </div>
                </div>
                @endfor
            </div>

            <fieldset class="conf-step__buttons text-center">
                <button class="conf-step__button conf-step__button-regular">Отмена</button>
                <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
            </fieldset>
        </div>
    </section>



        <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Открыть продажи</h2>
        </header>
        <div class="conf-step__wrapper">
            <ul class="conf-step__selectors-box">
                @foreach($halls as $hall)
                    <li><input type="radio" class="conf-step__radio {{ $hallIsActive[$hall->id][0] }}" name="startOfSales-hall" value="{{ $hall->id }}" id="startHallRadio" data-active="{{ $hall->is_active }}"><span class="conf-step__selector">{{ $hall->name }}</span></li>
                @endforeach
            </ul>

            <div class="conf-step__wrapper text-center">
                <p class="conf-step__paragraph open-hall"></p>
                <button class="conf-step__button conf-step__button-accent startOfSalesBtn" id="startOfSalesBtn" disabled="true">Открыть продажу билетов</button>
            </div>
        </div>
    </section>

</main>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/admin_editor.js"></script>
<script src="js/accordeon.js"></script>
</body>
</html>
