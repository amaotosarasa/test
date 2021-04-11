$(function () {
	$.scrollify({
		section: ".scroll_block",　// 画面幅いっぱいスクロールさせたい要素を指定
		interstitialSection: ".header,.footer", // 画面幅いっぱいスクロールから除外したい要素を指定 header/footerなど
		scrollbars: false, // スクロールバーを非表示
		updateHash: false, // URLの末尾に自動で#がつく機能を停止
	});
});