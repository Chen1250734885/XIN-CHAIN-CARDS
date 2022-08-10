<template>
	<!-- 编辑资料 -->
	<view>
		<view class="shangchuans">
			<image src="../../static2/logo.png" mode="" class="lopgos"></image>
			<image src="../../static2/xiangji.png" mode="" class="lopgo"></image>
		</view>
		<view class="textst">点击更换头像</view>
		<view class="nivc">
			<text style="margin-left: 32rpx;font-size: 32rpx;">昵称</text>
			<input type="text" @input="names" v-model="name" value="" style="margin-top:40rpx;width: 160rpx;"/>
			<!-- <text style="margin-right: 33rpx;font-size: 30rpx;">{{name}}</text> -->
		</view>
		<view class="nivcs">
			<text style="margin-left: 32rpx;font-size: 32rpx;">个性签名</text>
			<input type="text" v-model="phone" value="" style="margin-top:40rpx;width:210rpx;"/>
			<!-- <text style="margin-right: 33rpx;font-size: 30rpx;">{{phone}}</text> -->
		</view>
		<view class="baocun" @tap="baocuns">
			<text>保存</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				name: '',
				phone: '',
				u_headpic: ''
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.name = opt.name
			this.phone = opt.phone
		},
		methods:{
			baocuns(){
				var vm = this
				vm.req.post(
				vm.lochost + '/index/index?method=edit_user_info', {
					signature: vm.phone,
					nickname:vm.name,
					u_headpic: vm.u_headpic
				},{},function(res){
					if(res.code == 200){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						vm.Back(1)
					}
				}
				)
			},
			names(n){
				console.log(n);
				this.name = n.detail.value
			}
		}
	}
</script>

<style>
	.shangchuans{
	}
	.lopgos{
		width: 200rpx;
		height: 200rpx;
		margin-top: 85rpx;
		margin-left: 275rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		padding: 15rpx 15rpx;
	}
	.lopgo{
		width: 60rpx;
		height: 60rpx;
		margin-top: 220rpx;
		transform: translate(-68rpx);
	}
	.textst{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(52,52,52,1);
		margin-left:300rpx;
		margin-top: 14rpx;
	}
	.nivc{
		width: 750rpx;
		height: 120rpx;
		line-height: 120rpx;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		margin-top: 41rpx;
	}
	.nivcs{
		width: 750rpx;
		height: 120rpx;
		line-height: 120rpx;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		margin-top: 1rpx;
	}
	.baocun{
		width: 607rpx;
		height: 90rpx;
		background-color: rgba(79, 159, 254, 1);
		color: #FFFFFF;
		font-size: 32rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 6rpx;
		margin: 80rpx auto;
	}
	
</style>
