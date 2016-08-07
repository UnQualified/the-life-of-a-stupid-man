import * as Phaser from 'phaser';

export default class ContextMenu extends Phaser.Text {

  constructor (game, x, y, toolTip = 'Interact') {
    let style = {
      font: 'bold 16px monospace, sans-serif',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
      align: 'center'
    };
    super(game, x, y, toolTip, style);

    this.anchor.setTo(0.5);
    this.inputEnabled = true;
    this.signalOnClick = new Phaser.Signal();

    // default hover events
    this.events.onInputOver.add(item => {
      item.fill = '#AFAFFF';
    });
    this.events.onInputOut.add(item => {
      item.fill = '#fff';
    });
    this.events.onInputUp.add(() => {
      this.signalOnClick.dispatch(this, 'dispatched');
    });

    // add the game
    this.game.add.existing(this);
  }

}
