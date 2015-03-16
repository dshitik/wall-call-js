/**
 * Created by Димасик on 04.03.2015.
 */
(function($) {
    $.fn.lightBox = function(settings) {
        settings = jQuery.extend({
            overlayBgColor: '#000',
            bgOpacity: 0.8,
            fixedNavigation: false,
            imageLoading: 'images/lightbox-ico-loading.gif',
            imageBtnPrev: 'images/btn_prev.png',
            imageBtnNext: 'images/btn_next.png',
            imageBtnClose: 'images/close.png',
            containerBorderSize: 2,
            containerResizeSpeed: 300,
            txtImage: 'Image',
            imageArray: [],
            activeImage: 0
        }, settings);
        var jQueryMatchedObj = this;

        function _initialize() {
            _start(this);
            return false;
        }

        function _start(objClicked) {
            _disableScroll();
            $('embed, object, select').css({
                'visibility': 'hidden'
            });
            $('body').addClass('overflowHidden');
            
            _set_interface();
            settings.imageArray.length = 0;
            settings.activeImage = 0;
            url = objClicked.getAttribute('href');
            id = url.substring(url.lastIndexOf("=")+1);
            _get_array_photo(id);
            _get_coment(id);
            /*if (jQueryMatchedObj.length == 1) {
                settings.imageArray.push(new Array(objClicked.getAttribute('href'), objClicked.getAttribute('data-user')));
            } else {
                for (var i = 0; i < jQueryMatchedObj.length; i++) {
                    settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'), jQueryMatchedObj[i].getAttribute('data-user')));
                }
            }
            while (settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href')) {
                settings.activeImage++;
            }*/
            //_set_image_to_view();
        }
        function _get_coment(id){
            var s = $('#viewItemsComent');
            s.html('<img src="images/loading15.gif">');
            $.post("include/ajax/photo.php",{asd:"load_coment_photo",id:id},function(posik){
                posik = JSON.parse(posik);
                if (posik.statys=="true") {
                    s.html(posik.spis);
                } else s.html('Ошибка при загрузке...');
            });
        }

        function _get_array_photo(id){
            $.post("include/ajax/photo.php",{asd:"loadImg",id:id},function(posik){
                posik = JSON.parse(posik);
                if(posik.status=="true"){
                    for (var i = 0; i < posik.arrayPhoto.length; i++) {
                        settings.imageArray.push(JSON.parse(posik.arrayPhoto[i]));
                        if(settings.imageArray[i].id==id) settings.activeImage=i;
                    }
                    $('#lightbox-image-details-caption').html(posik.nameUser);
                    $('#idWallSendComent').val(id);
                    _set_image_to_view();           
                } else {
                    // view ERROR
                }
            });

        }
        function _set_interface() {
            $('body').append('<div id="jquery-overlay"></div>' +
            '<div id="jquery-lightbox">' +
                '<div id="lightbox-container-image-box">' +
                    '<div id="lightbox-container-image">' +
                        '<img id="lightbox-image">' +
                        '<div style="" id="lightbox-nav">' +
                            '<a href="#" id="lightbox-nav-btnPrev"></a>' +
                            '<a href="#" id="lightbox-nav-btnNext"></a>' +
                        '</div>' +
                        '<div id="lightbox-loading">' +
                            '<div class="ballWrapper">'+
                                '<div class="ball ball_one"></div>'+
                                '<div class="ball ball_two"></div>'+
                                '<div class="ball ball_three"></div>'+
                            '</div>'+
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div id="lightbox-container-image-data-box">' +
                    '<div id="lightbox-container-image-data">' +
                        '<div id="lightbox-image-details">' +
                            '<img src="images/time_friends.png" alt="" class="lightbox-user-img"/>' +
                            '<span id="lightbox-image-details-caption"></span>' +
                        '</div>' +
                        '<div id="lightbox-secNav">' +
                            '<a href="#" id="lightbox-secNav-btnClose"><img src="' + settings.imageBtnClose + '"></a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                    '<div id="lightbox-container-comments">'+

                        '<div class="lightbox-header">'+
                            '<div class="lightbox-photo">'+
                               '<img src="images/popleprofile/mini/'+user.img+'"/>'+
                            '</div>'+
                            '<textarea placeholder="Напишите комментарий..." class="lightbox-textarea" id="textWallComent" onkeydown="onCtrlEnter(event,photo.sendComent)"></textarea>'+
                        '</div>'+
                        '<input type="hidden" id="idWallSendComent">'+
                        '<button class="lightbox-comments_button" onClick="photo.sendComent(this)">Отправить комментарий</button>'+
                        '<div id="status_send_coment_foto"></div>'+
                        '<div class="lightbox-user-comments" id="viewItemsComent">'+
                                /*--Messages from users--*/
                            
                                /*--end Messages from users--*/

                        '</div>'+/*end user comment*/
                    '</div>'+/*end comments container 
                    '<div class="lightbox-footer">'+

                        '<div class="lightbox-footer-user">'+
                            '<img src="images/photos/hd-8.jpg" class="lightbox-footer-user-img"/>'+
                            '<span class="lightbox-footer-user-name">Нюра Карасик</span>'+
                        '</div>'+
                        '<div class="lightbox-footer-task">'+
                            '<span>Сфоткай как ты видишь смерть свою! Только в ярких цветах, так чтобы прям умереть захотелось!)</span>'+
                        '</div>'+

                        '<div class="lightbox-footer-like">'+
                            '<div class="lightbox-footer-event-click">'+
                            '<span>129</span>'+
                            '<i class="fa fa-heart-o fa-heart-o-click"></i>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+*/
            '</div>');

            var arrPageSizes = ___getPageSize();
            $('#jquery-overlay').css({
                backgroundColor: settings.overlayBgColor,
                opacity:settings.bgOpacity,
                width: arrPageSizes[0],
                height: arrPageSizes[1]
            }).fadeIn();

            var arrPageScroll = ___getPageScroll();
            $('#jquery-lightbox').css({
                top:0,
                left: arrPageScroll[0]
            }).show();

            $('#jquery-overlay').click(function() {
                _finish();
            });

            $('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function() {
                _finish();
                return false;
            });

            $(window).resize(function() {
                var arrPageSizes = ___getPageSize();
                $('#jquery-overlay').css({
                    width: 100 + '%',
                    height: arrPageSizes[1]
                });
                var arrPageScroll = ___getPageScroll();
                $('#jquery-lightbox').css({
                    top: 0,
                    left: arrPageScroll[0]
                });
            });
            function _like(){
                $(".fa-heart-o").show()
                    .fadeOut("fast")
                    .addClass('fa-heart')
                    .removeClass('fa-heart-o')
                    .show()
                    .fadeIn('fast');
                bool=false;
            }
            function _unlike() {
                $(".fa-heart")
                    .show().
                    fadeOut("fast")
                    .addClass('fa-heart-o')
                    .removeClass('fa-heart')
                    .show()
                    .fadeIn('fast');
                bool=true;
            }

            var bool = true;
            $(".lightbox-footer-event-click").click(function(){
                bool?_like():_unlike();
            });


            //$(".fa-heart-o").click(function () {
            //    $(this).addClass("fa-heart");
            //}, function () {
            //    $(this).removeClass("fa-heart-o");
            //});
            //
            //$(".fa-heart").click(function () {
            //    $(this).addClass("fa-heart-o");
            //}, function () {
            //    $(this).removeClass("fa-heart");
            //});

        }

        function _set_image_to_view() {
            $('#lightbox-loading').show();
            if (settings.fixedNavigation) {
                $('#lightbox-image').hide();
            } else {
                $('#lightbox-image,#lightbox-nav').hide();
            }

            var objImagePreloader = new Image();

            objImagePreloader.onload = function() {
                $('#lightbox-image').attr('src', settings.imageArray[settings.activeImage].url);
                _resize_container_image_box(objImagePreloader.width, objImagePreloader.height);
                objImagePreloader.onload = function() {};
            };
            objImagePreloader.src = settings.imageArray[settings.activeImage].url;
            $('#idWallSendComent').val(settings.imageArray[settings.activeImage].id);
            _get_coment(settings.imageArray[settings.activeImage].id);

        };

        function _resize_container_image_box(intImageWidth, intImageHeight) {
            var intCurrentWidth = $('#jquery-lightbox').width()-300;
            var intCurrentHeight = $('#jquery-lightbox').height()-60;
            //alert("IMG:"+intImageWidth+"x"+intImageHeight);
            //alert(intCurrentWidth+"x"+intCurrentHeight);
            /*alert(settings.containerBorderSize);*/
            var intWidth = (intImageWidth + (settings.containerBorderSize * 2));
            var intHeight = (intImageHeight + (settings.containerBorderSize * 2));
            var intDiffW = intCurrentWidth - intWidth;
            var intDiffH = intCurrentHeight - intHeight;
            
            if(intImageWidth>intImageHeight){

                k = intImageHeight/intImageWidth;
               // alert(intCurrentWidth);
                finishWidth = intCurrentWidth;
                finishHeight = intCurrentWidth/k;
            } else {
                k = intImageWidth/intImageHeight;
                finishHeight = intCurrentHeight;
                finishWidth = k*intCurrentHeight;
            }
            //alert("FINISH:"+finishWidth+"x"+finishHeight);
            $('#lightbox-container-image-box').animate({
                width: finishWidth + 'px',
                height: finishHeight
            }, settings.containerResizeSpeed, function () {
                _show_image();
            });
            $('#lightbox-image').css({
                width: finishWidth
            });
            /*var resultSizeImg = function () {
                var size;
                if(intWidth<850){
                    size =intWidth;
                } else if(intWidth>1150){
                    size = 1150;
                }
                $('#lightbox-container-image-box').animate({
                    width: size + 'px',
                    height: intHeight
                }, settings.containerResizeSpeed, function () {
                    _show_image();
                });
                if(intImageWidth>intImageHeight){
                    $('#lightbox-image').css({
                        height: size
                    });
                } else {
                    $('#lightbox-image').css({
                        width: size
                    });
                }
            };
            resultSizeImg();*/
            if ((intDiffW == 0) && (intDiffH == 0)) {
                if ($.browser.msie) {
                    ___pause(250);
                } else {
                    ___pause(100);
                }
            }
            $('#lightbox-container-image-data-box').css({
                width: 100 + '%' /*intImageWidth*/
            });
        };

        function _show_image() {
            $('#lightbox-loading').hide();
            $('#lightbox-image').fadeIn(function() {
                _show_image_data();
                _set_navigation();
            });
            _preload_neighbor_images();
        };

        function _show_image_data() {
            $('#lightbox-container-image-data-box').slideDown('fast');
            //$('#lightbox-image-details-caption').hide();
            //if (settings.imageArray[settings.activeImage][1]) {
            //    $('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();
            //}
        }

        function _set_navigation() {
            
            $('#lightbox-nav').show();
            //$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({
            //    'background': 'transparent url(' + settings.imageBlank + ') no-repeat'
            //});
            //if (settings.activeImage != 0) {
                if (settings.fixedNavigation) {
                    $('#lightbox-nav-btnPrev').unbind().bind('click', function() {
                        settings.activeImage =(settings.activeImage<=0) ? settings.imageArray.length-1 : settings.activeImage - 1;
                        _set_image_to_view();
                        return false;
                    });
                } else {
                    $('#lightbox-nav-btnPrev').unbind().hover(function() {
                    }, function() {
                        $(this).css({
                            'background': 'transparent url(' + settings.imageBtnPrev + ') left 50% no-repeat'
                        });
                    }).show().bind('click', function() {
                        settings.activeImage =(settings.activeImage<=0) ? settings.imageArray.length-1 : settings.activeImage - 1;
                        _set_image_to_view();
                        return false;
                    });
                }
            //}
            //if (settings.activeImage != (settings.imageArray.length - 1)) {
                if (settings.fixedNavigation) {

                    $('#lightbox-nav-btnNext').css({
                        'background': 'url(' + settings.imageBtnNext + ') right 5% no-repeat'
                    }).unbind().bind('click', function() {
                        settings.activeImage = (settings.activeImage>=settings.imageArray.length) ? 0 : settings.activeImage + 1;
                        _set_image_to_view();
                        return false;
                    });

                } else {

                    $('#lightbox-nav-btnNext').unbind().hover(function() {
                        $(this).css({
                            'background': 'url(' + settings.imageBtnNext + ') right 50% no-repeat'
                        });
                    }).show().bind('click', function() {
                        settings.activeImage = (settings.activeImage>=settings.imageArray.length) ? 0 : settings.activeImage + 1;
                        _set_image_to_view();
                        return false;
                    });

                }
            //}
        }
        function _disableScroll() {
            document.onmousewheel = document.onwheel = function() {
                return false;
            };
            document.addEventListener ("MozMousePixelScroll",
                function() { return false }, false);
            document.onkeydown = function(e) {
                if (e.keyCode >= 33 && e.keyCode <= 40) return false;
            }
        }

        function _enableScroll() {
            document.onmousewheel = document.onwheel = function() {
                return true;
            };
            document.addEventListener ("MozMousePixelScroll",
                function() { return true }, true);
            document.onkeydown = function(e) {
                if (e.keyCode >= 33 && e.keyCode <= 40) return true;
            }
        }
        function _preload_neighbor_images() {
            if ((settings.imageArray.length - 1) > settings.activeImage) {
                objNext = new Image();
                objNext.src = settings.imageArray[settings.activeImage + 1][0];
            }
            if (settings.activeImage > 0) {
                objPrev = new Image();
                objPrev.src = settings.imageArray[settings.activeImage - 1][0];
            }
        }

        function _finish() {
            _enableScroll();
            $('body').removeClass('overflowHidden');
            $('#jquery-lightbox').remove();
            $('#jquery-overlay').fadeOut(function() {
                $('#jquery-overlay').remove();
            });
            $('embed, object, select').css({
                'visibility': 'visible'
            });

        }

        function ___getPageSize() {
            var xScroll, yScroll;
            if (window.innerHeight && window.scrollMaxY) {
                xScroll = window.innerWidth + window.scrollMaxX;
                yScroll = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight) {
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else {
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
            var windowWidth, windowHeight;
            if (self.innerHeight) {
                if (document.documentElement.clientWidth) {
                    windowWidth = document.documentElement.clientWidth;
                } else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            } else if (document.documentElement && document.documentElement.clientHeight) {
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else if (document.body) {
                windowWidth = document.body.clientWidth;
                windowHeight = document.body.clientHeight;
            }
            if (yScroll < windowHeight) {
                pageHeight = windowHeight;
            } else {
                pageHeight = yScroll;
            }
            if (xScroll < windowWidth) {
                pageWidth = xScroll;
            } else {
                pageWidth = windowWidth;
            }
            arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
            return arrayPageSize;
        };

        function ___getPageScroll() {
            var xScroll, yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
                xScroll = self.pageXOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {
                yScroll = document.documentElement.scrollTop;
                xScroll = document.documentElement.scrollLeft;
            } else if (document.body) {
                yScroll = document.body.scrollTop;
                xScroll = document.body.scrollLeft;
            }
            arrayPageScroll = new Array(xScroll, yScroll);
            return arrayPageScroll;
        };

        function ___pause(ms) {
            var date = new Date();
            curDate = null;
            do {
                var curDate = new Date();
            }
            while (curDate - date < ms);
        };
        return this.unbind('click').click(_initialize);
    };

})(jQuery);