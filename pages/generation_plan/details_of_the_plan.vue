<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<view class="grace-columns" :style="{background:bank.back_color}" style="margin: 20rpx 40rpx;width:670rpx;height:290rpx;box-shadow:0px 0px 15rpx 0px rgba(131,131,131,0.3);border-radius:10rpx;">
				<view class="grace-rows" style="margin-left: 36rpx;margin-top: 30rpx;">
					<image :src="bank.bank_icon_url" style="width: 50rpx;height: 50rpx;"></image>
					<view class="grace-columns" style="margin-left: 22rpx;position: relative; bottom: 7rpx;">
						<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.bank_name}}</text>
						<image src="../../static/xinyongka.png" style="width: 60rpx;height: 22rpx;"></image>
					</view>
				</view>
				<!-- 白色横线 -->
				<view style="margin-top: 10rpx; width:598rpx;height:1rpx;background:rgba(247,247,247,1);margin-left: 36rpx;"></view>
				<!-- 卡信息 -->
				<view class="grace-space-between" style="margin: 20rpx 100rpx;">
					<view class="grace-columns" style="text-align: center;">
						<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">账单日</text>
						<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.bc_bill}}日</text>
					</view>
					<view class="grace-columns" style="text-align: center;">
						<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">还款日</text>
						<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.bc_repayment}}日</text>
					</view>
					<view class="grace-columns" style="text-align: center;">
						<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">已还金额</text>
						<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.back_price}}元</text>
					</view>
				</view>
				<!-- 计划信息 -->
				<view style="width:670rpx;height:80rpx;background:rgba(255,255,255,1);border-radius:10rpx;margin-top: 10rpx;" class="grace-rows">
					<text :style="{color:plan.state==3?'rgba(243, 115, 0, 1)':plan.state==4?'rgba(154, 154, 154, 1)':plan.state==5?'rgba(207, 22, 57, 1)':plan.state==1?'rgba(154, 154, 154, 1)': plan.state==0?'rgba(154, 154, 154, 1)':plan.state==2?'rgba(0,255,0,255)': ''}"
					 style="margin-left: 45rpx; font-size:26rpx;font-weight:400;line-height: 80rpx;">{{plan.state==3?'执行成功':plan.state==4?'取消执行':plan.state==5?'执行失败':plan.state==1?'未执行':plan.state==0?'未确认': plan.state==2?'计划执行中':''}}</text>
					<!-- 终止计划按钮 -->
					<button v-if="plan.state==1||plan.state==2||plan.state==5" @tap="button_names==='终止计划'?showDialog3(plan_id): ''"
					 style="position: relative;right: -140rpx; margin-top: 10rpx; line-height: 60rpx; width:180rpx;height:60rpx;border:2rpx solid rgba(79,159,254,1);border-radius:10rpx; font-size:30rpx;font-weight:400;color:rgba(79,159,254,1);">{{button_names}}</button>
					<!-- 终止计划按钮 -->

					<!-- 继续执行按钮 -->
					<button v-else @tap="huifujihua(plan_id)" style="position: relative;right: -140rpx; margin-top: 10rpx; line-height: 60rpx; width:180rpx;height:60rpx;border:2rpx solid rgba(79,159,254,1);border-radius:10rpx; font-size:30rpx;font-weight:400;color:rgba(79,159,254,1);">{{button_name}}</button>
					<!-- 继续执行按钮 -->
				</view>
			</view>

			<!-- 计划详情信息 -->
			<view class="grace-rows" style="margin-top: 10rpx; line-height: 90rpx; width:750rpx;height:90rpx;background:rgba(255,255,255,1);">
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
					<text style="font-size: 24rpx;margin-right: 65rpx;">还款总金额：{{plan.pay_back_price}}元</text>
					<text style="font-size: 24rpx;">还款笔数：{{plan.back_times}}笔</text>
				</view>
				<view class="xianqi_2">
					<text style="font-size: 24rpx;margin-right:90rpx;">启动金额：{{plan.had_price}}元</text>
					<text style="font-size: 24rpx;">还款手续费：{{plan.refund_poundage}}元</text>
				</view>
				<view class="xianqi_2">
					<text style="font-size: 24rpx;margin-right: 40rpx;">计划截止日期：{{plan.end_day}}</text>
					<text style="font-size: 24rpx;">周转金手续费：{{plan.revolve_poundage}}元</text>
				</view>
			</view>
			<!-- 计划暂停时 -->
			<view v-if="plan.state==5">

				<view class="tixiang">
					<view class="liuyan" @tap="liuyantamk">
						<image src="../../static2/zixun.png" mode="" style="width: 84rpx;height: 94rpx;margin: 23rpx 28rpx;"></image>
					</view>
					<view style="width:540rpx;margin-left: 173rpx;">
						<text class="xinxi">计划已临时暂停，请耐心等待。系统将在<i style="font-style: normal;font-weight: 700;">24小时</i>内自动恢复</text>
					</view>
				</view>
				<view class="yue">
					<text class="yue_buz">如本卡内可用额度不足， 请补完后点击继续执行</text>
					<view class="yue_ton" @tap="huifujihua(plan_id)" v-if="daojis">继续执行</view>
				</view>
			</view>
			<!-- 计划暂停时 -->
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
					<!-- 消费执行时间 -->
					<view style="margin-top: 10rpx;position: absolute;right: 0;">
						<view style="font-size: 24rpx;margin-right: 28rpx;color: rgba(102, 102, 102, 1);margin-left: 96rpx;">{{item1.date}}</view>
						<view style="font-size: 24rpx;margin-right: 29rpx;color: rgba(102, 102, 102, 1);margin-top: 10rpx;margin-bottom: 10rpx;margin-left: 70rpx;">{{item1.time}}
							<image @tap="selectDatePicker(item1.id)" v-show="schema==2||item1.state==1" src="../../static2/xiugai.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
						</view>

						<view style="font-size: 22rpx;margin-left: 70rpx;" :style="{color:item1.state==3?'rgba(243, 115, 0, 1)':item1.state==4?'rgba(154, 154, 154, 1)':item1.state==5?'rgba(207, 22, 57, 1)':item1.state==1?'rgba(154, 154, 154, 1)':item1.state==2?'rgba(243, 115, 0, 1)': ''}">{{item1.state==3?'&nbsp执行成功':item1.state==4?'&nbsp取消执行':item1.state==5?'&nbsp执行失败':item1.state==1?'&#8195&nbsp未执行':item1.state==2?'&nbsp执行成功': ''}}</view>
					</view>
				</view>
				<!-- 还款金额 -->
				<view class="huankuans">
					<text style="margin-left: 25rpx;">还款：￥{{item.back_price}}</text>
					<!-- 还款状态 -->
					<view v-show="item.is_trim==1">
						<text style="font-size: 22rpx;" :style="{color:item.state==3?'rgba(243, 115, 0, 1)':item.state==4?'rgba(154, 154, 154, 1)':item.state==5?'rgba(207, 22, 57, 1)':item.state==1?'rgba(154, 154, 154, 1)': ''}">{{item.state==3?'执行成功':item.state==4?'取消执行':item.state==5?'执行失败':item.state==1?'未执行':''}}</text>
						<view style="display: inline-block;" @tap="tiaozheng(item.id)">
							<image src="../../static2/daiti.png" mode="" style="width: 87rpx;height: 57rpx;position: relative;top: 20rpx;"></image>
							<text style="position:absolute;left: 698rpx;font-size: 26rpx;color: #FFFFFF;">调</text>
						</view>
					</view>
					<view v-show="item.is_trim!==1">
						<text style="font-size: 22rpx;margin-right: 28rpx;" :style="{color:item.state==3?'rgba(243, 115, 0, 1)':item.state==4?'rgba(154, 154, 154, 1)':item.state==5?'rgba(207, 22, 57, 1)':item.state==1?'rgba(154, 154, 154, 1)': ''}">{{item.state==3?'执行成功':item.state==4?'取消执行':item.state==5?'执行失败':item.state==1?'未执行':''}}</text>
					</view>
				</view>

			</view>
			<!-- 终止计划弹框 -->
			<uni-popup ref="popups" type="center">
				<view class="conpoup">
					<view style="font-size: 30rpx;color: rgba(136, 136, 136, 1);text-align: center;transform: translateY(47rpx);">
						<text>本次计划已还款{{plan.already_refund}}元</text>
					</view>
					<view style="font-size: 30rpx;color: rgba(136, 136, 136, 1);text-align: center;transform: translateY(47rpx);">
						<text>手续费为{{plan.already_poundage}}元</text>
					</view>
					<view style="font-size: 36rpx;color:rgba(51, 51, 51, 1);text-align: center;transform: translateY(60rpx);">
						<text>确认终止计划？</text>
					</view>
					<view style="font-size: 26rpx;color:rgba(136, 136, 136, 1);text-align: center;transform: translateY(80rpx);">
						<text>剩余金额将退还到银行卡</text>
					</view>
					<view>
						<view class="jhqr" @tap="zhongzhijihua(plan_id)">确认</view>
						<view class="jhqrd" @tap="closeDialog3">取消</view>
					</view>
				</view>
				<!-- <view class="content2" slot="content" style="text-align: center;">
					<text style="font-size: 26rpx;">确认终止该计划</text>
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="zhongzhijihua(plan_id)">确认</text>
				</view> -->
			</uni-popup>
			<!-- 终止计划弹框 -->
			<!-- 鉴权 -->
			<graceDialog :isTitle="false" :show="show4" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<text style="font-size: 26rpx;">验证码已发送至您</text>
					<text style="font-size: 24rpx;">尾号{{ jianquans.yuliushouji }}的手机</text>
					<input @input="jianquanjianzhenma" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx"
					 placeholder="请输入验证码" />
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog4">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="confirm4">确认</text>
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
			<!-- 留言弹框 -->
			<uni-popup ref="popupliu" type="center">
				<view class="liu_popup">
					<view style="display: flex;justify-content:space-between;">
						<uni-icons type="back" size="25" style="margin-top: 41rpx;margin-left: 25rpx;" @tap="quxiaoliuy"></uni-icons>
						<text class="liu_tits">留言咨询</text>
						<text class="liu_titis" @tap="fankui">发送</text>
					</view>
					<view style="width: 500rpx;height: 355rpx;border: 1rpx solid rgba(153, 153, 153, 1);border-radius: 10rpx;margin-left: 50rpx;margin-top: 20rpx;">
						<textarea placeholder-style="color:rgba(153, 153, 153, 1);" placeholder="请输入留言内容（100字以内）" style="margin-top:24rpx;margin-left: 10rpx;font-size: 26rpx;width: 480rpx;"
						 maxlength="100" @input="contents" />
						</view>
				</view>
			</uni-popup>
			<!-- 继续执行弹框 -->
			<uni-popup ref="popupzhix" type="center">
				<view class="jx_popup">
					<view style="width: 450rpx;text-align: center;margin-left:50rpx;transform: translateY(35rpx);">
						<text>继续执行计划需信用卡可用额度大于374.00元</text>
					</view>
					<view style="text-align: center;transform: translateY(35rpx);">
						<text>确认继续执行？</text>
					</view>
					<view style="text-align: center;transform: translateY(35rpx);">
						<text>请确保信用卡可用余额充足</text>
					</view>
					<view style="text-align: center;transform: translateY(35rpx);">
						<text>继续执行计划可能会变更计划</text>
					</view>
					<view>
						<view class="zhix_qr" @tap="zhixqrs">确认</view>
						<view class="zhix_qx" @tap="zhixqux">取消</view>
					</view>
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
			<!-- 修改时间 选择器弹框 -->
			<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange'></date-time-picker>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import uniIcons from "@/components/yangxiaochuang-icons/yangxiaochuang-icons.vue";
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker.vue';
	export default {
		data() {
			return {
				plan_id: '',
				create_time: "2020年01月1日", //创建时间
				end_time: "2020-01-1", //截止时间
				zong_money: 0, //还款总金额
				num: 0, //刷卡次数
				rp_price: 0, //启动资金
				poundage: 0, //手续费
				revolving_fund: "0", //周转金手续费
				back_price: 0, //已还金额
				stop_msg: null, //终止原因
				rp_state: "未执行", //执行状态
				state_stop: "无终止", //终止状态
				child: [], //子订单
				bank: {},
				bankname: '', //银行卡信息
				banklast: '', //银行卡信息
				yinhang: {}, //银行卡封面
				button_name: '暂停计划',
				button_names: '终止计划',
				is_coupon: 0, //是否使用优惠券
				coupon: 0, //抵扣券金额
				show3: false,//终止计划弹框是否显示
				show4: false,//鉴权弹框是否显示
				countdown: 0, //倒计时
				daojis: true,
				jianquans: {
					yuliushouji: '',
					order_num: '', //订单号
					sms_code: '' // 验证码
				},
				details: [], //子订单详情,
				plan: {},
				value: '该订单停止成功！',
				content: '',
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
				id: '',
				schema: '',
				dateString: '',
				type: 'datetime-all',
				ideds: ''
			}
		},
		onLoad: function(opt) {
			this.plan_id = opt.id;
			this.schema = opt.schema
			this.get_info(this.plan_id);
			console.log(opt);
			this.count()
		},
		computed: {
			indicatorStyle() {
				return {
					background: 'rgba(255,0,0,.2)',
					height: '40px',
				};
			}
		},
		methods: {
			get_info(id) {
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=refund_plan_details', {
						id: vm.plan_id
					}, {},
					function(res) {
						console.log(res);
						// vm.child = res.data.child;
						// vm.bankname = res.data.bank.name;
						// vm.banklast = res.data.bank.bc_bank_number.last;
						vm.bank = res.data.bank;
						vm.plan = res.data.plan
						vm.details = res.data.details
						// vm.create_time = res.data.orders.create_time;
						// vm.end_time = res.data.orders.end_time;
						// vm.zong_money = res.data.orders.zong_money;
						// vm.num = res.data.orders.num;
						// vm.rp_price = res.data.orders.rp_price;
						// vm.poundage = res.data.orders.poundage;
						// vm.revolving_fund = res.data.orders.revolving_fund;
						// vm.back_price = res.data.orders.back_price;
						// vm.stop_msg = res.data.orders.stop_msg;
						// vm.rp_state = res.data.orders.rp_state;
						// vm.state_stop = res.data.orders.state_stop;
						// vm.yinhang = res.data.yinhang;
						// vm.is_coupon = res.data.orders.is_coupon, //是否使用优惠券
						// vm.coupon = res.data.orders.coupon //抵扣券金额
						// vm.countdown = res.data.orders.restart_time
						if (vm.rp_state === '已暂停') {
							vm.button_name = '继续执行';
						} else {
							vm.count()
						}

					}
				);
				this.count()
			},
			// 点击显示调整弹框
			tiaozheng(id){
				this.id = id
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
						id: vm.id,
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
								vm.get_info()
							
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
			selectDatePicker(id){
				this.ideds = id
				this.$refs['date-time'].show();
			},
			dateTimeChange(value){
				console.log(value);
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=update_plan_date',{
						id: vm.ideds,
						plan_date: value
					},{},
					function(res){
						console.log(res);
						if(res.code == 200){
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							setTimeout(function(){
								vm.get_info()
							},500)
							
							// var details = vm.details
							// var new_plan_date = res.data.new_plan_date
							// var plan_date = value.slice(5,10)
							// var that = this
							// details.forEach(function(v,i){
							// 	if(vm.id == v.plan[i].id){
							// 		 v.plan[i].time = new_plan_date
							// 		 v.plan[i].date = plan_date
							// 		 console.log(new_plan_date);
							// 		vm.details = details
							// 		vm.get_info()
							// 	}
							// })
						}
					}
				)
			},
			// 鉴权
			jianquan() {
				var vm = this;
				console.log({
					card: this.card_id
				})
				vm.req.post(
					vm.lochost + '/index/index?method=channel_authentication',
					{
						bc_id: vm.card_id,
						channel_id: vm.channel_id
					}, {},
					function(res) {
						console.log(res)
						var is_need_SMS = res.data.is_need_SMS;
						if (is_need_SMS === 0) {
							vm.msg_show(res.msg);
							vm.yulanjihua();
						} else if (is_need_SMS === 1) {
							vm.order_num = res.data.order_num;
							vm.yuliushouji = res.data.phone;
							vm.showDialog3()
						} else if (is_need_SMS === 2) {
							vm.Goto('/pages/web_view/web_view?url=' + res.data.url);
						}
					}
				)
			},
			//终止计划按钮
			zhongzhijihua(id) {				
				this.$refs.popups.close()
				this.$refs.popup.open()
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=stop_refund', {
						id: this.plan_id
					}, {},
					function(res) {
						setTimeout(function() {
							 vm.$refs.popup.close();
							 vm.Goto('/pages/card_keeper/card_keeper');
						}, 1000);
						
					}
				)
			},
			
			zantingjihua(id) {
				var vm = this;
				vm.req.post(
					vm.lochost + '/mytrunk/repaymentplan/suspend_refund', {
						id: this.plan_id
					}, {},
					function(res) {
						setTimeout(function() {
							vm.msg_show(res.msg)
						}, 500);
						// vm.Back(1);
						vm.Goto('/pages/card_keeper/card_keeper')
					}
				)
			},
			// 继续执行按钮
			huifujihua() {
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=detection_channel_authentication', {
						bc_id: vm.bank.bc_id,
						channel_id:vm.plan.channel_id
					},{},
					function(res) {
						// console.log(res);
						if(res.data.authentication==1){
							vm.huifujihuas()
						}else{
							vm.jianquan()
						}
						// setTimeout(function() {
						// 	vm.msg_show(res.msg)
						// }, 500);
						// if (res.code == 200) {
						// 	var is_need_SMS = res.data.is_need_SMS;
						// 	if (is_need_SMS === 0) {
						// 		that.yijianquan = 1;
						// 		vm.get_info(vm.plan_id);
						// 	} else if (is_need_SMS === 1) {
						// 		that.yijianquan = 1;
						// 		that.show4 = true
						// 		that.jianquan.yuliushouji = res.data.phone

						// 	} else if (is_need_SMS === 2) {
						// 		that.yijianquan = 1;
						// 		uni.redirectTo({
						// 			url: '/pages/souxin_view/souxin_view?url=' + res.data.url
						// 		});
						// 	}
						// 	vm.count()
						// } else {
						// 	vm.get_info(vm.plan_id);
						// }
					}
				)
				// vm.daojis = false
			},
			zhixqrs(){
				this.$refs.popupzhix.close()
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=continue_work',{
						id:vm.plan_id
					},{},function(res){
						console.log(res);
						if(res.code == 200){
							uni.showToast({
								title:'计划继续执行成功！',
								icon:'none'
							})
							uni.navigateBack({
							    url:'/pages/index/index'
							});
						}
					}
				)
			},
			huifujihuas(){
				this.$refs.popupzhix.open()
			},
			zhixqux(){
				this.$refs.popupzhix.close()
			},
			contents(e){
				console.log(e);
				this.content = e.detail.value
			},
			// 发送留言
			fankui(){
				if(this.content !== ''){
					this.$refs.popupliu.close()
					var vm = this
					vm.req.post(
						vm.lochost + '/index/index?method=feedback',{
							pid:vm.bank.order_id,
							content:vm.content
						},{},function(res){
							console.log(res);
							if(res.code == 200){
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
							}
						}
					)
				}else{
					uni.showToast({
						title:'请输入留言内容',
						icon:'none'
					})
				}
				
			},
			// 留言
			liuyantamk(){
				this.$refs.popupliu.open()
			},
			// 取消留言
			quxiaoliuy(){
				this.$refs.popupliu.close()
			},
			//鉴权验证码输入
			jianquanjianzhenma(res) {
				var value = res.detail.value;
				this.jianquans.sms_code = value;
			},
			// 显示鉴权验证码输入框
			showDialog4: function() {
				this.show4 = true;
			},
			// 关闭鉴权输入框
			closeDialog4: function() {
				this.show4 = false;
			},
			// 验证码输入框选择了确认
			confirm4: function() {
				if (this.jianquans.yanzhengma === '') {
					this.msg_show('请输入验证码')
				} else {
					var vm = this;
					this.req.post(
						this.lochost + '/api/index/index?method=confirm_channel_authentication', {
							order_num: this.jianquans.order_num,
							sms_code: this.jianquans.yanzhengma,
						}, {},
						function(res) {
							vm.closeDialog4();
							vm.msg_show(res.msg);
							setTimeout(function() {
								vm.get_info(vm.plan_id)
							}, 500);
						}
					)
				}

			},
			// 显示终止计划确认框
			showDialog3: function(plan_id) {
				this.plan_id = plan_id;
				
				this.$refs.popups.open()
			},
			// 关闭终止计划确认框
			closeDialog3: function() {
				// this.show3 = false;
				this.$refs.popups.close()
			},
			// 倒计时
			count() {
				var vm = this
				if (vm.countdown > 0) {
					var $h = parseInt(vm.countdown / 3600); //24
					var $m = parseInt(vm.countdown % 3600 / 60)
					var $s = (vm.countdown % 3600) % 60;
					if ($h < 10) {
						$h = '0' + parseInt($h);
					}
					if ($m < 10) {
						$m = '0' + parseInt($m);
					}
					if ($s < 10) {
						$s = '0' + parseInt($s);
					}
					vm.button_name = $h + ':' + $m + ':' + $s;
					vm.button_names = $h + ':' + $m + ':' + $s;
					vm.countdown--;
					setTimeout(function() {
						vm.count();
					}, 1000)
				} else {
					vm.button_name = vm.button_name
					vm.button_names = vm.button_names
				}

			}
		},
		components: {
			gracePage,
			graceDialog,
			uniPopup,
			uniIcons,
			DateTimePicker
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
	

	.yue {
		width: 100%;
		height: 60rpx;
		background-color: #FFFFFF;
	}

	.yue_buz {
		font-size: 24rpx;
		color: #999999;
		margin-left: 12rpx;
		line-height: 60rpx;
	}

	.yue_ton {
		float: right;
		width: 160rpx;
		height: 40rpx;
		border-radius: 10rpx;
		font-size: 25rpx;
		line-height: 40rpx;
		margin-right: 10rpx;
		margin-top: 8rpx;
		border: 1rpx solid rgba(79, 159, 254, 1);
		text-align: center;
		color: rgba(79, 159, 254, 1);
	}

	.tixiang {
		width: 100%;
		height: 270rpx;
		background-color: #F05E07;
		/* margin-bottom: 10rpx; */
	}
	.liuyan{
		position: absolute;
		width: 140rpx;
		height: 140rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 73rpx;
		margin-left: 23rpx;
		text-align: center;
	}

	.xinxi {
		width: 348rpx;
		font-size: 60rpx;
		color: #FFFFFF;
		font-family: PingFang-SC-Regular !important;
		font-weight: 500;
	}
	.xianqi {
		width: 750rpx;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		margin-bottom: 11rpx;
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
	.huankuans{
		width: 750rpx;
		height:90rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}
	.xiaofeiv{
		width: 750rpx;
		height: 130rpx;
		/* line-height: 100rpx; */
		background-color: #FFFFFF;
		font-size: 28rpx;
		margin-top: 1rpx;
		/* display: flex;
		justify-content: space-between; */
	}
	.xiaofeivs {
		position: absolute;
		left: 28rpx;
	}
	.popup{
		width: 440rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.conpoup{
		width: 540rpx;
		height: 340rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.jhqr{
		position: absolute;
		top: 270rpx;
		width: 270rpx;
		height: 70rpx;
		background-color: rgba(79, 159, 254, 1);
		border-radius: 0 0 0 10rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 34rpx;
		color: #FFFFFF;
	}
	.jhqrd{
		position: absolute;
		top: 270rpx;
		left: 270rpx;
		width: 270rpx;
		height: 70rpx;
		background-color:rgba(79, 186, 254, 1);
		border-radius: 0 0 10rpx 0;
		text-align: center;
		line-height: 70rpx;
		font-size: 34rpx;
		color: #FFFFFF;
	}
	.liu_popup{
		width: 600rpx;
		height: 500rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.liu_tits{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-top: 39rpx;
	}
	.liu_titis{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(79, 159, 254, 1);
		margin-top: 39rpx;
		margin-right: 31rpx;
	}
	.jx_popup{
		width: 540rpx;
		height: 320rpx;
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
