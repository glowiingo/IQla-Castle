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
        this.load.image('trap', '../../assets/medzombie.png');
    }

    create() {
        console.log("gameplay_scene");
        this.player1 = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'haachama').setScale(1);
        this.player1.setCollideWorldBounds(true);
        this.player1.setDepth(1);
        
        this.trap = new Trap({scene:this, x:200, y:200});
    }
       
    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        this.player_movement(cursors);
        this.trap.in_trap_radius();

        
    }
    kill(trap, player) {
        player.setVisible(false);
    }
    playerAlive(trap, player) {
        return player.alive;
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