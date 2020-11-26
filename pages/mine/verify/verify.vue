<template>
	<view style="display: flex; align-items: center; justify-items: center; height: 100vh;">
		<image :src="getImgSrc('Images/Img_Coding.jpg')" mode="widthFix" style="width: 100%;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:''
			};
		},
		onLoad(params) {
			console.log(params)
			this.uid = params.uid;
			this.asd(params.uid);
		},
		methods: {
			async asd() {
				const res = await this.$myRequest({
					url: "/Api/Get_App_User_Wait_Aud?uid="+this.uid,
				})
				console.log(res);
			}
		},
		onPullDownRefresh() {
			console.log("触发下拉")
		}
	}
</script>

<style lang="scss">

</style>
