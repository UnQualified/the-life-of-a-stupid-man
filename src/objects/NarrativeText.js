import * as Phaser from 'phaser'

export default class NarrativeText {

  constructor (game, x, y, text, time = 3000, callback) {
    let style = {
      font: 'bold 16px monospace, sans-serif',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 600
    }

    this.game = game
    this.textArray = text
    this.text = []
    this.time = time
    this.started = false
    this.finished = false
    this.location = { x: x, y: y }

    /** this is not used as there is no events object to bind to * /
    this.onFinished = new Phaser.Signal();
    this.onFinished.add((msg) => {
      console.log(msg);
      if (typeof callback === 'function') {
        callback();
      }
    });
    */

    this.setupText(this.game, 0, 0, style)
  }

  /** Puts the text from the array into usable Phaser.Text objects */
  setupText (game, x, y, style) {
    this.textArray.forEach(item => {
      let phaserText = new Phaser.Text(game, x, y, item, style)
      phaserText.setTextBounds(0, 350, 800, 100)
      phaserText.fixedToCamera = true
      this.text.push({
        ogText: item,
        phaserText: phaserText
      })
    })
  }

  /** Starts displaying the text*/
  startCycle () {
    if (!this.started && !this.finished) {
      this.started = true
      let stuff = this.getText()
      this.currentText = stuff.next().value
      this.game.add.existing(this.currentText)
      return new Promise((resolve, reject) => {
        this.game.time.events.repeat(this.time, this.text.length, () => {
          this.currentText.destroy()
          this.currentText = stuff.next().value
          if (this.currentText !== undefined) {
            this.game.add.existing(this.currentText)
          } else {
            this.finished = true
            resolve(this.finished)
          }
        }, this)
      })
    }
  }

  /** Generator function that yields the next Phaser.Text object */
  * getText () {
    for (let i = 0; i < this.text.length; i++) {
      yield this.text[i].phaserText
    }
  }
}
