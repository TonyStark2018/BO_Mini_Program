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
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_2193036_xp6k0rd2s.eot?t=1606210618770'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_2193036_xp6k0rd2s.eot?t=1606210618770#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
	  url('//at.alicdn.com/t/font_2193036_xp6k0rd2s.woff?t=1606210618770') format('woff'),
	  url('//at.alicdn.com/t/font_2193036_xp6k0rd2s.ttf?t=1606210618770') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_2193036_xp6k0rd2s.svg?t=1606210618770#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-edit:before {
	  content: "\e602";
	}
	
	.icon-weikaitong:before {
	  content: "\e63f";
	}
	
	.icon-kaitong:before {
	  content: "\e8f8";
	}
	
	.icon-zhineng:before {
	  content: "\e637";
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
