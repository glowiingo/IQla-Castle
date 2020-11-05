// Worked on by: William, Alexis
// Worked on by: Bisht, Brian, Kian

class playerUI_scene extends Phaser.Scene {


  constructor() {
    super({
      key: 'playerUI_scene'
    });
  }

  preload() {
    this.load.image('kill', '../../assets/kill.png');
    this.load.image('TaskBar', '../../assets/TaskBar.png');
    this.load.image('BackBar', '../../assets/BackBar.png');
    // This is to be added once the bar image is made: this.load.image('progress', '../../assets/progressbar.png')
  }

  create() {
  	
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

    this.killButton = this.add.sprite(game.config.width - 100, game.config.height - 100, 'kill');
    this.killButton.setInteractive();
    this.killButton.setScale(0.25);
    this.timedEvent;
    this.canKill = true;

    this.killButton
      .on('pointerdown', () => this.kill())
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.exitButtonHoverState());

    // When window is resized, fix things
    window.addEventListener('resize', () => {
      this.resize(window.innerWidth, window.innerHeight);
    });
  }

  enablePress() {
    this.killButton.setTint(0xFFFFFF);
    this.canKill = true;
  }

  kill() {
  	this.setBar(126); //Testing 
    this.killButton.setTint(0x2b2a2a);
    this.time.delayedCall(2000, this.enablePress, [], this)
    this.canKill = false;
    let gameplay = this.scene.get("gameplay_scene");
    gameplay.kill(gameplay.otherPlayers.getChildren());
  }

  enterButtonHoverState() {
    if (this.canKill) {
      this.killButton.setScale(0.5);
    }

  }

  exitButtonHoverState() {
    this.killButton.setScale(0.25);
  }

  resize(width, height) {
    //this.titleText.setPosition(document.body.offsetWidth / 2 - 300, 80);
    this.killButton.setPosition(document.body.offsetWidth - 200, document.body.offsetHeight - 200);

  }

  //Sets the progress bar size by adding a positive or negative amount as *perc* 
  setBar(perc) {
  	this.fill += perc;
  	this.tBar.setCrop(0, 0, this.fill, 84);
  }
}