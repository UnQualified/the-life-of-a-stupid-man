export default class ContextMenu {

  constructor(game, x, y, msg) {
    let fontConfig = {
      fill: '#f00',
      align: 'center'
    };

    this.text = game.add.text(x, y, msg, fontConfig);
    this.test = this.idMaker();
  }

  *idMaker() {
    let index = 0;
    while(index < 3)
      yield index++;
  }

  update() {
    let temp = this.test.next().value;
    if (temp !== undefined)
      console.log(temp);
  }
}
