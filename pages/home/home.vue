<template>
	<view>
		<!-- 用户资料 -->
		<view class="user_wrap">
			<view class="user_img">
				<image :src="user.app_User_Img" mode="widthFix"></image>
			</view>
			<view class="user_info">
				<view class="user_name">{{user.app_User_Name}}</view>
				<view class="user_pos">{{user.app_User_Postion}}</view>
				<view class="user_com">{{user.app_User_Company}}</view>
			</view>

			<view v-if="user.app_User_Status=='已开通'">
				<text class="iconfont icon-kaitong"></text>
				<text class="user_status_active">{{user.app_User_Status}}</text>
			</view>

			<view v-else>
				<text class="iconfont icon-weikaitong"></text>
				<text class="user_status_active_not">{{user.app_User_Status}}</text>
			</view>

		</view>
		<!-- 用户资料 -->

		<!-- 备件档案、在修备件、等待验收 -->
		<view class="module">
			<view class="module_wrap" v-for="item in module_List" :key='item.module_name' @click="checkUserInfo(item.module_url)">
				<view :class="item.module_font"></view>
				<text class="module_text">{{item.module_name}}</text>
			</view>
		</view>
		<!-- 备件档案、在修备件、等待验收 -->

		<!-- 资讯交流 -->
		<view class="news_list">
			<view class="news_headline">资讯交流</view>
			<view class="news_info" v-for="item in user.app_News_List" :key='item.news_ID' @click="jumpToNews(item.news_ID)">
				<image class="news_img" :src="getImgSrc(item.news_Img)" mode="aspectFill"></image>
				<view class="news_content">
					<view class="news_title">{{item.news_Title}}</view>
					<view class="news_other">
						<view class="news_dt">{{item.news_DT}}</view>
						<view class="news_type">{{item.news_Type}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 资讯交流 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				module_List: [{
					module_name: '备件档案',
					module_font: "iconfont icon-danganguanli",
					module_url: "document/document",
				}, {
					module_name: '在修备件',
					module_font: "iconfont icon-weixiu",
					module_url: "maintain/maintain",
				}, {
					module_name: '等待验收',
					module_font: "iconfont icon-yanshou",
					module_url: "acceptance/acceptance",
				}],

				openid: '',
				user: {},
				// flag: false,
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
					url: "/Api/Get_App_Home",
					data: {
						OpenID: this.openid,
						pageIndex: 1,
					}
				})
				let user = res.data.data;
				this.user = user;
				console.log(res)
			},

			checkUserInfo(module_url) {
				if (this.user.app_User_Status == "待开通") {
					uni.showToast({
						title: "身份核实后，功能开放",
						icon: "none",
						mask: "true",
						duration: 3000
					})
				} else {
					uni.navigateTo({
						url: module_url + "?link_UID=" + this.user.app_User_ID,
					})
				}
			},

			jumpToNews(news_ID) {
				uni.navigateTo({
					url: "news_item/news_item?news_ID=" + news_ID,
				})
			}

		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getUserInfo()

		}
	}
</script>

<style lang="scss">
	// 用户信息
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

		.icon-kaitong,
		 {
			flex: 1;
			font-size: $def-font-size;
			color: $theme-green;
			padding-right:10rpx;
		}
		
		.user_status_active{
			// color: $theme-green;
		}
		
		.icon-weikaitong{
			flex: 1;
			font-size: $def-font-size;
			color: $theme-gray;
			padding-right:10rpx;
		}
		
		.user_status_active_not{
			// color: $theme-gray;
		}
	}

	//模块分类
	.module {
		display: flex;
		justify-content: space-evenly;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #e0e5e9;

		.module_wrap {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.icon-danganguanli,
			.icon-weixiu,
			.icon-yanshou {
				font-size: 70rpx;
				color: $theme-blue;
				border-radius: 50%;
				border: 4rpx solid #c7d7e2;
				padding: 20rpx;
			}

			.module_text {
				font-size: 30rpx;
				color: #808080;
			}
		}
	}

	// 咨询交流
	.news_list {
		padding: 0 $margin-width;

		.news_headline {
			font-weight: bold;
			font-size: $large-font-size;
			margin: 20rpx 0;
		}

		.news_info {
			display: flex;
			margin-bottom: $margin-width;

			.news_img {
				flex: 1;
				border-radius: 10rpx;
				width: 100%;
				height: 160rpx;
			}

			.news_content {
				flex: 2;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.news_title {
					font-family: Microsoft JhengHei;
					font-size: $def-font-size;
					font-weight: 600;

					overflow: hidden;
					word-break: break-all;
					/* break-all(允许在单词内换行。) */
					text-overflow: ellipsis;
					/* 超出部分省略号 */
					display: -webkit-box;
					/** 对象作为伸缩盒子模型显示 **/
					-webkit-box-orient: vertical;
					/** 设置或检索伸缩盒对象的子元素的排列方式 **/
					-webkit-line-clamp: 2;
					/** 显示的行数 **/
				}

				.news_other {
					display: flex;
					font-size: $small-font-size;
					color: #808080;

					.news_dt {
						flex: 1;
					}

					.news_type {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: flex-end;
					}
				}
			}
		}

	}

	.reach_Bottom {
		margin: $margin-width;
		font-size: $small-font-size;
		text-align: center;
		color: #8390a3;
	}
</style>
