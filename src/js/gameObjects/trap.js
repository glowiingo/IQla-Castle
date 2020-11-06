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
    //checking if another object is touching the trap and emitting the state of contact.
    in_trap_radius() {
        let touching = this.trapZone.body.touching;
        
        if (touching.none) {
            this.scene.player.clearTint();
            this.trapZone.emit('leavezone');
        }
        else if (!touching.none) {
            this.scene.player.setTint(0x00ffff);
            this.trapZone.emit('enterzone');
        }
        // else if(inZone) {
        //     this.scene.player1.setTint(0x00ffff);
        //     this.trapZone.emit('inzone');
        //     console.log("inzone");
        // }
    
        this.trapZone.body.debugBodyColor = this.trapZone.body.touching.none ? 0x00ffff : 0xffff00;
    }

    //putting down the actual trap in the scene
    setTrap() {
        if (!this.trapSet) {
            this.scene.add.existing(this).setScale(0.5);

            this.trapZone = this.scene.add.zone(this.x, this.y).setSize(this.displayWidth, this.displayHeight);
            this.trapZone.setCircleDropZone(100);
            this.scene.physics.world.enable(this.trapZone, 0); // (0) DYNAMIC (1) STATIC
            this.trapZone.body.setAllowGravity(false);
            this.trapZone.body.moves = false;

            this.trapSet = true;

            //Biggest problem in converting to serside is here as overlap doesn't work if velocity is zero
            setTimeout(() => {
                this.scene.physics.add.overlap(this.trapZone, this.playerGroup, this.activateTrap, null, this)
            }, 5000);
        }
        
    }
    //when the trap is stepped on
    activateTrap() {
        if (!this.trapTriggered) {
            console.log("triggered");
            this.blastZone = this.scene.add.zone(this.x, this.y).setSize(this.displayHeight, this.displayHeight);
            this.blastZone.setCircleDropZone(100);
            this.scene.physics.world.enable(this.blastZone, 0); // (0) DYNAMIC (1) STATIC
            this.blastZone.body.setAllowGravity(false);
            this.blastZone.body.moves = false;
            this.trapTriggered = true;
            this.scene.physics.add.overlap(this.blastZone, this.playerGroup, /*this.scene.kill, this, this.scene.playerAlive*/);
            //this.destroy();
        }
    }
}