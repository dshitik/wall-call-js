$(document).ready(function(){
	
	$('a.viewBigPhoto').lightBox();
	$('.cont_once_ind_pop').mouseover(function(){
		$('.cont_once_ind_pop').not(this).addClass('act');
	}).mouseout(function(){
		$('.cont_once_ind_pop').not(this).removeClass('act');
	});
	$('.itemsLike .onceLike').mouseover(function(){

		var n = $('.itemsLike .onceLike').index(this);
		for (var i = 0; i <= n; i++) {
			$('.itemsLike .onceLike').eq(i).addClass('set');
		}
		
	}).mouseout(function(){
		$('.itemsLike .onceLike').removeClass('set');
	}).click(function(){
		var n = $('.itemsLike .onceLike').index(this);
		var v = $(this).parent().attr('date-ap');
		var id_page = $(this).parent().attr('date-n');
		var vv = 1;
		if(v=='z'){
			vv=1;
		} else if(v=='p'){
			vv=2;
		}
		$.post("include/ajax/like.php",{asd:"setLike",v:vv,id_page:id_page,k:n+1},function(posik){
			posik = JSON.parse(posik);
			if(posik.statys=='true'){
				$('.itemsLike .onceLike').removeClass('sett');
				for (var i = 0; i <= n; i++) {
					$('.itemsLike .onceLike').eq(i).addClass('sett');
				}		
				$('.itemsLike .countLike').html(posik.count);
			}
		});
	});
	$("#list_items_menu li a").mouseover(function(){
		$(this).addClass('hover');
	}).mouseout(function(){
		$(this).removeClass('hover');
	});
	$('.linkTopRight li a').mouseover(function(){
		$(this).addClass('hover');
	}).mouseout(function(){
		$(this).removeClass('hover');
	}).click(function(){
		$('.linkTopRight li a').removeClass('act');
		$(this).addClass('act');
		$('.cont_inf_once_block .itemsLeftFriends').css({display:"none"});
		var ind = $(".linkTopRight li a").index(this);
		if(ind!=2) // ПОка поиска не работает 
			$('.itemsLeftFriends').eq(ind).css({display:"block"});
		//alert($(".linkTopRight li a").index(this))
	});
	$('.btn_with_friends ul li a').mouseover(function(){
		$(this).addClass('hover');
	}).mouseout(function(){
		$(this).removeClass('hover');
	});
	
});
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
var popup = {
	show : function(){
		$('#popup_div').css("display",'block').animate({opacity:1},'fast');
	},
	hide : function(){
		$('#popup_div').animate({opacity:0},'slow',function(){$(this).css({display:'none'})});
		$('#popup_reg').css("display","none");
	}
}
var user = {
	reg : function(){
		if (/android|iphone|ipod|ipad|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
			window.location = '/m/reg.php';	
		} else {	
			popup.show();
			var pop = $('#popup_reg');
			var s = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
			left = window.screen.width/2-300;
			topp = s+50;
			pop.css({left:left,top:topp,display:'block'});
		}
	},
	registr : function(d){
		var email = $("#email_reg").val();
		var pas = $('#pass_reg').val();
		var statys = $('#reg_statys');
		var r = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		if (r.test(email)) {
			if (pas.length>4) {
				statys.html('Отправка...');
				$.post("include/ajax/reg_ajax.php",{asd:"creatUs",email:email,pas:pas},function(posik){

					posik = JSON.parse(posik);

					if (posik.statys=="true") {
						$('#cont_ss2').html('Спасибо. Регистрация прошла успешна. Вам осталось только пройти по ссылке которую ма отправили вам на почту что бы активировать ваш акаунт...').css({paddingTop:"20px",color:"#666",textAlign:"center"});
					} else console.log(posik);
				});
			} else statys.html('Пароль должен быть больше 4 символов');
		} else statys.html('E-mail введен не коректно');

	},
	vhod : function(){
		var log = $('#email').val();
		var pas = $('#pass').val();
		var rememberme = $('#rememberme').attr('checked');
		var statys = $('#statys_vhod');
		statys.css({display:'block'}).html("<img src='images/loading15.gif'>");
		if (log=="") {
			statys.html("Вы не ввели свой E-mail...").css({background:'#feeded'});
		} else if (pas=="") {
			statys.html("Вы не ввели свой пароль...").css({background:'#feeded'});
		} else {
			$.post("include/ajax/ajax_fun.php",{asd:'vhod',log:log,pas:pas,rememberme:rememberme},function(posik){
				console.log(posik)
				posik = JSON.parse(posik);
				if (posik.statys=='true') {

					//if (posik.reme==1) {
						var domain = "."+window.location.hostname;
						var date = new Date( new Date().getTime() + 12*31*24*60*60*1000 );
						setCookie("auto","1",date.toUTCString(),"/",domain);
						setCookie("userid",posik.id,date.toUTCString(),"/",domain);
						setCookie("posik",posik.kode,date.toUTCString(),"/",domain);
					//}
					window.location='/id'+posik.id;
				} else if (posik.statys=='false') {
					alert('Ошибка')
					statys.html('Не верно введен пароль...');
				};
			});
		}
	},
	sl : function(n,d){
		var n2 = (n==1) ? 2 : 1;
		$('#cont_ss'+n2).slideUp('fast');
		$('#cont_ss'+n).slideDown('fast');
		$('.btnEnter.act').removeClass('act');
		$(d).addClass('act');
		//if(n==2) $('#remd').hide(); else $('#remd').show();
	}
}
function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function delete_news(id){
	$.post('include/ajax_fun.php',{asd:"delete_news",id:id},function(posik){
		if (posik == "true") {
			$('#news_'+id).slideUp('fast');
		}
	});
}

function load_friends(n){
	var statys = $('#loading_friends');
	statys.html("загрузка...");
	$.post("include/ajax/ajax_fun.php",{asd:"loading_friends",n:n},function(posik){
		$('#friends_my_page_load').html(posik);
		statys.html('');
	});
	if (n==1) {
		$('.btn_online_friends').addClass('act');
		$('.btn_vse_friends').removeClass('act');
	} else if(n==2){
		$('.btn_online_friends').removeClass('act');
		$('.btn_vse_friends').addClass('act');
	}
}

function rememd () {
	var ch = $('#rememberme');
	var t = $('#text_btn_rem');
	var i = $('#galka_rem');
	if (ch.attr('checked')) {
		ch.attr('checked',false);
		t.html('не запоминать');
		i.html("<img src='images/no.png' >");
	} else {
		ch.attr('checked',true);
		t.html('запомнить');
		i.html("<img src='images/ok.png' width=20>");
	}
	
}

function onCtrlEnter(e,arg){
	e = e || window.event;
	if (e.keyCode == 13 && e.ctrlKey){		
		arg();
	}
}

function whenEnterPress(e,arg){
	e = e || window.event;
	if (e.keyCode == 13) {		
		arg();
	}
}

function getChar(event) {
	if (event.which == null) {
	if (event.keyCode < 32) return null;
		return String.fromCharCode(event.keyCode) // IE
	}
	if (event.which!=0 && event.charCode!=0) {
		if (event.which < 32) return null;
			return String.fromCharCode(event.which)   // остальные
	}
	return null; // специальная клавиша
}

function initNumb(d){
	document.getElementById(d).onkeypress = function(e) {
		e = e || event;
		if (e.ctrlKey || e.altKey || e.metaKey) return;
		var chr = getChar(e);
		// с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
		// на всякий случай лучше вынести проверку chr == null отдельно
		if (chr == null) return;
		if (chr < '0' || chr > '9') {
			return false;
			}
	}
}
function setOblogka(id,d){
	$.post("include/ajax/ajax_fun.php",{asd:"setOblogka",id:id},function(posik){
		if (posik=="true") {
			$('.btn_act_act').removeClass('btn_act_act').addClass('btn_act').html('установить');
			$(d).removeClass('btn_act').addClass('btn_act_act').html('активна');
		} else {
			alert('Ошибка');
		}
	});
}
function getNameBrouser() {
    var userAgent = navigator.userAgent.toLowerCase();
    //Internet Explorer
    if(userAgent.indexOf("msie") != -1 && userAgent.indexOf("opera") == -1 && userAgent.indexOf("webtv") == -1) return "msie";
 	// Opera
 	if(userAgent.indexOf("opera") != -1)return "opera";
 	// Gecko = Mozilla + Firefox + Netscape
    if (userAgent.indexOf("gecko") != -1)return "gecko";
    // Safari, используется в MAC OS
    if (userAgent.indexOf("safari") != -1)return "safari";
    // Konqueror, используется в UNIX-системах
    if (userAgent.indexOf("konqueror") != -1)return "konqueror";
    return "unknown";
}
function setUrlJs(url){
		history.pushState("", "", url);
        history.replaceState("", "", url);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

		//return false;  
}

function limit(class_n,v,id_cont,p,id){
	var n = $('#'+id_cont).find('.'+class_n).length;
	$.post("include/limit_ajax.php",{asd:"limit",n:n,p:p,id:id},function(posik){
		console.log(posik);
	})	
}