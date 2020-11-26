<template>
	<view class="com_content">
		<scroll-view class="com-scroll-view" scroll-y>
			<swiper :indicator-dots="true" indicator-color="#666" indicator-active-color="#fff" :autoplay="true" :interval="3000"
			 :duration="1000">
				<swiper-item class="swiper-item" v-for="(item,index) in com_info.com_Img_List" :key="index">
					<image :src="getImgSrc(item)" mode="widthFix" style="width: 100%;"></image>
				</swiper-item>
			</swiper>

			<view class="com_info">
				<jyf-parser :html="com_info.com_Info" show-with-animation selectable lazy-load>加载中...</jyf-parser>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				com_info: {}
			};
		},
		mounted() {
			this.getComInfo();
		},
		methods: {
			async getComInfo() {
				const res = await this.$myRequest({
					url: "/Api/Get_App_Com_Info",
				})
				this.com_info = res.data.data;
			}
		}
	}
</script>

<style lang="scss">
	.com_content {
		padding: 0 $margin-width;

		.com-scroll-view {
			height: 100vh;

			.swiper-item {
				border-radius: 10rpx;
			}

			.com_info {
				padding-top: 20rpx;
			}
		}
	}
</style>
