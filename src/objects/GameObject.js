export default class GameObject extends Phaser.Sprite {

  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.anchor.set(0.5);
  }

  update() {
    // update logic
  }

  // helper function to add physics to object
  addPhysics(spec) {

    if (undefined === spec)
      return;

    this.game.physics.arcade.enable([this]);

    if (undefined !== spec.collideWorldBounds)
      this.body.collideWorldBounds = spec.collideWorldBounds;

    if (undefined !== spec.immovable)
      this.body.immovable = spec.immovable;

    if (undefined !== spec.allowGravity)
      this.body.allowGravity = spec.allowGravity;
  }
}
