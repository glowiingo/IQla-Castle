// Worked on by: Lewis

class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, callback) {
        super(scene, x, y, text, style);

        this.originalFill = style.fill;

        this.setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.enterButtonHoverState())
            .on("pointerout", () => this.enterButtonRestState())
            .on("pointerdown", () => this.enterButtonActiveState())
            .on("pointerup", () => {
                this.enterButtonHoverState();
                callback();
            })
            .setOrigin(0.5);
    }

    enterButtonHoverState() {
        this.setStyle({ fill: "#E94B3CFF" });
    }

    enterButtonRestState() {
        this.setStyle({ fill: this.originalFill });
    }

    enterButtonActiveState() {
        this.setStyle({ fill: "red" });
    }
}
