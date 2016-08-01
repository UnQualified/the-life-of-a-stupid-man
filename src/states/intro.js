import * as Phaser from 'phaser'
import Player from 'player'
import GameObject from 'gameObject'
import NarrativeText from 'narrativeText'
import Environment from 'environment'
import { sparks } from '../objects/snippets'

export class Intro extends Phaser.State {

  preload () {
    this.game.stage.backgroundColor = '#6F7583'
  }

  create () {
    // narrative text objects
    this.narrText = new NarrativeText(this.game, 0, 0, sparks[0], 3500)

    // remember to add the player last, so that they are on top of all other objects
    this.player = new Player(this.game, 100, 300, 'person')

    // static objects
    this.game.add.sprite(0, 0, 'cafe')

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

    // add the signals
    this.mileMarkers.forEach(gameObject => {
      gameObject.signalOnClick.add(this.player.gameObjectSignal, this.player)
      this.player.arrivedAtObject.add(this.player.resumeSignal, this.player)
    })
    this.narrText.onFinished.add(this.player.resumeSignal, this.player)

    this.environment = new Environment(this.game)
    this.environment.addRain()
  }

  update () {
    // this needs to be encapsulated somehow...
    // perhaps using another object?
    if (this.player.x > 250) {
      if (!this.narrText.started) {
        this.player.stop()
        this.narrText.startCycleSignal()
      }
    }
  }

  render () {
    // show context info, if enabled
    if (this.game.context !== null) {
      this.player.render()
    }
  }
}
