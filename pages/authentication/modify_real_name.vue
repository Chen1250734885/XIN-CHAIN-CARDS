<template>
	<gracePage :customHeader="false">
		<view slot="gBody">


			<view class="grace-flex-center" style="width: 750rpx;margin-top: 40rpx;">
				<view @tap="getIDCard()">
					<image
						:src=" id_card_img.length > 0  || card_img_id !== ''? id_card_img : '../../static/shenfenzheng.png'"
						style=" width: 330rpx;height: 210rpx;"></image>
				</view>
				<view style="margin-left: 41rpx;" @tap="getIDback">
					<image :src="id_back_img.length > 0 ? id_back_img : '../../static/shenfenzhengs.png'"
						style=" width: 330rpx;height: 210rpx;"></image>
				</view>
			</view>

			<view class="grace-rows grace-flex-center" style="margin-top: 25rpx;">
				<image src="../../static/xiangji.png" style="width: 40rpx;height: 40rpx;"></image>
				<text
					style="margin-left: 20rpx; font-size:23rpx;font-weight:400;color:rgba(51,51,51,1);">{{ xiangjishuoming }}</text>
			</view>

			<view style="margin-top: 35rpx;">
				<view class="grace-rows grace-flex-vcenter"
					style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text
						style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">真实姓名：</text>
					<input placeholder="请输入您的真实姓名" v-model="user_name" @input="name" style="margin-left: 60rpx;" />
				</view>

				<view class="grace-rows grace-flex-vcenter"
					style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text
						style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">身份证号：</text>
					<input placeholder="请输入您的真实姓名" v-model="user_id" @input="identis" style="margin-left: 60rpx;" />
				</view>
			</view>
			<view>
				<view @tap="submit"
					style="margin-top: 70rpx; width:500rpx;height:90rpx;background:#1678FF;box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);line-height: 90rpx;text-align: center;margin-left: 125rpx;">
					确认修改</view>
			</view>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	// #ifdef APP-PLUS
	const card = uni.requireNativePlugin('DC-CardRecognize');
	// #endif

	export default {
		data() {
			return {
				user_name: '',
				user_names: '',
				identity: '',
				user_id: '',
				user_ids: '',
				img_id: '',
				id_card_img: '', // 身份证正面图片
				id_back_img: '', // 身份证反面图片
				card_img_id: '', // 身份证正面id
				back_img_id: '', // 身份证反面id
				pamd: '', // 判断上一个跳转的页面
				xiangjishuoming: '请点击卡片上传图片'
			}
		},
		mounted() {
			var vm = this;
			vm.req.mypost(
				vm.lochost + '/index/index?method=user_index', {},
				function(res) {
					console.log(res);
					vm.user_name = res.data.real_name;
					vm.user_id = res.data.identity;
					vm.id_card_img = res.data.u_idcard_img // 身份证正面图片
					vm.id_back_img = res.data.u_idcard_back // 身份证反面图片
				}
			)
			var pas = uni.getStorageSync('storage_key')
			vm.pamd = pas
			console.log(pas);
			uni.removeStorageSync('storage_key');
		},
		methods: {
			name(e) {
				// console.log(e);
				var names = e.detail.value
				this.user_names = names
			},
			identis(e) {
				var identys = e.detail.value
				this.user_ids = identys
				console.log(this.user_ids);
			},
			tupian(file_base64, path) {
				var vm = this;
				vm.req.post(
					vm.lochost + '/mytrunk/uploadfile/base64upfile', {
						file: file_base64
					}, {},
					function(res) {
						vm.id_card_img = res.data[0].quan_path;
						vm.img_id = res.data[0].id;
					}
				)
			},
			// 修复无法上传的bug(view页面的卡号id与下面未匹配)
			// 上传身份证正面照片
			getIDCard() {
				var vm = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						uni.showLoading({
							title: '加载中',
							mask: true,
						});
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
								if (res1.code == 200) {
									uni.showToast({
										title: res1.msg,
										icon: "none"
									})
									uni.hideLoading()
									vm.id_card_img = res1.data.img_url_whole;
									vm.card_img_id = res1.data.img_url;
								} else {
									uni.showToast({
										title: res1.msg,
										icon: "none"
									})
								}
							}
						});
					}
				})
			},
			// 上传身份证反面照片
			getIDback() {
				// #ifdef APP-PLUS
				var vm = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(res);
						uni.showLoading({
							title: '加载中',
							mask: true
						})
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

								const res1 = (new Function("return " + uploadFileRes.data))
									();
								console.log(res1);
								if (res1.code == 200) {
									uni.showToast({
										title: res1.msg,
										icon: 'none'
									})
									uni.hideLoading()
									vm.id_back_img = res1.data.img_url_whole;
									vm.back_img_id = res1.data.img_url;
								} else {
									uni.showToast({
										title: res1.msg,
										icon: 'none'
									})
								}
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
						uni.showLoading({
							title: '加载中',
							mask: true
						})
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
								const res1 = (new Function("return " + uploadFileRes.data))
									();
								console.log(res1);
								if (res1.code == 200) {
									uni.showToast({
										title: res1.msg,
										icon: 'none'
									})
									uni.hideLoading()
									vm.id_back_img = res1.data.img_url_whole;
									vm.back_img_id = res1.data.img_url;
								} else {
									uni.showToast({
										title: res1.msg,
										icon: 'none'
									})
								}
							}
						});
					}
				});
				// #endif

			},

			// 确认修改按钮
			submit() {
				var vm = this
				this.req.mypost(
					this.lochost + '/index/index?method=edit_real_name', {
						u_name: this.user_name,
						u_identity: this.user_id,
						idcard_img: this.card_img_id,
						idcard_back: this.back_img_id
					},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
							if (vm.pamd !== 1) {
								setTimeout(function() {
									vm.reto('/pages/authentication/real_name');
								}, 500)
							} else {
								setTimeout(function() {
									uni.navigateBack()
								}, 500)

							}
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
		onLoad: function() {
			// #ifdef APP-PLUS
			this.xiangjishuoming = '请点击卡片上传图片'
			// #endif
		},
		components: {
			gracePage
		}
	}
</script>

<style>
</style>
