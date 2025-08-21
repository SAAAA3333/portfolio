// メニューと対応するテキストを定義
const menuTextMap = {
    "ABOUT ME": "<span>SA</span><br>作者について",
    "GALLERY": "<span>ILLUST</span><br><em>作品一覧</em>",
    "GOODS": "<span>ITEM</span><br>グッズ",
    "DIARY": "<span>NEWS</span><br>お知らせ",
    "CONTACT": "<span>X・MAIL</span><br>お問い合わせ"
};

// メニューと対応するHTMLファイルを定義
const menuFileMap = {
    "ABOUT ME": "../aboutme.html",
    "GALLERY": "../gallery.html",
    "GOODS": "../goods.html",
    "DIARY": "../diary.html",
    "CONTACT": "../contact.html"
};

// 各要素を取得
const menuItems = document.querySelectorAll(".menu-content, .menu-content-last");
const imageFilter = document.querySelector(".overlay-filter");
const imageText = document.querySelector(".overlay-text");
const overlayContent = document.querySelector(".overlay-content");
const closeBtn = document.querySelector(".overlay-close");

// 初期は非表示
imageFilter.style.display = "none";
imageText.style.display = "none";



menuItems.forEach(item => {
    // メニューホバー時オーバーレイ
    item.addEventListener("mouseenter", () => {
        const text = item.textContent.trim(); // メニュー名取得
        const html = menuTextMap[text] || "";

        // フィルターとテキスト表示
        imageFilter.style.display = "block";
        imageText.style.display = "block";
        imageText.innerHTML = html;

        // +アイコン非表示
        const menuContentSpan = item.querySelector("span");
        menuContentSpan.style.display = "none";        

        // 回転クラスを一度削除して再付与（毎回アニメーションさせるため）
        imageText.classList.remove("rotate");
        void imageText.offsetWidth; // 再計算トリガー
        imageText.classList.add("rotate");
    });

    // ホバー解除で非表示
    item.addEventListener("mouseleave", () => {
        imageFilter.style.display = "none";
        imageText.style.display = "none";
        // +アイコン表示
        const menuContentSpan = item.querySelector("span");
        menuContentSpan.style.display = "inline-block";
        // リセット
        imageText.classList.remove("rotate");
    });


    // クリック時オーバーレイ
    item.addEventListener("click", e => {
        e.preventDefault();
        const menuName = item.textContent.trim();

        // オーバーレイ表示 
        const file = menuFileMap[menuName];
        if (file) {
            fetch(file)
                .then(res => res.text())
                .then(html => {
                    // text書き換え
                    overlayContent.innerHTML = html;
                    // 初期は透明
                    overlayContent.style.opacity = "0";
                    // アニメーション設定
                    overlayContent.style.transition = "opacity 0.5s ease-in-out";
                    // 透明を解除
                    overlayContent.style.opacity = "1";
                    // 閉じるボタン表示
                    closeBtn.style.opacity = "1";
                })

                // エラー時処理
                .catch(err => {
                    overlayContent.innerHTML = "<p>読み込みエラーが発生しました。</p>";
                    overlayContent.style.opacity = "0";
                    overlayContent.style.transition = "opacity 1s ease-in-out";
                    overlayContent.style.opacity = "1";
                    closeBtn.style.opacity = "1";
                });
        }
    });
});

// 閉じるボタン動作
closeBtn.addEventListener("click", () => {
    overlayContent.style.opacity = "0";
    closeBtn.style.opacity = "0";
});