 $(function(){
	    	  
            var $mapSearchText=$("#mapsearchText");
            var $mapTitle = $mapSearchText.attr('data-title');
          var $toBus=$("#toBus");
          var to;
          var $reasultbox=$("#reasultbox");	
	    	  
	  var map1 = new BMap.Map("mainmap");
	  	map1.addControl(new BMap.NavigationControl());
	    map1.addControl(new BMap.ScaleControl());
	    map1.enableScrollWheelZoom();
	    var lng =$mapSearchText.attr('data-lng');
	    var lat =$mapSearchText.attr('data-lat');
	   
	   
	  
	    var point=new BMap.Point(lng,lat);
	    var marker=new BMap.Marker(point);
	    map1.centerAndZoom(point,14);
	    map1.addOverlay(marker);
	    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	    var keyFlag = 0;	 
	    var keyVal = '';

	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "mapsearchText"
		,"location" : map1
	});
		

	$('#toLocation').click(function(){
		 map1.centerAndZoom(point,14);
	    map1.addOverlay(marker);
	    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	});

	$('#msTab p').click(function(){	
			$(this).addClass('active').siblings().removeClass();
			keyFlag = $(this).index();
			
		});     	
	     	 
		   var local = new BMap.LocalSearch(map1, {
				renderOptions:{map: map1}
				});
				
			var $mapTabLi=$("#mapTab li");
	    	  $mapTabLi.click(function(){
	    		  var txt=$(this).attr('title');
	    		  $mapTabLi.removeClass("active");
	    		  $(this).addClass('active');
	    		  local.searchInBounds(txt, map1.getBounds());
	    	  });
	    	  
	    	  
	    	  
	    		
	    		var routePolicy = [BMAP_TRANSIT_POLICY_LEAST_TIME,BMAP_TRANSIT_POLICY_LEAST_TRANSFER,BMAP_TRANSIT_POLICY_LEAST_WALKING,BMAP_TRANSIT_POLICY_AVOID_SUBWAYS];
	    		var transit = new BMap.TransitRoute(map1, {
	    				renderOptions: {map: map1},
	    				policy: 0,
	    				onSearchComplete:function(e){
	    					var plan=e.getPlan(0);
	    					var title="";
	    					if(plan.getNumLines() > 0){
	    						title=plan.getLine(0).title;
	    						if(title.indexOf("(") > 0){
	    							title=title.substring(0,title.indexOf("("));
	    						}
	    					}
	    					 s=plan.getDescription().replace(/\，(\<b\>步行\<\/b\>)/g,'@$1').replace(/\，(乘坐)/g,'@$1').split("@");
	    					 
	    					
	    					var adds="";
	    					for(var j in s){
	    						if(j%2===0){
	    							adds +='<div class="t_buxing"><i></i>'+s[j]+'</div>';	
	    						}else{
	    							adds +='<div class="t_chengzuo"><i></i>'+s[j]+'</div>';
	    						}
	    					}
	    					
	    					
	    					
	    					
	    					var t1='',
	    						t2='';
	    					
	    					if(keyFlag){
	    						t1 = $mapTitle;
	    						t2 = to;
	    					}else{
	    						t2 = $mapTitle;
	    						t1 = to;
	    					}
	    					
	    					
	    					
	    					var string='<div class="reasultsmallbox"><div class="reasultsmallbox_h">'
	    				    +'<p class="numicon">1</p>'
	    				    +'<font size="3">'+title+'</font>&nbsp;&nbsp;&nbsp;&nbsp;全程约'+plan.getDuration()
	    				    +'</div>'
	    				    +'<div style="display: block;" class="reasultsmallbox_c tt_show">'
	    				    +'<div class="map_starticon">'
	    				    +'  <p class="t_qidian">起</p>'
	    				    +'    <span class="t_zhongdianbg">'+t1+'</span>'
	    				    +'</div>'
	    				    + adds
	    				    +'<div class="map_starticon zhong">'
	    				    +' <p class="t_zhongdian">终</p>'
	    				    +' <span class="t_zhongdianbg">'+t2+'</span></div>'
	    				    +'</div></div>';
	    				  
	    				    $reasultbox.show().html(string);
	    				}
	    			}); 
	    		var transitSearch=function(){
	    			var i=0;
	    				to=$mapSearchText.val();
	    			
	    			if(to.length===0){return;}
	    			 
	    			 
	    		
	    					search(point,to,routePolicy[i]); 
	    				
	    			 
	    			function search(start,end,route){ 
	    				transit.setPolicy(route);
	    				
	    				if(keyFlag){
	    					transit.search(point,end);
                                                 $('#reasultbox').show();
                                                $('#closeReasult').show();
	    				}else{
	    					transit.search(end,point);
                                                 $('#reasultbox').show();
                                                $('#closeReasult').show();
	    				}
	    				
	    				
	    				
	    				
	    			}  
				}
	    		$toBus.click(function(){
                            keyVal = $mapSearchText.val();
                            checkVal(keyVal);
                            transitSearch();
                            
                            
	    		});
	    		//公交结束
	    		
	    		
	    		//驾车开始
	    		//地址解析  坐标点解析为汉字
				var geoc = new BMap.Geocoder(); 
				var curDress = '';
				geoc.getLocation(point,function(rs){
					var addComp = rs.addressComponents;
					curDress = addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber;
				});
				
	    		var driving = new BMap.DrivingRoute(map1, {renderOptions: {map: map1, panel: "reasultbox", autoViewport: true}});
	    		$('#toDriver').click(function(){
	    			
                               
	    			
					keyVal = $mapSearchText.val();
					checkVal(keyVal);
					
					point=new BMap.Point($mapSearchText.attr('data-lng'),$mapSearchText.attr('data-lat'));
					
					if(keyFlag){
						driving.search(curDress, keyVal);
                                                $('#reasultbox').show();
                                                $('#closeReasult').show();
					}else{
						driving.search(keyVal,curDress);
                                                $('#reasultbox').show();
                                                $('#closeReasult').show();
					}
				});
				//驾车结束
	    		
                               
	    		
	    		//步行
	    		var walking = new BMap.WalkingRoute(map1, {renderOptions: {map: map1, panel: "reasultbox", autoViewport: true}});
	    		$('#toWalk').click(function(){
	    			
	    			//$(this).addClass('active').siblings('.btn').removeClass('active');
	    			
					

					keyVal = $mapSearchText.val();
					checkVal(keyVal);
					point=new BMap.Point($mapSearchText.attr('data-lng'),$mapSearchText.attr('data-lat'));
					if(keyFlag){
						walking.search(curDress, keyVal);
                                                 $('#reasultbox').show();
                                                $('#closeReasult').show();
					}else{
						walking.search(keyVal,curDress);
                                                $('#reasultbox').show();
                                                $('#closeReasult').show();
					}
                                       
				});
	    		
	    		
	    		//步行结束
	    		
	    		
				function checkVal(val){
					
					var num=0;
					if(val==''){
						$mapSearchText.removeClass('textFocus');
						var timer = setInterval(function(){
							num++;
							if(num%2==0){
								$mapSearchText.addClass('textError')
							}else{
								$mapSearchText.removeClass('textError')
							}

							if(num>= 4){
								clearInterval(timer);
								$mapSearchText.focus();
							}
								
						},100);
						$mapSearchText.addClass('textError').removeClass('textFocus');
					}
				}
	    		
	    		
	    		$mapSearchText.focus(function(){
					$(this).addClass('textFocus').removeClass('textError');
				}).blur(function(){
					$(this).removeClass('textFocus textError');
				});
	    		
	    		
	    		
	    		/*
	    		$mapSearchText.keyup(function(e){
	    			var searchText=$(this).val().trim();
	    			if(searchText==""){
	    				map1.removeOverlay();
	    				return false;
	    			}
	    			if(e.which==13 || e.which==1){
	    				if($('#toBus').hasClass('active')){
	    					transitSearch();
	    				}
	    				
	    				
	    				
	    			}
	    			return false;
	    		})
	    		*/
                       
                       
                       $('#closeReasult').click(function(){
                           $(this).hide();
                           $('#reasultbox').hide();
                       });
                       
                       
	    		
	      });



