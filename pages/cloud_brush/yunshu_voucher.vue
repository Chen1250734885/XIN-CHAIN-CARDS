<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<!-- 券使用明细 -->
			<!--  style="margin-top: 28rpx;display: inline-block;" -->
			<view class="dakai" @tap="dkmingx">
				<text >打开使用明细</text>
				<!-- style="font-size: 24rpx;margin-left: 28rpx;" -->
				<!-- <text style="font-size:30rpx;">></text> -->
				<!-- <image src="../../static/jiantou.png" style=" width: 15rpx;height: 25rpx;position: absolute;left: 181rpx;top: 30rpx;"></image> -->
			</view>
			<!-- <view style="display: inline-block;position: absolute;top: 0rpx;" >
				<text style="font-size: 20rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 50rpx;">{{log_data.show_str}}</text>
			</view> -->
			<!-- 抵扣券选择使用按钮 -->
			<view class="xzshiyong">
				<view style="display: flex;justify-content: space-between;">
					<!-- <view style="transform: translateY(31rpx);margin-left: 52rpx;">
						<text style="font-size: 36rpx;">还款手续费：{{shoyxufei}}</text>
					</view> -->
					<view style="transform: translateY(36rpx);margin-left: 52rpx;margin-right: 51rpx;">
						<text style="font-size: 36rpx;">余额：{{balance}}.00</text>
					</view>
					</view>
					<view style="transform: translateY(41rpx);margin-left: 52rpx;">
						<text style="font-size: 28rpx;color: #00AB1C;">本次可抵扣：{{money}}</text>
					</view>
				
				
				<view style="display: flex;justify-content: space-between;">
					<view class="shiyan" @tap="shiys" :style="{background:wxzhongs==0?'#DBDBDB':'#DBDBDB'}">
						<image v-if="wxzhongs==0" src="../../static/wxzhong.png" mode="" style="width: 37rpx;height: 37rpx;position: absolute;margin-top: 18rpx;margin-left: 34rpx;"></image>
						<image v-else src="../../static/xuanz.png" mode="" style="width: 36rpx;height: 35rpx;position: absolute;margin-top: 18rpx;margin-left: 34rpx;"></image>
						<text style="margin-left: 75rpx;" :style="{color:wxzhongs==0?'#000000':'#000000'}">确认使用</text>
					</view>
					<view class="bushiyan" @tap="bushiyong" :style="{background:xzhongs==0?'#DBDBDB':'#DBDBDB'}">
						<image v-if="xzhongs==0" src="../../static/wxzhong.png" mode="" style="width: 37rpx;height: 37rpx;position: absolute;margin-top: 18rpx;margin-left: 12rpx;"></image>
						<image v-else src="../../static/xuanz.png" mode="" style="width: 36rpx;height: 35rpx;position: absolute;margin-top: 18rpx;margin-left: 12rpx;"></image>
						<text style="margin-left: 50rpx;" :style="{color:xzhongs==0?'':'#000000'}">不使用抵用券</text>
					</view>
				</view>
				<!-- 生成计划按钮 -->
				<view class="shencplan" @tap="generate_plan">
					<text>下一步</text>
				</view>
			</view>
			<!-- 券列表展示与否按钮 -->
			<view>
				<view class="dakai" @tap="xians">
					<text>打开我的券包</text>
				</view>
				<view style="display: inline-block;margin-left: 33rpx;margin-top: 22rpx;margin-bottom: 22rpx;">
					<text>-</text>
					<text style="font-size: 28rpx;color: rgba(248, 17, 49, 1);">{{sum_num}}张<text style="color: #000000;">优惠券可用</text>
					</text>
					<text>-</text>
				</view>
				<!-- 券列表 -->
				<view style="margin-left: 23rpx;" @tap="fanx">
					<image :src="zengs.img_url" mode="" style="width: 696rpx;height: 216rpx;"></image>
					<text v-if="zengs.show_num!==0" class="shenyu">剩余抵扣券：{{zengs.show_num}}</text>
					<!-- 充值按钮 -->
					<view v-if="zengs.show_num!==0" class="chozhi" @tap="chongz(zengs.type,zengs.id,zengs.show_num)" :style="{background:zengs.show_num==0?'#DBDBDB':''}">
						<text :style="{color:zengs.show_num==0?'#000000':''}">充值</text>
					</view>
					<!-- 转让按钮 -->
					<view v-if="zengs.show_num!==0" class="zhuanras" @tap="zhuanrangs(zengs.type,zengs.id,zengs.show_num)" :style="{background:zengs.show_num==0?'#DBDBDB':''}">
						<text :style="{color:zengs.show_num==0?'#000000':''}">转让</text>
					</view>
				</view>
				<view style="margin-left: 23rpx;" v-show="yincas">
					<image :src="mais.img_url" mode="" style="width: 696rpx;height: 216rpx;"></image>
					<text class="shenyu">剩余抵扣券：{{mais.show_num}}</text>
					<!-- 充值按钮 -->
					<view class="chozhi" @tap="chongz(mais.type,mais.id,mais.show_num)" :style="{background:mais.show_num==0?'#DBDBDB':''}">
						<text :style="{color:mais.show_num==0?'#000000':''}">充值</text>
					</view>
					<!-- 转让按钮 -->
					<view class="zhuanras" @tap="zhuanrangs(mais.type,mais.id,mais.show_num)" :style="{background:mais.show_num==0?'#DBDBDB':''}">
						<text :style="{color:mais.show_num==0?'#000000':''}">转让</text>
					</view>
				</view>
			</view>

			<!-- 充值遮罩弹窗 -->
			<graceShade background="rgba(0,0,0,0.8)" :show="show" style="z-index: 999;">
				<image src="../../static/cztk.png" mode="" style="width: 750rpx;height: 1225rpx;"></image>
				<image src="../../static/jians.png" mode="" class="suljian" @tap="jianshu"></image>
				<text class="sulian">{{num}}</text>
				<image src="../../static/jias.png" mode="" class="suljia" @tap="jiashu"></image>
				<view class="qrcz" @tap="chongzhi">
					<text>确认充值</text>
				</view>
				<image src="../../static/guanbis.png" class="guanbi" @tap="c_tanchuang"></image>
			</graceShade>

			<!-- 抵扣券售卖弹框 -->
			<graceBottomDialog :show="show3" v-on:closeDialog="closeDialog3">
				<scroll-view scroll-y slot="content" style="background:rgba(255,234,169,1)">
					<view style="width:750rpx;height:1030rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;margin-bottom: 10rpx;">
						<view style="position: relative;bottom: 10rpx; width:750rpx;height:1030rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;">
							<view style="position: relative;top: 20rpx;">
								<image src="../../static/index_tejia.png" style="width: 422rpx;height: 50rpx;margin-left: 164rpx;"></image>
								<image @tap="closeDialog3()" src="../../static/guanbi.png" style="margin-left: 84rpx; width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="grace-space-between grace-wrap uni-padding-wrap uni-common-mt" style="padding:0 30rpx;" v-for="(item,index) in tejia" :key="index">
								<image  @tap="gomai(item.id,item.type)" :src="item.img_url" style="margin-top: 28rpx; width: 703rpx;height: 216rpx;margin-bottom: 20rpx;"></image>
								<view class="progress-box" v-show="item.type==1">
									<progress :percent="item.rate_num" activeColor="#FFFFFF" active stroke-width="8" backgroundColor="RGBA(228, 122, 128, 1)" border-radius="50px"  />
									<text style="font-size: 22rpx;color: #FFFFFF;display: block;margin-top: 5rpx;">已售{{item.rate_num}}%</text>
								</view>
							</view>

						</view>
					</view>
				</scroll-view>
			</graceBottomDialog>
			
			
			<!-- 验证码弹窗 -->
			<graceDialog :isTitle="false" :show="show1" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<text style="font-size: 26rpx;">验证码已发送至您手机</text></br>
					<input v-model="yanzhengma" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx" placeholder="请输入验证码" />
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
				</view>
			</graceDialog>
			<!-- 鉴权 -->
			<uni-popup ref="spopup" style="z-index: 9999;" :maskClick="false">
				<image :src="tupian" mode="" style="width: 570rpx;height: 617rpx;"></image>
				<image @tap="closeDialogs" src="../../static/guanbis.png" style="width: 70rpx;height: 70rpx;position: absolute;top: 0;right: 90rpx;"></image>
				<view class="fenxians" @tap="shares">
					<text>去分享</text>
				</view>
				<view class="guanbisa" @tap="closeDialogs">
					<text>关闭</text>
				</view>
			</uni-popup>
			
			<!-- 云刷验证短信确认 -->
			<uni-popup ref="popup" type="center" :maskClick="false">
				<view class="popup" >
					<view style="position: absolute;right: 10rpx;top:10rpx;" @tap="quxaos">
						<image src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
					</view>
					<view style="text-align: center;transform: translateY(40rpx);">
						<text>{{show_str}}</text>
					</view>
					<view style="transform: translateY(60rpx);">
						<view style="display: inline-block;transform: translateY(30rpx);margin-left: 20rpx;">短信验证码：</view>
						<input v-model="qr_yanzhengma" style="height: 20rpx; border-bottom:#B2B2B2 solid 2rpx;display: inline-block;margin-left: 190rpx;font-size: 26rpx;margin-top: -20rpx;text-align: center;"
						 placeholder="请输入验证码" />
					</view>
					<view class="sub_betw" @tap="yansbumi">
						<text>确认</text>
					</view>
				</view>
			</uni-popup>
			

		</view>
	</gracePage>
</template>

<script>
	import graceShade from "../../graceUI/components/graceShade.vue";
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				quan_id: 0,
				quan_index: 0,
				buyouhui: '../../static/weixuan.png',
				money: '', //抵扣金额
				max: 0, //最大使用金额
				dikou: [], //抵扣券列表
				log_data: [], // 抵扣券余额明细
				balance: '', // 抵扣券余额
				sum_num: '', // 可用抵扣券总数
				yincas: false, // 默认隐藏券列表
				num: '', // 可使用抵扣券充值数量
				types: '', // 获取券类型 
				show: false, // 充值弹框是否展示
				id: '', // 券列表id
				show3: false, // 抵扣券售卖弹框是否展示
				tejia: [], // 抵扣券售卖列表
				yuebuzs: false, // 余额不足时按钮显示
				shoyxufei: 0, // 还款手续费
				wxzhongs: 0, // 未选中
				xzhongs: 0, // 选中
				coupons: '', // 是否使用抵扣券的抵扣金额
				order_num: '', //订单号
				yuliushouji: '', //预留手机
				yanzhengma: '', //验证码
				card_name: '', // 银行名称尾号
				show1: false, // 鉴权验证弹框是否显示
				zhouzhuanjine: '',
				qr_yanzhengma: '',
				show_str: '',
				zfqdid: '', // 云刷短信确认支付渠道
				zf_order_num: '',
				tupian: '', // 抵扣券分享弹窗背景图片
				zengs: {}, // 赠送抵扣券列表
				mais: {}, // 购买抵扣券列表
			}
		},
		onLoad: function(opt) {
			this.money = opt.max;
			this.shoyxufei = opt.poundage
			this.get_info_data();
			this.xzhongs = 1
		},
		methods: {
			// 不使用抵扣券返回上一页
			bushiyong() {
				// uni.$emit('xuanzediyongquan', {
				// 	coupon_id: ''
				// })
				// this.Back(1);
				this.xzhongs = 1
				this.wxzhongs = 0
				this.coupons = 0
			},
			tap_shiyong(index, id) {
				this.quan_index = index;
				this.quan_id = id;
			},
			// 获取券列表
			get_info_data() {
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=deduct_roll_choice', {}, {},
					function(res) {
						console.log(res);
						vm.balance = parseFloat(res.data.balance)
						vm.sum_num = res.data.sum_num
						vm.zengs = res.data.zeng_roll
						vm.mais = res.data.mai_roll
						// vm.dikou = res.data.roll_data
						// vm.log_data = res.data.log_data[0]
						// console.log(res.data.log_data[1]);
						
					}
				)
			},
			// 确认使用抵扣券按钮的状态事件
			staan() {
				// 余额不足时
				this.yincas = true

			},
			// 余额不足且抵扣券列表为0时
			gomau() {
				console.log('购买');
				this.show3 = true;
				this.shoumailist()
			},
			// 以上条件都满足时，确认使用抵扣券
			shiys() {
				if(this.balance < this.money){
					uni.showToast({
						title: '余额不足，请先充值',
						icon: 'none'
					})
					if(this.mais.length === 0){
						this.yincas = false
					}else{
						this.yincas = true
					}
					if(this.sum_num == 0){
						this.share_popup()
						
									
						if(this.mais.length === 0){
							this.yincas = false
						}else{
							this.yincas = true
						}
						this.wxzhongs = 0
						this.xzhongs = 1
					}
					
				}else{
					this.coupons = this.money
					this.wxzhongs = 1
					this.xzhongs = 0
					uni.showToast({
						title: '使用成功',
						icon: 'none'
					})
				}
			
			
			},
			// 获取抵扣券分享展示事件
			share_popup() {
				var vm = this
				vm.req.mypost(vm.lochost + '/index/index?method=deduct_roll_share_popup', {},
					function(res) {
						// if (res.data.state == 1) {
						
							setTimeout(function(){
								// uni.showToast({
								// 	title: '无抵用券可用',
								// 	icon: 'none'
								// })
								vm.$refs.spopup.open()
							}, 1000)
						
						vm.tupian = res.data.img_url
						// }
					},'',false
				)
			},
			// 关闭抵扣券分享弹框
			closeDialogs() {
				this.$refs.spopup.close()
			},
			// 去分享页面跳转事件
			shares(){
				uni.switchTab({
				    url: '/pages/share/share'
					
				});
				this.$refs.spopup.close()
			},
			// 去分享
			fanx(){
				uni.switchTab({
					url: '/pages/share/share'
				});
			},
			// 取消云刷短信确认弹框
			quxaos(){
				this.$refs.popup.close()
			},
			// 显示验证码输入框
			showDialog3: function() {
				this.show1 = true;
			},
			// 关闭输入框
			closeDialog1: function() {
				this.show1 = false;
			},
			// 验证码输入框选择了确认
			confirm3: function() {
				if (this.yanzhengma === '') {
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
							var is_need_SMS = res.data.is_need_SMS;
							if (is_need_SMS === 0) {
								vm.msg_show(res.msg);
								setTimeout(function() {
									vm.reto('/pages/credit_card_record/credit_card_record')
								}, 500);
							} else if (is_need_SMS === 2) {
								uni.redirectTo({
									url: '/pages/web_view/webs_view?url=' + res.data.url
								})
								// vm.Goto('/pages/web_view/web_view?url='+res.data.url);
							}
			
							// 跳转去哪？
						}
					)
				}
			
			},
			generate_plan(){
				var obj = uni.getStorageSync('obj')
				console.log(obj);
				// return
				var vm = this
					// vm.jianquan()
					vm.req.mypost(
						vm.lochost + '/index/index?method=cloud_brush', {
							channel_id: obj.channel_id,
							bc_id: obj.bc_id,
							card_id: obj.card_id,
							money: obj.money,
							c_code: obj.c_code,
							merchant_id: obj.merchant_id,
							max_deduct_money:vm.coupons
						}, 
						function(res) {
							console.log(res);
							if(res.code == 200){
								vm.is_jump_url = res.data.is_jump_url
								if (res.data.is_jump_url == 1) {
									vm.Goto('/pages/web_view/webs_view?url=' + res.data.jump_url);
									console.log(res.data.jump_url);
								
								} else if (res.data.is_jump_url == 2) {
									vm.$refs.popup.open()
									vm.show_str = res.data.show_str
									vm.zfqdid = res.data.channel_id
									vm.zf_order_num = res.data.order_num
								} else if (res.data.is_jump_url == 0) {
									vm.msg_show(res.msg);
									setTimeout(function() {
										vm.reto('/pages/credit_card_record/credit_card_record')
									}, 500);
								}
							}else{
								vm.msg_show(res.msg);
							}
							
						}
					)
			},
			// 云刷短信确认
			yansbumi() {
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=cloud_pay_confirm', {
						channel_id: vm.zfqdid,
						sms_code: vm.qr_yanzhengma,
						order_num: vm.zf_order_num
					},
					function(res) {
						console.log(res);
						vm.$refs.popup.close()
						if (res.data.is_jump_url == 1) {
							vm.Goto('/pages/web_view/webs_view?url=' + res.data.jump_url);
						} else {
							vm.msg_show(res.msg);
							setTimeout(function() {
								vm.reto('/pages/cloud_brush/cloud_brush1')
							}, 500);
						}
			
					}
				)
			},
			// 取消预览计划按钮
			close() {
				this.$refs.popup.close()
			},
			// 展示券列表事件
			xians() {
				if(this.mais.length === 0){
					this.yincas = false
				}else{
					this.yincas = true
				}
			},
			// 抵扣券转让页面跳转事件
			zhuanrangs(typeim, id,numst) {
				console.log(typeim, id);
				if (numst == 0) {
					uni.showToast({
						title: '剩余抵扣券不足',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/personal_center/card_coupon_zhuanrang?type=' + typeim + '&id=' + id
					});
				}
			},
			// 关闭充值弹框
			c_tanchuang() {
				this.show = false;
			},
			// 抵扣券充值弹框
			chongz(types, id, nums) {
				if (nums == 0) {
					uni.showToast({
						title: '剩余抵扣券不足',
						icon: 'none'
					})
				} else {
					this.show = true;
					this.types = types
					this.id = id
					this.jiashu()
				}
			
			},
			// 充值抵扣券加
			jiashu() {
				var vm = this;
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_num_change', {
						change: 1,
						type: vm.types,
						entry: 1,
					},
					function(res) {
						console.log(res);
						vm.num = res.data.num
					}
				)
			},
			// 充值抵扣券减
			jianshu() {
				var vm = this;
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_num_change', {
						change: 2,
						type: vm.types,
						entry: 1,
					},
					function(res) {
						console.log(res);
						vm.num = res.data.num
					}
				)
			},
			// 确认充值
			chongzhi() {
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=deduct_roll_recharge', {
						num: vm.num,
						id: vm.id,
					}, {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							vm.show = false;
							vm.get_info_data();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							vm.show = false;
							vm.get_info_data();
						}
					}
				)
			},
			// 打开使用余额明细
			dkmingx() {
				uni.navigateTo({
					url: "/pages/cloud_brush/Use_details"
				})
			},
			// 关闭抵扣券售卖弹框
			closeDialog3: function() {
				this.show3 = false;
				uni.showTabBar();
			},
			// 获取售卖抵扣券列表
			shoumailist() {
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=deduct_roll_sale_page', {}, {},
					function(res) {
						console.log(res);
						vm.tejia = res.data
					}
				)
			},
			// 购买页面跳转事件
			gomai(goid, statle) {
				if (statle == 1) {
					uni.navigateTo({
						url: '/pages/buy_coupons/buy_coupons?id=' + goid
					})
				} else {
					uni.switchTab({
						url: '/pages/share/share'
					});
				}

			}
		},
		components: {
			gracePage,
			graceShade,
			graceBottomDialog,
			graceDialog,
			uniPopup
		}
	}
</script>

<style>
	.popup {
		width: 500rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
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
	.xzshiyong {
		width: 690rpx;
		height: 434rpx;
		background: #F1F1F1;
		box-shadow: 0rpx 8rpx 29rpx 3rpx rgba(25, 25, 25, 0.27);
		border-radius: 17rpx;
		margin-top: 14rpx;
		margin-left: 30rpx;
	}

	.shiyan {
		width: 228rpx;
		height: 70rpx;
		background: #1276FF;
		border-radius: 21rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: bold;
		margin-left: 27rpx;
		margin-top: 108rpx;
	}

	.bushiyan {
		width: 244rpx;
		height: 70rpx;
		background: #DBDBDB;
		border-radius: 21rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 108rpx;
		margin-right: 28rpx;
	}
	.shencplan{
		width: 635rpx;
		height: 90rpx;
		background: #1276FF;
		border-radius: 21rpx;
		margin-top: 65rpx;
		margin-left: 27rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 90rpx;
		text-align: center;
		font-weight: bold;
	}

	.dakai {
		display: inline-block;
		width: 190rpx;
		height: 41rpx;
		background: #FB1217;
		border-radius: 21rpx;
		margin-top: 23rpx;
		margin-left: 30rpx;
		text-align: center;
		line-height: 41rpx;
		font-size: 24rpx;
		color: #FFFFFF;
	}

	.shenyu {
		color: #FFFFFF;
		position: absolute;
		z-index: 99;
		left: 335rpx;
		font-size: 18rpx;
		margin-top: 150rpx;
	}

	.chozhi {
		display: inline-block;
		width: 93rpx;
		height: 48rpx;
		background: linear-gradient(180deg, #FA2F51, #F2561F);
		box-shadow: 0rpx 3rpx 2rpx 0rpx rgba(227, 29, 44, 0.26);
		border-radius: 6rpx;
		position: absolute;
		left: 609rpx;
		margin-top: 54rpx;
		z-index: 99;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.zhuanras {
		display: inline-block;
		width: 93rpx;
		height: 48rpx;
		background: linear-gradient(180deg, #FA2F51, #F2561F);
		box-shadow: 0rpx 3rpx 2rpx 0rpx rgba(227, 29, 44, 0.26);
		border-radius: 6rpx;
		position: absolute;
		left: 609rpx;
		margin-top: 124rpx;
		z-index: 99;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.suljian {
		width: 43rpx;
		height: 43rpx;
		position: absolute;
		top: 790rpx;
		left: 373rpx;
	}

	.suljia {
		width: 43rpx;
		height: 43rpx;
		position: absolute;
		top: 790rpx;
		left: 534rpx;
	}

	.sulian {
		font-size: 29rpx;
		position: absolute;
		top: 790rpx;
		left: 471rpx;
		color: #FFFFFF;
	}

	.qrcz {
		width: 500rpx;
		height: 98rpx;
		background: #FFD957;
		box-shadow: 0rpx 8rpx 0rpx 0rpx #EB9C11;
		border-radius: 49rpx;
		position: absolute;
		top: 880rpx;
		font-size: 48rpx;
		text-align: center;
		line-height: 95rpx;
		color: #F53610;
	}

	.guanbi {
		width: 70rpx;
		height: 70rpx;
		position: absolute;
		top: 1120rpx;
	}
	.progress-box{
		position: absolute;
		border-radius: 50rpx !important;
		margin-top: 182rpx;
		left: 300rpx;
		width: 227rpx;
	}
	.sub_betw {
		position: absolute;
		bottom: 0;
		width: 500rpx;
		height: 70rpx;
		background-color: rgba(79, 186, 254, 1);
		border-radius: 0 0 10rpx 10rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
	}
	.fenxians {
		position: absolute;
		top: 430rpx;
		left: 139rpx;
		width: 288rpx;
		height: 60rpx;
		background: linear-gradient(0deg, #FAFBEC, #FFEF94);
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 25rpx;
		color: #E93441;
	}
	
	.guanbisa {
		position: absolute;
		top: 507rpx;
		left: 139rpx;
		width: 288rpx;
		height: 60rpx;
		border: 2rpx solid #FFFFFF;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #FFFFFF;
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
