<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 38rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">持卡人：</text>
					<view class="grace-columns">
						<input v-model="user_name" style="width:530rpx;margin-left: 100rpx;" placeholder="请输入持卡人姓名" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" disabled/>
					</view>
				</view>
			</view>
			<view @tap="xuanzefakahang" class="grace-rows grace-flex-vcenter" style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<text style="margin-left: 38rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">发卡行：</text>
				<text class="grace-ellipsis" style="position: relative; left: 100rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">{{ fakahangname != '' ? fakahangname:'请选择发卡行'}}</text>
				<image src="../../static/jiantou.png" style="position: absolute;left: 700rpx; width: 20rpx;height: 35rpx;"></image>
			</view>
			

			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 38rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">银行卡号：</text>
					<view class="grace-columns">
						<input v-model="card_id" style="width:400rpx;margin-left: 75rpx;" placeholder="请输入银行卡号" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" />
						<image @tap="getIDCard()" src="../../static2/saomiao.png" style="position: absolute;left: 650rpx; width: 32rpx;height: 32rpx;top: 10rpx;"></image>
					</view>
				</view>
			</view>

			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 38rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">预留手机：</text>
					<view class="grace-columns">
						<input v-model="card_mo" style="width:238rpx;margin-left: 80rpx;" placeholder="请输入预留手机" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" />
						<image @tap="xianshow" src="../../static2/wenhao.png" style="position: absolute;left: 650rpx; width: 42rpx;height: 42rpx;top: 10rpx;"></image>
					</view>
				</view>
			</view>
			<button @tap="submit" type="primary" style="margin-top: 50rpx; width:500rpx;height:90rpx;background:#1678FF;border-radius:6rpx;">确认</button>
			<!-- 预留手机说明 -->
			<uni-popup ref="popup" type="center">
				<view class="popup">
					<view class="tisis">
						<text>储蓄卡预留手机号</text>
						<image class="tuspm" src="../../static2/tupsm.png" mode=""></image>
						<view style="font-size: 24rpx;">预留手机号为办理银行卡时所填写的手机号</view>
						<view style="font-size: 24rpx;margin-top: -1rpx;">码，如有疑问，请联系银行客服</view>
					</view>
					<view class="zdl" @tap="wzdl">我知道了</view>
				</view>
			</uni-popup>
		</view>
		
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				bc_id: '',
				user_name: '',
				card_id: '',
				card_mo: '',
				bc_bank_id: '',
				fakahangid: '',
				fakahangname: '请选择发卡行'
			}
		},
		onLoad: function(opt) {
			console.log(opt);
			this.bc_id = opt.bc_id;
			this.user_name = opt.bc_account_name;
			this.card_id = opt.bank_card;
			this.card_mo = opt.bank_tel;
			this.bc_bank_id = opt.bank_id;
			this.fakahangname = opt.bank_name
			
		},
		methods: {
			// 显示预留手机说明
			xianshow(){
				this.$refs.popup.open()
			},
			// 隐藏预留手机说明弹框
			wzdl(){
				this.$refs.popup.close()
			},
			xuanzefakahang() {
				uni.$once('xuanzefakahang', this.querenfakahang);
				this.Goto('/pages/issuer_selection/issuer_selection?type=2');
			},
			querenfakahang(data) {
				this.bc_bank_id = data.id,
					this.fakahangname = data.name
			},
			submit() {
				var vm = this;
				var objs = {
					bc_id: vm.bc_id,
					bc_account_name: vm.user_name,
					bank_id: vm.bc_bank_id,
					bank_card: vm.card_id,
					bank_tel: vm.card_mo,
				};
				vm.req.post(
					vm.lochost + '/index/index?method=update_savings',
					objs, {},
					function(res) {
						if (res.code == 200) {
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 700);
						} else {
							vm.msg_show(res.msg);
						}
					}
				)
			},
			getIDCard(){
				// if (this.fakahangid === '') {
				// 	this.msg_show('请先选择发卡行！')
				// } else {
					var vm = this;
					console.log(123);
					// #ifdef APP-PLUS
					card.startRecognize({
						maskType: "BankCard"
					}, result => {
						this.card_id = result.bank_card_number
						console.log(result.bank_card_number);
				
						// 从本地加载Bitmap图片
						//result.path:ocr识别返回的路径
						// if (result.path) {
						// 	const bitmapT = new plus.nativeObj.Bitmap("test"); //test标识随便取
						// 	bitmapT.load(result.path, function() {
						// 		console.log('加载图片成功');
						// 		const base64 = bitmapT.toBase64Data();
						// 		// base4:已转为base64的图片
						// 		const file_base64 = {
						// 			name: 'pic.jpg',
						// 			base64: base64
						// 		};
						// 		vm.tupian(file_base64, result.path);
						// 		bitmapT.clear();
						// 	}, function(e) {
						// 		console.log('加载图片失败：' + JSON.stringify(e));
						// 	});
						// }
						// console.log(JSON.stringify(result));
					});
					// #endif
				
				// }
			}
		},
		components: {
			gracePage,
			uniPopup
		}
	}
</script>

<style>
	.popup{
		width: 540rpx;
		height: 500rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.tisis{
		font-size: 36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		text-align: center;
		transform: translateY(31rpx);
	}
	.tuspm{
		width: 430rpx;
		height: 230rpx;
	}
	.zdl{
		position: absolute;
		bottom: 0;
		width: 540rpx;
		height: 80rpx;
		background-color: rgba(79, 159, 254, 1);
		font-size: 34rpx;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		border-radius: 0 0 10rpx 10rpx;
	}
</style>
