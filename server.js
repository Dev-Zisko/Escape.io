'use strict';

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const GameController = require('./controller/GameController');

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('name_player', (nickname) => {
        if (nickname != '/resetgamefran') {
            let validate = GameController.whoIsPlayer(nickname);

            if(validate == '') {
                GameController.createPlayer(nickname);
            }

            let players = GameController.allPlayers();

            io.sockets.emit('status_game', players);
        } else{
            GameController.resetGame();

            let players = GameController.allPlayers();

            io.sockets.emit('status_game', players);
        }
        
    });

    socket.on('move_player', (message) => {
        GameController.movePlayer(message.nickname, message.move);
        GameController.changeInfected();
    });

    socket.on('status_players', () => {
	    let players = GameController.allPlayers();
        let numPlayers = players.length;
        if (numPlayers >= 1) {
            let infected = GameController.anyInfected();
            if (!infected) {
                let randomNumber = Math.floor(Math.random() * numPlayers);
                GameController.playerZombie(players[randomNumber].nickname);
            }
        }

        players = GameController.allPlayers();
        
        io.sockets.emit('status_game', players);
    });
});

app.use(express.static(__dirname + '/public'));

var server = http.listen(process.env.PORT || 8000, () => {
    console.log("Servidor listo en http://127.0.0.1:" + server.address().port)
});