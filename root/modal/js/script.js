
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
		createEle.classList.add('modal');
		createEle.innerHTML = 
			`
			<div class="modal">
				<div class="modal__bg">
					<div class="modal__contents">
						<span class="modal--close"></span>
						<div class="modal__img">
							<img src="${targetGetAttrSrc}" alt="${targetGetAttrAlt}">
						</div>
						<p>${targetGetAttrAlt}</p>
					</div>
				</div>
			</div> 
			`;
		document.body.appendChild(createEle);
	};
	
	const modaelItem = document.querySelectorAll('.js-modal__item');
	modaelItem.forEach(element => {
		element.addEventListener('click',(e) =>{
			modal(e);
		});
	});

}());