// Worked on by: Lewis

class title_screen_scene extends Phaser.Scene {
  constructor() {
    super('title_screen_scene');
  }

  init() {
    // initialize and prepare data
    // constants, configurations, etc.
  }

  preload() {
    // load audio and images into memory
    this.load.image('settingImage', '../../assets/settings-icon.png');
    this.load.image('helpImage', '../../assets/help-icon.png');
  }

  create() {
    const screenX = this.cameras.main.width;
    const screenY = this.cameras.main.height;
    const screenCenterX = this.cameras.main.worldView.x + screenX / 2;
    const screenCenterY = this.cameras.main.worldView.y + screenY / 2;

    this.add
      .text(screenCenterX, screenCenterY - 150, 'IQLA Castle', {
        font: '55px Ariel',
        fill: 'yellow',
      })
      .setOrigin(0.5);

    // ------------------------- Create and Join Game Buttons ------------------------- //
    // this.createGameButton = new TextButton(
    //   this,
    //   screenCenterX,
    //   screenCenterY,
    //   "Create Game",
    //   { font: "30px Ariel", fill: "yellow" },
    //   () => this.createNewGame()
    // );

    this.joinGameButton = new TextButton(
      this,
      screenCenterX,
      screenCenterY,
      'Join Game',
      { font: '30px Ariel', fill: 'yellow' },
      () => this.joinNewGame()
    );

    // ------------------------- ICONS ------------------------- //
    this.settingIcon = new ImageButton(
      this,
      10,
      screenY - 10,
      0,
      1,
      'settingImage',
      () => this.settingIconClicked()
    );

    this.helpIcon = new ImageButton(
      this,
      screenX - 10,
      screenY - 10,
      1,
      1,
      'helpImage',
      () => this.helpIconClicked()
    );

    //this.add.existing(this.createGameButton);
    this.add.existing(this.joinGameButton);
    this.add.existing(this.settingIcon);
    this.add.existing(this.helpIcon);
  }

  createNewGame() {
    // this.scene.start("create_game_scene");
  }

  joinNewGame() {
    this.scene.start('join_game_scene');
  }

  settingIconClicked() {
    console.log('settings');
  }

  helpIconClicked() {
    console.log('help');
  }

  update() {
    // loop that runs constantly
    // -- game logic mainly in this area
  }
}
