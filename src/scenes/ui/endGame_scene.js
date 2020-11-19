/*
This class is defined in order for displaying the end game scene
// Worked on by:Hannah
//reused some Lewis code
*/

class endGame_scene extends Phaser.Scene {
  constructor() {
    super('endGame_scene');
  }

  init(endgameString) {
    this.endgameString = endgameString;
    // initialize and prepare data
    // constants, configurations, etc.
  }

  preload() {
    // load audio and images into memory
    this.load.image('play_again_image', '../../assets/play_again.png');
  }

  create() {
    const screenX = this.cameras.main.width;
    const screenY = this.cameras.main.height;
    const screenCenterX = this.cameras.main.worldView.x + screenX / 2;
    const screenCenterY = this.cameras.main.worldView.y + screenY / 2;
    // added text "victory"
    this.victory = this.add
      .text(screenCenterX, screenCenterY - 150, 'Victory', {
        font: '55px Ariel',
        fill: 'yellow'
      })
      .setOrigin(0.5);
    // added text "defeat"
    this.defeat = this.add
      .text(screenCenterX, screenCenterY - 150, 'Defeat', {
        font: '55px Ariel',
        fill: 'yellow'
      })
      .setOrigin(0.5);
    this.end = this.add
      .text(screenCenterX, screenCenterY - 150, this.endgameString, {
        font: '55px Ariel',
        fill: 'yellow'
      })
      .setOrigin(0.5);

    //added return button
    this.returnButton = new ImageButton(
      this,
      5,
      screenY - 5,
      0,
      1,
      'goBackImage',
      () => this.returnClicked()
    );

    //added play again button
    this.playAgainButton = new ImageButton(
      this,
      screenX - 5,
      screenY - 5,
      1,
      1,
      'play_again_image',
      () => this.playAgainClicked()
    );

    this.playAgainButton.setScale(0.45);
    this.add.existing(this.returnButton);
    this.add.existing(this.playAgainButton);
    this.hideDefeat();
    this.hideVictory();
  }
  //show "victory" text
  showVictory() {
    this.victory.setVisible(true);
  }
  //hide "victory" text
  hideVictory() {
    this.victory.setVisible(false);
  }
  //show "defeat" text
  showDefeat() {
    this.defeat.setVisible(true);
  }
  //hide "defeat" text
  hideDefeat() {
    this.defeat.setVisible(false);
  }
  // click button return to mainmenu_scene
  returnClicked() {
    this.scene.start('title_screen_scene');
  }
  // click button return to the game
  playAgainClicked() {
    this.scene.start('join_game_scene');
  }

  update() {
    // loop that runs constantly
    // -- game logic mainly in this area
  }
}
