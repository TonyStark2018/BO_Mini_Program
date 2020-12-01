<template>
	<view>
		<view class="user_wrap">
			<view class="user_img">
				<image :src="user.avatarUrl" mode="widthFix"></image>
			</view>
			<view class="user_info">
				<view class="user_name">{{user.real_Name}}</view>
				<view class="user_pos">{{user.position}}</view>
				<view class="user_com">{{user.company_Name}}</view>
			</view>


			<view class="person_info">
				<text class="iconfont icon-edit"></text>
				<navigator url="personal/personal" style="display: inline;">修改资料</navigator>
			</view>
		</view>

		<view class="mod_list" v-if="user.user_Identity=='运营经理'">
			<view class="mod_item" v-for="item in inner_list" :key="item.name" @click="jumpToItemPage(item.url,user.uid)">
				<view class="mod_name">{{item.name}}</view>
				<view class="mod_tip" v-if="!item.count==0"></view>
				<view class="mod_icon">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
		</view>
		<view class="mod_list" v-else>
			<view class="mod_item" v-for="item in outer_list" :key="item.name">
				<view class="mod_name">{{item.name}}</view>
				<view class="mod_icon">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
		</view>


		<view>
			<button type="default" class="out_btn" @click="login_out">退出登录</button>
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
				inner_list: [{
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
					url: "verify/verify",
					count: 0,
				}, {
					name: "用户报修",
					url: ""
				}],
				outer_list: [{
					name: "备件商城",
					url: ""
				}, {
					name: "我的报修",
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
		onShow() {
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
				this.user = res.data.data;
				
				let index = this.inner_list.map(item => item.name).indexOf("用户验证");
				if (this.user.verify_Count !== 0) {
					this.inner_list[index].count = this.user.verify_Count;
				}else{
					this.inner_list[index].count = 0;
				}

			},
			jumpToItemPage(url, uid) {
				if (url !== '') {
					uni.navigateTo({
						url: url + "?uid=" + uid
					})
				}
			},
			login_out() {
				uni.clearStorageSync("openid")
				uni.clearStorageSync("session_key")
				uni.redirectTo({
					url: "../authorization/authorization"
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
			flex: 2;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			padding: 0 16rpx;
			font-size: $small-font-size;
			color: #013a80;
		}

		.person_info {
			flex: 1;
			text-align: right;
			font-size: $small-font-size;
			padding-top: 18rpx;

			.person_info_text {
				padding-left: 10rpx;
			}
		}
	}


	.mod_list {
		padding: $margin-width;
		font-size: $def-font-size;
		background-color: #FFFFFF;

		.mod_item {
			margin: 30rpx 0;
			padding-bottom: 15rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
			color: #666666;
			border-bottom: 2rpx solid #ededed;

			.mod_name {}

			.mod_tip {
				content: '';
				position: absolute;
				top: 0;
				left: 130rpx;
				height: 16rpx;
				width: 16rpx;
				background: #e6192e;
				border-radius: 50%;
			}
		}
	}

	.out_btn {
		margin: 0 $margin-width;
		font-size: $def-font-size;
		color: #666666;
	}
</style>
