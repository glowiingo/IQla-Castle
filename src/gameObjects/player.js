class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config, id, username, speed) {
        super(config.scene, config.x, config.y, 'haachama');

        this.scene.physics.add.existing(this).setScale(1);
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true);
        
        
        if(config.iqla) {
            this.iqla = config.iqla;
        }
        this.id = id;
        this.username = username;
        this.speed = speed;
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
}