<template>
	<view class="document">
		<!-- 自定义Placeholder -->
		<uni-search-bar :radius="5" placeholder="备件品牌或名称" @confirm="searchDocList($event)" @cancel="cancelSearch($event)"></uni-search-bar>

		<view class="doc_list">
			<view class="doc_info" v-for="item in Main_list" :key="item.maid" @click="jumpToMainItem(item.maid)">
				<image class="doc_img" :src="getImgSrc(item.doc_Img)" mode="aspectFill"></image>
				<view class="doc_content">
					<view class="doc_name">{{item.doc_Name}}</view>
					<view class="doc_brand">{{item.doc_Brand}}</view>
					<view class="doc_model">{{item.doc_Model}}</view>
				</view>
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
				Main_list: [],
				uid: '',
				pageindex: 1,
				module_Name: "在修备件",
				keyword: '',
				total_count: 0,
				flag: false,
			};
		},
		onLoad(params) {
			this.uid = params.link_UID;
			this.getDocList(params.link_UID);
		},
		methods: {
			//获取页面数据
			async getDocList(uid) {
				this.keyword = '';
				const res = await this.$myRequest({
					url: "/Api/Get_App_Main_List",
					data: {
						UID: uid,
						Module_Name: this.module_Name,
						keyword: this.keyword,
						pageindex: 1,
					}
				})
				this.Main_list = res.data.data;
				this.total_count = this.Main_list.length;
			},


			async getMoreList(uid, pageindex) {
				const res = await this.$myRequest({
					url: "/Api/Get_App_Main_List",
					data: {
						uid: uid,
						Module_Name: this.module_Name,
						pageindex: pageindex,
					}
				})
				let list = res.data.data;
				this.Main_list = [...this.Main_list, ...list];
				this.total_count = this.Main_list.length;

				if (this.total_count < 10 * pageindex) {
					this.flag = true;
				}
			},

			// 上拉加载更多
			onReachBottom() {
				if (this.flag == false) {
					this.pageindex += 1;
					this.getMoreList(this.uid, this.pageindex);
					console.log(this.pageindex)
				}
			},

			// 搜索功能
			async searchDocList(event) {
				this.pageindex = 1;
				this.keyword = event.value;
				const res = await this.$myRequest({
					url: "/Api/Get_App_Main_List",
					data: {
						uid: this.uid,
						Module_Name: this.module_Name,
						keyword: this.keyword,
						pageindex: this.pageindex,
					}
				})
				this.Main_list = res.data.data;
				this.total_count = this.Main_list.length;

				if (this.total_count < 10 * this.pageindex) {
					this.flag = true;
				}
			},

			// 取消搜索
			async cancelSearch() {
				this.getDocList(this.uid);
			},

			jumpToMainItem(maid) {
				uni.navigateTo({
					url: "maintain_Item/maintain_Item?maid=" + maid
				})
			}
		},
	}
</script>

<style lang="scss">
	.document {
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
