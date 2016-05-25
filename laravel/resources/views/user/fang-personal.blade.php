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
					<p>我的个人详细信息：<a href="{{URL('perEdit')}}" style="float:right">编辑</a></p>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>账号：</th>
								<th><span class="badge badge-success">{{$user->u_name}}</span></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>昵称：</td>
								<td><span class="badge">{{$user->pet_name}}</span></td>
							</tr>
							<tr>
								<td>真实姓名：</td>
								<td><span class="badge badge-primary">{{$user->real_name}}</span></td>
							</tr>
							<tr>
								<td>邮箱：</td>
								<td><span class="badge badge-success">{{$user->u_email}}</span></td>
							</tr>
							<tr>
								<td>手机号：</td>
								<td><span class="badge badge-info">{{$user->u_tel}}</span></td>
							</tr>
							<tr>
								<td>身份证号：</td>
								<td><span class="badge badge-warning">{{$user->u_card}}</span></td>
							</tr>
							<tr>
								<td>上次登陆时间：</td>
								<td><span class="badge badge-danger">{{$user->last_login}}</span></td>
							</tr>
						</tbody>
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
