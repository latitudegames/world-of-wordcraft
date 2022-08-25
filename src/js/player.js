export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: "player-walk-right",
      frames: anims.generateFrameNumbers("character_2", { start: 24, end: 26 }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: "player-walk-left",
      frames: anims.generateFrameNumbers("character_2", { start: 12, end: 14 }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: "player-walk-up",
      frames: anims.generateFrameNumbers("character_2", { start: 36, end: 38 }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: "player-walk-down",
      frames: anims.generateFrameNumbers("character_2", { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.sprite = scene.physics.add.sprite(x, y, "character_2", 0).setSize(26, 26);
    this.sprite.scaleX = 2;
    this.sprite.scaleY = 2;
    this.sprite.anims.play("player-walk-down");

    this.keys = scene.input.keyboard.addKeys({
      // @ts-ignore
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      // @ts-ignore
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      // @ts-ignore
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      // @ts-ignore
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
    });
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 300;
    const prevVelocity = sprite.body.velocity.clone();

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

    // Horizontal movement
    if (keys.left.isDown) {
      sprite.body.setVelocityX(-speed);
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(speed);
    }

    // Vertical movement
    if (keys.up.isDown) {
      sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (keys.right.isDown) {
      sprite.anims.play("player-walk-right", true);
    } else if (keys.left.isDown) {
      sprite.anims.play("player-walk-left", true);
    } else if (keys.down.isDown) {
      sprite.anims.play("player-walk-down", true);
    } else if (keys.up.isDown) {
      sprite.anims.play("player-walk-up", true);
    } else {
      sprite.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.y < 0) sprite.setTexture("character_2", 1);
      else sprite.setTexture("character_2", 1);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
