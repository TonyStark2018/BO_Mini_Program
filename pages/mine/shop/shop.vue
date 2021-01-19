<template>
	<view>
		<uni-search-bar :radius="5" placeholder="备件名称/规格型号/品牌" @confirm="searchShopList($event)" @cancel="cancelSearch($event)"></uni-search-bar>
		
		<view class="shop_wrap">
			<view class="shop_item" v-for="item in shopList" :key='item.id'>
				<view class="shop_type">{{item.type}}</view>
				<view class="shop_img">
					<image :src="getImgSrc(item.img)" mode="aspectFill"></image>
				</view>
				<view class="shop_info">
					<text class="shop_info_brand">{{item.brand}}</text>
					<text>{{item.name}}</text> 
					</br>
					<text class="shop_info_model">{{item.model}}</text>
				</view>
				<view class="shop_stock_count">
					<text>库存：</text>
					<text>{{item.stock}}</text>
				</view>
				<view class="shop_sale_price">￥{{item.price}}</view>
			</view>
		</view>
		
		<view class="reach_Bottom" v-if="flag">------ 已加载全部数据 ------</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				shopList: [],
				pageindex: 1,
				keyword: '',
				total_count: 0,
				flag: false
			};
		},
		onLoad() {
			this.getShopList();
		},
		methods:{
			//获取页面数据
			async getShopList() {
				this.keyword = '';
				const res = await this.$myRequest({
					url: "/Api/Get_App_Doc_Shop",
					data: {
						keyword: this.keyword,
						pageindex: 1,
					}
				})
				this.shopList = res.data.data;
				this.total_count = this.shopList.length;
			},
			
			async getMoreList(pageindex) {
				const res = await this.$myRequest({
					url: "/Api/Get_App_Doc_Shop",
					data: {
						pageindex: pageindex,
					}
				})
				let list = res.data.data;
				this.shopList = [...this.shopList, ...list];
				this.total_count = this.shopList.length;
			
				if (this.total_count < 10 * pageindex) {
					this.flag = true;
				}
			},
			
			// 上拉加载更多
			onReachBottom() {
				if (this.flag == false) {
					this.pageindex += 1;
					this.getMoreList(this.pageindex);
					console.log(this.pageindex)
				}
			},
			
			// 搜索功能
			async searchShopList(event) {
				this.pageindex = 1;
				this.keyword = event.value;
				const res = await this.$myRequest({
					url: "/Api/Get_App_Doc_Shop",
					data: {
						keyword: this.keyword,
						pageindex: this.pageindex,
					}
				})
				this.shopList = res.data.data;
				this.total_count = this.shopList.length;
			
				if (this.total_count < 10 * this.pageindex) {
					this.flag = true;
				}
			},
			
			// 取消搜索
			async cancelSearch() {
				this.getShopList();
			},
		}
	}
</script>

<style lang="scss">
	page{
		
		.shop_wrap{
			display: flex;
			flex-wrap: wrap;
			padding: 0 10rpx;
			
			.shop_item{
				width: 42%;
				padding: 15rpx;
				background: #FFFFFF;
				border: 2rpx solid #ccc;
				border-radius: 10rpx;
				margin-bottom: 15rpx;
				margin-left: 10rpx;
				margin-right: 10rpx;
				box-shadow: 0 3rpx 6rpx 8rpx #EEEEEE;
				
				.shop_type{
					color: red;
					font-size: $small-more-font-size;
					line-height: 50rpx;
				}
				.shop_img{
					width: 100%;
					
					
					image{
						height: 200rpx;
						width: 100%;
					}
				}
				.shop_info{
					color:$theme-dark-gray;
					font-size: $small-more-font-size;
					
					.shop_info_brand{
						margin-right: 10rpx;
					}
					
					.shop_info_model{
						overflow: hidden;
						word-break: break-all;
						/* break-all(允许在单词内换行。) */
						text-overflow: ellipsis;
						/* 超出部分省略号 */
						display: -webkit-box;
						/** 对象作为伸缩盒子模型显示 **/
						-webkit-box-orient: vertical;
						/** 设置或检索伸缩盒对象的子元素的排列方式 **/
						-webkit-line-clamp: 1;
						/** 显示的行数 **/
					}
				}
				
				.shop_stock_count{
					color:$theme-gray;
					font-size: $small-more-font-size;
					line-height: 50rpx;
				}
				
				.shop_sale_price{
					color: red;
					font-size: $small-font-size;
					line-height: 40rpx;
				}
			}
		}
		
		
		.reach_Bottom{
			margin: $margin-width;
			font-size: $small-font-size;
			text-align: center;
			color: #8390a3;
		}
	}
</style>
