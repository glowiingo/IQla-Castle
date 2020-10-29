//Worked on by Kiwon, John, Nav, Evano

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config, id, username, speed, iqla=false) {
        super(config.scene, config.x, config.y, config.sprite);

        this.scene.physics.add.existing(this).setScale(1);
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true);
        
        if(config.iqla) {
            this.iqla = iqla;
        }
        this.id = id;
        this.username = username;
        this.speed = speed;
        this.alive = true;
        this.iqla = false;
    }

    player_movement(key) {
        //console.log(this);
        if(key.left.isDown){
            this.setVelocityX(-this.speed);
        } else if (key.right.isDown) {
            this.setVelocityX(this.speed);
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
    }

    create_deadBody(x, y) {
        let dead_image = this.add.image(x, y, 'deadbody');
        dead_image.setScale(0.5);
        dead_image.setDepth(-1);
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