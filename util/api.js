// let Base_Path = "";
// let Base_Path = "https://www.fastmock.site/mock/e6bc157b60be5751a2556725db68e1f1/_testApi/";  //mock.js


// let base_url = "https://bo.mrodt.com";  //线上发布
let base_url = "https://bo-test.mrodt.com";  //生成环境
// let base_url = "https://localhost:44399"; //开发环境
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "Loading...",
			mask: true,
		})

		uni.request({ 
			url: base_url + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header,
			success: (res) => {
				if (res.data.error_Msg != '') {
					uni.showToast({
						title: res.data.error_Msg,
						icon: "none",
						duration: 3000,
					})
				}else{
					resolve(res);
					// console.log(res)
					uni.hideLoading();
				}
			},
			fail: (err) => {
				uni.showToast({
					title: "接口调用失败"
				})
				reject(err);
				console.log(err)
				uni.hideLoading();
			}
		})
	})
}
