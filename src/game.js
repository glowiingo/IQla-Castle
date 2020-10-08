const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    backgroundColor: "0x000000",
    physics: {
        default: 'arcade',
        arcade: {
              enableBody: true,
              debug: false,
        }
    },
    scene: [preload_scene, mainmenu_scene, kill_scene, gameplay_scene, mouse_click_minigame, book_click_minigame],
    // Specify scenes in the array above
}
console.log("game.js with specified config");

const game = new Phaser.Game(config)