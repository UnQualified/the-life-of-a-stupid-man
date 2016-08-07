import * as Phaser from 'phaser';
import ContextMenu from './ContextMenu';

export default class GameObject extends Phaser.Sprite {

  constructor (game, x, y, key) {
    super(game, x, y, key);
    this.anchor.setTo(0.5, 1);
    this.selected = false;

    this.menu = new ContextMenu(this.game, this.x, this.y - 50, 'Yes?');
    this.menu.visible = false;
    this.menu.signalOnClick.add(this.menuClick, this);

    this.inputEnabled = true;
    this.events.onInputUp.add(this.handleUp, this);
    this.events.onInputOver.add(this.handleOver, this);
    this.events.onInputOut.add(this.handleOut, this);
    this.input.useHandCursor = true;

    this.signalOnClick = new Phaser.Signal();

    this.game.add.existing(this);
  }

  handleUp () {
    this.selected = true;
    this.game.selectableObjectSelected = true;

    // dispatch a signal when clicked
    this.signalOnClick.dispatch(this, this);
  }

  handleOver () {
    // give a nice highlight
    this.tint = 0xff0000;
  }

  handleOut () {
    // remove the highlight
    this.tint = 0xffffff;
  }

  /** Method to handle signals when the menu is clicked */
  menuClick () {
    console.log('clicked the menu');
    this.menu.visible = false;
    this.selected = false;
  }

  /** Method to handle signals when player has reached the object */
  playerHasArrived (player) {
    console.log(player);
    console.log('player has arrived!');
    this.menu.visible = true;
  }

}
