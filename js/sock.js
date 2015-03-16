//Socket
/*var startSockMy = JSON.stringify({asd:"log",id:getCookie("userid"),posik:getCookie("posik")});
var sock = new SockJS('http://5.61.42.245:9999/echo');

sock.onopen = function() {
 console.log('open');
 sock.send(startSockMy);
};
sock.onmessage = function(e) {
 	
 	posik = JSON.parse(e.data);
 	if (posik.whith=="chat") {
 		chat.parseChat(posik);
 	}
};
sock.onclose = function() {
	var sock = new SockJS('http://5.61.42.245:9999/echo');
 	console.log('close');
};
*/
//var socket;
//$(document).ready(function () {
	var sendMessFlag = true;
    var startSockMy = {Place:"User",Event:"log",UserId:getCookie("userid"),Password:getCookie("posik")};
    var socket = io.connect('http://5.61.42.245:9998');
    socket.on('connect', function () {
        console.log('open');
        //socket.send("hi");
        sendMessFlag = true;
        socket.emit('data',startSockMy); 
        socket.on("data",function(mes){
        	if (mes.Place=="Chat") {
		 		chat.parseChat(mes);
		 	} else if(mes.Place=="Coment"){
                ver.parseSock(mes);
            }
        });  
    });
//});