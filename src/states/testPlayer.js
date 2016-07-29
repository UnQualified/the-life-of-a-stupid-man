import * as Phaser from 'phaser'
import Player from '../objects/Player'
import NarrativeText from '../objects/NarrativeText'
import { sparks } from '../objects/snippets'

export class TestPlayer extends Phaser.State {

  preload () {
    // 800 x 450
    this.game.stage.backgroundColor = '#007c19'

    this.player = new Player(this.game, 100, 300, 'red-square')

    this.game.world.setBounds(0, 0, 1920, 3000)
    this.game.camera.follow(this.player)
    this.game.camera.deadzone = new Phaser.Rectangle(300, 100, 200, 200)// 450, 390, 145, 60);
    this.game.add.existing(this.player)

    this.text_1 = new NarrativeText(this.game, 300, 0, sparks[0])
    this.text_2 = new NarrativeText(this.game, 900, 0, sparks[1])
  }

  update () {
    this.handleNarrativeSections()
  }

  handleNarrativeSections () {
    if (this.player.x > this.text_1.location.x && !this.text_1.started) {
      this.player.stop()
      this.text_1.startCycle().then(value => {
        console.log('finished doing the text thing')
        this.player.start()
      })
    } else if (this.player.x > this.text_2.location.x && !this.text_2.started) {
      this.player.stop()
      this.text_2.startCycle().then(value => {
        console.log('done too')
        this.player.start()
      })
    }
  }
}
