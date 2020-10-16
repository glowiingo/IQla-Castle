/*
This class is defined in order for preloading of assets, animations, and sprites.
*/

class trap_gameplay_scene extends Phaser.Scene {
    constructor() {
        super("trap_gameplay_scene");
    }

    init() {
        // initialize and prepare data 
        // constants, configurations, etc.
    }

    preload() {
        // load audio and images into memory
        this.load.image('haachama', '../../assets/haachamachama112.png');
    }

    create() {
        console.log("gameplay_scene");
        
        //this.trap = this.physics.add.staticGroup();
        //this.trap.create(300, 200, 'haachama').setScale(1).refreshBody();
        
        this.zone = this.add.zone(200, 200).setSize(200, 200);
        this.zone.setCircleDropZone(100);
        this.physics.world.enable(this.zone, 0); // (0) DYNAMIC (1) STATIC
        this.zone.body.setAllowGravity(false);
        this.zone.body.moves = false;
        
        this.player1 = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'haachama').setScale(1);
        this.player1.setCollideWorldBounds(true);
        
        this.physics.add.overlap(this.zone, this.player1);
        
        this.zone.on('enterzone', () => {console.log('enterzone')});
        this.zone.on('leavezone', () => {console.log('leavezone')});
    }
       
    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        this.player_movement(cursors);
        this.in_trap_radius();

        
    }

    in_trap_radius() {
        let touching = this.zone.body.touching;
        let wasTouching = this.zone.body.wasTouching;
        
        if (touching.none && !wasTouching.none) {
            this.player1.clearTint();
            this.zone.emit('leavezone');
        }
        else if (!touching.none && wasTouching.none) {
            this.player1.setTint(0x00ffff);
            this.zone.emit('enterzone');
        }
    
        this.zone.body.debugBodyColor = this.zone.body.touching.none ? 0x00ffff : 0xffff00;
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
            this.player1.setVelocityY(0);
            this.player1.setVelocityX(-500);
        } else if (cursors.right.isDown) {
            // console.log("Right");
            this.player1.setVelocityY(0);
            this.player1.setVelocityX(500);
        } else if (cursors.up.isDown) {
            // console.log("Up");
            this.player1.setVelocityX(0);
            this.player1.setVelocityY(-500);
        } else if (cursors.down.isDown) {
            // console.log("Down");
            this.player1.setVelocityX(0);
            this.player1.setVelocityY(500);
        } else {
            this.player1.setVelocityX(0);
            this.player1.setVelocityY(0);
        }
        
        // print x y of player position to send to network team and update
        // console.log(this.player.x, this.player.y)
    }
}