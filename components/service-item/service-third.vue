<template>
	<view>
		<scroll-view class="mysc-view" scroll-y>
			<view class="msd_list">
				<view class="msd_info" v-for="(item,index) in msd_list" :key='index'>
					<image class="msd_img" :src="getImgSrc(item.msD_Img)" @tap='_previewImage(item.msD_Img_Src)' lazy-load mode="aspectFill"></image>
					<view class="msd_content">
						<view class="msd_name">{{item.msD_Name}}</view>
						<view class="msd_brand">{{item.msD_Sn}}</view>
						<view class="msd_info">{{item.msD_Info}}</view>
					</view>
				</view>
			</view>
			<view class="reach_Bottom" v-if="flag">------ 已加载全部数据 ------</view>
		</scroll-view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				msd_list: {},
				pageindex: 1,
				total_count: 0,
				flag: false,
			};
		},
		mounted() {
			this.getPageInfo();
		},
		methods: {
			async getPageInfo() {
				const res = await this.$myRequest({
					url: "/Api/Get_App_MSD_List",
					data:{
						pageindex:1
					}
				})
				this.msd_list = res.data.data;
				this.total_count = this.msd_list.length;
				console.log(this.msd_list)
			},
			
			async getMoreList() {
				const res = await this.$myRequest({
					url: "/Api/Get_App_MSD_List",
					data: {
						pageindex: this.pageindex,
					}
				})
				let list = res.data.data;
				this.msd_list = [...this.msd_list, ...list];
				this.total_count = this.msd_list.length;
			
				if (this.total_count < 10 * this.pageindex) {
					this.flag = true;
				}
			}
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.flag == false) {
				this.pageindex += 1;
				this.getMoreList();
			}
		},
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
						color: $theme-blue;
						min-height: 60rpx;
					}
					
					.msd_info {
						height: 100%;
						color: #666;
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
	}
</style>
