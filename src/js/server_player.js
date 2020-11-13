// Worked on by: Evano
class Player{
    constructor(room, socket, playerName) {
        this.rotation =  0;
        this.x = 1408;
        this.y = 512;
        this.flipX = false;
        this.state = 0;
        this.playerId = socket.id;
        this.playerName = playerName;
    
        console.log("Creating Player", this.playerId);
    }
}

module.exports = {ServerPlayer};