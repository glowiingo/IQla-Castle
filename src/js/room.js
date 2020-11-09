// Worked on by: Evano
class Room{
    constructor(roomName){
        this.name = roomName;
        this.players = {};
        this.countUp = 0;
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
    getRoleAssignments(){
        let roles = {};
        for(let playerId of Object.keys(this.players)){
            roles[playerId] = "detective";
        }
        let vampireRate = 0.25;
        let players = Object.keys(this.players);
        do{
            let choice = Math.floor(Math.random() * players.length);
            roles[players[choice]] = "vampire";
            players.splice(choice, 1);
        }
        while(players.length / Object.keys(this.players).length <= vampireRate);
        return roles;
    }
}

module.exports = {Room};