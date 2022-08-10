<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<!-- 余额 -->
			<view style="background-image: url(../../static/beij.png);background-size: contain;" class="beij">
					<view class="ye ">余额</view>
					<view class="yes">
						<text >{{residue}}</text>
					</view>
			</view>

			<!-- 银行卡 -->
			<view @tap="showDialog1" style="width:750rpx;height:80rpx;background:rgba(255,255,255,1);line-height: 80rpx;margin-top: 45rpx;">
				<view class="grace-rows" style="position: relative;">
					<image :src="bank_icon_url" style="position: relative;margin-left: 30rpx; width: 48rpx;height: 48rpx;margin-top: 17rpx;"></image>
					<text style="margin-left: 30rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">{{ shoukuanname }}</text>
					<text style="font-size:30rpx;font-weight:400;color:rgba(0, 0, 0, 1);">({{ weihao }})</text>
					<image src="../../static/jiantou.png" style="position: relative;top: 27rpx; margin-left: 180rpx; width: 15rpx;height: 26rpx;"></image>
				</view>
			</view>

			<view style="position: relative; top: 10rpx; width:750rpx;height:160rpx;background:rgba(255,255,255,1);">
				<view class="shuli">提现数量:</view>
				<view  class="grace-rows">
					<text class="fuhao">￥</text>
					<input v-model="usable" type="number" placeholder='最大可提现数量为10400' placeholder-style="font-size:24rpx;"class="jinen"/>
					<view @tap="quanbutixian" style="position: relative;top: 45rpx;left: 25rpx; width:150rpx;height:40rpx;font-size:24rpx;font-weight:400;color:rgba(22,120,255,1)">全部提现</view>
				</view>
				<view style="position: relative;left: 30rpx;top: 2rpx; width:702rpx;height:1rpx;background:rgba(241,241,241,1);"></view>
				<view style="position: relative;top: 25rpx;left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(255,30,0,1);margin-right: 35rpx;">温馨提示:提现数量需为100的整数倍，手续费为5%，请在每个工作日的10:00至21:00之间提现,周末提现时间为12:00至21:00</view>
			</view>

			<view style="margin-top: 40rpx; margin-left: 30rpx;">
				<view v-for="(item,index) in yaoqiu" :key="index" style="width: 750rpx; margin-top: 10rpx; font-size:26rpx;font-weight:400;color:rgba(255,30,0,1);">{{ item }}</view>
			</view>
			<button @tap="sumbit" style="margin-top: 199rpx; width:550rpx;height:96rpx;background:rgba(22,120,255,1);border-radius:5rpx;font-size:32rpx;font-weight:500;color:rgba(255,255,255,1);line-height: 96rpx;">提现</button>
			
			<view class="wqann" @tap="Goto('/pages/profit/withdrawals_record')">
				<image :style="'left:'+moveX+'px;top:'+moveY+'px'" src="../../static2/tixianjilu.png" @touchstart="drag_start"
				 @touchmove.prevent="drag_hmove" mode="aspectFit" style="width: 170rpx;height: 170rpx;"></image>
			</view>
			
			<!-- <view @tap="Goto('/pages/profit/withdrawals_record')" style="margin: 20rpx auto; width:130rpx;height:40rpx;font-size:26rpx;font-weight:500;color:rgba(153,153,153,1);">查看记录></view> -->
			<!-- 支付账户遮罩 -->
			<graceBottomDialog :show="show1" @closeDialog="closeDialog1">
				<view slot="btns">
					<view style="height: 60rpx;line-height: 60rpx;">
						<view class="grace-flex-center">
							<text style="font-size:25rpx;font-weight:400;color:rgba(0,0,0,1);">请选择提现到帐储蓄卡</text>
							<view style="position: relative;left: 230rpx;top: 5rpx;" @tap="closeDialog1">
								<image src="../../static/quxiao.png" style="width: 30rpx;height: 30rpx;"></image>
							</view>
						</view>
					</view>
				</view>
				<view slot="content">
					<scroll-view class="grace-scroll-y" style="height: 600rpx;">
						<view @tap="qiehuanshoukuan(item)" v-for="(item,index) in shoukuanzhanghu_list" :key="index" class="grace-rows grace-flex-vcenter"
						 style="height: 80rpx;border-bottom: 2rpx solid #F7F7F7; ">
							<image :src="item.bank_icon_color" style="width: 38rpx;height: 38rpx;margin-left: 30rpx;"></image>
							<text style="margin-left: 25rpx; font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">{{item.bank_name}}({{item.bc_bank_number_c}})</text>
						</view>
						<view @tap="Goto('/pages/add_savings_card/add_savings_card')" class="grace-rows grace-flex-vcenter" style="height: 80rpx;">
							<image src="../../static/tianjia.png" style="width: 38rpx;height: 38rpx;margin-left: 30rpx;"></image>
							<text style="margin-left: 25rpx; font-size:30rpx;font-weight:400;color:rgba(0,0,0,1);">添加储蓄卡</text>
						</view>
					</scroll-view>
				</view>
			</graceBottomDialog>
			<!-- 提现弹框 -->
			<uni-popup  ref="popup" type="center">
				<view class="popup">
					<view class="tub">!</view>
					<text style="font-size: 36rpx;color: #333333; line-height:290rpx;margin-left: 105rpx;">{{remind_str}}<text style="font-size: 36rpx;color: rgba(248, 90, 5, 1);">{{remind_num}}</text></text>
					
					<view class="explas">{{remind_explain.substring(0,14)}}</view>
					<view class="expla">{{remind_explain.substring(14)}}</view>
					<view style="display: inline-block;">
						<button class="btn1" @tap="close">我知道了</button>
						<!-- <button class="btn2" @tap="renzhens">前往认证</button> -->
					</view>
				</view>
			</uni-popup>
			<!-- 确认提现弹框 -->
			<uni-popup ref="popups" type="center">
				<view class="popups">
					<view class="tubs">确认提现</view>
					<text style="font-size: 20rpx;color: #333333; ;margin-left: 40rpx;line-height: 209rpx;">请到{{shoukuanname}}({{ weihao }})查<text style="position: relative;top: 30rpx;right: 220rpx;">收</text></text>
					
					<view class="daozhangs">2小时内到账</view>
					<view class="dianji">
						<text class="close" @tap="closes">取消</text>
						<text class="qr" @tap="sumbqr">确认</text>
					</view>
				</view>
			</uni-popup>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				bank_icon_url: '',
				show1: false,
				shoukuanname: '暂无收款账户',
				weihao: '',
				shoukuanzhanghu_list: [],
				yue: '0',
				input_yue: '',
				yaoqiu: '',
				min: 0,
				card_id: '',
				remind_str: '',
				remind_num: '',
				remind_explain: '',
				residue: '',
				usable: '',
				start: [0, 0],
				moveY: 0,
				moveX: 0,
				windowWidth: '',
				windowHeight: '',
			}
		},
		onLoad(opt) {
			this.residue = opt.jine
		},
		onShow: function() {
			this.shuaxin();
			this.quanbutixian()
		const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 提现记录按钮拖拽功能
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
			// 获取数据
			shuaxin() {
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=savings_card_list', {}, {},
					function(res) {
						console.log(res);
						vm.shoukuanzhanghu_list = res.data;
						// vm.yue=res.data.yue;
						vm.shoukuanname = vm.shoukuanzhanghu_list[0].bank_name;
						vm.bank_icon_url = vm.shoukuanzhanghu_list[0].bank_icon_color;
						vm.weihao = vm.shoukuanzhanghu_list[0].bc_bank_number_c;
						vm.card_id=vm.shoukuanzhanghu_list[0].bc_id;
						// vm.yaoqiu=res.data.yaoqiu;
						// vm.min=res.data.min;
						
					}
					
				)
			},
			//提现按钮
			sumbit() {
				this.$refs.popups.open()
			},
			// 确认提现按钮
			sumbqr(){
				if(this.usable<100){
					uni.showToast({
						title:'请输入100的整数倍',
						icon:'none'
					})
					this.$refs.popups.close()
				}else{
					var vm = this;
					vm.req.mypost(
						vm.lochost + '/index/index?method=beans_withdrawal', {
							number: vm.usable,
							bc_id: vm.card_id
						},
						function(res){
							if(res.code == 200){
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
								this.$refs.popups.close()
								this.quanbutixian()
							}else{
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
								vm.$refs.popups.close()
							}
							
						}
					)
				}
				
			},
			// 全部提现按钮
			quanbutixian() {
				// this.input_yue = this.yue;
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=all_beans_withdrawal', {}, {},
					function(res) {
						console.log(res);
						vm.remind_str = res.data.remind_str
						vm.remind_num = res.data.remind_num
						vm.remind_explain = res.data.remind_explain
						vm.usable = res.data.usable
						if(res.data.is_remind === 1){
							vm.$refs.popup.open()
						}
						
					}
				)
			},
			// 切换收款账户
			qiehuanshoukuan(item) {
				this.card_id = item.id;
				this.shoukuanname = item.name;
				this.weihao = item.bc_bank_number.last;
				this.closeDialog1();
			},
			showDialog1() {
				this.show1 = true;
			},
			closeDialog1() {
				this.show1 = false;
			},
			close() {
				this.$refs.popup.close()
			},
			closes(){
				this.$refs.popups.close()
			}
		},
		components: {
			gracePage,
			graceBottomDialog,
			uniPopup
		}
	}
</script>

<style>
	.beij {
		flex: auto;
		width: 300rpx ;
		height: 300rpx ;
		margin-top: 40rpx;
		transform: translateX(225rpx);
		/* text-align: center; */
	}

	.ye {
		float: right;
		margin-top: 96rpx;
		transform: translateX(-110rpx);
		font-size: 32rpx;
	}

	.yes {
		display: flex;
		line-height: 300rpx;
		transform: translate(40rpx,20rpx);
		font-size: 45rpx;
		font-weight: bold;
		color: rgba(80, 160, 254, 1);
		justify-content: center;
	}
	.shuli{
		font-size: 24rpx;
		transform: translateY(25rpx);
		margin-left: 44rpx;
	}
	.jinen{
		width: 500rpx;
		height: 90rpx; 
		font-size:30rpx;
		color:rgba(52, 52, 52, 1);
		margin-top: 25rpx;
		margin-left: 50rpx;
	}
	.fuhao{
		margin-top: 35rpx;
		transform: translateX(40rpx);
		font-size: 48rpx;
	}
	.tub {
		position: fixed;
		width: 53rpx;
		height: 53rpx;
		border-radius: 50rpx;
		background-color: #F75A04;
		margin-left: 244rpx;
		margin-top: 30rpx;
		line-height: 53rpx;
		color: #FFFFFF;
		font-size: 48rpx;
		text-align: center;
	}
	.tubs {
		position: fixed;
		margin-left: 190rpx;
		margin-top: 30rpx;
		font-weight: bold;
		color: #333333;
		font-size: 38rpx;
		text-align: center;
	}
	.popup {
		width: 540rpx;
		height: 380rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.popups {
		width: 490rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.btn1 {
		width: 540rpx;
		height: 80rpx;
		background-color: #61A2FC;
		margin-top: 35rpx;
		margin-left: 0;
		margin-right: 0.1rpx;
		border-radius:  0  0 10rpx 10rpx;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		display: inline-block;
	}
	.daozhangs{
		font-size: 15rpx;
		color: rgba(154,154,154,1);
		line-height:50rpx;
		margin-top: -60rpx;
		margin-left: 180rpx;
		}
		.dianji{
			margin-top: 40rpx;
			margin-left: 70rpx;
		}
		.close{
			font-size: 30rpx;
		}
		.qr{
			font-size: 30rpx;
			margin-left: 240rpx;
		}
	.btn2 {
		width: 269rpx;
		height: 70rpx;
		background-color: #1678FF;
		margin-top: -20rpx;
		/* margin-right: -1rpx; */
		border-radius: 0;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		display: inline-block;
	}
	.expla{
		font-size: 28rpx;
		color:rgba(154,154,154,1);
		margin-left:160rpx;
		/* margin-top: -100rpx; */
		margin-right: 82rpx;
	}
	.explas{
		font-size: 28rpx;
		color:rgba(154,154,154,1);
		margin-left: 70rpx;
		margin-top: -100rpx;
		margin-right: 82rpx;
	}
	.wqann {
		position: relative;
		margin-left: 550rpx;
		margin-top: 20rpx;
		z-index: 99;
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
