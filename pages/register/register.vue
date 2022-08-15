<template>
	<gracePage :customHeader="false">
		<view slot="gBody" style="background: #F7F7F7;" :style="{height:height}">
			<view class="logst">
				<image src="../../static2/logo.png" mode="" style="width: 100%;height: 100%;"></image>
			</view>
			<!-- 注册手机号 -->
			<view class="sj ">
				<view class="grace-rows sj_sr">
					<image src="../../static2/shouji.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="margin-left: 14rpx;">手机号：</text>
					<input v-model="phoneno" placeholder="请输入手机号码" placeholder-style="font-size: 24rpx;" />
				</view>
				<view class="sj_xhx"></view>
			</view>

			<!-- 注册密码 -->
			<view class="sj ">
				<view class="grace-rows sj_sr">
					<image src="../../static2/mima.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="margin-left: 14rpx;">密&emsp;码：</text>
					<input password="true" placeholder-class="mm" v-model="mima" placeholder="请设置密码"
						placeholder-style="font-size: 24rpx;" />
				</view>
				<view class="sj_xhx"></view>
			</view>
			<!-- 注册邀请码 -->
			<view class="sj ">
				<view class="grace-rows sj_sr">
					<image src="../../static2/yaoqingma.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="margin-left: 14rpx;">邀请码：</text>
					<input v-model="yaoqingma" placeholder="请输入邀请码/邀请人手机号码" placeholder-style="font-size: 24rpx;" />
				</view>
				<view class="sj_xhx"></view>
			</view>
			<!-- 注册验证码 -->
			<view class="sj ">
				<view class="grace-rows sj_sr">
					<image src="../../static2/yanzhengma.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="margin-left: 14rpx;">验证码：</text>
					<input v-model="yanzhengma" placeholder="请输入验证码" placeholder-style="font-size: 24rpx;" />
					<view class="login-sendmsg-btn" @tap='getVCode'>{{vcodeBtnName}}</view>
				</view>
				<view class="sj_xhx"></view>
			</view>
			<!-- 是否同意协议 -->
			<view>
				<image src="../../static2/butoyi.png" v-if="is_xuanzhong" mode=""
					style="width: 40rpx;height: 40rpx;transform: translateY(10rpx);margin-left: 24rpx;" @tap="butoyis">
				</image>
				<image src="../../static2/toyi.png" v-else mode=""
					style="width: 40rpx;height: 40rpx;transform: translateY(10rpx);margin-left: 24rpx;" @tap="toyis">
				</image>
				<text style="font-size: 28rpx;color: #999999;margin-left: 15rpx;">同意一刷通注册协议</text>

			</view>
			<!-- 注册按钮 -->
			<button @tap="reg"
				style="margin-top: 100rpx; width:550rpx;height:90rpx;background:rgba(79,159,254,1);border-radius:10rpx;"><text
					style="font-size:32rpx;font-weight:400;color:#FFF9F9;line-height:90rpx;letter-spacing:16rpx">注册</text></button>

			<!-- <view style="background-image: url(../../static/mybeijin.png); background-size: contain; width: 750rpx;height: 800rpx;">
				<view style="background-image: url(../../static/logo3.0.png);background-size: contain;width: 170rpx;height: 218rpx;margin: 0 auto; position: relative;top: 47rpx;"></view>
			</view>
			<view class="grace-flex-center grace-wrap" style="margin-top: -200rpx;">
				<view  style="margin-top: 25rpx;">
					<view class="grace-rows" style="margin: 0 auto;">
						<image src="../../static/yonghu.png" style="width: 36rpx;height: 36rpx;"></image>
						<input style="margin-left: 30rpx;width: 530rpx" v-model="phoneno" placeholder="请输入账号"/>
					</view>
					<view style="margin-top: 15rpx; width: 600rpx;height: 2rpx;background:rgba(153,153,153,1);"></view>
				</view>
				
				<view  style="margin-top: 25rpx;">
					<view class="grace-rows" style="margin: 0 auto;">
						<image src="../../static/yanzhengma.png" style="width: 36rpx;height: 36rpx;"></image>
						<input type="number" style="margin-left: 30rpx;width: 330rpx" v-model="yanzhengma" placeholder="请输入短信验证码"/>
						<button type="primary" class="login-sendmsg-btn" @tap='getVCode'>{{vcodeBtnName}}</button>
					</view>
					<view style="margin-top: 5rpx; width: 600rpx;height: 2rpx;background:rgba(153,153,153,1);"></view>
				</view>
				
				<view  style="margin-top: 25rpx;">
					<view class="grace-rows" style="margin: 0 auto;">
						<image src="../../static/mima.png" style="width: 36rpx;height: 36rpx;"></image>
						<input password="true" v-model="mima" style="margin-left: 30rpx;width: 530rpx" placeholder="请输入密码"/>
					</view>
					<view style="margin-top: 15rpx; width: 600rpx;height: 2rpx;background:rgba(153,153,153,1);"></view>
				</view>
				
				<view  style="margin-top: 25rpx;">
					<view class="grace-rows" style="margin: 0 auto;">
						<image src="../../static/yaoqingma.png" style="width: 36rpx;height: 36rpx;"></image>
						<input style="margin-left: 30rpx;width: 530rpx" v-model="yaoqingma" placeholder="请输入邀请码"/>
					</view>
					<view style="margin-top: 15rpx; width: 600rpx;height: 2rpx;background:rgba(153,153,153,1);"></view>
				</view>
			</view>
			<button @tap="reg" style="margin-top: 100rpx; width:607rpx;height:88rpx;background:linear-gradient(0deg,rgba(22,120,255,1) 0%,rgba(105,168,255,1) 100%);border-radius:44rpx;"><text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1);line-height:70rpx;">立即注册</text></button> -->
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				height: '',
				phoneno: '',
				yanzhengma: '',
				mima: '',
				yaoqingma: '',
				vcodeBtnName: "获取验证码",
				//是否同意协议
				is_xuanzhong: true,
			}
		},
		onLoad: function() {
			this.height = '100%'

		},
		methods: {
			butoyis() {
				this.is_xuanzhong = false
			},
			toyis() {
				this.is_xuanzhong = true
			},
			reg() {
				if (this.phoneno.length > 0 && this.yanzhengma.length > 0 && this.mima.length > 0) {
					if (this.is_xuanzhong == true) {
						uni.showToast({
							title: '请同意一刷通注册协议',
							icon: "none"
						});
					} else {
						this.req.post(
							this.lochost + '/index/index?method=register', {
								tel: this.phoneno,
								password: this.mima,
								share_tel: this.yaoqingma,
								sms_code: this.yanzhengma
							}, {},
							function(res) {
								console.log(res);
								if (res.code === 200) {
									var data = res.data;
									uni.setStorageSync('user_id', data.id);
									uni.setStorageSync('user_name', data.name);
									uni.setStorageSync('user_identity', data.identity);
									uni.setStorageSync('user_phone', data.tel);
									uni.setStorageSync('user_level', data.level);
									uni.setStorageSync('user_isset_gesture_pwd', data.isset_gesture_pwd);
									uni.setStorageSync('user_isset_deal_pwd', data.isset_deal_pwd);
									uni.setStorageSync('user_u_state', data.state);
									uni.setStorageSync('user_token', data.token);
									uni.showToast({
										title: '注册成功！',
										icon: "none"
									});
									uni.redirectTo({
										url: '/pages/login/login'
									});
								}
								// uni.setStorageSync('user_id', 'hello');

							}
						);
					}

				} else {
					uni.showToast({
						title: '请输入完整的信息',
						icon: "none"
					});
				}
			},
			getVCode: function() {
				var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: '请正确填写手机号码',
						icon: "none"
					});
					return false;
				}
				// 手机号码为 :  this.phoneno
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送') {
					return;
				}
				this.vcodeBtnName = "发送中...";
				// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
				this.req.post(
					this.lochost + '/index/index?method=sendSms', {
						tel: this.phoneno,
						class: 'register',
					}, {},
					function(res) {
						console.log(res);
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					}
				);
				// 倒计时
				this.countNum = 120;
				this.countDownTimer = setInterval(function() {
					this.countDown();
				}.bind(this), 1000);
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = "重新发送";
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + '秒重发';
			},
		},
		components: {
			gracePage
		}
	}
</script>

<style>
	.login-sendmsg-btn {
		position: fixed;
		left: 480rpx;
		background: #B5B5B5 !important;
		color: rgba(51, 51, 51, 1) !important;
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 22rpx !important;
		border-radius: 6rpx;
		margin-top: -19rpx;
		text-align: center;
	}

	input {
		margin-left: 50rpx;
	}

	/* input .mm{
		margin-left: 30rpx;
	} */
	.logst {
		width: 220rpx;
		height: 220rpx;
		background-size: contain;
		margin-top: 37rpx;
		margin-left: 265rpx;
		margin-bottom: 23rpx;
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

	.sj_xhx {
		border-bottom: 1rpx solid rgba(204, 204, 204, 1);
		width: 400rpx;
		margin-left: 235rpx;
		margin-top: 45rpx;
	}
</style>
