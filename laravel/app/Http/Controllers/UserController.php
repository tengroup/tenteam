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
        $uId=$_COOKIE['u_id'];
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
        $uId=$_COOKIE['u_id'];
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
        $u_id=$_COOKIE['u_id'];
        $arr['type']=DB::table("house_type")->get();
        $arr['list'] = DB::table('house')
            ->join('house_type', 'house.t_id', '=', 'house_type.t_id')
            ->where('u_id','=',$u_id)
            ->orderBy('h_time', 'desc')
            ->paginate(5);
        //return view('user/fyAdd', ['list' => $arr]);
        return view("user/fyAdd",$arr);
    }
    /**
     * 房源添加入库
     */
    public function addHoust(){

        date_default_timezone_set('Asia/Shanghai');
        $arr=Request::all();

        $file =Request::file('files');
        ///var_dump($file );die;
        unset($arr['video']);
        unset($arr['files']);
        $arr['is_hot']=Request::get("is_hot");
        $arr['is_best']=Request::get("is_best");
        $arr['is_cheap']=Request::get("is_cheap");
        $arr['h_time']=date("Y-m-d H:i:s",time());
        $arr['u_id']=$_COOKIE['u_id'];


        $h_id=DB::table("house")->insertGetId($arr);
        if($h_id){
            //图片进行入库
            for($i=0;$i<count($file);$i++){
                $clientName = $file[$i]  ->  getClientOriginalName();
                $extension = $file[$i]->getClientOriginalExtension();
                $newName = md5(date('ymdhis').$clientName).".".$extension;
                //var_dump(public_path());
                $dir=public_path().'/houst_img/'.date('Y-m-d');
                $file[$i]->move($dir,$newName);
                $newName=date('Y-m-d').'/'.$newName;
               DB::table("images")->insert(["h_id"=>$h_id,"img"=>$newName]);
            }
            return redirect("fyAdd");
        }else{
            echo "<script>alert('添加失败哦');location.href='fyAdd'</script>";
        }

    }


}
