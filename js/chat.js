// Js Chat
///*********global var*////////
var id_mes_send=-1;
var home_page=-1;
var onlineWrite = {i:true,me:true};


var chat = {
	vstatys : function(cont){
		$('#'+cont).html("<div style='text-align:center;padding-top:20px'><img src='images/loading51.gif'></div>");
	},
	homeload: function(){
		var homePage = $('#cont_viev_chat');
		//chat.vstatys('cont_viev_chat');
		document.getElementById('serch_inp').focus();
		$.post("include/ajax/chat_ajax.php",{asd:'home_page'},function(posik){
			/*if (posik=='false') {
				homePage.html("<div class='no_f'>У вас пока нет друзей</div>");
			} else homePage.html(posik);*/
			//console.log(posik);
			console.log(posik)
			try{
				posik = JSON.parse(posik);
				homePage.html("<div id='contItemsFriends'></div>");
				if(posik.arrayFriends.length>0){
					for (var i = 0; i < posik.arrayFriends.length; i++) {
						$('#contItemsFriends').append("<div class='itemsFriChat' onClick='chat.vievMes("+posik.arrayFriends[i].FirendId+")'><div class='photo_mini'><img src='"+posik.arrayFriends[i].avatar+"'></div><div class='fio'>"+posik.arrayFriends[i].firstName+" "+posik.arrayFriends[i].lastName+"<div class='lastMes'>последнее "+posik.arrayFriends[i].LastMes+"</div></div>"+((posik.arrayFriends[i].CountNewMes>0) ? "<div class='countNewMes'>+"+posik.arrayFriends[i].CountNewMes+"</div>" : "")+"</div>");
					}	
				} else {
					homePage.html("нет сообщений");
				}
				
			}catch(e){
				console.log(e)
			}

		});
	},
	loadMes : function(){
		chat.vstatys('cont_viev_chat');
		$.post("include/ajax/chat_ajax.php",{asd:"load_mes",id:id_mes_send},function(posik){
			console.log(posik);
			posik = JSON.parse(posik);
			if (posik.statys=='false') {
				alert("Error");
			} else if (posik.statys=='true'){
				var d = $('#cont_viev_chat');
				d.html("<div class='topHeadChat'>"+posik.top+"</div>");
				d.append("<div id='itemsMessager'>"+posik.mes+"</div>");
				//$('#cont_viev_chat').html(posik.mes);
				//$('#cont_name_f').html(posik.name);
				var m=document.getElementById('itemsMessager');
				m.scrollTop=m.scrollHeight;
				document.getElementById("mess").focus();

			}
		})
	},
	sound : function(){
		var d = document.getElementById('chat_sounds');
		d.play();
	},
	show : function(n,e,id){
		var l = (id) ? id : 0;
		if (/android|iphone|ipod|ipad|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
			window.location = 'http://wall-call.com/m/chat.php?id='+l;	
			return;
		}
		e = e || window.event;
		$('#cont_chat').fadeIn('fast');
		$('#kol_new_mmes').hide();
  		//var top = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
		//var c = {x:e.pageX-150,y:e.pageY-20-top};
		$("#cont_chat").css({bottom:'20px',left:'5px'});
		chat.vstatys('cont_viev_chat');
		if (n==1) {
			chat.vievHome();
		} else chat.vievMes(id);
	},
	hide : function(){

		home_page=-1;
		id_mes_send = -1;
		$('#cont_chat').fadeOut('fast');
		var z  =$('#kol_new_mmes');
		if (z.html()!='') {z.show()};
		
	},
	vievMes : function(id){
		home_page=-1;
		id_mes_send = id;
		//$('#cont_viev_chat').slideUp('fast');
		//$('#spis_mes_with_f1').slideDown('fast');
		$('#input_cont_chat').slideUp('fast');
		$('#textarea_cont_chat').slideDown('fast');
		chat.loadMes();
	},
	vievHome : function(){
		home_page=1;
		id_mes_send = -1;
		/*$('#cont_viev_chat').slideDown('fast');
		$('#spis_mes_with_f1').slideUp('fast');
		$('#input_cont_chat').slideDown('fast');
		$('#textarea_cont_chat').slideUp('fast');*/
		chat.homeload();
	},
	gettDate : function(){
		var dateObj = new Date();
		var Mounth = new Array('Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сеньтября','Октября','Декабря');
		return dateObj.getDate()+" "+Mounth[dateObj.getMonth()]+" "+dateObj.getFullYear()+" в "+dateObj.getHours()+":"+dateObj.getMinutes();
	},
	parseChat : function(date){
		if (date.Event=="ReceiveMessage"){
			chat.sound();
			chat.setCountMes(1);
			chat.setCountMes(2);
			if (id_mes_send!=-1) {
				if(date.UserId==id_mes_send){
					var no_ms = document.getElementById('no_mess');
					if (no_ms!=null){
						document.getElementById('no_mess').style.display='none';
					}
					$('#itemsMessager').append('<div class="on_mess_f new_mes"><div class="time">'+chat.gettDate()+'</div>'+date.Message+'</div>');
					var m=document.getElementById('itemsMessager');
					m.scrollTop=m.scrollHeight;
				}
			}
		} else if(date.Event == "SendMessag"){
			if(date.Message == "true"){
				sendMessFlag = true;
			}
		} else if(date.Event == "UserWrite"){
			clearTimeout(onlineWrite.me);
			if(date.UserId == id_mes_send){
				$('.statys_write').fadeIn('slow');
				onlineWrite.me = window.setTimeout(function(){$('.statys_write').fadeOut('slow');},2000);
				$('.on_mess_my').removeClass('new_mes');
			}
		}
	},
	setCountMes : function(n){
		if(n==1) { // На панели справа
			var ch = $('a.chat.con_pos').find('span');
			var k = 0;
			if(ch.length==0){
				$('a.chat.con_pos').append("<span>1</span>");
			} else {
				k=parseInt(ch.html())+1;
				ch.html(k);
			}
		} else if(n==2) { // на панели чата
			var ch = $('div.btn_home_chat').find('div');
			var k = 0;
			if(ch.length==0){
				$('div.btn_home_chat').append("<div id='kolVs_mes'>1</div>");
			} else {
				k=parseInt(ch.html())+1;
				ch.html(k);
			}
		}
	},
	sendMes : function(){
		if (sendMessFlag) {
			
			$('div.on_mess_my.error').remove();
			var mess = $('#mess').val();
			if (mess !=""){
				sendMessFlag = false;
				var m = {Place:"Chat",Event:"SendMessag",Message:mess,FriendId:id_mes_send};
				//console.log(m);
				socket.emit("data",m);
				var no_ms = document.getElementById('no_mess');
				if (no_ms!=null){document.getElementById('no_mess').style.display='none';}

				$('#itemsMessager').append("<div class='on_mess_my new_mes'><div class='time'>"+chat.gettDate()+"</div>"+mess+"</div>");
				var m=document.getElementById('itemsMessager');
				m.scrollTop=m.scrollHeight;
				$('#mess').val('');
			}
		}
	},
	onlineWrite : function(){
		if(onlineWrite.i){
			socket.emit("data",{Place:"Chat",Event:"UserWrite",FriendId:id_mes_send});
			onlineWrite.i = false;
			window.setTimeout(function(){onlineWrite.i=true},2000);
		}
		
		
	},
	removeCountMes : function(n){
		if(n>0){
			var ch = $('a.chat').find('span');
			var kk,kk2;
			if (ch.length>0) {
				kk = parseInt(ch.html());
				kk2 = kk-n;
				if (kk2<=0) {
					ch.remove();
				} else {
					ch.html(kk2);	
				}
			}
			var ch = $('div.btn_home_chat').find('div');
			if (ch.length>0) {
				kk = parseInt(ch.html());
				kk2 = kk-n;
				if (kk2<=0) {
					ch.remove();
				} else {
					ch.html(kk2);
				}
			}
		}

	},
	statys1 : function(){
		var countNewMesMe = $('.on_mess_f.new_mes').length;
		/*if (countNewMesMe>0) {
			$.post("include/ajax/chat_ajax.php",{asd:'statys1',id_f:id_mes_send},function(posik){
				if (posik=="true") {
					chat.removeCountMes(countNewMesMe);
					$('.on_mess_f.new_mes').removeClass('new_mes');
				}
			});
		}*/
	},
	keyPos : function(e){
		e = e || window.event;
		chat.statys1();
		if (e.keyCode == 13 && e.ctrlKey) {
			var s = $('#mess').val();
			$('#mess').val(s+"\n");
		} else if (e.keyCode == 13) {
			e.preventDefault();
			chat.sendMes();
    		//whenEnterPressed();
		}
	},
	serchF : function(d){
		var serch = $(d).val();
		$.ajax().abort();
		$.post("include/ajax/chat_ajax.php",{asd:"serch",s:serch},function(posik){
			if (posik!="true") {
				document.getElementById('cont_viev_chat').innerHTML = posik;
			}
		});
	}
}



function DragObject(element) {
	element.dragObject = this
	
	dragMaster.makeDraggable(element)
	
	var rememberPosition
	var mouseOffset
	var scrolTop 
	this.onDragStart = function(offset) {
		var s = document.getElementById('cont_chat').style
		rememberPosition = {top: s.top, left: s.left, position: s.position}
		mouseOffset = offset
		scrolTop = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
	}
		
	
	this.onDragMove = function(x, y) {
		elemment = document.getElementById('cont_chat');
		var xmax = window.screen.width-315;
		if (x - mouseOffset.x<xmax && x - mouseOffset.x>0){
			elemment.style.left = x - mouseOffset.x +'px'
		}
		if (y - mouseOffset.y>0) {
			elemment.style.top =  y - mouseOffset.y - scrolTop +'px'
		}
	}
	
	this.onDragSuccess = function(dropTarget) { 

	}
	
	this.onDragFail = function() {
		/*var s = element.style
		s.top = rememberPosition.top
		s.left = rememberPosition.left
		s.position = rememberPosition.position*/
	}
}

var dragMaster = (function() {

    var dragObject
    var mouseDownAt

	var currentDropTarget

	
	function mouseDown(e) {
		e = fixEvent(e)
		if (e.which!=1) return

 		mouseDownAt = { x: e.pageX, y: e.pageY, element: this }

		addDocumentEventHandlers()

		return false
	}


	function mouseMove(e){
		e = fixEvent(e)

		if (mouseDownAt) {
			if (Math.abs(mouseDownAt.x-e.pageX)<5 && Math.abs(mouseDownAt.y-e.pageY)<5) {
				return false
			}
			var elem  = mouseDownAt.element
			dragObject = elem.dragObject
			var mouseOffset = getMouseOffset(elem, mouseDownAt.x, mouseDownAt.y)
			mouseDownAt = null 
			
			dragObject.onDragStart(mouseOffset) 
		}
		
		dragObject.onDragMove(e.pageX, e.pageY)
		
		
		return false
    }
	
	
    function mouseUp(){
		if (!dragObject) { 
			mouseDownAt = null
		
		} else {
			if (currentDropTarget) {
				currentDropTarget.accept(dragObject)
				dragObject.onDragSuccess(currentDropTarget)
			} else {
				dragObject.onDragFail()
			}
			dragObject = null
		}
		removeDocumentEventHandlers()
    }


	function getMouseOffset(target, x, y) {
		var docPos	= getOffset(target)
		return {x:x - docPos.left, y:y - docPos.top}
	}


	function addDocumentEventHandlers() {
		document.onmousemove = mouseMove
		document.onmouseup = mouseUp
		document.ondragstart = document.body.onselectstart = function() {return false}
	}
	function removeDocumentEventHandlers() {
		document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = null
	}


    return {

		makeDraggable: function(element){
			element.onmousedown = mouseDown
		}
    }
}())


function fixEvent(e) {
	e = e || window.event

	if ( e.pageX == null && e.clientX != null ) {
		var html = document.documentElement
		var body = document.body
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
	}

	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
	}

	return e
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
 
    var body = document.body
    var docElem = document.documentElement
 
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
 
    return { top: Math.round(top), left: Math.round(left) }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent        
    }
 
    return {top: top, left: left}
}

