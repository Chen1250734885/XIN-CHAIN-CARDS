<template>
	<view>
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- 我的页面主体内容 -->
		<view class="head_content">
			<!-- logo图标 -->
			<view class="logos">
				<image src="../../static/head_logo.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<!--用户信息  -->
			<view class="user">
				<text style="color: #FFFFFF;font-size: 30rpx;">{{ name.length<11 ?name:phone }}</text>
				<image src="../../static/xiugai.png" style="width: 36rpx;height: 36rpx;margin-left: 55rpx;transform: translateY(5rpx);" mode="" @tap="Goto('/pages/personal_center/materials?name='+ real_name+'&phone='+phone)"></image> 																		<!-- nickname -->
				
				<view>
					<text style="font-size: 24rpx;color: #FFFFFF;">{{phones}}</text>
				</view>
			</view>
			<!-- 图标 -->
			<view class="mine_shave">
				<image v-show="level==100" src="../../static/mine_shar.png" style="width: 98rpx; height:112rpx;" mode=""></image>
				<!-- <image v-show="level==0" src="../../static2/puto.png" style="width: 54rpx; height:45rpx;" mode=""></image> -->
				<view v-show="level==0" class="putoa" @tap="shengji">去升级</view>
				<image v-show="level==1" src="../../static2/vips.png" style="width: 70rpx; height:60rpx;" mode=""></image>
				<image v-show="level==2" src="../../static2/daka.png" style="width: 90rpx; height:75rpx;" mode=""></image>
				<image v-show="level==3" src="../../static2/tuanz.png" style="width: 108rpx; height:91rpx;" mode=""></image>
				<image v-show="level==4" src="../../static2/jiangjun.png" style="width: 128rpx; height:106rpx;" mode=""></image>
			</view>
		</view>
		<!-- 主体内容 -->
		<!-- 限时活动中心 -->
		<view class="xianshi" @tap="activits">
			<view class="tubiao">
				<image src="../../static/xianshi.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:36rpx;font-family:PingFang SC;font-weight:bold;color:rgba(249,159,0,1);">限时活动中心！！</text>
			</view>
			<view class="tbs">
				<image src="../../static/jiantou.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
		</view>
		<!-- 银行卡 -->
		<view class="xianshi" style="margin-top: 2rpx;" @tap="yinhas">
			<view class="tubiao">
				<image src="../../static/yinhang.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">我的银行卡</text>
			</view>
			<view class="tbs" >
				<image src="../../static/jiantou.png" style="width: 100%;height: 100%;margin-left: 135rpx;" mode=""></image>
			</view>
		</view>
		<!-- 卡卷 -->
		<view class="xianshi" style="margin-top: 2rpx;" @tap="kajs">
			<view class="tubiao">
				<image src="../../static2/kaj.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">我的卡卷</text>
			</view>
			<view class="tbs" >
				<image src="../../static/jiantou.png" style="width: 100%;height: 100%;margin-left: 170rpx;" mode=""></image>
			</view>
		</view>
		<!-- 我的券包 -->
		<view class="xianshi" style="margin-top: 2rpx;" @tap="quansbaos">
			<view class="tubiao">
				<image src="../../static/quansbao.png" style="width: 100%;height: 43rpx;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">我的券包</text>
			</view>
			<view class="tbs" >
				<image src="../../static/jiantou.png" style="width: 100%;height: 100%;margin-left: 170rpx;" mode=""></image>
			</view>
		</view>
		<!-- 客服 -->
		<view class="xianshi" style="margin-top: 2rpx;" @tap="lxkf">
			<view class="tubiao">
				<image src="../../static2/kef.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">联系客服</text>
			</view>
			<view class="tbs" >
				<image src="../../static/jiantou.png" style="width: 100%;height: 100%;margin-left: 170rpx;" mode=""></image>
			</view>
		</view>
		<!-- 修改密码 -->
		<view class="xianshi" style="margin-top: 2rpx;" @tap="moilrd">
			<view class="tubiao">
				<image src="../../static/shezhi.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">修改密码</text>
			</view>
			<view class="tbs" >
				<image src="../../static/jiantou.png" style="width: 100%;height: 100%;margin-left: 170rpx;" mode=""></image>
			</view>
		</view>
		<!-- 认证 -->
		<view class="xianshi" style="margin-top: 2rpx;" @tap="is_u_state">
			<view class="tubiao">
				<image src="../../static/renzhen.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo" style="transform: translateY(-4rpx);">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">实名认证</text>
			</view>
			<view class="tbs" >
				<image v-show="u_state==1" src="../../static/yirz.png" style="width: 100rpx;height: 40rpx;transform: translateY(10rpx);display: inline-block;margin-left: 70rpx;" mode=""></image>
				<image v-show="u_state==2"  src="../../static/shiban.png" style="width: 100rpx;height: 40rpx;transform: translateY(30rpx);display: inline-block;" mode=""></image>
				<image v-show="u_state==4" src="../../static/jiantou.png" style="width: 100%;height: 100%;margin-left: 170rpx;" mode=""></image>
			</view>
		</view>
		<view class="xianshi" style="margin-top: 2rpx;" >
			<view class="tubiao">
				<image src="../../static/tuijian.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">我的推荐人</text>
			</view>
			
			<view class="tbs" >
				<text style="margin-left: -5rpx; font-size:24rpx;font-weight:bold;color:rgba(153,153,153,1);">{{ u_pid }}</text>
			</view>
			
		</view>
		<!-- 关于 -->
		<view class="xianshi" style="margin-top: 2rpx;" @tap="about">
			<view class="tubiao">
				<image src="../../static/guanyu.png" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view class="huodo">
				<text style="font-size:30rpx;font-family:PingFang SC;color:#565656;">关于我们</text>
			</view>
			<view class="tbs" >
				<image src="../../static/jiantou.png" style="width: 100%;height: 100%;margin-left: 170rpx;" mode=""></image>
			</view>
		</view>
		
		
		<!-- 退出按钮 -->
		<view style="margin-top: 26rpx;margin-bottom: 38rpx;">
			<button type="primary" @tap="outlogin" class="grace-button" style="width:702rpx;height:80rpx;background:#1678FF;border-radius:10rpx;font-weight:bold;color:rgba(255,255,255,1);font-size:32rpx;">退出登录</button>
		</view>
		<!-- 客服帮助 -->
		<view class="kef_s" @tap="qiaozhuandaokehu">
			<image :style="'left:'+moveX+'px;top:'+moveY+'px'" @touchstart="drag_start" @touchmove.prevent="drag_hmove" src="../../static2/kefs.png"
			 mode="" style="width: 152rpx;height:79rpx;transform: translate(4rpx,4rpx);"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: null,//昵称
				name:'',//用户姓名
				headpic: null,//头像
				u_state: "",//认证状态
				u_pid: '',//用户推荐人信息[没有事空，有是json对象]
				phone: "",//用户手机
				phones: '',
				identity:'暂无信息',
				progress_bar: '',//进度值
				level: '',//等级
				real_name: '',
				start: [0, 0],
				moveY: 0,
				moveX: 0,
				windowWidth: '',
				windowHeight: '',
			}
		},
		onLoad() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
		},
		onShow() {
			var vm=this;
			vm.name='';
			vm.u_state='';
			vm.u_pid='';
			vm.phone='';
			this.req.post(
			this.lochost+'/index/index?method=user_index',
			{},
			{},
			function(res){
				console.log(res);
				var data=res.data;
				vm.nickname=data.nickname;
				vm.real_name=data.real_name;
				vm.name=data.name;
				vm.headpic=data.headpic;
				vm.u_state=data.state;
				vm.u_pid=data.m_tel;
				vm.phone=data.signature;
				vm.phones=data.tel;
				vm.identity=data.identity;
				vm.progress_bar=data.progress_bar;
				vm.level=data.level;
			}
			)
		},
		methods: {
			drag_start(event) {
				this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
				this.start[1] = event.touches[0].clientY - event.target.offsetTop;
			},
			drag_hmove(event) {
				let tag = event.touches;
				if (tag[0].clientX < 0) {
					tag[0].clientX = 0
				}
				if (tag[0].clientY < 0) {
					tag[0].clientY = 0
				}
				if (tag[0].clientX > this.windowWidth) {
					tag[0].clientX = this.windowWidth
				}
				if (tag[0].clientY > this.windowHeight) {
					tag[0].clientY = this.windowHeight
				}
				this.moveX = tag[0].clientX - this.start[0];
				this.moveY = tag[0].clientY - this.start[1];
			},
			qiaozhuandaokehu() {
				uni.navigateTo({
					url: '/pages/Last_page/Custome_services'
				})
			},
			outlogin(){
				uni.clearStorageSync()
				this.Goto('/pages/login/login');
			},
			is_u_state(){
				if(this.u_state == 4){
					this.Goto('/pages/authentication/non_real_name');
				}else{
					this.Goto('/pages/authentication/real_name?identity='+this.identity+'&nickname='+this.real_name);
				}
			
			},
			// 卡卷
			kajs(){
				this.Goto('/pages/profit/Xinka')
			},
			// 券包
			quansbaos(){
				this.Goto('/pages/personal_center/card_coupon2')
			},
			// 活动
			activits(){
				this.Goto('/pages/personal_center/Limited_activities')
			},
			// 银行卡
			yinhas(){
				if(this.u_state == 2){
					this.Goto('/pages/authentication/non_real_name');
				}else{
					this.Goto('/pages/card_bag/card_bag');
				}
			},
			// 联系客服
			lxkf(){
				// this.Goto('/pages/Last_page/Custome_service');
				this.Goto('/pages/Last_page/Custome_services');
			},
			// 修改密码
			moilrd(){
				this.Goto('/pages/Last_page/Change_password');
			},
			// 关于我们
			about(){
				this.Goto('/pages/personal_center/About_us')
			},
			// 去升级
			shengji(){
				this.Goto('/pages/rise_vip/rise_vip')
			}
		}
	}
</script>

<style>
	.kef_s {
		position: absolute;
		top: 870rpx;
		left: 598rpx;
		z-index: 9999;
		float: right;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #1678FF;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #1678FF;
		z-index: 999;
	}
	
	.head_content{
		width: 100%;
		height: 180rpx;
		background-color: #1678FF;
	}
	.logos{
		display: inline-block;
		width: 100rpx;
		height: 100rpx;
		padding-top: 30rpx;
		margin-left: 24rpx;
		float: left;
	}
	.user{
		display: inline-block;
		padding-top: 52rpx;
		margin-left: 25rpx;
	}
	.mine_shave{
		position: absolute;/* 
		width: 98rpx;
		height: 110rpx; */
		left: 598rpx;
		top: 60rpx;
	}
	.xianshi{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
	}
	.tubiao{
		display: inline-block;
		width: 48rpx;
		height: 48rpx;
		float: left;
		margin-left: 31rpx;
		margin-top: 26rpx;
	}
	.huodo{
		display: inline-block;
		margin-left: 29rpx;
		margin-top: 29rpx;
	}
	.tbs {
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		margin-left: 310rpx;
	}
	.putoa{
		width: 160rpx;
		height:70rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: rgba(249, 159, 0, 1);
		text-align: center;
		line-height: 70rpx;
		margin-left: -44rpx;
		font-size: 28rpx;
		margin-top: 66rpx;
	}
</style>
