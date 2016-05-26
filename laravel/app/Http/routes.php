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
<<<<<<< HEAD
=======

>>>>>>> 099f93a127d6bf876a4cd0a8df6fd6d58cf9ff31

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
Route::any('addhoust','UserController@addHoust');
Route::any('video','UserController@videoDo');
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
Route::get('fuwutiaokuan','LoginController@fuwutiaokuan');
Route::any('registerpro','LoginController@registerPro');


//login
Route::get('login','LoginController@login');
Route::get('login/loginout','LoginController@loginOut');
Route::get('dynamic','LoginController@dynamic');        //ajax获取动态密码
Route::any('login_pro1','LoginController@loginPro1');    //账号登录
Route::any('loginpro2','LoginController@loginPro2');    //手机登录