/*
This class is defined in order for preloading of assets, animations, and sprites.
*/


class gameplay_scene extends Phaser.Scene {
    constructor() {
        super("gameplay_scene");
    }

    init(data) {
        // initialize and prepare data 
        // constants, configurations, etc.

        //Networking initializations
        this.socket = data.socket;
        this.roomName = data.roomName;
        this.otherPlayers = this.physics.add.group();
    }

    preload() {
        // load audio and images into memory
        this.load.image('haachama', '../../assets/haachamachama112.png');
    }
    
    create() {

        var self = this; //Allows passing the scene object to event listeners

        //Add the required listeners to the socket
        this.socket.on('currentPlayers', function (players) {
            addPlayer(self, players[self.socket.id]);
            delete players[self.socket.id];
            Object.keys(players).forEach(function (id) {
              addOtherPlayers(self, players[id]);
            });
          });
        this.socket.on('newPlayer', function (playerInfo) {
            console.log("added other player")
            addOtherPlayers(self, playerInfo);
          });
        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
              if (playerId === otherPlayer.playerId) {
                otherPlayer.destroy();
              }
            });
          });
        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
              if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
              }
            });
          });
        this.socket.emit("joinRoom", this.roomName); //Let's the server know the client has joined a room, is ready to receive the above events


        // add objects into the game
        console.log("gameplay_scene");
    }

    move_object_left_right(object, speed) {
        object.x += speed;
    }

    move_object_up_down(object, speed) {
        object.y += speed;
    }

    reset_object_bot_mid(object) {
        object.y = config.height;
        object.x = config.width / 2;
    }

    player_movement(cursors) {
        if(cursors.left.isDown){
            // console.log("Down");
            this.move_object_left_right(this.player, -10);
        } 
        if (cursors.right.isDown) {
            // console.log("Right");
            this.move_object_left_right(this.player, 10);
        }
        if (cursors.up.isDown) {
            // console.log("Up");
            this.move_object_up_down(this.player, -10);
        }
        if (cursors.down.isDown) {
            // console.log("Down");
            this.move_object_up_down(this.player, 10);
        }
        
        // print x y of player position to send to network team and update
        // console.log(this.player.x, this.player.y);
    }

    update() {
        // loop that runs constantly 
        // -- game logic mainly in this area
        const cursors = this.input.keyboard.createCursorKeys();

        if(this.player){ //Only do movement if the player has loaded in
            this.player_movement(cursors);
            this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y, rotation: 0});
        }
        
        
    }
}

function addPlayer(self, playerInfo) {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'haachama').setScale(1);
    self.player.setCollideWorldBounds(true);
}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'haachama').setScale(1);
    otherPlayer.setTint(0xff0000); //Sets tint of other players to red for testing purposes
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
}