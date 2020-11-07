// Worked on by: William, Alexis
// Worked on by: Bisht, Brian, Kian

class playerUI_scene extends Phaser.Scene {
    constructor() {
        super({
            key: 'playerUI_scene',
        });
    }

  preload() {
    this.load.image('kill', '../../assets/kill.png');
    this.load.image('TaskBar', '../../assets/TaskBar.png');
    this.load.image('BackBar', '../../assets/BackBar.png');
    this.load.image('startGame', '../../assets/StartGame.png');
    // This is to be added once the bar image is made: this.load.image('progress', '../../assets/progressbar.png')
  }

  create() {
  	this.actionBtn = this.add.sprite(
            game.config.width - 100,
            game.config.height - 100,
            'startGame'
        );
        this.actionBtn.setInteractive();
        this.actionBtn.setScale(0.25);
    // instantiate a progress bar in the top left corner of game screen, similar to the kill button
    // note: add ProgressBar.increase(1) into each mini-game
    // this.progressBar = this.add.sprite(0, 0, "progress");
    this.bBar = this.add.sprite(game.config.width - 504, 0, 'BackBar').setOrigin(0, 0);
    this.tBar = this.add.sprite(game.config.width - 504, 0, 'TaskBar').setOrigin(0, 0);
    this.fill = 0;
    //this.txt = this.add.text((game.config.width - 200), 10, 'Tasks');
    //this.txt.setColor('#000000');
    //this.txt.setFontSize(40);
    //this.tBar.flipX = true;
    //The bar ranges from 0-504 set bar adds an amount to it
    this.setBar(0);
    this.timedEvent;
    this.canKill = true;

    this.actionBtn
            .on('pointerdown', () => this.registry.values.sceneData.alertGameStart())
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.exitButtonHoverState());
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
        gameplay.player.kill(gameplay.otherPlayers.getChildren());
        this.registry.values.sceneData.serverConnection.taskCompleted();
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
//   resize(width, height) {
//     //this.titleText.setPosition(document.body.offsetWidth / 2 - 300, 80);
//     this.killButton.setPosition(document.body.offsetWidth - 200, document.body.offsetHeight - 200);

//   }

  //Sets the progress bar size by adding a positive or negative amount as *perc* 
  setBar(perc) {
  	this.fill += perc;
  	this.tBar.setCrop(0, 0, this.fill, 84);
  }
}
