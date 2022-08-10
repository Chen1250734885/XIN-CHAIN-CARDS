<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<!-- 进度条 -->
			<view class="grace-space-between" style="margin-top: 16rpx;padding: 0 24rpx;">
				<view class="grace-flex-center" style="background-image:url(../../static/guidance_bg.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">1.身份认证</text>
				</view>
				<view class="grace-flex-center" style="background-image:url(../../static/cloud_brush_danghang1.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">2.储蓄卡认证</text>
				</view>
			</view>

			<view class="grace-flex-center" style="width: 750rpx;margin-top: 40rpx;">
				<!--  -->
				<!-- 身份证正面 -->
				<view style="display: inline-block;" @tap="getIDCard()">
					<image :src=" id_card_img.length>0 ? id_card_img : '../../static/shenfenzheng.png'" style=" width: 330rpx;height: 210rpx;border-radius: 10rpx;"></image>
				</view>
				<!-- 身份证反面 -->
				<view style="display: inline-block;margin-left: 41rpx;" @tap="getIDback">
					<image :src=" idcard_back.length>0 ? idcard_back : '../../static/shenfenzhengs.png'" style=" width: 330rpx;height: 210rpx;border-radius: 10rpx;"></image>
				</view>
			</view>

			<view class="grace-rows grace-flex-center" style="margin-top: 25rpx;">
				<image src="../../static/xiangji.png" style="width: 40rpx;height: 40rpx;"></image>
				<text style="margin-left: 20rpx; font-size:23rpx;font-weight:400;color:rgba(51,51,51,1);">{{ xiangjishuoming }}</text>
			</view>

			<view style="margin-top: 35rpx;">
				<view class="grace-rows grace-flex-vcenter" style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">真实姓名：</text>
					<input placeholder="请输入您的真实姓名" v-model="user_name" style="margin-left: 60rpx;" />
				</view>

				<view class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">身份证号：</text>
					<input placeholder="请输入身份证号" v-model="user_id" style="margin-left: 60rpx;" />
				</view>
			</view>
			<view>
				<button @tap="xiayibu" style="margin-top: 70rpx; width:500rpx;height:90rpx;background:#1678FF;box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">下一步</button>
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
				user_id: '',
				id_card_img: '', // 身份证正面
				idcard_back: '', // 身份证反面
				img_id: '', // 身份证正面id
				back_id: '', // 身份证反面id
				xiangjishuoming: '请点击卡片上传图片'

			}
		},
		methods: {
			xiayibu() {
				if (this.user_name === '' || this.user_id === '') {
					this.msg_show('请将信息填写完整')
				} else {
					uni.setStorageSync('shiming', {
						user_name: this.user_name,
						user_id: this.user_id,
						img_id: this.img_id,
						back_id: this.back_id
					})
					this.Goto('/pages/authentication/authentication2?name=' + this.user_name + '&identity=' + this.user_id)
				}
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
			// 上传身份证正面
			getIDCard() {
				// // #ifdef APP-PLUS
				//  var vm=this;
				// new card.startRecognize({
				// // bankCard 银行卡
				// maskType:"IDCardFront",
				//  },result => {
				//   console.log(result.path);

				//   this.user_name=result.name;
				//   this.user_id=result.idNumber;
				//   // this.id_card_img='file://'+result.path;
				//   const bitmapT =new plus.nativeObj.Bitmap("test"); //test标识随便取
				//   // 从本地加载Bitmap图片
				//   if (result.path) {
				//       bitmapT.load(result.path, function() {
				//           console.log('加载图片成功');
				//           const base4 = bitmapT.toBase64Data();
				// 		  const file_base64={name:'pic.jpg',base64:base4};
				// 		  vm.tupian(file_base64,result.path);
				// 		  bitmapT.clear();
				//       }, function(e) {
				//           console.log('加载图片失败：' + JSON.stringify(e));
				//       });
				//   } 

				// console.log(JSON.stringify(result));
				//  });
				// // #endif

				// #ifdef APP-PLUS
				var vm = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
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
								if(res1.code == 200){
									vm.id_card_img = res1.data.img_url_whole;
									vm.img_id = res1.data.img_url;
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
								vm.img_id = res1.data.img_url;
							}
						});
					}
				});
				// #endif
			},
			// 上传身份证反面
			getIDback(){
				// #ifdef APP-PLUS
				var vm = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
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
								vm.idcard_back = res1.data.img_url_whole;
								vm.back_id = res1.data.img_url;
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
								vm.idcard_back = res1.data.img_url_whole;
								vm.back_id = res1.data.img_url;
							}
						});
					}
				});
				// #endif
			},
		},
		onLoad: function() {
			// #ifdef APP-PLUS
			this.xiangjishuoming = '请点击卡片上传图片';
			// #endif
		},
		components: {
			gracePage
		}
	}
</script>

<style>
</style>
