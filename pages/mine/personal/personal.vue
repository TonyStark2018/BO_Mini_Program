<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="user_wrap">
				<view class="user_title">担任职务</view>
				<input class="input" name="position" v-model="formData.position" type="text" placeholder="请填写您的职务名称" />
			</view>

			<view class="user_wrap">
				<view class="user_title">联系电话</view>
				<input class="input" name="tel" v-model="formData.tel" type="text" placeholder="请填写您的手机号" />
			</view>

			<button form-type="submit" class="submit_btn">保存</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				openid: '',
				formData: {
					position: '',
					tel: ''
				}
			};
		},
		onLoad() {
			this.getOpenid();
			this.getUserInfo();
		},
		
		methods: {
			jumpToMine() {
				uni.switchTab({
					url: "../mine"
				})
			},

			async formSubmit(e) {
				var formdata = e.detail.value;
				console.log(formdata);
				const res = await this.$myRequest({
					url: "/Api/Update_App_User",
					method: 'POST',
					data: {
						OpenID: this.openid,
						Position: formdata.position,
						Tel: formdata.tel,
					}
				})

				if (res.data.error_Msg == '') {
					uni.showToast({
						title: "修改成功",
						icon: "success",
						duration: 3000,
					})
					this.jumpToMine();
				}
			},


			getOpenid() {
				let openid = uni.getStorageSync("openid");
				this.openid = openid;
			},

			async getUserInfo() {
				const res = await this.$myRequest({
					url: "/Api/Get_App_User_Info",
					data: {
						OpenID: this.openid,
					}
				})
				let user = res.data.data;
				this.formData.position = user.position;
				this.formData.tel = user.tel;
			}

		},
	}
</script>

<style lang="scss">
	.content {
		height: 100vh;
		padding: 0 $margin-width;

		.user_wrap {
			display: flex;
			margin: $margin-width 0;
			align-items: center;

			.user_title {
				flex: 1;
				text-align: center;
				font-size: $small-font-size;
			}

			.input {
				flex: 3;
				font-size: $small-font-size;
				border: 2rpx solid #dddddd;
				border-radius: 10rpx;
				padding: 6rpx 10rpx;
			}
		}
	}
</style>
