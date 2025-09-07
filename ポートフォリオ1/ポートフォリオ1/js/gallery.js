// -------------------------------
// マウスドラッグでスクロールさせる関数
// -------------------------------
function mousedragscrollable(selector) {
    let target = null; // ドラッグ中の要素を格納する変数

    const elms = document.querySelectorAll(selector);
    elms.forEach(elm => {
        // マウス押下時
        elm.addEventListener("mousedown", e => {
        target = elm;                       // 対象要素を記録
        target.dataset.down = "true";       // ドラッグ状態を記録
        target.dataset.x = e.clientX;       // 押した位置を保存
        target.dataset.scrollleft = target.scrollLeft; // 現在のスクロール位置を保存
        e.preventDefault();                 // テキスト選択などを無効化
        });

        // クリック扱いを制御（ドラッグと区別するため）
        elm.addEventListener("click", e => {
        if (target && target.dataset.move === "true") {
            e.preventDefault();
            e.stopPropagation();
        }
        });
    });

    // マウスを動かしたとき
    document.addEventListener("mousemove", e => {
        if (target && target.dataset.down === "true") {
        // 移動量を計算
        const moveX = e.clientX - Number(target.dataset.x);
        if (Math.abs(moveX) > 2) {
            target.dataset.move = "true"; // ドラッグと認識
        }
        // スクロール位置を更新
        target.scrollLeft = Number(target.dataset.scrollleft) - moveX;

        // -------------------
        // 無限ループ処理
        // -------------------
        const maxScroll = target.scrollWidth / 2; // 複製前の幅を基準
        if (target.scrollLeft <= 0) {
            // 左端に行き過ぎたら右側にジャンプ
            target.scrollLeft += maxScroll;
        } else if (target.scrollLeft >= maxScroll) {
            // 右端に行き過ぎたら左側にジャンプ
            target.scrollLeft -= maxScroll;
        }
        }
    });

    // マウスを離したとき
    document.addEventListener("mouseup", () => {
        if (target) {
        target.dataset.down = "false"; // ドラッグ終了
        target = null;
        }
    });
}

// -------------------------------
// 右ボタンを押し続けたらスクロールする関数
// -------------------------------
function addRightButtonScroll(boardSelector, rightBtnSelector) {
    const board = document.querySelector(boardSelector);      // スクロール対象
    const rightBtn = document.querySelector(rightBtnSelector); // ボタン

    let intervalId = null; // setInterval のID（繰り返し処理を止めるために保存）
    const speed = 3;       // 1フレームごとに移動する距離（大きいほど速い）

    // スクロール開始（押した時）
    function startScroll() {
        if (intervalId) return; // 既にスクロール中なら何もしない
        intervalId = setInterval(() => {
        board.scrollLeft += speed; // 右に移動

        // -------------------
        // 無限ループ処理
        // -------------------
        const maxScroll = board.scrollWidth / 2;
        if (board.scrollLeft >= maxScroll) {
            // 右端を超えたら左にジャンプ
            board.scrollLeft -= maxScroll;
        }
        }, 16); // 約60fpsで処理
    }

    // スクロール停止（離した時・カーソルが外れた時）
    function stopScroll() {
        clearInterval(intervalId);
        intervalId = null;
    }

    // ボタン押しっぱなしで右へスクロール
    rightBtn.addEventListener("mousedown", startScroll);
    document.addEventListener("mouseup", stopScroll);
    rightBtn.addEventListener("mouseleave", stopScroll);
}

// -------------------------------
// ページ読み込み後に有効化
// -------------------------------
window.addEventListener("DOMContentLoaded", () => {
    mousedragscrollable("#illust-board");                  // ドラッグスクロール有効化
    addRightButtonScroll("#illust-board", "#scroll-left"); // 右ボタンでスクロール有効化
});