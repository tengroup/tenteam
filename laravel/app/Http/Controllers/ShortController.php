<?php

namespace App\Http\Controllers;

class UserController extends Controller
{
    public function index()
    {
    	return view("user/shortCodes");
    }
    public function fyAdd()
    {
    	return view("user/fyAdd");
    }
}
