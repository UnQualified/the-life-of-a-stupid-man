import GameObject from './GameObject';
import NarrativeText from './NarrativeText';

export default class SelectableGameObject extends GameObject {

  constructor(game, x, y, key, msg) {
    super(game, x, y, key);

    this.inputEnabled = true;
    this.tintColour = Math.random() * 0xffffff;
    this.mouseDown = false;

    this.text = this.game.add.text(
      this.x, this.y,
      'Object',
      { fill: '#f00', align: 'center' }
    );
    this.text.visible = false;

    this.narrativeText = new NarrativeText(
      this.game,
      this.game.world.width / 2,
      this.game.world.height - 45,
      msg,
      {
        fill: '#f00',
        align: 'center'
      }
    );

    this.senderSignal = new Phaser.Signal();
    this.senderSignal.add(function() {
      // signal from object
      console.log(arguments[0]);
      // initialise context menu

      this.narrativeText.text.visible = true;
    }, this);
  }

  update() {
    this.handleSelectable();
    this.narrativeText.update();
    if (this.narrativeText.finished) {
      //console.log('reactive player!!');
    }
  }

  handleSelectable() {
    if (this.input.pointerOver()) {
      this.tint = this.tintColour;
      this.text.visible = true;
    }
    else {
      this.tint = 0xffffff;
      this.text.visible = false;
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

}
