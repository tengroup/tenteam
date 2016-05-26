<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
// index 首页
Route::get('/', function () {
    return view('welcome');
});
//index 首页
Route::get('index','HomeController@index');


//single  详情页
Route::get('single','HomeController@single');



//events
Route::get('events','EventsController@index');
// 更新
Route::get('events','EventsController@lists');
//查看今日信息的详情页
Route::get('events/more','EventsController@more');


//shortCodes
Route::get('shortCodes','UserController@index');
//personal  个人信息
Route::get('personal','UserController@personal');
//per_edit  编辑个人信息
Route::get('perEdit','UserController@perEdit');
//perEditSubmit  提交修改个人信息
Route::post('perEditSubmit','UserController@perEditSubmit');
//fyAdd  房源添加
Route::get('fyAdd','UserController@fyAdd');
//appointment  预约列表
Route::get('appointment','UserController@appointment');
//perLook  查看预约信息
Route::get('perLook','UserController@perLook');


//Message
Route::get('message','MessageController@index');


//short  短租
Route::get('short','TypeController@short');
//long  长租
Route::get('long','TypeController@long');


//register
Route::get('register','LoginController@register');

//login
Route::get('login','LoginController@login');

