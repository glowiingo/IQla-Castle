// Worked on by: Lewis

class join_game_scene extends Phaser.Scene {
  constructor() {
    super("join_game_scene");
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
    const screenX = this.cameras.main.width;
    const screenY = this.cameras.main.height;
    const screenCenterX = this.cameras.main.worldView.x + screenX / 2;
    const screenCenterY = this.cameras.main.worldView.y + screenY / 2;

    this.add
      .text(screenCenterX, screenCenterY - 150, "Join Game", {
        font: "55px Ariel",
        fill: "yellow",
      })
      .setOrigin(0.5);

    // ------------------------- NAME AND ROOM ID INPUT BOX ------------------------- //
    const nameField = this.add.dom(0, 0).createFromCache("nameForm");
    const roomIdField = this.add.dom(0, 0).createFromCache("nameForm");

    this.nameInputBox = nameField.getChildByName("inputField");
    this.roomIdInputBox = roomIdField.getChildByName("inputField");

    this.nameInputBox.placeholder = "Enter Name";
    this.roomIdInputBox.placeholder = "Enter Room ID";

    nameField.x = screenCenterX;
    nameField.y = screenCenterY;
    roomIdField.x = screenCenterX;
    roomIdField.y = screenCenterY + 100;

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
   * TODO: Prevent Error by making the Room Id input field numeric input only, possible way of doing:
   *       1. Set this.roomIdInputBox.type to number (Might work, but the html file is set to type = text,
   *          not sure if it will override). If it does not override, maybe we can remove the type in the
   *          html file and use this.roomIdInputBox.type to set it everytime we create a inputbox.
   *
   *       2. Workaround method, add verification in the if statement below, so input thats not numeric will not work.
   *
   * TODO: Add some type of error notification to user. For example, if user input is "", a text message pop up and says
   *       "Name (or room id) cannot be empty."
   */
  okClicked() {
    if (
      this.nameInputBox.value != "" &&
      this.roomIdInputBox.value != "" &&
      /^\d+$/.test(this.roomIdInputBox.value) // Check if roomID value is numeric
    ) {
      console.log(
        "ok clicked, Hello " +
        this.nameInputBox.value +
        "\nJoining Room: " +
        this.roomIdInputBox.value
      );
    } else {
      // Do nothing
    }
  }

  update() {
    // loop that runs constantly
    // -- game logic mainly in this area
  }
}
