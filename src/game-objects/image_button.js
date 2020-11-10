// Worked on by: Lewis

class ImageButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y, originX, originY, img, callback) {
    super(scene, x, y, img);

    this.setInteractive({ useHandCursor: true })
      // .on("pointerover", () => this.enterButtonHoverState())
      // .on("pointerout", () => this.enterButtonRestState())
      // .on("pointerdown", () => this.enterButtonActiveState())
      .on("pointerup", () => {
        // this.enterButtonHoverState();
        callback();
      })
      .setOrigin(originX, originY);
  }

  // enterButtonHoverState() {
  //     this.setStyle({ fill: "#E94B3CFF" });
  // }

  // enterButtonRestState() {
  //     this.setStyle({ fill: "yellow" });
  // }

  // enterButtonActiveState() {
  //     this.setStyle({ fill: "red" });
  // }
}
