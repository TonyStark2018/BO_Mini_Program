<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="uniForm">
				<view class="uni-form-item reg_item">
					<view class="reg-title">* 单位名称</view>
					<input class="input" name="company_Name" type="text" placeholder="请填写公司全称" />
				</view>
				<view class="uni-form-item reg_item">
					<view class="reg-title">担任职务</view>
					<input class="input" name="position" type="text" placeholder="请填写您的职务名称" />
				</view>
				<view class="uni-form-item reg_item">
					<view class="reg-title">* 真实姓名</view>
					<input class="input" name="real_Name" type="text" placeholder="用于验证开通权限" />
				</view>
				<view class="uni-form-item reg_item">
					<view class="reg-title">* 联系电话</view>
					<input class="input" name="tel" type="text" placeholder="请填写您的手机号" />
				</view>
				<view class="reg-tig">确认注册会员，即视为您已认可宝欧智运维服务协议</view>
				<button form-type="submit" type="primary" class="confirm-btn">确认注册</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				app_cust_list: [],

				openid: "",
				nickName: "",
				avatarUrl: "",
				gender: "",
				province: "",
				city: "",
			}
		},
		methods: {
			jumpToHome() {
				uni.switchTab({
					url: "../home/home"
				})
			},
			getUserInfo() {
				uni.getUserInfo({
					provider: "weixin",
					lang: "zh_CN",
					success: (res) => {
						console.log(res.userInfo);
						var data = res.userInfo;
						this.nickName = data.nickName;
						this.avatarUrl = data.avatarUrl;
						this.gender = data.gender;
						this.province = data.province;
						this.city = data.city;
					}
				});
			},

			async formSubmit(e) {
				var formdata = e.detail.value;
				const res = await this.$myRequest({
					url: "/Api/Create_App_User_Sign_In",
					method: 'POST',
					data: {
						Real_Name: formdata.real_Name,
						Position: formdata.position,
						Tel: formdata.tel,
						Company_Name: formdata.company_Name,

						OpenID: this.openid,
						NickName: this.nickName,
						AvatarUrl: this.avatarUrl,
						Gender: this.gender == 1 ? "男" : "女",
						City: this.city,
						Province: this.province,
					}
				})

				if (res.data.error_Msg == '') {
					this.jumpToHome();
				}
			}
		},
		onLoad(param) {
			this.openid = param.openid;
			this.getUserInfo();
		}
	}
</script>

<style lang="scss">
	.content {
		background-image: url(../../static/img/bg_img.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		.uniForm {
			width: 70vw;

			.reg_item {
				margin-bottom: 32rpx;
			}

			.reg-title {
				font-size: 28rpx;
				color: #3f64c0;
			}

			.reg-tig {
				font-size: 22rpx;
				color: #707b8f;
				margin-bottom: 20rpx;
			}

			.input {
				font-size: 32rpx;
				border-bottom: 2rpx solid #2874d7;
				padding: 20rpx 0;
			}

			.confirm-btn {
				background: #2874d7;
				font-size: 32rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
