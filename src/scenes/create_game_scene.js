// Worked on by: Lewis

class create_game_scene extends Phaser.Scene {
    constructor() {
        super("create_game_scene");
    }

    init() {
        // initialize and prepare data
        // constants, configurations, etc.
    }

    preload() {
        // load audio and images into memory
        this.load.html("nameForm", "../../assets/domEle/text-input.html");
        this.load.image("goBackImage", "../../assets/go-back-icon.png");
        this.load.image("okImage", "../../assets/check-icon.png");
    }

    create() {
        // add objects into the game

        const screenX = this.cameras.main.width;
        const screenY = this.cameras.main.height;
        const screenCenterX = this.cameras.main.worldView.x + screenX / 2;
        const screenCenterY = this.cameras.main.worldView.y + screenY / 2;

        this.add
            .text(screenCenterX, screenCenterY - 150, "What is your name?", {
                font: "55px Ariel",
                fill: "yellow",
            })
            .setOrigin(0.5);

        // ------------------------- NAME INPUT BOX ------------------------- //
        const inputField = this.add.dom(0, 0).createFromCache("nameForm");

        inputField.x = screenCenterX;
        inputField.y = screenCenterY;

        this.nameInputBox = inputField.getChildByName("inputField");
        this.nameInputBox.placeholder = "Enter Name";

        // ------------------------- ICONS ------------------------- //
        this.goBackIcon = new ImageButton(
            this,
            5,
            screenY - 5,
            0,
            1,
            "goBackImage",
            () => this.goBackClicked()
        );

        this.okIcon = new ImageButton(
            this,
            screenX - 10,
            screenY - 10,
            1,
            1,
            "okImage",
            () => this.okClicked()
        );

        this.add.existing(this.goBackIcon);
        this.add.existing(this.okIcon);
    }

    goBackClicked() {
        this.scene.start("title_screen_scene");
    }

    /**
     * TODO: Add some type of error notification to user. For example, if user input is "", a text message pop up and says
     *       "Name (or room id) cannot be empty."
     */
    okClicked() {
        if (this.nameInputBox.value != "") {
            console.log("ok clicked, Hello " + this.nameInputBox.value);
        } else {
            // Do nothing
        }
    }

    update() {
        // loop that runs constantly
        // -- game logic mainly in this area
    }
}
