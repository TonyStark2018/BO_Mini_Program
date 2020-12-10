<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="uniForm">
				<view class="uni-form-item reg_item">
					<view class="reg-title">* 身份类型</view>
					<picker mode="selector" :range="user_Identity_List" @change="handleIdentityChange($event)">
						<view class="input">{{user_Identity_List[Identity_index]}}</view>
					</picker>
				</view>

				<view class="uni-form-item reg_item" v-show="user_Identity=='合作伙伴'">
					<view class="reg-title">* 单位名称</view>
					<uni-combox :candidates="app_user.cust_Name_List" placeholder="请选择" v-model="cust_name" ></uni-combox>
				</view>
				
				<view class="uni-form-item reg_item" v-show="user_Identity=='潜在客户'">
					<view class="reg-title">* 单位名称</view>
					<input class="input" v-model="cust_name" placeholder="请填写公司名称"/>
				</view>

				<view class="uni-form-item reg_item" v-show="user_Identity=='合作伙伴'">
					<view class="reg-title">* 客户经理</view>
					<picker mode="selector" :range="sales_Manager_List" @change="handleManagerChange($event)">
						<view class="input">{{sales_Manager_List[Manager_index]}}</view>
					</picker>
				</view>




				<view class="uni-form-item reg_item">
					<view class="reg-title">担任职务</view>
					<input class="input" name="position" type="text" placeholder="请填写您的职务名称" />
				</view>
				<view class="uni-form-item reg_item">
					<view class="reg-title">* 真实姓名</view>
					<input class="input" name="real_Name" type="text" placeholder="用于验证开通权限" />
				</view>
				<view class="uni-form-item reg_item">
					<view class="reg-title">* 联系电话</view>
					<input class="input" name="tel" type="text" placeholder="请填写您的手机号" />
				</view>
				<view class="reg-tig">确认注册会员，即视为您已认可宝欧智运维服务协议</view>
				<button form-type="submit" type="primary" class="confirm-btn">确认注册</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniCombox from "@/components/uni-combox/uni-combox"
	export default {
		components: {
			uniCombox
		},
		data() {
			return {
				app_user: {},
				cust_name: '',
				user_Identity: '',
				user_Identity_List: [],
				Identity_index: 0,

				sales_Manager: '',
				sales_Manager_List: [],
				Manager_index: 0,

				openid: "",
				nickName: "",
				avatarUrl: "",
				gender: "",
				province: "",
				city: "",
			}
		},
		onLoad(param) {
			this.openid = param.openid;
			this.getUserInfo();
			this.getUserEmpty();
		},
		methods: {
			handleIdentityChange(e) {
				this.Identity_index = e.detail.value;
				this.user_Identity = this.user_Identity_List[this.Identity_index]
			},
			handleManagerChange(e) {
				this.Manager_index = e.detail.value;
				this.sales_Manager = this.sales_Manager_List[this.Manager_index]
			},

			jumpToHome() {
				uni.switchTab({
					url: "../home/home"
				})
			},
			// 候选客户
			async getUserEmpty() {
				const res = await this.$myRequest({
					url: "/Api/Get_App_User_Sign_In",
				})
				this.app_user = res.data.data;
				this.user_Identity_List = ["请选择", ...res.data.data.user_Identity_List]
				this.sales_Manager_List = ["请选择", ...res.data.data.sales_Manager_List]
				// console.log(this.sales_Manager_List)
			},

			// 获取用户已授权信息
			getUserInfo() {
				uni.getUserInfo({
					provider: "weixin",
					lang: "zh_CN",
					success: (res) => {
						console.log(res.userInfo);
						var data = res.userInfo;
						this.nickName = data.nickName;
						this.avatarUrl = data.avatarUrl;
						this.gender = data.gender;
						this.province = data.province;
						this.city = data.city;
					}
				});
			},

			// 提交表单
			async formSubmit(e) {
				var formdata = e.detail.value;
				const res = await this.$myRequest({
					url: "/Api/Create_App_User_Sign_In",
					method: 'POST',
					data: {
						User_Identity: this.user_Identity,
						Company_Name: this.cust_name,
						Sales_Manager: this.sales_Manager,
						Real_Name: formdata.real_Name,
						Position: formdata.position,
						Tel: formdata.tel,

						OpenID: this.openid,
						NickName: this.nickName,
						AvatarUrl: this.avatarUrl,
						Gender: this.gender == 1 ? "男" : "女",
						City: this.city,
						Province: this.province,
					}
				})

				if (res.data.error_Msg == '') {
					this.jumpToHome();
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-image: url(../../static/img/bg_img.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		.uniForm {
			width: 70vw;

			.reg_item {
				margin-bottom: 28rpx;
			}

			.reg-title {
				font-size: 28rpx;
				color: #3f64c0;
			}

			.reg-tig {
				font-size: 22rpx;
				color: #707b8f;
				margin-bottom: 16rpx;
			}

			.input {
				font-size: 32rpx;
				color: #808080;
				border-bottom: 2rpx solid #2874d7;
				padding: 20rpx 0;
			}

			.uni-combox {
				font-size: 32rpx;
				border-bottom: 2rpx solid #2874d7;
			}

			.confirm-btn {
				background: #2874d7;
				font-size: 32rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
