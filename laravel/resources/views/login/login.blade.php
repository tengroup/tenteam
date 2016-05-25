
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Cache-Control" content="no-transform" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        会员登录- U+网
    </title>
    <meta name="description" content="U+网" />
    <meta name="keywords" content="" />
    <!--meta http-equiv="X-UA-Compatible" content="IE=8,IE=9" /-->

    <link rel="shortcut icon" href="https://staticfiles.tujia.com/PortalSite/Images/favicon.ico" type="image/x-icon" />
    <link rel="bookmark" href="https://staticfiles.tujia.com/PortalSite/Images/favicon.ico" type="image/x-icon" />


    <link rel="stylesheet" type="text/css" href="deng_zhu/css/d33abb88181b43eaa2e615410e15f586.css" />
    <script type="text/javascript" src="deng_zhu/js/jquery.js"></script>
    <script type="text/javascript" src="deng_zhu/js/tujiacodecookie.js"></script>
    <script type="text/javascript">
        var staticFileRoot = "https://staticfiles.tujia.com",
                minDate = "2016-05-17",
                maxDate = "2017-04-17",
                houseId,
                ServerDomain = "tujia.com",
                TUJIA_CLIENTID = '639a9734-7078-4d7c-bd0e-bacb4552a20b';

        var portalUrl = "http://www.tujia.com";
        var imUrl = "http://im.tujia.com";
        var customerUrl = "http://vip.tujia.com";

    </script>

    <link rel="stylesheet" type="text/css" href="deng_zhu/css/login.css" media="all" />

    <link rel="stylesheet" type="text/css" href="deng_zhu/css/im.css" />
    <script type="text/javascript" src="deng_zhu/js/jquery.js"></script>

    <script type="text/javascript" src="deng_zhu/js/f9f13a4f44584467831d03405fafb3df.js"></script>



    <script type="text/javascript">
        function qqLogin() {
            window.location = "https://passport.tujia.com/PortalSite/QQLogin?srcUrl=https%3a%2f%2fpassport.tujia.com%2fPortalSite%2fLoginPage%2f";
        }

        function sinaLogin() {
            window.location = "https://passport.tujia.com/PortalSite/SinaLogin?srcUrl=https%3a%2f%2fpassport.tujia.com%2fPortalSite%2fLoginPage%2f";
        }

        function wechatLogin() {
            window.location = "https://passport.tujia.com/PortalSite/WeChatLogin?srcUrl=https%3a%2f%2fpassport.tujia.com%2fPortalSite%2fLoginPage%2f";
        }
    </script>

    <script type="text/javascript">
        var MESSAGE_RADIO="https://staticfiles.tujia.com/PortalSite2/radio/message.wav", ORDERNOTICE_RADIO = "https://staticfiles.tujia.com/PortalSite2/radio/ordernotice.wav";
    </script>
</head>
<body>
<!--[if lt IE 8]>
<div class="ie-tips">
    <span> 您使用的IE浏览器版本较低！</span>本站已不再支持较低版本的IE浏览器，已为您启用了精简版。为了更好的体验本站内容，建议您升级<a target="_blank" href="http://www.microsoft.com/zh-cn/download/ie.aspx?q=internet+explorer">Internet Explorer浏览器</a>或安装非IE内核浏览器。请下载 <a href="http://down.360safe.com/se/360se7.1.1.556.exe" class="link-btn" target="_blank">360浏览器</a>或<a href="http://dldir1.qq.com/invc/tt/QQBrowser_Setup_Wireless.exe" class="link-btn" target="_blank">QQ浏览器</a>。</div>
<![endif]-->

<!--PASSPORT-81-30-->














<div class="wrap-large">
    <div class="banner-box">
        <a href="http://go.tujia.com/3270/?code=2016dsndly" target="_blank" rel="nofollow"><img src="deng_zhu/picture/20160503175358635.jpg" alt="" width="880" height="450" /></a>
    </div>
    <div class="sidebar-box">
        <div class="login-hd">
            <h2>会员登录</h2>
            (<a href="javascript:;" class="link-btn" data-accountIdentity="2">会员</a>
            <a href="javascript:;" class="link-btn" data-accountIdentity="8">企业客户</a>
            <a href="javascript:;" class="link-btn" data-accountIdentity="4">房东</a>
            <a href="javascript:;" class="link-btn" data-accountIdentity="1">业主</a>)
        </div>
        <div class="login-tab">
            <a href="#usernamepwdLoginContainer" class=current><i class="icon-radio"></i>普通登录</a>
            <a href="#smscodeLoginContainer" class=><i class="icon-radio"></i>手机动态密码登录</a>
        </div>
        <div class="login-cont">
            <div class="lgoin-group" style=display:block id="usernamepwdLoginContainer">
                <div class="error-info" data-error="" data-eleid="username" style=display:none><i class="icon-hint"></i><span></span></div>
                <form action="https://passport.tujia.com/PortalSite/Login" method="post" id="userloginform">
                    <input type="hidden" name="accountIdentity" value="2" />

                    <div class="control-group">
                        <div class="controls">
                            <label for="username">
                                <input class="ipt-text" id="username" name="username" type="text" value="" autocomplete="off" />
                                <span class="text-watermark">邮箱/手机号/用户名</span>
                            </label>
                        </div>
                    </div>
                    <input type="text" style="display:none" />
                    <div class="control-group">
                        <div class="controls">
                            <label for="pwd">
                                <input class="ipt-text" id="pwd" name="pwd" type="password" value="" autocomplete="off" />
                                <span class="text-watermark">密码</span>
                            </label>

                        </div>
                    </div>

                    <div class="control-group verifycode-group">
                        <div class="controls">
                            <input class="ipt-text verify-text" data-message="请输入验证码" id="verifycode" name="verifycode" type="text" value="" />
                            <img id="verifyImage" src="deng_zhu/picture/code.gif" alt="看不清楚，换一张" class="verify-image">
                            <a id="verifyImageLink" href="javascript:void(0)" class="change-rand">看不清，换一张</a>
                        </div>
                    </div>

                    <div class="control-group t-control-group">
                        <label for="saveUserLongTime">
                            <input type="checkbox" class="check-btn" id="saveUserLongTime" />保存登录状态2周<input type="hidden" name="userExpiresHours" id="userExpiresHours" value="">
                        </label>
                        <a href="/PortalSite/FetchPassword" class="forget-pwd">忘记密码？</a>
                    </div>
                    <div class="control-group button-group">
                        <input type="submit" value="登录" title="登录" class="login-btn" />
                    </div>
                </form>
            </div>



            <div class="lgoin-group" style=display:none id="smscodeLoginContainer">
                <div id="smsLoginErrorTip" class="error-info" data-eleid="Mobile" data-error="" style="display:none;"><i class="icon-hint"></i><span></span></div>
                <form action="https://passport.tujia.com/PortalSite/SMSCodeLogin" method="post" id="smsCodeloginform">
                    <input id="source" name="source" type="hidden" value="http://www.tujia.com" />
                    <input type="hidden" name="accountIdentity" value="2"/>
                    <div class="control-group">
                        <div class="controls">
                            <label for="Mobile">
                                <input class="ipt-text" id="Mobile" name="Mobile" type="text" value="" autocomplete="off" maxlength="11" />
                                <span class="text-watermark">请输入手机号</span>
                            </label>
                        </div>
                    </div>
                    <div class="control-group verifycode-group" style="" id="verifyImageContainer">
                        <div class="controls">
                            <input class="ipt-text verify-text" data-message="请输入验证码" id="verifyCodePic" name="verifyCodePic" type="text" value="" maxlength="4" />
                            <img id="smsverifyImage" src="deng_zhu/picture/b64e08b897dd45c790ef308d18433e70.gif" alt="看不清楚，换一张" class="verify-image">
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <label for="username">
                                <input class="ipt-text pwd-text" id="smsCode" name="smsCode" type="text" value="" autocomplete="off" maxlength="4" />
                                <span class="text-watermark" style="width:125px">动态密码</span>
                            </label>
                            <input type="button" id="btnGetVerifyCode" value="获取动态密码" class="verify-btn" />
                        </div>
                    </div>
                    <span id="errorMsgCode"></span>
                    <div class="control-group t-control-group">
                        <label for="smssaveUserLongTime">
                            <input type="checkbox" class="check-btn" id="smssaveUserLongTime" />保存登录状态2周
                            <input type="hidden" name="userExpiresHours" value="">
                        </label>

                    </div>
                    <div class="control-group button-group">
                        <input type="submit" value="登录" title="登录" class="login-btn" />
                    </div>
                </form>
            </div>

            <div class="column-box"><a href="/PortalSite/Register">我要注册！</a>注册立送<span class="h-text">100元</span>+1000积分(抵<span class="h-text">10元</span>)</div>
        </div>
        <div class="coagent-cont">
            <div class="coagent-tit"><span>合作网站账号登录</span></div>
            <div class="link-btn-cont">
                <a href="javascript:;" id="qqLogin" title="QQ账户登录" onclick="qqLogin();return false;"  class="qq-login-btn">QQ</a>
                <a href="javascript:;" id="sinaLogin" title="新浪微博账户登录" onclick="sinaLogin();return false;" class="sian-login-btn">新浪微博</a>
                <a href="javascript:;" id="" title="微信账户登录" onclick="wechatLogin();return false;" class="weixin-login-btn">微信</a>
            </div>
        </div>
    </div>
</div>
<div class="clear"></div>



<div class="m-footer-link-list">
    <a href="http://content.tujia.com/tujiajianjie.htm" target="_blank" class="forst" rel="nofollow">关于我们</a>|
    <a href="http://content.tujia.com/youkebangzhu.htm" target="_blank" rel="nofollow">我是房客</a>|
    <a href="http://content.tujia.com/qiyewenhua.htm" target="_blank" rel="nofollow">加入途家</a>|
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
            TUJIA_CLIENTID = 'f83370bc-810c-4111-a4b5-97f265608b67';

    var portalUrl = "http://www.tujia.com";
    var favoriteUrl = "http://vip.tujia.com";
    var customerUrl =  "http://vip.tujia.com";
    var imUrl = "http://im.tujia.com";

</script>



<script type="text/javascript">
    var currentPage = "login";

    // 初始化验证码
    var verifyimagesrc = 'deng_zhu/picture/b64e08b897dd45c790ef308d18433e70.gif?r=' + Math.random();
    $("#verifyImage").attr("src", verifyimagesrc);

    // 更改验证码
    $("#verifyImage,#verifyImageLink,#smsverifyImage").click(function () {
        var verifyimagesrc = 'https://passport.tujia.compicture/b64e08b897dd45c790ef308d18433e70.gif?r=' + Math.random();
        if(this.id == "smsverifyImage"){
            $(this).attr("src", verifyimagesrc);
        }
        else{
            $("#verifyImage").attr("src", verifyimagesrc);
        }

        return false;
    });

    $("#saveUserLongTime,#smssaveUserLongTime").click(function () {
        var nextInput = $(this).next("input");
        if (this.checked) {
            nextInput.val(350);
        } else {
            nextInput.val("");
        }
    });

    // $("#footer").parent(.attr("id", "SmplifyFooter");
    $('#username,#pwd,#Mobile,#smsCode').focus(function () {
        $(this).next().hide();
    }).blur(function () {
        if ($.trim($(this).val()) == "") {
            $(this).next().show();
        }
    });

    //fix bug 11269
    $(function(){
        if($('#username').val() !== "" || $("#pwd").val() !== ""){
            $('#username').focus();
            $("#pwd").focus();
        }
        /*fix bug 25492 chrome 记住密码导致文字重复*/
        var $pwd = $('<input type="password" style="display:none">');
        $("#pwd").before($pwd);
        setTimeout(function(){
            $pwd.remove();
        },5000);

    });
</script>
<script type="text/javascript" src="deng_zhu/js/d974b20b68424a82a0773d1a3f033c1a.js"></script>



</body>
</html>
