// Worked on by: William, Alexis

class playerUI_scene extends Phaser.Scene {
    constructor() {
        super({
            key: 'playerUI_scene',
        });
    }

    preload() {
        this.load.image('kill', '../../assets/kill.png');
        this.load.image('startGame', '../../assets/StartGame.png');
    }

    create() {
        this.actionBtn = this.add.sprite(
            game.config.width - 100,
            game.config.height - 100,
            'startGame'
        );

        this.actionBtn.setInteractive();
        this.actionBtn.setScale(0.25);
        this.timedEvent;
        this.canKill = true;

        this.actionBtn
            .on('pointerdown', () => this.startGame())
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.exitButtonHoverState());

        // When window is resized, fix things
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    enablePress() {
        this.actionBtn.setTint(0xffffff);
        this.canKill = true;
    }

    kill() {
        this.actionBtn.setTint(0x2b2a2a);
        this.time.delayedCall(2000, this.enablePress, [], this);
        this.canKill = false;
        let gameplay = this.scene.get('gameplay_scene');
        gameplay.kill(gameplay.otherPlayers.getChildren());
    }

    startGame() {
        // Do something
        console.log('Game started');
        this.actionBtn.setTexture('kill');
        this.actionBtn.removeListener('pointerdown');
        this.actionBtn.on('pointerdown', () => this.kill());
    }

    enterButtonHoverState() {
        if (this.canKill) {
            this.actionBtn.setScale(0.5);
        }
    }

    exitButtonHoverState() {
        this.actionBtn.setScale(0.25);
    }

    resize() {
        //this.titleText.setPosition(document.body.offsetWidth / 2 - 300, 80);
        this.actionBtn.setPosition(
            this.cameras.main.width - 100,
            this.cameras.main.height - 100
        );
    }
}
