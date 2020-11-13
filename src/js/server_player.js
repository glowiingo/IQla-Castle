// Worked on by: Evano
class ServerPlayer{
    constructor(room, socket){
        this.rotation =  0;
        this.x = 1408;
        this.y = 512;
        this.flipX = false;
        this.state = 0;
        this.playerId = socket.id;
    }
}

module.exports = {ServerPlayer};