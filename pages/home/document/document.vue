<template>
	<view class="document">
		<!-- 自定义Placeholder -->
		<uni-search-bar :radius="5" placeholder="备件品牌或名称" @confirm="search"></uni-search-bar>

		<view class="doc_list">
			<view class="doc_info" v-for="item in doc_list" @click="Jump_To_Detail(item.doc_id)">
				<image class="doc_img" :src="item.doc_img" mode="aspectFill"></image>
				<view class="doc_content">
					<view class="doc_name">{{item.doc_name}}</view>
					<view class="doc_brand">{{item.doc_brand}}</view>
					<view class="doc_model">{{item.doc_model}}</view>
				</view>
				<view class="rep_count">{{item.rep_count}} 次</view>
			</view>
		</view>


		<view class="reach_Bottom" v-if="flag">---我是有底线的---</view>

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
				doc_list: [],
				flag: false,
			};
		},
		onLoad() {
			this.get_doc_List();
		},
		methods: {
			async get_doc_List() {
				uni.showLoading({
					title: "Loading..."
				})
				const res = await this.$myRequest({
					url: "mydocument/doc"
				})
				this.doc_list = [...res.data, ...res.data];
				uni.hideLoading()
			},
			
			Jump_To_Detail(id){
				console.log(id)
				uni.navigateTo({
					url:"document_Item/document_Item"
				})
			}
		},
		onReachBottom() {
			console.log("触发了上拉加载更多")
			if (this.doc_list.length <= 36) {
				this.doc_list = [...this.doc_list, ...this.doc_list]
			} else {
				this.flag = true
			}
		}
	}
</script>

<style lang="scss">
	.document{
		padding: 0 16rpx;
		
		.doc_list {
			padding: 0 16rpx;
			
			.doc_info {
				display: flex;
				justify-content: space-between;
				margin-bottom: $margin-width;
				
				
				.doc_img {
					flex: 2;
					border-radius: 10rpx;
					border-bottom-right-radius: 0rpx;
					border: 2rpx solid #ced7de;
					width: 100%;				
					height: 160rpx;
				}
		
				.doc_content {
					flex: 4;
					padding-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					// border-bottom: 2rpx solid #ced7de;
					
					.doc_name {
						font-size: $def-font-size;
						font-weight: bold;
					}
		
					.doc_brand {
						font-size: $small-font-size;
					}
		
					.doc_model {
						font-size: $small-font-size;
						
						overflow: hidden;
						word-break: break-all;  /* break-all(允许在单词内换行。) */
						text-overflow: ellipsis;  /* 超出部分省略号 */
						display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
						-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
						-webkit-line-clamp: 1; /** 显示的行数 **/
					}
				}
		
				.rep_count {
					flex: 1;
					display: flex;
					align-items: flex-end;
					justify-items: flex-start;
					padding-bottom: 4rpx;
					// border-bottom: 2rpx solid #ced7de;
					font-size: $small-font-size;
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
