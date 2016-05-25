<?php

namespace App\Http\Controllers;

class TypeController extends Controller
{
	//短租
    public function short()
    {
    	return view("type/short");
    }
    //长租
    public function long()
    {
    	return view("type/long");
    }
}
