//Javascript
var photo = {
	sendComent : function(d){
		var id = $('#idWallSendComent').val();
		var text = $('#textWallComent').val();
		var status = $("#status_send_coment_foto");
		if(text.length>0){
			status.html("отправка");
			$.post("include/ajax/photo.php",{asd:"send_coment_photo",id:id,text:text},function(posik){
				console.log(posik);
				posik=JSON.parse(posik);
				if (posik.status=="true") {
					var dam = document.getElementsByClassName('no_coment');
					if (dam[0]!=null) {
						dam[0].style.display="none";
					} 		
					var cont = "";
					cont+='<div class="lightbox-single-comment">';
						cont+='<div class="lightbox-photo user-comment-photo">';
							cont+="<img src='images/popleprofile/mini/"+user.img+"'>";
							cont+='<div class="lightbox-single-comment-info">';
								cont+='<p class="user-fio">'+user.fio+'</p>';
								cont+='<p class="single-comment-date">'+chat.gettDate()+'</p>';
							cont+="</div>";
						cont+='</div>';
						cont+='<p class="lightbox-single-comment-text">'+text+'</p>';
						cont+="<div class='lightbox-triangle-user'></div>";
					cont+='</div>';
					$('#viewItemsComent').prepend(cont);
					//$('#spis_coment_foto').prepend("<div class='once_coment_foto' id='coment_foto_id_"+posik.id+"'><div class='delete' onClick='photo.deleteComent("+posik.id+")'></div><div class='foto'><img src='images/popleprofile/mini/"+user.img+"'></div><div class='cont_inf_coment_foto'><div class='fio'>"+user.fio+"<span style='margin-left:15px;font-size:12px;color:#ccc;'>"+chat.gettDate()+"</span></div><div class='coment_text'>"+text+"</div></div><div class='clear'></div></div>");
					$('#textWallComent').val("");
					status.html("");
				} else status.html("Error");
			})
		} else {
			$('#text_coment_foto').css("border",'1px solid red');
			window.setTimeout(function(){$('#text_coment_foto').css("border",'1px solid rgb(169, 169, 169)');},2000);
		}
	},
	deleteComent : function(id){
		$.post("include/ajax_fun.php",{asd:"deleteComent",id:id},function(posik){
			if (posik=="true") {
				$('#coment_foto_id_'+id).hide();
			} else alert("Error");
		})
	}	
}