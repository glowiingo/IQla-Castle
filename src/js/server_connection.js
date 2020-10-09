class ServerConnection{
    constructor(){
        this.socket = io();
        this.roomName = null;
        this.prevPlayerLocation = {x: null, y: null};
    }
    setRoom(roomName) {
        this.roomName = roomName;
    }
    //Joins room, only if room has been set / selected.
    joinRoom(){
        if(!this.roomName){
            throw "Cannot join Room, room is null";
        }
        this.socket.emit("joinRoom", this.roomName);
    }
    //Add's the required event handlers to support gameplay
    addGameplayHandlers(sceneData){
        this.socket.on('currentPlayers', function (players) {
            sceneData.addPlayer(sceneData, players[sceneData.socket.id]);
            delete players[sceneData.socket.id];
            Object.keys(players).forEach(function (id) {
              sceneData.addOtherPlayer(sceneData, players[id]);
            });
          });
        this.socket.on('newPlayer', function (playerInfo) {
            console.log("added other player")
            sceneData.addOtherPlayer(playerInfo);
          });
        this.socket.on('disconnect', function (playerId) {
            sceneData.otherPlayers[playerId].destroy();
          });
        this.socket.on('playerMoved', function (playerInfo) {
            sceneData.otherPlayers[playerInfo.playerId].setPosition(playerInfo.x, playerInfo.y);
        });
    }

    movement(player){
        if(player.x != this.prevPlayerLocation.x && player.y != this.prevPlayerLocation.y){
            this.prevPlayerLocation = {x: player.x, y: player.y};
            this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y, rotation: 0});
        }
    }
}

module.exports = {ServerConnection};