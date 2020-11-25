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

		<view class="doc_body" v-for="item in doc_item.main_List" :key="item.maid">
			<!-- 存疑 -->
			<view class="doc_info">
				<text>{{item.create_dt}}</text>
				<text>【{{item.doc_type}}】</text>
				<text>{{item.doc_sn}}</text>
			</view>

			<view class="doc_title">服务单号</view>
			<view class="doc_detail">{{item.doc_no}}</view>

			<view class="doc_title">故障描述</view>
			<view class="doc_detail">{{item.doc_des}}</view>

			<view class="doc_title">附带设备</view>
			<view class="doc_detail">{{item.doc_attach}}</view>

			<view class="doc_title">修复前图</view>
			<view class="doc_detail">
				<image :src="getImgSrc(item.rep_before)" mode="aspectFill"></image>
			</view>

			<view class="doc_title">修复后图</view>
			<view class="doc_detail">
				<image :src="getImgSrc(item.rep_after)" mode="aspectFill"></image>
			</view>

			<view class="doc_title">发运日期</view>
			<view class="doc_detail">
				<text>{{item.doc_deliver_dt}}</text>
				<text>&nbsp;{{item.doc_deliver_remark}}</text>
			</view>

			<!-- <view class="doc_title">验收日期</view>
			<view class="doc_detail">
				<text>{{item.doc_recept_dt}}</text>
				<text>&nbsp;{{item.doc_recept_person}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				doc_item: {},
				main_list: [],
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
				this.main_List = this.doc_item.main_List
				console.log(res);
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
