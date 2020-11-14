// Worked on by: Evano
class Room{
    constructor(roomName, victoryHandler){
        this.name = roomName;
        this.players = {};
        this.countUp = 0;
        this.detectiveCount = 0;
        this.vampireCount = 0;
        this.victoryHandler = victoryHandler;
        this.taskCount = 0;
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
        this.detectiveCount = Object.keys(this.players).length;

        let vampireRate = 0.25;
        let players = Object.keys(this.players);
        do{
            let choice = Math.floor(Math.random() * players.length);
            roles[players[choice]] = "vampire";
            this.players[players[choice]].team = "vampire";
            players.splice(choice, 1);
            this.detectiveCount--;
            this.vampireCount++;
        }
        while(players.length / Object.keys(this.players).length <= vampireRate);
        return roles;
    }
    playerEliminated(playerId){
        if(this.players[playerId].team == "detective"){
            this.detectiveCount--;
        } else {
            this.vampireCount--;
        }
        if(this.vampireCount == 0){
            this.victoryHandler("detectives");
        } else if(this.vampireCount >= this.detectiveCount){
            this.victoryHandler("vampires");
        }
    }
    taskComplete(playerId){
        if(this.players[playerId].team == "detective"){
            this.taskCount++;
        } else {
            this.taskCount++;
        }
        if(this.taskCount > 2){
            this.victoryHandler("detectives");
        }
    }
}

module.exports = {Room};