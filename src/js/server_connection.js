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
            Object.keys(players).forEach(function (id) {
              sceneData.addOtherPlayer(players[id]);
            });
          });
        this.socket.on('newPlayer', function (playerInfo) {
            console.log("added other player")
            sceneData.addOtherPlayer(playerInfo);
          });

          //Allows us to pass the findPlayer function into the anonymous functions below
          let self = this;
        this.socket.on('disconnect', function (playerId) {
            self.findPlayer(playerId, sceneData.otherPlayers).destroy();
          });
        this.socket.on('playerMoved', function (playerInfo) {
            console.log()
            self.findPlayer(playerInfo.playerId, sceneData.otherPlayers).setPosition(playerInfo.x, playerInfo.y);
        });
        this.socket.on('killed', function(playerId){
            if(sceneData.serverConnection.socket.id === playerId){
                sceneData.player.setActive(false).setVisible(false);
                alert("you died");
            } else {
                self.findPlayer(playerId, sceneData.otherPlayers).setActive(false).setVisible(false);;
            }
            
        });
    }

    //Helper function that can be removed when we store other players in a key/value json object
    findPlayer(playerId, otherPlayers){
        let op = undefined;
        otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerId === otherPlayer.playerId){
                op = otherPlayer;
            }
        });
        return op;
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
}