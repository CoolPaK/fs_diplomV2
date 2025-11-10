// 1 Управление залами
let trashHall = Array.from(document.querySelectorAll('[data-delHall-id]'));
let deletePopup = document.getElementById('deletePopup');
let delModalDismiss = document.getElementById('delModalDismiss');
let hallAddPopupShow = document.getElementById('hallAddPopupShow');
let addPopup = document.getElementById('addPopup');
let addModalDismiss = document.getElementById('addModalDismiss');
let ul = [...document.querySelectorAll('.hallDeleteList')];
let popupName = document.querySelector('.popupHallName');

//Delete popup btn
delModalDismiss.addEventListener('click', function (e) {
    e.preventDefault();
    deletePopup.classList.toggle('active');
})

// Кнопка открытия popup
hallAddPopupShow.addEventListener('click', function () {
    addPopup.classList.toggle('active');
})

// Кнопка закрытия popup
addModalDismiss.addEventListener('click', function (e) {
    e.preventDefault();
    addPopup.classList.toggle('active');
})

// Добавление зала
$(document).ready(function () {
    $('#hallAddForm').submit(function (e) {
        e.preventDefault();
        $hall_name = $('#hallNameAdd').val()
        $.ajax({
            url: '/hall_add',
            type: 'POST',
            data: {
                name: $hall_name
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {
                $.ajax({
                    url: '/hall_size',
                    type: 'POST',
                    data: {
                        hall_id: data.hall_id,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function () {

                    }
                });
                location.reload();
            }
        });
    });
})
// Удаление зала

for (let i = 0; i < trashHall.length; i++) {
    trashHall[i].addEventListener('click', function () {
        deletePopup.classList.toggle('active');
        let id = trashHall[i].getAttribute('data-delHall-id');
        popupName.textContent = ul[i].textContent;
        $(document).ready(function () {
            $('#hallDeleteForm').submit(function () {
                $.ajax({
                    url:'/delete_hall',
                    type: 'POST',
                    data: {
                        hall_id: id,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success:function (data) {
                        location.reload();
                    }
                });
            });
        })
    })
}


// 2 Конфигурация залов

const rowCount = document.getElementById('input_rows_count');
const placeCount = document.getElementById('input_places_count');
let chairsHall = document.getElementsByName('chairs-hall');
let hallPlace = Array.from(document.querySelectorAll('.conf-step__hall'));
let hallRadio = [...document.querySelectorAll('.conf-step__radio.hide')];
let hallWrapper = [...document.querySelectorAll('.conf-step__hall-wrapper')];


//Переключение кресел
const chairChecked = () => {
    const chairs = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair'));
    chairs.forEach(chair => chair.addEventListener('click', () => {
        if (chair.classList.contains('conf-step__chair_standart')) {
         chair.classList.toggle('conf-step__chair_standart');
         chair.classList.toggle('conf-step__chair_vip');
     } else if (chair.classList.contains('conf-step__chair_vip')) {
         chair.classList.toggle('conf-step__chair_vip');
         chair.classList.toggle('conf-step__chair_disabled');
     } else if (chair.classList.contains('conf-step__chair_disabled')) {
         chair.classList.toggle('conf-step__chair_disabled');
         chair.classList.toggle('conf-step__chair_standart');
        }
    }));
}


// Показ экрана зала
for (let i = 0; i < chairsHall.length; i++) {
 chairsHall[i].addEventListener('click', function () {
     hallPlace.forEach(tab => {
         tab.style.display = 'none'
     })
     hallPlace[i].style.display = 'block';
     let chairRow = [...hallPlace[i].querySelectorAll('.conf-step__row')];
     rowCount.value = chairRow.length;
     let col = [...chairRow[0].querySelectorAll('.conf-step__chair')];
     placeCount.value = col.length;

// Перерисовка зала в вводе инпут рядов
     rowCount.oninput = function () {
         if (rowCount.value > 15) {
             rowCount.value = 15;
         }
         hallWrapper[i].innerHTML = ''
         for (let k = 0; k < Number(rowCount.value); k++) {
             hallWrapper[i].insertAdjacentHTML('afterBegin', `<div class="conf-step__row"></div>`)
         }
         let hallRow = [...hallWrapper[i].querySelectorAll('.conf-step__row')]
         hallRow.forEach(element => {
             for (let j = 0; j < Number(placeCount.value); j++) {
                 element.insertAdjacentHTML('afterBegin', `<span class="conf-step__chair conf-step__chair_standart"></span>`)
             }
         })
         chairChecked();
     };

// Перерисовка зала в вводе инпут мест
     placeCount.oninput = function () {
         if (placeCount.value > 15) {placeCount.value = 15;}
         hallWrapper[i].innerHTML = ''
         for (let k = 0; k < Number(placeCount.value); k++) {
            hallWrapper[i].insertAdjacentHTML('afterBegin', `<div class="conf-step__row"></div>`)
            }
         let hallRow = [...hallWrapper[i].querySelectorAll('.conf-step__row')]
         hallRow.forEach(element => {
             for (let j = 0; j < Number(placeCount.value); j++) {
                 element.insertAdjacentHTML('afterBegin', `<span class="conf-step__chair conf-step__chair_standart"></span>`)
             }
         })
         chairChecked();
     };
 })
}

// обновление категорий мест в зале
$(document).ready(function () {
 $('#hallSizeSaveBtn').click(function (e) {
     const rows = Number(rowCount.value);
     const places = Number(placeCount.value);
     const hallSize = {
         'rows': rows,
         'cols': places
        }
     let result = [];

     hallPlace.forEach(tab => {
         if (tab.style.display === 'block') {
             let allHallChair = [...tab.querySelectorAll('.conf-step__chair')];
             let chairRow = [...tab.querySelectorAll('.conf-step__row')];
             let col = [...chairRow[0].querySelectorAll('.conf-step__chair')];
             hallRadio.forEach(radio => {
                 if (radio.checked) {
                     for (let i = 0; i < chairRow.length; i++) {
                         for (let j = 0; j < col.length; j++) {
                             result.push({
                                 'hall_id': radio.value,
                                 'row_num': i,
                                 'seat_num': j,
                                 'status': 'standart'
                                })
                            }
                        }
                     for (let k = 0; k < allHallChair.length; k++) {
                         result[k].status = allHallChair[k].className.slice(34)
                        }
                    }
                })
             $.ajax({
                 url: '/hall_chair',
                 type: 'POST',
                 data: {
                     result: result,
                     hallSize: hallSize,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                 success(data) {}
                });
            }
        })
    })
})
chairChecked();




// 3 Конфигурация цен
let chairPrice = Array.from(document.getElementsByName('prices-hall'));
let standartPrice = document.getElementById('standartPrice');
let vipPrice = document.getElementById('vipPrice');

chairPrice.forEach(hall => hall.addEventListener('click', function (e) {
    standartPrice.value = '';
    vipPrice.value = '';
    $.ajax({
        url: '/show_price',
        type: 'GET',
        data: {
            hall_id: hall.value
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            if(data) {
                standartPrice.value = data.find(el => el.status === 'standart').price
                vipPrice.value = data.find(el => el.status === 'vip').price
            } else {
                $.ajax({
                    url: '/save_price',
                    type: 'POST',
                    data: {
                        result: [
                            {
                                'hall_id': hall.value,
                                'status': 'standart',
                                'price': 250,
                            },
                            {
                                'hall_id': hall.value,
                                'status': 'vip',
                                'price': 350,
                            }
                        ]
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (data) {
                        standartPrice.value = 250
                        vipPrice.value = 350
                    },
                });
            }
        }
    });

    $('#savePrice').click(function () {
        if(hall.checked) {
            $.ajax({
                url: '/save_price',
                type: 'POST',
                data: {
                    result: [
                        {
                            'hall_id': hall.value,
                            'status': 'standart',
                            'price': standartPrice.value,
                        },
                        {
                            'hall_id': hall.value,
                            'status': 'vip',
                            'price': vipPrice.value
                        }
                    ]
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (data) {
                    location.reload();
                },
            });
        }
    })
}))



// 4 Сетка сеансов 4.1 Добавление и удаление фильма
let addMovie = document.getElementById('addMovie');
let addMoviePopup = document.getElementById('addMoviePopup');
let moviePopupDismiss = document.getElementById('moviePopupDismiss');

// Movie popup открыть
addMovie.addEventListener('click', function () {
    addMoviePopup.classList.toggle('active');
})

// Movie popup закрыть
moviePopupDismiss.addEventListener('click', function (e) {
    e.preventDefault();
    addMoviePopup.classList.toggle('active');
})

// Добавить фильм
$(document).ready(function () {
    $('#addMovieForm').submit(function (e) {
    let movieName = $('#movieName').val();
    let movieDuration = $('#movieDuration').val();
    let movieDescription = $('#movieDescription').val();
    let movieCountry = $('#movieCountry').val();
    e.preventDefault();


    $.ajax({
        url: '/add_movie',
        type: 'POST',
        data: {
            title: movieName,
            duration: movieDuration,
            description: movieDescription,
            country: movieCountry,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            addMoviePopup.classList.toggle('active');
            location.reload();
        }
    });
});
})

// Удалить фильм
$(document).ready(function () {
    $('#movie_delete_btn').click(function () {
        let movieName = $('#seance_movieName').val();

        $.ajax({
            url: '/delete_movie',
            type: 'POST',
            data: {
                title: movieName,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                location.reload();
            }
        });
    });
})


// 4.2
let showMovie = [...document.querySelectorAll('.conf-step__seances-movie')];
let delShowTimePopup = document.getElementById('delShowtimePopup');
let popupMovieName = document.querySelector('.popupMovieName');
let delShowTimePopupDismiss = document.getElementById('delShowTimePopupDismiss');
let showTimePopupDismiss = document.getElementById('showTimePopupDismiss');
let showTimeAdd = [...document.querySelectorAll('.conf-step__movie')];
let addShowTimePopup = document.getElementById('addShowTimePopup');
let movieName = document.querySelector('.movie_name');

//popup delete
showMovie.forEach(movie => {
    movie.addEventListener('click', () => {
        delShowTimePopup.classList.toggle('active');
        let movieName = movie.querySelector('.conf-step__seances-movie-title').textContent;
        let movieTime = movie.querySelector('.conf-step__seances-movie-start').textContent;
        let id = movie.getAttribute('data-hallShow-id');
        popupMovieName.textContent = movieName;


        $('#delete_hall_show').submit(function () {
            $.ajax({
                url: '/delete_movie_show',
                type: 'POST',
                data: {
                    movieName: movieName,
                    movieTime: movieTime,
                    hall_id: id,
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function () {
                    location.reload();

                }
            });
        })
    })
})

delShowTimePopupDismiss.addEventListener('click', function (e) {
    e.preventDefault();
    delShowTimePopup.classList.toggle('active');
})


//show add
showTimeAdd.forEach(movie => {
    movie.addEventListener('click', () => {
        console.log(movie);
        let title = movie.querySelector('.conf-step__movie-title');
        addShowTimePopup.classList.toggle('active');
        movieName.value = title.textContent;
    })
})

//close seances
showTimePopupDismiss.addEventListener('click', function (e) {
    e.preventDefault();
    addShowTimePopup.classList.toggle('active');
})

// add film
$(document).ready(function () {
    $('#seanceAddForm').submit(function (e) {
        let movieName = $('#seance_movieName').val();
        let hallId = $('#seance_hallName option:selected').val();
        let startTime = $('#seance_startTime').val();
        e.preventDefault();


        $.ajax({
            url: '/add_movie_show',
            type: 'POST',
            data: {
                hall_id: hallId,
                movie_name: movieName,
                start_time: startTime,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {
                location.reload();
                if(data) {
                    alert(data)
                }
            }
        });
    });
})


// 5 Открыть продажи
let startSales = [...document.getElementsByName('startOfSales-hall')];
let openHall = document.querySelector('.open-hall');
let startSalesBtn = document.querySelector('.startOfSalesBtn');

// start sales
startSales.forEach(radio => {
    radio.addEventListener('click', () => {
        if (radio.classList.contains('is_active')) {
            openHall.textContent = 'Зал готов к открытию: ';
            openHall.style.color = 'green';
            startSalesBtn.removeAttribute('disabled');
        }
        if (!radio.classList.contains('is_active')) {
            startSalesBtn.setAttribute('disabled', true);
            openHall.textContent = 'Сеансов нет';
            openHall.style.color = 'red';
        }
        if (radio.getAttribute('data-active') == 1) {
            openHall.textContent = 'Продажа билетов открыта: ';
            startSalesBtn.textContent = 'Закрыть продажу билетов';
        } else if (radio.getAttribute('data-active') == 0) {
            startSalesBtn.textContent = 'Открыть продажу билетов';
        }
    })
    $(document).ready(function () {
        $('#startOfSalesBtn').click(function (e) {
            if (radio.checked) {
                let hallId = $(radio).val();

                $.ajax({
                    url: '/start_of_sales',
                    type: 'POST',
                    data: {
                        id: hallId
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (data) {
                        startSalesBtn.textContent = data[0];
                        openHall.textContent = data[1];
                    },
                });
            }
        })
    })
})

// 6 Кнопка отмена
let cancelBtn = Array.from(document.querySelectorAll('.conf-step__button-regular'));

for (let x = 0; x < cancelBtn.length; x++) {
    cancelBtn[x].addEventListener('click', function (e) {
        e.preventDefault();
        location.reload(true)
    })
}

