<template>
	<view>
		<view class="doc_head">
			<view class="doc_content">
				<view class="doc_name">{{doc_item.doc_Name}}</view>
				<view class="doc_brand">{{doc_item.doc_Brand}}</view>
				<view class="doc_model">{{doc_item.doc_Model}}</view>
			</view>
			<view class="rep_count">{{doc_item.doc_Repaire_Count}} 次</view>
		</view>

		<view class="nav_bar">
			<view class="nav_bar_left">
				<view class="nav_bar_left_item" v-for="(item,index) in doc_item.main_List" :key="item.maid" @click="changeRightContent(index)">
					{{item.create_dt}}
				</view>
			</view>
			<view class="nav_bar_right">
				<scroll-view class="nav_bar_scroll" scroll-y :scroll-top="scrollTop" @scroll="scroll">
					<view class="doc_body">
						<!-- 存疑 -->
						<view class="doc_info">
							<text>【{{main_item.doc_type}}】</text>
							<text>{{main_item.doc_sn}}</text>
						</view>

						<view class="doc_title">服务单号</view>
						<view class="doc_detail">{{main_item.doc_no}}</view>

						<view class="doc_title">故障描述</view>
						<view class="doc_detail">{{main_item.doc_des}}</view>

						<view class="doc_title">附带设备</view>
						<view class="doc_detail">{{main_item.doc_attach}}</view>

						<view class="doc_title">修复前图</view>
						<view class="doc_detail">
							<image :src="getImgSrc(main_item.rep_before)" mode="aspectFill"></image>
						</view>

						<view class="doc_title">修复后图</view>
						<view class="doc_detail">
							<image :src="getImgSrc(main_item.rep_after)" mode="aspectFill"></image>
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
				uid: '',
				doc_id: '',
				rep_count: 0,
			};
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
				this.goTop()
			},
			scroll(e) {
				//记录scroll  位置
				this.oldScrollTop = e.detail.scrollTop
			},
			goTop() {
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

		.doc_content {
			flex: 5;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 160rpx;
			font-size: $small-font-size;

			.doc_name {
				font-size: $large-font-size;
				font-weight: bold;
				color: #000b27;
			}

			.doc_brand,
			.doc_model {}
		}

		.rep_count {
			flex: 1;
			display: flex;
			align-items: flex-end;
			justify-items: flex-start;
			padding-bottom: 4rpx;
			// border-bottom: 2rpx solid #ced7de;
			font-size: $small-font-size;
			color: #717171;
		}
	}

	.nav_bar {
		display: flex;


		.nav_bar_left {
			flex: 1;
			border-right: 2rpx solid #ccc;


			.nav_bar_left_item {
				font-size: $small-font-size;
				line-height: 60rpx;
				text-align: center;
			}

		}

		.nav_bar_right {
			flex: 3;

			.nav_bar_scroll {

				height: 85vh;

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
