'use strict';

function Player (nickname, color, width, height) {
    this.nickname = nickname;
    this.width = width;
    this.height = height;
    this.x = 10;
    this.y = 10;
    this.color = color;
    this.protection = false;
    this.infected = false;
}

module.exports = Player;