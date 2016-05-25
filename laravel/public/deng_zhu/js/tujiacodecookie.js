function getTujiacodeCookie(name) {
    var domain = getCookieDomain();
    var beforestr;
    if (domain.length > 1 && domain[0] == ".") {
        beforestr = domain.substring(1) + "_PortalContext_";
    } else {
        beforestr = domain + "_PortalContext_";
    }
    var nameEQ =beforestr+ name + "=";    
    var ca = document.cookie.split(';');       
    for(var i=0;i < ca.length;i++) {    
        var c = ca[i];                      
        while (c.charAt(0)==' ') {             
            c = c.substring(1,c.length);      
        }    
        if (c.indexOf(nameEQ) == 0) {     
            return unescape(c.substring(nameEQ.length,c.length));   
        }    
    }    
    return false;    
}

function getCookieDomain() {
    var pos = document.domain.indexOf(".");
    if (pos > 0) {
        return document.domain.substring(pos);
    } else {
        return document.domain;
    }
}
    
  
function clearTujiacodeCookie(name) {
    setTujiacodeCookie(name, "", -1);
}    
    
   
function setTujiacodeCookie(name, value, seconds) {
    if (document.domain == "localhost") {
        document.cookie = "localhost_PortalContext_" + name + "=" + escape(value);
        return;
    }

    var domain = getCookieDomain();
    var beforestr;
    if (domain.length > 1 && domain[0] == ".") {
        beforestr = domain.substring(1) + "_PortalContext_";
    } else {
        beforestr = domain + "_PortalContext_";
    }
    seconds = seconds || 0;   
    var expires = "";    
    if (seconds != 0 ) {      
        var date = new Date();    
        date.setTime(date.getTime()+(seconds*1000));    
        expires = "; expires="+date.toGMTString();    
    }
    document.cookie = beforestr + name + "=" + escape(value) + expires + "; path=/;domain=" + domain;
}  


var TujiaCookieName = ["OriginalCustomerSourceChannelID", "OriginalCustomerSourceChannelCode", "PromotionChannelID", "PromotionChannelCode", "SubCustomerSourceChannelCode", "HisPromotionChannelCode", "HisSubCustomerSourceChannelCode"];
var TujiaCookiehour = [0, 0, 0, 0, 0, 2592000, 2592000];

for(var cookieindex=0;cookieindex<TujiaCookieName.length;cookieindex++)
{
    if (getTujiacodeCookie("Temp" + TujiaCookieName[cookieindex]) != false)
    {
        var tujiacookievalue = getTujiacodeCookie("Temp" + TujiaCookieName[cookieindex]);
        setTujiacodeCookie(TujiaCookieName[cookieindex], tujiacookievalue, TujiaCookiehour[cookieindex])
    }
}