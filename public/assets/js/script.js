'use strict';

var socket = io();

var idle = true, rightPressed = false, leftPressed = false, upPressed = false, downPressed = false;

var obj1 = '';
var obj2 = '';
var obj3 = '';
var obj4 = '';

var myNick = '';

var ctx = document.getElementById("lienzo").getContext('2d');

const VELOCITY = 10;
const FPS = 60;

document.addEventListener("keydown", teclaPress, false);
document.addEventListener("keyup", teclaNoPress, false);

function teclaPress(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
        idle = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        idle = false;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
        idle = false;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
        idle = false;
    }
}

function teclaNoPress(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
        idle = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
        idle = true;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
        idle = true;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
        idle = true;
    }
}

setInterval(function(){
    socket.emit('status_players');  // Lo emitimos
    movePlayer();
	render();
}, 1200/FPS);

// Capturamos el clic en el botón de enviar
var form = $("form").on("submit", function (e) {
    // Desactivamos el formulario para enviarlo con JS
    e.preventDefault();

    var nickname = document.getElementById('nickname').value;
    document.getElementById('boton').style.display = "none";
    document.getElementById('nickname').disabled = true;
    myNick = nickname;
    socket.emit('name_player', nickname);  // Lo emitimos
});

// Recuperamos el mensaje y lo añadimos al HTML
socket.on('status_game', function (players) {
    for (let i = 0; i < players.length; i++) {
        if (i == 0) {
            obj1 = players[i];
        }
        else if (i == 1) {
            obj2 = players[i];
        }
        else if (i == 2) {
            obj3 = players[i];
        }
        else if (i == 3) {
            obj4 = players[i];
        }
    }
    render();
});
    
function render() {
    // Limpiar pantalla
    ctx.clearRect(0,0,lienzo.width,lienzo.height);
    // Dibujamos el objeto
    if (obj1 != '') {
        if (obj1.infected) {
            ctx.fillStyle = 'red';
        }
        else {
            ctx.fillStyle = obj1.color;
        }
        ctx.fillRect(obj1.x, obj1.y, obj1.width, obj1.height);
    }
    if (obj2 != '') {
        if (obj2.infected) {
            ctx.fillStyle = 'red';
        }
        else {
            ctx.fillStyle = obj2.color;
        }
        ctx.fillRect(obj2.x, obj2.y, obj2.width, obj2.height);
    }
    if (obj3 != '') {
        if (obj3.infected) {
            ctx.fillStyle = 'red';
        }
        else {
            ctx.fillStyle = obj3.color;
        }
        ctx.fillRect(obj3.x, obj3.y, obj3.width, obj3.height);
    }
    if (obj4 != '') {
        if (obj4.infected) {
            ctx.fillStyle = 'red';
        }
        else {
            ctx.fillStyle = obj4.color;
        }
        ctx.fillRect(obj4.x, obj4.y, obj4.width, obj4.height);
    }
}

function movePlayer() {
    if (leftPressed && !upPressed && !rightPressed && !downPressed) {
        let message = {
            nickname: myNick,
            move: 'left'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
    else if (upPressed && !leftPressed && !rightPressed && !downPressed) {
        let message = {
            nickname: myNick,
            move: 'up'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
    else if (rightPressed && !upPressed && !leftPressed && !downPressed) {
        let message = {
            nickname: myNick,
            move: 'right'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
    else if (downPressed && !upPressed && !rightPressed && !leftPressed) {
        let message = {
            nickname: myNick,
            move: 'down'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
    else if (leftPressed && upPressed && !rightPressed && !downPressed) {
        let message = {
            nickname: myNick,
            move: 'left_up'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
    else if (leftPressed && !upPressed && !rightPressed && downPressed) {
        let message = {
            nickname: myNick,
            move: 'left_down'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
    else if (!leftPressed && upPressed && rightPressed && !downPressed) {
        let message = {
            nickname: myNick,
            move: 'right_up'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
    else if (!leftPressed && !upPressed && rightPressed && downPressed) {
        let message = {
            nickname: myNick,
            move: 'right_down'
        };
        socket.emit('move_player', message);  // Lo emitimos
    }
}