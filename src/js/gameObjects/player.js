//Worked on by Kiwon, John, Nav, Evano

const player = require("../player");

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(config, id, playerName, speed, iqla=false) {
        super(config.scene, config.x, config.y, config.sprite);

        
        // console.log(this);
        // this.scene.add.existing(this).setScale(1);
        // this.scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
        
        if(config.iqla) {
            this.iqla = iqla;
        }
        this.id = id;
        this.speed = speed;
        this.alive = true;
        this.iqla = false;
        this.player_name = playerName;

        // we should set these to global variables
        this.spawnX = 1408;
        this.spawnY = 512;
    }

    //worked on by Kiwon
    player_movement() {
        let key = this.scene.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

        //console.log(this);
        if(key.left.isDown){
            this.setVelocityX(-this.speed);
            this.flipX = false;
        } else if (key.right.isDown) {
            this.setVelocityX(this.speed);
            this.flipX = true;
        } else {
            this.setVelocityX(0);
        }
        
        if (key.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (key.down.isDown) {
            this.setVelocityY(this.speed);
        } else {
            this.setVelocityY(0);
        }

        // Worked on by: William, Brian, Anna, Flemming
        if (key.down.isDown || key.up.isDown || key.left.isDown || key.right.isDown) {
            if (!this.scene.isWalking) {
              this.player_walk_anim_start();
            }
          } else {
            this.player_walk_anim_stop();
          }
        // print x y of player position to send to network team and update
        // console.log(this.x, this.y);
    }

    // Worked on by: Anna
    player_walk_anim_start() {
        if (!this.scene.isWalking) {
        this.scene.isWalking = true;
        this.play('WalkCycle');
        }
    }

    // Worked on by: Anna
    player_walk_anim_stop() {
        this.scene.isWalking = false;
        this.anims.stop();
    }

    getPlayerName() {
        return this.playerName;
    }

    //worked on by Mike
    create_deadBody(x, y) {
        let dead_image = this.add.image(x, y, 'deadbody');
        dead_image.setScale(0.5);
        dead_image.setDepth(-1);
    }

    //worked on by Mike
    kill(sprite) {
        for(let i = 0; i < sprite.length; i++) {
            let a = Math.abs(this.player.x - sprite[i].x);
            let b = Math.abs(this.player.y - sprite[i].y);
            let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            // console.log(c);
            if (c < 60) {
                sprite[i].setActive(false).setVisible(false);
                sprite[i].alive = false;
                //sprite[i].setTexture("ghost");
                console.log("Hidden");
                console.log(sprite[i].x, sprite[i].y);
                this.create_deadBody(sprite[i].x, sprite[i].y);
            }
        }
        // console.log(Math.abs(this.player.x - this.player2.x));
    }

    // Worked on by Gloria
    // Sets the role for the player based on a random number generator 
    // We should note that other player factors may need to be passed into this function
    // Logic may need to be defined on the server? or server needs to pass all player ids in array
    setRole(players_array) {
        let count_iqla = 0;
        let max_iqla = 0;
        let players_set = 0;
        if (players_array.length >= 7) {
            max_iqla = 2;
        } else if (players_array > 3){
            max_iqla = 1;
        }
        let rand_num = Math.floor(Math.random() * 10) + 1;
        if (count_iqla < max_iqla) {
            if (rand_num == 1) {
                this.iqla = true;
            }
        }
        players_set++;
    }

    // Worked on by Gloria
    // Sets player x and y to spawn point
    sendToStartPos() {
        this.player.x = this.spawnX;
        this.player.y = this.spawnY;
    }
}