<!DOCTYPE HTML>
<html>
<head>
	<title>U+</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="keywords" content="" />
	<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
	<!-- Custom Theme files -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
	<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
	<!-- js -->
	<script src="js/jquery-1.11.1.min.js"></script>
	<!-- //js -->
	<!-- animation-effect -->
	<link href="css/animate.min.css" rel="stylesheet">
	<script src="js/wow.min.js"></script>
	<script>
	 new WOW().init();
	</script>
	<!-- //animation-effect -->
	<link href='http://fonts.useso.com/css?family=Alex+Brush' rel='stylesheet' type='text/css'>
	<link href='http://fonts.useso.com/css?family=Cabin:400,400italic,500,500italic,600,600italic,700,700italic' rel='stylesheet' type='text/css'>
</head>

<body>

<!--引用公用头部信息-->
@include ("commonality.head");

<!-- banner1 -->
	<div class="banner1">
		<div class="container">
		</div>
	</div>
<!-- //banner1 -->
<!--typography-page -->
	<div class="typo">
		<div class="container">
			<div class="grid_3 grid_5 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
				<h3>我的信息</h3>
				<div class="col-md-6">
					<p>我的个人详细信息：</p>
					<table class="table table-bordered">
				<form action="perEditSubmit" method="post" id="userloginform" onsubmit="return sss()">
						<input type="hidden" name="u_id" value="{{$user->u_id}}">
						<thead>
							<tr>
								<th>账号：</th>
								<th><input type="text" name="u_name" value="{{$user->u_name}}"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>昵称：</td>
								<td><input type="text" id="pet_name" name="pet_name" value="{{$user->pet_name}}"><span id="petname"></span></td>
							</tr>
							<tr>
								<td>真实姓名：</td>
								<td><input type="text" id="real_name" name="real_name" value="{{$user->real_name}}"><span id="realname"></span></td>
							</tr>
							<tr>
								<td>邮箱：</td>
								<td><input type="text" name="u_email" value="{{$user->u_email}}"></td>
							</tr>
							<tr>
								<td>手机号：</td>
								<td><input type="text" name="u_tel" value="{{$user->u_tel}}"></td>
							</tr>
							<tr>
								<td>身份证号：</td>
								<td><input type="text" name="id_card" value="{{$user->u_card}}"></td>
							</tr>
							<tr>
								<td>上次登陆时间：</td>
								<td>
									<span class="badge badge-danger">{{$user->last_login}}</span>
									<input type="submit" value="点击修改" style="float:right">
								</td>
							</tr>
						</tbody>
						<input type="hidden" name="_token" value="{{csrf_token()}}"/>
						</form>
					</table>
				</div>
			   <div class="clearfix"> </div>
			</div>
		
		</div>
	</div>
<!-- //typography-page -->

<!--引用底部公用信息-->
@include('commonality.foot');v



<!-- for bootstrap working -->
	<script src="js/bootstrap.js"></script>
<!-- //for bootstrap working -->
</body>
</html>

<script>
	function sss(){
		return pet()&&rea();
	}
	$("#pet_name").blur(pet);
	$("#real_name").blur(rea);
	function rea(){
		var real_name=$("#real_name").val();
		var reg=/^[\u4e00-\u9fa5]{2,4}$/;
		if(reg.test(real_name)){
			$("#realname").html("√");
			return true;
		}else{
			$("#realname").html("请输入2~4个汉字");
			return false;
		}
	}
	function pet(){
		var pet_name=$("#pet_name").val();
		var reg=/^[\u4e00-\u9fa5]{2,4}$/;
		if(reg.test(pet_name)){
			$("#petname").html("√");
			return true;
		}else{
			$("#petname").html("请输入2~4个汉字");
			return false;
		}
	}
</script>
