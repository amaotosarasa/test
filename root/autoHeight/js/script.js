(function () {
	'use strict';

	const jsHeightEle = document.querySelectorAll('.js-height');
	const autoHeight = function (Element,Column) {
		const
			jsHeightEle = Element,
			arrayHeight = [],
			HeighColumn = Column;
		let max_height = 0;
		
		jsHeightEle.forEach(function (elem, index) {
			let h = elem.clientHeight;
			if (max_height < h) {
				// 高さを比較し、大きければ代入する
				max_height = h;
			}
			if ((index + 1) % HeighColumn === 0 || index === jsHeightEle.length - 1) {
				// 比較した数字を配列に格納して数字をリセットする
				arrayHeight.push(max_height);
				max_height = 0;
			}
		});
		
		// 要素の高さを代入していく
		let columnCount = 0;
		jsHeightEle.forEach(function (elem, index) {
			elem.style.height = arrayHeight[columnCount] + 'px';
			if ((index +1) % HeighColumn === 0 ) {
				columnCount++;
			}
		});
	}
	// 幅が768px以上のビューポートをターゲットとする条件を作成
	const mediaQuery = window.matchMedia('(min-width: 768px)')

	function handleTabletChange(e) {
		if (e.matches) {
			autoHeight(jsHeightEle, 3);
		} else {
			jsHeightEle.forEach(function (elem, index) {
				elem.removeAttribute('style');
			});
		}
	}

	// イベントリスナーを登録
	mediaQuery.addListener(handleTabletChange)

	// 初期チェック
	handleTabletChange(mediaQuery)

}());