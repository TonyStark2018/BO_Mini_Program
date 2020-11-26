<template>
	<view style="height:100vh;">
		<view class="myNavBar">
			<view v-for="(item,index) in nav_bar" :class="['nav_title',current===index?'text_active':'']" :key="index" @click="setCurrent(index)">
				<text>{{item}}</text>
			</view>
		</view>

		<swiper class="myswiper" :current="current" :indicator-dots="false" :autoplay="false" :duration="500"
		 @animationfinish="swiperCurrent($event)">
			<swiper-item class="swiper-item">
				<first></first>
			</swiper-item>
			<swiper-item class="swiper-item">
				<second></second>
			</swiper-item>
			<swiper-item class="swiper-item">
				<third></third>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import serviceFirst from "../../components/service-item/service-first.vue"
	import serviceSecond from "../../components/service-item/service-second.vue"
	import serviceThird from "../../components/service-item/service-third.vue"

	export default {
		components: {
			first: serviceFirst,
			second: serviceSecond,
			third: serviceThird,
		},
		data() {
			return {
				nav_bar: ["走进宝欧", "行业分类", "检测系统"],
				current: 0
			};
		},
		methods: {
			setCurrent(current_index) {
				this.current = current_index;
			},
			swiperCurrent(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	.myNavBar {
		display: flex;
		justify-content: space-around;
		background-color: white;
		border-bottom: 2rpx solid #eaeaea;
		padding: 15rpx 0;
		position: sticky;
		top: 0px;
		z-index: 10;

		.nav_title {
			font-size: $def-font-size;
			color: #666;

		}

		.text_active {
			border-bottom: 4rpx solid $theme-blue;
			padding-bottom: 4rpx;
			color: $theme-blue;
		}
	}
	
	.myswiper {
		height: 100%;
		
		.swiper-item {
			height: 100%;
			
		}
	}
</style>
