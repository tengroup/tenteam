<!DOCTYPE HTML>
<html>
<head>
<title>Events</title>
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
<!-- events -->
	<div class="events">
		<div class="container">
			<h2 class="wow fadeInLeftBig" data-wow-duration="1000ms" data-wow-delay="300ms">今日更新</h2>
			<div class="event-grids">
            @foreach($arr as $v)
                <div class="col-md-4 event-grid wow flipInY" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p class="dte">{{$v->h_time}}</p>
                    <img src="houst_img/{{$v->photo}}" alt="" class="img-responsive" style="height: 180px; width: 370px;"/>
                    <div class="nobis">
                            点击更多查看详细信息<br>
                    </div>
                    <p class="quod"></p>
                    <div class="more">
                        <a href="{{URL('events/more?h_id')}}={{$v->h_id}}" class="hvr-curl-bottom-right">更多</a>
                    </div>
                </div>
             @endforeach
				<div class="clearfix"> </div>
			</div>{!! $arr->render() !!}<br><br>


            <h2 class="wow fadeInLeftBig" data-wow-duration="1000ms" data-wow-delay="300ms">三日更新</h2>
            <div class="event-grids">
                @foreach($arr1 as $v1)
                    <div class="col-md-4 event-grid wow flipInY" data-wow-duration="1000ms" data-wow-delay="300ms">
                        <p class="dte">{{$v1->h_time}}</p>
                        <img src="houst_img/{{$v1->photo}}" alt="" class="img-responsive" style="height: 180px; width: 370px;"/>
                        <div class="nobis">
                            点击更多查看详细信息<br>
                        </div>
                        <p class="quod"></p>
                        <div class="more">
                            <a href="{{URL('events/more?h_id')}}={{$v1->h_id}}" class="hvr-curl-bottom-right">更多</a>
                        </div>
                    </div>
                @endforeach
                <div class="clearfix"> </div>
            </div>{!! $arr1->render() !!}<br><br>


            <h2 class="wow fadeInLeftBig" data-wow-duration="1000ms" data-wow-delay="300ms">本周更新</h2>
            <div class="event-grids">
                @foreach($arr2 as $v2)
                    <div class="col-md-4 event-grid wow flipInY" data-wow-duration="1000ms" data-wow-delay="300ms">
                        <p class="dte">{{$v2->h_time}}</p>
                        <img src="houst_img/{{$v2->photo}}" alt="" class="img-responsive" style="height: 180px; width: 370px;"/>
                        <div class="nobis">
                            点击更多查看详细信息<br>
                        </div>
                        <p class="quod"></p>
                        <div class="more">
                            <a href="{{URL('events/more?h_id')}}={{$v2->h_id}}" class="hvr-curl-bottom-right">更多</a>
                        </div>
                    </div>
                @endforeach
                <div class="clearfix"> </div>
            </div>{!! $arr2->render() !!}



		</div>
	</div>
<!-- //events -->

<!--引用底部公用信息-->
@include('commonality.foot');




<!-- for bootstrap working -->
	<script src="js/bootstrap.js"></script>
<!-- //for bootstrap working -->
</body>
</html>
<script>
    function fun(){

    }
</script>