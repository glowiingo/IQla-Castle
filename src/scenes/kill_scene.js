// Worked on by: Mike Choi
/*
This class is defined in order for preloading of assets, animations, and sprites.
*/


class kill_scene extends Phaser.Scene {
    constructor() {
        super("kill_scene");
        console.log("kills");
    }

    init() {
        // initialize and prepare data 
        // constants, configurations, etc.
    }

    preload() {
        // load audio and images into memory
        this.load.image('haachama', 'assets/haachamachama112.png');
        this.load.image('deadbody', 'assets/deadCharacter.png');
    }

    create() {

        console.log("kill_Scene");
        // add objects into the game

        this.player = this.physics.add.sprite(game.config.width / 4, game.config.height / 4, 'haachama').setScale(0.5);
        this.player.setCollideWorldBounds(true);

        this.player2 = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'haachama').setScale(0.5);
        this.player2.setCollideWorldBounds(true);

        this.player3 = this.physics.add.sprite(game.config.width / 3, game.config.height / 3, 'haachama').setScale(0.5);
        this.player3.setCollideWorldBounds(true);

        this.player4 = this.physics.add.sprite(game.config.width / 6, game.config.height / 6, 'haachama').setScale(0.5);
        this.player4.setCollideWorldBounds(true);

        let group = this.add.group();
        group.add(this.player2);
        group.add(this.player3);
        group.add(this.player4);

        console.log(group);
        console.log(group.getChildren());

        
        const helloButton = this.add.text(600, 500, 'Kill', {
            fill: '#0f0'
        }).setInteractive()
        .on('pointerdown', () => this.kill(group.getChildren()));

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
                // delete sprite[i];
            }
        }
        // console.log(Math.abs(this.player.x - this.player2.x));
    }

    create_deadBody(x, y) {
        let dead_image = this.add.image(x, y, 'deadbody');
        dead_image.setScale(0.5);
        dead_image.setDepth(-1);
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
        if (cursors.left.isDown) {
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
        this.player_movement(cursors);
    }
}