
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Cache-Control" content="no-transform" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        会员注册--  U+网
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

    <link rel="shortcut icon" type="image/x-icon" href="deng_zhu//images/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="deng_zhu/css/base.css" media="all" />
    <link rel="stylesheet" type="text/css" href="deng_zhu/css/common.css" media="all" />



    <link rel="stylesheet" type="text/css" href="deng_zhu/css/clause.css" media="all" />
    <div class="container_24">
        <div class="grid_24" id="mininav">

        </div>
    </div>
    <div id="navWrap">
        <div class="container_24">
            <div class="grid_7">
                <div class="siteLogo"><img src="deng_zhu/images/logo.png" alt=""/></div>
            </div>
            <div class="grid_17">
                <div class="nvaBox" style="float: right;">
                    <a href="{{URl('login')}}" target="_blank">登录</a> 丨 <a href="{{URL('/')}}" target="_blank">U+网首页</a>
                </div>
            </div>
        </div>
    </div>
</head>
<body>





<div class="wrap-large" id="registerMainWrap">
    <div class="column-wrap">

        <div class="main-box">

            <div class="my-form-wrap">
                <form action="{{URL('registerpro')}}" autocomplete="off" id="registerForm" method="post" onsubmit="return checkall()"><input id="RefUrl" name="RefUrl" type="hidden" value="https://passport.tujia.com/PortalSite/Register/" />
                    <input type="hidden" name="_token" value="{{csrf_token()}}"/>
                    <input id="Source" name="Source" type="hidden" value="" />
                    <input id="EncryptMobile" name="EncryptMobile" type="hidden" value="" />
                    <div class="control-group">
                        <label class="controls-label" for="Mobile"><b>*</b>手机号：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-regex="您输入的手机号格式不正确" data-val-regex-pattern="^1\d{10,10}$" data-val-required="手机号不能为空" id="Mobile" maxlength="11" name="Mobile" type="text" value="" /> <span id="errorMsgMobile"></span>


                        </div>
                    </div>

                    <div class="control-group">
                        <label class="controls-label" for="Mobile"><b>*</b>用户名：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true"  id="u_name" name="u_name" type="text" value="" /> <span id="s_name"></span>

                        </div>
                    </div>

                    <div class="control-group">
                        <label class="controls-label" for="Mobile"><b>*</b>身份证：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-regex="您输入的身份证号格式不正确" data-val-regex-pattern="^\d{15}|\d{18}\d{17}x$" data-val-required="身份证号不能为空" id="id_card" maxlength="18" name="id_card" type="text" value="" /> <span id="s_card"></span>

                        </div>
                    </div>

                    <div class="control-group">
                        <label class="controls-label" for="Mobile"><b>*</b>昵称：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-regex="您输入的昵称格式不正确" data-val-regex-pattern="^1\d{10,10}$" data-val-required="昵称不能为空" id="pet_name" maxlength="11" name="pet_name" type="text" value="" /> <span id="s_petname"></span>

                        </div>
                    </div>

                    <div class="control-group">
                        <label class="controls-label" for="Mobile"><b>*</b>真实姓名：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-regex="您输入的格式不正确" data-val-regex-pattern="^[\u4e00-\u9fa5]{2,5}$" data-val-required="真实姓名不能为空" id="real_name" maxlength="11" name="real_name" type="text" value="" /> <span id="s_realname"></span>

                        </div>
                    </div>

                    <!--<div class="control-group" id="verifyImageContainer" >
                         <label class="controls-label"><b>*</b>验证码：</label>
                         <div class="controls">
                             <input class="ipt-text-verify verification" data-message="请输入验证码" id="verifyCodePic" maxlength="4" name="verifyCodePic" type="text" value="" />
                             <img src="deng_zhu/picture/45c5acbeb8364819942792aed35088db.gif" class="verify-image" id="VerifyImage" title="看不清？点击换一个" onclick="javascript:document.getElementById('VerifyImage').src='deng_zhu/picture/45c5acbeb8364819942792aed35088db.gif?r='+Math.random();return false;">
                         </div>
                     </div>-->
                 <!--<div class="control-group" id="tel_yzm">
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
                            <input class="ipt-text" data-val="true" data-val-length="请输入长度为6到16的密码" data-val-length-max="16" data-val-length-min="6" data-val-required="请输入密码" id="Password" name="Password" type="password" /><span id="s_pwd"></span>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="controls-label"><b>*</b>确认密码：</label>
                        <div class="controls">
                            <input class="ipt-text" data-val="true" data-val-equalto="两次输入的密码必须一致" data-val-equalto-other="*.Password" data-val-length="请输入长度为6到16的密码" data-val-length-max="16" data-val-length-min="6" id="Repwd" name="Repwd" type="password" /><span id="s_pwd1"></span>
                        </div>
                    </div>


                        <label class="controls-label" for="Password">注册用户：</label>
                        <input type="radio" name="radio" id="yong" value="0" checked="checked"/>

                        <label class="controls-label" for="Password">注册房东：</label>
                        <input type="radio" name="radio" id="fang" value="1"/>



                   <!-- <div class="control-group">
                        <label class="controls-label">邀请码：</label>
                        <div class="controls">
                            <input class="ipt-text-verify" data-val="true" data-val-number="字段 FromId 必须是一个数字。" id="FromId" name="FromId" type="text" value="" />
                            <span>使用好友给您的邀请码注册（选填）</span>

                        </div>-->

                    <div class="control-group" >
                        <label class="controls-label">常用邮箱：</label>
                        <div class="controls">
                            <label for="Email" class="lab-cont">
                                <input class="ipt-text" data-val="true" data-val-regex="电子邮件地址无效" data-val-regex-pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}" id="Email" name="Email" type="text" value="" />
                                <span class="text-watermark">可作为登录账号</span>
                            </label>

                            <span id="control-group"><span class="lab-text">填写邮箱，并通过验证，可获得<b class="h-text">800</b>积分，抵<b class="h-text">8元</b>订金</span></span>
                        </div>
                    </div>
                    <div class="control-group agree-group">
                        <div class="controls">
                            <label for="chkFW">
                                <input id="chkFW" type="checkbox"  checked/><a href="{{URL('fuwutiaokuan')}}" target="_blank" class="link-btn" >《U+网服务协议》</a>
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

        <!--大图片-->
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
            alert("请先勾选《U+网服务协议》");
            return false;
        }
        return true;
    }

</script>
<script type="text/javascript" src="deng_zhu/js/2b7f22ab59df478598c2fae59e32a200.js"></script>

<script>
    $("#fang").click(function(){
        $(".sidebar-box").attr("style",'display:none')
        $("#control-group").attr("style",'display:none')
        $("#tel_yzm").attr("style",'display:none')
    })
    $("#yong").click(function(){
        $(".sidebar-box").attr("style",'display:black')
        $("#control-group").attr("style",'display:black')
        $("#tel_yzm").attr("style",'display:black')
    })
    //用户名的验证
    function u_name(){
        var name=$('#u_name').val()
        var reg=/^[\u4e00-\u9fa5]{2,6}$/;
        if(name!=''){
            if(reg.test(name)){
                $("#s_name").html("")
                return true;
            }else{
                $("#s_name").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入2--6位汉字</font>");
                return false;
            }
        }else{
            $("#s_name").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入用户名</font>");
            return false;
        }

    }
      $("#u_name").keyup(u_name);

    //身份证验证
    function id_card(){
        var card=$('#id_card').val()
        var reg=/^(\d{15}|\d{18}|\d{17}x)$/i;
        if(card!=''){
            if(reg.test(card)){
                $("#s_card").html("")
                return true;
            }else{
                $("#s_card").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入15位或者18位纯数字或者17位数字以x结尾</font>");
                return false;
            }
        }else{
            $("#s_card").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入身份证号码</font>");
            return false;
        }
    }
    $("#id_card").keyup(id_card);

    //验证昵称
    function pet_name(){
    var pet_name=$('#pet_name').val()
    var reg=/^.{3,10}$/;
    if(pet_name!=''){
        if(reg.test(pet_name)){
            $("#s_petname").html("")
            return true;
        }else{
            $("#s_petname").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入长度不能超过10位的字符</font>");
            return false;
        }
    }else{
        $("#s_petname").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入昵称</font>");
        return false;
    }
    }
    $("#pet_name").keyup(pet_name)


    //验证真实姓名
    function real_name(){
        var name=$('#real_name').val()
        var reg=/^[\u4e00-\u9fa5]{2,4}$/;
        if(name!=''){
            if(reg.test(name)){
                $("#s_realname").html("")
                return true;
            }else{
                $("#s_realname").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入2--4位汉字</font>");
                return false;
            }
        }else{
            $("#s_realname").html("<font color='#ff4500'><img src='deng_zhu/images/msgicon.jpg'/>请输入真实姓名</font>");
            return false;
        }
    }


    function checkall(){
        if( u_name() &  id_card() & pet_name()  &  real_name()){
            return true;
        }else{
            return false;
        }

    }


</script>

</body>
</html>
