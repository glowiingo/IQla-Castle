class mainmenu_scene extends Phaser.Scene {
    constructor() {
        super("mainmenu_scene");
    }

    create() {
        console.log("Main Menu");
        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

        //Networking Code
        let sceneData = {socket: io(), roomName: null}; //Create connection
        sceneData.roomName = prompt("Please join a room"); //for testing only
        this.scene.start("gameplay_scene", sceneData);
    }
}