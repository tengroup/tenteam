<?php
namespace frontend\controllers;
use Yii;
use yii\data\Pagination;
use frontend\models\Users;

/*
 *  @U+           管理中心文章处理程序文件
 *  @User：       用户管理
 *  @Author:      桃子
 *  @Time         2016-05-17
*/
class UserController extends \yii\web\Controller
{
    /*------------------------------------------------------ */
	//右侧
    /*------------------------------------------------------ */
   public function actionIndex(){
        /*  分页展示  */
        $sql1="select count(u_id) as count from users";
        $result = Yii::$app->db->createCommand($sql1);
        $m= $result->queryOne();
        //var_dump($m['count']);die;
        $num=3;
        $pagecount=ceil($m['count']/$num);
        //echo $pagecount;die;$_GET[

        isset($_GET['page'])?$page=($_GET['page']):$page=1;
        $start=($page-1)*$num;
        $sql2="select * from users limit $start,$num";
        //echo $sql2;die;
        $result = Yii::$app->db->createCommand($sql2);
        $data= $result->queryAll();
        //var_dump($str);die;
        $up_page=$page-1<1?1:$page-1;
        $down_page=$page+1>$pagecount?$pagecount:$page+1;
        
        $str="<div class='pull-left'>共<i>".$m['count']."</i>条记录";
        $str.="</div>";
        $str.="<div class='pull-right'>";
        $str.="<a class='pre' href='index.php?r=user/index&page=$up_page'>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
        
        $str.="&nbsp;&nbsp;&nbsp;&nbsp;<a class='after' href='index.php?r=user/index&page=$down_page'>下一页</a>";
        $str.="</div>";
       return $this->renderPartial('yh_list.html',['lists'=>$data,'page'=>$str]);
   }

    /*------------------------------------------------------ */
    //删除用户
    /*------------------------------------------------------ */
    public function actionDelete(){
        $id=$_GET['id'];
        $del= Yii :: $app->db->createCommand()->delete('users',"u_id=$id")->execute();
        if($del){
            return $this->redirect(['user/index']);
        }else{
            return $this->redirect(['user/index']);
        }
    }

    /*------------------------------------------------------ */
    //搜索
    /*------------------------------------------------------ */
    public function actionSearch(){
        $search=$_GET['search'];
        $aa= Yii :: $app->db;
        $bb= $aa ->createCommand("select * from users where u_name like '%$search%'");
        $cc= $bb->queryAll();
        return $this->renderPartial('yh_lists.html',['search'=>$cc]);
    }

    /*------------------------------------------------------ */
    //批删
    /*------------------------------------------------------ */
    public function actionDeletes(){
        $id=$_GET['id'];
        $delAll= Yii :: $app->db->createCommand()->delete('users',"u_id in ($id)")->execute();
        if($delAll){
            return $this->redirect(['user/index']);
        }else{
            return $this->redirect(['user/index']);
        }
    }
}
