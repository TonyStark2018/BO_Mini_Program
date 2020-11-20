<script>
	export default {
		onLaunch: function() {
			//首次进入小程序
			// uni.getStorage({
			// 	key: 'openid',
			// 	success: (res) => {
			// 		console.log(res.data);
			// 	},
			// 	fail: (err) => {
			// 		// 若无openid,则跳转至授权页
			// 		console.log(err.data);
			// 		if (.data == 'undefined') {
			// 			uni.navigateTo({
			// 				url: "pages/authorization/authorization"
			// 			})
			// 		}
			// 	}
			// })

			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*提交按钮样式 */
	.submit_btn {
		background-color: $theme-blue;
	}

	/*iconfont样式 */
	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/t/font_2193036_kikrwz1af3.eot?t=1605491272029');
		/* IE9 */
		src: url('//at.alicdn.com/t/font_2193036_kikrwz1af3.eot?t=1605491272029#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
			url('//at.alicdn.com/t/font_2193036_kikrwz1af3.woff?t=1605491272029') format('woff'),
			url('//at.alicdn.com/t/font_2193036_kikrwz1af3.ttf?t=1605491272029') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('//at.alicdn.com/t/font_2193036_kikrwz1af3.svg?t=1605491272029#iconfont') format('svg');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-zhineng:before {
		content: "\e637";
	}

	.icon-kaitongchenggong:before {
		content: "\e607";
	}

	.icon-weixiu:before {
		content: "\e600";
	}

	.icon-danganguanli:before {
		content: "\e67b";
	}

	.icon-yanshou:before {
		content: "\e697";
	}

	/*iconfont样式 */
</style>
