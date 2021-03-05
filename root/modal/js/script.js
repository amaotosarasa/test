
	/**
	 * youtubeAPI function化
	 */
	let player;
	const movie = ()=>{
		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// youtube用動画パラメーター
		window.onYouTubeIframeAPIReady = ()=> {
			player = new YT.Player('player', {
				height: '360',
				width: '640',
				videoId: 'OG0ZV8SJcNQ',
			});
		};
	};

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
				const modal = document.getElementsByClassName('modal')[0] || document.getElementById('modal--youtube');
				
				// CSSアニメーション後に時間差で要素を削除
				modal.classList.add('fadeIn--rev');
				if(modal === document.getElementById('modal--youtube')){
					modal.style.display = 'none';
					modal.classList.remove('fadeIn','fadeIn--rev');
					movie();
					player.pauseVideo();
					return false;
				}
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

	// youtube用モーダルクリック処理
	document.getElementById('testClick').addEventListener('click',()=>{
		const modalYoutube = document.getElementById('modal--youtube');
		modalYoutube.style.display = 'block';
		modalYoutube.classList.add('fadeIn');
		movie();
	});

	// モーダル削除時のクリック処理
	// 動的処理のDOM要素なので全体にクリック処理をかける。
	document.addEventListener('click', (e)=>{
		removeMmodal(e);
	});
}());