export default class Player extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'red-square');

    this.anchor.set(0.5);

    this.controls = { curr: null, prev: null };
    this.moving = false;
    this.target = { x: 0, y: 0 };
    this.clickPressed = false;
  }

  update() {

    // check for mouse input
    this.handleInput();

    if (this.clickPressed) {
      if (this.x < this.target.x) {
        this.x += 2;
      }
      else if (this.x > this.target.x) {
        this.x -= 2;
      }
      else {
        this.clickPressed = false;
      }
    }
  }

  handleInput() {
    this.controls.curr = this.game.input.mousePointer.isDown;
    if (!this.controls.curr && this.controls.prev) {
      this.clickPressed = true;
      this.target.x = this.game.input.mousePointer.x;
    }
    this.controls.prev = this.controls.curr;
  }

}
