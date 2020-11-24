<template>
	<view class="news_wrap">
		<image :src="getImgSrc(news_item.news_Img)" class="news_img" mode="aspectFill"></image>
		<view class="news_title">{{news_item.news_Title}}</view>
		<view class="news_tag">
			<view class="news_dt">{{news_item.news_DT}}</view>
			<view class="news_type">{{news_item.news_Type}}</view>
		</view>
		<view class="news_content">
			<jyf-parser :html="news_item.news_Content" show-with-animation selectable lazy-load>加载中...</jyf-parser>
		</view>
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
				news_item: {}
			};
		},

		onLoad(params) {
			console.log(params)
			this.getNewsItem(params.news_ID)
		},

		methods: {
			async getNewsItem(news_ID) {
				const res = await this.$myRequest({
					url: "/Api/Get_App_News_Detail?id=" + news_ID,
				})
				this.news_item = res.data.data;
			}
		}

	}
</script>

<style lang="scss">
	.news_wrap {

		.news_img {
			width: 100%;
			height: 300rpx;
		}

		.news_title {
			padding: 10rpx $margin-width;
			font-size: $large-font-size;
			font-weight: bold;
			letter-spacing: 4rpx;
		}

		.news_tag {
			padding: 6rpx $margin-width;
			display: flex;
			justify-content: space-between;
			font-size: $small-font-size;
			color: #666666;

			.news_dt {}

			.news_type {}
		}

		.news_content {
			padding: 6rpx $margin-width;
		}
	}
</style>
