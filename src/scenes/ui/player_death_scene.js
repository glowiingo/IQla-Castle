// Worked on by Lewis

class player_death_scene extends Phaser.Scene {
  constructor() {
    super('player_death_scene');
  }

  preload() {
    this.load.spritesheet(
      'deathAnimation',
      '../../assets/player/PlayerDeathCycle.png',
      { frameWidth: 128, frameHeight: 128, endFrame: 14 }
    );
  }

  create() {
    let deathConfig = {
      key: 'DeathCycle',
      frames: this.anims.generateFrameNumbers('deathAnimation', {
        start: 0,
        end: 14,
      }),
      frameRate: 8,
    };
    this.anims.create(deathConfig);
  }

  startDeathAnim() {
    return new Promise((resolve) => {
      this.cameras.main.setBackgroundColor('#000000');

      this.anim = this.add.sprite(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'deathAnimation'
      );

      this.anim.play('DeathCycle');

      resolve();
    });
  }
}
