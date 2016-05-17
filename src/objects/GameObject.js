export default class GameObject extends Phaser.Sprite {

  constructor(game, x, y, key, selectable) {
    super(game, x, y, key);
    this.anchor.set(0.5);

    this.selectable = selectable;
    if (true === this.selectable) {
      this.inputEnabled = true;
      this.tintColour = Math.random() * 0xffffff;
      this.mouseDown = false;

      // event handling
      //this.signal = new Phaser.Signal();
      //this.signal.add(function() {
      //  console.log('clicked!!!');
      //}, this);
    }
  }

  update() {
    if (true === this.selectable)
      this.handleSelectable();
  }

  handleSelectable() {
    if (this.input.pointerOver()) {
      this.tint = this.tintColour;
    }
    else {
      this.tint = 0xffffff;
    }

    if (this.input.pointerDown()) {
      if (undefined !== this.signal) {
        if (!this.mouseDown) {
          this.signal.dispatch(this);
          this.mouseDown = true;
        }
      }
    }

    if (this.input.pointerUp()) {
      this.mouseDown = false;
    }
  }

  addSignal(signal) {
    this.signal = signal;
  }

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
