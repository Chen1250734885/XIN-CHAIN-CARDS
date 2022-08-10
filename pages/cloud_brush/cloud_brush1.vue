<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<!-- 进度条 -->
			<view class="grace-space-between" style="margin-top: 16rpx;padding: 0 24rpx;">
				<view class="grace-flex-center" style="background-image:url(../../static/guidance_bg.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">1.支付信息</text>
				</view>
				<view class="grace-flex-center" style="background-image:url(../../static/cloud_brush_danghang1.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">2.收款信息</text>
				</view>
			</view>

			<view style="margin: 31rpx auto;  width:702rpx;height:400rpx;box-shadow:0px 2rpx 6rpx 0px rgba(129,78,171,0.3);border-radius:10rpx;">
				<view style="width:702rpx;height:95rpx;background:rgba(255,255,255,1);border-radius: 20rpx 20rpx 0rpx 0rpx;">
					<text style="margin-left: 15rpx; line-height: 90rpx; font-size:32rpx;font-weight:bold;color:#1678FF;">支付信息|<text
						 style="color: #FC5F00;">P</text>ayment <text style="color: #FC5F00;padding-left: 10rpx;">I</text>nformation</text>
				</view>

				<view class="grace-rows grace-flex-vcenter" style="margin:5rpx 0; width:702rpx;height:150rpx;background:rgba(255,255,255,1);"
				 @tap="showDialog1">
					<text style="margin-left: 19rpx;font-size:40rpx;font-weight:400;color:rgba(0,0,0,1);">支付银行:</text>
					<view class="grace-columns" style="text-align: center;">
						<view>
							<text style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">{{zhanghuneme}}</text>
							<image src="../../static/jiantou.png" style="width: 15rpx;height: 25rpx;position: relative;left: 120rpx;"></image>
						</view>
						<view style="width:500rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 13rpx;"></view>
					</view>
				</view>

				<!-- <view class="grace-rows grace-flex-vcenter" style="margin:5rpx 0; width:702rpx;height:105rpx;background:rgba(255,255,255,1);border-radius: 0rpx 0rpx 20rpx 20rpx ;"
				 @tap="showDialog2">
					<text style="margin-left: 19rpx;font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">消费通道:</text>
					<view class="grace-columns" style="text-align: center;">
						<view>
							<text style="font-size:25rpx;font-weight:400;color:rgba(51,51,51,1);">{{tongdaoname}}</text>
							<image src="../../static/jiantou.png" style="width: 15rpx;height: 25rpx;position: relative;left: 120rpx;"></image>
						</view>
						<view style="width:549rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 13rpx;"></view>
					</view>
				</view> -->

				<view class="grace-rows grace-flex-vcenter" style="margin:5rpx 0; width:702rpx;height:150rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 19rpx;font-size:40rpx;font-weight:400;color:rgba(0,0,0,1);">消费金额:</text>
					<view class="grace-columns" style="text-align: center;">
						<view class="grace-flex-center">
							<text v-if="jinfu" style="font-size:30rpx;font-weight:400;color:rgba(252,95,0,1);">￥</text>
							<input @focus="jfs" @blur="sqjf" @input="diyongquan" v-model="pay_money" type="number" placeholder="请输入支付金额"
							 placeholder-style="font-size: 26rpx;" style="width: 210rpx;" />
						</view>
						<view style="width:500rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 10rpx;"></view>
					</view>
				</view>

				<!-- 	<view class="grace-rows grace-flex-vcenter" style="margin:5rpx 0; width:702rpx;height:105rpx;background:rgba(255,255,255,1);" @tap="xuanzediyong">
					<text style="margin-left: 19rpx;font-size:32rpx;font-weight:400;color:rgba(0,0,0,1);">手续费抵用券:</text>
					<view class="grace-columns" style="text-align: center;">
						<view style="position: relative;">
							<text style="font-size:25rpx;font-weight:400;" :style="{color:coupon_id===''?'rgba(153,153,153,1)':'rgba(218,28,30,1)'}">{{coupon_id===''?'本次可抵扣'+max+'元，请选择抵用券':'-'+max+'（已抵扣）'}}</text>
							<image src="../../static/jiantou.png" style=" width: 15rpx;height: 25rpx;position: absolute;left: 430rpx;"></image>
						</view>
						<view style="width:475rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 13rpx;"></view>
					</view>
				</view> -->
			</view>

			<button style="margin-top: 150rpx; width:500rpx;height:90rpx;background:#1678FF;box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;"
			 @tap="xiayibu"><text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">下一步</text></button>

			<view class="wqann" @tap="Goto('/pages/credit_card_record/credit_card_record')">
				<image :style="'left:'+moveX+'px;top:'+moveY+'px'" src="../../static/yunshuajilu.png" @touchstart="drag_start"
				 @touchmove.prevent="drag_hmove" mode="aspectFit" style="width: 170rpx;height: 170rpx;"></image>
			</view>

			<!-- <image @tap="Goto('/pages/credit_card_record/credit_card_record')" src="../../static/yunshuajilu.png" style="width:170rpx;height: 170rpx;position: relative;margin-left: 550rpx;margin-top:20rpx;"></image> -->

			<!-- 记录 -->
			<!-- <view style="font-size: 24rpx;text-align: center;margin-top: 2rpx;">云刷记录</view> -->
			<view style="text-align: center;font-size: 24rpx;color: rgba(252,95,0,1);;">
				<text>如果信用卡几分钟内未扣款，说明消费失败请更换通道重刷</text>
			</view>
			<view style="width: 750rpx;height: 2rpx;background-color: #FFFFFF;margin: 10rpx 0;"></view>
			<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="jiazai()" style="margin-left: 20rpx;margin-bottom: 10rpx;">
				<view v-for="(item,index) in cloud_brush_list" :key="index" @tap="Goto('/pages/transaction_details/transaction_details?id='+item.id)"
				 style="margin-top: 20rpx; width:713rpx;height:170rpx;background:#FFFFFF;box-shadow:0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.06);border-radius:10rpx;">
					<view class="grace-space-between" style="margin: 0 24rpx;">
						<view style="margin-top: 15rpx;">
							<image src="../../static/credit_card_record_shijian.png" style="position: relative;top: 5rpx; width: 26rpx;height: 26rpx;"></image>
							<text style="margin-left: 10rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);">{{ item.show_time }}</text>
						</view>
						<view style="margin-top: 15rpx;">
							<text style="font-size:25rpx;font-weight:400;" :style="{color:item.show_status===2?'rgba(35,183,20,1)':item.show_status===1?'rgba(247,148,7,1)':item.show_status===3?'rgba(255, 0, 0, 255)':'rgba(85, 85, 85, 255)'}">{{ item.show_status==3?'交易失败': item.show_status==2?'交易成功':item.show_status==1?'交易中':''}}</text>
							<image src="../../static/jiantou.png" style="margin-left: 10rpx; width: 10rpx;height: 24rpx;"></image>
						</view>
					</view>
					<!-- 有失败原因时显示 -->
					<view v-if="item.show_status==3" style="display: flex;justify-content: space-between;">
						<view>
							<view class="grace-rows" style="margin-left: 25rpx;margin-top: 5rpx;">
								<image src="../../static/credit_card_record_zhi.png" style="width: 32rpx;height: 32rpx;"></image>
								<view style="margin-left: 5rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_pay_name}}({{item.pd_bank_card_num.slice(12)}})</view>
							</view>
							<view class="grace-rows" style="margin-left: 25rpx; margin-top: 5rpx;">
								<image src="../../static/credit_card_record_shou.png" style="width: 32rpx;height: 32rpx;"></image>
								<view style="margin-left: 10rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_withdraw_name}}({{item.pd_card_num.slice(15)}})</view>
							</view>
							<view style="font-size: 24rpx;color: rgba(204, 42, 14, 1);margin-left: 25rpx;">{{item.pd_remake_msg}}</view>
						</view>
						<view class="grace-rows" style="margin-top:35rpx;margin-right: 20rpx;">
							<view style="font-size:50rpx;font-weight:400;color:rgba(48,48,48,1);">{{ item.pd_money }}</view>
							<view style="margin-top: 20rpx; font-size: 30rpx;">元</view>
						</view>
					</view>
					<!-- 无失败原因时显示 -->
					<view v-else style="display: flex;justify-content: space-between;">
						<view>
							<view class="grace-rows" style="margin-left: 25rpx;margin-top: 15rpx;">
								<image src="../../static/credit_card_record_zhi.png" style="width: 32rpx;height: 32rpx;"></image>
								<view style="margin-left: 5rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_pay_name}}({{item.pd_bank_card_num.slice(12)}})</view>
							</view>
							<view class="grace-rows" style="margin-left: 25rpx; margin-top: 10rpx;">
								<image src="../../static/credit_card_record_shou.png" style="width: 32rpx;height: 32rpx;"></image>
								<view style="margin-left: 10rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_withdraw_name}}({{item.pd_card_num.slice(15)}})</view>
							</view>
						</view>
						<view class="grace-rows" style="margin-top:35rpx;margin-right: 20rpx;">
							<view style="font-size:50rpx;font-weight:400;color:rgba(48,48,48,1);">{{ item.pd_money }}</view>
							<view style="margin-top: 20rpx; font-size: 30rpx;">元</view>
						</view>
					</view>
				</view>
				<view v-if="lenjl" style="text-align: center;margin-top: 10rpx;" @tap="Goto('/pages/credit_card_record/credit_card_record')">查看更多</view>
				<view v-else style="text-align: center;margin-top: 10rpx;">无记录</view>
			</scroll-view>
			<!-- 记录 -->
			<!-- 支付账户遮罩 -->
			<graceBottomDialog :show="show1" @closeDialog="closeDialog1">
				<view slot="btns">
					<view style="height: 80rpx;line-height: 80rpx;">
						<view class="grace-flex-center">
							<text style="font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">选择支付账户</text>
							<view style="position: relative;left: 230rpx;top: 5rpx;" @tap="closeDialog1">
								<image src="../../static/quxiao.png" style="width: 30rpx;height: 30rpx;"></image>
							</view>
						</view>
					</view>
				</view>
				<view slot="content">
					<scroll-view class="grace-scroll-y" scroll-y style="height: 400rpx;">
						<view v-for="(itme,index) in zhifuzhanghu_list" :key="index" @tap="genghuanzhifuzhanghu([itme])" class="grace-rows grace-flex-vcenter"
						 style="height: 80rpx;border-bottom: 2rpx solid #F7F7F7; ">
							<image :src="itme.bank_icon_color" style="width: 36rpx;height: 36rpx;margin-left: 30rpx;"></image>
							<text style="margin-left: 25rpx; font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">{{itme.bank_name}}</text>
						</view>
						<view @tap="Goto('/pages/add_credit_card/add_credit_card1')" class="grace-rows grace-flex-vcenter" style="height: 80rpx;">
							<image src="../../static/tianjia.png" style="width: 38rpx;height: 38rpx;margin-left: 30rpx;"></image>
							<text style="margin-left: 25rpx; font-size:30rpx;font-weight:400;color:rgba(0,0,0,1);">添加信用卡</text>
						</view>
					</scroll-view>

				</view>
			</graceBottomDialog>

			<!-- 消费通道遮罩 -->
			<graceBottomDialog :show="show2" @closeDialog="closeDialog2">
				<view slot="btns">
					<view style="height: 90rpx;line-height: 80rpx;">
						<view class="grace-flex-center">
							<text style="font-size:32rpx;font-weight:400;color:rgba(0,0,0,1);">选择刷卡通道</text>
							<view style="position: relative;left: 230rpx;top: 5rpx;" @tap="closeDialog2">
								<image src="../../static/quxiao.png" style="width: 30rpx;height: 30rpx;"></image>
							</view>
						</view>
					</view>
				</view>
				<view slot="content">
					<scroll-view class="grace-scroll-y" scroll-y style="height: 700rpx;">
						<view v-for="(itme,index) in shuakatongdao_list" :key="index" class="grace-rows grace-flex-vcenter" style="height: 130rpx; border-bottom: 1rpx solid #F7F7F7;">
							<image src="../../static/yinlian.png" style="width: 100rpx;height: 62rpx;margin-left: 41rpx;"></image>
							<view class="grace-columns" style="margin-left: 44rpx;">
								<text style="font-size:28rpx;font-weight:bold;color:rgba(51,51,51,1);">{{ itme.alias}}</text>

								<text style="font-size:22rpx;font-weight:400;color:rgba(225,8,8,1);margin-top: 30rpx;">{{itme.quot_str}}</text>
							</view>
							<view style="margin-left: 100rpx;" v-show="itme.is_dredge==0" @tap="jianquan_id(itme.pc_id)">
								<text style="font-size:26rpx;font-weight:400;color:rgba(220,0,0,1);">点击开通</text>
							</view>
							<view style="margin-left: 100rpx;" @tap="radioChange(itme)" v-if="itme.default_channel==1 &&xuan">
								<!-- <image src="../../static/wxzhong.png" mode="" style="width: 37rpx;height: 37rpx;position: absolute;"></image> -->
								<text style="font-size:26rpx;font-weight:400;color:rgba(35,183,20,1);">{{yixuan}}</text>
							</view>
							<view style="margin-left: 100rpx;" @tap="radioChange(itme)" v-else v-show="itme.is_dredge!==0">
								<text style="font-size:26rpx;font-weight:400;color:rgba(220,0,0,1);">{{weixuan}}</text>
							</view>


						</view>
					</scroll-view>
					<view class="grace-flex-center">
						<button style="width:500rpx;height:90rpx;background:#1678FF;box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;position: absolute;bottom: 50rpx;"
						 @tap="xiayibus"><text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">下一步</text></button>
					</view>
				</view>
			</graceBottomDialog>

			<!-- 鉴权 -->
			<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<!-- <text>请输入验证码</text> -->
					<text style="font-size: 26rpx;">验证码已发送至您</text> </br>
					<text style="font-size: 24rpx;">尾号{{ yuliushouji }}的手机</text>
					<input v-model="yanzhengma" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx" placeholder="请输入验证码" />
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
				</view>
			</graceDialog>
			<!-- 鉴权 -->

		</view>
	</gracePage>
</template>

<script>
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	export default {
		data() {
			return {
				coupon: '',
				max: 0, // 抵用券最大金额
				coupon_id: '', //抵用券id
				zhanghuneme: '请选择信用卡',
				tongdaoname: '暂无消费通道请开通',
				channel_id: '', //通道id
				bc_id: '', //信用卡id
				zhifuzhanghu_list: [],
				zhifuzhanghu: [],
				shuakatongdao_list: [],
				pay_money: '',
				kaitong: '',
				show1: false,
				show2: false,
				// 鉴权
				show3: false,
				yanzhengma: '', //验证码
				yuxuantongdao_id: '',
				yuliushouji: '', //预留手机
				order_num: '', //订单号
				height: '',
				limit: 5,
				page: 1,
				cloud_brush_list: [],
				jinfu: false,
				num: '',
				lenjl: true,
				start: [0, 0],
				moveY: 0,
				moveX: 0,
				windowWidth: '',
				windowHeight: '',
				bank_name: '',
				current: 0,
				yixuan: '已选择',
				weixuan: '请选择',
				xuan: false
			}
		},
		onLoad: function() {
			const vm = this
			this.req.post(
					this.lochost + '/index/index?method=credit_card_list', {
						type: 1
					}, {},
					function(res) {
						console.log(res);
						vm.zhifuzhanghu_list = res.data;
						vm.genghuanzhifuzhanghu(vm.zhifuzhanghu_list);
					}
				),
				this.height = '100%';
			this.jiazai();
		},
		onShow() {
			// var state = uni.getStorageSync('user_u_state')
			// if (state !== 1) {
			// 	uni.navigateTo({
			// 		url: '/pages/authentication/modify_real_name'
			// 	}, );
			// 	this.Back();
			// } else {
			// 	this.jiazai();
			// }

			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
			this.tongdao()
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		// onUnload() {
		// 	uni.switchTab({
		// 		url: '/pages/index/index'
		// 	})
		// },
		onBackPress() {
			uni.switchTab({
				url: '/pages/index/index'
			})
			return true;
		},
		methods: {
			// 云刷记录按钮拖拽功能
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
			// 记录
			jiazai() {
				var vm = this;
				// this.page+=1;
				vm.req.post(
					vm.lochost + '/index/index?method=cloud_brush_list', {
						page: vm.page,
						size: vm.limit
					}, {},
					function(res) {
						var brush_list = res.data.data;
						for (let i = 0; i < brush_list.length; i++) {
							vm.cloud_brush_list.push(brush_list[i])
						}
						if (vm.cloud_brush_list.length == 0) {
							vm.lenjl = false
						}
						console.log(vm.cloud_brush_list);
					}
				)
			},
			xuanzediyong() {
				if (this.pay_money === '') {
					this.msg_show('请填写支付金额');
				} else {
					uni.$once('xuanzediyongquan', this.diyong);
					this.Goto('/pages/cloud_brush/brush_voucher?money=' + this.pay_money)
				}
			},
			diyong(data) {
				if (data.coupon_id === '') {
					this.coupon_id = data.coupon_id;
					this.coupon = '';
				} else {
					this.coupon_id = data.coupon_id;
					this.coupon = this.max;
				}

			},
			// 下一步按钮
			xiayibu() {
				if (this.pay_money === '') {
					this.msg_show('请将信息补充完整！')
					return
				}
				if (this.bc_id === '') {
					this.msg_show('请将信息补充完整！')
					return
				}
				if (this.zhanghuneme === '请选择信用卡') {
					this.msg_show('请将信息补充完整！')
					return
				}
				if (this.tongdaoname === '暂无消费通道请开通') {
					this.show2 = true;
					return
				}
				this.show2 = true;
			},
			xiayibus() {
				if (this.pay_money === '') {
					this.msg_show('请将信息补充完整！')
					return
				}
				if (this.bc_id === '') {
					this.msg_show('请将信息补充完整！')
					return
				}
				if (this.zhanghuneme === '请选择信用卡') {
					this.msg_show('请将信息补充完整！')
					return
				}
				if (this.tongdaoname === '暂无消费通道请开通') {
					this.show2 = true;
					return
				}
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=detection_channel_authentication', {
						bc_id: this.bc_id,
						channel_id: this.channel_id,
						type: 3
					}, {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							
							if (vm.xuan==false) {
								uni.showToast({
									title: '请先选择通道',
									icon: 'none'
								})
							} else {
								if (res.data.authentication == 0) {
									vm.channel_id = res.data.channel_id
									vm.jianquan_id()
								} else {
									uni.navigateTo({
										url: '/pages/cloud_brush/cloud_brush2?channel_id=' + vm.channel_id + '&bc_id=' + vm.bc_id + '&pay_money=' +
											vm.pay_money + '&num=' + vm.num + '&coupon=' + vm.coupon + '&tongdaoname=' + vm.tongdaoname
									})

									vm.pay_money = ''
									vm.closeDialog2()

								}
							}

						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}

					}
				)
			},
			//支付金额
			diyongquan(val) {
				var vm = this;
				var money = val.target.value;


				if (parseFloat(money) > 0) {
					vm.req.post(
						vm.lochost + '/index/index?method=get_cloud_brush_deduct_money', {
							money: money
						}, {},
						function(res) {
							vm.max = parseFloat(res.data.max_deduct_money)
						}
					)
				}

			},
			// 获取焦点是显示
			jfs() {
				this.jinfu = true
			},
			// 失去焦点是隐藏
			sqjf() {
				this.jinfu = false
				var vm = this
				for (let i = 0; i < vm.shuakatongdao_list.length; i++) {
					console.log(vm.shuakatongdao_list[i].cloud_brush_rate);
					var dapzhang = vm.pay_money - (vm.pay_money * vm.shuakatongdao_list[i].cloud_brush_rate) - 3
					vm.num = dapzhang.toFixed(2)
					console.log(vm.num);
				}
			},
			radioChange(item, type) {
				var shuakatongdao_list = this.shuakatongdao_list;
				var that = this;
				var newshuakatongdao_list = [];
				shuakatongdao_list.forEach(function(i, v) {
					if (i.pc_id == item.pc_id) {
						that.channel_id = item.pc_id
						that.tongdaoname = item.alias + '(' + item.quot_str.slice(3, 13) + ')'
						that.xuan = true,
							i.default_channel = 1;
					} else {
						i.default_channel = 0;
					}
					newshuakatongdao_list.push(i);
				})
				that.shuakatongdao_list = newshuakatongdao_list
			},
			// 通道id鉴权
			jianquan_id(channel_id) {
				var vm = this;
				vm.req.mypost(
					vm.lochost + '/index/index?method=channel_authentication', {
						bc_id: this.bc_id,
						channel_id: channel_id,
						type: 3
					},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							var is_need_SMS = res.data.is_need_SMS;
							if (is_need_SMS == 0) {
								// vm.tongdao();
								vm.msg_show('开通' + res.msg);
								vm.Goto('/pages/cloud_brush/cloud_brush2?channel_id=' + vm.channel_id + '&bc_id=' + vm.bc_id + '&pay_money=' +
									vm.pay_money + '&num=' + vm.num + '&coupon=' + vm.coupon)
								vm.pay_money = ''
							} else if (is_need_SMS == 1) {
								vm.yuliushouji = res.data.tel_str;
								vm.order_num = res.data.order_num;
								vm.showDialog3()
							} else if (is_need_SMS == 2) {
								vm.Goto('/pages/web_view/sweb_view?url=' + res.data.url);
								vm.pay_money = ''
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}

					}
				)

			},
			// 显示验证码输入框
			showDialog3: function() {
				this.show3 = true;
			},
			// 关闭输入框
			closeDialog3: function() {
				this.show3 = false;
			},
			// 验证码输入框选择了确认
			confirm3: function() {
				if (this.yanzhengma == '') {
					this.msg_show('请输入验证码')
				} else {
					var vm = this;
					this.req.post(
						this.lochost + '/index/index?method=confirm_channel_authentication', {
							order_num: this.order_num,
							sms_code: this.yanzhengma,
							type: 3
						}, {},
						function(res) {
							vm.closeDialog3();
							vm.msg_show(res.msg);
							vm.tongdao();
						}
					)
				}

			},
			// 切换通道
			tongdao() {
				if (this.bc_id) {
					var vm = this
					this.req.mypost(
						this.lochost + '/index/index?method=channel_list', {
							bc_id: this.bc_id,
							money: this.pay_money,
							type: 1
						},
						function(res) {
							console.log(res);
							vm.shuakatongdao_list = res.data

							vm.qiehuantongdao(vm.shuakatongdao_list[0], true)

						})
				}

			},
			qiehuantongdao(item, type) {
				console.log(item);
				console.log(type);

				if (type) {
					var dapzhang = this.pay_money - (this.pay_money * item.cloud_brush_rate) - 3
					this.num = dapzhang.toFixed(2)
					console.log(this.num);
					if (item.is_dredge == 0) {
						// this.showDialog3();
						this.tongdaoname = '请选择通道'
						this.closeDialog2()
					} else {
						this.channel_id = item.pc_id
						this.tongdaoname = item.alias + '(' + item.quot_str.slice(3, 13) + ')'
						// this.Goto('/pages/cloud_brush/cloud_brush2?channel_id=' + this.channel_id + '&bc_id=' + this.bc_id + '&pay_money=' + this.pay_money + '&num=' + this.num + '&coupon=' + this.coupon + '&tongdaoname=' + this.tongdaoname)
						// this.pay_money = ''
						this.closeDialog2()
					}
				} else {
					if (item.is_dredge == 0) {
						this.channel_id = item.pc_id
						this.tongdaoname = item.alias + '(' + item.quot_str.slice(3, 13) + ')'
						// this.jianquan_id(this.bc_id, this.yuxuantongdao_id, 1);
						// this.tongdaoname='请选择通道'
						this.closeDialog2()
					} else {
						this.channel_id = item.pc_id
						this.tongdaoname = item.alias + '(' + item.quot_str.slice(3, 13) + ')'
						this.Goto('/pages/cloud_brush/cloud_brush2?channel_id=' + this.channel_id + '&bc_id=' + this.bc_id +
							'&pay_money=' + this.pay_money + '&num=' + this.num + '&coupon=' + this.coupon + '&tongdaoname=' + this.tongdaoname
						)
						this.pay_money = ''
						this.closeDialog2()
					}
				}
			},
			genghuanzhifuzhanghu(item) {
				if (item.length == 0) {
					this.zhanghuneme = '请添加信用卡';
				} else {
					console.log(item);
					this.zhanghuneme = item[0].bank_name
					this.bc_id = item[0].bc_id;
					// 换通道
					this.tongdao()
				}
				this.show1 = false;
			},
			showDialog1() {
				this.show1 = true;
			},
			closeDialog1() {
				this.show1 = false;
			},
			showDialog2() {
				// this.tongdao();
				console.log(1122);
				this.show2 = true;
			},
			closeDialog2() {
				this.show2 = false;
			}
		},
		components: {
			graceDialog,
			gracePage,
			graceBottomDialog
		}
	}
</script>

<style>
	.content2 {
		padding: 30rpx;
		line-height: 50rpx;
	}

	.grace-dialog-buttons {
		width: 700rpx;
		line-height: 88rpx;
		height: 88rpx;
		display: block;
		overflow: hidden;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
	}

	.wqann {
		position: relative;
		margin-left: 550rpx;
		margin-top: 20rpx;
		z-index: 99;
	}
</style>
