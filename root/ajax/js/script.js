$(function(){
	'use strict';

	let getData = function () {
		$.ajax({
			type: "GET",
			url: "/ajax/js/data.json",
			dataType: "json",
			timeout: 5000,
		})
		.done(function (data) {
			// 通信成功時の処理
			console.log('成功');
			let getdata = data.servant;

			for(let i = 0;i<getdata.length;i++){
				let html = '<div class="servant">';
					html += '<div class="servant__img"><img src="'+getdata[i].img+'" alt="'+getdata[i].name+'"></div>';
					html +='<div class="servant__info">';
					html += '<p class="servant__name">name '+getdata[i].name+'</p>';
					html += '<p class="servant__class">クラス '+getdata[i].class+'</p>';
					html += '<p class="servant__rarity">レアリティ '+getdata[i].rarity+'</p>';
					html += '</div>';
					html += '</div>';
				$('#ajax').append(html);
			}
		})
		.fail(function () {
			// 通信失敗
			console.log('失敗');
			let createP = document.createElement('p');
			$(createP).text('通信に失敗しました');
			$('#ajax').append(createP);
		});
	};

	getData();
});
