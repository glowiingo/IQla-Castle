class Trap extends Phaser.GameObjects.Sprite {
    constructor (config) {
        super(config.scene, config.x, config.y, 'trap');
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.playerGroup;
        this.setTrap();
        this.trapSet = false;

        
    }
    in_trap_radius() {
        let touching = this.trapZone.body.touching;
        let wasTouching = this.trapZone.body.wasTouching;
        
        if (touching.none && !wasTouching.none) {
            this.scene.player1.clearTint();
            this.trapZone.emit('leavezone');
        }
        else if (!touching.none && wasTouching.none) {
            this.scene.player1.setTint(0x00ffff);
            this.trapZone.emit('enterzone');
        }
    
        this.trapZone.body.debugBodyColor = this.trapZone.body.touching.none ? 0x00ffff : 0xffff00;
    }


    setTrap() {
        if (!this.trapSet) {
            this.scene.add.existing(this).setScale(0.5);

            this.trapZone = this.scene.add.zone(this.x, this.y).setSize(this.displayWidth, this.displayHeight);
            this.trapZone.setCircleDropZone(100);
            this.scene.physics.world.enable(this.trapZone, 0); // (0) DYNAMIC (1) STATIC
            this.trapZone.body.setAllowGravity(false);
            this.trapZone.body.moves = false;

            this.scene.physics.add.overlap(this.trapZone, this.scene.player1);
            
            this.trapZone.on('enterzone', ()=> {
                this.activateTrap();
            });
        }
        this.trapSet = true;
    }
    activateTrap() {
        this.blastZone = this.scene.add.zone(this.x, this.y).setSize(this.displayWidth * 2, this.displayHeight * 2);
        this.blastZone.setCircleDropZone(100);
        this.scene.physics.world.enable(this.blastZone, 0); // (0) DYNAMIC (1) STATIC
        this.blastZone.body.setAllowGravity(false);
        this.blastZone.body.moves = false;
        this.scene.physics.add.overlap(this.blastZone, this.scene.player1, this.scene.kill/*, this.scene.playerAlive*/);
    }
    checkKillZone() {

    }
}