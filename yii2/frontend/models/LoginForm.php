<?php
namespace frontend\models;//这个你们写自己的命名空间，我以我的modules项目路径为例

use Yii;

use yii\base\Model;

use yii\captcha\Captcha;

class LoginForm extends Model
{
    public $verifyCode;

    public function rules()
    {
        return [
            ['verifyCode', 'required'],
            ['verifyCode', 'captcha'],
        ];
    }
}

?>