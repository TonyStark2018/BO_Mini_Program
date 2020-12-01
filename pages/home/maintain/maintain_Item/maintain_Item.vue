<template>
	<view>
		<view class="doc_head">
			<image class="doc_img" :src="getImgSrc(main_item.doc_Img)" mode="aspectFill"></image>
			<view class="doc_content">
				<view class="doc_name">{{main_item.doc_Name}}</view>
				<view class="doc_brand">{{main_item.doc_Brand}}</view>
				<view class="doc_model">{{main_item.doc_Model}}</view>
			</view>
		</view>

		<view class="doc_body">
			<view class="doc_title">录单日期</view>
			<view class="doc_detail">{{main_item.create_dt}}</view>

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

			<view class="doc_title">要求交期</view>
			<view class="doc_detail">{{main_item.doc_deliver_dt}}</view>

			<view class="doc_title">预计交期</view>
			<view class="doc_detail">{{main_item.doc_delivery_time}}</view>

			<view class="doc_title">当前状态</view>
			<view class="doc_detail">{{main_item.doc_status}}</view>

			<view class="doc_title">进展情况</view>
			<view class="doc_detail">{{main_item.doc_progress_status}}</view>

			<view class="doc_title">收件图片</view>
			<view class="doc_detail">
				<swiper class="doc_swiper" :indicator-dots="true" indicator-color="#666" indicator-active-color="#fff" :autoplay="true"
				 :interval="3000" :duration="1000">
					<swiper-item class="swiper-item">
						<image :src="getImgSrc(main_item.doc_receive_img01)" @tap='_previewImage(main_item.doc_receive_img01)' mode="aspectFill"
						 style="width: 100%;"></image>
					</swiper-item>

					<swiper-item class="swiper-item">
						<image :src="getImgSrc(main_item.doc_receive_img02)" @tap='_previewImage(main_item.doc_receive_img02)' mode="aspectFill"
						 style="width: 100%;"></image>
					</swiper-item>

					<swiper-item class="swiper-item">
						<image :src="getImgSrc(main_item.doc_receive_img03)" @tap='_previewImage(main_item.doc_receive_img03)' mode="aspectFill"
						 style="width: 100%;"></image>
					</swiper-item>

					<swiper-item class="swiper-item">
						<image :src="getImgSrc(main_item.doc_receive_img04)" @tap='_previewImage(main_item.doc_receive_img04)' mode="aspectFill"
						 style="width: 100%;"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				main_item: {}
			};
		},
		onLoad(params) {
			this.getMainInfo(params.maid)
		},
		methods: {
			async getMainInfo(maid) {
				const res = await this.$myRequest({
					url: "/Api/Get_App_Main_Info?maid=" + maid,
				})
				this.main_item = res.data.data;
				console.log(this.main_item)
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
			flex: 2;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 160rpx;
			font-size: $small-font-size;
			padding-left: $margin-width;

			.doc_name {
				font-size: $large-font-size;
				font-weight: bold;
				color: #000b27;
			}

			.doc_brand,
			.doc_model {}
		}

		.doc_img {
			flex: 1;
			width: 100%;
			height: 160rpx;
			border-radius: 10rpx;
		}
	}

	.doc_body {
		padding: 8rpx $margin-width;

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
</style>
