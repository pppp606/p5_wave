var wave = {
  Set:{
    frequency:10,//周波数
    volume:50,//ボリューム
    phase:0,//初期位相
    diff:0,//1サンプルで移動する位相量
    type:"sin",//波形タイプ(sin,saw,squ,tri)
    sample:0,//サンプリングレート
    multiple:4//オーバーサンプリングの倍数
  },
  buffer:[],
  getY:function(){
    var y;
    this.Set.phase += this.Set.diff;
    while (this.Set.phase > TWO_PI) {
      this.Set.phase -= TWO_PI;
    }
    switch (this.Set.type) {
      case "sin"://サイン波
        y = Math.sin(this.Set.phase);
        break;
      case "saw"://ノコギリ波
        y = this.Set.phase / PI - 1;
        break;
      case "squ"://矩形波
        y = this.Set.phase < PI ? -1 : 1;
        break;
      case "tri"://三角波
        y = this.Set.phase < PI ? -2 / PI * this.Set.phase + 1 : 2 / PI * this.Set.phase - 3;
        break;
    }
    //センターラインの位置とボリュームで調整
    y = y * this.Set.volume + height/2;
    return y;
  }
};

function setup() {
  createCanvas(800, 120);
  //サンプリングレートを設定
  wave.Set.sample = width * wave.Set.multiple;
}

function draw() {
  background(250);
  //センターライン
  stroke(220,220,220);
  line(0,height/2,width,height/2);
  //波形の色
  stroke(125,125,125);
  // スタート時点のy座標
  var lastpoints = wave.getY();
  //周波数でサンプリング数で割る
  wave.Set.diff = TWO_PI * wave.Set.frequency / wave.Set.sample;
  var i = 1;
  while (i < wave.Set.sample) {
    var y = wave.getY();
    var s = i % wave.Set.multiple;
    wave.buffer[s] = y;
    if(s == 0){
      //平均値を求める
      var j = 0;
      var sum = 0;
      while (j<wave.Set.multiple) {
        sum = sum + wave.buffer[j];
        j = (j +1) | 0;
      }
      y = sum / wave.Set.multiple;
      //波形描画
      line(i/wave.Set.multiple-1,lastpoints,i/wave.Set.multiple,y);
      lastpoints = y;
    }

    i = (i + 1)|0;
  }
}
