<?php

namespace App\Http\Controllers;

class LoginController extends Controller
{
    public function login()
    {
        return view("login/login");
    }

    public function register()
    {
        //echo 132;die;
        return view("login/register");
    }
}
