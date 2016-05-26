<!DOCTYPE HTML>
<html>
<head>
<title>Short Codes</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- Custom Theme files -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />

<!--图片上传-->
    <link rel="stylesheet" type="text/css" href="jiaoben/css/jquery.filer.css">
    <link rel="stylesheet" type="text/css" href="jiaoben/css/jquery.filer-dragdropbox-theme.css">




<!-- js -->
<script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/laydate/laydate.js"></script>
<!-- //js -->

    <!--图片上传-->
    <script src="jiaoben/js/jquery-2.1.1.min.js" type="text/javascript"></script>
    <script src="jiaoben/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="jiaoben/js/jquery.filer.min.js" type="text/javascript"></script>
    <script src="jiaoben/js/prettify.js" type="text/javascript"></script>
    <script src="jiaoben/js/scripts.js" type="text/javascript"></script>
    <script src="jiaoben/js/custom.js" type="text/javascript"></script>


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
<style>
#map{
    position: absolute;
    z-index: 3;
    width: 1530px;
    top:500px;
}
    .container{
        z-index: 1;
        //opacity:0.2;
    }
    #shadow{
        z-index: 2;
        left:0;
        top:0;
        width:100%;
        height:2500px;
        background:#ccc;
        position:absolute;
        opacity:0.8;
        display:none;
    }
</style>
<body>

<!--引用公用头部信息-->
@include ("commonality.head")

<!-- banner1 -->
	<div class="banner1">
		<div class="container">
		</div>
	</div>
<!-- //banner1 -->





<!--typography-page -->
	<div class="typo">

		<div class="container">
            <form action="{{URL('addhoust')}}" method="post" enctype="multipart/form-data">
			<h3 class="bars wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">房源发布</h3>
			<div class="input-group wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
				<span class="input-group-addon" id="basic-addon1">address</span>
				<input type="hidden" class="form-control" id="h_address" placeholder="房源地址" aria-describedby="basic-addon1" name="h_address" >
                <input type="button" id="tj_address" value="+添加地址">
			</div>

            <div id="shadow">
            </div>
            <!--地图地理位置-->
            <div id="map" style="display:none;">
                @include("commonality.map")
            </div>
            
            <div class="input-group wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                <span class="input-group-addon" id="basic-addon1">area</span><input type="text" placeholder="房屋面积" name="h_area"/>
                <span class="input-group-addon" id="basic-addon1">number</span><input type="text" placeholder="可住人数" name="number">
            </div>

            <!--接待时间、押金-->
			<div class="input-group wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                <span class="input-group-addon" id="basic-addon1">Receive_Time</span><input placeholder="接待时间" class="laydate-icon" onClick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" name="Receive_Time">
                <span class="input-group-addon" id="basic-addon1">￥</span> <input type="text" placeholder="压金" name="deposit">
			</div>

            <!--租金"-->
			<div class="input-group wow fadeInUp" data-wow-duration="1000ms"  data-wow-delay="300ms">
				<span class="input-group-addon">$</span>
					<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" placeholder="租金" name="pay">
				<span class="input-group-addon">.00</span>
			</div>


            <!--联系人-->
            <div class="input-group wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                <span class="input-group-addon" id="sizing-addon2">Linkman</span>
                <input type="text" class="form-control" placeholder="联系人" aria-describedby="sizing-addon2" name="linkman">
            </div>

            <!--联系电话-->
            <div class="input-group input-group-sm wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                <span class="input-group-addon" id="sizing-addon3">Tel</span>
                <input type="text" class="form-control" placeholder="联系电话" aria-describedby="sizing-addon3" name="phone">
            </div>


			<div class="row wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">

                <!--热销、精品、特价房-->
				<div class="col-lg-6 in-gp-tb">
					<div class="input-group">
						<span class="input-group-addon">
							热销房：<input type="checkbox" aria-label="..." value="1"  name="is_hot">
                        </span>
                        <span class="input-group-addon">
                            精品房：<input type="checkbox" aria-label="..." value="1" name="is_best">
                        </span>
                        <span class="input-group-addon">
                             特价房：<input type="checkbox" aria-label="..." value="1" name="is_cheap">
                        </span>
					</div>
				</div>
			</div>

            <!--房屋的类型-->
            <div class="input-group wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                <span class="input-group-addon" id="basic-addon1">Type</span>
                <select name="t_id" id="" aria-describedby="sizing-addon2">
                    @foreach($type as $k=>$v)
                    <option value="{{$v->t_id}}">{{$v->t_name}}</option>
                    @endforeach
                </select>
            </div>

            <!-- 房屋描述-->
            <div class="input-group input-group-lg wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                <span class="input-group-addon" id="sizing-addon1">content</span>
                <textarea   aria-describedby="sizing-addon1" cols="130" placeholder="这里填写您对房屋的描述" rows="10" name="content"></textarea>
            </div>

            <!--图片上传-->
            <input type="file" name="files[]" multiple="multiple" id="demo-fileInput-5"/>

                <!--视频上传-->




                <input type="submit" value="发布信息"/>
            </form>



			<div class="page-header wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
				<h3 class="bars">Tables</h3>
			</div>
			<h2 class="typoh2 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">信息提交的列表</h2>
            <div class="bs-docs-example wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
				<table class="table">
					<thead>
						<tr>
							<th>房源地址</th>
							<th>面积</th>
							<th>押金</th>
							<th>租金</th>
                            <th>描述</th>
                            <th>联系人</th>
                            <th>审核的状态</th>
						</tr>
					</thead>
					<tbody>
                    @foreach($list as $v)
						<tr>
							<td>{{$v->h_address}}</td>
							<td>{{$v->h_area}}</td>
							<td>{{$v->deposit}}</td>
							<td>{{$v->pay}}</td>
                            <td>{{$v->h_address}}</td>
                            <td>{{$v->linkman}}</td>
                            <td>
                                @if($v->status==0)
                                    未审核
                                @elseif($v->status==1)
                                    审核已通过
                                 @else
                                    审核未通过
                                @endif
                            </td>
						</tr>
                    @endforeach
					</tbody>
				</table>
                {!! $list->render() !!}
			</div>
			<hr class="bs-docs-separator">

	</div>
<!-- //typography-page -->

<!--引用底部公用信息-->
@include('commonality.foot');



<!-- for bootstrap working -->
	<script src="js/bootstrap.js"></script>

<!-- //for bootstrap working -->
</body>

</html>
<script>
    $("#tj_address").click(function(){
        $("#map").attr("style","display:black");
        document.getElementById('shadow').style.display='block';
    })




    //日历插件
    !function(){
        laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
        laydate({elem: '#demo'});//绑定元素
    }();
    //日期范围限制
    var start = {
        elem: '#start',
        format: 'YYYY-MM-DD',
        min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16', //最大日期
        istime: true,
        istoday: false,
        choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#end',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        max: '2099-06-16',
        istime: true,
        istoday: false,
        choose: function(datas){
            start.max = datas; //结束日选好后，充值开始日的最大日期
        }
    };
    laydate(start);
    laydate(end);
    //自定义日期格式
    laydate({
        elem: '#test1',
        format: 'YYYY年MM月DD日',
        festival: true, //显示节日
        choose: function(datas){ //选择日期完毕的回调
            alert('得到：'+datas);
        }
    });
    //日期范围限定在昨天到明天
    laydate({
        elem: '#hello3',
        min: laydate.now(-1), //-1代表昨天，-2代表前天，以此类推
        max: laydate.now(+1) //+1代表明天，+2代表后天，以此类推
    });


</script>