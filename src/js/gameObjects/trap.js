//Worked on Kiwon

class Trap extends Phaser.GameObjects.Sprite {
    constructor (config, playerGroup) {
        super(config.scene, config.x, config.y, 'trap');
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.playerGroup = playerGroup;
        this.setTrap();
        this.trapSet = false;
        this.trapTriggered = false;
    }
    /**
     * detector fo the trap
     */
    // in_trap_radius() {
    //     let touching = this.trapZone.body.touching;
        
    //     if (touching.none) {
    //         this.scene.player.clearTint();
    //         this.trapZone.emit('leavezone');
    //     }
    //     else if (!touching.none) {
    //         this.scene.player.setTint(0x00ffff);
    //         this.trapZone.emit('enterzone');
    //     }
    //     // else if(inZone) {
    //     //     this.scene.player1.setTint(0x00ffff);
    //     //     this.trapZone.emit('inzone');
    //     //     console.log('inzone');
    //     // }
    
    //     this.trapZone.body.debugBodyColor = this.trapZone.body.touching.none ? 0x00ffff : 0xffff00;
    // }

    //putting down the trap on the scene
    setTrap() {
        if (!this.trapSet) {
            this.scene.add.existing(this).setScale(1);

            this.trapZone = this.scene.add.zone(this.x, this.y).setSize(this.displayWidth, this.displayWidth);
            this.trapZone.setCircleDropZone(100);
            this.scene.physics.world.enable(this.trapZone, 0); // (0) DYNAMIC (1) STATIC
            this.trapZone.body.setAllowGravity(false);
            this.trapZone.body.moves = false;

            this.trapSet = true;

            //Biggest problem in converting to server side is here as overlap doesn't work if velocity is zero
            setTimeout(() => {
                this.scene.physics.add.overlap(this.trapZone, this.playerGroup, this.activateTrap, null, this)
            }, 5000); //default 5000
        }
        
    }
    /**
     * activates once the trap is stepped on
     */
    activateTrap() {
        if (!this.trapTriggered) {
            console.log('triggered');
            this.trapZone.destroy();
            let killList = this.scene.physics.overlapCirc(this.x, this.y, this.displayWidth, true);
            this.kill(killList);
            this.destroy();
            
        }
        
    }

    kill(sprites) {
        for (let i = 0; i < sprites.length; i++) {
            console.log(sprites[i].gameObject);
            let sprite = sprites[i].gameObject
            if(sprite.active && sprite.id) {
                console.log(i);
                sprite.setActive(false).setVisible(false);
                console.log('Hidden');
                console.log(sprite.x, sprite.y);
                this.createDeadBody(sprite.x, sprite.y);
                console.log(sprite.id);
                this.scene.registry.values.sceneData.serverConnection.kill(sprite.id);
            }
        }
    }
    
    createDeadBody(x, y) {
        let dead_image = this.scene.add.image(x, y, 'deadbody');
        dead_image.setScale(0.5);
        dead_image.setDepth(30);
    }
}