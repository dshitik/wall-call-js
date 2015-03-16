// Js frineds

var friends = {
	deleteOnPage : function(id,d){
		var dli = $(d).parent();
		$.post("include/ajax_fun.php",{asd:'delete_friends',id:id},function(posik){
			if (posik=="true"){
				dli.removeClass('slot');
				dli.html("<a href=# class='men warni' onclick='friends.addToFriendsPage("+id+",this); return false'>добавить в друзья</a>");
			} else{
				$(d).html('Ошибка, еще раз ?');	
			} 
		})
	},
	delete : function(id,s){
		$(s).html('....');
		$.post("include/ajax/ajax_fun.php",{asd:'delete_friends',id:id},function(posik){
			console.log(posik)
			if (posik=="true") {
				var p = $(s).parent();
				p.removeClass('btn_left');

				p.html("<a href=# class='men addToFriend' onClick='friends.addToFriends("+id+",this,1);return false'>Добавить в друзья</a>");
			}else{
				$(s).html("Ошибка");
			}
		});
	},
	addFriend : function(id){
		var d = "#ccfrid"+id;
		$(d).html('отправляем заявку...');
		$.post("include/ajax_fun.php",{asd:'addFriend',id:id},function(posik){
			if (posik=='true') {
				
				$(d).html('заявка отправлена');
			} else alert('Error');
		})
	},
	addToFriendsPage : function(id,d){
		var dli = $(d).parent();
		$.post("include/ajax_fun.php",{asd:'addFriend',id:id},function(posik){
			if (posik=='true') {		
				dli.addClass('slot');
				dli.html("Вы отправили заявку<br><a href='#' onClick='friends.deleteOnPage("+id+",this);return false;'>удалить</a>");
			} else {
				
			}
		})
	},
	addToFriends : function(id,d,n){
		$(d).html('...');
		$.post("include/ajax/ajax_fun.php",{asd:'addFriend',id:id},function(posik){
			console.log(posik)
			if (posik=="true") {
				if(n==1){
					$(d).parent().addClass('btn_left');
					$(d).parent().html("Вы отправили заявку<br><span onClick='friends.delete("+id+",this);return false;'>отменить</span>");
				} else if(n==2){
					$(d).parent().removeClass('addFri');
					$(d).parent().addClass('btn_left');
					$(d).parent().html("У вас в друзьях<br><span onClick='friends.delete("+id+",this);return false;'>удалить</span>");
				}
			} else $(d).html('Ошибка');
		});
	},
	cencle : function(id){
		this.delete(id,"отменяем...");
	},
	showToolsFoto : function(d){
		$(d).find('.div1').stop().animate({left:0},200);
		$(d).find('.div2').stop().animate({left:0},200);
	},
	hidToolsFoto : function(d){

		var w = parseInt($(d).css("width"));
		$(d).find('.div1').stop().animate({left:-1*(w+6)},200);
		$(d).find('.div2').stop().animate({left:(w+6)},200);
	},
	serch : function(){
		var s = $('#serch_friends').val();
		if (s=="") {
			document.getElementById('serch_friends').focus();
		} else {
			$.post("include/ajax_fun.php",{asd:"serch_people",s:s},function(posik) {
				/*if (posik=="false") {

				} else {
					$('#cont_spis_people').html(posik);
				}*/
				alert(posik)
			})
		}
	},
	searchPoople : function(d){
		var s = $('#serch_all_poople').val();
		var co = $('#list_items_poople');
		if (s=="") {
			document.getElementById('serch_friends').focus();
		} else {
			co.html("<center><img src='images/loading51.gif'></center>");
			$.post("include/ajax_fun.php",{asd:"serch_people",s:s},function(posik) {
				if (posik=="false") {

				} else {
					$('ul.list_li_page_buttom li a.act').removeClass('act');
					co.html(posik);
				}

			});
		}
	}


}
