<template>
	<view class="cg_container">
		<view class="verify_list">
			<view class="verify_item" v-for="item in verifty_list" :key='item.uid'>
				<image class="verify_img" :src="item.avatarUrl" mode="widthFix"></image>
				<view class="verify_content">
					<view>
						<text class="verifty_name">{{item.real_Name}}</text>
						<text class="verifty_identity">（{{item.user_Identity}}）</text>
					</view>
					<view class="verifty_pos">{{item.position}}</view>
					<view class="verifty_com">{{item.company_Name}}</view>
				</view>

				<view class="verifty_btn">
					<button size="mini" type="default" @click="showModal(item.uid)">开通</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				verifty_list: []
			};
		},
		onLoad(params) {
			this.uid = params.uid;
			this.getVeriftyList(params.uid);
		},
		methods: {
			async getVeriftyList(uid) {
				const res = await this.$myRequest({
					url: "/Api/Get_App_User_Wait_Aud?uid=" + uid,
				})
				this.verifty_list = res.data.data;
				console.log(this.verifty_list);
			},

			showModal(uid) {
				uni.showModal({
					title: "确认通过？",
					icon: "none",
					mask: true,
					success: (res) => {
						if (res.confirm) {
							this.veriftyPass(uid);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			async veriftyPass(uid) {
				const res = await this.$myRequest({
					url: "/Api/App_User_Pass?UID=" + uid,
					method: 'POST'
				})

				if (res.data.error_Msg == '') {
					this.verifty_list = this.verifty_list.filter(v => v.uid != uid)
				}
			}
		},
		onPullDownRefresh() {
			this.getVeriftyList(this.uid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		}
	}
</script>

<style lang="scss">
	.verify_list {
		padding: $margin-width;

		.verify_item {
			display: flex;
			border-bottom: 2rpx solid $theme-light-gray;
			padding-bottom: 10rpx;
			margin-bottom: 20rpx;

			.verify_img {
				flex: 1;
				height: 120rpx;
				width: 120rpx;
				border-radius: 15rpx;
			}

			.verify_content {
				flex: 3;
				font-size: $small-font-size;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 15rpx;

				.verifty_name {
					font-weight: bold;
					font-size: $def-font-size;
				}

				.verifty_identity {
					color: $theme-gray;
				}

				.verifty_pos {}

				.verifty_com {}
			}

			.verifty_btn {
				flex: 1;
				text-align: right;
				align-self: center;
			}
		}

	}
</style>
