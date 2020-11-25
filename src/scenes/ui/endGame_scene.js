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

    this.playAgainButton.setScale(0.45);
    this.add.existing(this.returnButton);
    //this.add.existing(this.playAgainButton);
  }

  // click button return to mainmenu_scene
  returnClicked() {
    location.reload();
  }

  update() {
    // loop that runs constantly
    // -- game logic mainly in this area
  }
}
