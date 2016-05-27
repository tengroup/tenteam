@foreach($arr as $v)
         发布时间:<p>{{$v->h_time}}</p>
         <img src="houst_img/{{$v->photo}}"><br>
         房源ID:{{$v->h_id}} ------
         发布人ID:{{$v->u_id}}<br>
         房屋住址:{{$v->h_address}}<br>
         房屋面积:{{$v->h_area}}<br>
         可住人数:{{$v->number}}<br>
         房屋类型:{{$v->t_id}}<br>
         押金:{{$v->deposit}}<br>
         租金:{{$v->pay}}<br>
         描述:{{$v->content}}<br>
         联系方式:{{$v->phone}}<br>
         联系人:{{$v->linkman}}<br>
@endforeach
