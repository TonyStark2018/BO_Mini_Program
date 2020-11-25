<template>
	<view>
		<scroll-view class="mysc-view" scroll-y>
			<view class="msd_list">
				<view class="msd_info" v-for="(item,index) in msd_list" :key='index'>
					<image class="msd_img" :src="getImgSrc(item.msD_Img)" @tap='_previewImage(item.msD_Img)' mode="aspectFill"></image>
					<view class="msd_content">
						<view class="msd_name">{{item.msD_Name}}</view>
						<view class="msd_brand">{{item.msD_Sn}}</view>
						<view class="msd_model">{{item.msD_Info}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msd_list: {}
			};
		},
		mounted() {
			this.getPageInfo();
			console.log("mounted...");
		},
		methods: {
			async getPageInfo() {
				const res = await this.$myRequest({
					url: "/Api/Get_App_MSD_List"
				})
				this.msd_list = res.data.data;
				console.log(this.msd_list);
			}
		}
	}
</script>

<style lang="scss">
	.mysc-view {
		height: 100vh;

		.msd_list {
			padding:10rpx $margin-width;

			.msd_info {
				display: flex;
				justify-content: space-between;
				margin-bottom: $margin-width;

				.msd_img {
					flex: 1;
					border-radius: 10rpx;
					border-bottom-right-radius: 0rpx;
					border: 2rpx solid #ced7de;
					width: 100%;
					height: 300rpx;
				}

				.msd_content {
					flex: 2;
					padding-left: 20rpx;
					display: flex;
					flex-direction: column;
					font-size: $small-font-size;

					.msd_name {
						font-size: $def-font-size;
						font-weight: bold;
					}
				}
			}

		}
	}
</style>
