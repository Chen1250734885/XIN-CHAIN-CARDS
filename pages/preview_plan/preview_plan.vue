<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 	<view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">计划截止日期：{{end_time}}</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">还款总金额：{{bill_money}}元</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">启动金额：{{rp_price}}元</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">还款笔数：{{num}}笔</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">周转金手续费：{{zhouzhuanshouxu}}元</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx; font-size:32rpx;font-weight:bold;color:rgba(51,51,51,1);">还款手续费：{{poundage}}元</text>
					<text v-show="is_coupon!=0" style="font-size:32rpx;font-weight:bold;color:rgba(153,153,153,1);">（已使用抵用券：{{ coupon }}元）</text>
				</view>
			</view> -->

			<view class="grace-rows" style="line-height: 90rpx; width:750rpx;height:90rpx;background:rgba(255,255,255,1);">
				<view style="margin-left: 25rpx; font-size:32rpx;font-weight:400;color:rgba(79,159,254,1);">计划详情</view>
				<view style="margin: 0 20rpx; font-size: 30rpx; color:rgba(36,159,230,1);">|</view>
				<view style="font-size: 32rpx; color:#FF6600;">P</view>
				<view style="font-size: 32rpx; color:#4F9FFE;">lan</view>
				<view style="margin-left: 20rpx; font-size: 32rpx; color:#FF6600;">D</view>
				<view style="font-size: 32rpx; color:#4F9FFE;">etails</view>
			</view>
			<view class="xianqi">
				<image src="../../static/preview_plan_rili.png" style="position: relative;top: 26rpx; width: 30rpx;height: 30rpx;left: 20rpx;"></image>
				<text style="margin-left: 30rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);transform: translateY(28rpx);position: relative;top: 16rpx">{{ plan.create_time }}</text>
				<view class="xianqi_1">
					<text style="font-size: 24rpx;margin-right: 102rpx;">还款总金额：{{plan.pay_back_price}}元</text>
					<text style="font-size: 24rpx;">还款笔数：{{plan.back_times}}笔</text>
				</view>
				<view class="xianqi_2">
					<text style="font-size: 24rpx;margin-right:145rpx;">启动金额：{{plan.had_price}}元</text>
					<text style="font-size: 24rpx;">还款手续费：{{plan.refund_poundage}}元</text>
				</view>
				<view class="xianqi_2">
					<text style="font-size: 24rpx;margin-right: 65rpx;">计划截止日期：{{plan.end_day}}</text>
					<text style="font-size: 24rpx;">周转金手续费：{{plan.revolve_poundage}}元</text>
				</view>
			</view>
			<!-- 生成计划按钮 -->
			<view style="margin-top: 60rpx;margin-bottom: 60rpx;">
				<view class="cxsc" @tap="chongxin">重新生成</view>
				<view class="confirms" @tap="shengchen">确认计划</view>
			</view>
			<!-- 子订单详情 -->
			<view v-for="(item,index) in details" :key="index" style="margin-top: 10rpx;">
				<!-- 时间 -->
				<!-- <view class="timej">
					<text style="margin-left: 25rpx;color: rgba(102, 102, 102, 1);">{{item.date}}</text>
				</view> -->
				<!-- 消费金额 -->
				<view class="xiaofeiv" v-for="(item1,index1) in item.plan" :key="index1">
					<view class="xiaofeivs">
						<view style="margin-top: 20rpx;margin-bottom: 30rpx;">消费（￥{{item1.money}}）</view>
						<view style="font-size: 22rpx;color: rgba(102, 102, 102, 1);">手续费：￥{{item1.poundage }}</view>
					</view>
					<!-- <view>
						<view style="margin-top: -22rpx;font-size: 24rpx;margin-right: 30rpx;color: rgba(102, 102, 102, 1);">{{item1.time}}</view>
						<view style="margin-top: -50rpx; font-size: 22rpx;transform: translateX(25rpx);" :style="{color:item1.state==3?'rgba(243, 115, 0, 1)':item1.state==4?'rgba(154, 154, 154, 1)':item1.state==5?'rgba(207, 22, 57, 1)':item1.state==1?'rgba(154, 154, 154, 1)':item1.state==0?'rgba(154, 154, 154, 1)':''}">{{item1.state==3?'执行成功':item1.state==4?'取消执行':item1.state==5?'执行失败':item1.state==1?'未执行':item1.state==0?'未确认':''}}</view>
					</view> -->

					<!-- 消费执行时间 -->
					<view style="margin-top: 10rpx;position: absolute;right: 0;">
						<view style="font-size: 24rpx;margin-right: 28rpx;color: rgba(102, 102, 102, 1);margin-left: 96rpx;">{{item1.date}}</view>
						<view style="font-size: 24rpx;margin-right: 29rpx;color: rgba(102, 102, 102, 1);margin-top: 10rpx;margin-bottom: 10rpx;margin-left: 70rpx;">{{item1.time}}
							<image @tap="selectDatePicker(item1.id)" v-show="schema==2||item1.state==1" src="../../static2/xiugai.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
						</view>
						<view style="font-size: 22rpx;margin-left: 70rpx;" :style="{color:item1.state==3?'rgba(243, 115, 0, 1)':item1.state==4?'rgba(154, 154, 154, 1)':item1.state==5?'rgba(207, 22, 57, 1)':item1.state==1?'rgba(154, 154, 154, 1)':item1.state==0?'rgba(154, 154, 154, 1)':''}">{{item1.state==3?'执行成功':item1.state==4?'取消执行':item1.state==5?'执行失败':item1.state==1?'&nbsp&nbsp&nbsp未执行':item1.state==0?'&#8195&nbsp未确认':''}}</view>
					</view>

				</view>
				<!-- 还款金额 -->
				<!-- <view class="huankuans">
					<text style="margin-left: 25rpx;">还款：￥{{item.back_price}}</text> -->
					<!-- 还款状态 -->
					<!-- <text style="margin-right: 28rpx;font-size: 22rpx;" :style="{color:item.state==3?'rgba(243, 115, 0, 1)':item.state==4?'rgba(154, 154, 154, 1)':item.state==5?'rgba(207, 22, 57, 1)':item.state==1?'rgba(154, 154, 154, 1)': item.state==0?'rgba(154, 154, 154, 1)': ''}">{{item.state==3?'执行成功':item.state==4?'取消执行':item.state==5?'执行失败':item.state==1?'未执行':item.state==0?'未确认': ''}}</text>
				</view>
				 -->
				<view class="huankuans">
					<text style="margin-left: 25rpx;">还款：￥{{item.back_price}}</text>
					<!-- 还款状态 -->
					<view v-show="item.is_trim==1">
						<text style="font-size: 22rpx;" :style="{color:item.state==3?'rgba(243, 115, 0, 1)':item.state==4?'rgba(154, 154, 154, 1)':item.state==5?'rgba(207, 22, 57, 1)':item.state==1?'rgba(154, 154, 154, 1)': item.state==0?'rgba(154, 154, 154, 1)': ''}">{{item.state==3?'执行成功':item.state==4?'取消执行':item.state==5?'执行失败':item.state==1?'未执行':item.state==0?'未确认': ''}}</text>
						<view style="display: inline-block;" @tap="tiaozheng(item.id)">
							<image src="../../static2/daiti.png" mode="" style="width: 87rpx;height: 57rpx;position: relative;top: 20rpx;"></image>
							<text style="position:absolute;left: 698rpx;font-size: 26rpx;color: #FFFFFF;">调</text>
						</view>
					</view>
					<view v-show="item.is_trim!==1">
						<text style="margin-right: 28rpx;font-size: 22rpx;" :style="{color:item.state==3?'rgba(243, 115, 0, 1)':item.state==4?'rgba(154, 154, 154, 1)':item.state==5?'rgba(207, 22, 57, 1)':item.state==1?'rgba(154, 154, 154, 1)': item.state==0?'rgba(154, 154, 154, 1)': ''}">{{item.state==3?'执行成功':item.state==4?'取消执行':item.state==5?'执行失败':item.state==1?'未执行':item.state==0?'未确认': ''}}</text>
					</view>
				</view>

			</view>
			<!-- 	
			<view v-for="(item1,index1) in child" :key="index1" class="grace-rows" style="margin-top: 4rpx; width:750rpx;height:100rpx;"
			 :style="{background:item1.type==='还款'?'rgba(255,235,218,1)':'rgba(255,255,255,1)'}"> -->
			<!-- 状态 -->
			<!-- <view style=" margin: auto 20rpx; ">
					<view class="grace-columns">
						<image class="" :src="item1.type==='支付'?'../../static/weixiaofei.png':'../../static/lanhuankuan.png'" style="width: 66rpx;height: 46rpx;"></image>
						<text style="font-size:22rpx;font-weight:400;" :style="{color:item1.type==='还款'?'rgba(129,185,255,1)':'rgba(153,153,153,1)'}">未确认</text>
					</view>
				</view> -->

			<!-- 信息 -->
			<!-- <view class="grace-columns">
					<view class="grace-space-between" style="margin-top: 5rpx;">
						<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">金额：￥{{item1.money}}</text>
						<text v-show="item1.type!='还款'" style="font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">类型：{{ item1.x_type }}</text>
					</view>
					<view style="margin-top: 8rpx; width:580rpx;height:1rpx;background:rgba(204,204,204,1);"></view>
					<view class="grace-space-between" style="margin-top: 8rpx;">
						<text v-show="item1.type!='还款'" style="font-size:22rpx;font-weight:400;color:rgba(102,102,102,1);">手续费：￥{{ item1.poundage }}</text>
						<text style="font-size:22rpx;font-weight:400;color:rgba(51,51,51,1);">{{ item1.date }}</text>
						<view>
							<text style="font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">{{ item1.times }}</text> -->
			<!-- <image src="../../static/bianji.png" style="width: 30rpx;height: 30rpx;"></image> -->
			<!-- 	</view>
					</view>
				</view>
			</view> -->
			<!-- </view> -->
			<!-- <view style="height:110rpx;"></view>
			<view class="grace-rows" style="position: fixed;bottom: 0;">
				<view @tap="Goto('/pages/card_keeper/card_keeper')" style="width:380rpx;height:110rpx;background:rgba(242,96,97,1);font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);line-height: 110rpx;text-align: center;">重新生成</view>
				<view @tap="jianquan()" style="width:380rpx;height:110rpx;background:rgba(218,28,30,1);font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);line-height: 110rpx;text-align: center;">确认计划</view>
			</view> -->

			<!-- 鉴权 -->
			<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<text style="font-size: 26rpx;">验证码已发送至您</text></br>
					<text style="font-size: 24rpx;">尾号{{ yuliushouji }}的手机</text>
					<input @input="jianquanjianzhenma" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx"
					 placeholder="请输入验证码" />
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
				</view>
			</graceDialog>
			<!-- 鉴权 -->
			<uni-popup ref="popup" type="center">
				<view class="popup">
					<view style="text-align: center;line-height: 90rpx;">
						<icon type="success" size="25" color="RGBA(9, 187, 7, 1)" />
						<view style="margin-top: -40rpx;">{{value}}</view>
					</view>
					<view style="text-align: center;margin-top: 0rpx;">我知道了</view>
				</view>
			</uni-popup>
			<!-- 调整笔数弹框 -->
			<graceDialog :isTitle="false" :show="tiaoz" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="height: 300rpx;z-index: 9;">
					<view style="text-align: center;">
					<text style="font-size: 26rpx;">{{ tanchuang_text }}</text></br>
					</view>
					<view style="margin-top: 20rpx;">
						<text style="font-size: 26rpx;">请选择笔数：</text>
						<view >
						 <radio-group @change="radioChange">
						    <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						        <view style="display: inline-block">
						            <radio :value="item.value" :checked="index==current" />
						        </view>
						        <view style="display: inline-block;margin-right: 10rpx;margin-left: -5rpx;">{{item.name}}</view>
						    </label>
						</radio-group>
						</view>
					</view>
				</view>
				
				<view slot="btns" class="grace-space-between">
					<view class="zhix_qr" @tap="bishuqr">确认</view>
					<view class="zhix_qx" @tap="bishuqx">取消</view>
				</view>
			</graceDialog>
			<!-- 修改时间弹框 -->
			<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange'></date-time-picker>
		</view>
	</gracePage>
</template>

<script>
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import gracePage from "../../graceUI/components/gracePage.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker.vue';
	export default {
		data() {
			return {
				// child: [], //子订单
				// plan_id: '',
				// bank_id: "", //信用卡id
				// start_time: '2020-1-1',
				// bill_money: "0", //账单金额
				// rp_price: "0", //建议留卡金额
				// end_time: "2020-01-1", //结束时间
				// num: "0", //笔数
				// poundage: 1, //手续费
				// zhouzhuanshouxu: '暂无', //周转金手续费
				// // 鉴权
				show3: false,
				// yijianquan: 0,
				// yanzhengma: '', //验证码
				yuliushouji: '', //预留手机
				// is_coupon: 0, //是否使用优惠券
				// coupon: 0, //抵扣券金额
				// is_bool: false,
				// types: '',
				// jianquans: {
				// 	yuliushouji: '',
				// 	order_num: '', //订单号
				// 	sms_code: ''
				// }
				channel_id: '',
				bc_id: '',
				times: '',
				dates: '',
				pay_money: '',
				had_money: '',
				c_code: '',
				now_time: '',
				schema: '',
				plan: {},
				details: [],
				value: '计划生成成功！',
				tiaoz: false,
				tanchuang_text: '调整笔数',
				items: [{
				            value: '1',
				            name: '单笔'
				        },
				        {
				            value: '2',
				            name: '多笔',
				            checked: 'true'
				       }],
				current: 1,
				dateString: '',
				type: 'datetime-all',
				tioaid: '',
				id: '',
				coupon: 0 ,// 已抵扣的金额
				
			}
		},
		computed: {
			indicatorStyle() {
				return {
					background: 'rgba(255,0,0,.2)',
					height: '40px',
				};
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.channel_id = opt.channel_id,
				this.bc_id = opt.bc_id,
				this.times = opt.times,
				this.dates = opt.dates,
				this.pay_money = opt.pay_money,
				this.had_money = opt.had_money,
				this.c_code = opt.c_code, //城市编码
				this.now_time = opt.now_time,
				this.schema = opt.schema
				this.coupon = opt.coupon
		},
		onShow: function() {
			this.chongxin()
		},
		components: {
			gracePage,
			graceDialog,
			uniPopup,
			DateTimePicker
		},
		// onBackPress() {
		// 	uni.navigateTo({
		// 		url: '/pages/card_keeper/card_keeper'
		// 	})
		// 	return true;
		// },
		methods: {
			jianquan() {
				var vm = this;
				this.sumbit(function() {
					console.log({
						card: vm.bank_id
					})
					vm.req.mypost(
						vm.lochost + '/mytrunk/mypassageway/channel_authentication', {
							card: vm.bank_id,
							types: '1,2'
						},
						function(res) {
							console.log(res)
							if (res.code == 200) {
								var is_need_SMS = res.data.is_need_SMS;
								if (is_need_SMS === 0) {
									vm.msg_show(res.msg);
									vm.sumbit();
									setTimeout(function() {
										vm.Back(2)
									}, 500);
									// v-m.yijianquan = 1
								} else if (is_need_SMS === 1) {
									console.log('nihao')
									vm.showDialog3()
									console.log('nibuhao')
									vm.jianquans.order_num = res.data.order_num;
									vm.jianquans.yuliushouji = res.data.phone;
								} else if (is_need_SMS === 2) {
									uni.redirectTo({
										url: '/pages/web_view/web_view?url=' + res.data.url
									})
									// vm.Goto('/pages/web_view/web_view?url='+res.data.url);
								}
							} else {
								uni.showToast({
									title: '签约系统异常',
									icon: 'none'
								})
							}
						}
					)
				})

			},
			// 点击显示调整弹框
			tiaozheng(id){
				this.tioaid = id
				this.tiaoz = true
			},
			radioChange: function(evt) {
				console.log(evt);
				var items = this.items;
				var that = this;
				items.forEach(function(v,i){
					if(v.value==evt.target.value){
						that.current = i;
					}
				})
				
			},
			bishuqr(){
				var items = this.items;
				var num = items[this.current].value;
				console.log(num);
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=order_son_trim',{
						id: vm.tioaid,
						num: num
					},
					function(res){
						console.log(res);
						if(res.code == 200){
							vm.tiaoz = false
							uni.showToast({
								title: '调整成功',
								icon: 'none'
							})
							setTimeout(function(){
								vm.req.post(
									vm.lochost + '/index/index?method=refund_plan_details', {
										id: vm.plan.order_id
									}, {},
									function(res) {
										console.log(res);
										vm.plan = res.data.plan
										vm.details = res.data.details
									})
								// vm.chongxin()
							},500)
						}else{
							vm.tiaoz = false
							uni.showToast({
								title:res.msg,
								icon: 'none'
							})
						}
					}
				)
			},
			// 取消弹框显示
			bishuqx(){
				this.tiaoz = false
			},
			// 修改时间
			selectDatePicker(id) {
				console.log(id);
				this.id = id
				this.$refs['date-time'].show();
			},
			dateTimeChange(value){
				console.log(value);
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=update_plan_date',{
						id: vm.id,
						plan_date: value
					},{},
					function(res){
						console.log(res);
						if(res.code == 200){
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							var details = vm.details
							var new_plan_date = res.data.new_plan_date
							var plan_date = value.slice(5,10)
							var that = this
							details.forEach(function(v,i){
								if(vm.id == v.plan[i].id){
									 v.plan[i].time = new_plan_date
									 v.plan[i].date = plan_date
									 console.log(new_plan_date);
									vm.details = details
								}
							})
						}
					}
				)
			},
			sumbit: function(myfunc) {
				console.log(myfunc)
				var that = this;
				var url = that.lochost + '/mytrunk/repaymentplan/confirm_plan';
				that.req.post(url, {
					id: that.plan_id
				}, {}, function(res) {
					if (res.code == 200) {
						that.is_bool = true;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if (myfunc) {
							myfunc();
						}
						that.Goto('/pages/card_keeper/card_keeper')

					} else {
						that.is_bool = false;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						
					}
				})
			},
			//鉴权验证码输入
			jianquanjianzhenma(res) {
				var value = res.detail.value;
				this.jianquans.sms_code = value;
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
					var vm = this;
					this.req.post(
						this.lochost + '/api/index/index?method=confirm_channel_authentication', {
							order_num: this.jianquans.order_num,
							sms_code: this.jianquans.yanzhengma,
						}, {},
						function(res) {
							vm.closeDialog3();
							vm.msg_show(res.msg);
							// vm.sumbit();
							setTimeout(function() {
								vm.Back(5)
							}, 500);
						}
					)
				}

			},
			Gotos() {
				var url = '/pages/generation_plan/generation_plan?card_id=' + this.card_id;

			},
			// 重新生成计划
			chongxin() {
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=make_refund_plan', {
						channel_id: this.channel_id,
						bc_id: this.bc_id,
						times: this.times,
						dates: this.dates,
						pay_money: this.pay_money,
						had_money: this.had_money,
						c_code: this.c_code, //城市编码
						now_time: this.now_time,
						schema: this.schema,
						max_deduct_money: this.coupon
					}, {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							vm.plan = res.data.plan
							vm.details = res.data.details
						}
						// vm.msg_show(res.msg);
					}
				)
			},
			// 确认生成计划
			shengchen() {
				// console.log(this.plan.order_id)
				this.$refs.popup.open()
				// return
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=confirm_plan', {
						id: vm.plan.order_id
					}, {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							// vm.$refs.popup.open()
							setTimeout(function() {
								vm.$refs.popup.close();
								vm.Goto('/pages/generation_plan/details_of_the_plan?id=' + vm.plan.order_id + '&schema=' + vm.schema)
							}, 1000)
						}
					}
				)
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

	.xianqi {
		width: 750rpx;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
	}

	.xianqi_1 {
		display: flex;
		/* justify-content: space-between; */
		margin-left: 60rpx;
		margin-top: 20rpx;
		margin-right: 75rpx;
	}

	.xianqi_2 {
		display: flex;
		/* justify-content: space-between; */
		margin-left: 60rpx;
		margin-top: 10rpx;
		margin-right: 75rpx;
	}

	.timej {
		width: 750rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.huankuans {
		width: 750rpx;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	.xiaofeiv {
		width: 750rpx;
		height: 130rpx;
		background-color: #FFFFFF;
		font-size: 28rpx;
		margin-top: 1rpx;

	}

	.xiaofeivs {
		position: absolute;
		left: 28rpx;
	}

	.cxsc {
		width: 200rpx;
		height: 80rpx;
		border: 1rpx solid #007AFF;
		margin-left: 30rpx;
		line-height: 80rpx;
		color: #007AFF;
		text-align: center;
		display: inline-block;
		margin-right: 80rpx;
		border-radius: 6rpx;
	}

	.confirms {
		display: inline-block;
		width: 400rpx;
		height: 80rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		border-radius: 6rpx;
	}

	.popup {
		width: 440rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.zhix_qr{
		position: absolute;
		bottom: 0;
		width: 270rpx;
		height: 70rpx;
		background-color: rgba(79, 159, 254, 1);
		border-radius: 0 0 0 10rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 34rpx;
	}
	.zhix_qx{
		position: absolute;
		bottom: 0;
		right: 0;
		width: 270rpx;
		height: 70rpx;
		background-color: rgba(79, 186, 254, 1);
		border-radius: 0 0 10rpx 0;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 34rpx;
	}
</style>
