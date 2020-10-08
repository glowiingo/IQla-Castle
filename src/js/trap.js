class Trap extends Phaser.GameObjects.Sprite {
    constructor (config) {
        super(config.scene, config.x, config.y, 'trap');
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.setTrap();
        this.trapSet = false;

        
    }
    in_trap_radius() {
        let touching = this.zone.body.touching;
        let wasTouching = this.zone.body.wasTouching;
        
        if (touching.none && !wasTouching.none) {
            this.scene.player1.clearTint();
            this.zone.emit('leavezone');
        }
        else if (!touching.none && wasTouching.none) {
            this.scene.player1.setTint(0x00ffff);
            this.zone.emit('enterzone');
        }
    
        this.zone.body.debugBodyColor = this.zone.body.touching.none ? 0x00ffff : 0xffff00;
    }


    setTrap() {
        if (!this.trapSet) {
            this.scene.add.existing(this).setScale(0.5);
        
            this.zone = this.scene.add.zone(this.x, this.y).setSize(this.displayWidth, this.displayHeight);
            this.zone.setCircleDropZone(100);
            this.scene.physics.world.enable(this.zone, 0); // (0) DYNAMIC (1) STATIC
            this.zone.body.setAllowGravity(false);
            this.zone.body.moves = false;
            
            this.scene.physics.add.overlap(this.zone, this.scene.player1);
            
            this.zone.on('enterzone', () => {console.log('enterzone')});
            this.zone.on('leavezone', () => {console.log('leavezone')});
        }
        this.trapSet = true;
    }
    activateTrap() {

    }
    checkKillZone() {

    }
}