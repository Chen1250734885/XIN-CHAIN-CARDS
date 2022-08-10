<template>
	<!-- 修改密码 -->
	<view>
		<!-- 原密码 -->
		<view class="yuans">
			<text style="font-size: 28rpx;margin-left: 64rpx;">原密码：</text>
			<input password="true"  @input="yuanst" placeholder="请输入原密码" :value="yuanmin" placeholder-style="font-size: 22rpx;" style="width: 200rpx;display: inline-block;transform: translateY(10rpx);margin-left:135rpx" />
		</view>
		<!-- 新密码 -->
		<view class="xinmi">
			<text style="font-size: 28rpx;margin-left: 64rpx;">新密码：</text>
			<input password="true" @input="xinst" placeholder="请输入新密码" :value="xinmim" placeholder-style="font-size: 22rpx;" style="width: 200rpx;display: inline-block;transform: translateY(10rpx);margin-left:135rpx" />
		</view>
		<!-- 确认新密码 -->
		<view class="qrxin">
			<text style="font-size: 28rpx;margin-left: 64rpx;">确认新密码：</text>
			<input password="true" @input="qurnmi" placeholder="请再次输入新密码" :value="qrxinm" placeholder-style="font-size: 22rpx;" style="width: 200rpx;display: inline-block;transform: translateY(10rpx);margin-left:79rpx" />
		</view>
		<!-- 确认按钮 -->
		<view class="annqr" @tap="change">
			<text style="font-size: 32rpx;color: #FFFFFF;">确认</text>
		</view>
	</view>
</template>

<script>
	export default {  
		data(){
			return{
				yuanmin: '',
				xinmim:'',
				qrxinm: '',
				mima_y: '',
				mima_x:'',
				mima_qr: ''
			}
		},
		methods:{
			// 输入原密码
			yuanst(obj){
				console.log(obj);
				this.mima_y = obj.detail.value
			},
			// 输入新密码
			xinst(obj){
				console.log(obj);
				this.mima_x = obj.detail.value
			},
			// 输入确认新密码
			qurnmi(obj){
				this.mima_qr = obj.detail.value
			},
			// 确认修改按钮
			change(){
				var vm = this
				vm.req.post(
				vm.lochost + '/index/index?method=change_password',{
					password:vm.mima_y,
					new_password:vm.mima_x,
					paws_type: 1
				},{},function(res){
					if(res.code == 200){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						setTimeout(function(){
							uni.switchTab({
								url:'/pages/personal_center/personal_centers'
							})
						},500)
					}
				}
				)
			}
		}
	}
</script>

<style>
	.yuans{
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		line-height: 100rpx;
	}
	.xinmi{
		margin-top: 1rpx;
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		line-height: 100rpx;
	}
	.qrxin{
		margin-top: 1rpx;
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		line-height: 100rpx;
	}
	.annqr{
		width: 500rpx;
		height: 90rpx;
		background-color: rgba(79, 159, 254, 1);
		border-radius: 6rpx;
		margin-top: 179rpx;
		margin-left: 125rpx;
		line-height: 90rpx;
		text-align: center;
	}
</style>
