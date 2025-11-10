<?php

use App\Http\Controllers\ClientHallController;
use App\Http\Controllers\ClientIndexController;
use App\Http\Controllers\ClientPaymentController;
use App\Http\Controllers\ClientTicketController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\HallSizeController;
use App\Http\Controllers\TakenPlaceController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieShowController;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ClientIndexController::class, 'index'])->name('index');
Route::get('/hall', [ClientHallController::class, 'index'])->name('client_hall');
Route::get('/client_hall', [TakenPlaceController::class, 'update']);
Route::get('/payment', [ClientPaymentController::class, 'index'])->name('payment');
Route::get('/ticket', [ClientTicketController::class, 'index'])->name('ticket');
Route::get('qr-code-g', function () {
    QrCode::size(500)
        ->format('png')
        ->generate('www.google.com', public_path('images/qrcode.png'));
    return view('qrCode');
});

Auth::routes();

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/admin', [HallController::class, 'index'])->name('admin');
    Route::post('/delete_hall', [HallController::class, 'destroy'])->name('delete_hall');
    Route::post('/hall_add', [HallController::class, 'store']);
    Route::post('/hall_size', [HallSizeController::class, 'store'])->name('hall_size');
    Route::post('/admin/hall_chair_create/{result}', [PlaceController::class, 'store']);
    Route::post('/hall_chair', [PlaceController::class, 'update'])->name('hall_chair');
    Route::get('/admin/hall_chair_delete/{id}', [PlaceController::class, 'destroy'])->name('hall_chair_delete');

    Route::get('/show_price', [PriceController::class, 'show']);
    Route::post('/save_price', [PriceController::class, 'update']);

    Route::post('/add_movie', [MovieController::class, 'store'])->name('Movie_add');
    Route::post('delete_movie', [MovieController::class, 'destroy'])->name('Movie_delete');

    Route::post('/add_movie_show', [MovieShowController::class, 'store'])->name('add_movie_show');
    Route::post('/delete_movie_show', [MovieShowController::class, 'destroy'])->name('delete_movie_show');
    Route::post('/start_of_sales', [HallController::class, 'setActive'])->name('start_of_sales');
});

//public function index()
//{
//    $movies = Movie::all();
//
//    return view('/', compact('movies'));
//}

//Route::get('/', function () {
//    return view('welcome');
//});



//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
