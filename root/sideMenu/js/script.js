const scrollElm = (function () {
	if ('scrollingElement' in document) return document.scrollingElement;
	if (navigator.userAgent.indexOf('WebKit') != -1) return document.body;
	return document.documentElement;
})();
(function () {
	/* スムーズスクロール */
	const smoothScroll = ()=> {
		const duration = 500;
		const ignore = '.noscroll';
		const easing = function (t, b, c, d) { return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b; }; //jswing
		const smoothScrollElm = document.querySelectorAll('a[href^="#"]:not(' + ignore + ')');
		Array.prototype.forEach.call(smoothScrollElm, function (elm) {
			elm.addEventListener('click', function (e) {
				e.preventDefault();
				var targetElm = document.querySelector(elm.getAttribute('href'));
				if (!targetElm) return;
				const targetPos = targetElm.getBoundingClientRect().top;
				const startTime = Date.now();
				const scrollFrom = scrollElm.scrollTop;
				(function loop() {
					const currentTime = Date.now() - startTime;
					if (currentTime < duration) {
						scrollTo(0, easing(currentTime, scrollFrom, targetPos, duration));
						window.requestAnimationFrame(loop);
					} else { scrollTo(0, targetPos + scrollFrom); }
				})();
			});
		});
	};

	window.addEventListener('load',()=> {
		smoothScroll();
	});
})();
