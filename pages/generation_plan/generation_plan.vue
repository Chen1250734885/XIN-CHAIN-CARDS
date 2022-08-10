<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" class="grace-columns ">
			<view class="grace-flex-center" style="margin-top: 25rpx">
				<view :style="{background: card_color}" style="width:690rpx;height:260rpx;box-shadow:0px 0px 15rpx 0px rgba(131,131,131,0.3);border-radius:20rpx;">
					<view class="grace-rows grace-flex-vcenter" style="margin-left: 46rpx;margin-top: 40rpx;">
						<image :src="card_icon" style="width: 50rpx;height: 50rpx;"></image>
						<view class="grace-columns" style="margin-left: 20rpx;">
							<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">{{ card_name }}</text>
							<image src="../../static/xinyongka.png" style="width: 60rpx;height: 22rpx;"></image>
						</view>
					</view>
					<view class="grace-flex-center" style="margin-top: 20rpx;">
						<view style="width:618rpx;height:1rpx;background:rgba(255,255,255,1);"></view>
					</view>
					<view class="grace-space-between" style="margin:30rpx 90rpx ;" >
						<view class="grace-columns" style="text-align: center;">
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">已还金额</text>
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,253,253,1);">-- 元</text>
						</view>
						<view v-for="item in schemaObj" class="grace-columns" style="text-align: center;">
							<view  >
							<view class="grace-flex-center" @tap="huankuanxuanze(item.is_default,item.is_optional)">
								<image v-if="item.is_default==1" :src="zhinengdaihuan_img" style="width: 36rpx;height: 36rpx;"></image>
								<image v-else :src="jingzhunyangka_img" style="width: 36rpx;height: 36rpx;"></image>
							</view>
							<text style="font-size:24rpx;font-weight:500;color:rgba(255,255,255,1);">{{item.name_str}}</text>
							</view>
						</view>

						<!-- <view class="grace-columns" style="text-align: center;" @tap="huankuanxuanze(2)">
							<view class="grace-flex-center">
								<image :src="jingzhunyangka_img" style="width: 36rpx;height: 36rpx;"></image>
							</view>
							<text style="font-size:24rpx;font-weight:500;color:rgba(255,255,255,1);">精准养卡</text>
						</view> -->
					</view>
				</view>
			</view>

			<view style="margin-top: 30rpx;">
				<view class="grace-rows grace-flex-vcenter" style="width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">账单金额：</text>
					<input type="number" v-model="zhangdanjine" @input="morenbishu" placeholder="请输入账单金额" placeholder-style="font-size:30rpx;font-weight:400;color:rgba(153,153,153,1);"
					 style="margin-left: 30rpx;width: 500rpx" />
				</view>

				<view @tap="show = true" class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">还款日期：</text>
					<text style="font-size:30rpx;font-weight:400;margin-left: 30rpx;" :style="{color:date.length>0?'rgba(51,51,51,1)':'rgba(153,153,153,1)'}">{{ date.length>0?'已选择'+date.length+'天':'请选择还款日期' }}</text>
					<image src="../../static/jiantou.png" style="width: 14rpx;height: 24rpx;margin-left: 250rpx;"></image>
				</view>

				<view class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">周转金额：</text>
					<text style="font-size:28rpx;color:rgba(255,0,12,1);margin-left: 40rpx;">{{zhouzhuanjine+'.00元'}}</text>
				</view>

				<view class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">执行笔数：</text>
					<view style="margin-left: 30rpx;" v-show="jian_bishu" @tap="jianbishu">
						<image src="../../static2/generation_plan_jian.png" style="width: 50rpx;height: 50rpx;"></image>
					</view>
					<text style="font-size:36rpx;color:rgba(51,51,51,1);margin:0rpx 75rpx;">{{bishu}}</text>
					<view v-show="jia_bishu" @tap="jiabishu">
						<image src="../../static2/generation_plan_jia.png" style="width: 50rpx;height: 50rpx;"></image>
					</view>
				</view>

				<!-- <view @tap="open1" class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">落地商户地址：</text>
					<view class="grace-columns" style="text-align: center;">
						<view>
							<text style="font-size:30rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: 30rpx;">{{cityText1}}</text>
							<image src="../../static/jiantou.png" style="width: 14rpx;height: 24rpx;margin-left: 50rpx;"></image>
						</view> -->
				<!-- <view style="width:549rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 10rpx;"></view> -->
				<!-- </view>
				</view> -->


				<!-- 					<view @tap="xuanzedikoujuan()" class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
						<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">手续费抵扣券：</text>
						<text style="font-size:30rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: 30rpx;">{{ dikoujuan_name }}</text>
						<view style="position: absolute;left: 430rpx;">
							<image src="../../static/jiantou.png" style="width: 14rpx;height: 24rpx;margin-left: 250rpx;"></image>
						</view>
					</view> -->



				<view class="grace-space-between grace-flex-vcenter">
					<!-- 笔数费 -->
					<view class="bishuf">
						<view style="margin-left: 35rpx;">
							<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">笔数费：</text>
							<text style="font-size:24rpx;color:rgba(255,102,0,1);">{{ stroke_number+'.0' }}元</text>
						</view>
						<view class="">
							<text style="margin-right: 35rpx; font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">1元/笔</text>
						</view>
					</view>
					<!-- 手续费 -->
					<view class="shouxuf">
						<view style="margin-left: 35rpx;">
							<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">手续费：</text>
							<text style="font-size:24rpx;color:rgba(255,102,0,1);">{{ poundage }}元</text>
						</view>
						<view class="">
							<text style="margin-right: 15rpx; font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">66.0元/万</text>
						</view>
					</view>

					<!-- <view style="position: absolute;left: 400rpx;">
						
					<text style="color:rgba(204,204,204,1);font-size: 35rpx;">|</text>
						</view> -->
					<!-- 笔数费 -->
					<!-- 	<view style="margin-left: 35rpx;">
								<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">笔数费：</text>
								<text style="font-size:24rpx;font-weight:bold;color:rgba(255,102,0,1);margin-left: 30rpx;margin-right: 120rpx;">{{ stroke_number }}元</text>
					<text style="margin-right: 35rpx; font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: -20rpx;">1元/笔</text>
					</view> -->
					<!-- 手续费 -->
					<!-- <view style="margin-left: 35rpx;">
								<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">手续费：</text>
								<text style="font-size:24rpx;font-weight:bold;color:rgba(255,102,0,1);margin-left: 30rpx;margin-right: 120rpx;">{{ poundage }}元</text>
					<text style="margin-right: 35rpx; font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: -70rpx;">66.0元/万</text>
					</view> -->
				</view>
				<!-- 抵扣券 -->
				<view class="grace-rows grace-flex-vcenter" style="margin:5rpx 0; height:80rpx;background:rgba(255,255,255,1);"
				 @tap="xuanzediyong">
					<text style="margin-left: 35rpx;font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">抵用券:</text>
					<view class="grace-columns" style="text-align: center;">
						<view style="position: relative;">
							<text style="font-size:30rpx;font-weight:bold;" :style="{color:coupon_id===''?'rgba(218,28,30,1)':'rgba(55,205,97,1)'}">{{coupon_id===''?'可抵扣'+max+'元，选择抵用券':'-'+max+'（已抵扣）'}}</text>
							<image src="../../static/jiantou.png" style=" width: 15rpx;height: 25rpx;position: absolute;left: 550rpx;"></image>
						</view>
						<view style="width:620rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 13rpx;"></view>
					</view>
				</view>
			</view>
			<view style="text-align: center;margin-top: 10rpx;">
				<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">可调整天数或笔数来改变周转金</text>
			</view>
			<button @tap="quryulan()" style="line-height: 90rpx; margin-top:100rpx; width:500rpx;height:90rpx;background:#1678FF;border-radius:10rpx;font-size:28rpx;font-weight:400;color:rgba(255,255,255,1);">预览计划</button>

			<ei-calendar @change="change" v-model="date" :visible.sync="show" type="multiple" :disabledDate="disabledDate"
			 :custom-date="customDate" format="YYYY-MM-DD">
			</ei-calendar>

			<!-- 鉴权 -->
			<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<text style="font-size: 26rpx;">验证码已发送至您</text>
					<text style="font-size: 24rpx;">尾号{{ yuliushouji }}的手机</text>
					<input v-model="yanzhengma" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx" placeholder="请输入验证码" />
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
				</view>
			</graceDialog>
			<!-- 鉴权 -->

			<!-- 新地区选择 -->
			<graceAddressPicker :show="show4" @confirm="confirm1" :level="level" @close="close1" cancelTColor="关闭"></graceAddressPicker>
			<!-- 预览计划弹框 -->
			<uni-popup ref="popup" type="center">
				<view class="popup">
					<!-- 银行卡名称 -->
					<view style="transform: translateY(30rpx);text-align: center;">
						<text style="font-size: 34rpx;">请确认本<text style="color: rgba(255, 0, 0, 1);">{{card_name}}</text></text>
					</view>
					<!-- 周转金额 -->
					<view style="margin-top: 30rpx;text-align: center;">
						<text style="font-size: 34rpx;">可用额度大于周转金额</text>
						<view style="font-size: 34rpx; color: rgba(255, 0, 0, 1);">{{zhouzhuanjine + '.00元'}}</view>
					</view>
					<!-- 提示 -->
					<view style="margin-top: 7rpx;text-align: center;">
						<view style="font-size: 28rpx; color: rgba(154, 154, 154, 1);">可调整天数或笔数来改变周转金</view>
						<view style="font-size: 28rpx; color: rgba(154, 154, 154, 1);">确认计划后，计划执行期间该卡会产生</view>
						<view style="font-size: 28rpx; color: rgba(154, 154, 154, 1);">消费及还款</view>
					</view>
					<!-- 按钮 -->
					<view>
						<view class="qures" @tap="quryulan">
							<text>确认</text>
						</view>
						<view class="quxioa" @tap="close">
							<text>取消</text>
						</view>
					</view>
				</view>
			</uni-popup>


		</view>
	</gracePage>
</template>
<script>
	var myDate = new Date();
	var benyue = '';
	var xiayue = '';
	import graceAddressPicker from '../../graceUI/components/graceAddressPicker.vue';
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	import gracePage from "../../graceUI/components/gracePage.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		components: {
			EiCalendar,
			gracePage,
			graceDialog,
			graceAddressPicker,
			uniPopup
		},
		data() {
			return {
				zinengdaihuan:1,
				jincunyangka:1,
				show4: false,
				cityText1: "系统自动匹配", //文本
				level: 2,
				c_code: '',
				stroke_number: 0,
				poundage: 0,
				huankuanri: '',
				disabledDateArr: [],
				min_date: '',
				max_date: '',
				bishu: 0,
				max_bishu: 0,
				min_bishu: 0,
				jia_bishu: false,
				jian_bishu: false,
				zhangdanjine: '',
				zhouzhuanjine: '0',
				zhouzhuanjin: '0',
				card_id: '',
				card_color: '',
				card_name: '',
				card_icon: '',
				zhinengdaihuan_img: '../../static/generation_plan_xuanzhong.png',
				jingzhunyangka_img: '../../static/generation_plan_weixuan.png',
				type: 1,
				show: false,
				date: [],
				customDate: [],
				shouxufeilv: 0,
				feilv: '',
				bishufei: '',
				quan_id: '',
				quan_jine: '',
				dikoujuan_name: '请选择抵扣券',

				// 鉴权
				show3: false,
				yanzhengma: '', //验证码
				order_num: '', //订单号
				yuliushouji: '', //预留手机
				keyizou: false,
				wenti: '',
				days: '', //还款日期天数
				channel_id: '', //支付渠道id
				channel_ids: '',
				now_time: '', //默认笔数时间
				vale: '',
				typearr: '',
				is_default: '', //默认养卡模式,
				schema: '',
				coupon_id: '', // 抵扣券id
				coupon: 0,
				max: 0,
				schemaObj: []
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.card_id = opt.card_id;
			this.card_color = opt.card_color;
			this.card_name = opt.card_name;
			this.card_icon = opt.card_icon;
			this.channel_id = opt.channel_id;
			var schemaStr = opt.schema_arr
			var schemaObj = JSON.parse(schemaStr)
			this.schemaObj = schemaObj
			console.log(schemaObj);
			// for(var i = 0;i < schemaObj.length;i++){
			// 	this.is_default = schemaObj[0].is_default
			// 	console.log(schemaObj[i].is_optional);
			// 	if(this.is_default ==1 ){
			// 		this.zhinengdaihuan_img = '../../static/generation_plan_xuanzhong.png';
			// 		this.jingzhunyangka_img = '../../static/generation_plan_weixuan.png';
			// 		this.schema = schemaObj[0].schema
			// 		console.log(this.schema);
			// 	}else{
			// 		this.zhinengdaihuan_img = '../../static/generation_plan_weixuan.png';
			// 		this.jingzhunyangka_img = '../../static/generation_plan_xuanzhong.png';
			// 		this.schema = schemaObj[1].schema
			// 		console.log(this.schema);
			// 	}
				
			// }
			
			benyue = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + opt.huankuanri;
			xiayue = (myDate.getMonth() + 1) === 12 ? (myDate.getFullYear() + 1) + '-1-' + opt.huankuanri : myDate.getFullYear() +
				'-' + (myDate.getMonth() + 2) + '-' + opt.huankuanri;
			this.customDate = [{
				cellClass: 'custom-cell',
				date: benyue,
				top: [{
					class: 'custom-cell-top-1',
					text: '还款日'
				}, ]
			}, {
				cellClass: 'custom-cell',
				date: xiayue,
				top: [{
					class: 'custom-cell-top-1',
					text: '还款日'
				}, ]
			}];
			// this.huankuanri=opt.huankuanri;
			console.log(benyue, xiayue)
			// this.morenbishu()
		},
		methods: {
			// 新地区选择
			close1: function() {
				this.show4 = false;
			},
			open1: function() {
				this.show4 = true;
			},
			confirm1: function(e) {
				// 返回选中城市的编号及文本信息
				console.log(e);
				this.c_code = e.codes[1];
				this.cityText1 = e.names[0] + '-' + e.names[1];
				this.close1();
			},
			// 抵扣券使用
			xuanzediyong(){
				// if (this.zhangdanjine === '') {
				// 	this.msg_show('请填写支付金额');
				// 	this.max = 0
				// } else {
					console.log(this.max);
					// return
					uni.$once('xuanzediyongquan', this.diyong );
					this.Goto('/pages/cloud_brush/brush_voucher?max=' + this.max + '&poundage=' + this.poundage);
				// }
			},
			diyong(data) {
				if (data.coupon_id === '') {
					this.coupon_id = data.coupon_id;
					this.coupon = '';
				} else {
					this.coupon_id = data.coupon_id;
					this.coupon = this.max;
					// this.shouxufeilv = (this.shouxufeilv-this.max).toFixed(2);
				}
			},
			// 鉴权
			jianquan() {
				var vm = this;
				console.log({
					card: this.card_id
				})
				vm.req.post(
					vm.lochost + '/index/index?method=channel_authentication', {
						bc_id: vm.card_id,
						channel_id: vm.channel_id,
						type: 1
					}, {},
					function(res) {
						console.log(res)
						var is_need_SMS = res.data.is_need_SMS;
						if (is_need_SMS === 0) {
							vm.msg_show(res.msg);
							vm.Goto('/pages/preview_plan/preview_plan?channel_id=' + vm.channel_id + '&bc_id=' + vm.card_id + '&times=' +
								vm.bishu + '&dates=' + vm.date + '&pay_money=' + vm.vale + '&had_money=' + vm.zhouzhuanjine + '&c_code=' + vm
								.c_code + '&now_time=' + vm.now_time + '&schema=' + vm.schema + '&coupon=' + vm.coupon);
						} else if (is_need_SMS === 1) {
							vm.order_num = res.data.order_num;
							vm.yuliushouji = res.data.tel_str;
							vm.showDialog3()
						} else if (is_need_SMS === 2) {
							vm.Goto('/pages/web_view/web_view?url=' + res.data.url+ '&channel_id=' + vm.channel_id + '&bc_id=' + vm.card_id + '&times=' +
								vm.bishu + '&dates=' + vm.date + '&pay_money=' + vm.vale + '&had_money=' + vm.zhouzhuanjine + '&c_code=' + vm
								.c_code + '&now_time=' + vm.now_time + '&schema=' + vm.schema + '&coupon=' + vm.coupon);
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
				if (this.yanzhengma === '') {
					this.msg_show('请输入验证码')
				} else {
					console.log({
						order_num: this.order_num,
						sms_code: this.yanzhengma,
						type: 1
					})

					var vm = this;
					vm.req.post(
						vm.lochost + '/index/index?method=confirm_channel_authentication',
						{
							order_num: vm.order_num,
							sms_code: vm.yanzhengma,
							type: 1
						}, {},
						function(res) {
							if (res.code == 200) {
								vm.closeDialog3();
								vm.msg_show(res.msg);
								
								vm.Goto('/pages/preview_plan/preview_plan?channel_id=' + vm.channel_id + '&bc_id=' + vm.card_id + '&times=' +
									vm.bishu + '&dates=' + vm.date + '&pay_money=' + vm.vale + '&had_money=' + vm.zhouzhuanjine + '&c_code=' +
									vm.c_code + '&now_time=' + vm.now_time + '&schema=' + vm.schema + '&coupon=' + vm.coupon);
							} else {
								vm.msg_show(res.msg);
							}

						}
					)
				}

			},

			// 预览计划按钮
			yulanjihua() {
				var vm = this;
				if (!vm.keyizou) {
					uni.showToast({
						title: '账单金额不能低于450.0元',
						icon: 'none'
					})
					return
				}
				vm.Goto('/pages/cloud_brush/brush_voucher?max=' + vm.max + '&poundage=' + vm.poundage);
				// vm.$refs.popup.open()
			},
			// 确认预览计划按钮
			quryulan() {
				var vm = this
				// vm.jianquan()
				vm.req.post(
					vm.lochost + '/index/index?method=detection_channel_authentication', {
						bc_id: vm.card_id,
						channel_id: vm.channel_id,
						type: 1
					}, {},
					function(res) {
						console.log(res.data);
						if (res.data.authentication == 1) {
							vm.req.mypost(
								vm.lochost + '/index/index?method=make_refund_plan', {
									channel_id: vm.channel_id,
									bc_id: vm.card_id,
									times: vm.bishu,
									dates: vm.date,
									pay_money: vm.vale,
									had_money: vm.zhouzhuanjine,
									c_code: vm.c_code, //城市编码
									now_time: vm.now_time,
									schema: vm.is_default,
								},
								function(res) {
									console.log(res);
									if (res.code == 200) {
										var storage = {
											channel_id : vm.channel_id,
											card_id : vm.card_id,
											bishu : vm.bishu,
											date : vm.date,
											vale : vm.vale,
											zhouzhuanjine : vm.zhouzhuanjine,
											c_code : vm.c_code,
											now_time : vm.now_time,
											schema : vm.schema,
											card_name: vm.card_name,
										}
										uni.setStorageSync('storage',storage)
										vm.Goto('/pages/cloud_brush/brush_voucher?max=' + vm.max + '&poundage=' + vm.poundage);
										// vm.Goto('/pages/preview_plan/preview_plan?channel_id=' + vm.channel_id + '&bc_id=' + vm.card_id + '&times=' + vm.bishu + '&dates=' + vm.date + '&pay_money=' + vm.vale + '&had_money=' + vm.zhouzhuanjine + '&c_code=' + vm.c_code + '&now_time=' + vm.now_time + '&schema=' + vm.schema + '&coupon=' + vm.coupon);
									}else{
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}
								}
							)
						} else {
							vm.channel_id = res.data.channel_id
							vm.jianquan()
						}

					})
				// console.log(vm.channel_id);
				// return

				vm.$refs.popup.close()
			},
			// 取消预览计划按钮
			close() {
				this.$refs.popup.close()
			},
			change(e) {
				console.log(e);
				// console.log(e.length + 1);
				// return
				this.date = e;
				var vm = this
				this.req.mypost(
					this.lochost + '/index/index?method=start_money_hint', {
						bc_id: vm.card_id,
						pay_money: vm.vale,
						schema: vm.schema,
						channel_id: vm.channel_id,
						times: e.length + 1,
						dates: vm.date.join(','),
						now_time: vm.now_time
					},
					function(res) {
						console.log(res);
						vm.zhouzhuanjine = res.data.had_money
						vm.stroke_number = res.data.times_money
						vm.poundage = res.data.poundage
						vm.max_bishu = res.data.max_times
						vm.min_bishu = res.data.min_times
						vm.bishu = res.data.mo_times
						vm.max = res.data.max_deduct_money
						if (vm.bishu < vm.max_bishu) {
							vm.jia_bishu = true;
						}
						if (vm.bishu > vm.min_bishu) {
							vm.jian_bishu = true
						} else {
							vm.jian_bishu = false

						}
					}

				)

			},
			// 加笔数
			jiabishu() {
				if (this.bishu + 1 > this.max_bishu) {
					this.jia_bishu = true;
				} else if (this.bishu + 1 === this.max_bishu) {
					this.bishu = this.bishu + 1;
					this.jia_bishu = false;
					this.jian_bishu = true;
					this.tiaozhengbishu();
				} else {
					this.jian_bishu = true;
					this.bishu = this.bishu + 1;
					this.tiaozhengbishu();
				}
			},
			// 减笔数
			jianbishu() {
				if (this.bishu - 1 < this.min_bishu) {
					this.jian_bishu = true;
				} else if (this.bishu - 1 === this.min_bishu) {
					this.bishu = this.bishu - 1;
					this.jian_bishu = false;
					this.jia_bishu = true;
					this.tiaozhengbishu();
				} else {
					this.jia_bishu = true;
					this.bishu = this.bishu - 1;
					this.tiaozhengbishu();
				}
			},

			// 输入账单金额
			morenbishu(val, type) {
				var vm = this;
				vm.vale = val.detail.value;
				var vale = ''
				if (type == 1) {
					vale = val.detail.value;
				} else {
					vale = val.detail.value;
				};
				console.log(vm.vale);
				if (vale >= 450) {
					console.log('进入');
					console.log(vale);
					vm.req.mypost(
						vm.lochost + '/index/index?method=get_mo_times', {
							bc_id: vm.card_id,
							pay_money: vm.vale,
							schema: vm.schema
						}, 
						function(res) {
							console.log(res);
							if (res.code == 200) {
								vm.keyizou = true;
								vm.date = res.data.dates;
								vm.days = res.data.days;
								vm.bishu = res.data.mo_times
								vm.now_time = res.data.now_time
								vm.max = res.data.max_deduct_money
								// vm.coupon_id = res.data.coupon_id;
								// if (vm.coupon_id != '') {
								// 	this.coupon = this.max;
								// }
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								// vm.wenti = res.msg
								vm.keyizou = false;
							}
							vm.req.post(
								vm.lochost + '/index/index?method=start_money_hint', {
									bc_id: vm.card_id,
									pay_money: vm.vale,
									schema: vm.schema,
									channel_id: vm.channel_id,
									times: vm.bishu,
									dates: vm.date.join(','),
									now_time: vm.now_time
								}, {},
								function(res) {
									console.log(res);
									vm.zhouzhuanjine = res.data.had_money
									vm.stroke_number = res.data.times_money
									vm.poundage = res.data.poundage
									vm.max_bishu = res.data.max_times
									vm.min_bishu = res.data.min_times
									if (vm.bishu < vm.max_bishu) {
										vm.jia_bishu = true;
									}
									if (vm.bishu > vm.min_bishu) {
										vm.jian_bishu = true
									} else {
										vm.jian_bishu = false

									}

								}
							)
						}

					);
					// console.log(obj)
					// return

				}


			},
			// 调整笔数
			tiaozhengbishu() {
				var vm = this;
				if (this.zhangdanjine > 450) {
					this.req.post(
						this.lochost + '/index/index?method=start_money_hint', {
							bc_id: vm.card_id,
							pay_money: vm.vale,
							schema: vm.schema,
							channel_id: vm.channel_id,
							times: vm.bishu,
							dates: vm.date.join(','),
							now_time: vm.now_time
						}, {},
						function(res) {
							console.log(res);
							vm.zhouzhuanjine = res.data.had_money
							vm.stroke_number = res.data.times_money
							vm.poundage = res.data.poundage
							vm.max_bishu = res.data.max_times
							vm.min_bishu = res.data.min_times
							// if (res.code == 200) {
							// 	vm.keyizou = true;
							// 	vm.date = res.data.dates;
							// 	vm.stroke_number = res.data.stroke_number;
							// 	vm.zhouzhuanjine = res.data.rp_price;
							// 	vm.zhouzhuanjin = res.data.rp_price;
							// 	vm.max_bishu = res.data.max_num;
							// 	vm.min_bishu = res.data.min_num;
							// 	vm.bishu = res.data.num;
							// 	vm.shouxufeilv = res.data.poundage;
							// 	vm.feilv = res.data.feilv;
							// 	vm.bishufei = res.data.bishufei;
							// } else {
							// 	uni.showToast({
							// 		title: res.msg,
							// 		icon: 'none'
							// 	})
							// 	// vm.wenti = res.msg
							// 	// vm.keyizou = false;
							// }
						}
					)
				}
			},
			huankuanxuanze(type,optional) {
				var obj = this.schemaObj;
				var newobj = obj[type];
				console.log(newobj)
				
				
				if(newobj.is_optional==1){
					if (type==1) {
						this.zhinengdaihuan_img = '../../static/generation_plan_xuanzhong.png';
						this.jingzhunyangka_img = '../../static/generation_plan_weixuan.png';
						this.schema = type;
					} else  {
						this.zhinengdaihuan_img = '../../static/generation_plan_weixuan.png';
						this.jingzhunyangka_img = '../../static/generation_plan_xuanzhong.png';
						this.schema = type;
					};
					this.tiaozhengbishu()
				}
				return
			},
			disabledDate(date) {
				const start = new Date();
				// 昨天
				const start_zuo = new Date(myDate.getTime() - 24 * 60 * 60 * 1000);
				// 今天
				const start_jin = new Date(myDate.getTime());
				// 下月底
				const date_end = new Date(); //0 表示1月
				// date_end.setDate(0)
				date_end.setMonth(date_end.getMonth() + 2);
				// 日期设置为0号, 0表示1号的前一天
				let lastDay = date_end.setDate(0);
				const end_date = new Date(lastDay).getTime();
				if (start.getHours() >= 16) {
					return date.getTime() <= start_jin || date.getTime() >= end_date;
				} else {
					return date.getTime() <= start_zuo || date.getTime() >= end_date;
				}

			}
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

	.bishuf {
		width: 374rpx;
		height: 60rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		display: flex;
		justify-content: space-between;
		line-height: 60rpx;
	}

	.shouxuf {
		width: 374rpx;
		height: 60rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		display: flex;
		justify-content: space-between;
		line-height: 60rpx;
	}

	.popup {
		width: 500rpx;
		height: 400rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}

	.qures {
		display: inline-block;
		width: 250rpx;
		height: 70rpx;
		background-color: rgba(80, 160, 254, 1);
		border-radius: 0 0 0 10rpx;
		margin-top: 48rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 34rpx;
		color: #FFFFFF;
	}

	.quxioa {
		display: inline-block;
		width: 250rpx;
		height: 70rpx;
		background-color: rgba(80, 187, 254, 1);
		border-radius: 0 0 10rpx 0;
		margin-top: 48rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 34rpx;
		color: #FFFFFF;
	}
</style>
