import InputHelper from './InputHelper';

export default class NarrativeText {

  constructor(game, x, y, msg) {
    this.fontConfig = {
      fill: '#f00',
      align: 'center'
    };
    this.game = game;
    this.position = {
      x: x,
      y: y
    };

    this.text = game.add.text(x, y, msg[0], this.fontConfig);
    this.text.visible = false;
    this.msg = msg;
    this.test = this.textSequence(this.msg);
    this.finished = false;

    this.inputHelper = new InputHelper();
  }

  *textSequence(textObject) {
    for (let i = 1; i < textObject.length; i++) {
      yield textObject[i];
    }
  }

  update() {
    let inputChecker = this.inputHelper.poll(this.game.input.mousePointer.isDown);
    if (inputChecker) {
      if (this.text.visible) {
        let temp = this.test.next().value;
        if (temp !== undefined) {
          this.text.text = temp;
          console.log(temp);
        }
        else {
          this.text.visible = false;
          this.finished = true;
        }
      }
    }
  }

  reset() {
    this.finished = false;
    this.text.visible = false;
    this.test = this.textSequence(this.msg);
    this.text.text = this.msg[0];
  }
}
