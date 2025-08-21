function animateGlitchLine() {
  // 移動させる要素を取得
  const line = document.querySelector('#glitch-noise');

  // アニメーション設定
  const startY = -500; // スタート位置
  const endY = window.innerHeight; // エンド位置
  const duration = 6000 + Math.random() * 2000; // 6～8秒で移動
  const delay = Math.random() * 2000;   // ～2秒待機

  line.style.top = `${startY}px`;
  line.style.opacity = 0.6;
  line.style.transition = `none`;
  void line.offsetWidth; // トリガー強制再計算

  // 開始位置セット後に移動をトリガー
  requestAnimationFrame(() => {
    line.style.transition = `top ${duration}ms linear, opacity ${duration}ms ease-out`;
    line.style.top = `${endY}px`;
    line.style.opacity = 0;
  });

  // 次回発生を予約
  setTimeout(animateGlitchLine, duration + delay);
}

// ページ読み込み4秒後に実行
window.setTimeout(animateGlitchLine, 4000);

