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
            sceneData.addPlayer(sceneData, players[this.socket.id]);
            delete players[this.socket.id];
            Object.keys(players).forEach(function (id) {
              sceneData.addOtherPlayer(sceneData, players[id]);
            });
          });
        this.socket.on('newPlayer', function (playerInfo) {
            console.log("added other player")
            sceneData.addOtherPlayer(playerInfo);
          });
        this.socket.on('disconnect', function (playerId) {
            this.findPlayer(playerId, sceneData.otherPlayers).destroy();
          });
        this.socket.on('playerMoved', function (playerInfo) {
            this.findPlayer(playerInfo.playerId, sceneData.otherPlayers).setPosition(playerInfo.x, playerInfo.y);
        });
        this.socket.on('killed', function(playerId){
            this.findPlayer(playerId, sceneData.otherPlayers).killed();
        });
    }

    //Helper function that can be removed when we store other players in a key/value json object
    findPlayer(playerId, otherPlayers){
        otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerId === otherPlayer.playerId){
                return otherPlayer;
            }
        });
    }

    movement(player){
        if(player.x != this.prevPlayerLocation.x && player.y != this.prevPlayerLocation.y){
            this.prevPlayerLocation = {x: player.x, y: player.y};
            this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y, rotation: 0});
        }
    }

    kill(playerId){
        this.socket.emit('kill', playerId);
    }
}

module.exports = {ServerConnection};