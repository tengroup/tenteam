<?php

namespace frontend\controllers;
use Yii;

use yii\web\Controller;

use yii\web\Session;

use frontend\models\LoginForm;  //XXX你们自己定义的名字

use yii\filters\AccessControl;

use yii\filters\VerbFilter;


/*
 *  @U+           管理中心文章处理程序文件
 *  @Login：       登陆管理
 *  @Author:      孙辉
 *  @Time         2016-05-17
*/
class LoginController extends \yii\web\Controller
{
    /**
     * @登陆
     */
    public function actionLogin()
    {
        $loginForm = new LoginForm();//这里要把刚才写的类new下，注意你们要引入文件路径额
        return $this->renderPartial('login.html',array('loginForm'=>$loginForm));
    }
    /**
     * @用户授权规则
     */
   /* public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'signup','login'],//这里一定要加
                'rules' => [
                    [
                        'actions' => ['login','captcha'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions'=>['logout','edit','add','del','index','users','thumb','upload','cutpic','follow','nofollow'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }*/
    /**
     * @验证码独立操作  下面这个actions注意一点，验证码调试出来的样式也许你并不满意，这里就可
     *以需修改，这些个参数对应的类是@app\vendor\yiisoft\yii2\captcha\CaptchaAction.php,可以参照这个
     *类里的参数去修改，也可以直接修改这个类的默认参数，这样这里就不需要改了
     */
    public function actions()
    {
        return [
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'maxLength' => 5,
                'minLength' => 5
            ],
        ];
    }


    /**
     *@验证用户登录信息
     */
    public function actionLogin_verify(){
        $username=isset($_POST['username'])?$_POST['username']:'';
        $whether=isset($_POST['whether'])?$_POST['whether']:'';
        $password=isset($_POST['password'])?$_POST['password']:'';
        //$password=isset($_POST['password'])?$_POST['password']:'';
        $sql="select * from admin_user where admin_user='$username'";
        $arr=Yii::$app->db->createCommand($sql)->queryOne();
        //echo $arr['pwd'].'<br>'.$password;die;
        if($arr){
            if($arr['pwd']==$password){
                if(!empty($whether)){
                    $cookies = Yii::$app->response->cookies;
                    $cookies->add(new \yii\web\Cookie([
                        'name' => $username,
                        'value' => $password,
                        'expire'=>time()+3600
                    ]));
                }
                $session = Yii::$app->session;
                $session->open();            //打开session
                $session->set('username',$username);    //存取session
                return $this->redirect(['/user/index']);
            }else{
                echo "<script>alert('密码不正确');location.href='index.php?r=login/login'</script>";
            }
        }else{
            echo "<script>alert('用户名不正确');location.href='index.php?r=login/login'</script>";
        }
    }


    /**
     * 账号的退出
     */
    public function actionQuit(){
        $session = Yii::$app->session;
        unset(Yii::$app->session['username']);
        echo "<script>alert('退出OK');location.href='index.php?r=login/login'</script>";
    }

    /**
     * 账号失焦获取相对性的密码
     */
    public function actionGain_pwd(){
        $username=$_GET['username'];
        $cookies = Yii::$app->request->cookies;//注意此处是request
        echo $language = trim($cookies->get("$username"));//设置默认值
    }


}
