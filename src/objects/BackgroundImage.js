import * as Phaser from 'phaser';

export default class BackgroundImage extends Phaser.Sprite {

  constructor(game, x, y, sprite, parallaxSpeed) {
    super(game, x, y, sprite);

    this.initialPos = { x: x, y: y };

    this.parallaxSpeed = parallaxSpeed || 0.1;

    this.game.add.existing(this);
  }

  update() {
    this.x = this.initialPos.x + this.game.camera.x * this.parallaxSpeed;
  }

}
