class WhiteKey {
  constructor(x, y, audio) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 250;
    this.audio = audio;
  }

  draw(color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  play() {
    // this.draw("rgb(4, 205, 219)")
    this.audio.pause();
    this.audio.currentTime = 0.45;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0.45;
  }


}
