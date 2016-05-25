<!DOCTYPE HTML>
<html>
<head>
<title>Mail Us</title>
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
<!-- contact -->
	<div class="contact">
		<div class="container">
			<h1 class="animated fadeInLeftBig" data-wow-duration="1000ms" data-wow-delay="300ms">给我们留言~</h1>
			<div class="contact-bottom wow fadeInLeft" data-wow-duration="1000ms" data-wow-delay="300ms">
				<!-- <iframe src="" frameborder="0" style="border:0" allowfullscreen></iframe> -->
				<div style="height:400px; text-align:center;">
						展示留言列表瀑布流
				</div>
			</div>
			<div class="col-md-4 contact-left wow fadeInLeftBig" data-wow-duration="1000ms" data-wow-delay="300ms">
				<h4>注意！</h4>
				<h2>请不要恶意攻击我们的网站！感谢合作！
					<span>联系我们</span></h2>
				<ul>
					<li>电话 :+1 078 4589 2456</li>
					<li>座机 :+1 078 4589 2456</li>
					<li>QQ :+1 078 4589 2456</li>
					<li>邮箱 :<a href="mailto:info@example.com">info@example.com</a></li>
				</ul>
			</div>
			<div class="col-md-8 contact-left wow fadeInRight" data-wow-duration="1000ms" data-wow-delay="300ms">
				<h4>发布留言</h4>
				<form>
					<!-- <input type="text" value="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" required="">
					<input type="email" value="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required="">
					<input type="text" value="Telephone" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Telephone';}" required=""> -->
					<textarea type="text"  onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '留言内容...';}" required="">留言内容...</textarea>
					<input type="submit" value="留言" >
					<input type="reset" value="清除" >

				</form>
			</div>
			<div class="clearfix"> </div>
		</div>
	</div>
<!-- //contact -->


<!--引用底部公用信息-->
@include('commonality.foot');



<!-- for bootstrap working -->
	<script src="js/bootstrap.js"></script>
<!-- //for bootstrap working -->
</body>
</html>