<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<view class="grace-wrap grace-flex-center" style="width: 750rpx;height: 430rpx; background-image: url(../../static/zx_bj.png);background-size: contain;">
				<!-- 头部内容数据 -->
				<view style="font-size:32rpx;font-weight:bold;color:rgba(255,255,255,1);position: relative;top: 143rpx;">{{ name.length < 11 ?name: '未认证'}}</view>
				<view style="font-size:32rpx;font-weight:bold;color:rgba(255,255,255,1);position: absolute;top: 183rpx;margin-top: 10rpx;">{{ phone }}</view>
				<!-- 认证、银行卡 -->
				<view class="grace-flex-center" style="width:711rpx;height:240rpx;background:rgba(255,255,255,1);box-shadow:0rpx 3rpx 12rpx 1rpx rgba(22,120,255,0.48);border-radius:20rpx;position: relative;top: 290rpx;">
					<view @tap="u_state==='未认证'? Goto('/pages/authentication/non_real_name') : Goto('/pages/card_bag/card_bag')" class="grace-flex-vcenter grace-columns"
					 style="margin-right: 80rpx; position: relative;top: 90rpx;height: 110rpx;">
						<image src="../../static/personal_center_yinhangka.png" style="width: 56rpx;height: 56rpx;"></image>
						<text style="position: relative;top: 16rpx;font-size:22rpx;color:rgba(51,51,51,1);">我的银行卡</text>
					</view>
					<view @tap="is_u_state" class="grace-flex-vcenter grace-columns" style="margin-left: 300rpx; position: relative;top: 90rpx;height: 110rpx;">
						<image src="../../static/personal_center_shiming.png" style="width: 56rpx;height: 56rpx;"></image>
						<text style="position: relative;top: 16rpx;font-size:22rpx;color:rgba(51,51,51,1);">实名认证</text>
					</view>
				</view>
				<!-- 等级 -->
				<view style="width:270rpx;height:270rpx;background:rgba(255,255,255,1);box-shadow:0rpx 1rpx 10rpx 0rpx rgba(22,120,255,0.48);border-radius:50%;position: relative;bottom: 35rpx;">
					<image :src="headpic!=null && headpic!='' ?headpic: '../../static/lonin.png'" style="margin:21rpx 34rpx; width: 200rpx;height: 168rpx;"></image>
					<text style="font-size: 24rpx;font-family:HYLingXinJ;color:rgba(22,120,255,1);margin-left: 95rpx;font-weight:400;">火星等衔</text>
				</view>
			</view>
			<!-- 页面主体内容 -->
			<view class="grace-columns" style="margin-top: 200rpx;">
				<view class="grace-rows grace-flex-vcenter" style="width: 750rpx;height: 100rpx;background:rgba(255,255,255,1);">
					<image src="../../static/wode_1.png" style="margin-left: 46rpx; width: 38rpx;height: 38rpx;"></image>
					<text style="margin-left: 25rpx; font-size:28rpx;font-weight:400;color:rgba(102,102,102,1);">我的推荐人</text>
					<text style="margin-left: 306rpx; font-size:24rpx;font-weight:bold;color:rgba(153,153,153,1);">{{ u_pid }}</text>
				</view>
				<view @tap="Goto('/pages/personal_center/change_password')" class="grace-rows grace-flex-vcenter" style="position: relative;top: 2rpx; width: 750rpx;height: 100rpx;background:rgba(255,255,255,1);">
					<image src="../../static/wode_2.png" style="margin-left: 46rpx; width: 38rpx;height: 38rpx;"></image>
					<text style="margin-left: 25rpx; font-size:28rpx;font-weight:400;color:rgba(102,102,102,1);">修改密码</text>
					<image src="../../static/jiantou.png" style="margin-left: 469rpx; width: 12.8rpx;height: 22rpx;"></image>
				</view>
				<view class="grace-rows grace-flex-vcenter" style="position: relative;top: 5rpx;width: 750rpx;height: 100rpx;background:rgba(255,255,255,1);">
					<image src="../../static/wode_3.png" style="margin-left: 46rpx; width: 38rpx;height: 38rpx;"></image>
					<text style="margin-left: 25rpx; font-size:28rpx;font-weight:400;color:rgba(102,102,102,1);">常见问题</text>
					<image src="../../static/jiantou.png" style="margin-left: 469rpx; width: 12.8rpx;height: 22rpx;"></image>
				</view>
				<view @tap="qwst" class="grace-rows grace-flex-vcenter" style="position: relative;top: 6rpx;width: 750rpx;height: 100rpx;background:rgba(255,255,255,1);">
					<image src="../../static/wode_3.png" style="margin-left: 46rpx; width: 38rpx;height: 38rpx;"></image>
					<text style="margin-left: 20rpx; font-size:28rpx;font-weight:400;color:rgba(102,102,102,1);">版本号</text>
					<text v-if="is_update==0" style="margin-left: 455rpx; font-size:28rpx;font-weight:400;color:rgba(102,102,102,1);">{{banbenhao}}</text>
					<text v-if="is_update==1" style="margin-left: 400rpx; font-size:28rpx;font-weight:400;color:rgba(218,28,30,1);">{{banbenhao}}</text>
				</view>
			</view>
			<!-- 页面主体内容 -->
			<view style="margin-top: 80rpx;">
				<button type="primary" @tap="outlogin" class="grace-button" style="width:702rpx;height:80rpx;background:#1678FF;border-radius:10rpx;font-weight:bold;color:rgba(255,255,255,1);font-size:32rpx;">退出登录</button>
			</view>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				nickname: null, //昵称
				name: '', //用户姓名
				headpic: null, //头像
				u_state: "", //认证状态
				u_pid: '', //用户推荐人信息[没有为空，有是json对象]
				phone: "", //用户手机
				identity: '暂无信息',
				is_update: 0,
				banbenhao: ''
			}
		},
		onShow() {
			var vm = this;
			vm.name = '';
			vm.u_state = '';
			vm.u_pid = '';
			vm.phone = '';
			this.req.post(
				this.lochost + '/mytrunk/userapi/getuser', {}, {},
				function(res) {
					var data = res.data;
					console.log(data.is_update)
					vm.nickname = data.nickname;
					vm.name = data.name;
					vm.is_update = data.is_update
					vm.headpic = data.headpic;
					vm.u_state = data.u_state;
					vm.u_pid = data.u_pid.phone;
					vm.phone = data.phone;
					vm.identity = data.identity;
					if (data.level_img) {
						vm.headpic = data.level_img;
					}
					if (vm.is_update === 0) {
						vm.banbenhao = vm.req.get_sys_edition()
						
					} else {
						vm.banbenhao = "有新版本"
					}
				}
			)
		},
		onLoad(opt) {
		
		},
		methods: {
			qwst() {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						console.log('运行Android上')
						if (this.is_update === 1) {
							this.Goto('/pages/update/update')
							
						}
						break;
					case 'ios':
						console.log('运行iOS上')
						if (this.is_update === 1) {
							uni.showToast({
								title: '请安装最新版本！',
								icon:'none'
							})
							// this.Goto('/pages/update/update')
						}

						break;
					default:
						console.log('运行在开发者工具上')
						break;
				}
			},
			outlogin() {
				uni.clearStorageSync()
				this.Goto('/pages/login/login');
			},
			is_u_state() {
				if (this.u_state === '未认证') {
					this.Goto('/pages/authentication/non_real_name');
				} else {
					this.Goto('/pages/authentication/real_name');
				}

			},
		},
		components: {
			gracePage,
		}

	}
</script>

<style>
</style>
