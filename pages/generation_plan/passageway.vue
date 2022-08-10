<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<view class="grace-flex grace-flex-vcenter" style=" width:750rpx;height:100rpx;background:rgba(255,255,255,1);"
			 :style="{ background: card_color }">
				<view class="grace-rows">
					<image :src="back_img" style="margin-left: 25rpx; width:56rpx;height:56rpx;"></image>
					<view style="line-height: 56rpx;">
						<text style="margin-left: 28rpx; font-size:30rpx;font-weight:400;color:#FFFFFF">{{ card_name }}</text>
					</view>

				</view>
			</view>
			<view class="grace-flex grace-flex-vcenter" style="margin-top: 1rpx; width:750rpx;height:50rpx;background:rgba(255,255,255,1);">

				<view class="grace-rows">
					<view style="line-height: 56rpx;">
						<text style="margin-left: 108rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1)">CVN码：<text style="color:rgba(16,182,82,1);font-weight: 700;">{{ bc_cvn2 }}</text></text>
					</view>

				</view>
			</view>
			<view class="grace-flex grace-flex-vcenter" style="margin-top: 1rpx; width:750rpx;height:50rpx;background:rgba(255,255,255,1);">

				<view class="grace-rows">
					<view style="line-height: 56rpx;">
						<text style="margin-left: 108rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1)">有效期：<text style="color:rgba(16,182,82,1);font-weight: 700;">{{ bc_effective }}</text></text>
					</view>

				</view>
			</view>

			<view style="margin-top: 1rpx; width:750rpx;height:80rpx;background:rgba(255,255,255,1);">
				<text style="font-size: 30rpx;color: rgba(51,51,51,1);display: block;margin-left: 20rpx;">{{titis}}</text>
				<text style="font-size: 28rpx;color: rgba(51,51,51,1);display: block;margin-left:50rpx;">{{titi}}</text>
			</view>
			<!-- 通道列表数据 -->
			<view @tap="tap_tongdao(item.is_dredge,item.pc_id)" v-for="(item,index) in tongdao_list" :key="index" class="grace-flex-vcenter"
			 style="margin-top: 3rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="margin-left: 25rpx;">
					<image src="../../static/yinlian.png" style="width: 100rpx;height: 62rpx;transform: translateY(30rpx);"></image>
					<view v-show="item.tj_str !== ''" style="line-height: 62rpx;margin-left: 39rpx;transform: translateY(30rpx);">
						<!-- <text style="font-size:28rpx;font-weight:bold;color:rgba(51,51,51,1);">{{ item.alias }}</text> -->
						<text style="font-size:28rpx;position: absolute;z-index: 99;color: #FFFFFF;margin-top:3rpx;padding-left: 20rpx;">
							{{ item.alias }}</text>
						<image v-show="item.tj_str !== ''" src="../../static2/xinbiao.png" mode="" style="width: 150rpx;height: 50rpx;transform: translateY(10rpx);left: -15rpx;"></image>
					</view>

					<view v-show="item.tj_str == ''" style="line-height: 62rpx;margin-left: 60rpx;transform: translateY(30rpx);">
						<text style="font-size:28rpx;font-weight:bold;color:rgba(51,51,51,1);">{{ item.alias }}</text>
					</view>
				</view>
				<view style="margin-left: 600rpx;transform: translateY(-15rpx);">
					<text :style="{color:item.is_dredge===1?'rgba(16,182,82,1)':'rgba(220,0,0,1)'}">{{ item.is_dredge===1?'已开通':'立即开通' }}</text>
				</view>
			</view>
			<button @tap="shenchen" class="sc_huik">{{titil}}还款计划</button>


			<!-- 鉴权短信验证 -->
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
			<!-- 鉴权短信验证 -->
		</view>
	</gracePage>
</template>

<script>
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				// 鉴权
				show3: false,
				yanzhengma: '', //验证码
				yuxuantongdao_id: '',
				yuliushouji: '', //预留手机
				order_num: '', //订单号
				types: '',
				card_id: '',
				card_name: '',
				card_weihao: '',
				tubiao: '',
				tongdao_list: [],
				titis: '',
				titi: '',
				channel_id: '',
				card_color: '',
				card_icon: '',
				huankuanri: '',
				kaitong: '',
				schema_arr: '',
				bc_cvn2: '',
				bc_effective: '',
				back_img: '',
				state: '',
				titil: '生成',
				order_id: ''
			}
		},
		onLoad: function(opt) {
			this.card_id = opt.card_id;
			this.types = opt.type;
			this.card_name = opt.card_name
			this.tubiao = opt.bank_icon_url
			this.channel_id = opt.channel_id
			this.card_color = opt.card_color
			this.card_icon = opt.card_icon
			this.huankuanri = opt.huankuanri
			this.schema_arr = opt.schema_arr
			this.bc_cvn2 = opt.bc_cvn2;
			this.bc_effective = opt.bc_effective;
			this.back_img = opt.back_img;
			this.state = opt.state;
			this.order_id = opt.id;
			console.log(opt)

			this.get_tongdao();
		},
		onShow() {
			this.get_tongdao();
			if (this.state == 2 || this.state == 5) {
				this.titil = '查看'
			}
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					console.log('运行Android上')
					this.titis = '注意事项:'
					this.titi = '   为了账单执行更流畅，建议大家把所以的通道都开通！'
					break;
				case 'ios':
					console.log('运行iOS上')

					this.titis = '注意事项:'
					this.titi = '为了账单执行更流畅，建议大家把所以的通道都开通！'


					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
		},
		onBackPress() {
			uni.navigateTo({
				url: '/pages/card_keeper/card_keeper'
			})
			return true;
		},
		methods: {
			tap_tongdao(kaitong, id) {
				this.channel_id = id
				this.kaitong = kaitong
				if (kaitong === 0) {
					this.jianquan_id();
				} else {
					this.msg_show('通道已开通');
				}
			},
			get_tongdao() {
				var vm = this;
				vm.req.mypost(
					vm.lochost + '/index/index?method=channel_list', {
						bc_id: vm.card_id,
						type: vm.types,
					},
					function(res) {
						console.log(res);
						vm.tongdao_list = res.data;
						if (!vm.huankuanri && vm.tongdao_list.length == 0) {
							uni.showToast({
								title: '此卡暂无可用通道，可暂用云刷',
								icon: 'none'
							})
						}
					}
				)
			},
			// 生成还款计划按钮
			shenchen() {
				if (this.tongdao_list.length !== 0) {
					var dredge = false
					this.each(this.tongdao_list, function(i, v) {
						if (i.is_dredge === 1) {
							dredge = true
						}
					})
					if (!dredge) {
						uni.showToast({
							title: '请至少开通一个通道',
							icon: 'none'
						})
					} else {
						if (this.state == 2 || this.state == 5) {
							this.Goto('/pages/generation_plan/details_of_the_plan?id=' + this.order_id)
						} else {
							this.Goto('/pages/generation_plan/generation_plan?card_id=' + this.card_id + '&card_color=' + this.card_color + '&card_name=' + this.card_name + '&card_icon=' + this.card_icon + '&huankuanri=' + this.huankuanri + '&channel_id=' + this.channel_id + '&schema_arr=' + this.schema_arr)
						}

					}
				} else {
					uni.showToast({
						title: '此卡暂无可用通道，可暂用云刷',
						icon: 'none'
					})
				}
			},
			// 通道id鉴权
			jianquan_id() {
				var vm = this;
				vm.req.mypost(
					vm.lochost + '/index/index?method=channel_authentication', {
						bc_id: vm.card_id,
						channel_id: vm.channel_id,
						type: 2
					},
					function(res) {
						if (res.code == -1) {
							console.log(res);
							uni.showModal({
								title: '提示',
								content: '请完善实名认证身份证正反面照片',
								showCancel: true,
								confirmText: '去修改',
								success: function(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '/pages/authentication/modify_real_name'
										});
										uni.setStorageSync('storage_key', 1);
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						} else if(res.code == 200) {
							var is_need_SMS = res.data.is_need_SMS;
							if (is_need_SMS == 0) {
								vm.get_tongdao();
								vm.msg_show('开通' + res.msg);

							} else if (is_need_SMS === 1) {
								vm.yuliushouji = res.data.tel_str;
								vm.order_num = res.data.order_num;
								vm.show3 = true
							} else if (is_need_SMS === 2) {
								var newurl = '/pages/web_view/web_views?url=' + res.data.url + '&card_id=' + vm.card_id + '&type=2' + '&card_name=' + vm.card_name + '&bank_icon_url=' + vm.tubiao + '&channel_id=' + vm.channel_id + '&bc_effective=' + vm.bc_effective + '&bc_cvn2=' + vm.bc_cvn2 + '&back_img=' + vm.back_img + '&card_color=' + vm.card_color + '&id=' + vm.order_id + '&state=' + vm.state + '&schema_arr=' + vm.schema_arr;
								console.log(newurl);
								vm.Goto('/pages/web_view/web_views?url=' + res.data.url + '&card_id=' + vm.card_id + '&type=2' + '&card_name=' + vm.card_name + '&bank_icon_url=' + vm.tubiao + '&channel_id=' + vm.channel_id + '&bc_effective=' + vm.bc_effective + '&bc_cvn2=' + vm.bc_cvn2 + '&back_img=' + vm.back_img + '&card_color=' + vm.card_color + '&id=' + vm.order_id + '&state=' + vm.state + '&schema_arr=' + vm.schema_arr);
							}
						} else if(res.code !== 200){
							uni.showToast({
								title:res.msg,
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
				if (this.yanzhengma === '') {
					this.msg_show('请输入验证码')
				} else {
					var vm = this;
					this.req.post(
						this.lochost + '/index/index?method=confirm_channel_authentication', {
							order_num: this.order_num,
							sms_code: this.yanzhengma,
							type: 2
						}, {},
						function(res) {
							vm.closeDialog3();
							vm.get_tongdao();
							vm.msg_show(res.msg);
							if (res.code == 200) {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								setTimeout(function() {
									vm.Back(1);
								}, 1000)
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}
					)
				}

			},
		},
		components: {
			gracePage,
			graceDialog
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

	.sc_huik {
		width: 400rpx;
		height: 100rpx;
		background-color: #1678FF;
		color: #FFFFFF;
		font-size: 30rpx;
		position: absolute;
		/* bottom: 50rpx; */
		margin-left: 200rpx;
		line-height: 100rpx;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
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
