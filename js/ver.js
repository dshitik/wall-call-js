/**
 * .
 */
var ver = {
    plus18 : function(){
        var ch = $('#statusPlus18');
        if (ch.val()==0) {
            ch.val(1);
            $("#btnPlus18").addClass("act");
        } else {
            ch.val(0);
            $("#btnPlus18").removeClass("act");
        }
    },
    statusSendWall : function(cont,stat,text){
        cont.find('span').html(text);
        cont.fadeIn('fast');
        cont.removeClass('send').removeClass('error').removeClass('compl');
        cont.addClass(stat);
    },
    send : function(){
        var num = $('#formSendNum').val();
        var text = $('#textWall').val();
        var status = $('#statys_ver');
        if (text.length>0) {
            if(num==1 || num==0){
                var act = {asd:"ver_send",idf:$('#id_friend_select_ver').val(),foto:$("#name_plus_foto_ver").val(),text:text,num:num}
            } else if(num==2){
                var act = {asd:"ver_send",plus18:$('#statusPlus18').val(),countpeople:$('#CountPeopleWorld').val(),foto:$("#name_plus_foto_ver").val(),text:text,num:num}
            } else {
                var act = {asd:"ver_send",plus18:$('#statusPlus18').val(),foto:$("#name_plus_foto_ver").val(),text:text,num:num}
            }

            var q = true;
            if(num==1 || num==0){ if(act.idf==0) q=false;}
            if(q){
                ver.statusSendWall(status,'send','отправка задания...');
                $.post("include/ajax/ver_ajax.php",act,function(posik){
                    posik = posik.trim();
                    console.log(posik)
                    if (posik=="true") {
                        ver.statusSendWall(status,'compl','Спасибо, ваше задание отпавлено...');
                        
                        //ver.refreshForm();
                        
                    } else if(posik=="false_privat"){
                        ver.statusSendWall(status,'error','Вы не можите отправлять задание данному пользователю...');
                    } else {
                        ver.statusSendWall(status,'error','Произошла ошибка, попробуйте еще раз...');
                    }
                    window.setTimeout(function(){status.fadeOut(1100)},3000);
                });
            } else ver.statusSendWall(status,'error','вы не ввыбрали друга...');
        } else ver.statusSendWall(status,'error','вы не ввели условие задания...');
    },
    selectFri:function(){
        $('#slide_friends_ver').slideDown('fast');
        document.getElementById('id_friend_select_ver').value='0';
        $('#text_select_friend').css("display",'none').html('Выберите друга...');
        $('#cont_input_serch_ver').css('display','block');
        document.getElementById('input_serch_ver').focus();
    },
    selectFriHide : function(){
        $('#text_select_friend').css("display",'block');
        $('#cont_input_serch_ver').css('display','none');
        $('#slide_friends_ver').slideUp('fast');
    },
    selectOnceFriend : function(d,id){
        var s = "<div class='cont_one_friend_ver' style='height:34px;width:177px;border-top:none; margin: 2px 5px 5px 0px;'>"+d.innerHTML+"</div>";
        document.getElementById('id_friend_select_ver').value=id;
        $("#text_select_friend").html(s);
    },
    serchFriens : function(d){
        var s = $(d).val();
        $.post("include/ver_ajax.php",{asd:"serchFriensVer",s:s},function(posik){
            if (posik!="false") {
                $("#slide_friends_ver").html(posik);
            }
        });

    },
    glas : function(){
        var ch = $('#glas_viev');
        //var d = $('#btnPlus18');
        if (!ch.attr("checked")) {d.css("backgroundPosition","-93px -46px"); ch.attr("checked",true)}
        else {ch.attr("checked",false); d.css("backgroundPosition","-93px 0px");}
    },
    sendComent : function(){
        //no_coment_with_ver
        var text = $('#text_with_coment_ver').val();
        var id = $('#id_verr').val();
        var d = $("#contJsViewComent");
        if (text.length>0) {
            var count = d.find('.cont_once_coment_ver').length;
            socket.emit("data",{Place:"Coment",Event:"Wall",WallId:id,Message:text});
            var nk = document.getElementById('no_coment_with_ver');
            if (nk!=null) {nk.style.display='none';};
            $('#text_with_coment_ver').val('');
            var s = "<div class='cont_once_coment_ver my' id='show"+count+"' style='display:none'>";
                    s+="<div class='titleComent'>";
                        s+="<div class='foto'><img src='images/popleprofile/mini/"+user.img+"'></div>";
                        s+="<div class='fioAndTime'>";
                            s+="<div class='fio'>"+user.fio+"</div>";
                            s+="<div class='time'>"+chat.gettDate()+"</div>";
                        s+="</div>";
                        s+="<div class='clear'></div>";
                    s+="</div>";
                    s+= "<div class='textComentWall'>"+text+"</div>";
                    s+= "<div class='prlComentWall'></div>";
                s +="</div>";
            d.prepend(s);
            $('#show'+count).fadeIn(500);
        }
    },
    zadOk : function(id,idO){
        $.post("include/ajax/ver_ajax.php",{asd:'zadOk',id:id,idO:idO},function(posik){
            console.log(posik);
            if (posik=="true") {
                window.location.reload();
            } else alert("Произошла ошибка");
        });
    },
    noComplet : function(id,d){
        $(d).html('удаление...');
        $.post('include/ver_ajax.php',{asd:"ver_noComplet",id:id},function(posik){
            console.log(posik)
            if (posik=="true") {
                $(d).html('удаленно...');
                $('#zadania_'+id).hide();
            } else alert("Ошибка");

        })
    },
    removeOtvet:function(id){
        var statys = $('#statys_delete_'+id);
        statys.html("удаление...");
        $.post('include/ajax/ver_ajax.php',{asd:'delete_otvet',id:id},function(posik){
            console.log(posik)
            if (posik=='true') {
                window.location.reload();
            } else {
                statys.html('Произошла ошибка').css({color:'red',fontSize:"11px"});
            }
        });
    },
    deleteMy : function(id,d){
        //alert("функция пока не доступна")
        $(d).html('удаление').css("color","red");
        $.post("include/ver_ajax.php",{asd:"delete_ver",id:id},function(posik) {
            console.log(posik);
            if (posik=="true") {
                $('#zadania_'+id).hide('fast');
            } else {
                $(d).html('Error').css("color","red");
            }
        })
    },
    
    senFast : function(id,d){
        var min = parseInt($('#minyt_fast_zadan').val());
        var sec = parseInt($('#sec_fast_zadan').val());
        var statys = $("#statys_fast_zadan");
        statys.html('отправка...');
        $.post("include/ver_ajax.php",{asd:"sendFast",id:id,min:min,sec:sec},function(posik){
            console.log(posik);
            if (posik=="true") {
                statys.html("отправленно").css("color","green");
                window.setTimeout(function(){$('#fast_time_zada').slideUp('fast');},1500);
            } else statys.html("Error").css("color","red");
        })
    },
    init_time : function(id){
        var cm = $("#minut_end"+id);
        var cs = $("#second_end"+id);
        var m = parseInt(cm.html());
        var s = parseInt(cs.html());

        var time = window.setInterval(function(){if (s==0) {if (m==0) {$('#time_start_fast'+id).html("Время вышло").css('color','red');window.clearInterval(time);} else { s=59;m--;}} else s--;cm.html((m<10) ? '0'+m : m);cs.html((s<10) ? '0'+s : s);},1000);
    },
    deleteComent : function(id){
        $.post("include/ajax/ver_ajax.php",{asd:"deleteComent",id:id},function(posik){
            if (posik=="true") {
                $('#cont_once_coment_ver_'+id).hide();
            } else alert("Error");
        })
    },
    refreshForm : function(){
        
    },
    loadAllComent : function(d,id){
        var p = $('#cont_coment_with_z');
        $.post("include/ver_ajax.php",{asd:'loadAllComent',id:id},function(posik){
            $(d).remove();
            p.html(posik);
        })
    },
    setCount : function(){
        var ch = $('a.warni').find('span');
        var k = 0;
        if(ch.length==0){
            $('a.warni').append("<span>1</span>");
        } else {
            k=parseInt(ch.html())+1;
            ch.html(k);
        }
    },
    parseSock : function(mes){
        //{Place:"Coment",Event:"ReceiveComentWall",UserId:my_id}
        if(mes.Event=="ReceiveComentWall"){
            chat.sound();
            // Этот алгорит свести к одной функции, в чате их 2
            ver.setCount();
        }
    },
    taskForm : function(n){
        $('#formSendNum').val(n);
        if(n!=1){
            $('.dynamic_task_block').hide();
            $('#btnPlus18').show();
        } else { 
            $('.dynamic_task_block').show();
            $('#btnPlus18').hide();
        }
        if(n==2){
            $('#countWorldPeople').show();
        } else {
            $('#countWorldPeople').hide();
        }

    }
}