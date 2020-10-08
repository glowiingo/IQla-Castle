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
              debug: true,
        }
    },
    scene: [preload_scene, mainmenu_scene, trap_gameplay_scene]
    // Specify scenes in the array above
}
console.log("game.js with specified config");

const game = new Phaser.Game(config)