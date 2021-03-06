var houseSearch = {
    searchSubmit: function () {
        var self = this;
        var $subBtn = self.$subBtn;
        $subBtn.click(function (ev) {
            // 检查入离日期是否有添写
            var startDate = parseDate($("#startDate").val());
            var endDate = parseDate($("#endDate").val());
           
            if (!startDate || !endDate || compareDate(startDate, endDate))
            {
                var api = $("#startDate").data("dateinput");
                setTimeout(function () { api.show(); }, 200);
                return;
            }

            $subBtn.val('搜索中');
            var url = "";
            ev.preventDefault();
            var arr = ["lh", "lc", "ld", "d"];
            var sData = self.searchData;
            sData.address = self.$adress.val();
            var currentDestination = $.grep(self.cityInfo.citys, function (c) {
                return c.id == self.searchData.DestinationId;
            })[0];
            var isCurrentDuanzu = window["isDuanzu"] && !arr.contains(sData.SearchKeyword);
            var lanmarkPinyin,
                conditionArray = [],
                query_param = [];
            if (window.location.pathname.indexOf("se0") > -1) {
                conditionArray.push({ key: "se", val: "0" });
            }
            if (self.searchType === 1 && sData.SearchKeyword) {
                if (sData.SearchKeyword == "d" && !(parseInt(sData.Value).toString().length == sData.Value.length)) {
                    lanmarkPinyin = sData.Value;
                } else {
                    if (sData.SearchKeyword == "s" && !isCurrentDuanzu) {
                        conditionArray.push({ key: sData.SearchKeyword, val: sData.Note + "_s" + sData.Value });
                    } else {
                        conditionArray.push({ key: sData.SearchKeyword, val: sData.Value });
                    }

                    if (sData.ParentSearchKeyword && !isCurrentDuanzu) {
                        conditionArray.push({ key: sData.ParentSearchKeyword, val: sData.ParentValue, isParent: true });
                    }
                }
            } else if (self.searchType === 2 && sData.address) {
                if ((sData.lat == "" || sData.lng == "")) {
                    query_param.push({ key: "keyword", val: sData.address });
                } else {
                    query_param.push({ key: "adress", val: sData.address });
                    query_param.push({ key: "lat", val: sData.lat });
                    query_param.push({ key: "lng", val: sData.lng });
                }
            }
            if (self.vrchannel) {
                conditionArray.push({ key: "vr", val: self.vrchannel });
            }
            if (query_param.length > 0 || sData.SearchKeyword) {
                query_param.push({ key: "isFromInput", val: "true" });
            }

            if (self.srcPage) {
                query_param.push({ key: "srcPage", val: self.srcPage });
            }
            //self.setCookie();
            self.doRedirect(currentDestination, isCurrentDuanzu, lanmarkPinyin, conditionArray, query_param);
        });
    },

    setCookie: function () {
        var startDate = this.$startDate.val();
        var endDate = this.$endDate.val()
        $.cookie(this.serverDomain + "_PortalContext_StartDate", startDate, { expires: 1, path: '/', domain: this.serverDomain });
        $.cookie(this.serverDomain + "_PortalContext_EndDate", endDate, { expires: 1, path: '/', domain: this.serverDomain });
    },  

    doRedirect: function (currentDestination, isCurrentDuanzu, lanmarkPinyin, conditionArray, query_param) {
        var url = "";
        //如果目的地为区域
        if (currentDestination && currentDestination.scenicspotId > 0 && currentDestination.scenicspot.length > 0) {
            var scenicspotArray = currentDestination.scenicspot.split("|");
            if (isCurrentDuanzu) {
                url += "/duanzu_" + scenicspotArray[0] + "/";
            } else {
                url += "/" + scenicspotArray[0] + "_gongyu/";
            }
            if (isCurrentDuanzu) {
                url += scenicspotArray[1];
            } else {
                url += scenicspotArray[1] + "_s" + currentDestination.scenicspotId;
            }
        } else {
            if (isCurrentDuanzu) {
                url += "/duanzu_" + currentDestination.pinyin + "/";
            } else {
                url += "/" + currentDestination.pinyin + "_gongyu/";
            }
        }
        if (lanmarkPinyin && lanmarkPinyin.length > 0) {
            url += "d-" + lanmarkPinyin + "/";
        }
        var conditionString = "",
            locationString = "";
        $.each(conditionArray, function (i, v) {
            if ($.inArray(v.key, ["a", "s", "c"]) > -1) {
                if (v.key == "s" && (isCurrentDuanzu || !v.isParent)) {
                    //短租的区域搜索url格式为duanzu_beijing/chaoyangqu
                    //非短租的区域搜索url格式为beijing_gongyu/chaoyangqu_s123
                    locationString += v.val;
                } else {
                    locationString += v.key + v.val;
                }
            } else {
                conditionString += v.key + v.val;
            }
        });

        if (isCurrentDuanzu) {
            url += (locationString.length == 0 ? "select" : locationString) + "/" + conditionString;
        } else {
            url += locationString + conditionString;
        }

        if (url.slice(url.length - 1) != "/") {
            url += "/";
        }
        $("#mainSearchForm").find("input.dynamicFormData").remove();
        if (query_param.length > 0) {
            $.each(query_param, function (i, v) {
                $("#mainSearchForm").append("<input class='dynamicFormData' type='hidden' name='" + v.key + "' value='" + v.val + "'>");
            });
        }
        $("#mainSearchForm").attr({ "action": url, "target": "_top" }).trigger("submit");
    },

    addrInputInit: function () {
        var self = this;
        var $destInput = self.$destInput;
        var $adress = self.$adress;
        self.$addressDrop = $("#addressDrop");
        var adressFocusTimeout, desInputFocusTimeOut;
        self.prevValueKwd = $adress.val();
        var keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

        $destInput.attr("autocomplete", "off");

        self.searchType = 2;
        $destInput.click(function (ev) {
            //ev.stopPropagation();
            self.prevValue = $(this).val();
        });
        $(document).on("click", function (ev) {
            if ($(ev.target).closest("#cityInput").length === 0 && !$(ev.target).is("#destInput")) {
                $("#cityInput").hide();
            }
            if ($(ev.target).closest("#kwdList").length === 0) {
                $("#kwdList").hide();
            }
            if ($(ev.target).closest("#addressDrop").length === 0) {
                self.$addressDrop.hide();
            }
        });

        $destInput.blur(function () {
            if ($destInput.data("enHide")) {
                $('#cityInput').hide();
                $destInput.val(self.searchData.DestinationName);
            }

            if (desInputFocusTimeOut) {
                clearTimeout(desInputFocusTimeOut);
            }
        });
        //此处有兼容性问题
        $destInput.bind("keydown", function (ev) {
            var $kwdList = $("#kwdList");
            var $curItem = $kwdList.find("a.hover");
            var $listItems = $kwdList.find("a");
            var index = $listItems.index($curItem);
            var lastIndex = $listItems.length - 1;
            if (ev.which == keys.DOWN && $kwdList.is(":visible")) {
                if (index === lastIndex) {
                    $curItem.removeClass("hover");
                    $listItems.first().addClass("hover");
                } else {
                    $curItem.removeClass("hover");
                    $listItems.eq(++index).addClass("hover");
                }
                ev.preventDefault();
            } else if (ev.which == keys.UP && $kwdList.is(":visible")) {
                if (index === 0) {
                    $curItem.removeClass("hover");
                    $listItems.last().addClass("hover");
                } else {
                    $curItem.removeClass("hover");
                    $listItems.eq(--index).addClass("hover");
                }
                ev.preventDefault();
            } else if (ev.which == keys.RETURN && $kwdList.is(":visible")) {
                ev.preventDefault();
                $curItem.trigger("click");
            }
        });

        $destInput.focus(function () {
            self.showCityInput();
            $("#kwdList").hide();
            desInputFocusTimeOut = setTimeout(function () { $destInput.select(); }, 30);
        });

        $destInput.bind("input propertychange", function (ev) {
            var keyWord = $.trim($(this).val());
            if (keyWord === "") {
                $("#cityInput").show();
                $("#kwdList").hide();
            } else if ($.trim(self.prevValue) != keyWord && keyWord != "") {
                $("#cityInput").hide();
                self.prevValue = keyWord;
                self.hasInputWord = true;
                self.$input = $destInput;
                self.destSearch(keyWord);
            }
        });

        $adress.bind("keydown", function (ev) {
            var $kwdList = $("#kwdList");
            var $curItem = $kwdList.find("a.hover");
            var $listItems = $kwdList.find("a");
            var index = $listItems.index($curItem);
            var lastIndex = $listItems.length - 1;
            if (ev.which == keys.DOWN && $kwdList.is(":visible")) {
                if (index === lastIndex) {
                    $curItem.removeClass("hover");
                    $listItems.first().addClass("hover");
                } else {
                    $curItem.removeClass("hover");
                    $listItems.eq(++index).addClass("hover");
                }
            } else if (ev.which == keys.UP && $kwdList.is(":visible")) {
                if (index === 0) {
                    $curItem.removeClass("hover");
                    $listItems.last().addClass("hover");
                } else {
                    $curItem.removeClass("hover");
                    $listItems.eq(--index).addClass("hover");
                }
            } else if (ev.which == keys.RETURN && $kwdList.is(":visible")) {
                ev.preventDefault();
                $curItem.trigger("click");
            }
        });

        $adress.bind("input propertychange", function (ev) {
            var kwd = $.trim($(this).val());
            self.$addressDrop.hide();
            self.searchType = 2;
            if (kwd === "") {
                self.$addressDrop.show();
                $("#kwdList").hide();
            } else if (kwd != $.trim(self.prevValueKwd) && kwd != "") {
                self.prevValueKwd = kwd;
                $("#kwdList").hide();
                clearTimeout(self.delayTimer);
                self.delayTimer = setTimeout(function () {
                    self.$input = $adress;
                    self.kwdSearch(kwd);
                }, 300);
            }
        });

        $adress.bind("click", function (ev) {
            ev.stopPropagation();
            self.prevValueKwd = $(this).val();
            $(this).next().hide();
        });

        //adress textbox获得焦点时显示位置关键词列表
        $adress.focus(function () {
            adressFocusTimeout = setTimeout(function () {
                self.$adress.select();
                self.refreshAddressDrop(true);
            }, 30);
        });

        $adress.bind("blur", function () {
            if (adressFocusTimeout) {
                clearTimeout(adressFocusTimeout);
            }
            if ($adress.data("enHide")) {
                if ($(this).val() == "") {
                    $(this).next().show();
                }
                self.$addressDrop.hide();
            }
        });

        $destInput.data("enHide", true);
        $adress.data("enHide", true);
        $(document).on("mouseover", "#cityInput", function () {
            $destInput.data("enHide", false);
        });

        $(document).on("mouseout", "#cityInput", function () {
            $destInput.data("enHide", true);
        });

        $(document).on("mouseover", "#kwdList", function () {
            $destInput.data("enHide", false);
        });

        $(document).on("mouseout", "#kwdList", function () {
            $destInput.data("enHide", true);
        });

        $(document).on("mouseover", "#addressDrop", function () {
            $adress.data("enHide", false);
        });

        $(document).on("mouseout", "#addressDrop", function () {
            $adress.data("enHide", true);
        });

        //百度搜索初始化
        self.baiduInit();
        if (self.ac) {
            self.ac.setInputValue(self.$adress.val());
        }
        if (self.$adress.val() && self.$adress.val().length > 0) {
            $adress.next().hide();
        }
        self.searchSubmit();
    },

    refreshAddressDrop: function (isShow) {
        var self = this;
        if (self.ac && self.ac.isBMapItemClicked) {
            //百度autocomplete触发的focus不予处理
            self.ac.isBMapItemClicked = false;
            return;
        }
        var destId = self.searchData.DestinationId;
        var url = "/UnitList/GetMark/" + destId + "?isDuanzu=" + window["isDuanzu"] + "&t=" + (new Date()).getTime();
        var ajaxObj = null;
        var addrPos = self.$adress.offset();

        if (self.$addressDrop.length === 0) {
            self.$addressDrop = $('<div id="addressDrop" class="m-add-drop"/>').appendTo("body").css({
                "position": "absolute",
                "display": "none",
                "top": addrPos.top + self.$adress.outerHeight(),
                "left": addrPos.left
            }).on("click", "a", function () {
                var $this = $(this);
                self.searchData.ParentSearchKeyword = null;
                self.searchData.ParentValue = null;
                self.searchData.SearchKeyword = $this.attr("data-type");
                self.searchData.Value = $this.attr("data-val");
                self.searchData.Note = $this.attr("data-pinyin");
                self.prevValueKwd = $this.text();
                self.$adress.val($this.text());
                self.$adress.next().hide();
                self.$addressDrop.hide();
                self.searchType = 1;
                self.$subBtn.click();
            });
            self.resetPosition(self.$adress, $("#addressDrop"));
            $(window).bind("resize.sel", function () {
                self.resetPosition(self.$adress, $("#addressDrop"));
            });
        }
        self.$addressDrop.empty();
        if (self.resCacheData[destId]) {
            self.$addressDrop.html(self.resCacheData[destId]);
            $("#kwdList").hide();
            if (self.resCacheData[destId].length > 0) {
                if (isShow) {
                    self.$addressDrop.show();
                }
                /*
                var css = getPosition();
                $addressDrop.css('left',css.left).show();
                */
            }
        } else {
            if (ajaxObj) {
                ajaxObj.abort();
            }
            ajaxObj = $.get(url, function (data) {
                self.resCacheData[destId] = data;
                ajaxObj = null;
                if (data && data.length > 0) {
                    self.$addressDrop.html(data);
                    if (isShow) {
                        self.$addressDrop.show();
                    }
                    /*
                    var css = getPosition();
                    $addressDrop.css('left',css.left).show();
                    */
                }
                $("#kwdList").hide();
            });
        }
    },
    baiduInit: function () {
        //百度地图API依赖于别的js文件，所以在document ready之后执行
        var self = this;
        $(function () {
            if (!window["BMap"]) {
                return;
            }
            self.ac = new BMap.Autocomplete({
                "input": "adress",
                "location": self.searchData.DestinationName,
                "onSearchComplete": function (s) {
                    self.hasBaiduResult = s.getNumPois() > 0;
                    self.ac.hide();
                }
            });
            var myGeo = new BMap.Geocoder();
            self.ac.addEventListener("onconfirm", function (e) { //鼠标点击下拉列表后的事件
                var _value = e.item.value, v = _value.province + _value.city + _value.district + _value.street + _value.business;
                //防止乱码
                self.ac.setInputValue($("<div/>").html(v).text());
                var cityName = _value.city;
                if (cityName && cityName.length > 1) {
                    if (cityName[_value.city.length - 1] == "市") {
                        cityName = cityName.substring(0, _value.city.length - 1);
                    }
                    var currentDestination = $.grep(self.cityInfo.citys, function (c) {
                        return c.name == cityName;
                    })[0];
                    if (currentDestination) {
                        self.setDestinationVal(currentDestination);
                        myGeo.getPoint(v, function (point) {
                            if (point) {
                                self.searchData.lat = point.lat;
                                self.searchData.lng = point.lng;
                                self.searchData.adress = v;
                                self.searchType = 2;
                            }
                            //触发搜索事件
                            self.$subBtn.click();
                        }, self.searchData.DestinationName);
                    } else {
                        self.resShow("对不起，该地我们还没有公寓", self.$input);
                    }
                } else {
                    self.$subBtn.click();
                }

                self.ac.isBMapItemClicked = true;
            });
            self.ac.setInputValue(self.$adress.val());
        });
    },
    destSearch: function (kwd) {
        var url = "/KeyWordSearch/?keyword=" + encodeURIComponent(kwd);
        var self = this;

        self.getSearchData(url).done(function (res) {
            if (!res || !res.IsSuccess || res.KeyWordSearchInfos.length <= 0) {
                self.resShow("对不起，找不到：" + kwd, self.$input);
                $("#cityInput").hide();
            } else {
                self.resShow(self.resCacheData[url].KeyWordSearchInfos, self.$input);
                $("#cityInput").hide();
            }
        });
    },
    getSearchData: function (url) {
        var self = this;
        if (self.resCacheData[url]) {
            var deffered = $.Deferred();
            deffered.resolve(self.resCacheData[url]);
            return deffered.promise();
        } else {
            if (self.ajaxObj) {
                self.ajaxObj.abort();
            }
            return self.ajaxObj = $.getJSON(url + "&agent=2" + "&time=" + $.now() + "&isDuanzu=" + (window["isDuanzu"] ? "true" : "false"), function (res) {
                if (res.IsSuccess) {
                    self.resCacheData[url] = res;
                }
            });
        }
    },
    kwdSearch: function (kwd) {
        var self = this;
        var url = "/KeyWordSearch/?DestinationId=" + self.searchData.DestinationId + "&keyword=" + encodeURIComponent(kwd);

        self.getSearchData(url).done(function (res) {
            if (!res || !res.IsSuccess || res.KeyWordSearchInfos.length <= 0) {
                if (self.hasBaiduResult && self.ac) {
                    self.ac.show();
                }
            } else {
                self.resShow(res.KeyWordSearchInfos, self.$input);
                $("#addressDrop").hide();
            }
        }).fail(function () {
            if (self.hasBaiduResult && self.ac) {
                self.ac.show();
            }
        });
    },
    resShow: function (resData, $input) {
        var self = this;
        var $kwdList = $("#kwdList");
        var $destInput = self.$destInput;
        var $adress = self.$adress;

        if ($kwdList.length === 0) {
            $kwdList = $('<div id="kwdList" class="m-kwd-list"></div>').appendTo("body");
            $kwdList.css({
                position: "absolute",
                left: $input.offset().left + self.kwdOffset[0] + "px",
                top: $input.offset().top + $input.outerHeight() + self.kwdOffset[1] + "px"
            });

            $kwdList.on("click", "a", function () {
                var kwdData = $(this).data("kwdData");
                //匹配到房屋时直接跳转到详情页
                if (kwdData.ConditionType == "u") {
                    window.open(kwdData.Note);
                    self.clearAdressInput();
                    $kwdList.hide();
                    return;
                }
                if (kwdData.Name && kwdData.ConditionType !== "dd") {
                    $adress.next().hide();
                    self.prevValueKwd = kwdData.Name;
                    $adress.val(kwdData.Name);
                } else {
                    self.clearAdressInput();
                }
                self.searchData = $.extend(true, {}, self.searchData, kwdData);
                self.setDestinationName(kwdData.DestinationName);
                self.searchType = 1;
                $kwdList.hide();
                //含有具体的搜索逻辑就自动搜索，提交
                if (kwdData.Name && kwdData.ConditionType !== "dd") {
                    self.$subBtn.click();
                }
            });

            $kwdList.on("mouseover", "a", function () {
                $kwdList.find("a").removeClass("hover");
                $(this).addClass("hover");
            });

        } else {
            $kwdList.empty();
            $kwdList.css({
                position: "absolute",
                left: $input.offset().left + self.kwdOffset[0] + "px",
                top: $input.offset().top + $input.outerHeight() + self.kwdOffset[0] + "px"
            });
        }

        if (typeof resData === "string") {
            $("<span class='error-info'>" + resData + "</span>").appendTo($kwdList);
        } else {
            var displaywithGroupData = {};
            $.each(resData, function (i, item) {
                var groupItems = displaywithGroupData[item.ConditionType] || [];
                groupItems.push(item);
                displaywithGroupData[item.ConditionType] = groupItems;
            });
            $.each(displaywithGroupData, function (key, valObj) {
                var $groupList = $("<div class='key-g'></div>");
                $.each(valObj, function (index, item) {
                    if (!item.Name) {
                        return;
                    }
                    var liString = '<a><span class="keywordName">' + item.Name;

                    if (item.ConditionType != "dd") {
                        liString += "，" + item.DestinationName;
                    }
                    liString += '</span>';
                    if (index == 0) {
                        liString += '<span class="keywordItem">' + item.ConditiontTypeName + '<i class="i-keyword-' + item.ConditionType + '"></i></span>';
                    }
                    liString += '</a>';
                    $groupList.append($(liString).data("kwdData", item));
                });
                $kwdList.append($groupList);
            });
        }

        $kwdList.find("a").first().addClass("hover");
        if (self.highLighter) {
            self.highLighter.highlight($kwdList[0], $("#adress").val());
        }
        $kwdList.show();
        self.clearBaiduRes();
    },
    clearRes: function () {
        var $kwdList = $("#kwdList");
        $kwdList.empty().hide();
    },
    clearBaiduRes: function () {
        if (this.ac) {
            this.ac.hide();
        }
    },
    clearAdressInput: function () {
        if (this.$adress.val() !== '') {
            this.$adress.val('').next().show();
        }
    },
    setDestinationVal: function (destination) {
        this.prevValue = destination.name;
        this.$destInput.val(destination.name);
        if (this.ac) {
            this.ac.setLocation(destination.name);
        }
        this.searchData.DestinationId = destination.id;
        this.searchData.DestinationName = destination.name;
        this.searchData.DestinationPinyin = destination.pinyin;
        this.refreshAddressDrop(false);
    },
    setDestinationName: function (destinationName) {
        //this.prevValue = destinationName;
        this.$destInput.val(destinationName);
        if (this.ac) {
            this.ac.setLocation(destinationName);
        }
        this.refreshAddressDrop(false);

        if ($("#startDate").val() == "") {
            $("#endDate").val("");
            $("#startDate").val("");
           
            var sep = "-";
            var oDate = minDate.split(sep)
            var bDate = new Date(oDate[0], oDate[1] - 1, oDate[2]);
            var eDate = new Date(oDate[0], oDate[1] - 1, oDate[2] - (-1));

            $("#startDate").data("dateinput").setValue(bDate, null, null, true, true);
            $("#endDate").data("dateinput").setValue(eDate, null, null, true, true);
            $("#startDate").data("dateinput").show();
        }

        //if (this.prevValue != destinationName)
        //{
            
        //    var mindate = parseDate(minDate);
        //    $("#endDate").val("");
        //    $("#startDate").val("");
        //    $("#startDate").data("dateinput").setValue(new Date(minDate), null, null, true, true);
        //    $("#endDate").data("dateinput").setValue(new Date(+mindate + 24 * 3600000), null, null, true, true);
        //    $("#startDate").data("dateinput").show();
            
        //    //$("#endDate").data("dateinput").setValueNoOpen("");
        //    //$("#startDate").data("dateinput").setValue("");
        //}
        this.prevValue = destinationName;
    },
    showCityInput: function () {
        var self = this;
        var $destInput = self.$destInput;
        var baseHtml = '<div id="cityInput" class="select-list"><div class="address_tabs"></div><div class="addr_wrap"></div></div>';
        var $root = null;
        var $addrTab = null;
        var $addrCon = null;
        var cityInputInfo = self.cityInfo;  //此处最好采用传参方式

        function drawCityContent(cityIds, isHide, isGrouping) {
            var citys = cityInputInfo.citys;
            var $cityCon = $("<div/>").addClass("address_content");
            var cityGroup = [];
            $.each(cityIds, function (i, id) {
                $.each(citys, function (j, cityItem) {
                    if (cityItem.id == id) {
                        //热门不分组
                        if (isGrouping) {
                            var firstCharacter = cityItem.pinyin.charAt(0).toUpperCase();
                            if (!cityGroup[firstCharacter]) {
                                var $cityContainer = $("<div class='cityContainer'/>");
                                $cityCon.append($("<div class='groupContainer'/>").append($("<div class='groupTitle'/>").text(firstCharacter)).append($cityContainer));
                                cityGroup[firstCharacter] = $cityContainer;
                            }
                            cityGroup[firstCharacter].append($("<span/>").text(cityItem.name).attr("data-value", cityItem.id).attr("data-pinyin", cityItem.pinyin));
                        } else {
                            $cityCon.append($("<span/>").text(cityItem.name).attr("data-value", cityItem.id).attr("data-pinyin", cityItem.pinyin));
                        }
                    }
                });
            });
            if (isHide) {
                $cityCon.hide();
            }
            $addrCon.append($cityCon);
        }

        if ($("#cityInput").length > 0) {
            $("#cityInput").show();
        } else {
            $root = $(baseHtml);

            $addrTab = $root.children().eq(0);
            $addrCon = $root.children().eq(1);
            $("<span/>").text(cityInputInfo.hotgroup.name).addClass("current").appendTo($addrTab);
            drawCityContent(cityInputInfo.hotgroup.cityids, false, false);

            $.each(cityInputInfo.lettergroups, function (i, item) {
                $("<span/>").text(item.name).appendTo($addrTab);
                drawCityContent(item.cityids, true, true);
            });
            /* $root.css({
                 position: "absolute",
                 left: $destInput.offset().left + self.destOffset[0] + "px",
                 top: $destInput.offset().top + $destInput.outerHeight() + self.destOffset[1] + "px",
                 zIndex: 9999
             });*/
            $addrTab.on("click", "span", function (ev) {
                ev.stopPropagation();
                $addrTab.find("span").removeClass("current");
                $(this).addClass("current");
                $addrCon.children().hide();
                $addrCon.children().eq($(this).index()).show();
            });

            $addrCon.on("click", "span", function (ev) {
                ev.stopPropagation();
                self.searchData.DestinationId = $(this).attr("data-value");
                self.searchData.DestinationName = $(this).text();
                self.searchData.DestinationPinyin = $(this).attr("data-pinyin");
                self.searchData.SearchKeyword = null;
                self.searchData.Value = null;
                self.clearAdressInput();
                self.setDestinationName($(this).text());
                $root.hide();
            });
            $("body").append($root);
            self.resetPosition($destInput, $root);
            $(window).bind("resize.sel", function () {
                self.resetPosition($destInput, $root);
            });
        }
    },
    resetPosition: function (elem, root) {
        var bodyWidth = $(document.body).outerWidth(true);
        var offset = elem.offset(), elemW = elem.innerWidth(), elemH = elem.innerHeight();
        var posLeft = offset.left + root.outerWidth(true) + this.destOffset[0];
        var posTop = offset.top + elem.outerHeight(true) + this.destOffset[1];
        if ((posLeft - bodyWidth) > 0) {
            posLeft = posLeft - (posLeft - bodyWidth)
        }
        root.css({
            position: "absolute",
            left: posLeft - root.outerWidth(true),
            top: posTop,
            zIndex: 9999
        });
    },
    dateInputInit: function ($startDate, $endDate) {
        var self = this;
        var mindate = parseDate(minDate),
          maxdate = parseDate(maxDate);

        $startDate.dateinput({
            min: mindate,
            max: new Date(+maxdate - 24 * 3600000),
            offset: self.dateOffset || [0, 0]
        });

        $endDate.dateinput({
            min: new Date(+mindate + 24 * 3600000),
            max: maxdate,
            offset: self.dateOffset || [0, 0]
        });

        var checkDateApi = $startDate.data("dateinput"),
            leaveDateApi = $endDate.data("dateinput");

        checkDateApi.change(function (event, date) {
            var leaveDay = parseDate(leaveDateApi.getInput().val()),
                 leaveMinDay = new Date(+date + 24 * 3600000);

            //  checkDateApi.getInput().next().hide();

            // 如果未设定离店时间或入住时间大于离店时间
            if (!leaveDay || compareDate(date, leaveDay)) {
                leaveDateApi.setMin(leaveMinDay).setValue(leaveMinDay).show();
            } else if (leaveDay) {
                leaveDateApi.setMin(leaveMinDay);
            }

        });
        leaveDateApi.change(function (event, date) {
            var startDay = parseDate(checkDateApi.getInput().val()),
                 startMaxDay = new Date(+date - 24 * 3600000);

            // leaveDateApi.getInput().next().hide();

            // 如果未设定入住时间或者入住时间大于离店时间
            if (!startDay || compareDate(startDay, date)) {
                checkDateApi.setValue(startMaxDay).show();
            }

        });
    },
    initView: function (conf) {
        //初始化组件属性和配置参数
        this.$destInput = conf.$destInput;
        this.$adress = conf.$kwdInput;
        this.$startDate = conf.$startDate;
        this.$endDate = conf.$endDate;
        this.$subBtn = conf.$subBtn;
        this.cityInfo = conf.cityInfo;
        this.destOffset = conf.destOffset;
        this.dateOffset = conf.dateOffset;
        this.kwdOffset = conf.kwdOffset;
        this.vrchannel = conf.vrchannel;
        this.srcPage = conf.srcPage;
        this.prevValue = this.$destInput.val();
        this.serverDomain = conf.serverDomain;
        //初始化组件状态属性
        this.searchData = {
            DestinationName: this.$destInput.val(),
            DestinationPinyin: conf.destPinyin,
            DestinationId: this.$destInput.attr("data-destid"),
            address: "",
            lat: "",
            lng: ""
        };

        this.hasInputWord = false;
        this.resCacheData = {};
        this.highLighter = window["Highlighter"] ? new Highlighter() : null;

        //初始化日历控件
        this.dateInputInit($("#startDate"), $("#endDate"));
        this.initInputFromCookie();
        this.addrInputInit();
    },
    initInputFromCookie: function () {
        var self = this;
        var $destInput = self.$destInput;
        if (typeof (ServerDomain) != 'undefined') {
            var cityCookieName = ServerDomain + "_PortalContext_DestinationId";
            var cityCookieValue = $.cookie(cityCookieName);
            var startDateCookieValue = $.cookie(ServerDomain + "_PortalContext_StartDate");
            var endDateCookieValue = $.cookie(ServerDomain + "_PortalContext_EndDate");

            if (cityCookieValue && cityCookieValue != "") {
                $.each(cityInfo.citys, function (index, item) {
                    if (item.id === parseInt(cityCookieValue)) {
                        $destInput.attr("data-destid", cityCookieValue);
                        $destInput.attr("data-destpinyin", item.pinyin);
                        $destInput.val(item.name);
                        self.searchData.DestinationPinyin = item.pinyin;
                        self.searchData.DestinationName = item.name;
                        self.searchData.DestinationId = item.id;
                        return false;
                    }
                });
            }

            if (startDateCookieValue && startDateCookieValue != "") {
                var sDate = startDateCookieValue.split(" ")[0];
                var aDate = sDate.split("-");
                var api = self.$startDate.data("dateinput");
                api.setValueNoOpen(aDate[0], aDate[1] - 1, aDate[2]);
            }

            if (endDateCookieValue && endDateCookieValue != "") {
                var sDate = endDateCookieValue.split(" ")[0];
                var aDate = sDate.split("-");
                var api = self.$endDate.data("dateinput");
                api.setValueNoOpen(aDate[0], aDate[1] - 1, aDate[2]);
            }
        }
        var currentDestinationId = self.$destInput.attr("data-destid");
        var currentDestination = $.grep(self.cityInfo.citys, function (c) {
            return c.id == currentDestinationId;
        })[0];
        if (currentDestination) {
            self.$destInput.val(currentDestination.name);
            self.$destInput.attr("data-destpinyin", currentDestination.pinyin);
        }
    }
};
function compareBirthDate(date1, date2) {
    var newDate1 = date1.split('-');
    var dateY1 = newDate1[0];
    var dateM1 = newDate1[1];
    var dateD1 = newDate1[2];

    var newDate2 = date2.split('-');
    var dateY2 = newDate2[0];
    var dateM2 = newDate2[1];
    var dateD2 = newDate2[2];

    if (dateY1 < dateY2) {
        return -1;
    }
    else if (dateY1 > dateY2) {
        return 1;
    }
    else if (dateY1 == dateY2) {
        if (dateM1 < dateM2) {
            return -1;
        }
        else if (dateM1 > dateM2) {
            return 1;
        }
        else if (dateM1 == dateM2) {
            if (dateD1 < dateD2) {
                return -1;
            }
            else if (dateD1 > dateD2) {
                return 1;
            }
            else if (dateD1 == dateD2) {
                return 0;
            }
        }
    }
}

function checkIdCard(cardNo) {
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    var len = cardNo.length;
    if (len != 15 && len != 18) {
        returnContent.msg = '证件号码位数不正确';
        returnContent.rst = false;
        return returnContent;
    }
    var reg;
    var cardNoSplit;
    var bGoodDay;
    var birth;
    if (len == 15) {
        if (!(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/.test(cardNo))) {
            returnContent.msg = '证件号码格式不正确';
            returnContent.rst = false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            cardNoSplit = cardNo.match(reg);
            birth = new Date('19' + cardNoSplit[2] + '/' + cardNoSplit[3] + '/' + cardNoSplit[4]);
            bGoodDay = (birth.getYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));
        }
    }
    else if (len == 18) {
        if (!(/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(cardNo))) {
            returnContent.msg = '证件号码格式不正确';
            returnContent.rst = false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/);
            cardNoSplit = cardNo.match(reg);
            birth = new Date(cardNoSplit[2] + "/" + cardNoSplit[3] + "/" + cardNoSplit[4]);
            bGoodDay = (birth.getFullYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));

        }
    }
    if (!bGoodDay) {
        returnContent.msg = '证件号码格式不正确';
        returnContent.rst = false;
    }
    else {
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth();
        var nowDate = new Date().getDate();

        if (compareBirthDate(birth.getFullYear() + '-' + birth.getMonth() + '-' + birth.getDate(), ((nowYear - 102) + "-" + nowMonth + "-" + nowDate)) < 0 || compareBirthDate(birth.getFullYear() + '-' + birth.getMonth() + '-' + birth.getDate(), (nowYear + "-" + nowMonth + "-" + nowDate)) > 0) {
            returnContent.msg = '证件号码格式不正确';
            returnContent.rst = false;
        }
        else {
            if (len == 15) {
                return returnContent;
            }
            else {
                // check city
                var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
                if (aCity[parseInt(cardNo.substr(0, 2))] == null) {
                    returnContent.msg = '证件号码格式不正确';
                    returnContent.rst = false;
                }
                var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子  
                var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码  
                var sum = 0, idx;
                for (var i = 0; i < cardNo.length - 1; i++) {
                    sum += parseInt(cardNo.substr(i, 1), 10) * arrExp[i];
                }
                idx = sum % 11;
                // 检验第18为是否与校验码相等  
                if (arrValid[idx] != cardNo.substr(17, 1).toUpperCase()) {
                    returnContent.msg = '证件号码格式不正确';
                    returnContent.rst = false;
                }
            }
        }
    }
    return returnContent;
}


function checkMilitaryCardNo(cardno) {
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    //var regNumCn = /^[0-9]{1,30}$/;
    //var regNumCnZn = /^[0-9][\u4E00-\u9FA5][a-zA-z]{1,30}$/;
    var regCn = /^[\u4E00-\u9FA5]$/;
    var regEn = /^[a-zA-Z]$/;
    var regNum = /^\d$/;
    var cnLength = 0;
    var enLength = 0;
    var numLength = 0;
    for (var i = 0; i < cardno.length; i++) {
        if (regCn.test(cardno[i])) {
            cnLength += 2;
        }
        else if (regEn.test(cardno[i])) {
            enLength += 1;
        }
        else if (regNum.test(cardno[i])) {
            numLength += 1;
        }
    }
    if (cnLength == 0 || numLength == 0) {
        returnContent.msg = "请输入正确的证件号码";
        returnContent.rst = false;
    }
    else if (cnLength + enLength + numLength <= 0 || cnLength + enLength + numLength > 30) {
        returnContent.msg = "请输入正确的证件号码";
        returnContent.rst = false;
    }
    return returnContent;
}

function checkPassPortCardNo(cardno) {
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    var reg = /^[a-zA-Z0-9]{5,20}$/;
    if (!reg.test(cardno)) {
        returnContent.msg = "请输入正确的护照号码";
        returnContent.rst = false;
    }
    return returnContent;
}

function getBirthdayByIdCard(cardNo) {
    var cardNoVal = cardNo.replace(/\s/g, "");
    var len = cardNoVal.length;
    var birth = '';
    if (len != 15 && len != 18) {
        return false;
    }
    if (len == 15) {
        if (!(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/.test(cardNoVal))) {
            return false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            cardNoSplit = cardNoVal.match(reg);
            birth = new Date('19' + cardNoSplit[2] + '/' + cardNoSplit[3] + '/' + cardNoSplit[4]);
        }
    }
    else if (len == 18) {
        if (!(/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(cardNoVal))) {
            return false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/);
            cardNoSplit = cardNoVal.match(reg);
            birth = new Date(cardNoSplit[2] + "/" + cardNoSplit[3] + "/" + cardNoSplit[4]);
        }
    }
    var fullMonth = birth.getMonth() + 1;
    var fullDate = birth.getDate();
    if (fullMonth < 10) {
        fullMonth = '0' + fullMonth;
    }
    if (birth.getDate() < 10) {
        fullDate = '0' + birth.getDate();
    }
    return birth.getFullYear() + '-' + fullMonth + '-' + fullDate;
}

function getSexByIdCard(cardNo) {
    var cardNoVal = cardNo.replace(/\s/g, "");
    var len = cardNo.length;
    if (len != 15 && len != 18) {
        return false;
    }
    var sex = '';
    if (parseInt(cardNoVal.substr(16, 1)) % 2 == 1) {
        return 'man';
    }
    else {
        return 'women';
    }
}
function parseDate(val, date) {
    if (val === undefined) { return; }
    if (val.constructor == Date) { return val; }

    if (typeof val == 'string') {

        // rfc3339?
        var els = val.split("-");
        if (els.length == 3) {
            return new Date(integer(els[0]), integer(els[1]) - 1, integer(els[2]));
        }

        // invalid offset
        if (!(/^-?\d+$/).test(val)) { return; }

        // convert to integer
        val = integer(val);
    }

    date.setDate(date.getDate() + val);
    return date;
}

function compareDate(date1, date2, type) {
    var date1 = date1.getTime(), date2 = date2.getTime();
    return !type ? date1 - date2 >= 0 : date1 - date2 > 0;
}

function dateGtWeek(date1, date2) {
    return date1.getTime() > date2.getTime() - 7 * 24 * 3600000;
}

function integer(val) {
    return parseInt(val, 10);
}

/*
* 验证时间段是否合法
* 1、离店时间大于入住时间
* 2、离店时间与入住时间是否重复
*/
function getTimeCompare(checkin, checkout, oldtime) {
    return checkout - checkin > 0 && checkin + checkout - timeData[0] - timeData[1] != 0;
}


function changeToLeftTime(leftSeconds) {
    //alert("changeToLeftTime");
    var h = parseInt(leftSeconds / (60 * 60)),
    m = parseInt((leftSeconds - h * 3600) / 60),
    s = leftSeconds % 60;

    h = h > 9 ? h + '' : '0' + h;
    m = m > 9 ? m + '' : '0' + m;
    s = s > 9 ? s + '' : '0' + s;

    return h + ':' + m + ':' + s;
}

/* 卧室数筛选 */
(function ($) {
    // 倒计时
    $('*[leftSeconds]').each(function () {

        var el = $(this), seconds = el.attr('leftSeconds') - 0,

        timer = window.setInterval(function () {
            var s = changeToLeftTime(seconds--);
            el.html(s);
            if (seconds < 0) {
                window.clearInterval(timer);
                timer = null;
                window.location.href = window.location.href;
            }

        }, 1000)
    });
})(jQuery);
// core function
// compare date
// @ add "type" for bug ID:1470
//其他js使用公共函数
function compareDate(date1, date2, type) {
    var date1 = date1.getTime(), date2 = date2.getTime();
    return !type ? date1 - date2 >= 0 : date1 - date2 > 0;
}

Array.prototype.contains = Array.prototype.contains || function (item) {
    var len = this.length;
    while (len--) {
        if (this[len] === item) {
            return true;
        }
    }
    return false;
};

//初始化导航上的tips功能
/*function FloatPanel(srcId, desId, direction, highlightCss) {

    var src = $("#" + srcId), des = $("#" + desId), SHOW = false;
    direction = direction || 'bottom';

    src.bind("mouseenter", function () {
        if (!SHOW) {
            var el = $(this), position = el.offset();

            switch (direction) {

                case "top":
                    des.show().css({ 'top': position.top - des.height(), 'left': position.left, 'z-index': '990', 'position': 'absolute' });
                    break;
                case "left":
                    des.show().css({ 'top': position.top + el.outerHeight(), 'right': position.left, 'z-index': '990', 'position': 'absolute' });
                    break;
                case "middle-left":
                    des.show().css({ 'top': (position.top - (des.outerHeight() - el.outerHeight()) / 2), 'left': position.left - des.outerWidth(), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "right":
                    des.show().css({ 'top': position.top, 'left': position.left + el.outerWidth(), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "middle-right":
                    des.show().css({ 'top': (position.top - (des.outerHeight() - el.outerHeight()) / 2), 'left': position.left + el.outerWidth(), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "right-bottom":
                    des.show().css({ 'top': position.top + el.outerHeight(), left: position.left - (des.outerWidth() - src.outerWidth()), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "middle-bottom":
                    des.show().css({ 'top': position.top + el.outerHeight(), left: position.left - (des.outerWidth() - src.outerWidth()) / 2, 'z-index': '990', 'position': 'absolute' });
                    break;
                case "bottom":
                    des.show().css({ 'top': position.top + el.outerHeight(), 'left': position.left, 'z-index': '990', 'position': 'absolute' });
                    break;

            }

            if (highlightCss) {
                src.addClass(highlightCss);
            }
        }

    }).bind("mouseleave", function (event) {
        var e = $(event.relatedTarget);
        if (e.attr("id") != desId && e.parents("#" + desId).length == 0) {
            SHOW = false;
            if (highlightCss) {
                src.removeClass(highlightCss);
            }
            des.hide();
        }
    });
    des.bind("mouseleave", function (event) {
        var e = $(event.relatedTarget);
        if (e.attr("id") != srcId && e.parents("#" + srcId).length == 0) {
            SHOW = false;
            des.hide();
            if (highlightCss) {
                src.removeClass(highlightCss);
            }
        }
    });
}*/

(function () {
    //订单页初始化功能
    function getUserMessage(url) {
        $("#messageLoading").show();
        $.ajax({
            type: "Get",
            url: url,
            success: function (data) {
                $("#messageLoading").hide();
                $("#userMessage").html(data);
                $("#userMessage #mytujiaPage a").each(function () {
                    $(this).click(function () {
                        getUserMessage($(this).attr("href"));
                        return false;
                    });
                });
            }
        });
    }

    function getUserMessageSummary(url) {
        if (staticFileRoot)
            $("[remind]").html("<img src='" + staticFileRoot + "/common/images/ui-anim_basic_16x16.gif'/>");

        $.ajax({
            type: "Get",
            url: url,
            success: function (data) {
                for (var i in data) {
                    if ($("[remind='" + i + "']")) {
                        if (data[i] == "0")
                            $("[remind='" + i + "']").parent().remove();
                        else
                            $("[remind='" + i + "']").html(data[i]);
                    }

                    //if (i == "TotalCount" && data[i] != "0") {
                    //initmytujiamenu();
                    //}
                }
            }
        });
    }

    if ($("[remindSummaryUrl]").length) {
        getUserMessageSummary($("[remindSummaryUrl]").first().attr("remindSummaryUrl"));
        //getUserMessage($("#mytujiamenu").attr("remindUrl"));
    }
    //订单页初始化功能---end

    //顶部搜索功能
    var topSearch = {
        initCityInput: function () {
            //城市地址输入控件初始化
            $("#citySelect").selectinput({
                offset: [2, -184],
                css: {
                    rootclass: "selectList selectListW120",
                    headclass: "selectTitle-2",
                    mouseon: "mouseon",
                    current: "current"
                }
            }).selEnter();
        },

        initKeywordInput: function () {
            // 顶部搜索
            var $keyword = $("#keyword");
            $keyword.blur(function () {
                if (!$keyword.val()) { $keyword.val("景点/地址/特色").addClass("defaultColor") }
            }).focus(function () {
                if ($keyword.val() == "景点/地址/特色") { $keyword.val("").removeClass("defaultColor") }
            });

            $("#topSearchForm").submit(function () {
                if ($keyword.val() == "景点/地址/特色") { $keyword.val("") }
            });

            if (!$keyword.val()) {
                $keyword.val("景点/地址/特色");
            } else if ($keyword.val() != "景点/地址/特色") {
                $keyword.removeClass("defaultColor");
            }
        },

        modifyFormAction: function () {
            $(".searcSubmit").click(function () {
                var url = window.location.pathname;
                if (typeof ($("#citySelect option:selected").attr("scenicspot")) == "undefined") {
                    if (url.indexOf("se0") > -1) {
                        $("#topSearchForm").attr("action", "/" + $("#citySelect option:selected").attr("name") + "_gongyu/se0/");
                    }
                    else {
                        $("#topSearchForm").attr("action", "/" + $("#citySelect option:selected").attr("name") + "_gongyu/");
                    }
                }
                else {
                    var pinyin = $("#citySelect option:selected").attr("scenicspot");
                    var id = $("#citySelect option:selected").attr("scenicspotid");
                    var arr = pinyin.split('|');
                    if (url.indexOf("se0") > -1) {
                        $("#topSearchForm").attr("action", "/" + arr[0] + "_gongyu/" + arr[1] + "_s" + id + "se0/");
                    }
                    else {
                        $("#topSearchForm").attr("action", "/" + arr[0] + "_gongyu/" + arr[1] + "_s" + id + "/");
                    }
                }
            });
        },

        initAll: function () {
            this.initCityInput();
            this.initKeywordInput();
            this.modifyFormAction();
        }
    };

    //初始化顶部搜索
    if ($("#searchdrop").length) {
        topSearch.initAll();
    }

    /*初始化子导航下拉提示*/

    $("#phonetab").hover(function () {
        var ps = $(this).offset(),
            pl = ps.left + "px",
            pt = ps.top + $(this).outerHeight() + "px";
        $(this).addClass("active");
        $("#phonetabdrop").css({
            position: "absolute",
            left: pl,
            top: pt,
            "z-index": 999
        }).show();
    }, function () {
        $("#phonetabdrop").hide();
        $(this).removeClass("active");
    });

    //延迟加载顶部的html内容
    $("[lazyLoadUrl]").each(function () {
        var $that = $(this);

        loadLazyResource($that);
    });

    function loadLazyResource($resourceContainer) {
        if (staticFileRoot)
            $resourceContainer.html("<img src='" + staticFileRoot + "/common/images/ui-anim_basic_16x16.gif'/>　");

        $.ajax({
            url: $resourceContainer.attr("lazyLoadUrl"),
            dataType: "jsonp",
            jsonp: "callback",
            success: function (result) {
                $resourceContainer.html(result);
            }
        });
    }

    //底部seo展开逻辑-开始
    var landmark_letterstr = "abcdefghijklmnopqrstuvwxyz";
    if ($("#landmarkTab").length) {
        window.showLandmark = function (letter) {
            $("#landmarkTab>a").attr("class", "");
            $("#landmarkTabContent>div").css("display", "none");
            $("#landmarkTab>a").each(function () {
                if ($(this).html().toLocaleLowerCase() == letter) {
                    $(this).attr("class", "current");
                    var i = landmark_letterstr.indexOf(letter);
                    $("#landmarkTabContent>div").eq(i).css("display", "block");
                }
            });
        }
    }

    if ($(".seo-group").length) {
        $(".seo-group").each(function () {
            var _this = $(this),
                objH = _this.find("ul").eq(0).outerHeight(),
                liH = _this.find("li").eq(0).outerHeight();
            if (objH > liH) {
                _this.find("ul").height(liH);
                _this.find("span").show();
            }
            else {
                _this.find("span").hide();
            }

            _this.find("span").bind("click", function () {
                var el = $(this);
                if (el.hasClass("more-btn-top")) {
                    el.removeClass("more-btn-top").parent().find("ul").eq(0).height(liH);
                }
                else {
                    el.addClass("more-btn-top").parent().find("ul").eq(0).height(objH);
                }
            });
        });
    }



    //app下载
    var $appLayer = $(".m-dld-wrap");
    /*  if ($appLayer.length > 0) {
          var curTime = new Date().getTime();
          $appLayer.find(".close-btn").click(function () {
              $appLayer.hide();
          });
          var appNum = $.cookie("appNumHappy_new");
          if (appNum === null) {
              $.cookie("appNumHappy_new", 1, { expires: 100, domain: ".tujia.com" });
              $.cookie("appDateHappy_new", curTime, { expires: 100, domain: ".tujia.com" });
              $appLayer.show();
          } else {
              if (parseInt(appNum) < 3 && (curTime - parseInt($.cookie("appDateHappy_new"))) > 30 * 24 * 3600 * 1000) {
                  $.cookie("appNumHappy_new", ++appNum, { expires: 100, domain: ".tujia.com" });
                  $.cookie("appDateHappy_new", curTime, { expires: 100, domain: ".tujia.com" });
                  $appLayer.show();
              }
          }
  
      }*/
    if ($appLayer.length > 0) {
        $appLayer.find(".close-btn").click(function () {
            $appLayer.hide();
        });
        var appNum = $.cookie("appNumHappy_dc");
        if (appNum === null) {
            $.cookie("appNumHappy_dc", 1, { expires: 7, domain: ".tujia.com" });
            $appLayer.show();
        }

    }

    $(function () {
        if ($("#mytujia").length == 0) {
            $("[lazyLoadUrl]").each(function () {
                var $that = $(this);

                loadLazyResource($that);
            });
        }
    });
})();

//TraceLog相关逻辑
(function () {
    window.parseURL = function (url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.host,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            pathname: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }

    window.traceLog = function(action, logData) {
        if (traceData && traceData.logService) {
            $(function () {
                $.ajax({
                    async: false,
                    url: traceData.logService + '/tracelog/' + action,
                    type: "GET",
                    dataType: 'jsonp',
                    data: $.extend({ "site": logData.site === undefined ? 2 : logData.site, "referrer": document.referrer }, logData)
                });
            });
        }
    }

    window.getValFromHash = function (key) {
        if (location.hash.length > 1) {
            var hash = location.hash.substring(1, location.hash.length);
            var hashArray = hash.split('&');
            if (hashArray.length > 0) {
                for (var i = 0; i < hashArray.length; i++) {
                    var kv = hashArray[i];
                    var indexOfEqualSign = kv.indexOf('=');
                    if (indexOfEqualSign > -1) {
                        var itemKey = kv.substring(0, indexOfEqualSign);
                        if (itemKey.toLowerCase() == key.toLowerCase()) {
                            return kv.substring(indexOfEqualSign + 1, kv.length);
                        }
                    }
                }
            }
        }

        return null;
    }

    window.getPrevId = function () {
        if (traceData && traceData.prevId) {
            return traceData.prevId;
        }

        return getValFromHash("prevId");
    }

    window.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    String.prototype.endWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substring(this.length - str.length) == str)
            return true;
        else
            return false;
        return true;
    }
    String.prototype.startWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substr(0, str.length) == str)
            return true;
        else
            return false;
        return true;
    }

    window.appendLogToUrl = function (url) {
        if (typeof (traceData) == "undefined") {
            return url;
        }

        var currentUrlObj = parseURL(url);
        var splitSign = '#';
        if(currentUrlObj.host == location.host && currentUrlObj.pathname == location.pathname)
        {
            splitSign = '?';
        }

        if (!url || url.toLowerCase().startWith("javascript:") || url.toLowerCase().startWith("#")) {
            return url;
        }

        var indexOfHash = url.indexOf(splitSign);
        if (indexOfHash < 0) {
            url += splitSign +'prevId=' + traceData.pageId;
            return url;
        }

        var hash = url.substr(indexOfHash + 1);
        if (hash) {
            if (hash.toLowerCase().indexOf('previd=') > -1) {
                return url;
            }

            if (hash.indexOf('=') > 0) {
                url += (url.endWith('&') ? '' : '&') + 'prevId=' + traceData.pageId;
            }
        } else {
            url += 'prevId=' + traceData.pageId;
        }
        return url;
    }

    window.openUrl = function (vUrl) {
        window.open(appendLogToUrl(vUrl));
    }

    $(document).on("click", "a", function () {
        if (typeof (traceData) == "undefined" || !traceData.pageId) {
            return;
        }

        var srcHref = $(this).attr("href");
        var url = appendLogToUrl(srcHref);
        if (url != srcHref) {
            $(this).attr('href', url);
        }
    });

    $(document).on("submit", "form", function () {
        if (typeof (traceData) == "undefined" || !traceData.pageId) {
            return;
        }

        var $form = $(this);
        if ($form.find('input[name="prevId"]').length <= 0) {
            $form.append($('<input name="prevId" type="hidden"/>').val(traceData.pageId));
        }
    });
})();


$(function () {
    var timeout;
    jQuery.validator.addMethod("isRightName", function (value, element) {
        return /^[A-Za-z0-9_\u4e00-\u9fa5]+$/.test(value);
    }, "用户名不合法");

    jQuery.validator.addMethod("isNumeber", function (value, element) {
        return !/^\d+$/.test(value);
    }, "用户名不能为纯数字");

    // 手机或者邮箱
    jQuery.validator.addMethod("isEmailOrMobile", function (value, element) {

        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value) || /^[1-9]{1}\d{10}$/.test(value)

    }, "<em class='suggestBox'>请输入手机号或者邮箱</em>");

    var currentPage = window.currentPage || null;
    var $btnGetVerifyCode = $("#btnGetVerifyCode").removeAttr("disabled");

    if (currentPage == "register") {
        $("#verifymobileForm").validate(createFormValidRule());

        $btnGetVerifyCode.click(function () {
            sendVerifyCode(true, "VerifyImage");
        });
        

        
        //手机号限输入整数
        var $mobile = $("#Mobile").keyup(function (event) {
            //setTimeout(function () {
            //    $("#Mobile").val($("#Mobile").val().replace(/\D/g, ''));
            //}, 1000);
        });

        if ($mobile.val()) {
            $.data(document.getElementById("Mobile"), "previousValue", { "old": $mobile.val(),valid:true });
        }

        $("#verifycode").focus(function () {
            $(this).nextAll(".errorInfo").remove();
        });
        
    //}
    //else if (currentPage == "register") {
        // 先判断是否有错误提示信息
        $("#validateArea").children("span").each(function (i, n) {
            var $self = $(n);
            var element = $("#" + $self.attr("data-for"));
            var error = $('<label for="' + $self.attr("data-for") + '" generated="true" class="errClass">' + $self.text() + '</label>');

            if ($self.html()) {
                if (element[0].id == "verifycode") {
                    var $strong = $("<strong/>").addClass("errorInfo").attr("id", "verifycodeBox");
                    element.nextAll("#verifycodeBox").remove();
                    element.parent().append($strong.append(error));
                } else {
                    var $strong = $("<strong/>").addClass("errorInfo");
                    element.nextAll().remove();
                    element.after($strong.append(error));
                }
            }
        });

        $('#Email').focus(function () {
            $(this).next().hide();
        }).blur(function () {
            if ($.trim($(this).val()) == "") {
                $(this).next().show();
            }
        });

        $("#registerForm").validate({
            rules: {
                verifyCodePic: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                },
                Email: {
                    required: false,
                    maxlength: 50,
                    email: true
                },
                Mobile: {
                    required: true,
                    minlength: 11,
                    maxlength: 11,
                    number: true
                },
                Password: {
                    required: true,
                    rangelength: [6, 16]
                },
                Repwd: {
                    required: true,
                    rangelength: [6, 16],
                    equalTo: "#Password"
                },
                EnterpriceCode: {
                    required: true
                }
            },
            messages: {
                verifyCodePic: {
                    required: "请输入验证码",
                    minlength: "验证码错误。",
                    maxlength: "验证码错误。"
                },
                Email: {
                    required: "请输入邮箱",
                    maxlength: "您的邮箱名太长了",
                    remote: "此邮箱已存在，<a href='/Passport/LoginPage/'>登录</a>"
                },
                Mobile: {
                    required: "请输入手机号",
                    minlength: "请输入11位手机号",
                    maxlength: "请输入11位手机号",
                    remote: "此手机已存在，<a href='/Passport/LoginPage/'>登录</a>"
                },
                Password: {
                    required: "请输入密码",
                    rangelength: jQuery.validator.format("请输入长度为 {0} 到 {1} 位的密码"),
                    equalTo: "两次密码输入不一致，请检查"
                },
                Repwd: {
                    required: "请再次输入密码",
                    rangelength: jQuery.validator.format("请输入长度为 {0} 到 {1} 位的密码"),
                    equalTo: "两次密码输入不一致，请检查"
                },
                EnterpriceCode: {
                    required: "请输入企业ID"
                }
            },
            errorClass: "errClass",
            errorPlacement: function (error, element) {
                var $errorTip = $("<strong/>").addClass("errorInfo").append(error);

                if (element[0].id == "verifycode" || element[0].id == "verifyCodePic") {
                    $errorTip.attr("id", "verifycodeBox");
                    element.nextAll(".errorInfo").remove();
                    element.parent().append($errorTip.append(error));
                } else if (element[0].id == "Email") {
                    element.parent().nextAll(".errClass").remove();
                    element.parent().after($errorTip);
                }else {
                    element.nextAll().remove();
                    element.after($errorTip);
                    $("#registerSumbit").show();
                    $("#registerGoing").hide();
                }
            },
            success: function (label) {
                label.parent().removeClass("errorInfo");
                label.remove();
            }
        });
    } else if (currentPage == "login") {
        $("div.login-tab > a").click(function () {
            var $tab=  $(this.hash);
            $tab.show().siblings("div.lgoin-group").hide();
            $(this).addClass("current").siblings().removeClass("current");
            $tab.find("form input:text").first().focus();
            $tab.find("img.verify-image").click();
            return false;
        });

        $("div.login-hd > a").click(function () {
            var $this = $(this);
            $this.siblings("h2").text($this.text() + "登录");
            $("input[name='accountIdentity']").each(function (index, input) {
                input.value = $this.attr("data-accountIdentity");
            });
        });

        $("span.text-watermark").click(function () {
            $(this).prev("input").focus();
        })

        $btnGetVerifyCode.click(function () {
            sendVerifyCode(false, "smsverifyImage");
        });

        var $userloginform = $("#userloginform");
        $userloginform.validate(createLoginFormValidRule($userloginform));
        var $smsCodeloginform = $("#smsCodeloginform");
        $smsCodeloginform.validate(createLoginFormValidRule($smsCodeloginform));
    } else if (currentPage == "fetchpassword") {
        var $self = $("#account"), $selfipt = $self.next().click(function () {
            $(this).fadeOut();
            $self.focus();
        }), checkTimer;

        $self.focus(function () {
            toggleMask(true);
        })
        .blur(function () {
            toggleMask(false);
        })

        function toggleMask(hide) {
            if (hide) {
                $selfipt.fadeOut();
            }
            else if(!$self.val()) {
                $selfipt.fadeIn();
            }
        }

        $("#retrieveBox form").validate({
            rules: {
                account: {
                    required: true,
                    isEmailOrMobile: true
                }
            },
            messages: {
                account: {
                    required: "<em class='suggestBox'>请输入手机号或者邮箱</em>",
                    isEmailOrMobile: "<em class='suggestBox'>请输入手机号或者邮箱</em>",
                    remote: jQuery.format("账号不存在，请检查")
                }
            },
            onkeyup: function (element, event) {
                var self = this;
                clearTimeout(checkTimer);
                checkTimer = setTimeout(function () {
                    if (element.name in self.submitted || element == self.lastElement) {
                        self.element(element);
                    }
                }, 300);
            },
            errorClass: "errClass",
            errorPlacement: function (error, element) {
                var $strong = $("<strong/>").addClass("errorInfo");
                element.nextAll().remove()
                element.after($strong.append(error));
            },
            success: function (label) {
                label.parent().removeClass("errorInfo");
                label.remove();
            }
        })

        // 执行异步请求，成功后返回数据
        window.getFetchPwd = function (data) {
            $mask = $(data);
            $("#VerifyImage").click();
            var $maskApi = $mask.appendTo("body").overlay({
                top: 260,
                mask: {
                    color: '#000',
                    loadSpeed: 200,
                    opacity: 0.5
                },

                closeOnClick: false,
                close: ".closeBtn",
                load: true,

                onBeforeLoad: function () {
                    window.validateMobileCode = function (data) {
                        if (data.IsSuccess) {
                            window.location.href = data.url;
                        } else {
                            var errorlabel = $("#telBox").find(".field-validation-error");
                            if (errorlabel.length > 0) {
                                errorlabel.find("span").html(data.Message);
                                if (data.Message.indexOf("重试次数超出限制") >= 0) {
                                    var $timerElem = $("#replySMS"),
                                         timer = 60,
                                         $rsms = $("<a href='" + $timerElem.attr('data-href') + "'>重发短信</a>");

                                    $rsms.bind("click", function () {
                                        var $self = $(this);
                                        $("#smsWrap").load($self.attr("href"), function () {
                                            $timerElem.html("重发短信(" + timer + ")");

                                            window.timerout = setInterval(function () {
                                                timer--;
                                                if (timer >= 0) {
                                                    $timerElem.html("重发短信(" + timer + ")");
                                                } else {
                                                    $timerElem.html($rsms);
                                                    clearInterval(window.timerout);
                                                }
                                            }, 1000);
                                        });
                                        return false;
                                    });
                                    $timerElem.html($rsms);

                                    clearInterval(window.timerout);
                                }
                            } else {
                                $("#VerificationCode").after('<span data-valmsg-replace="true" data-valmsg-for="VerificationCode" class="field-validation-error"><span for="VerificationCode" generated="true" class="">' + data.Message + '</span></span>');
                            }
                        }
                    }
                },

                onLoad: function () {
                    $("#form0").validate({
                        rules: {
                            VerificationCode: {
                                required: true
                            }
                        },
                        messages: {
                            VerificationCode: {
                                required: "验证码不能为空"
                            }
                        },
                        errorClass: "errClass",
                        errorElement: "span",
                        errorPlacement: function (error, element) {
                            var $strong = $("<span/>");
                            element.nextAll().remove()
                            element.after($strong.append(error));
                        },
                        success: function (label) {
                            label.parent().removeClass("errorInfo");
                            label.remove();
                        }
                    });

                    var $timerElem = $("#replySMS"), timer = 60, $rsms = $("<a id='retrySend' hrefUrl='" + $timerElem.attr('data-href') + "' href='javascript:void(0)'>重发短信</a>");

                    $("#retrySend").live("click", function () {
                        var $self = $(this);

                        $("#contentLayer").load($self.attr("hrefUrl"), function () {
                            if ($("span[data-valmsg-for='VerificationCode']").text() == "验证码不正确") {
                                $timerElem.html($rsms);
                            } else {
                                var timer = 60;
                                $timerElem.html("重发短信(" + timer + ")");

                                window.timerout = setInterval(function () {
                                    timer--;
                                    if (timer >= 0) {
                                        $timerElem.html("重发短信(" + timer + ")");
                                    } else {
                                        $timerElem.html($rsms);
                                        clearInterval(window.timerout);
                                    }
                                }, 1000);
                            }
                            $("#form0").validate({
                                rules: {
                                    VerificationCode: {
                                        required: true
                                    }
                                },
                                messages: {
                                    VerificationCode: {
                                        required: "验证码不能为空"
                                    }
                                },
                                errorClass: "errClass",
                                errorElement: "span",
                                errorPlacement: function (error, element) {
                                    var $strong = $("<span/>");
                                    element.nextAll().remove()
                                    element.after($strong.append(error));
                                },
                                success: function (label) {
                                    label.parent().removeClass("errorInfo");
                                    label.remove();
                                }
                            });
                        });
                        return false;
                    });

                    if ($("span[data-valmsg-for='VerificationCode']").text() == "验证码不正确") {
                        $timerElem.html($rsms);
                    } else {
                        $timerElem.html("重发短信(" + timer + ")");

                        window.timerout = setInterval(function () {
                            timer--;
                            if (timer >= 0) {
                                $timerElem.html("重发短信(" + timer + ")");
                            } else {
                                $timerElem.html($rsms);
                                clearInterval(window.timerout);
                            }
                        }, 1000);
                    }
                },

                onClose: function () {
                    $mask.remove();
                    window.validateMobileCode = undefined;
                }

            });
        }
    } else if (currentPage == "resetpassword") {
        $(".container_24 form").validate({
            rules: {
                Password: {
                    required: true,
                    rangelength: [6, 16]
                },
                Repwd: {
                    required: true,
                    rangelength: [6, 16],
                    equalTo: "#Password"
                }
            },
            messages: {
                Password: {
                    required: "请输入密码",
                    rangelength: jQuery.validator.format("请输入长度为 {0} 到 {1} 位的密码"),
                    equalTo: "两次密码输入不一致，请检查"
                },
                Repwd: {
                    required: "请再次输入密码",
                    rangelength: jQuery.validator.format("请输入长度为 {0} 到 {1} 位的密码"),
                    equalTo: "两次密码输入不一致，请检查"
                }
            },
            errorClass: "errClass",
            errorPlacement: function (error, element) {
                var $strong = $("<strong/>").addClass("errorInfo");
                element.nextAll().remove()
                element.after($strong.append(error));
            },
            success: function (label) {
                label.parent().removeClass("errorInfo");
                label.remove();
            }
        })
    }

    function sendVerifyCode(appendWaiting, verifyImageEleName) {
        if (!$("#Mobile").valid()) {
            return;
        }
        if (appendWaiting) {
            $("div.error-info,strong.errorInfo").remove();
        }
        
        var $verifyImage = $("#" + verifyImageEleName);

        var $verifyCodePic = $("#verifyCodePic");

        $.ajax({
            url: "/PortalSite/SendVerifyCode",
            type: "POST",
            data: { "mobile": $("#Mobile").val(), "verifyCodePic": $verifyCodePic.val() },
            success: function (data) {
                if (data.IsSuccess == true) {
                    $btnGetVerifyCode.addClass("verify-btn-dis").addClass("verify-code-btn-dis");
                    //发送成功，把发送按钮改为重新发送，置灰，并倒计时
                    $btnGetVerifyCode.attr("disabled", "disabled");
                    if (appendWaiting) {
                        $("#errorMsgCode").parent().siblings("div").show().children("span").text(data.Message);
                    }else {
                        $("#smsCode").focus();
                        $("#errorMsgCode").text(data.Message).addClass("hint-info").show();
                    }
                    $verifyImage.nextAll(".errorInfo").remove();
                    resetSendWaiting();
                } else {
                    var $errorTip = appendWaiting ? $("<strong/>").addClass("errorInfo").addClass("error-info") 
                     : $("<div/>").addClass("error-info");
                    $verifyImage.click();
                    $verifyImage.nextAll(".errorInfo,.error-info").remove();
                    if (data.ErrorCode == 30022) {
                        $("#errorMsgMobile").html($errorTip.append("该手机已经注册！"));
                    } else if (data.ErrorCode == 30064) {
                        $("#verifyImageContainer").show();
                        if (appendWaiting) {
                            $verifyImage.parent().append($errorTip.append(data.Message));
                        } else {
                            $("#smsLoginErrorTip").attr("data-error", data.Message).attr("data-eleid", "verifyCodePic").show().children("span").text(data.Message);
                        }
                        addVerifyCodeValidateRule($verifyCodePic);
                        $verifyCodePic.focus();
                    }
                    else if (data.ErrorCode == -99) {
                        if (appendWaiting) {
                            $verifyImage.parent().append($errorTip.append(data.Message));
                        } else {
                            $("#smsLoginErrorTip").attr("data-error", data.Message).attr("data-eleid", "verifyCodePic").show().children("span").text(data.Message);
                        }
                    }
                    else {
                        if (appendWaiting) {
                            $btnGetVerifyCode.parent().append($errorTip.append(data.Message));
                        } else {
                            //$btnGetVerifyCode.parent().append($errorTip.append(data.Message));
                            $("#smsLoginErrorTip").attr("data-error", data.Message).attr("data-eleid", "verifyCodePic").show().children("span").text(data.Message);
                        }
                        
                    }
                }
            }
        });
    }

    function addVerifyCodeValidateRule($verifyCodePic) {
        $verifyCodePic.rules("add", {
            required: true,
            minlength: 4,
            maxlength: 4,
            messages: {
                required: "输入验证码",
                minlength: "验证码错误",
                maxlength: "验证码错误"
            }
        });
    }

    function resetSendWaiting() {
        var timer = 60, timer2 = 15, timerout;
        timerout = setInterval(function () {
            timer--;
            timer2--;
            if (timer2 >= 0) {
                $("#waiting").html(timer2);
            } else {
                $("#errorMsgCode").html("").hide();
            }

            if (timer >= 0) {
                $btnGetVerifyCode.val("重新发送(" + timer + ")");
            } else {
                $btnGetVerifyCode.val("重新发送");
                $btnGetVerifyCode.removeAttr("disabled");
                $btnGetVerifyCode.removeClass("verify-btn-dis verify-code-btn-dis");
                clearInterval(timerout);
            }
        }, 1000);
    }

    function createFormValidRule() {
        return {
            rules: {
                Mobile: {
                    required: true,
                    minlength: 11,
                    maxlength: 11,
                    number: true
                }
                //,verifycode: {
                //    required: true,
                //    minlength: 4,
                //    maxlength: 4,
                //    number: true
                //}
            },
            messages: {
                Mobile: {
                    required: "请输入手机号",
                    minlength: "手机号码错误。",
                    maxlength: "手机号码错误。",
                    number: "手机号码错误。"
                }
                //,verifycode: {
                //    required: "请输入验证码",
                //    minlength: "验证码错误。",
                //    maxlength: "验证码错误。",
                //    number: "验证码错误。"
                //}
            },
            errorClass: "errClass",
            errorPlacement: function (error, element) {
                if (element[0].id == "verifycode") {
                    var $strong = $("<strong/>").addClass("errorInfo").attr("id", "verifycodeBox");
                    $("#errorMsgCode").show();
                    $("#errorMsgCode").html($strong.append(error));
                } else {
                    var $strong = $("<strong/>").addClass("errorInfo");
                    $("#errorMsgMobile").html($strong.append(error));
                }
            },
            success: function (label) {
                label.parent().parent().html("");
            }
        };
    }

    function createLoginFormValidRule($form) {
        var $errorTip = $form.siblings("div.error-info");

        var rules = {
            rules: {
                username: {
                    required: true
                    //isRightName: true
                },
                Mobile: {
                    required: true,
                    minlength: 11,
                    maxlength: 11,
                    number: true
                },
                pwd: {
                    required: true
                },
                smsCode: {
                    required: true,
                    minlength: 4,
                    maxlength: 4,
                    number: true
                },
                //verifyCodePic: {
                //    required: true,
                //    minlength: 4,
                //    maxlength: 4
                //},
                verifycode: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: "请输入用户名"
                    //isRightName: "请检查用户名是否正确"
                },
                pwd: {
                    required: "请输入密码"
                },
                Mobile: {
                    required: "请输入手机号",
                    minlength: "手机号码错误",
                    maxlength: "手机号码错误",
                    number: "手机号码错误"
                },
                smsCode: {
                    required: "请输入动态密码",
                    minlength: "动态密码错误",
                    maxlength: "动态密码错误",
                    number: "动态密码错误。"
                },
                verifyCodePic: {
                    required: "输入验证码",
                    minlength: "验证码错误",
                    maxlength: "验证码错误"
                },
                verifycode: {
                    required: "请输入验证码"
                }
            },
            errorClass: "error",
            errorPlacement: function (error, element) {
                var errorText = error.text();
                var errorTipText = $errorTip.attr("data-error");
                if (!errorText || ($errorTip.css("display") != "none" && errorText == errorTipText)) {
                    return;
                }

                //var $div = $("<div/>").addClass("error-info");
                //if (element[0].id == "verifyCodePic") {
                //    element.nextAll(".error-info").remove();
                //    element.parent().append($div.append(error));
                   
                //} else {
                //    element.parent().nextAll(".error-info").remove();
                //    element.parent().parent().append($div.append(error)); 
                //}
                $errorTip.attr("data-error", errorText).attr("data-eleid", element[0].id).show().children("span").text(errorText);//
                $("#errorMsgCode").hide();
            },
            success: function (label, a) {
                //label.parent().removeClass("error-info").remove();
                //$("#errorMsgCode").hide();
                if ($errorTip.css("display") != "none" && $errorTip.attr("data-eleid") == label.attr("for")) {
                    $errorTip.attr("data-error","").hide();
                }
            }
        };

        var $verifyCodePic = $("#verifyCodePic:visible");
        if ($verifyCodePic.length) {
            addVerifyCodeValidateRule($verifyCodePic);
        }

        return rules;
    }

    var checking = false;
    $("#verifymobileForm input:submit").click(function () {
        if (checking) {
            return false;
        }

        if ($("#verifycode").val().length == 4 && $("#Mobile").val().length == 11) {
            checking = true;
            this.value = "验证中...";
        }
                
    })

    $("#registerForm input:submit").click(function () {
        //展示注册中
        $("#registerSumbit").hide();
        $("#registerGoing").show();
        if ($(".errorInfo").length == 0 && $("#chkFW")[0].checked) {

        }
        else {
            $("#registerSumbit").show();
            $("#registerGoing").hide();
        }
                
    })

    //$("#smsCodeloginform").submit(function () {
    //    //$("div.error-info:last").remove();
    //    if (!$("#smsCode").valid()) {
    //        //$("#smsCode").focus();
    //    }
    //})
});
