(function(){
	'use strict';

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
	];
	const MaxYTdata = YTdata.length;
	let player = [];

	/**
	 * youtubeのAPIをDOMに挿入し、YTdataに記載されてデータから動画操作用のインスタンスを作成
	 */
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
	movie();

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

				// アクションを起こすモーダル要素を判定
				// youtube動画の場合は非表示
				// 通常モーダルの場合は要素を削除する。
				const modal = document.getElementsByClassName('modal')[0] || document.getElementById('modal--youtube');
				
				// モーダル非表示処理
				modal.classList.add('fadeIn--rev');
				if(modal === document.getElementById('modal--youtube')){
					modal.style.display = 'none';
					modal.classList.remove('fadeIn--rev','fadeIn');
					document.getElementById(YTdata[index].movienumber).style.display = 'none';
					player[index].pauseVideo(); // 動画一時停止
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
	let index; // クリックされた要素から取得したdata属性をものに番号を取得し格納する。
	youtubeBtn.forEach(element => {
		element.addEventListener('click',(e)=>{
			const
				modalYoutube = document.getElementById('modal--youtube'),
				getMovieNumber = e.target.dataset.movieNumber;
				index = YTdata.findIndex(({id}) => id === getMovieNumber);
				document.getElementById(YTdata[index].movienumber).style.display = 'block';
			modalYoutube.style.display = 'block';
			modalYoutube.classList.add('fadeIn');
		});
	});

	// モーダル削除時のクリック処理
	// 動的処理のDOM要素なので全体にクリック処理をかける。
	document.addEventListener('click', (e)=>{
		removeMmodal(e);
	});
}());