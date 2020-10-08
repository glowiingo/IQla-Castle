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
  scene: [preload_scene, temp_menu_scene, mainmenu_scene, gameplay_scene, playerUI_scene]
  // Specify scenes in the array above
}
console.log("game.js with specified config");

const game = new Phaser.Game(config)