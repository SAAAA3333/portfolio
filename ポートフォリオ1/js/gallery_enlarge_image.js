(() => {
    // ---------------------------------------------
    // 1. 要素の取得
    // ---------------------------------------------
    const board   = document.getElementById('illust-board'); // 横スクロールするエリア
    const enlarge = document.getElementById('enlarge-image'); // 拡大表示するエリア
    const boxes   = Array.from(board.querySelectorAll('.film-box')); // 各フィルムボックスを配列で取得

    // 左端に「どれだけ近づいたら到達とみなすか」の許容範囲(px)
    const ACTIVATION_RADIUS = 120;

    // スクロールイベントの処理を間引くためのフラグ
    let rafId = null;

    // 直前に表示していた .film-box を記憶（無駄な差し替えを防ぐ）
    let currentActive = null;

    // ---------------------------------------------
    // 2. 指定の .film-box の画像を #enlarge-image に表示する関数
    // ---------------------------------------------
    function showFilmImgOf(box) {
        if (!box) return;                   // nullなら何もしない
        if (currentActive === box) return;  // すでに表示中なら何もしない

        // .film-img を探す
        const img = box.querySelector('.film-img');
        if (!img) return;

        // すでに同じ画像が表示されていれば切り替えない
        const currentImg = enlarge.querySelector('img');
        if (currentImg && currentImg.src === img.src) {
        currentActive = box;
        return;
        }

        // 画像を複製して #enlarge-image に入れる
        const clone = img.cloneNode(true);
        enlarge.replaceChildren(clone);

        // 今表示している .film-box を記録
        currentActive = box;
    }

    // ---------------------------------------------
    // 3. #illust-board の左端に最も近い .film-box を探す関数
    // ---------------------------------------------
    function findNearestBoxToBoardLeft() {
        // board 自体の位置を取得（ブラウザの左端からの距離）
        const boardRect = board.getBoundingClientRect();
        const baseX = boardRect.left; // 基準点 = board の左端

        let best = null;       // 最も近い box を格納する変数
        let bestDist = Infinity; // 最小距離を記録するための初期値

        // すべての film-box について距離を計算
        for (const box of boxes) {
        const rect = box.getBoundingClientRect();
        const dist = Math.abs(rect.left - baseX); // box 左端と board 左端の距離
        if (dist < bestDist) {
            bestDist = dist;
            best = box;
        }
        }

        // 左端にある程度近い場合だけ返す
        if (best && bestDist <= ACTIVATION_RADIUS) {
        return best;
        }
        return null;
    }

    // ---------------------------------------------
    // 4. 実際に「どの box を表示するか」を決めて反映する関数
    // ---------------------------------------------
    function update() {
        rafId = null; // 次回の requestAnimationFrame を予約できるようにリセット
        const target = findNearestBoxToBoardLeft(); // 左端に一番近い box を探す
        if (target) showFilmImgOf(target);          // 見つかったら画像を表示
    }

    // ---------------------------------------------
    // 5. スクロールイベントを処理
    // ---------------------------------------------
    function onScroll() {
        // すでに requestAnimationFrame が予約されていれば二重処理しない
        if (rafId != null) return;
        // 次の描画タイミングで update() を呼ぶよう予約
        rafId = requestAnimationFrame(update);
    }

    // ---------------------------------------------
    // 6. 初期表示（ページロード直後）
    // ---------------------------------------------
    update();

    // board をスクロールしたときに反応
    board.addEventListener('scroll', onScroll, { passive: true });

    // ウィンドウのサイズが変わったときも再計算
    window.addEventListener('resize', () => {
        if (rafId != null) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(update);
    });
})();