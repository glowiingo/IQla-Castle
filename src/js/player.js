class Player{
    constructor(room, socket){
        this.rotation =  0;
        this.x = Math.floor(Math.random() * 700) + 50;
        this.y = Math.floor(Math.random() * 500) + 50;
        this.team =  (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
        this.state = 0;
        this.playerId = socket.id;

    
        console.log("Creating Player", this.playerId);
    }
}

module.exports = {Player};