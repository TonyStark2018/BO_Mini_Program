<template>
	<view>
		<view class="doc_head">
			<image class="doc_img" :src="doc_item.doc_img" mode="aspectFill"></image>
			<view class="doc_content">
				<view class="doc_name">{{doc_item.doc_name}}</view>
				<view class="doc_brand">{{doc_item.doc_brand}}</view>
				<view class="doc_model">{{doc_item.doc_model}}</view>
			</view>
		</view>

		<view class="doc_body">
			<!-- 存疑 -->
			<view class="doc_info">
				<text>{{doc_item.create_dt}}</text>
				<text>【{{doc_item.doc_type}}】</text>
				<text>{{doc_item.doc_sn}}</text>
			</view>

			<view class="doc_title">服务单号</view>
			<view class="doc_detail">{{doc_item.doc_no}}</view>

			<view class="doc_title">故障描述</view>
			<view class="doc_detail">{{doc_item.doc_des}}</view>

			<view class="doc_title">附带设备</view>
			<view class="doc_detail">{{doc_item.doc_attach}}</view>

			<view class="doc_title">要求交期</view>
			<view class="doc_detail">{{doc_item.doc_delivery_time}}</view>

			<view class="doc_title">预计交期</view>
			<view class="doc_detail">{{doc_item.doc_plan_time}}</view>

			<view class="doc_title">当前状态</view>
			<view class="doc_detail">{{doc_item.doc_status}}</view>

			<view class="doc_title">进展情况</view>
			<view class="doc_detail">{{doc_item.doc_progress_status}}</view>

			<view class="doc_title">收件图片</view>
			<view class="doc_detail">
				<image :src="doc_item.doc_receive_img01" mode="aspectFill"></image>
			</view>
			<view class="doc_detail">
				<image :src="doc_item.doc_receive_img02" mode="aspectFill"></image>
			</view>
			<view class="doc_detail">
				<image :src="doc_item.doc_receive_img03" mode="aspectFill"></image>
			</view>
			<view class="doc_detail">
				<image :src="doc_item.doc_receive_img04" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				doc_item: {}
			};
		},
		onLoad() {
			this.get_doc_item()
		},
		methods: {
			async get_doc_item() {
				uni.showLoading({
					title: "Loading..."
				})
				const res = await this.$myRequest({
					url: "doc/item"
				})
				this.doc_item = res.data;
				uni.hideLoading()
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
