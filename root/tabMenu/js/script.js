
;(function () {
	'use strict';
	const jsTabTitle = document.querySelectorAll('.tab_title_block');
	jsTabTitle.forEach(element => {
		element.addEventListener('click', function (e) {
			const
				child = this.children,
				childLength = child.length,
				index = Array.prototype.indexOf.call(child, e.target),
				nextTarget = this.nextElementSibling,
				nextTargetChild = nextTarget.children,
				nextTargetChildLength = nextTargetChild.length;

			// タブタイトル クラスの初期化と再付与
			for (let i = 0; i < childLength; i++) {
				child[i].classList.remove('tab-active');
			}
			child[index].classList.add('tab-active');

			// タブコンテンツ 初期化と再表示
			for (let i = 0; i < nextTargetChildLength; i++) {
				nextTargetChild[i].style.display = 'none';
			}
			nextTargetChild[index].style.display = 'block';
		});
	});
}());