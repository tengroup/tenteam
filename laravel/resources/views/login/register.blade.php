
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Cache-Control" content="no-transform" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        会员注册- U+网
    </title>
    <meta name="description" content="
" />
    <meta name="keywords" content="
" />
    <!--meta http-equiv="X-UA-Compatible" content="IE=8,IE=9" /-->
    <meta property="qc:admins" content="27330065376452116375" />
    <meta property="wb:webmaster" content="791d1c6849c2b026" />
    <link rel="stylesheet" type="text/css" href="deng_zhu/css/7511ef431ed0461d8e605a9fb9851dc9.css" />
    <link rel="stylesheet" type="text/css" href="deng_zhu/css/register.css" media="all" />
    <script type="text/javascript" src="deng_zhu/js/tujiacodecookie.js"></script>

    <link rel="stylesheet" type="text/css" href="deng_zhu/css/im.css" />
    <script type="text/javascript" src="deng_zhu/js/jquery.js"></script>

    <script type="text/javascript" src="deng_zhu/js/9aedf1043216457dbd104e70cd5a7180.js"></script>

    <script type="text/javascript">
        function qqLogin() {
            window.location = "https://passport.tujia.com/PortalSite/QQLogin?srcUrl=https://passport.tujia.com/PortalSite/Register/";
        }

        function sinaLogin() {
            window.location = "https://passport.tujia.com/PortalSite/SinaLogin?srcUrl=https://passport.tujia.com/PortalSite/Register/";
        }
    </script>

    <script type="text/javascript">
        var MESSAGE_RADIO="https://staticfiles.tujia.com/PortalSite2/radio/message.wav", ORDERNOTICE_RADIO = "https://staticfiles.tujia.com/PortalSite2/radio/ordernotice.wav";
    </script>
</head>
<body>





<div class="wrap-large" id="registerMainWrap">
    <div class="column-wrap">

        <div class="main-box">

            <div class="my-form-wrap">
                <form action="/PortalSite/Register" autocomplete="off" id="registerForm" method="post"><input id="RefUrl" name="RefUrl" type="hidden" value="https://passport.tujia.com/PortalSite/Register/" />
                    <input id="Source" name="Source" type="hidden" value="" />
                    <input id="EncryptMobile" name="EncryptMobile" type="hidden" value="" />
                    <div class="control-group">
                        <label class="controls-label" for="Mobile"><b>*</b>手机号：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-regex="您输入的手机号格式不正确" data-val-regex-pattern="^1\d{10,10}$" data-val-required="手机号不能为空" id="Mobile" maxlength="11" name="Mobile" type="text" value="" /> <span id="errorMsgMobile"></span>

                        </div>
                    </div>

                    <div class="control-group" id="verifyImageContainer" >
                        <label class="controls-label"><b>*</b>验证码：</label>
                        <div class="controls">
                            <input class="ipt-text-verify verification" data-message="请输入验证码" id="verifyCodePic" maxlength="4" name="verifyCodePic" type="text" value="" />
                            <img src="deng_zhu/picture/45c5acbeb8364819942792aed35088db.gif" class="verify-image" id="VerifyImage" title="看不清？点击换一个" onclick="javascript:document.getElementById('VerifyImage').src='deng_zhu/picture/45c5acbeb8364819942792aed35088db.gif?r='+Math.random();return false;">
                        </div>
                    </div>
                    <!--<div class="control-group">
                        <label class="controls-label"><b>*</b>手机验证码：</label>
                        <div class="controls">
                            <input class="ipt-text-verify verification" data-message="请输入验证码" data-val="true" data-val-required="验证码不能为空" id="verifycode" maxlength="4" name="verifycode" type="text" value="" />
                            <span id="errorMsgCode">

                            </span>
                            <input id="btnGetVerifyCode" type="button" value="获取手机语音验证码" class="verify-code-btn" />
                            <span class="lab-text">手机验证成功，可获得<b class="h-text">200</b>积分，抵<b class="h-text">2元</b>订金</span>
                        </div>
                        <div class="controls" style="display:none;">
                            <span class="lab-text"></span>
                        </div>
                    </div>-->
                    <div class="control-group">
                        <label class="controls-label" for="Password"><b>*</b>登录密码：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-length="请输入长度为6到16的密码" data-val-length-max="16" data-val-length-min="6" data-val-required="请输入密码" id="Password" name="Password" type="password" />
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="controls-label"><b>*</b>确认密码：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-equalto="两次输入的密码必须一致" data-val-equalto-other="*.Password" data-val-length="请输入长度为6到16的密码" data-val-length-max="16" data-val-length-min="6" id="Repwd" name="Repwd" type="password" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="controls-label">邀请码：</label>
                        <div class="controls">
                            <input class="ipt-text-verify" data-val="true" data-val-number="字段 FromId 必须是一个数字。" id="FromId" name="FromId" type="text" value="" />
                            <span>使用好友给您的邀请码注册（选填）</span>

                        </div>
                    </div>

                    <div class="control-group">
                        <label class="controls-label">常用邮箱：</label>
                        <div class="controls">
                            <label for="Email" class="lab-cont">
                                <input class="ipt-text" data-val="true" data-val-regex="电子邮件地址无效" data-val-regex-pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}" id="Email" name="Email" type="text" value="" />
                                <span class="text-watermark">可作为登录账号</span>
                            </label>

                            <span class="lab-text">填写邮箱，并通过验证，可获得<b class="h-text">800</b>积分，抵<b class="h-text">8元</b>订金</span>
                        </div>
                    </div>
                    <div class="control-group agree-group">
                        <div class="controls">
                            <label for="chkFW">
                                <input id="chkFW" type="checkbox" checked="checked" /><a href="http://content.tujia.com/Clause/index.htm" target="_blank" class="link-btn">《途家网服务协议》</a>
                            </label>
                        </div>
                    </div>



                    <div class="control-group submit-group" id="submitWrap">
                        <div class="controls">
                            <input id="registerSumbit" type="submit" value="注册" title="注册" onclick="return checkValid();" class="register-btn" />
                            <input id="registerGoing" type="button" value="注册中" title="注册中" class="register-btn" style="display: none;" />
                        </div>
                    </div>

                </form>
            </div>
        </div>
        <div class="sidebar-box">
            <img src="deng_zhu/picture/registerinfo.jpg" style="display:block; margin-top:86px;" />

        </div>
    </div>
    <div id="validateArea" class="dn">
        <span data-for="verifycode"></span>
        <span data-for="Mobile"></span>
        <span data-for="Email"></span>
        <span data-for="Password"></span>
        <span data-for="Repwd"></span>
        <span data-for="EnterpriceCode"></span>
    </div>
</div>



<div class="m-footer-link-list">
    <a href="http://content.tujia.com/tujiajianjie.htm" target="_blank" class="forst" rel="nofollow">关于我们</a>|
    <a href="http://content.tujia.com/youkebangzhu.htm" target="_blank" rel="nofollow">我是房客</a>|
    <a href="http://content.tujia.com/qiyewenhua.htm" target="_blank" rel="nofollow">加入U+</a>|
    <a href="http://www.tujia.com/SiteMap/UnitDestination" target="_blank">网站地图</a>|
    <a href="http://www.tujia.com/SiteMap/Default" target="_blank">城市地图</a>
</div>







<script type="text/javascript">
    var staticFileRoot = "https://staticfiles.tujia.com",
            minDate = "2016-05-17",
            mindate =  new Date(2016,4,17),
            maxDate = "2016-11-13",
            maxdate= new Date(2016,10,13),
            houseId,
            ServerDomain = "tujia.com",
            TUJIA_CLIENTID = '8827b564-3661-43bb-8b6e-b677ff091f3e';

    var portalUrl = "http://www.tujia.com";
    var favoriteUrl = "http://vip.tujia.com";
    var customerUrl =  "http://vip.tujia.com";
    var imUrl = "http://im.tujia.com";

</script>


<script type="text/javascript">
    var currentPage = "register";
    var cookieName = 'tujia.com_PortalContext_' + "vcm";

    function checkValid() {
        if (!$("#chkFW").attr("checked")) {
            alert("请先勾选《途家网服务协议》");
            return false;
        }
        return true;
    }

</script>
<script type="text/javascript" src="deng_zhu/js/2b7f22ab59df478598c2fae59e32a200.js"></script>



</body>
</html>
