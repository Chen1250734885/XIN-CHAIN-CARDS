<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<view class="grace-columns">
				<image src="../../static/sybj.png" mode="" style="width: 750rpx;height: 570rpx;"></image>
				<view style="z-index: 99;margin:0 auto;">
					<!-- 没有收益时显示 -->
					<view v-if="level_name!=='免费用户'">
						<view style="font-size:36rpx;font-weight:bold;color:rgba(255,255,255,1);margin-top: -500rpx;">收益</view>
						<view style="font-size:30rpx;color:rgba(255,255,255,1);margin-top: 30rpx;margin-left: 8rpx;">余额</view>
					</view>
					<!-- 有收益时显示 -->
					<view v-else>
						<view style="font-size:36rpx;font-weight:bold;color:rgba(255,255,255,1);margin-top: -500rpx;margin-left: 30rpx;">收益</view>
						<view style="margin-left: -10rpx;margin-top: 12rpx;">
							<image src="../../static2/tanhao.png" mode="" style="width: 32rpx;height: 32rpx;margin-top: 10rpx;transform: translateY(5rpx);"></image>
							<text style="font-size:30rpx;color:rgba(255,255,255,1);margin-left: 10rpx;">未得收益</text>

						</view>
					</view>
				</view>
				<!-- 余额 -->
				<view style="font-size:70rpx;font-weight:bold;color:rgba(255,255,255,1);z-index: 99;margin: -339rpx auto;">{{jine}}</view>
				<!-- 是否是vip -->
				<view class="tixiab" @tap="tixian(is_vip)">{{is_vip!==0? '提现':'升级'}}</view>
				<!-- 明细、消费过、新增 -->
				<view class="mxz grace-rows">
					<view class="grace-columns" @tap="minxi">
						<view class="daijihuo">
							<view style="font-size:26rpx;font-family:PingFang SC;font-weight:400;color:rgba(52,52,52,1);text-align: center;margin-top: 28rpx;">{{activateds}}</view>
							<view style="font-size:32rpx;font-family:PingFang SC;font-weight:400;color:rgba(52,52,52,1);text-align: center;">{{activated}}</view>
						</view>
					</view>
					<!-- 消费过 -->
					<view class="grace-columns">
						<view class="xiaofeiguo" @tap="tuig">
							<view style="font-size:26rpx;font-family:PingFang SC;font-weight:400;color:rgba(52,52,52,1);text-align: center;margin-top: 28rpx;">{{effectives}}</view>
							<view style="font-size:32rpx;font-family:PingFang SC;font-weight:400;color:rgba(52,52,52,1);text-align: center;">{{effective}}</view>
						</view>
					</view>
					<!-- 新增 -->
					<view class="grace-columns" @tap="xinzs">
						<view class="xinzeng">
							<view style="font-size:26rpx;font-family:PingFang SC;font-weight:400;color:rgba(52,52,52,1);text-align: center;margin-top: 28rpx;">{{todays}}</view>
							<view style="font-size:32rpx;font-family:PingFang SC;font-weight:400;color:rgba(52,52,52,1);text-align: center;">{{today}}</view>
						</view>
					</view>
				</view>
				<!-- 等级 -->
				<view class="dengji">
					<view style="display: flex;justify-content: flex-end;margin-top: 12rpx;">
						<text style="font-size: 22rpx;color: rgba(51, 51, 51, 1);">等衔：</text>
						<text style="font-size: 28rpx;font-weight:bold;color:rgba(255,96,0,1);margin-right: 41rpx;">{{level_name}}</text>
					</view>
					<view>
						<image v-if="level_name!=='免费用户'" src="../../static2/vipyishnag.png" mode="" style="width: 680rpx;height: 160rpx;margin-left: 10rpx;"></image>
						<image v-else src="../../static2/miafei.png" mode="" style="width: 680rpx;height: 160rpx;margin-left: 10rpx;"></image>
						
					</view>
					<view style="display: flex;justify-content:space-between;">
						<view style="margin-top: -20rpx;margin-left: 89rpx;">
							<text style="font-size: 22rpx;color: rgba(51, 51, 51, 1);">直推用户</text>
							<text style="font-size: 22rpx;color:rgba(255,96,0,1);">{{effective}}</text> 
							<!-- effective.substr(0,effective.length -1) -->
							<text v-if="level_name!=='免费用户'" style="font-size: 22rpx;color: rgba(51, 51, 51, 1);">人(VIP<text style="font-size: 22rpx;color:rgba(255,96,0,1);">{{is_vips}}</text>人)</text>
							<text v-else style="font-size: 22rpx;color: rgba(51, 51, 51, 1);">人(使用<text style="font-size: 22rpx;color:rgba(255,96,0,1);">{{is_vips}}</text>人)</text>
						</view>
						<view style="margin-top: -20rpx;margin-right: 90rpx;">
							<text style="font-size: 22rpx;color: rgba(51, 51, 51, 1);">一刷通<text style="font-size: 22rpx;color:rgba(255,96,0,1);">{{card_num}}</text>张</text>
						</view>
					</view>
				</view>
				<view v-show="level_name!=='免费用户'">
				<!-- 未继续使用 -->
				<view class="wjxsy" @tap="jxshiy">
					<view style="width: 10rpx;height: 100rpx;background-color: rgba(46, 157, 7, 1);display: inline-block;float: left;"></view>
					<text class="zhihao">未继续使用</text>
					<image src="../../static2/jianto.png" mode="" class="jiantos"></image>
				</view>
				<!-- 分润 -->
				<view class="wjxsy_2" @tap="fenrun">
					<view style="width: 10rpx;height: 100rpx;background-color: rgba(227, 181, 20, 1);display: inline-block;float: left;"></view>
					<text class="zhihao">分润收益明细</text>
					<image src="../../static2/jianto.png" mode="" class="jiantos"></image>
				</view>
				<!-- 佣金 -->
				<view class="wjxsy_2" @tap="tuij">
					<view style="width: 10rpx;height: 100rpx;background-color: rgba(227, 64, 20, 1);display: inline-block;float: left;"></view>
					<text class="zhihao">推荐佣金</text>
					<image src="../../static2/jianto.png" mode="" class="jiantos"></image>
				</view>
				</view>
				<!-- 一刷通 -->
				<view v-show="level_name=='免费用户'" style="margin-top: 10rpx;margin-bottom: 110rpx;" @tap="mianfyh">
					<image src="../../static2/bannars.png" mode="" style="width: 750rpx;height: 300rpx;"></image>
				</view>
				<scroll-view v-show="level_name!=='免费用户'"  class="grace-scroll-x" scroll-x="true" scroll-left="120" scroll-with-animation="true">
					<view v-for="(item,index) in card_data" :key="index" style="display: inline-block;margin-bottom: 35rpx;">
						<image :src="item.cc_img_url" mode="" style="width: 524rpx;height: 270rpx;margin: 30rpx 43rpx;"></image>
				
				<view class="covse" v-show="item.cc_id" v-if="item.cc_state==3" >
					<text style="font-size: 80rpx;color: #FFFFFF;line-height: 270rpx;" @tap="chehui">撤回</text>
				</view>		
						
						<view class="bhan" v-show="item.cc_state!==2" v-else>
							<view class="bianhao">{{'NO.'+item.cc_encoding}}</view>
							<view class="bianx" v-show="item.cc_state!==0">
								<view class="btn" style="margin-right: 18rpx;" @tap="bianxian(item.cc_id)">变现</view>
								<view class="btn" @tap="use_sy(item.cc_encoding,item.cc_id)">使用</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<!-- 确认变现弹框 -->
			<uni-popup ref="popup" type="center" style="z-index: 9999;">
				<view class="tabk">
					<view class="tabk_b">一刷通变现</view>
					<view class="tabk_x">确认将此卡交易变现</view>
					<view class="tabk_y">折扣价{{sell_money}}元</view>
					<view class="tabk_k">可在收益页面查看余额后提现</view>
					<view class="bnts">
						<view class="qr_s" @tap="qr">确认</view>
						<view class="qx_s" @tap="qx">取消</view>
					</view>
				</view>
			</uni-popup>
			<!-- 客服帮助 -->
			<view class="kef_s" @tap="qiaozhuandaokehu">
				<image :style="'left:'+moveX+'px;top:'+moveY+'px'" @touchstart="drag_start" @touchmove.prevent="drag_hmove" src="../../static2/kefs.png"
				 mode="" style="width: 152rpx;height:79rpx;transform: translate(4rpx,4rpx);"></image>
			</view>
		</view>
	</gracePage>

</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import dnIcon from "../../components/dn-icon_1.2/component/dn-icon/dn-icon.vue";
	import {myMixins} from "../../components/myMixins/myMixins.js"
	export default {
		mixins: [myMixins],
		data() {
			return {
				shouyi_name: false,
				jine: 0,
				is_vip: '',
				activated: '',
				activateds: '',
				effective: '', // 直推用户人数
				effectives: '',
				today: '',
				todays: '',
				card_data: [],
				level_name: '', //等级
				performance_num_str: '', //绩效
				is_vips: '',//VIP人数
				card_num: '',//一刷通数量
				sell_money: '',
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
		onShow: function() {
			this.loadData()
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
					url: '/pages/Last_page/Custome_service'
				})
			},
			// 获取页面数据
			loadData(){
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=user_earnings', {}, {},
					function(res) {
						console.log(res);
						vm.is_vip = res.data.ul_level
						vm.is_vips = res.data.assess_vip_num
						vm.card_num = res.data.card_num
						vm.activated = res.data.await_activate_data.num
						vm.activateds = res.data.await_activate_data.str
						vm.effective = res.data.assess_recommend_num
						vm.effectives = res.data.effective_use_data.str
						vm.today = res.data.today_add_user_data.num
						vm.todays = res.data.today_add_user_data.str
						vm.level_name = res.data.level_name
						vm.performance_num_str = res.data.performance_num_str
						if (res.data.ul_beans == 0) {
							vm.shouyi_name = false;
							vm.jine = res.data.ul_beans;
						} else {
							vm.shouyi_name = true;
							vm.jine = res.data.ul_beans;
						}
						var card_list = res.data.card_data
						var card_data = [];
						for (var i = 0; i < card_list.length; i++) {
							card_data.push(card_list[i])
						}
						vm.card_data = card_data
				
					}
				);
			},
			// 待激活用户
			minxi() {
				this.Goto('/pages/profit/Details_activated')
			},
			// 消费过用户
			tuig() {
				this.Goto('/pages/profit/Consumed')
			},
			// 今日新增
			xinzs() {
				this.Goto('/pages/profit/New_today')
			},
			// 未继续使用
			jxshiy() {
				this.Goto('/pages/profit/Continued_use')
			},
			//分润明细
			fenrun() {
				this.Goto('/pages/profit/income_details')
			},
			// 推荐佣金
			tuij() {
				this.Goto('/pages/profit/Xinka')
			},
			// 一刷通使用
			use_sy(coding, card_id) {
				this.Goto('/pages/profit/Use_file?card_id=' + card_id + '&coding=' + coding)
			},
			// 提现或升级
			tixian(vip) {
				if (vip !== 0) {
					this.Goto('/pages/profit/cash_withdrawal?jine='+this.jine)
				} else {
					this.Goto('/pages/rise_vip/rise_vip')
				}
			},
			// 免费用户banner点击跳转升级页
			mianfyh(){
				this.Goto('/pages/rise_vip/rise_vip')
			},
			// 变现按钮
			bianxian(card_id) {
				console.log(card_id);
				this.cc_id = card_id
				this.id = card_id
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=sell_money', {
						card_id: card_id
					}, {},
					function(res) {
						if (res.code == 200) {
							vm.sell_money = res.data.sell_money
							vm.$refs.popup.open()
						}
					}
				)
			
			},
			// 变现确认按钮
			qr() {
				var cc_id = this.cc_id;
				console.log(cc_id);
			
				var vm = this
				// vm.is_cover = true
				vm.$refs.popup.close()
				vm.req.post(
					vm.lochost + '/index/index?method=apply_sell', {
						card_id: vm.cc_id
					}, {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							uni.redirectTo({
								url: '/pages/profit/profit'
							})
						}
					}
				)
			},
			// 变现取消按钮
			qx() {
				this.$refs.popup.close()
			},

			// 免费用户
			yinchans() {
				var vm = this;
				vm.yingchang = true;
				vm.req.post(
					vm.lochost + '/mytrunk/userapi/getuser', {}, {},
					function(res) {
						vm.zhi = res.data.child[10000].zhi;
						vm.jian = res.data.child[10000].jian;

					})
			},
			yinchan() {
				this.yingchang = false;
				this.zhi = '*';
				this.jian = '*'
			},
			// VIP
			vip_yin() {
				var vm = this;
				vm.yingchan = true;
				vm.req.post(
					vm.lochost + '/mytrunk/userapi/getuser', {}, {},
					function(res) {
						vm.vip_zhi = res.data.child[9999].zhi;
						vm.vip_jian = res.data.child[9999].jian;
					})

			},
			vip_yinc() {
				this.yingchan = false;
				this.vip_zhi = '*';
				this.vip_jian = '*'
			},
			// 代理
			dl_yin() {
				var vm = this;
				vm.yingcha = true;
				vm.req.post(
					vm.lochost + '/mytrunk/userapi/getuser', {}, {},
					function(res) {
						vm.daili_zhi = res.data.child[9998].zhi;
						vm.daili_jian = res.data.child[9998].jian;
					})

			},
			dl_yins() {
				this.yingcha = false;
				this.daili_zhi = '*';
				this.daili_jian = '*'
			},
			// 合伙人
			hehuo_yin() {
				var vm = this;
				vm.yingc = true;
				vm.req.post(
					vm.lochost + '/mytrunk/userapi/getuser', {}, {},
					function(res) {
						vm.hehuo_zhi = res.data.child[9992].zhi;
						vm.hehuo_jian = res.data.child[9992].jian
					})

			},
			hehuo_yint() {
				this.yingc = false;
				this.hehuo_zhi = '*';
				this.hehuo_jian = '*'
			}

		},
		components: {
			gracePage,
			dnIcon
		}
	}
</script>

<style>
	.kef_s {
		position: absolute;
		top: 350rpx;
		left: 598rpx;
		z-index: 9999;
		float: right;
	}
	.tixiab {
		width: 160rpx;
		height: 50rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		font-size: 24rpx;
		color: rgba(249, 129, 0, 1);
		z-index: 999;
		margin: 360rpx auto;
		line-height: 50rpx;
		text-align: center;
	}

	.mxz {
		width: 702rpx;
		height: 200rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10rpx;
		margin-top: -289rpx;
		z-index: 9999;
		margin-left: 24rpx;
	}

	.daijihuo {
		width: 180rpx;
		height: 130rpx;
		background: linear-gradient(54deg, rgba(255, 186, 0, 1) 0%, rgba(255, 252, 0, 1) 100%);
		border-radius: 10rpx;
		margin-top: 35rpx;
		margin-left: 41rpx;
	}

	.xiaofeiguo {
		width: 180rpx;
		height: 130rpx;
		background: linear-gradient(54deg, rgba(0, 144, 255, 1) 0%, rgba(0, 210, 255, 1) 100%);
		border-radius: 10rpx;
		margin-top: 35rpx;
		margin-left: 41rpx;
	}

	.xinzeng {
		width: 180rpx;
		height: 130rpx;
		background: linear-gradient(54deg, rgba(0, 228, 220, 1) 0%, rgba(0, 240, 130, 1) 100%);
		border-radius: 10rpx;
		margin-top: 35rpx;
		margin-left: 41rpx;
	}

	.wjxsy {
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}

	.wjxsy_2 {
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}

	.zhihao {
		font-size: 30rpx;
		line-height: 100rpx;
		margin-left: 13rpx;
	}

	.jiantos {
		width: 20rpx;
		height: 34rpx;
		float: right;
		margin-top: 35rpx;
		margin-right: 24rpx;
	}


	.btuns {
		width: 180rpx;
		height: 100rpx;
		background: linear-gradient(54deg, rgba(250, 104, 71, 1) 0%, rgba(250, 177, 51, 1) 100%);
		border-radius: 10px;
		margin-top: -15rpx;
		border: none;
	}

	.tes {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.btun {
		width: 180rpx;
		height: 100rpx;
		background: linear-gradient(54deg, rgba(255, 186, 0, 1) 0%, rgba(255, 252, 0, 1) 100%);
		border-radius: 10px;
		margin-top: -15rpx;
		border: none;
	}

	.btunt {
		width: 180rpx;
		height: 100rpx;
		background: linear-gradient(54deg, rgba(0, 228, 220, 1) 0%, rgba(0, 240, 130, 1) 100%);
		border-radius: 10px;
		margin-top: -15rpx;
		border: none;
	}

	.daili {
		margin-top: 20rpx;
	}

	.mianfei {
		width: 750rpx;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		line-height: 100rpx;
	}

	.yh {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-left: 24rpx;
	}

	.zt {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		margin-left: 77rpx;
	}

	.zt_2 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		margin-left: 162rpx;
	}

	.zt_3 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		margin-left: 110rpx;
	}

	.zts {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		margin-left: 129rpx;
	}

	.dns {
		width: 40rpx;
		height: 40rpx;
		float: right;
		margin-right: 22rpx;
		margin-top: 30rpx;
	}

	.vip_s {
		width: 750rpx;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		line-height: 100rpx;
		margin-top: 8rpx;
	}

	.buan {
		/* width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF; */
		margin-top: 20rpx;
	}

	.bhan {
		display: flex;
		justify-content: space-between;
	}

	.bianhao {
		float: left;
		margin-top: -45rpx;
		z-index: 99;
		color: rgba(250, 146, 52, 1);
		font-size: 29rpx;
		margin-left: 120rpx;
		transform: translate(-60rpx, -40rpx);
	}

	.bianx {
		margin-right: 30rpx;
		transform: translateX(-30rpx);
	}

	.btn {
		display: inline-block;
		/* float: right; */
		width: 110rpx;
		height: 35rpx;
		font-size: 22rpx;
		line-height: 35rpx;
		transform: translateY(-80rpx);
		/* background-color: #000000; */
		color: #FFFFFF;
		border: 1rpx solid #FFFFFF;
		text-align: center;
		border-radius: 10rpx;
		/* margin-right: 18rpx; */
	}

	/* .vuan_b{
		width: 200rpx;
		height: 70rpx;
		background:rgba(22,120,255,1);
		box-shadow:0px 5px 1px 0px rgba(0,97,231,0.3);
		border-radius:35px;
		font-size:32rpx;color:rgba(255,255,255,1);line-height: 70rpx;
		transform: translateY(-20rpx);
	} */
	.dengji {
		width: 702rpx;
		height: 240rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		margin-left: 24rpx;
	}

	.xiaoji {
		position: absolute;
		top: 820rpx;
		left: 163rpx;
		width: 320rpx;
		height: 40rpx;
		border-radius: 20rpx;
		border: 1px solid rgba(255, 255, 255, 1);
		background: linear-gradient(90deg, rgba(255, 40, 106, 1) 0%, rgba(255, 199, 80, 1) 100%);
		text-align: center;
		line-height: 40rpx;
		color: #FFFFFF;
		z-index: 999;
	}
	.tabk {
		width: 540rpx;
		height: 340rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	
	}
	
	.tabk_b {
		font-size: 32rpx;
		margin-left: 180rpx;
		transform: translateY(40rpx);
	}
	
	.tabk_x {
		margin-top: 10rpx;
		font-size: 32rpx;
		margin-left: 120rpx;
		transform: translateY(40rpx);
	}
	
	.tabk_y {
		font-size: 32rpx;
		margin-left: 180rpx;
		transform: translateY(40rpx);
	}
	
	.tabk_k {
		font-size: 22rpx;
		margin-left: 120rpx;
		transform: translateY(40rpx);
		color: rgba(154, 154, 154, 1);
		margin-top: 21rpx;
	}
	
	.bnts {
		display: flex;
		justify-content: space-between;
		margin-top: 82rpx;
	}
	
	.qr_s {
		width: 270rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: rgba(80, 160, 254, 1);
		font-size: 34rpx;
		color: #FFFFFF;
		border-radius: 0 0 0 10rpx;
		text-align: center;
	}
	
	.qx_s {
		width: 270rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: rgba(80, 187, 254, 1);
		font-size: 34rpx;
		color: #FFFFFF;
		border-radius: 0 0 10rpx 0;
		text-align: center;
	}
	.covse {
		/* position:absolute;left:0rpx;top:0rpx; */
		margin-top: -269rpx;
		background: rgba(0, 0, 0, 1);
		width: 520rpx;
		/*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
		height: 270rpx;
		filter: alpha(opacity=60);
		/*设置透明度为60%*/
		opacity: 0.5;
		/*非IE浏览器下设置透明度为60%*/
		/* display: none; */
		transform: translateY(-40rpx);
		margin-left: 45rpx;
		z-Index: 9;
		border-radius: 20rpx;
		text-align: center;
	}
</style>


<!-- .grace-flex // 声明 flex
.grace-rows // flex 横向
.grace-columns  //flex 竖向
.grace-wrap //flex 自动换行
.grace-nowrap //flex 横向不换行
.grace-space-between //flex 横向两端对齐
.grace-flex-end //flex 横向右对齐
.grace-flex-center  //flex 横向居中
.grace-flex-top  //flex 垂直顶端对齐
.grace-flex-vcenter //flex 垂直居中对齐
.grace-flex-bottom //flex 垂直底部对齐
.grace-no-scale //元素不缩放 -->
