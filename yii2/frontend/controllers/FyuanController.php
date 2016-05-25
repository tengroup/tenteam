<?php

namespace frontend\controllers;
use Yii;
//use frontend\models\House;

/**
 *  @U+           管理中心文章处理程序文件
 *  @Fyuan：       房源管理
 *  @Author:      赵文杰
 *  @Time         2016-05-17
 */
class FyuanController extends \yii\web\Controller
{
    /**
     * 房源列表展示
     */
    public function actionIndex(){
        $sql1="select count(h_id) as count from house";
        $result = Yii::$app->db->createCommand($sql1);
        $m= $result->queryOne();
        //var_dump($m['count']);die;
        $num=3;
        $pagecount=ceil($m['count']/$num);
        //echo $pagecount;die;
        isset($_GET['page'])?$page=$_GET['page']:$page=1;
        $start=($page-1)*$num;
        $sql2="select * from house inner join users on house.u_id=users.u_id inner join house_type on house.t_id=house_type.t_id limit $start,$num";
        //echo $sql2;die;
        $result = Yii::$app->db->createCommand($sql2);
        $data= $result->queryAll();
        //var_dump($str);die;
        $up_page=$page-1<1?1:$page-1;
        $down_page=$page+1>$pagecount?$pagecount:$page+1;

        $str="<div class='pull-left'>共<i>".$m['count']."</i>条记录";
        $str.="</div>";
        $str.="<div class='pull-right'>";
        $str.="<a class='pre' href='index.php?r=fyuan/index&page=$up_page'>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
        
        $str.="&nbsp;&nbsp;&nbsp;&nbsp;<a class='after' href='index.php?r=fyuan/index&page=$down_page'>下一页</a>";
        $str.="</div>";
        return $this->renderPartial('fy_list.html',['data'=>$data,'page'=>$str]);
    }
    /**
     * 单删
     */
    public function actionDel(){
        $id=$_GET['id'];
        $sql="delete from house where h_id in($id)";
        $result = Yii::$app->db->createCommand($sql);
        $re= $result->query();
        if($re){
            echo 1;
        }
    }

    /**
     * 更改状态
     */
    public function actionCheck_hot(){
        $id=$_GET['id'];
        $lock=$_GET['lock'];
        if($_GET['act']=='hot'){
            if($lock==0){
                $sql="update house set is_hot=1 where h_id=$id";
            }else{
                $sql="update house set is_hot=0 where h_id=$id";
            }
            $result= Yii::$app->db->createCommand($sql);
            $re=$result->query();
            if($re){
                echo 1;
            }
        }else if($_GET['act']=='best'){
            if($lock==0){
                $sql="update house set is_best=1 where h_id=$id";
            }else{
                $sql="update house set is_best=0 where h_id=$id";
            }
            $result= Yii::$app->db->createCommand($sql);
            $re=$result->query();
            if($re){
                echo 1;
            }
        }else if($_GET['act']=='cheap'){
            if($lock==0){
                $sql="update house set is_cheap=1 where h_id=$id";
            }else{
                $sql="update house set is_cheap=0 where h_id=$id";
            }
            $result= Yii::$app->db->createCommand($sql);
            $re=$result->query();
            if($re){
                echo 1;
            }
        }

    }

    /**
     * 详细信息
     */
    public function actionFy_more(){
        $id=$_GET['id'];
        $sql="select * from house inner join users on house.u_id=users.u_id inner join house_type on house.t_id=house_type.t_id where h_id=$id";

        $result= Yii::$app->db->createCommand($sql);
        $data=$result->queryOne();
        //图
        $sqls="select * from images where h_id=$id limit 4";
        $result= Yii::$app->db->createCommand($sqls);
        $res=$result->queryAll();
        //var_dump($res);die;
        return  $this->renderPartial('fy_list_more.html',['data'=>$data,'res'=>$res]);
    }
    /**
     * 搜索
     */
    public function actionSh(){
        $id=$_GET['id'];
        if($_GET['act']=='pass'){
            $sql="update house set status=1 where h_id=$id";

        }else{
            $sql="update house set status=2 where h_id=$id";
        }
        $result= Yii::$app->db->createCommand($sql);
        $re=$result->query();
        if($re){
            echo 1;
        }
    }

}
