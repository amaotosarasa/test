
(function(){
	'use strict';
	
	/**
	 * モーダル出現ポップアップ時の作成処理
	 * ClickEle クリックイベントの引数を受け取りsrcとaltを読み込む
	 */
	const modal = (ClickEle) =>{
		const
			target = ClickEle.target,
			targetGetAttrSrc = target.getAttribute('src'),
			targetGetAttrAlt = target.getAttribute('alt'),
			createEle = document.createElement('div');
		
		// モーダル用のDOM要素を作成
		createEle.classList.add('modal','fadeIn');
		createEle.innerHTML = 
			`
			<div class="modal__bg">
				<div class="modal__contents">
					<span class="modal--close"></span>
					<div class="modal__img">
						<img src="${targetGetAttrSrc}" alt="${targetGetAttrAlt}">
					</div>
					<p class="modal__txt">${targetGetAttrAlt}</p>
				</div>
			</div>
			`;
		document.body.appendChild(createEle);
	};

	/**
	 * モーダル出現後の処理
	 * ClickEle クリックイベントの引数を受け取りclassを読み込む
	 */
	const removeMmodal = (ClickEle) =>{
		const target = ClickEle.target;

			target.getAttribute('class');
			if(target.getAttribute('class') === 'modal__bg' || target.getAttribute('class') === 'modal--close'){
				// 取得したクラスがmodal__bgもしくはmodal--closeであれば処理を開始
				// モーダルの削除
				const modal = document.getElementsByClassName('modal')[0];

				// CSSアニメーション後に時間差で要素を削除
				modal.classList.add('fadeIn--rev');
				setTimeout(()=>{
					modal.remove();
				},1000);
			}
	};
	
	// モーダルアイテムのクリック処理
	const modaelItem = document.querySelectorAll('.js-modal__item');
	modaelItem.forEach(element => {
		element.addEventListener('click',(e) =>{
			modal(e);
		});
	});

	// モーダル削除時のクリック処理
	// 動的処理のDOM要素なので全体にクリック処理をかける。
	document.addEventListener('click', (e)=>{
		removeMmodal(e);
	});

}());