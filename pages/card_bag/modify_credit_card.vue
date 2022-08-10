<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">持卡人：</text>
					<view class="grace-columns">
						<input v-model="bc_account_name" style="width:530rpx;text-align: center;font-size: 28rpx;" placeholder="请输入持卡人姓名"
						 placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" disabled />
						<!-- <view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view> -->
					</view>
				</view>
			</view>

			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">发卡银行：</text>
					<view class="grace-columns" @tap="xuanzefakahang">
						<input v-model="bank_name" style="width:490rpx;text-align: center;font-size: 28rpx;" placeholder="请选择银行卡"
						 placeholder-style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);" />
						<image src="../../static/jiantou.png" style=" width:13rpx;height:24rpx;position: absolute;right: 120rpx;"></image>
						<!-- <view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view> -->
					</view>
				</view>
			</view>

			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">卡号：</text>
					<view class="grace-columns" style="margin-left: 20rpx;">
						<input v-model="bc_bank_number" style="width:530rpx;text-align: center;font-size: 28rpx;" placeholder="请输入信用卡号" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" />
						<image @tap="getIDCard()" src="../../static2/saomiao.png" style="position: absolute;left: 600rpx; width: 32rpx;height: 32rpx;top: 10rpx;"></image>
					</view>
				</view>
			</view>
			<!-- <view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">额度：</text>
				<view class="grace-columns" style="margin-left: 20rpx;">
					<input v-model="edu" style="width:530rpx;text-align: center;" placeholder="请输入信用卡号" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);"/>
					<view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view>
				</view>
			</view>
		</view> -->

			<view class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<text style="margin-left: 57rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">有效期：</text>
				<input v-model="bc_effective" style="width:500rpx;text-align: center;font-size: 28rpx;" placeholder="请输入有效期" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" />
				 <image @tap="youxshow" src="../../static2/wenhao.png" style="position: absolute;left: 660rpx; width: 42rpx;height: 42rpx;"></image>
			</view>

			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">CVN2：</text>
					<view class="grace-columns">
						<input v-model="bc_cvn2" style="width:530rpx;text-align: center;font-size: 28rpx;" placeholder="请输入卡片背面后三位安全码"
						 placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" />
						 <image @tap="cv_show" src="../../static2/wenhao.png" style="position: absolute;left: 600rpx; width: 42rpx;height: 42rpx;"></image>
					</view>
				</view>
			</view>
			<view @tap="toggleTab('账单日')" class="grace-rows grace-flex-vcenter" style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<text style="margin-left: 60rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">账单日：</text>
				<text style="text-align: center;width: 500rpx; font-size:28rpx;font-weight:400;color:#333333;line-height:60px;">{{ bc_bill_name }}</text>
				<image src="../../static/jiantou.png" style=" width:13rpx;height:24rpx;"></image>
				<!-- <input type="number" v-model="bc_bill" @input="yanzheng" placeholder="请输入账单日" style="margin-left: 60rpx;width: 500rpx"/> -->
			</view>
			<view @tap="toggleTab('还款日')" class="grace-rows grace-flex-vcenter" style="margin: 3rpx 0; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<text style="margin-left: 60rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">还款日：</text>
				<text style="text-align: center;width: 500rpx; font-size:28rpx;font-weight:400;color:#333333;line-height:60rpx;">{{ bc_repayment_name }}</text>
				<image src="../../static/jiantou.png" style="width:13rpx;height:24rpx;"></image>
				<!-- <input type="number" v-model="bc_repayment" @input="yanzheng" placeholder="请输入还款日" style="margin-left: 60rpx;width: 500rpx"/> -->
			</view>


			<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">预留手机：</text>
					<view class="grace-columns">
						<input v-model="bc_mobile" style="width:480rpx;text-align: center;font-size: 28rpx;" placeholder="请输入预留手机"
						 placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);" />
						 <image @tap="xianshow" src="../../static2/wenhao.png" style="position: absolute;left: 600rpx; width: 42rpx;height: 42rpx;"></image>
					</view>
				</view>
			</view>
			<button @tap="submit" type="primary" style="margin-top: 50rpx; width:500rpx;height:90rpx;background:rgba(79,159,254,1);border-radius:6rpx;font-size: 30rpx;line-height: 90rpx;">确认修改</button>
			<w-picker mode="selector" defaultVal="1日" @confirm="onConfirm" ref="selector" themeColor="#f00" :selectList="selectList"></w-picker>

			<!-- 确认修改弹框 -->
			<uni-popup ref="popup" type="center">
				<view class="popup">
					<view class="neiro">
						<text>您将要修改此信用卡信息，是否确定？</text>
					</view>
					<view class="anns_s1" @tap="quedin">确定</view>
					<view class="anns_s2" @tap="quxiao">取消</view>
				</view>
			</uni-popup>
			<!-- 预留手机说明 -->
			<uni-popup ref="popups" type="center">
				<view class="popups">
					<view class="tisis">
						<text style="font-weight: 700;">信用卡预留手机号</text>
						<image class="tuspm" src="../../static2/tupsm.png" mode=""></image>
						<view style="font-size: 24rpx;">预留手机号为办理银行卡时所填写的手机号</view>
						<view style="font-size: 24rpx;margin-top: -1rpx;">码，如有疑问，请联系银行客服</view>
					</view>
					<view class="zdl" @tap="wzdl">我知道了</view>
				</view>
			</uni-popup>
			<!-- 有效期说明 -->
			<uni-popup ref="popu" type="center">
				<view class="popu">
					<view class="tisis">
						<text style="font-weight: 700;">有效期说明</text>
						<image class="tuspm" src="../../static2/youxiaoqi.png" mode=""></image>
						<view style="font-size: 24rpx;">信用卡有效期为信用卡正面4位数字，格式为</view>
						<view style="font-size: 24rpx;margin-top: -1rpx;">xx/xx。</view>
					</view>
					<view class="zdl" @tap="wzdls">我知道了</view>
				</view>
			</uni-popup>
			<!-- CVN2码说明 -->
			<uni-popup ref="popus" type="center">
				<view class="popu">
					<view class="tisis">
						<text style="font-weight: 700;">安全码说明</text>
						<image class="tuspm" src="../../static2/cvnka.png" mode=""></image>
						<view style="font-size: 24rpx;">信用卡CVN2码为信用卡背面签名栏后7位数</view>
						<view style="font-size: 24rpx;margin-top: -1rpx;">字后3位。</view>
					</view>
					<view class="zdl" @tap="wzdlst">我知道了</view>
				</view>
			</uni-popup>
			

		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				bc_id: '',
				bc_account_name: '',
				bc_bank_number: '',
				bc_mobile: '',
				bc_cvn2: '',
				bc_effective: '',
				bank_id: '',
				bc_bill: '',
				bc_repayment: '',
				bank_name: '',
				M_jujiao: false,
				Y_jujiao: false,
				youxiaoqi_M: '',
				youxiaoqi_Y: '',
				dianji_tpye: '', //用来判断点击的是账单日还是还款日
				bc_repayment_name: '请选择还款日', //还款日名字
				bc_bill_name: '请选择账单日', //账单日名字
				selectList: [{
						label: "1日",
						value: 1
					}, {
						label: "2日",
						value: 2
					}, {
						label: "3日",
						value: 3
					}, {
						label: "4日",
						value: 4
					}, {
						label: "5日",
						value: 5
					}, {
						label: "6日",
						value: 6
					}, {
						label: "7日",
						value: 7
					}, {
						label: "8日",
						value: 8
					}, {
						label: "9日",
						value: 9
					}, {
						label: "10日",
						value: 10
					}, {
						label: "11日",
						value: 11
					},
					{
						label: "12日",
						value: 12
					}, {
						label: "13日",
						value: 13
					}, {
						label: "14日",
						value: 14
					}, {
						label: "15日",
						value: 15
					}, {
						label: "16日",
						value: 16
					}, {
						label: "17日",
						value: 17
					}, {
						label: "18日",
						value: 18
					}, {
						label: "19日",
						value: 19
					}, {
						label: "20日",
						value: 20
					}, {
						label: "21日",
						value: 21
					},
					{
						label: "22日",
						value: 22
					}, {
						label: "23日",
						value: 23
					}, {
						label: "24日",
						value: 24
					}, {
						label: "25日",
						value: 25
					}, {
						label: "26日",
						value: 26
					}, {
						label: "27日",
						value: 27
					}, {
						label: "28日",
						value: 28
					}, {
						label: "29日",
						value: 29
					}, {
						label: "30日",
						value: 30
					}, {
						label: "31日",
						value: 31
					}
				],
			}
		},
		onLoad: function(opt) {
			console.log(opt)
			this.bc_id = opt.bc_id
			this.bc_repayment = opt.bc_repayment;
			this.bc_bill = opt.bc_bill;
			this.bc_account_name = opt.bc_account_name;
			this.bank_name = opt.bank_name;
			this.bc_bank_number = opt.bc_bank_number;
			this.bc_cvn2 = opt.bc_cvn2;
			this.bc_mobile = opt.bc_mobile;
			this.bc_bill_name = this.bc_bill + '日';
			this.bc_repayment_name = this.bc_repayment + '日';
			this.bc_effective = opt.bc_effective;
			this.bank_id = opt.id
		},
		methods: {
			xuanzefakahang(){
				console.log(this.types)
				uni.$once('xuanzefakahang',this.querenfakahang);
				this.Goto('/pages/issuer_selection/issuer_selection?type=1');
			},
			querenfakahang(data){
				this.bank_id=data.id,
				this.bank_name=data.name
			},
			// 显示CVN2码说明
			cv_show(){
				this.$refs.popus.open()
			},
			// 隐藏CVN2说明弹框
			wzdlst(){
				this.$refs.popus.close()
			},
			// 显示有效期说明
			youxshow(){
				this.$refs.popu.open()
			},
			// 隐藏有效期说明弹框
			wzdls(){
				this.$refs.popu.close()
			},
			// 显示预留手机说明
			xianshow(){
				this.$refs.popups.open()
			},
			// 隐藏预留手机说明弹框
			wzdl(){
				this.$refs.popups.close()
			},
			// 隐藏修改信息弹框
			quxiao() {
				this.$refs.popup.close()
			},
			// 确认修改按钮
			submit() {
				if (this.bc_repayment === '' || this.bc_bill === '' || this.bc_account_name === '' || this.bc_cvn2 === '' || this.bc_mobile ===
					'' || this.bank_name === '' || this.bc_bank_number === '' || this.bc_effective === '') {
					this.msg_show('请将信息填写完整');
				} else {
					this.$refs.popup.open()
				}
			},
			// 确定修改按钮
			quedin() {
				this.$refs.popup.close()
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=update_credit', {
						bc_id: this.bc_id,
						cvn2: this.bc_cvn2,
						bank_card: this.bc_bank_number,
						effective: '20' + this.bc_effective.slice(3) + '-' + this.bc_effective.slice(0, 2),
						bill: this.bc_bill,
						bank_id: this.bank_id,
						repayment: this.bc_repayment,
						bank_tel: this.bc_mobile
					}, 
					function(res) {
						console.log(res);
						if (res.code == 200) {
							uni.navigateBack({
								delta: 1
							});
							setTimeout(function() {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}, 500);
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
						this.bc_bank_number = result.bank_card_number
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
			},
			toggleTab(dianji_tpye) {
				this.dianji_tpye = dianji_tpye;
				this.$refs['selector'].show();
			},
			onConfirm(val) {
				if (this.dianji_tpye === '账单日') {
					this.bc_bill_name = val.checkArr.label;
					this.bc_bill = val.checkArr.value;
				} else if (this.dianji_tpye === '还款日') {
					this.bc_repayment_name = val.checkArr.label;
					this.bc_repayment = val.checkArr.value;
				}
			},
			youxiaoqi_js_M(val) {
				var vale = val.target.value;
				if (vale.length === 2) {
					this.M_jujiao = false;
					this.Y_jujiao = true;
				}
			},
			youxiaoqi_js_Y(val) {
				var vale = val.target.value;
				if (vale.length === 0 && this.Y_len === 1) {
					this.Y_jujiao = false;
					this.M_jujiao = true;
				}
				this.Y_len = vale.length;
			},

		},
		components: {
			gracePage,
			wPicker
		}
	}
</script>

<style>
	.popup {
		width: 540rpx;
		height: 190rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
	}

	.neiro {
		font-size: 24rpx;
		text-align: center;
		transform: translateY(50rpx);
	}

	.anns_s1 {
		display: inline-block;
		position: absolute;
		bottom: 0;
		width: 270rpx;
		height: 70rpx;
		background-color: rgba(79, 159, 254, 1);
		border-radius: 0rpx 0rpx 0rpx 10rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 34rpx;
	}

	.anns_s2 {
		display: inline-block;
		position: absolute;
		bottom: 0;
		right: 0;
		width: 270rpx;
		height: 70rpx;
		background-color: rgba(79, 186, 254, 1);
		border-radius: 0rpx 0rpx 10rpx 0rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 34rpx;
	}
	.popups{
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
	.popu{
		width: 540rpx;
		height: 500rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
</style>
