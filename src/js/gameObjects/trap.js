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

        
    }
    in_trap_radius() {
        let touching = this.trapZone.body.touching;
        let wasTouching = this.trapZone.body.wasTouching;
        let inZone = this.trapZone.body.embedded;
        
        if (touching.none && !wasTouching.none) {
            this.scene.player1.clearTint();
            this.trapZone.emit('leavezone');
        }
        else if (!touching.none && wasTouching.none) {
            this.scene.player1.setTint(0x00ffff);
            this.trapZone.emit('enterzone');
        }
        else if(inZone) {
            this.scene.player1.setTint(0x00ffff);
            this.trapZone.emit('inzone');
            console.log("inzone");
        }
    
        this.trapZone.body.debugBodyColor = this.trapZone.body.touching.none ? 0x00ffff : 0xffff00;
    }


    setTrap() {
        if (!this.trapSet) {
            this.scene.add.existing(this).setScale(1);

            this.trapZone = this.scene.add.zone(this.x, this.y).setSize(this.displayWidth, this.displayWidth);
            this.trapZone.setCircleDropZone(this.displayWidth/2);
            this.scene.physics.world.enable(this.trapZone, 1); // (0) DYNAMIC (1) STATIC

            this.trapSet = true;

            this.scene.physics.add.overlap(this.trapZone, this.playerGroup, this.activateTrap, null, this);
        }
        
    }
    activateTrap() {
        if (this.trapTriggered) {
            console.log("triggered");
            this.blastZone = this.scene.add.zone(this.x, this.y).setSize(this.displayHeight, this.displayHeight);
            this.blastZone.setCircleDropZone(this.displayHeight/2);
            this.scene.physics.world.enable(this.blastZone, 0); // (0) DYNAMIC (1) STATIC
            this.blastZone.body.setAllowGravity(false);
            this.blastZone.body.moves = false;
            this.trapTriggered = true;
            this.scene.physics.add.overlap(this.blastZone, this.playerGroup, this.scene.kill/*, this.scene.playerAlive*/);
        }
    }

    checkKillZone() {

    }
}