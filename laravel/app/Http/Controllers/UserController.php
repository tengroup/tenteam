<?php

namespace App\Http\Controllers;
use App\Http\Requests;
use Session;
use Cookie;
use DB,Input,Redirect,url,Validator,Request;

/**
 *
 *
 */
class UserController extends Controller
{
    public function index()
    {
    	return view("user/shortCodes");
    }
    //个人信息
    public function personal()
    {
        $type=1;
        $uId=19;
        /**
         *     判断登陆人，查询不同
         */
        if($type==1){
            $user = DB::table('users')->where('u_id', "$uId")->first();
            $pre = DB::table('preplot')->join("house","preplot.h_id","=","house.h_id")->join("f_users","f_users.u_id","=","house.u_id")->where('preplot.u_id', "$uId")->paginate($perPage = 3, $columns = ['*'], $pageName = 'page', $page = null);
            return view("user/personal",["user"=>$user,'pre'=>$pre]);
        }else{
            $user = DB::table('f_users')->where('u_id', "$uId")->first();
            return view("user/fang-personal",["user"=>$user]);
        }
    }
    //编辑个人信息页面
    public function perEdit()
    {
        $type=1;
        $uId=19;
        /**
         *     判断登陆人，查询不同
         */
        if($type==1){
            $user = DB::table('users')->where('u_id', "$uId")->first();
            $pre = DB::table('preplot')->join("house","preplot.h_id","=","house.h_id")->join("f_users","f_users.u_id","=","house.u_id")->where('preplot.u_id', "$uId")->paginate($perPage = 3, $columns = ['*'], $pageName = 'page', $page = null);
            return view("user/per-edit",array("user"=>$user,'pre'=>$pre));
        }else{
            $user = DB::table('f_users')->where('u_id', "$uId")->first();
            return view("user/fangper-edit",["user"=>$user,'type'=>$type]);
        }
    }
    //修改个人信息
    public function perEditSubmit()
    {
        $type=1;
        $uId=Request::input('u_id');
        $name=Request::input('u_name');
        $petName=Request::input("pet_name");
        $realName=Request::input("real_name");
        $email=Request::input("u_email");
        $tel=Request::input("u_tel");
        /**
         *     判断登陆人，修改不同
         */
        if($type==1){
            $idCard=Request::input("id_card");
            $upd=DB::table("users")->where("u_id",'=',"$uId")->update(
                array(
                    'u_name' => "$name",
                    'pet_name' => "$petName",
                    'real_name' => "$realName",
                    'u_email' => "$email",
                    'u_tel' => "$tel",
                    'id_card' => "$idCard"
                    )
                );
        }else{
            $idCard=Request::input("u_card");
            $upd=DB::table("f_users")->where("u_id",'=',"$uId")->update(
                array(
                    'u_name' => "$name",
                    'pet_name' => "$petName",
                    'real_name' => "$realName",
                    'u_email' => "$email",
                    'u_tel' => "$tel",
                    'u_card' => "$idCard"
                    )
                );
        }
        
        if($upd){
            return Redirect::to("personal");
        }else{
            return Redirect::to("personal");
        }
    }
    //查看预约信息
    public function perLook()
    {
        $uId=Request::get('id');
        $oneMess=DB::table('preplot')->join("house","preplot.h_id","=","house.h_id")->join("f_users","f_users.u_id","=","house.u_id")->join("images","images.h_id","=","house.h_id")->where('house.h_id', "$uId")->first();
        return view("home/single",['list'=>$oneMess]);
    }
    //房源添加
    public function fyAdd()
    {
    	return view("user/fyAdd");
    }
    //预约列表
    public function appointment()
    {
    	return view("user/appointment");
    }
}
