//Worked on by: Kiwon and John

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
        this.players = this.physics.add.group();
    }

    preload() {
        // load audio and images into memory
        this.load.image('haachama', '../../assets/haachamachama112.png');
        this.load.image('trap', '../../assets/medzombie.png');
        this.load.image('kiwon', '../../assets/kiwonface.png');

    }

    create() {
        console.log("gameplay_scene");
        
        
        // this.player1 = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'haachama').setScale(1);
        // //console.log(this.player1);
        // this.player1.setCollideWorldBounds(true);
        // this.player1.setDepth(1);

        this.player1 = new Player({
            scene:this, 
            x:game.config.width / 2, 
            y: game.config.height / 2, 
            sprite:'haachama'
        }, 1, "john", 500);

        this.add.existing(this.player1).setScale(1);
        this.physics.add.existing(this.player1);
        this.players.add(this.player1);
        
        //this.trap = new Trap({scene:this, x:200, y:200}, this.players);
       
        this.trap = new Trap({scene:this, x:200, y:200});

        //test conflict wall
        this.wall = this.add.sprite(600, 200, 'kiwon');
        this.wall.displayWidth = (100);
        this.wall.displayHeight = (100);
        this.physics.world.enable([this.wall, this.player1]);
        this.wall.allowGravity = false;
        this.wall.immovable = true;
        // this.physics.world.removeCollider(collider);
        // this.physics.world.colliders.destroy();
        // this.player1.enable = false;
    }
       
    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        this.player1.player_movement(cursors);
        //this.player_movement(cursors);
        this.trap.in_trap_radius();
        
        // this.player1.toggle_body(cursors);
        this.physics.world.collide(this.player1, [this.wall]);
        

        
    }
    kill(sprite) {
        for(let i = 0; i < sprite.length; i++) {
            let a = Math.abs(this.player.x - sprite[i].x);
            let b = Math.abs(this.player.y - sprite[i].y);
            let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            // console.log(c);
            if (c < 60) {
                sprite[i].setActive(false).setVisible(false);
                console.log("Hidden");
                console.log(sprite[i].x, sprite[i].y);
                this.create_deadBody(sprite[i].x, sprite[i].y);
            }
        }
        // console.log(Math.abs(this.player.x - this.player2.x));
    }
}