// Worked on by: Evano
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
            sceneData.addPlayer(players[sceneData.serverConnection.socket.id]);
            delete players[sceneData.serverConnection.socket.id];
            sceneData.addOtherPlayers(players);
          });
        this.socket.on('newPlayer', function (playerInfo) {
            console.log("added other player")
            sceneData.addOtherPlayer(playerInfo);
          });
        this.socket.on('disconnect', function (playerId) {
            sceneData.removePlayer(playerId);
          });
        this.socket.on('playerMoved', function (playerInfo) {
            sceneData.otherPlayers[playerInfo.playerId].setPosition(playerInfo.x, playerInfo.y);
        });
        this.socket.on('gameStart', function (roleData) {
            sceneData.startGame(roleData);
        });
        this.socket.on('killed', function(playerId){
            console.log("I am killed", playerId, sceneData.serverConnection.socket.id);
            if(sceneData.serverConnection.socket.id === playerId){
                sceneData.player.setActive(false).setVisible(false);
                sceneData.player.alive = false;
                alert("you died");
            } else {
                sceneData.otherPlayers[playerId].setActive(false).setVisible(false);;
            }
            
        });
    }

    movement(player){
        this.socket.emit('playerMovement', { x: player.x, y: player.y, rotation: 0});
        if(player.x != this.prevPlayerLocation.x && player.y != this.prevPlayerLocation.y){
            this.prevPlayerLocation = {x: player.x, y: player.y};
            
        }
    }

    kill(playerId){
        this.socket.emit('kill', playerId);
    }

    alertGameStart(){
        this.socket.emit('alertGameStart', {});
        console.log("sent alert from client");
    }
}