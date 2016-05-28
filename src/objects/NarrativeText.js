import InputHelper from './InputHelper';

export default class NarrativeText {

  constructor(game, x, y, msg) {
    let fontConfig = {
      fill: '#f00',
      align: 'center'
    };
    this.game = game;

    this.text = game.add.text(x, y, msg, fontConfig);
    this.test = this.textSequence(msg);

    this.inputHelper = new InputHelper();
  }

  *textSequence(textObject) {
    for (let i = 0; i < textObject.length; i++) {
      yield textObject[i];
    }
  }

  update() {
    let inputChecker = this.inputHelper.poll(this.game.input.mousePointer.isDown);
    if (inputChecker) {
      let temp = this.test.next().value;
      if (temp !== undefined) {
        console.log(temp);
      }
    }
  }
}
