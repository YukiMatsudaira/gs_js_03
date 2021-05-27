// cssでスタイリングすると、canvasのデフォルトサイズからの相対サイズになってしまう
// そのため、canvas内に描画した画像が引き伸ばされることになる
// canvas要素のwidth、height属性を、jsで.wrapperに合わせる
const w = $('.wrap').width();
const h = $('.wrap').height();
$('#mycanvas').attr('width', w);
$('#mycanvas').attr('height', h);

let preX = 0; // 1つ前のX座標
let preY = 0; // 1つ前のY座標
let drawFlag = false;   // 線を描画中か

$('#mycanvas').mousedown(e => {
    // canvasの左上隅を原点とする座標を求める
    const downX = e.offsetX;
    const downY = e.offsetY;

    // ダウンしたので、描画フラグをtrueにする
    drawFlag = true;

    // 座標を保持する
    preX = downX;
    preY = downY;
});

$('#mycanvas').mousemove(e => {
    if(!drawFlag) {// 描画中でない
        return;
    }
    // canvasの左上隅を原点とする座標を求める
    const downX = e.offsetX;
    const downY = e.offsetY;

    // 1つ前の座標から現在の座標まで線分を描画する
    drawLine(preX, preY, downX, downY);

    // 座標を保持する
    preX = downX;
    preY = downY;
});

$('#mycanvas').mouseup(e => {
    // マウスボタンが離されたので、描画フラグをfalseにする
    drawFlag = false;
});

$('#mycanvas').mouseout(e => {
    // マウスカーソルがcanvasの外に出たので、描画フラグをfalseにする
    drawFlag = false;
});

function drawLine(startX, startY, endX, endY) {
    // コンテキストを取得
    const ctx = $('#mycanvas')[0].getContext('2d');

    // 現在の描画状態を保存する
    ctx.save();   

    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';

    ctx.beginPath();                // 現在のパスをリセットする
    ctx.moveTo(startX, startY);     // パスの開始座標を指定する
    ctx.lineTo(endX, endY);         // 座標を指定してラインを引く
    ctx.stroke();                   // 現在のパスを描画する

    // 描画状態を保存した時点のものに戻す
    ctx.restore();
}

// クリアボタン
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', click_clear, false);

function click_clear() {
    const mycanvas = document.getElementById('mycanvas');
    const mayCon = mycanvas.getContext('2d');
    mayCon.fillStyle = "rgb(255, 255, 255)";
    mayCon.fillRect(mycanvas.clientLeft, mycanvas.clientTop, mycanvas.clientWidth, mycanvas.clientHeight);
} 