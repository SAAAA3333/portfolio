// ==============================
// 定義部
// ==============================

// メニューと対応するテキスト
const menuTextMap = {
    "ABOUT ME": "<span>SA</span><br>作者について",
    "GALLERY": "<span>ILLUST</span><br><em>作品一覧</em>",
    "GOODS": "<span>ITEM</span><br>グッズ",
    "TOPICS": "<span>NEWS</span><br>お知らせ",
    "CONTACT": "<span>X・MAIL</span><br>お問い合わせ"
};

// メニューと対応するHTMLファイル
const menuFileMap = {
    "ABOUT ME": "../aboutme.html",
    "GOODS": "../goods.html",
    "TOPICS": "../topics.html",
    "CONTACT": "../contact.html"
};

// DOM要素取得
const menuItems = document.querySelectorAll(".menu-content, .menu-content-last");
const imageFilter = document.querySelector(".overlay-filter");
const imageText = document.querySelector(".overlay-text");
const overlayContent = document.querySelector(".overlay-content");
const closeBtn = document.querySelector(".overlay-close");

// JSONデータ用
let topicsData = [];
let topicsIndex = 0;

// ページ保持用FLG
let pageSaveFlg = true;

// ==============================
// JSONロード
// ==============================
function loadTopicsJson() {
    fetch("/json/topics.json")
        .then(res => res.json())
        .then(data => {
            topicsData = data;
        })
        .catch(err => {
            console.error("JSON読み込みエラー:", err);
        });
}


// ==============================
// Topicsページ切り替え
// ==============================

// ページめくりアニメーション
function pageAnimation() {
    const bgImg = overlayContent.querySelector("#background-img");
    const pageTxt = overlayContent.querySelector("#article-text");

    if (!bgImg || !pageTxt || topicsData.length === 0) return;

    // 背景アニメーション
    resetAnimation(bgImg, "page-slide");
    // テキストアニメーション
    resetAnimation(pageTxt, "text-slide");
}

// テキスト挿入
function pageInsert(index) {
    const pageTxt = overlayContent.querySelector("#article-text");

    setTimeout(() => {
        const entry = topicsData[index];
        pageTxt.innerHTML = `
            <div class="topics-date">${entry.date}</div>
            <p>${entry.body}</p>
        `;
    }, 200);
}

// 1ページ戻る
function topicsPageBack() {
    pageAnimation();

    if(pageSaveFlg === true) {
        topicsIndex = 0;
        pageInsert(topicsIndex);
        pageSaveFlg = false;
    } else {
        topicsIndex = (topicsIndex + 1) % topicsData.length;
        pageInsert(topicsIndex);
    }
}

// 1ページ進む
function topicsPageNext() {
    pageAnimation();

    if(pageSaveFlg === true) {
        topicsIndex = 0;
        pageInsert(topicsIndex);
        pageSaveFlg = false;
    } else {
        topicsIndex = (topicsIndex - 1 + topicsData.length) % topicsData.length;
        pageInsert(topicsIndex);
    }
}

// 最新・最古ページ
function topicsPage(index) {
    pageAnimation();
    topicsIndex = index;
    pageInsert(topicsIndex);
    pageSaveFlg = false;
}


// ==============================
// 汎用: アニメーションリセット+追加
// ==============================
function resetAnimation(el, className) {
    el.classList.remove(className);
    void el.offsetWidth; // 強制リフロー
    el.classList.add(className);
}


// ==============================
// オーバーレイ表示/非表示
// ==============================
function showOverlay(html) {
    overlayContent.innerHTML = html;
    overlayContent.style.opacity = "0";
    overlayContent.style.transition = "opacity 0.5s ease-in-out";
    requestAnimationFrame(() => {
        overlayContent.style.opacity = "1";
        closeBtn.style.opacity = "1";
    });
}
// 閉じるボタン
function hideOverlay() {
    overlayContent.style.opacity = "0";
    closeBtn.style.opacity = "0";
}


// ==============================
// メニューホバー処理
// ==============================
function handleMenuHover(item) {
    const text = item.textContent.trim();
    const html = menuTextMap[text] || "";

    imageFilter.style.display = "block";
    imageText.style.display = "block";
    imageText.innerHTML = html;

    // +アイコン非表示
    const menuContentSpan = item.querySelector("span");
    if (menuContentSpan) menuContentSpan.style.display = "none";

    // アニメーション再生
    resetAnimation(imageText, "rotate");
}

function handleMenuLeave(item) {
    imageFilter.style.display = "none";
    imageText.style.display = "none";

    // +アイコン再表示
    const menuContentSpan = item.querySelector("span");
    if (menuContentSpan) menuContentSpan.style.display = "inline-block";

    imageText.classList.remove("rotate");
}


// ==============================
// メニュークリック処理
// ==============================
function handleMenuClick(item, e) {
    e.preventDefault();
    const menuName = item.textContent.trim();

    if (menuName === "GALLERY") {
        sessionStorage.setItem('disableStyle', 'true');
        window.location.href = menuName.toLowerCase() + ".html";
        return;
    }

    if (menuName === "TOPICS") {
        pageSaveFlg = true;
    }

    const file = menuFileMap[menuName];
    if (file) {
        fetch(file)
            .then(res => res.text())
            .then(html => showOverlay(html))
            .catch(() => {
                showOverlay("<p>読み込みエラーが発生しました。</p>");
            });
    }
}


// ==============================
// イベント登録
// ==============================
function registerEvents() {
    // topicsクリックイベント
    overlayContent.addEventListener("click", e => {
        if (e.target && e.target.id === "topics-next") {
            topicsPageNext();
        } else if(e.target && e.target.id === "topics-back") {
            topicsPageBack();
        } else if (e.target && e.target.id === "latest") {
            topicsPage(0);
        } else if (e.target && e.target.id === "oldest") {
            topicsPage(topicsData.length - 1);
        }
    });

    // 各メニューのイベント
    menuItems.forEach(item => {
        item.addEventListener("mouseenter", () => handleMenuHover(item));
        item.addEventListener("mouseleave", () => handleMenuLeave(item));
        item.addEventListener("click", e => handleMenuClick(item, e));
    });

    // 閉じるボタン
    closeBtn.addEventListener("click", hideOverlay);
}


// ==============================
// 初期化処理
// ==============================
function init() {
    // 初期は非表示
    imageFilter.style.display = "none";
    imageText.style.display = "none";

    loadTopicsJson();
    registerEvents();
}

// 実行
init();