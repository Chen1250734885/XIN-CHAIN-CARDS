<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<!-- 遮罩弹窗 -->
			<graceShade background="rgba(0,0,0,0.8)" :show="show">
				<view>
					<image @tap="gopath()" style="width: 522rpx;height: 700rpx" :src="img_url"></image>
					<view @tap="closeShade()" class="grace-flex-center" style="margin-top: 50rpx;">
						<image src="../../static/guanbiyouhuijuan.png" style="width: 57rpx;height: 57rpx;"></image>
					</view>
				</view>
			</graceShade>

			<!-- 顶部背景图 -->
			<view>
				<image src="../../static2/dbbj.png" style="width: 750rpx;height: 500rpx;" mode=""></image>
			</view>
			<!-- 顶部背景图 -->

			<view class="lianxi" @tap="lianxi_tiao">
				<image src="../../static2/contact_we.png" mode="" style="width: 100rpx;height: 100rpx;"></image>
			</view>
			<!-- 客服轮播热线提醒 -->
			<view class="grace-rows grace-flex-vcenter kefu">
				<!-- <view class="grace-rows grace-flex-vcenter" style="height:120rpx;" >
					<image src="../../static2/huankuanjilu.png" style="margin: 0 50rpx; width: 70rpx;height: 70rpx;"></image>
					<view class="grace-columns">
						<text style="font-size:28rpx;">{{speakerMsgs}}</text>
					</view>
					<view style="margin-left: 259rpx;" @tap="phone()">
						<image src="../../static/bohaos.png" style="width: 50rpx;height: 50rpx;"></image>
					</view>
				</view> -->
				<view class="grace-body" v-if="speakerMsgs.length != 0">
					<grace-speaker :phoneNumber="phoneNumber" height="120rpx" :vertical="true" iconColor="#E76B61" :interval="3000"
					 iconClass="grace-icons icon-speaker" :msgs="speakerMsgs"></grace-speaker>
				</view>
				<view class="grace-rows grace-flex-vcenter" v-else>
					<image src="../../static2/huankuanjilu.png" style="margin: 0 50rpx; width: 70rpx;height: 70rpx;"></image>
					<view class="grace-columns" @tap="huaikuan">
						<text style="font-size:28rpx;">暂无计划执行</text>
					</view>
					<view style="margin-left: 249rpx;" @tap="huaikuan">
						<image src="../../static2/qianjin.png" style="width: 50rpx;height: 50rpx;"></image>
					</view>
				</view>
			</view>

			<!-- 还款、云刷跳转按钮 -->
			<view class="grace-columns grace-flex-center">
				<!-- 余额还款 -->
				<!-- <view style="margin-top: 51rpx;margin-right:60rpx;" @tap="huaikuan">
					<image src="../../static2/zhinenghk.png" mode="" style="width: 130rpx;height: 130rpx;"></image>
					<view class="hks">余额还款</view>
				</view> -->
				<!-- 智能还款 -->
				<view style="margin-top: 51rpx;margin-right:135rpx;" @tap="huaikuan">
					<image src="../../static2/zhinenghk.png" mode="" style="width: 130rpx;height: 130rpx;"></image>
					<view class="hks">智能还款</view>
				</view>
				<!-- 极速云刷 -->
				<view style="margin-top: 50rpx;margin-right: 0rpx;" @tap="yunshuai">
					<image src="../../static2/jisuyuns.png" mode="" style="width: 130rpx;height: 130rpx;"></image>
					<view class="hks">极速云刷</view>
				</view>
				<!-- 一键升级 -->
				<view style="margin-top: 51rpx;margin-left:135rpx;" @tap="Goto('/pages/rise_vip/rise_vip')">
					<image src="../../static2/sheng.png" mode="" style="width: 130rpx;height: 130rpx;"></image>
					<view class="hks">一键升级</view>
					<!-- style="margin-left: 20rpx;" -->
				</view>

			</view>
			<!-- <view class="grace-flex-center" style="position: relative;top: 0rpx; width: 750rpx;height: 220rpx;background:#FFFFFF;">
				<view class="grace-columns" style="text-align: center; position: relative;top: 28rpx; margin: 0 auto;" v-for="(i,index) in option"
				 :key="index" @tap="tourl(i.urls,indexlei[index],i.name)">
					<image :src="i.imgs" style="width: 100rpx;height: 100rpx;margin: 0 auto;"></image>
					<text style="color: #1678FF;font-size:28rpx;position: relative;top: 12rpx;color: #1678FF;">{{ i.name }}</text>
				</view>
			</view> -->
			<!-- 轮播图 -->
			<view style="margin-top: 41rpx;margin-bottom: 16rpx;">
				<swiper class="swiper" interval="3000" duration="1500" autoplay="ture" circular="ture">
					<swiper-item v-for="(item , index) in swiperItems" :key="index" @tap="tourl(item.title)">
						<image :src="item.img" mode=""></image>
					</swiper-item>
				</swiper>

			</view>
			<!-- 轮播图 -->

			<!-- <image @tap="msg_show('功能开发中...')" src="../../static/index_dibu.png" style="width:750rpx ;height: 1673rpx;margin-top: 20rpx;"></image> -->

			<!-- 底部通知 -->
			<!-- <graceBottomDialog :show="show3" v-on:closeDialog="closeDialog3">
				<view slot="content">
					<view style="width:750rpx;height:1030rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;">
						<view style="position: relative;bottom: 5rpx; width:750rpx;height:470rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;">
							<view style="position: relative;top: 20rpx;">
								<image src="../../static/index_tejia.png" style="width: 422rpx;height: 50rpx;margin-left: 164rpx;"></image>
								<image @tap="closeDialog3()" src="../../static/quxiao_yuan.png" style="margin-left: 84rpx; width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="grace-space-between grace-wrap" style="padding:0 30rpx;">
								<image v-for="(item,index) in tejia" :key="index" @tap="is_vip===0?showDialog2(item.id,item.txt):Goto('/pages/buy_coupons/buy_coupons?id='+item.id)"
								 :src="item.tubiao" style="margin-top: 30rpx; width: 332rpx;height: 438rpx;"></image>
							</view>

						</view>
					</view>
				</view>
			</graceBottomDialog> -->

			<graceDialog :isTitle="false" :show="show2" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<!-- <text>请输入验证码</text> -->
					<text style="font-size: 26rpx;">{{ tanchuang_text }}</text></br>
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closefirm2">继续</text>
					<text class="grace-dialog-buttons" style="color: rgba(204,41,14,1);" @tap="confirm2()">升级vip</text>
				</view>
			</graceDialog>
			<!-- 通知弹框 -->
			<uni-popup ref="popup" type="center">
				<view class="popup">
					<view style="text-align: center;transform: translateY(39rpx);margin-bottom: 44rpx;">
						<text>{{title}}</text>
					</view>
					<view style="font-size: 25rpx;margin: 0 30rpx;">
						<text>{{content}}</text>
					</view>
					<view style="position: absolute;bottom: 0;left: 200rpx;transform: translateY(-25rpx);" @tap="zhidao_yinc">
						<text>我知道了</text>
					</view>
				</view>

			</uni-popup>
			<!-- 客服服务 -->
			<view class="kef_s" @tap="qiaozhuandaokehu">
				<image :style="'left:'+moveX+'px;top:'+moveY+'px'" @touchstart="drag_start" @touchmove.prevent="drag_hmove" src="../../static2/kefs.png"
				 mode="" style="width: 152rpx;height:79rpx;transform: translate(4rpx,4rpx);"></image>
			</view>
			<!-- 抵扣券售卖弹框 -->
			<graceBottomDialog :show="show3" v-on:closeDialog="closeDialog3" style="">
				<scroll-view scroll-y slot="content" style="background:rgba(255,234,169,1);z-index: 9;">
					<view style="width:750rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;margin-bottom: 10rpx;">
						<view style="position: relative;bottom: 10rpx; width:750rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;">
							<view style="position: relative;top: 20rpx;">
								<image src="../../static/index_tejia.png" style="width: 422rpx;height: 50rpx;margin-left: 164rpx;"></image>
								<image @tap="closeDialog3()" src="../../static/guanbi.png" style="margin-left: 84rpx; width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="grace-space-between grace-wrap uni-padding-wrap uni-common-mt" style="padding:0 30rpx;" v-for="(item,index) in tejia"
							 :key="index">
								<image @tap="gomai(item.id,item.type)" :src="item.img_url" style="margin-top: 28rpx; width: 703rpx;height: 216rpx;margin-bottom: 20rpx;"></image>
								<view class="progress-box" v-show="item.type==1">
									<progress :percent="item.rate_num" activeColor="#FFFFFF" active stroke-width="8" backgroundColor="RGBA(228, 122, 128, 1)"
									 border-radius="50px" />
									<text style="font-size: 22rpx;color: #FFFFFF;display: block;margin-top: 5rpx;">已售{{item.rate_num}}%</text>
								</view>
							</view>

						</view>
					</view>
				</scroll-view>
			</graceBottomDialog>
			<!-- 抵扣券分享弹窗 -->
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
		</view>
	</gracePage>
</template>

<script>
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
	import graceswipercard from "../../graceUI/components/graceSwiperCard.vue";
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceShade from "../../graceUI/components/graceShade.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				tanchuang_text: '',
				quan_id: 0,
				is_vip: 0,
				show2: false,
				phoneNumber: '028-69918477',
				is_jump: 0, //签到是否跳转
				urls: "", //如果is_jump为0时,这为请求地址,is_jump为1时这为跳转地址
				show: false,
				img_url: '',
				action: '',
				tiaozhuan: 0,
				u_state: "", //认证状态
				option: [],
				swiperItems: [],
				swiperItemss: '',
				speakerMsgs: [],
				spea: [],
				is_vips: false,
				indexlei: ['/pages/card_keeper/card_keeper?types=1,2', '/pages/cloud_brush/cloud_brush1',
					'/pages/Huabei_collection/Huabei_collection', '/pages/shouxin/shouxin_huaikuai?types=3,4'
				],
				content: '',
				title: '',
				start: [0, 0],
				moveY: 0,
				moveX: 0,
				windowWidth: '',
				windowHeight: '',
				show3: false, // 抵扣券售卖弹框是否展示
				tejia: [], // 抵扣券售卖列表
				show1: true, // 抵扣券分享弹窗显示隐藏
				tupian: '', // 抵扣券分享弹窗背景图片
			};
		},
		onLoad() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
			var vm = this
			vm.share_popup()
			vm.req.mypost(
				vm.lochost + '/index/index?method=unread_msg', {},
				function(res) {
					console.log(res);
					// setTimeout(function() {
					if (res.data.remind.is_remind !== 0) {
						vm.title = res.data.remind.remind_title
						vm.content = res.data.remind.remind_content
						vm.xianshi()
					} else {
						vm.title = res.data.remind.remind_title
						vm.content = res.data.remind.remind_content
						vm.zhidao_yinc()
					}

					// }, 500)

				}
			);
			// #ifdef APP-PLUS
			vm.req.mypost(
				vm.lochost + '/index/index?method=check_version', {},
				function(res) {
					console.log(res);
					if (res.code == 200) {
						vm.Goto('/pages/update/update?url=' + res.data.download)
					}
				}
			)
			// #endif

		},
		onShow() {
			var vm = this;
			vm.option = [];
			vm.swiperItems = [];
			vm.speakerMsgs = [];
			vm.spea = [];
			var uid = uni.getStorageSync('user_id');
			this.req.mypost(
				this.lochost + '/index/index?method=Generation_also_record', {
					uid: uid
				},
				function(res) {
					console.log(res.data);
					vm.spea.push({
						title: res.data.length == 0 ? '暂无计划执行' : '',
						url: '/pages/card_keeper/card_keeper',
						opentype: "navigate",
					})
					for (let i = 0; i < res.data.length; i++) {
						vm.speakerMsgs.push({
							title: res.data[i].rp_state == 1 ? res.data[i].rp_bank_name + '计划执行中' : res.data[i].rp_state == 2 ? res.data[i].rp_bank_name + '计划失败' : '',
							url: '/pages/card_keeper/card_keeper',
							opentype: "navigate",
							color: res.data[i].rp_state == 1 ? 'rgba(35, 183, 20, 1)' : res.data[i].rp_state == 2 ?
								'rgba(204, 41, 14, 1)' : 'rgba(51, 51, 51, 1)',
						})
					}


				});
			vm.req.post(
				vm.lochost + '/index/index?method=banner_list', {
					type: 1
				}, {},
				function(res1) {
					console.log(res1);
					// vm.phoneNumber = res1.data.kehu;
					// vm.option = res1.data.option;
					vm.swiperItems = res1.data
					// console.log(vm.swiperItems[0].img);
					// var swiperItems_list = res1.data;
					// for (let i = 0; i < swiperItems_list.length; i++){

					// 	vm.swiperItems.push(swiperItems_list[i].img) 
					// 	console.log(vm.swiperItems);
					// }
					// vm.is_jump = res1.data.qiandao.is_jump;
					// vm.urls = res1.data.qiandao.urls;
					// vm.is_vips = res1.data.is_vip
					// vm.swiperItemss = res1.data.advertisement[0].imgs;
					// var notice_list = res1.data.notice;
					// var url = '';
					// for (let i = 0; i < notice_list.length; i++) {
					// 	vm.speakerMsgs.push({
					// 		title: notice_list[i].content,
					// 		url: '/pages/generation_plan/details_of_the_plan?id=' + notice_list[i].id,
					// 		opentype: "navigate",
					// 		color: notice_list[i].zhuangtai === 0 ? 'rgba(204,41,14,1)' : 'rgba(8,214,8,1)',
					// 	})
					// 	console.log(vm.speakerMsgs)
					// }
				});


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
			// 获取抵扣券分享展示事件
			share_popup() {
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_share_popup', {},
					function(res) {
						console.log(res.data.img_url);
						if (res.data.state == 1) {
							vm.$refs.spopup.open()
							vm.tupian = res.data.img_url
						}
					}
				)
			},
			// 去分享页面跳转事件
			shares() {
				uni.switchTab({
					url: '/pages/share/share'

				});
				this.$refs.spopup.close()
			},
			// 关闭抵扣券分享弹框
			closeDialogs() {
				this.$refs.spopup.close()
			},
			// 获取售卖抵扣券列表
			shoumailist() {
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_sale_page', {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							vm.tejia = res.data
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}

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
					this.show3 = false
					uni.switchTab({
						url: '/pages/share/share'
					});
				}

			},
			// 还款
			huaikuan() {
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=get_authentication_state', {}, {},
					function(res) {
						console.log(res);
						if (res.data.u_state === 1) {
							uni.navigateTo({
								url: '/pages/card_keeper/card_keeper'
							})
							return
						}
						uni.navigateTo({
							url: '/pages/authentication/non_real_name'
						})


					}
				)
			},
			// 云刷
			yunshuai() {
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=get_authentication_state', {}, {},
					function(res) {
						console.log(res);
						if (res.data.u_state == 4) {
							uni.navigateTo({
								url: '/pages/authentication/non_real_name'
							})
						} else {
							uni.navigateTo({
								url: '/pages/cloud_brush/cloud_brush1'
							})
						}
					}
				)
			},
			qiaozhuandaokehu() {
				uni.navigateTo({
					url: '/pages/Last_page/Custome_services'
				})
			},

			qiandao() {
				var vm = this;
				if (vm.is_jump === 0) {
					vm.req.post(
						vm.urls, {}, {},
						function(res) {
							vm.msg_show(res.msg);
						}
					)
				} else {
					vm.Goto('/pages/web_view/web_view?url=' + vm.urls + '?token=' + uni.getStorageSync('user_token'));
				}
			},
			showDialog3: function() {
				this.show3 = true;
				uni.hideTabBar();
			},
			closeDialog3: function() {
				this.show3 = false;
				uni.showTabBar();
			},
			showDialog2: function(id, text) {
				this.tanchuang_text = text;
				this.quan_id = id;
				this.show2 = true;
			},
			closeDialog2: function() {
				this.show2 = false;
			},
			confirm2() {
				this.closeDialog2();
				this.Goto('/pages/rise_vip/rise_vip');
			},
			closefirm2() {
				this.closeDialog2();
				this.Goto('/pages/buy_coupons/buy_coupons?id=' + this.quan_id);
			},
			// 显示通知弹框
			xianshi() {
				var vm = this
				vm.$refs.popup.open()
			},
			// 隐藏通知弹框
			zhidao_yinc() {
				this.$refs.popup.close()
			},
			tanchuang(e) {
				console.log(e);
				// if(e.t_type==="1"){
				// 	this.tiaozhuan=1;
				// 	this.img_url=e.t_img;
				// 	this.action=e.action;+
				// 	this.showShade();
				// }else if(e.t_type==="2"){
				// 	this.showDialog3();
				// }

				if (e.id == 1) {
					uni.showToast({
						title: '功能开发中',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/rise_vip/rise_vip'
					})

				}
			},
			// is_show(){
			// 	var vm=this;
			// 	vm.req.post(
			// 	vm.lochost+'/mytrunk/index/get_user_hb',
			// 	{},
			// 	{},
			// 	function(res){
			// 		var data=res.data;
			// 		vm.img_url=data.img_url;
			// 		vm.tiaozhuan=data.tiaozhuan;
			// 		vm.action=data.action;
			// 		if(data.tanchu===1){
			// 			vm.showShade();
			// 		}
			// 	}
			// 	)
			// },
			gopath() {
				var vm = this;
				if (vm.tiaozhuan === 1) {
					vm.Goto(vm.action);
				} else {
					vm.req.post(
						vm.action, {}, {},
						function(res) {
							vm.closeShade();
							vm.msg_show(res.msg);
						}
					)
				}
			},

			showShade: function() {
				uni.hideTabBar();
			},
			closeShade: function() {
				this.show = false;
				uni.showTabBar();
			},
			phone() {
				uni.makePhoneCall({
					phoneNumber: this.phoneNumber //仅为示例
				});
			},
			lianxi_tiao() {
				this.Goto('/pages/Last_page/Custome_service')
			},
			tourl(title) {
				console.log(title);
				// return
				if (title == '限时活动') {
					var url = '/pages/personal_center/Limited_activities';
					uni.navigateTo({
						url: url
					})
					return;
				}
				if (title == '申请信用卡') {
					var url = '/pages/index/Card_Application';
					uni.navigateTo({
						url: url
					})
					return;
				}
				if (title == '购买抵扣券') {
					this.show3 = true;
					this.shoumailist()
					return;
				}
				// if (name === '余额' || name === '云刷' || name === '花呗') {
				// 	if (this.u_state === '未认证') {
				// 		uni.navigateTo({
				// 			url: '/pages/authentication/non_real_name'
				// 		})
				// 		return
				// 	}
				// }
			}
		},
		components: {
			gracePage,
			graceswipercard,
			graceSpeaker,
			graceShade,
			graceBottomDialog,
			graceDialog,
			uniPopup
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin-bottom: 16rpx;
	}

	.kef_s {
		position: absolute;
		top: 380rpx;
		left: 598rpx;
		float: right;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 750rpx;
	}

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

	.kefu {
		position: relative;
		/* float: right; */
		width: 660rpx;
		background: rgba(255, 255, 255, 1);
		margin-top: -35rpx;
		margin-bottom: 13rpx;
		height: 100rpx;
		border-radius: 50rpx;
		margin-left: 45rpx;
		/* z-index: 9999; */
	}

	.hks {
		margin-left: 5rpx;
		font-size: 30rpx;
		color: rgba(51, 51, 51, 1);
	}

	.swiper {
		height: 400rpx;
	}

	swiper-item image {
		width: 100%;
		height: 400rpx;
	}

	.lianxi {
		position: absolute;
		top: 60rpx;
		left: 25rpx;
	}

	.popup {
		width: 500rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.progress-box {
		position: absolute;
		border-radius: 50rpx !important;
		margin-top: 182rpx;
		left: 300rpx;
		width: 227rpx;
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
