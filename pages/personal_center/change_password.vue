<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
		<view style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">原密码：</text>
				<view class="grace-columns" >
					<input v-model="password" style="width:530rpx;" placeholder="请输入原密码" placeholder-style="left: 170rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);"/>
					<view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view>
				</view>
			</view>
		</view>
		
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">新密码：</text>
				<view class="grace-columns" >
					<input v-model="new_password" style="width:530rpx;" placeholder="请输入新密码" placeholder-style="left: 170rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);"/>
					<view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view>
				</view>
			</view>
		</view>
		
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">确认新密码：</text>
				<view class="grace-columns" >
					<input v-model="is_new_password" style="width:530rpx;" placeholder="请再次输入新密码" placeholder-style="left: 170rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);"/>
					<view style="width:480rpx;height:1rpx;background:rgba(153,153,153,1);"></view>
				</view>
			</view>
		</view>
		
		<button @tap="submit" style="margin-top: 300rpx; width:500rpx;height:90rpx;background:rgba(22,120,255,1);border-radius:6rpx; font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);line-height:90rpx;">确认</button>
		
		</view>
	</gracePage>
</template>

<script>
	
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				password:'',
				new_password:'',
				is_new_password:'',
				
			}
		},
		onLoad:function(){},
		methods:{
			submit(){
				var vm=this
				if(this.password==='' || this.new_password==='' || this.is_new_password===''){
					this.msg_show('请输入完整信息')
				}else if(this.new_password!=this.is_new_password){
					this.msg_show('新密码与确认新密码输入不一致')
				}else{
					this.req.post(
					this.lochost+'/mytrunk/userapi/change_password',
					{password:this.password,new_password:this.new_password,paws_type:1},
					{},
					function(res){
						console.log(res);
						vm.msg_show(res.msg);
						uni.setStorageSync('user_token','');
					}
					)
				}
			}
		},
		components:{
			gracePage
		}
	}
</script>

<style>
</style>
