<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShipmentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);


Route::group(['middleware' => ['jwt.verify']], function () {

Route::group(['prefix' => 'shipments'], function () {
    Route::get('/', [ShipmentController::class, 'index']);
    Route::get('/{id}', [ShipmentController::class, 'get']);
     Route::post('/', [ShipmentController::class, 'store']);
     Route::put('/{id}', [ShipmentController::class, 'update']);
     Route::delete('/{id}', [ShipmentController::class, 'destroy']);
    });
    
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('logeduser', [UserController::class, 'userInfo']);
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
