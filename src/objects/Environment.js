export default class Weather {

  constructor (game) {
    this.game = game;
  }

  addRain () {
    // http://www.joshmorony.com/how-to-add-weather-effects-in-phaser-games/
    let rainParticle = this.game.add.bitmapData(15, 50);

    rainParticle.ctx.rect(0, 0, 15, 50);
    rainParticle.ctx.fillStyle = '#9cc9de';
    rainParticle.ctx.fill();

    this.emitter = this.game.add.emitter(this.game.world.centerX, -500, 800);
    this.emitter.width = this.game.world.width;
    this.emitter.angle = 10;

    this.emitter.makeParticles(rainParticle);

    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 0.3;

    this.emitter.setYSpeed(1000, 1500);
    this.emitter.setXSpeed(-5, 5);

    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;

    this.emitter.start(false, 1600, 5, 0);
  }

  removeRain () {
    this.emitter.kill();
  }

}
