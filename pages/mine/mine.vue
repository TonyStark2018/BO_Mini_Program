<template>
	<view>
		<view class="user_wrap">
			<view class="user_img">
				<image :src="user.avatarUrl" mode="widthFix"></image>
			</view>
			<view class="user_info">
				<view class="user_name">{{user.real_Name}}</view>
				<view class="user_pos">{{user.position}}</view>
			</view>

			<view class="person_info"></view>
			<!-- <view class="person_info">修改资料</view> -->
		</view>

		<view class="mod_list">
			<view class="mod_item" v-for="item in list" :key="item.name">
				<view class="mod_name">{{item.name}}</view>
				<view class="mod_icon">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
		</view>

		<view>
			<button type="default" class="out_btn" @click="login_out">退出登陆</button>
		</view>
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
				list: [{
					name: "备件商城",
					url: ""
				}, {
					name: "在修备件",
					url: ""
				}, {
					name: "等待验收",
					url: ""
				}, {
					name: "应收货款",
					url: ""
				}, {
					name: "用户验证",
					url: ""
				}, {
					name: "用户报修",
					url: ""
				}],
				user: {},
				openid: '',
			};
		},
		onLoad() {
			this.getOpenid();
			this.getUserInfo();
		},
		methods: {
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
				this.user = user;
				console.log(user)
			},
			login_out() {
				uni.clearStorageSync("openid")
				uni.clearStorageSync("session_key")
				uni.redirectTo({
					url:"../authorization/authorization"
				})
			}
		}
	}
</script>


<style lang="scss">
	.user_wrap {
		padding: $margin-width;
		display: flex;
		border-bottom: 2rpx solid #e0e5e9;

		.user_img {
			flex: 1;
		}

		.user_img image {
			height: 100%;
			width: 100%;
			border-radius: 50%;
		}

		.user_info {
			flex: 3;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 0 16rpx;
			font-size: $small-font-size;
			color: #013a80;
		}

		.person_info {
			font-size: $small-font-size;
			position: relative;
			bottom: -90rpx;
		}
	}


	.mod_list {
		padding: $margin-width;
		font-size: $def-font-size;
		background-color: #FFFFFF;

		.mod_item {
			margin: 30rpx 0;
			padding-bottom: 15rpx;
			display: flex;
			justify-content: space-between;
			color: #666666;
			border-bottom: 2rpx solid #ededed;
		}
	}

	.out_btn {
		margin: 0 $margin-width;
		font-size: $def-font-size;
		color: #666666;
	}
</style>

