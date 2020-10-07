/*
This class is defined in order for preloading of assets, animations, and sprites.
*/


class mouse_click_minigame extends Phaser.Scene {
    constructor() {
        super("mouse_click_minigame");
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
        // add objects into the game
        console.log("gameplay_scene");
        
         let mice = this.physics.add.group({
            key: "haachama", 
            repeat: 2, // one is created automatically so there will be x + 1 in total
            setXY: {x: 100, y: 100, stepX: 50, stepY: 100}
        });    
        
        let _this = this; // for some reason I need this for the tween to work, wtf does tween even mean? idk

        mice.children.iterate(function(child){
            child.setInteractive();
            child.on("pointerdown", function(){
                mice.remove(child);
                tween.stop();
                child.setVisible(false);
                
                if(mice.getLength() == 0){
                    _this.add.text(game.config.width / 2, game.config.height / 2, "hi");
                }
            });
            // makes objects move to random places on the game screen at random speeds
            let tween = _this.tweens.add({
                targets: child,
                x: Math.random() * game.config.width,
                y: Math.random() * game.config.height,
                duration: 500 + Math.random() * 500,
                repeat: -1,
                onEnd: function(){
                    tween.updateTo('x', Math.random() * game.config.width, true);
                    tween.updateTo('y', Math.random() * game.config.height, true);
                    tween.updateTo('duration', 1000 + Math.random() * 1000, true);                    
                }
            });
        });   
    }

    // move_object_left_right(object, speed) {
    //     object.x += speed;
    // }

    // move_object_up_down(object, speed) {
    //     object.y += speed;
    // }

    // reset_object_bot_mid(object) {
    //     object.y = config.height;
    //     object.x = config.width / 2;
    // }

    // player_movement(cursors) {
    //     if(cursors.left.isDown){
    //         // console.log("Down");
    //         this.move_object_left_right(this.player, -10);
    //     } 
    //     if (cursors.right.isDown) {
    //         // console.log("Right");
    //         this.move_object_left_right(this.player, 10);
    //     }
    //     if (cursors.up.isDown) {
    //         // console.log("Up");
    //         this.move_object_up_down(this.player, -10);
    //     }
    //     if (cursors.down.isDown) {
    //         // console.log("Down");
    //         this.move_object_up_down(this.player, 10);
    //     }
        
    //     print x y of player position to send to network team and update
    //     console.log(this.player.x, this.player.y)
    // }

    update() {
        // loop that runs constantly 
        // -- game logic mainly in this area

        // const cursors = this.input.keyboard.createCursorKeys();
        // this.player_movement(cursors);
        
    }
}
