<?php

namespace frontend\controllers;
use Yii;

/**
 *  @U+           管理中心文章处理程序文件
 *  @Fdong：       房东管理
 *  @Author:      张龙
 *  @Time         2016-05-17
 */
class FdongController extends \yii\web\Controller
{
	/**
     * 定义全局变量
     */
	public $enableCsrfValidation = false;
	/**
     * 右侧
     */
	public function actionIndex(){
		$comm = Yii::$app->db->createCommand("SELECT count(*) from f_users");
        $pos = $comm->queryOne();
		$tiao = 4;
		$ye = ceil($pos['count(*)']/$tiao);
		$page = isset($_GET['p'])?$_GET['p']:1;
		$limit = ($page-1)*$tiao;
		$command = Yii::$app->db->createCommand("SELECT * FROM f_users limit $limit,$tiao");
        $posts = $command->queryAll();
        $pages = $page+1;
        $pageos = $page-1;
        if($pages>$ye){
        	$pages=$ye;
        }
        if($pageos<=1){
        	$pageos=1;
        }

        //var_dump($posts);die;
        return $this->renderPartial('fd_list.html',array('data'=>$posts,'num'=>$pos['count(*)'],'ye'=>$ye,'pages'=>$pages,'pageos'=>$pageos));
	}
    
    /**
     *	ajax搜索、分页
     */
    public function actionReplacelist()
    {
    	$userName = isset($_GET['userName'])?$_GET['userName']:NULL;
    	if($userName==NULL){
    		$comm = Yii::$app->db->createCommand("SELECT count(*) from f_users");
	        $pos = $comm->queryOne();
			$tiao = 4;
			$ye = ceil($pos['count(*)']/$tiao);
			$page = isset($_GET['p'])?$_GET['p']:1;
			$limit = ($page-1)*$tiao;
			$command = Yii::$app->db->createCommand("SELECT * FROM f_users limit $limit,$tiao");
		}else{
			$comm = Yii::$app->db->createCommand("SELECT count(*) from f_users WHERE u_name like '$userName'");
	        $pos = $comm->queryOne();
			$tiao = 4;
			$ye = ceil($pos['count(*)']/$tiao);
			$page = isset($_GET['p'])?$_GET['p']:1;
			$limit = ($page-1)*$tiao;
			$command = Yii::$app->db->createCommand("SELECT * FROM f_users WHERE u_name like '$userName' limit $limit,$tiao");
		}
    	//var_dump($userName);die;
    	
        $posts = $command->queryAll();
        $pages = $page+1;
        $pageos = $page-1;
        if($pages>$ye){
        	$pages=$ye;
        }
        if($pageos<=1){
        	$pageos=1;
        }
        //var_dump($posts);die;
        return $this->renderPartial('replacelist.html',array('data'=>$posts,'num'=>$pos['count(*)'],'ye'=>$ye,'pages'=>$pages,'pageos'=>$pageos));
    }

    /**
     *	ajax删除、分页、搜索
     */
    public function actionDeletelist()
    {
    	$userName = isset($_GET['userName'])?$_GET['userName']:NULL;
    	$userId = Yii::$app->request->get('userId');
    	//echo $userId;
    	$delAll = Yii::$app->db->createCommand()->delete('f_users', array('u_id' => $userId))->execute();
    	if ($delAll) {
    		$userName = isset($_GET['userName'])?$_GET['userName']:NULL;
	    	if($userName==NULL){
	    		$comm = Yii::$app->db->createCommand("SELECT count(*) from f_users");
		        $pos = $comm->queryOne();
				$tiao = 4;
				$ye = ceil($pos['count(*)']/$tiao);
				$page = isset($_GET['p'])?$_GET['p']:1;
				$limit = ($page-1)*$tiao;
				$command = Yii::$app->db->createCommand("SELECT * FROM f_users limit $limit,$tiao");
			}else{
				$comm = Yii::$app->db->createCommand("SELECT count(*) from f_users WHERE u_name like '$userName'");
		        $pos = $comm->queryOne();
				$tiao = 4;
				$ye = ceil($pos['count(*)']/$tiao);
				$page = isset($_GET['p'])?$_GET['p']:1;
				$limit = ($page-1)*$tiao;
				$command = Yii::$app->db->createCommand("SELECT * FROM f_users WHERE u_name like '$userName' limit $limit,$tiao");
			}
	    	//var_dump($userName);die;
	    	
	        $posts = $command->queryAll();
	        $pages = $page+1;
	        $pageos = $page-1;
	        if($pages>$ye){
	        	$pages=$ye;
	        }
	        if($pageos<=1){
	        	$pageos=1;
	        }
	        //var_dump($posts);die;
	        return $this->renderPartial('replacelist.html',array('data'=>$posts,'num'=>$pos['count(*)'],'ye'=>$ye,'pages'=>$pages,'pageos'=>$pageos));
    		# code...
    	} else {
    		$userName = isset($_GET['userName'])?$_GET['userName']:NULL;
	    	if($userName==NULL){
	    		$comm = Yii::$app->db->createCommand("SELECT count(*) from f_users");
		        $pos = $comm->queryOne();
				$tiao = 4;
				$ye = ceil($pos['count(*)']/$tiao);
				$page = isset($_GET['p'])?$_GET['p']:1;
				$limit = ($page-1)*$tiao;
				$command = Yii::$app->db->createCommand("SELECT * FROM f_users limit $limit,$tiao");
			}else{
				$comm = Yii::$app->db->createCommand("SELECT count(*) from f_users WHERE u_name like '$userName'");
		        $pos = $comm->queryOne();
				$tiao = 4;
				$ye = ceil($pos['count(*)']/$tiao);
				$page = isset($_GET['p'])?$_GET['p']:1;
				$limit = ($page-1)*$tiao;
				$command = Yii::$app->db->createCommand("SELECT * FROM f_users WHERE u_name like '$userName' limit $limit,$tiao");
			}
	    	//var_dump($userName);die;
	    	
	        $posts = $command->queryAll();
	        $pages = $page+1;
	        $pageos = $page-1;
	        if($pages>$ye){
	        	$pages=$ye;
	        }
	        if($pageos<=1){
	        	$pageos=1;
	        }
	        //var_dump($posts);die;
	        return $this->renderPartial('replacelist.html',array('data'=>$posts,'num'=>$pos['count(*)'],'ye'=>$ye,'pages'=>$pages,'pageos'=>$pageos));
    		# code...
    	}
    	
    	// Customer::deleteAll('age > :age AND gender = :gender', [':age' => 20, ':gender' => 'M']);

    }
}
