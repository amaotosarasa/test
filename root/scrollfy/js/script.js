$(function () {

	let current;
	$.scrollify({
		section: '.scroll_block',　// 画面幅いっぱいスクロールさせたい要素を指定
		interstitialSection: '.header,.footer', // 画面幅いっぱいスクロールから除外したい要素を指定 header/footerなど
		scrollbars: false, // スクロールバーを非表示
		updateHash: false, // URLの末尾に自動で#がつく機能を停止
		setHeights:false, // 高さ調整取り消し
		before:function(i,panels) {
			let ref = panels[i].attr('data-section-name');
			$('.pagination .active').removeClass('active');
			$('.pagination').find('a[href="#' + ref + '"]').addClass("active");
		},
		afterRender:function(){
			let pagination = '<ul class="pagination">';
			let activeClass = '';
			$('.scroll_block').each(function(i) {//1ページスクロールさせたいエリアクラス名を指定
			activeClass = '';
			if(i===$.scrollify.currentIndex()) {
				activeClass = 'active';
			}
			pagination += '<li><a class="' + activeClass + '" href="#' + $(this).attr("data-section-name") + '"></a></li>';
			});
			pagination += '</ul>';
			$('#about').append(pagination);//はじめのエリアにページネーションを表示
			$('.pagination a').on('click',$.scrollify.move);
		},
	});

	$(window).on('resize',function(){
		if(current){
			let currentScrl = $('.scroll_block').eq(current).offset().top;
			$(window).scrollTop(currentScrl);
		}
	});
});