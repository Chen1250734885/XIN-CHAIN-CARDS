<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<!-- 进度条 -->
			<view class="grace-space-between" style="margin-top: 16rpx;padding: 0 24rpx;">
				<view class="grace-flex-center"
					style="background-image:url(../../static/cloud_brush_danghang1.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">1.身份认证</text>
				</view>
				<view class="grace-flex-center"
					style="background-image:url(../../static/guidance_bg.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">2.储蓄卡认证</text>
				</view>
			</view>

			<view style="margin-top: 35rpx;">
				<!-- reto('/pages/issuer_selection/issuer_selection?banck=实名认证') -->
				<view @tap="xuanzefakahang" class="grace-rows grace-flex-vcenter"
					style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text
						style="margin-left: 35rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">发卡行：</text>
					<text class="grace-ellipsis"
						style="position: relative; left: 80rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);">{{ fakahangname != '' ? fakahangname:'请选择发卡行'}}</text>
					<image src="../../static/jiantou.png"
						style="position: absolute;left: 650rpx; width: 20rpx;height: 35rpx;"></image>
				</view>
			</view>

			<view v-show="fakahangname">
				<view class="grace-flex-center" style="width: 750rpx;margin-top: 40rpx;" @tap="getIDCard()">
					<view>
						<image :src=" id_card_img.length>0 ? id_card_img : '../../static/chuxukatu.png'"
							style=" width: 544rpx;height: 328rpx;"></image>
					</view>
				</view>
				<view class="grace-rows grace-flex-center" style="margin: 25rpx 0;">
					<image src="../../static/xiangji.png" style="width: 40rpx;height: 40rpx;"></image>
					<text
						style="margin-left: 20rpx; font-size:23rpx;font-weight:400;color:rgba(51,51,51,1);">{{ xiangjishuoming }}</text>
				</view>
			</view>

			<view style="margin-top: 1rpx;">
				<view class="grace-rows grace-flex-vcenter"
					style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text
						style="margin-left: 35rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">储蓄卡卡号：</text>
					<input type="number" v-model="chuxukahao" placeholder="请输入储蓄卡号"
						style="margin-left: 30rpx;width: 500rpx;font-size: 24rpx;" @blur="jianche" />
				</view>

				<view class="grace-rows grace-flex-vcenter"
					style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text
						style="margin-left: 35rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">预留电话：</text>
					<input v-model="yuliudianhua" placeholder="请输入银行预留手机号码"
						style="margin-left: 60rpx;width: 500rpx;font-size: 24rpx;" />
				</view>

				<!-- <view style="margin-top: 10rpx;margin-left: 30rpx;">
					<text style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">*仅支持添加{{user_name}}名下储蓄卡</text>
				</view> -->
			</view>
			<view>
				<button @tap="subimt"
					style="margin-top: 70rpx; width:500rpx;height:90rpx;background:#1678FF;box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">立即认证</button>
			</view>
		</view>
	</gracePage>
</template>

<script>
	// #ifdef APP-PLUS
	const card = uni.requireNativePlugin('DC-CardRecognize');
	// #endif
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				id_card_img: '',
				fakahangid: '',
				fakahangname: '',
				chuxukahao: '',
				yuliudianhua: '',
				user_name: '',
				user_id: '',
				img_id: '', // 身份证正面id
				back_id: '', // 身份证反面id
				card_img_id: '',
				xiangjishuoming: '请点击卡片上传图片',
				name: '', // 用户姓名
				identity: '', // 用户身份证号

			}
		},
		onLoad: function(opt) {
			// #ifdef APP-PLUS
			this.xiangjishuoming = '请点击卡片上传图片'
			// #endif
			// console.log(opt.user_name);
			// if(opt.id==='0'){
			// 	this.user_id=opt.user_id;
			// 	this.user_name=opt.user_name;
			// 	this.img_id=opt.img_id;
			// }else{
			// if (!this.isEmptyObject(opt)) {
			// 	console.log(opt.id);
			// 	this.fakahangid = opt.id,
			// 		this.fakahangname = opt.name
			// }
			const shiming = uni.getStorageSync('shiming');
			console.log(shiming);
			this.user_name = shiming.user_name;
			this.user_id = shiming.user_id;
			this.img_id = shiming.img_id;
			this.back_id = shiming.back_id;
			// }
			// console.log(this.shimingshenfenxinxi);
			// console.log(this.user_name);
		},
		components: {
			gracePage
		},
		methods: {
			xuanzefakahang() {
				uni.$once('xuanzefakahang', this.querenfakahang);
				this.Goto('/pages/issuer_selection/issuer_selection?type=2');
			},
			querenfakahang(data) {
				this.fakahangid = data.id,
					this.fakahangname = data.name
			},
			tupian(file_base64, path) {
				var vm = this;
				vm.req.post(
					vm.lochost + '/mytrunk/uploadfile/base64upfile', {
						file: file_base64
					}, {},
					function(res) {
						vm.id_card_img = res.data[0].quan_path;
						vm.card_img_id = res.data[0].id;
					}
				)
			},
			// 检测卡号
			jianche(e) {
				var value = e.detail.value
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=testing_bank_card', {
						bank_card_num: value
					},
					function(res) {
						console.log(res);
						// return
						if (res.data.type !== 'DC' || res.data.code == 200) {
							uni.showModal({
								title: '提示',
								content: '请核实该卡号是否有误或是否为储蓄卡',
								showCancel: false,
								confirmText: '我知道了',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					}
				)
			},
			getIDCard() {
				if (this.fakahangid === '') {
					this.msg_show('请先选择发卡行喔！')
				} else {
					// #ifdef APP-PLUS
					var vm = this
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: function(res) {
							console.log(res);
							var tempFilePaths = res.tempFilePaths;
							uni.uploadFile({
								url: 'https://m.xliank.com/api/Upload/user_upload_picture', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[0],
								name: 'image',
								formData: {
									'file_type': 2,
									'name': '0.png',
								},
								success: (uploadFileRes) => {
									console.log(uploadFileRes);
									const res1 = (new Function("return " + uploadFileRes.data))();
									console.log(res1);
									vm.id_card_img = res1.data.img_url_whole;
									vm.card_img_id = res1.data.img_url;
								}
							});
						}
					});
					// #endif
					// #ifdef H5
					var vm = this
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							console.log(res);
							var tempFilePaths = res.tempFilePaths;
							uni.uploadFile({
								url: 'https://m.xliank.com/api/Upload/user_upload_picture', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[0],
								name: 'image',
								formData: {
									'file_type': 2,
									'name': '0.png',
								},
								success: (uploadFileRes) => {
									console.log(uploadFileRes);
									const res1 = (new Function("return " + uploadFileRes.data))();
									console.log(res1);
									vm.id_card_img = res1.data.img_url_whole;
									vm.card_img_id = res1.data.img_url;
								}
							});
						}
					});
					// #endif
				}

			},
			subimt() {
				if (this.chuxukahao === '' || this.fakahangid === '' || this.yuliudianhua === '') {
					this.msg_show('请将信息填写完整')
				} else {
					var vm = this;
					this.req.post(
						this.lochost + '/index/index?method=authentication', {
							name: this.user_name,
							identity: this.user_id,
							bank_id: this.fakahangid,
							bank_card: this.chuxukahao,
							bank_tel: this.yuliudianhua,
							sms_code: '',
							idcard_img: this.img_id,
							idcard_back: this.back_id,
							bank_card_img: ''
						}, {},
						function(res) {
							console.log(res);
							if (res.code == 200) {
								uni.removeStorageSync('shiming');
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								uni.switchTab({
									url: '/pages/personal_center/personal_centers'
								});
							}

						}
					)
				}


			},
			isEmptyObject(obj) {
				for (var key in obj) {
					return false;
				}
				return true;
			}
		}
	}
</script>

<style>
</style>
