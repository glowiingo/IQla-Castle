class Room{
    constructor(roomName){
        this.name = roomName;
        this.players = {};
        this.countUp = 0;
        //this.loop = setInterval(this.update, 100);
    }
    update(){
        console.log(`Updating room ${this.name}, count: ${this.countUp}`);
        this.countUp++;
    }
    stop(){
        clearInterval(this.loop);
    }
    addPlayer(player){
        console.log("adding new player to room");
        this.players[player.playerId] = player;
    }
    getPlayer(id){
        return this.players[id];
    }
    removePlayer(id){
        delete this.players[id];
    }
    hasPlayers(){
        return Object.keys(this.players).length > 0;
    }
}

module.exports = {Room};