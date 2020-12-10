<template>
	<view>
		<view class="doc_head">
			<view class="doc_img">
				<image :src="getImgSrc(doc_item.doc_Img)" mode="aspectFill"></image>
			</view>
			<view class="doc_content">
				<view class="doc_name">{{doc_item.doc_Name}}</view>
				<view class="doc_brand">{{doc_item.doc_Brand}}</view>
				<view class="doc_model">{{doc_item.doc_Model}}</view>
				<view>维修频次：{{doc_item.doc_Repaire_Count}} 次</view>
			</view>
		</view>

		<view class="nav_bar">
			<view class="nav_bar_left" :style="{height:navHeight}">
				<scroll-view class="nav_bar_left_scroll" scroll-y>
					<view :class="main_index===index?'nav_bar_left_item .nav_bar_left_item_active':'nav_bar_left_item'" v-for="(item,index) in doc_item.main_List"
					 :key="item.maid" @click="changeRightContent(index)">
						{{item.create_dt}}
					</view>
				</scroll-view>
			</view>
			<view class="nav_bar_right":style="{height:navHeight}">
				<scroll-view class="nav_bar_scroll" scroll-y :scroll-top="scrollTop" @scroll="scroll">
					<view class="doc_body">
						<view class="doc_title">服务单号</view>
						<view class="doc_detail">{{main_item.doc_no}}</view>

						<view class="doc_title">服务类型</view>
						<view class="doc_detail">{{main_item.doc_type}}</view>

						<view class="doc_title">SN编号</view>
						<view class="doc_detail">{{main_item.doc_sn}}</view>

						<view class="doc_title">故障描述</view>
						<view class="doc_detail">{{main_item.doc_des}}</view>

						<view class="doc_title">附带设备</view>
						<view class="doc_detail">{{main_item.doc_attach}}</view>

						<view class="doc_title">修复前后图</view>
						<view class="doc_detail">
							<swiper class="doc_swiper" :indicator-dots="true" indicator-color="#666" indicator-active-color="#fff" :autoplay="true"
							 :interval="3000" :duration="1000">
								<swiper-item class="swiper-item">
									<image :src="getImgSrc(main_item.rep_before)" @tap='_previewImage(main_item.rep_before)' mode="aspectFill"
									 style="width: 100%;"></image>
								</swiper-item>

								<swiper-item class="swiper-item">
									<image :src="getImgSrc(main_item.rep_after)" @tap='_previewImage(main_item.rep_after)' mode="aspectFill" style="width: 100%;"></image>
								</swiper-item>
							</swiper>
						</view>

						<view class="doc_title">发运日期</view>
						<view class="doc_detail">
							<text>{{main_item.doc_deliver_dt}}</text>
							<text>&nbsp;{{main_item.doc_deliver_remark}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				doc_item: {},
				main_item: {},
				main_index: 0,
				scrollTop: 0,
				oldScrollTop: 0,
				
				pH: 0, //窗口高度
				navHeight: 0, //元素的所需高度

				uid: '',
				doc_id: '',
				rep_count: 0,
			};
		},
		onReady(){
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
					that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".doc_head"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => {
						// console.log(data)
						let pH = that._data.pH;
						that._data.navHeight = (pH - data.height) * 2 + 'rpx' //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
		},
		onLoad(params) {
			this.doc_id = params.doc_ID;
			this.uid = params.uid;
			this.getDocItem(params.doc_ID, params.uid);
		},
		methods: {
			async getDocItem(doc_id, uid) {
				const res = await this.$myRequest({
					url: "/Api/Get_App_Doc_Info",
					data: {
						Doc_ID: doc_id,
						UID: uid,
					}
				})
				this.doc_item = res.data.data;
				this.main_item = this.doc_item.main_List[this.main_index];
				console.log(this.main_item)
			},

			changeRightContent(index) {
				this.main_item = this.doc_item.main_List[index];
				this.main_index = index;
				this.backTop()
			},
			scroll(e) {
				//记录scroll  位置
				this.oldScrollTop = e.detail.scrollTop
			},
			backTop() {
				//视图会发生重新渲染
				this.scrollTop = this.oldScrollTop
				//当视图渲染结束 重新设置为0
				this.$nextTick(() => {
					this.scrollTop = 0
				});
			}
		}
	}
</script>

<style lang="scss">
	.doc_head {
		padding: 8rpx $margin-width;
		display: flex;
		border-bottom: 8rpx solid #f2f8fe;


		.doc_img {
			flex: 1;
			border: 2rpx solid $theme-light-gray;
			text-align: center;

			image {
				width: 100%;
				height: 160rpx;
				border-radius: 10rpx;
			}
		}

		.doc_content {
			flex: 3;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 160rpx;
			padding-left: 20rpx;
			font-size: $small-font-size;

			.doc_name {
				font-size: $large-font-size;
				font-weight: bold;
				color: #000b27;
			}

			.doc_brand,
			.doc_model {}
		}
	}

	.nav_bar {
		display: flex;


		.nav_bar_left {
			flex: 1;
			border-right: 4rpx solid #f2f8fe;

			.nav_bar_left_scroll {
				height: 100%;

				.nav_bar_left_item {
					font-size: $small-font-size;
					line-height: 60rpx;
					text-align: center;
				}

				.nav_bar_left_item_active {
					background-color: $theme-light-gray;
				}
			}
		}

		.nav_bar_right {
			flex: 3;

			.nav_bar_scroll {
				height: 100%;

				.doc_body {
					padding: 8rpx $margin-width/2;

					.doc_info {
						color: $theme-blue;
						font-size: $small-font-size;
						margin-bottom: 20rpx;
					}

					.doc_title {
						font-size: $def-font-size;
						font-weight: bold;
						color: #040810;
						margin-bottom: 10rpx;
						letter-spacing: 2rpx;
					}

					.doc_detail {
						font-size: $small-font-size;
						margin-bottom: 40rpx;

						image {
							width: 100%;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
