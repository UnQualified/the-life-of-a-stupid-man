import * as Phaser from 'phaser'
import ContextMenu from 'contextMenu'
import Player from 'player'
import GameObject from 'gameObject'

export class TestContextMenu extends Phaser.State {

  preload () {
    this.game.stage.backgroundColor = '#545455'
  }

  create () {
    this.game.selectableObjectSelected = false
    this.player = new Player(this.game, 100, 300, 'red-square')
    this.contextMenu = new ContextMenu(this.game, 200, 200)

    this.gameObject = new GameObject(this.game, 400, 300, 'red-square')
    this.gameObject.signalOnClick.add(this.player.gameObjectSignal, this.player)
    this.player.arrivedAtObject.add(this.gameObject.playerHasArrived, this.gameObject)

    this.gameObject.menu.signalOnClick.add(this.player.menuClickSignal, this.player)
  }

  update () {
  }

}
