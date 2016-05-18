export default class ContextMenu {

  constructor(game, x, y, msg) {
    let fontConfig = {
      fill: '#f00',
      align: 'center'
    };
    this.text = game.add.text(x, y, msg, fontConfig);
  }
}
