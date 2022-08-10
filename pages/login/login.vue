<template>
	<gracePage :customHeader="false" >
		<view slot="gBody" style="background: #F7F7F7;" :style="{height: height}">
			<view class="logst">
				<image src="../../static2/logo.png" mode="" style="width: 100%;height: 100%;"></image>
			</view>
			<!-- 登录手机号 -->
			<view class="sj ">
				<view class="grace-rows sj_sr">
					<image src="../../static2/shouji.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="margin-left: 14rpx;">手机号：</text>
					<input v-model="phone" placeholder="请输入手机号码" placeholder-style="font-size: 24rpx;" />
				</view>
				<view class="sj_xhx"></view>
			</view>
			
			<!-- 登录密码 -->
			<view class="sj ">
				<view class="grace-rows sj_sr">
					<image src="../../static2/mima.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="margin-left: 14rpx;">密&emsp;码：</text>
					<input password="true" placeholder-class="mm" v-model="pwd" placeholder="请输入密码" placeholder-style="font-size: 24rpx;" />
				</view>
				<view class="sj_xhx"></view>
			</view>
			<view class="grace-space-between" style="margin-top: 10rpx;">
				<view @tap="Goto('/pages/register/register')">
					<text style="font-size:22rpx;font-weight:300;color:rgba(153,153,153,1);margin-left: 50rpx;">新用户注册</text>
				</view>
				<view @tap="Goto('/pages/forget_password/forget_password')">
					<text style="font-size:22rpx;font-weight:300;color:rgba(153,153,153,1);margin-right: 50rpx;">忘记密码？</text>
				</view>
				
			</view>
			<button @tap="sub" type="primary" style="width:550rpx;height:90rpx;background:rgba(79,159,254,1);border-radius:10rpx;margin-top: 60rpx;"><text style="font-size:32rpx;font-weight:300;color:rgba(255,255,255,1);line-height:90rpx;">登&emsp;&emsp;录</text></button>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				phone:'',
				pwd:'',
				height:'',
			}
		},
		// onBackPress(event) {
		// 	console.log(event);
		// 	var vm=this;
		// 	vm.toTab('/pages/index/index');
		//         }, 
		onLoad:function(){
			this.height=this.sys.windowHeight+'px'
			console.log(this.height);
		},
		methods:{
			sub(){
				var vm=this;
				if (this.phone.length>0 && this.pwd.length>0){
					this.req.mypost(
					this.lochost+'/index/index?method=login',
					{tel:this.phone,password:this.pwd},
					function(res){
						console.log(res.data);
						var data=res.data;
						uni.setStorageSync('user_id',data.id);
						uni.setStorageSync('user_name',data.name);
						uni.setStorageSync('user_identity',data.identity);
						uni.setStorageSync('user_phone',data.tel);
						uni.setStorageSync('user_level',data.level);
						uni.setStorageSync('user_isset_gesture_pwd',data.isset_gesture_pwd);
						uni.setStorageSync('user_isset_deal_pwd',data.isset_deal_pwd);
						uni.setStorageSync('user_u_state',data.state);
						uni.setStorageSync('user_token',data.token);
						vm.msg_show(res.msg);
						if(res.code == 200){
							uni.switchTab({
						    url: '/pages/index/index'
						});
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
						// vm.Back();
						
					}
					)
					
				}else{
					this.msg_show('请输入账号或密码')
				}
			}
		},
		components:{
			gracePage
		}
	}
</script>

<style>
	.logst {
		width: 220rpx;
		height: 220rpx;
		background-size: contain;
		margin-top: 140rpx;
		margin-left: 265rpx;
		margin-bottom: 48rpx;
	}
	.sj {
		width: 702rpx;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		margin: 0 24rpx;
		margin-bottom: 10rpx;
	}
	.sj_sr {
		margin-left: 21rpx;
		transform: translateY(40rpx);
	
	
	}
	input{
		margin-left: 50rpx;
	}
	.sj_xhx {
		border-bottom: 1rpx solid rgba(204, 204, 204, 1);
		width: 400rpx;
		margin-left: 235rpx;
		margin-top: 45rpx;
	}
</style>
