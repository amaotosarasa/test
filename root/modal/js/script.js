
	/**
	 * youtubeAPI function化
	 */

	/**
	 * 次の作業時に確認
	 https://www.notion.so/youtube-5823377062844016ae8b18bd5e8d9bb8
	 */

	// 動画管ID管理用データ
	const
		YTdata = [
		{
			id : 'OG0ZV8SJcNQ',
			movienumber : 'player01'
		},
		{
			id : 'HTLfSU8JfwY',
			movienumber : 'player02'
		},
		{
			id : 'WUFLQRvqxDA',
			movienumber : 'player03'
		}
	],
		MaxYTdata = YTdata.length;

	let player = [];
	const movie = ()=>{
		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// youtube用動画パラメーター
		window.onYouTubeIframeAPIReady = ()=> {
			// 複数のyoutube用インスタンスの作成
			for(let i = 0; i < MaxYTdata; i++){
				player[i] = new YT.Player(YTdata[i].movienumber, {
					height: '360',
					width: '640',
					videoId: YTdata[i].id,
				});
			}
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
					player.pauseVideo(); // 動画一時停止
					// ポップしたモーダルが、youtubeの場合はここで処置が終了
					return false;
				}

				// 通常のモーダルの場合は時間差でDOMを削除
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
	const youtubeBtn = document.querySelectorAll('.youtube--btn');
	youtubeBtn.forEach(element => {
		element.addEventListener('click',(e)=>{
			const
				modalYoutube = document.getElementById('modal--youtube'),
				getMovieNumber = e.target.dataset.movieNumber;
				
			modalYoutube.style.display = 'block';
			modalYoutube.classList.add('fadeIn');
			movie();
		});
	});


	// モーダル削除時のクリック処理
	// 動的処理のDOM要素なので全体にクリック処理をかける。
	document.addEventListener('click', (e)=>{
		removeMmodal(e);
	});
}());