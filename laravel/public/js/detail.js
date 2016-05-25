$(function(){
	
    $('#r_fixed').divfixed({"top":"0"});
   
    var sWsVal = '';
    var sName  = '';
    var photoIndex = 0;
    var photoLen   = $('#lofslidecontent46 .lof-main-wapper li').size();
   $('#lofslidecontent45 ul.lof-main-wapper li').each(function(){
        sWsVal = $(this).find('a').attr('href');
        sName  = '';
        if(sWsVal!=""){
            for(var i=1; i<6; i++){
                if(sWsVal.indexOf('/0'+i+'/')>0){
                    sName = '0'+i;
                }
            }
            if(sName!=''){
                $(this).find('.woshi').html(sName+'卧').show();
            }
        }
   });
   
  
   
    $('.pirobox_t6').click(function(){
        photoIndex = $(this).parent().index();
        $('#lofslidecontent46 .lof-main-wapper li').eq(photoIndex).show().siblings().hide();
         
        $('#bigPhotShow').show();
        marTopCount(photoIndex);
        return false;
       
    });

    $('#lofslidecontent46 .lof-next').click(function(){
        photoIndex++;        
        photoIndex = photoIndex%photoLen;
        $('#lofslidecontent46 .lof-main-wapper li').eq(photoIndex).show().siblings().hide();
        marTopCount(photoIndex);
    });
    
    $('#lofslidecontent46 .icon-prev').click(function(){
        photoIndex--;        
        photoIndex = photoIndex < 0 ? (photoLen-1) : photoIndex;
        $('#lofslidecontent46 .lof-main-wapper li').eq(photoIndex).show().siblings().hide();
        marTopCount(photoIndex);
    });
    
     $('#bigPhotShow .close').click(function(){
         $('#bigPhotShow').hide();
     });
     
     var winHeight = $(window).height();
     $(window).resize(function(){
         winHeight = $(window).height();
         $('#lofslidecontent46 ul.lof-main-wapper').css({'margin':(winHeight-600)/2+'px auto'});
         marTopCount(photoIndex);
     });
     $('#lofslidecontent46 ul.lof-main-wapper').css({'margin':(winHeight-600)/2+'px auto'});
     
     
     function marTopCount(photoIndex){
         var oImg = $('#lofslidecontent46 .lof-main-wapper li').eq(photoIndex).find('img');        
         oImg.css({'margin-top':(600-oImg.outerHeight())/2+'px'});
     }
	 
  $('.weixin').click(function(){
      new Boxy('#QR_code',{title:'分享到微信'});
  });  

$('.deform').click(function(){
            $('.tips').hide();
            new Boxy('#dialog_form', {title: "您的意向房源"});
       
       
    });
    
     indoor();
     
     
    
     $('#lofslidecontent45 .lof-main-wapper .loadImgError').each(function(){         
         var _this = $(this);
         var oImgSrc  =  _this.attr('src');         
         var oImg = new Image();
         oImg.onerror = function(){
            var _index = _this.parents('li').index();
            $('#lofslidecontent45 .lof-navigator li').eq(_index).remove();
            $('#lofslidecontent46 .lof-main-wapper li').eq(_index).remove();            
             _this.parents('li').remove();
         };         
         oImg.src = oImgSrc;
         
     });
     
     

});
//图片居中显示
function AutoResizeImage(maxWidth,maxHeight,objImg,imgSrc){
var img = new Image();
img.onload = function()
{

        objImg.src=imgSrc;
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = objImg.width;
        var h = objImg.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if(w>h){//宽大与高-横
            objImg.style.width = maxWidth+'px';
            objImg.style.height = h*wRatio+'px';
           
           objImg.style.marginTop=-(h*wRatio-maxHeight)/2+'px';
            
            
        }else{//高大于宽-竖
            objImg.style.height = maxHeight+'px';
            objImg.style.width = 'auto';
        }
        objImg.style.display = 'block';
}
img.src = imgSrc;

}

      /*------------------------------横版相册插件js begin---------------------------- */
   function indoor(){
        var buttons = {
            previous:$('#lofslidecontent45 .lof-previous'),
            next:$('#lofslidecontent45 .lof-next')
        };
        $('#lofslidecontent45').lofJSidernews({
            interval : 4000,
            direction : 'opacity',
            duration : 200,
            auto : false,
            maxItemDisplay : 3,
            navPosition : 'vertical', // horizontal
            navigatorHeight : 135,
            navigatorWidth : 165,
            mainWidth:165,
            buttons : buttons
        });
        
        
       
        
        
    }
   
  
  
/*--横版相册插件js end--------------------------------------------------------- */

(function($) {
	 $.fn.lofJSidernews = function( settings ) {
	 	return this.each(function() {
			// get instance of the lofSiderNew.
			new  $.lofSidernews( this, settings ); 
		});
 	 }
	 $.lofSidernews = function( obj, settings ){
		this.settings = {
			direction	    	: '',
			mainItemSelector    : 'li',
			navInnerSelector	: 'ul',
			navSelector  		: 'li' ,
			navigatorEvent		: 'click',
			wapperSelector: 	'.lof-main-wapper',
			interval	  	 	: 4000,
			auto			    : true, // whether to automatic play the slideshow
			maxItemDisplay	 	: 3,
			startItem			: 0,
			navPosition			: 'vertical', 
			navigatorHeight		: 100,
			navigatorWidth		: 310,
			duration			: 600,
			navItemsSelector    : '.lof-navigator li',
			navOuterSelector    : '.lof-navigator-outer' ,
			isPreloaded			: false,
			easing				: 'easeInOutQuad'
		}	
		$.extend( this.settings, settings ||{} );	
		this.nextNo         = null;
		this.previousNo     = null;
		this.maxWidth  = this.settings.mainWidth || 600;
		this.wrapper = $( obj ).find( this.settings.wapperSelector );	
		this.slides = this.wrapper.find( this.settings.mainItemSelector );
		if( !this.wrapper.length || !this.slides.length ) return ;
		// set width of wapper
		if( this.settings.maxItemDisplay > this.slides.length ){
			this.settings.maxItemDisplay = this.slides.length;	
		}
		this.currentNo      = isNaN(this.settings.startItem)||this.settings.startItem > this.slides.length?0:this.settings.startItem;
		this.navigatorOuter = $( obj ).find( this.settings.navOuterSelector );	
		this.navigatorItems = $( obj ).find( this.settings.navItemsSelector ) ;
		this.navigatorInner = this.navigatorOuter.find( this.settings.navInnerSelector );
		
		if( this.settings.navPosition == 'horizontal' ){ 
			this.navigatorInner.width( this.slides.length * this.settings.navigatorWidth );
			this.navigatorOuter.width( this.settings.maxItemDisplay * this.settings.navigatorWidth );
			this.navigatorOuter.height(	this.settings.navigatorHeight );
			
		} else {
			this.navigatorInner.height( this.slides.length * this.settings.navigatorHeight );	
			
			this.navigatorOuter.height( this.settings.maxItemDisplay * this.settings.navigatorHeight );
			this.navigatorOuter.width(	this.settings.navigatorWidth );
		}		
		this.navigratorStep = this.__getPositionMode( this.settings.navPosition );		
		this.directionMode = this.__getDirectionMode();  
		
		
		if( this.settings.direction == 'opacity') {
			
			this.wrapper.addClass( 'lof-opacity' );
			//$(this.slides).css('opacity',0).eq(this.currentNo).css('opacity',1);
			$(this.slides).eq(this.currentNo).siblings().hide();
			$(this.slides).eq(this.currentNo).show();
		} else { 
			this.wrapper.css({'left':'-'+this.currentNo*this.maxSize+'px', 'width':( this.maxWidth ) * this.slides.length } ).fadeOut();
		}

		
		if( this.settings.isPreloaded ) {
			this.preLoadImage( this.onComplete );
		} else {
			this.onComplete();
		}
		
	 }
     $.lofSidernews.fn =  $.lofSidernews.prototype;
     $.lofSidernews.fn.extend =  $.lofSidernews.extend = $.extend;
	 
	 $.lofSidernews.fn.extend({
							  
		startUp:function( obj, wrapper ) {
			seft = this;

			this.navigatorItems.each( function(index, item ){
				$(item).click( function(){
					seft.jumping( index, true );
					seft.setNavActive( index, item );					
				} );
				$(item).css( {'height': seft.settings.navigatorHeight, 'width':  seft.settings.navigatorWidth} );
			})
			//this.registerWheelHandler( this.navigatorOuter, this );
			this.setNavActive(this.currentNo );
			
			if( this.settings.buttons && typeof (this.settings.buttons) == "object" ){
				this.registerButtonsControl( 'click', this.settings.buttons, this );

			}
			if( this.settings.auto ) 
			this.play( this.settings.interval,'next', true );
			
			return this;
		},
		onComplete:function(){this.startUp( );
			//setTimeout( function(){ $('.preload').hide(); }, 5000 );	
		},
		preLoadImage:function(  callback ){
			var self = this;
			var images = this.wrapper.find( 'img' );
	
			var count = 0;
			images.each( function(index,image){ 
				{
					count++;
					if( count >= images.length ){
						self.onComplete();
					}	
				}
			} );
		},
		navivationAnimate:function( currentIndex ) { 
			if (currentIndex <= this.settings.startItem 
				|| currentIndex - this.settings.startItem >= this.settings.maxItemDisplay-1) {
					this.settings.startItem = currentIndex - this.settings.maxItemDisplay+2;
					if (this.settings.startItem < 0) this.settings.startItem = 0;
					if (this.settings.startItem >this.slides.length-this.settings.maxItemDisplay) {
						this.settings.startItem = this.slides.length-this.settings.maxItemDisplay;
					}
			}		
			this.navigatorInner.stop().animate( eval('({'+this.navigratorStep[0]+':-'+this.settings.startItem*this.navigratorStep[1]+'})'), 
												{duration:500, easing:'easeInOutQuad'} );	
		},
		setNavActive:function( index, item ){
			if( (this.navigatorItems) ){ 
				this.navigatorItems.removeClass( 'active' );
				$(this.navigatorItems.get(index)).addClass( 'active' );	
				this.navivationAnimate( this.currentNo );	
			}
		},
		__getPositionMode:function( position ){
			if(	position  == 'horizontal' ){
				return ['left', this.settings.navigatorWidth];
			}
			return ['top', this.settings.navigatorHeight];
		},
		__getDirectionMode:function(){
			switch( this.settings.direction ){
				case 'opacity': this.maxSize=0; return ['opacity','opacity'];
				default: this.maxSize=this.maxWidth; return ['left','width'];
			}
		},
		registerWheelHandler:function( element, obj ){ 
			 element.bind('mousewheel', function(event, delta ) {
				var dir = delta > 0 ? 'Up' : 'Down',
					vel = Math.abs(delta);
				if( delta > 0 ){
					obj.previous( true );
				} else {
					obj.next( true );
				}
				return false;
			});
		},
		registerButtonsControl:function( eventHandler, objects, self ){ 
			for( var action in objects ){ 
				switch (action.toString() ){
					case 'next':
						objects[action].click( function() { self.next( true) } );
						break;
					case 'previous':
						objects[action].click( function() { self.previous( true) } );
						break;
				}
			}
			return this;	
		},
		onProcessing:function( manual, start, end ){	 		
			this.previousNo = this.currentNo + (this.currentNo>0 ? -1 : this.slides.length-1);
			this.nextNo 	= this.currentNo + (this.currentNo < this.slides.length-1 ? 1 : 1- this.slides.length);				
			return this;
		},
		finishFx:function( manual ){
			if( manual ) this.stop();
			if( manual && this.settings.auto ){ 
				this.play( this.settings.interval,'next', true );
			}		
			this.setNavActive( this.currentNo );	
		},
		getObjectDirection:function( start, end ){
			return eval("({'"+this.directionMode[0]+"':-"+(this.currentNo*start)+"})");	
		},
		fxStart:function( index, obj, currentObj ){//alert(index)
				if( this.settings.direction == 'opacity' ) { 
					//$(this.slides).stop().animate({opacity:0}, {duration: this.settings.duration, easing:this.settings.easing} );
					//$(this.slides).eq(index).stop().animate( {opacity:1}, {duration: this.settings.duration, easing:this.settings.easing} );
					$(this.slides).eq(index).siblings().hide();
					$(this.slides).eq(index).fadeIn("100");
					//$(this.slides).eq(index).siblings().slideUp("50",function(){});
					//$(this.slides).eq(index).slideDown("50");
					
				}else {
					//this.wrapper.stop().animate( obj, {duration: this.settings.duration, easing:this.settings.easing});
					this.wrapper.stop().animate( obj, {duration: this.settings.duration, easing:this.settings.easing});																												
				}
			return this;
		},
		jumping:function( no, manual ){
			this.stop(); 
			if( this.currentNo == no ) return;		
			 var obj = eval("({'"+this.directionMode[0]+"':-"+(this.maxSize*no)+"})");
			this.onProcessing( null, manual, 0, this.maxSize )
				.fxStart( no, obj, this )
				.finishFx( manual );	
				this.currentNo  = no;
		},
		next:function( manual , item){

			this.currentNo += (this.currentNo < this.slides.length-1) ? 1 : (1 - this.slides.length);	
			this.onProcessing( item, manual, 0, this.maxSize )
				.fxStart( this.currentNo, this.getObjectDirection(this.maxSize ), this )
				.finishFx( manual );
		},
		previous:function( manual, item ){
			this.currentNo += this.currentNo > 0 ? -1 : this.slides.length - 1;
			this.onProcessing( item, manual )
				.fxStart( this.currentNo, this.getObjectDirection(this.maxSize ), this )
				.finishFx( manual	);			
		},
		play:function( delay, direction, wait ){	
			this.stop(); 
			if(!wait){ this[direction](false); }
			var self  = this;
			this.isRun = setTimeout(function() { self[direction](true); }, delay);
		},
		stop:function(){ 
			if (this.isRun == null) return;
			clearTimeout(this.isRun);
            this.isRun = null; 
		}
	})
})(jQuery)
