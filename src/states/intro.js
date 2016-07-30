import * as Phaser from 'phaser'
import Player from 'player'
import GameObject from 'gameObject'

export class Intro extends Phaser.State {

  preload () {
    this.game.stage.backgroundColor = '#6F7583'
  }

  create () {
    this.player = new Player(this.game, 100, 300, 'person')

    // mile markers
    this.mileMarkers = [
      new GameObject(this.game, 600, 300, 'red-square'),
      new GameObject(this.game, 1200, 300, 'red-square'),
      new GameObject(this.game, 1800, 300, 'red-square'),
      new GameObject(this.game, 2200, 300, 'red-square'),
      new GameObject(this.game, 2600, 300, 'red-square'),
      new GameObject(this.game, 3000, 300, 'person')
    ]

    // world setup
    this.game.world.setBounds(0, 0, 3500, 450)
  }

  render () {
    // show context info, if enabled
    if (this.game.context !== null) {
      this.player.render()
    }
  }

}
