<?php
namespace frontend\controllers;
use Yii;
use yii\web\Controller;

class IndexController extends Controller{
    //主页
    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }
}

?>


