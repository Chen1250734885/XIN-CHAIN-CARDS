<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<graceHeader background="#1678FF">
				<view class="grace-header-body" style="background:#1678FF;">
					<view class="grace-rows">
						<view class="grace-header-icons grace-icons icon-arrow-left grace-white" @tap="Back(1)"></view>
						<view class="grace-flex-center" style="width: 750rpx;font-size: 30rpx;">
							<graceNavBar  lineHeight='70rpx' :size="200" color='#FFFFFF' activeColor='#FFFFFF' activeLineBg='#FFFFFF'
							 activeLineWidth='85rpx' :items="tabs" :currentIndex="currentIndex" @change="navChange"></graceNavBar>
						</view>
					</view>
				</view>
			</graceHeader>
			<swiper style="width: 750rpx;" :style="{height:height}" class="swiper" :current="currentIndex" @change="swiperChange">
				<swiper-item class="demo" v-for="(item1, index1) in cards_list" :key="index1">
					<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}">
						<view v-for="(item2,index2) in item1.data" :key="index2">
							<view style="margin: 20rpx auto; width:670rpx;height:240rpx;box-shadow:0px 0px 15rpx 0px rgba(131,131,131,0.3);border-radius:10rpx;"
							 :style="{background:item2.back_color}">
								<view :style="{backgroundImage: 'url('+item2.back_img+')'}" style="width:670rpx;height:240rpx; background-size: 288rpx 166rpx;background-repeat: no-repeat;background-position-x: 357rpx;background-position-y: 74rpx;">
									<view style="margin-left:30rpx;position: relative;top: 30rpx;">
										<view class="grace-rows">
											<image :src="item2.bank_icon_url" style="width: 50rpx;height: 50rpx;"></image>
											<!-- 银行名称 -->
											<view class="grace-columns" style="margin-left: 22rpx;width: 280rpx;">
												<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);white-space:nowrap;overflow:hidden;text-overflow : ellipsis;">{{ item2.bank_name }}</text>
												<image :src=" currentIndex ===0 ? '../../static/chuxuka.png' : '../../static/xinyongka.png'" style="width: 60rpx;height: 22rpx;"></image>
											</view>
											<!-- @tap="Goto(currentIndex ===0 ? '/pages/card_bag/modify_savings_card?bc_id='+item2.id+'&user_name='+item2.bc_account_name+'&bank_id='+item2.bc_bank_number.bc_bank_number+'&bc_mobile='+item2.bc_mobile+'&name='+item2.name+'&bc_bank_id='+item2.bc_bank_id :
											 '/pages/card_bag/modify_credit_card?bc_account_name='+item2.bc_account_name+'&bc_id='+item2.id+'&bc_bank_number='+item2.bc_bank_number.bc_bank_number+'&bc_bill='+item2.bc_bill+'&bc_repayment='+item2.bc_repayment+'&bc_cvn2='+item2.bc_cvn2+'&bc_effective='+item2.bc_effective+'&bc_mobile='+item2.bc_mobile+'&edu='+item2.edu)" -->

											<!-- 修改、解绑 -->
											<view class="grace-rows" style="">
												<button @tap="Goto(item1.name === '储蓄卡' ? '/pages/card_bag/modify_savings_card?bc_id='+item2.bc_id+'&bank_id='+item2.bank_id+'&bank_card='+item2.bc_bank_number+'&bank_tel='+item2.bc_mobile+'&bank_name='+item2.bank_name+'&bc_account_name='+item2.bc_account_name:
												'/pages/card_bag/modify_credit_card?id='+item2.bc_bank_id+'&bc_account_name='+item2.bc_account_name+'&bank_name='+item2.bank_name+'&bc_bank_number='+item2.bc_bank_number+'&bc_cvn2='+item2.bc_cvn2+'&bc_bill='+item2.bc_bill+'&bc_repayment='+item2.bc_repayment+'&bc_mobile='+item2.bc_mobile +'&bc_effective='+item2.bc_effective.slice(5)+'/'+item2.bc_effective.slice(2,4)+'&bc_id='+item2.bc_id)"
												 style="width:120rpx;height:45rpx;background:rgba(255,255,255,1);border-radius:20rpx;font-size:22rpx;font-weight:500;line-height: 45rpx;color: rgba(80, 160, 254, 1);">修改</button>


												<button @tap="Goto(item1.name === '储蓄卡' ? '/pages/card_bag/Unbundling?bc_id='+item2.bc_id+'&bank_id='+item2.bank_id+'&bank_card='+item2.bc_bank_number_c+'&bank_tel='+item2.bc_mobile+'&bank_name='+item2.bank_name+'&bc_account_name='+item2.bc_account_name:'/pages/card_bag/Credit_unbund?bc_account_name='+item2.bc_account_name+'&bc_bank_number_c='+item2.bc_bank_number_c+'&bank_name='+item2.bank_name+'&bc_effective='+item2.bc_effective+'&bc_bill='+item2.bc_bill+'&bc_repayment='+item2.bc_repayment+'&bc_mobile='+item2.bc_mobile+'&bc_id='+item2.bc_id)"
												 style="margin-left: 20rpx; width:120rpx;height:45rpx;background:rgba(255,255,255,1);border-radius:20rpx;font-size:22rpx;font-weight:500;line-height: 45rpx;color: rgba(80, 160, 254, 1);">解绑</button>


											</view>
										</view>
										<view class="kahao">{{item2.bc_bank_number_c}}</view>
										<!-- <view style="margin-top: 15rpx;">
											<text style="margin-left: 50rpx;font-size:40rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item2.bc_bank_number.bc_bank_number_c.substring(0,4) }}</text>
											<text style="margin-left: 50rpx;font-size:40rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item2.bc_bank_number.bc_bank_number_c.substring(4,8) }}</text>
											<text style="margin-left: 50rpx;font-size:40rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item2.bc_bank_number.bc_bank_number_c.substring(8,12) }}</text>
											<text style="margin-left: 50rpx;font-size:40rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item2.bc_bank_number.bc_bank_number_c.substring(12,item2.bc_bank_number.bc_bank_number_c.length) }}</text>
										</view> -->
										<view style="margin-top: 0rpx;margin-left: 80rpx;">
											<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item2.bc_bill!=null&&item2.bc_bill!='' ? '账单日：'+item2.bc_bill+'日': '' }}</text>
											<text style="margin-left: 180rpx; font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item2.bc_repayment!=null&&item2.bc_repayment!='' ? '还款日：'+item2.bc_repayment+'日': '' }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view>
							<button style="width:750rpx;height:100rpx;background:#1678FF;font-size:34rpx;color:rgba(255,255,255,1);border-radius: 0;position:fixed;bottom: calc( var(--window-bottom) - 10rpx);z-index: 999;"
							 @tap="add_card(item1.name)">+ 添加{{ item1.name }}</button>
						</view>
						<view v-show="item1.data.length==0" style="width: 680rpx;height: 290rpx;border-radius: 30rpx;margin: 10rpx auto;background:rgba(255,255,255,1);box-shadow:0px 0px 15px 0px rgba(131,131,131,0.3);" @tap="add_card(item1.name)">
							<view style="width: 60rpx;height: 60rpx;margin: 0 auto;">
								<image src="../../static2/tianjia.png" mode="" style="width: 100%;height: 100%;transform: translateY(69rpx);"></image>
							</view>
							<view style="text-align: center;margin-top: 70rpx;">
							<text style="color: rgba(79, 159, 254, 1);font-size: 24rpx;">添加{{ item1.name }}</text>
							</view>
						</view>
						<view style="height: 100rpx;"></view>
					</scroll-view>
				</swiper-item>
			</swiper>

			<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<!-- <text>请输入验证码</text> -->
					<text style="font-size: 26rpx;">确认与该银行卡解绑</text></br>
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
				</view>
			</graceDialog>
		</view>
	</gracePage>
</template>

<script>
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import graceHeader from '../../graceUI/components/graceHeader.vue';
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceNavBar from "../../graceUI/components/graceNavBar.vue";
	export default {
		data() {
			return {
				currentIndex: 0,
				height: '',
				tabs: ['储蓄卡', '信用卡'],
				cards: [],
				bc_type: '',
				bc_id: '',
				show3: false,
				// bc_bank_number_c:"6313******1511"
			}
		},
		onUnload() {
			uni.switchTab({
				url: '/pages/personal_center/personal_center'
			})
		},
		methods: {
			// 显示验证码输入框
			showDialog3: function(bc_type, bc_id) {
				this.bc_type = bc_type;
				this.bc_id = bc_id;
				this.show3 = true;
			},
			// 关闭输入框
			closeDialog3: function() {
				this.show3 = false;
			},
			// 验证码输入框选择了确认
			confirm3: function() {
				this.shanchu();
				this.closeDialog3();
				this.bc_type = '';
				this.bc_id = '';
			},
			shanchu() {
				var vm = this;
				var url = '';
				if (this.bc_type === '储蓄卡') {
					url = '/mytrunk/cardmanagement/del_savings';
				} else {
					url = '/mytrunk/cardmanagement/del_credit'
				};
				console.log(this.bc_id);
				vm.req.post(
					vm.lochost + url, {
						bc_id: this.bc_id
					}, {},
					function(res) {
						vm.msg_show(res.msg);
						vm.shuaxin();
					}
				)
			},
			// shanchu_xinyong(bc_id){
			// 	var vm=this;
			// 	// var url='';
			// 	// if(bc_type==='储蓄卡'){
			// 	// 	url='/mytrunk/index/del_savings';
			// 	// }else{
			// 	// 	url='/mytrunk/cardmanagement/del_credit'
			// 	// };
			// 	console.log(bc_id);
			// 	vm.req.post(
			// 	vm.lochost+'/mytrunk/cardmanagement/del_credit',
			// 	{bc_id:bc_id},
			// 	{},
			// 	function(res){
			// 		vm.msg_show(res.msg);
			// 		vm.shuaxin();
			// 	}
			// 	)
			// },
			navChange: function(e) {
				this.currentIndex = e;
				console.log(e);
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.currentIndex = index;
				console.log(e);
			},
			add_card(name) {
				if (name === '储蓄卡') {
					this.Goto('/pages/add_savings_card/add_savings_card')
				} else if (name === '信用卡') {
					this.Goto('/pages/add_credit_card/add_credit_card1')
				}
			},
			shuaxin() {
				var vm = this;
				// var sysinfo=uni.getSystemInfoSync();
				this.cards = [];
				this.height = (this.sys.safeArea.height - 48) + 'px';
				this.req.post(
					this.lochost + '/index/index?method=savings_card_list', {}, {},
					function(res) {
						console.log(res.data);
						vm.cards.push({
							data: res.data,
							name: '储蓄卡'
						})
						console.log(vm.cards);
						vm.req.post(
							vm.lochost + '/index/index?method=credit_card_list', {}, {},
							function(res) {
								console.log(res.data);
								vm.cards.push({
									data: res.data,
									name: '信用卡'
								})
							}
						)
					}
				)
				console.log(1);
			}
		},
		onShow: function() {
			this.shuaxin();
		},
		components: {
			gracePage,
			graceNavBar,
			graceHeader,
			graceDialog
		},
		computed: {
			cards_list() {
				return this.cards;
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
		font-size: 30rpx;
		color: #999999;
	}

	.kahao {
		font-size: 40rpx;
		color: #FFFFFF;
		margin-top: 40rpx;
		text-align: center;
	}
</style>
