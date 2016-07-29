import InputHelper from './InputHelper';

export default class NarrativeText {

  constructor(game, x, y, msg, type = 'input') {
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

    this.type = type;
    this.updater = false;
    this.inputHelper = new InputHelper();

    this.timers = [];
    this.msg.forEach((item) => {
      let timer = this.game.time.create(true);
      timer.loop(3000, () => {
        console.log('tick');
      });
      //timer.autoDestroy = true;
      timer.onComplete = function() {
        console.log('job done!');
      }
      this.timers.push(timer);
    });
  }

  *textSequence(textObject) {
    for (let i = 1; i < textObject.length; i++) {
      yield textObject[i];
    }
  }

  update() {
    //console.log(this.timers[0]);
    if (!this.timers[0].running) {
      this.timers[0].start();
      console.log(this.timers[0]);
    }
    if (this.type === 'input') {
      this.updater = this.inputHelper.poll(this.game.input.mousePointer.isDown);
    } else {
      // TODO:
      // this needs to be modified so that a timer function is attached to each
      // element in the msg array...
      // An alternate approach could be have narrative text as individual instances
      // that change when the player hits certain points...
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
        this.updater = true;
      });
    }
    //let inputChecker = this.inputHelper.poll(this.game.input.mousePointer.isDown);
    if (this.updater) {
      // console.log(this.text.visible);
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
      this.updater = false;
    }
  }

  reset() {
    this.finished = false;
    this.text.visible = false;
    this.test = this.textSequence(this.msg);
    this.text.text = this.msg[0];
  }
}
