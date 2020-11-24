<template>
	<view class="authorization">
		<text class="iconfont icon-zhineng"></text>
		<view class="bm_name">宝欧智运维</view>
		<view class="bm_title">智能设备贴心保姆</view>
		<view class="bm_tig">请完成微信授权以继续使用</view>
		<button open-type="getUserInfo" type="default" @click="getAuthorize()" class="submit_btn">
			<uni-icons type="weixin" size="18" color="white" class="uni_icons"></uni-icons>微信快捷登录
		</button>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				openid: "",
				empty_guid: "00000000-0000-0000-0000-000000000000",
			};
		},
		onLoad() {
			this.checkUserInfo();
		},
		methods: {
			getAuthorize() {
				console.log("getAuthorize");
				uni.getSetting({
					success: (res) => {
						//已授权
						if (res.authSetting['scope.userInfo'] === true) {
							uni.login({
								provider: "weixin",
								success: (res) => {
									// let base_url = this.$online_url;	//生产环境
									// let base_url = this.$dev_url;	//开发环境
									let base_url = this.$real_url;	//线上环境
									let js_code = res.code;
									uni.request({
										url: base_url+"/Api/Get_App_User_OpenID_By_Code?Code="+js_code,
										methods: 'POST',
										success: (res) => {
											let result = res.data.data;
											var Json_result = JSON.parse(result);
											console.log(Json_result)
											
											// 将openid、session_key存储在Storage
											uni.setStorageSync("openid", Json_result['openid']);
											uni.setStorageSync("session_key", Json_result['session_key']);
											
											this.checkUserInfo();
										},
										fail: (err) => {
											console.log(err)
										}
									})
								}
							})
						}
					},
				})
			},

			//跳转注册页or首页
			async checkUserInfo() {
				let openid = uni.getStorageSync("openid");
				console.log("openid:", openid);

				if (openid != '') {
					const res = await this.$myRequest({
						url: "/Api/Get_App_User_Info?OpenID=" + openid
					})

					let uid = res.data.data.uid;
					if (uid === this.empty_guid) {
						uni.navigateTo({
							url: "../register/register?openid=" + openid,
						})
					} else {
						uni.switchTab({
							url: "../home/home"
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.authorization {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		height: 100vh;
		padding-top: 250rpx;

		.icon-zhineng {
			font-size: 80rpx;
			color: $theme-blue;
		}

		.bm_name {
			font-size: $large-font-size;
			font-weight: bold;
			margin-top: 30rpx;
		}

		.bm_title {
			font-size: $def-font-size;
			margin-top: 20rpx;
		}

		.bm_tig {
			font-size: $small-font-size;
			color: $theme-gray;
			margin-top: 80rpx;
		}

		.submit_btn {
			font-size: $def-font-size;
			background-color: $theme-blue;
			color: white;
			width: 50vw;
			margin-top: 20rpx;

			.uni_icons {
				margin-right: 10rpx;
			}
		}
	}
</style>
