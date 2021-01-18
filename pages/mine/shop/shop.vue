<template>
	<view>
		<uni-search-bar :radius="5" placeholder="备件名称/规格型号/品牌" @confirm="searchDocList($event)" @cancel="cancelSearch($event)"></uni-search-bar>
		
		<view class="shop_wrap">
			<view class="shop_item" v-for="item in testList" :key='item.id'>
				<view class="shop_type">{{item.type}}</view>
				<view class="shop_img">
					<image :src="item.img" mode="aspectFill"></image>
				</view>
				<view class="shop_info">
					<text class="shop_info_brand">{{item.brand}}</text>
					<text>{{item.name}}</text> 
					</br>
					<text class="shop_info_model">{{item.model_No}}</text>
				</view>
				<view class="shop_stock_count">
					<text>库存：</text>
					<text>{{item.stock_Count}}</text>
				</view>
				<view class="shop_sale_price">￥{{item.sale_Price}}</view>
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
				showList: [],
				pageindex: 1,
				keyword: '',
				total_count: 0,
				flag: false,
				testList:[
					{
						id:1,
						img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg011.hc360.cn%2Fm4%2FM01%2F8F%2F95%2FwKhQ6VSSLiaEdPvoAAAAAEFI_1w533.jpg&refer=http%3A%2F%2Fimg011.hc360.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613528848&t=5837f42af6a2bcea986ea832c4775024',
						type:"全新",
						name:"驱动",
						brand:"西门子",
						model_No:"7SN1213-1AA00-0DA2",
						stock_Count:300,
						sale_Price:3256.85,
					},{
						id:2,
						img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg011.hc360.cn%2Fm4%2FM01%2F8F%2F95%2FwKhQ6VSSLiaEdPvoAAAAAEFI_1w533.jpg&refer=http%3A%2F%2Fimg011.hc360.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613528848&t=5837f42af6a2bcea986ea832c4775024',
						name:"驱动",
						type:"全新",
						brand:"西门子",
						model_No:"7SN1213-1AA00-0DA2",
						stock_Count:300,
						sale_Price:3256.85,
					},{
						id:3,
						img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg011.hc360.cn%2Fm4%2FM01%2F8F%2F95%2FwKhQ6VSSLiaEdPvoAAAAAEFI_1w533.jpg&refer=http%3A%2F%2Fimg011.hc360.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613528848&t=5837f42af6a2bcea986ea832c4775024',
						name:"驱动",
						type:"全新",
						brand:"西门子",
						model_No:"7SN1213-1AA00-0DA2",
						stock_Count:300,
						sale_Price:3256.85,
					}
				]
			};
		},
		onLoad() {
			// this.getShowList();
		},
		methods:{
			//获取页面数据
			async getShowList() {
				this.keyword = '';
				const res = await this.$myRequest({
					url: "/Api/Get_App_Shop_List",
					data: {
						keyword: this.keyword,
						pageindex: 1,
					}
				})
				this.showList = res.data.data;
				this.total_count = this.showList.length;
			},
			
			async getMoreList(pageindex) {
				const res = await this.$myRequest({
					url: "/Api/Get_App_Shop_List",
					data: {
						pageindex: pageindex,
					}
				})
				let list = res.data.data;
				this.showList = [...this.showList, ...list];
				this.total_count = this.showList.length;
			
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
					url: "/Api/Get_App_Shop_List",
					data: {
						keyword: this.keyword,
						pageindex: this.pageindex,
					}
				})
				this.showList = res.data.data;
				this.total_count = this.showList.length;
			
				if (this.total_count < 10 * this.pageindex) {
					this.flag = true;
				}
			},
			
			// 取消搜索
			async cancelSearch() {
				this.getShowList();
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
			
		}
	}
</style>
