'use strict';

const Player = require('../models/Player');

const VELOCITY = 10;
const INCREMENT = 0.1;
const WIDTH_X = 30;
const HEIGHT_Y = 30;
const SCREEN_X = 1200; // Futuro uso
const SCREEN_Y = 550; // Futuro uso

var playerGreen = '';
var playerYellow = '';
var playerBlue = '';
var playerPurple = '';

function createPlayer (nickname) {
    if (playerGreen == '') {
        playerGreen = new Player(nickname, 'lime', WIDTH_X, HEIGHT_Y);
    }
    else if (playerYellow == '') {
        playerYellow = new Player(nickname, 'yellow', WIDTH_X, HEIGHT_Y);
    }
    else if (playerBlue == '') {
        playerBlue = new Player(nickname, 'aqua', WIDTH_X, HEIGHT_Y);
    }
    else if (playerPurple == '') {
        playerPurple = new Player(nickname, 'blueviolet', WIDTH_X, HEIGHT_Y);
    }
    
    return true;
}

function allPlayers () {
    let players = [];
    if (playerGreen != '') {
        players.push(playerGreen);
    }
    if (playerYellow != '') {
        players.push(playerYellow);
    }
    if (playerBlue != '') {
        players.push(playerBlue);
    }
    if (playerPurple != '') {
        players.push(playerPurple);
    }
    
    return players;
}

function whoIsPlayer(nickname) {
    if (playerGreen != '') {
        if (playerGreen.nickname == nickname) {
            return playerGreen;
        }
    }
    if (playerYellow != '') {
        if (playerYellow.nickname == nickname) {
            return playerYellow;
        }
    }
    if (playerBlue != '') {
        if (playerBlue.nickname == nickname) {
            return playerBlue;
        }
    }
    if (playerPurple != '') {
        if (playerPurple.nickname == nickname) {
            return playerPurple;
        }
    }
    return '';
}

function movePlayer(nickname, move) {
    let player = whoIsPlayer(nickname);
    if (move == 'left') {
        if (player.x >= 10) {
            player.x-=VELOCITY;
            player.y+=0;
            if (player.infected) {
                player.height+=INCREMENT;
                player.width+=INCREMENT;
            }
            return true;
        }
    }
    else if (move == 'up') {
        if (player.y >= 10) {
            player.x+=0;
            player.y-=VELOCITY;
            if (player.infected) {
                player.height+=INCREMENT;
                player.width+=INCREMENT;
            }
            return true;
        }
    }
    else if (move == 'right') {
        if (player.x <= 1160) {
            player.x+=VELOCITY;
            player.y+=0;
            if (player.infected) {
                player.height+=INCREMENT;
                player.width+=INCREMENT;
            }
            return true;
        }
    }
    else if (move == 'down') {
        if (player.y <= 510) {
            player.x+=0;
            player.y+=VELOCITY;
            if (player.infected) {
                player.height+=INCREMENT;
                player.width+=INCREMENT;
            }
            return true;
        }
    }
    else if (move == 'left_up') {
        if (player.x >= 10) {
            player.x-=VELOCITY;
        }
        if (player.y >= 10) {
            player.y-=VELOCITY;
        }
        if (player.infected) {
            player.height+=INCREMENT;
            player.width+=INCREMENT;
        }
        return true;
    }
    else if (move == 'left_down') {
        if (player.x >= 10) {
            player.x-=VELOCITY;
        }
        if (player.y <= 510) {
            player.y+=VELOCITY;
        }
        if (player.infected) {
            player.height+=INCREMENT;
            player.width+=INCREMENT;
        }
        return true;
    }
    else if (move == 'right_up') {
        if (player.x <= 1160) {
            player.x+=VELOCITY;
        }
        if (player.y >= 10) {
            player.y-=VELOCITY;
        }
        if (player.infected) {
            player.height+=INCREMENT;
            player.width+=INCREMENT;
        }
        return true;
    }
    else if (move == 'right_down') {
        if (player.x <= 1160) {
            player.x+=VELOCITY;
        }
        if (player.y <= 510) {
            player.y+=VELOCITY;
        }
        if (player.infected) {
            player.height+=INCREMENT;
            player.width+=INCREMENT;
        }
        return true;
    }
}

function playerZombie(nickname) {
    if (playerGreen != '') {
        if (playerGreen.nickname == nickname) {
            playerGreen.infected = true;
        }
    }
    if (playerYellow != '') {
        if (playerYellow.nickname == nickname) {
            playerYellow.infected = true;
        }
    }
    if (playerBlue != '') {
        if (playerBlue.nickname == nickname) {
            playerBlue.infected = true;
        }
    }
    if (playerPurple != '') {
        if (playerPurple.nickname == nickname) {
            playerPurple.infected = true;
        }
    }
}

function anyInfected() {
    if (playerGreen != '') {
        if (playerGreen.infected) {
            return true;
        }
    }
    if (playerYellow != '') {
        if (playerYellow.infected) {
            return true;
        }
    }
    if (playerBlue != '') {
        if (playerBlue.infected) {
            return true;
        }
    }
    if (playerPurple != '') {
        if (playerPurple.infected) {
            return true;
        }
    }
    return false;
}

function whoIsInfected() {
    let notInfected = [];
    if (playerGreen != '') {
        if (playerGreen.infected) {
            notInfected = [playerYellow, playerBlue, playerPurple];
            return [playerGreen, notInfected];
        }
    }
    if (playerYellow != '') {
        if (playerYellow.infected) {
            notInfected = [playerGreen, playerBlue, playerPurple];
            return [playerYellow, notInfected];
        }
    }
    if (playerBlue != '') {
        if (playerBlue.infected) {
            notInfected = [playerGreen, playerYellow, playerPurple];
            return [playerBlue, notInfected];
        }
    }
    if (playerPurple != '') {
        if (playerPurple.infected) {
            notInfected = [playerGreen, playerYellow, playerBlue];
            return [playerPurple, notInfected];
        }
    }
    return ['', notInfected];
}

function changeInfected() {
    let [infected, notInfected] = whoIsInfected();
    for (let i = 0; i < notInfected.length; i++) {
        if (infected.x >= (notInfected[i].x - infected.width) && infected.x <= (notInfected[i].x + infected.width) 
        && infected.y >= (notInfected[i].y - infected.height) && infected.y <= (notInfected[i].y + infected.height) 
        && !notInfected[i].protection) {
            infected.width = WIDTH_X;
            infected.height = HEIGHT_Y;
            infected.infected = false;
            infected.protection = true;
            setTimeout(changeProtection, 2000, infected);
            notInfected[i].infected = true;
        }
    }
}

function changeProtection(infected) {
    infected.protection = false;
}

function resetGame(params) {
    playerGreen = '';
    playerYellow = '';
    playerBlue = '';
    playerPurple = '';
}

module.exports = {
    createPlayer,
    allPlayers,
    whoIsPlayer,
    movePlayer,
    playerZombie,
    anyInfected,
    whoIsInfected,
    changeInfected,
    changeProtection,
    resetGame
}