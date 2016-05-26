<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use DB,Request;


/*
 * $Author:董梦桃
 * $Id:EventsController.php 2016-05-21 8:26 dongmengtao
 */

class EventsController extends Controller
{
    //展示今日更新页面
    public function index()
    {
        return view('events/events');
    }
    //查询更新的房源
     public function lists()
    {
          //今天凌晨
        $endTime=date("Y-m-d 00:00:00",time());
        $time=time($endTime);

        //今天午夜
        $dayTime=$time+3600*24;
        $startDayTime=date("Y-m-d 00:00:00",$dayTime);
        $today=DB::table("house")->whereBetween('h_time', [$endTime,$startDayTime])->paginate($perPage = 3, $columns = ['*'], $pageName = 'page', $page = null);

        //三天前
        $threeTime=$time-3600*24*3;
        $startThreeTime=date("Y-m-d 00:00:00",$threeTime);
        $threedays=DB::table("house")->whereBetween('h_time', [$startThreeTime,$endTime])->paginate($perPage = 3, $columns = ['*'], $pageName = 'page', $page = null);

        //七天前
        $weekTime=$time-3600*24*7;
        $startWeekTime=date("Y-m-d 00:00:00",$weekTime);
        $weekdays=DB::table("house")->whereBetween('h_time', [$startWeekTime,$endTime])->paginate($perPage = 3, $columns = ['*'], $pageName = 'page', $page = null);

        //var_dump($threedays);die;
        return view('events/events',['arr'=>$today,'arr1'=>$threedays,'arr2'=>$weekdays]);
    }
    //点击更多,查看详细页面
    public function more(){
        $h_id= Request::get('h_id');
        $arr= DB :: table ('house')->where('h_id',$h_id)->get();
        //var_dump($arr);die;
        return view('events/single')->with('arr',$arr);
    }


}
