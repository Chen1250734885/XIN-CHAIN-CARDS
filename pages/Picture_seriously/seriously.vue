<template>
	<!-- 图片认证 -->
	<view>
		<!-- 图片上传 -->
		<view class="sc">
			<view style="padding-top: 29rpx;margin-left: 31rpx;">
				<text style="font-size: 30rpx;color: #333333;">请拍摄并上传您的身份证照片与储蓄卡照片</text>
			</view>
			<!-- 身份证上传 -->
			<view class="sf">
				<!-- 身份证正面 -->
				<view class="zm" @click="getIDCard()" data-model="z_img">
					<view class="bk">
						<image :src=" s_zhenmian.length>0 ? s_zhenmian : '../../static/zhengmian.png'" style="width: 100%;height: 100%;"
						 mode=""></image>
					</view>
					<view class="ant">
						<text style="font-size: 28rpx;color: #FFFFFF; line-height: 60rpx;margin-left: 66rpx;">身份证正面照片</text>
					</view>
				</view>
				<!-- 身份证反面 -->
				<view class="fm" @tap="getIDCards()" data-model="f_img">
					<view class="bk">
						<image :src=" s_fanmian.length>0 ? s_fanmian : '../../static/fanmian.png'" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="ant">
						<text style="font-size: 28rpx;color: #FFFFFF; line-height: 60rpx;margin-left: 66rpx;">身份证反面照片</text>
					</view>
				</view>
			</view>
			<!-- 储存卡与身份证 -->
			<view class="cx" @tap="shangchuan" data-model="s_imgs">
				<!-- 手持身份证与银行卡 -->
				<view class="scti">
					<view class="bk">
						<image :src=" s_y_img.length>0 ? s_y_img : '../../static/shouchi.png'" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="tisi">
						<text style="font-size: 28rpx;color: #FFFFFF; line-height: 60rpx;margin-left: 66rpx;">手持身份证与银行卡</text>
					</view>
				</view>
				<!-- 储蓄卡照片 -->
				<view class="cxk" @tap="shangchuans" data-model="bank_img">
					<view class="bk">
						<image :src=" c_img.length>0 ? c_img : '../../static/chuxu.png'" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="tisi">
						<text style="font-size: 28rpx;color: #FFFFFF; line-height: 60rpx;margin-left: 66rpx;">储蓄卡照片</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 拍摄要求 -->
		<view class="yaoqiu">
			<view style="margin-left: 31rpx;padding-top: 19rpx;">
				<view class="yq">
					<text style="font-size: 30rpx; color: #1B1B20;">拍摄身份证要求：</text>

				</view>
				<view class="yq_s">
					<text style="color: #919191;font-size: 26rpx;">大陆公民持有的本人有效二代身份证；</text>
				</view>
				<view class="yq_b">
					<text style="color: #919191;font-size: 26rpx;">拍摄时确保身份证</text>
					<text style="color: #E73146;font-size: 26rpx;">边框完整，字体清晰，亮度均匀。</text>
				</view>
			</view>
			<!-- 拍摄标准示例 -->
			<view class="sl">
				<view class="icos">
					<view style="width: 90rpx;height: 58rpx;padding-top: 14rpx;margin-left: 35rpx;">
						<image src="../../static/zhengmian.png" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="item">
						<icon type="success" size="30rpx"></icon>
					</view>
				</view>
				<view style="padding-top: 19rpx;">
					<text style="color: #999999;font-size: 26rpx;margin-left: 52rpx;">标准</text>
				</view>
			</view>
			<view class="sl">
				<view class="icos">
					<view style="width: 90rpx;height: 58rpx;padding-top: 14rpx;margin-left: 35rpx;">
						<image src="../../static/zhengmian.png" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="item">
						<icon type="clear" size="30rpx" color="#E9434C"></icon>
					</view>
				</view>
				<view style="padding-top: 19rpx;">
					<text style="color: #999999;font-size: 26rpx;margin-left: 23rpx;">边框缺失</text>
				</view>
			</view>
			<view class="sl">
				<view class="icos">
					<view style="width: 90rpx;height: 58rpx;padding-top: 14rpx;margin-left: 35rpx;">
						<image src="../../static/zhengmian.png" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="item">
						<icon type="clear" size="30rpx" color="#E9434C"></icon>
					</view>
				</view>
				<view style="padding-top: 19rpx;">
					<text style="color: #999999;font-size: 26rpx;margin-left: 23rpx;">字体模糊</text>
				</view>
			</view>
			<view class="sl">
				<view class="icos">
					<view style="width: 90rpx;height: 58rpx;padding-top: 14rpx;margin-left: 35rpx;">
						<image src="../../static/zhengmian.png" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="item">
						<icon type="clear" size="30rpx" color="#E9434C"></icon>
					</view>
				</view>
				<view style="padding-top: 19rpx;">
					<text style="color: #999999;font-size: 26rpx;margin-left: 23rpx;">闪光强烈</text>
				</view>
			</view>
		</view>
		<!-- 认证按钮 -->
		<view class="renz">
			<button @tap="Authentication" style="width: 500rpx;height: 90rpx;background-color: #1678FF;font-size: 30rpx;color: #FFFFFF;line-height: 90rpx;">立即认证</button>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	const card = uni.requireNativePlugin('DC-CardRecognize');
	// #endif
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				s_zhenmian: '',
				s_fanmian: '',
				s_y_img: '',
				c_img: ''
			}
		},
		methods: {
			//上传正面身份证图片
			getIDCard() {
				// // console.log(obj)
				// console.log(obj.currentTarget.dataset.model);
				// var keys =  obj.currentTarget.dataset.model;
				// // // #ifdef APP-PLUS
				var vm = this;
				card.startRecognize({
					maskType: "IDCardFront"
				}, result => {
					console.log(result.path);
					// this.chuxukahao = result.bank_card_number;
					const bitmapT = new plus.nativeObj.Bitmap("test"); //test标识随便取
					// 从本地加载Bitmap图片
					//result.path:ocr识别返回的路径
					if (result.path) {
						bitmapT.load(result.path, function() {
							console.log('加载图片成功');
							const base64 = bitmapT.toBase64Data();
							// base4:已转为base64的图片
							const file_base64 = {
								name: 'pic.jpg',
								base64: base64
							};
							vm.tupian(file_base64, result.path);
							bitmapT.clear();
						}, function(e) {
							console.log('加载图片失败：' + JSON.stringify(e));
						});
					}
					console.log(JSON.stringify(result));
					console.log(123)
				});
				// #endif
				var vm = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						// console.log(tempFilePaths)
						// return
						uni.uploadFile({
							url: vm.lochost + '/mytrunk/uploadfile/upfile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'file': 'pic.jpg'
							},
							success: (uploadFileRes) => {
								const res1 = JSON.parse(uploadFileRes.data);
								vm.s_zhenmian = res1.data[0].quan_path;
								// vm.card_img_id = res1.data[0].id;
							}
						});
					}
				});
			},

			//上传反面身份证图片
			getIDCards() {
				// // console.log(obj)
				// console.log(obj.currentTarget.dataset.model);
				// var keys =  obj.currentTarget.dataset.model;
				// // // #ifdef APP-PLUS
				var vm = this;
				new card.startRecognize({
					maskType: "IDCardBack"
				}, result => {
					console.log(result.path);
					// this.chuxukahao = result.bank_card_number;
					const bitmapT = new plus.nativeObj.Bitmap("test"); //test标识随便取
					// 从本地加载Bitmap图片
					//result.path:ocr识别返回的路径
					if (result.path) {
						bitmapT.load(result.path, function() {
							console.log('加载图片成功');
							const base64 = bitmapT.toBase64Data();
							// base4:已转为base64的图片
							const file_base64 = {
								name: 'pic.jpg',
								base64: base64
							};
							vm.tupian(file_base64, result.path);
							bitmapT.clear();
						}, function(e) {
							console.log('加载图片失败：' + JSON.stringify(e));
						});
					}
					console.log(JSON.stringify(result));
					console.log(123)
				});
				// #endif
				var vm = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						// console.log(tempFilePaths)
						// return
						uni.uploadFile({
							url: vm.lochost + '/mytrunk/uploadfile/upfile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'file': 'pic.jpg'
							},
							success: (uploadFileRes) => {
								const res1 = JSON.parse(uploadFileRes.data)
								vm.s_fanmian = res1.data[0].quan_path;
								// vm.card_img_id = res1.data[0].id;
							}
						});
					}
				});
			},

			// 上传手持身份证与银行卡图片
			shangchuan() {
				// // console.log(obj)
				// console.log(obj.currentTarget.dataset.model);
				// var keys =  obj.currentTarget.dataset.model;
				// // // #ifdef APP-PLUS
				var vm = this;
				new card.startRecognize({
					maskType: "IDCardBack"
				}, result => {
					console.log(result.path);
					// this.chuxukahao = result.bank_card_number;
					const bitmapT = new plus.nativeObj.Bitmap("test"); //test标识随便取
					// 从本地加载Bitmap图片
					//result.path:ocr识别返回的路径
					if (result.path) {
						bitmapT.load(result.path, function() {
							console.log('加载图片成功');
							const base64 = bitmapT.toBase64Data();
							// base4:已转为base64的图片
							const file_base64 = {
								name: 'pic.jpg',
								base64: base64
							};
							vm.tupian(file_base64, result.path);
							bitmapT.clear();
						}, function(e) {
							console.log('加载图片失败：' + JSON.stringify(e));
						});
					}
					console.log(JSON.stringify(result));
					console.log(123)
				});
				// #endif
				var vm = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						// console.log(tempFilePaths)
						// return
						uni.uploadFile({
							url: vm.lochost + '/mytrunk/uploadfile/upfile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'file': 'pic.jpg'
							},
							success: (uploadFileRes) => {
								const res1 = JSON.parse(uploadFileRes.data);
								vm.s_y_img = res1.data[0].quan_path;
								// vm.card_img_id = res1.data[0].id;
							}
						});
					}
				});
			},

			// 上传储蓄卡图片
			shangchuans() {
				// // console.log(obj)
				// console.log(obj.currentTarget.dataset.model);
				// var keys =  obj.currentTarget.dataset.model;
				// // // #ifdef APP-PLUS
				var vm = this;
				new card.startRecognize({
					maskType: "BankCard"
				}, result => {
					console.log(result.path);
					// this.chuxukahao = result.bank_card_number;
					const bitmapT = new plus.nativeObj.Bitmap("test"); //test标识随便取
					// 从本地加载Bitmap图片
					//result.path:ocr识别返回的路径
					if (result.path) {
						bitmapT.load(result.path, function() {
							console.log('加载图片成功');
							const base64 = bitmapT.toBase64Data();
							// base4:已转为base64的图片
							const file_base64 = {
								name: 'pic.jpg',
								base64: base64
							};
							vm.tupian(file_base64, result.path);
							bitmapT.clear();
						}, function(e) {
							console.log('加载图片失败：' + JSON.stringify(e));
						});
					}
					console.log(JSON.stringify(result));
					console.log(123)
				});
				// #endif
				var vm = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						// console.log(tempFilePaths)
						// return
						uni.uploadFile({
							url: vm.lochost + '/mytrunk/uploadfile/upfile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'file': 'pic.jpg'
							},
							success: (uploadFileRes) => {
								const res1 = JSON.parse(uploadFileRes.data);
								vm.c_img = res1.data[0].quan_path;
								// vm.card_img_id = res1.data[0].id;
							}
						});
					}
				});
			},

			// 认证
			/* s_zhenmian: '',
				s_fanmian: '',
				s_y_img: '',
				c_img: '*/
			Authentication() {
			if (this.s_zhenmian==='' || this.s_fanmian==='' || this.s_y_img==='' || this.c_img==='') {
				this.msg_show('请将照片上传完整')
				}else{
					var vm=this;
					this.req.post(
					this.lochost+'/mytrunk/souxin/souxin_renzhen',
					{
						z_img:this.s_zhenmian,
						f_img:this.s_fanmian,
						s_imgs:this.s_y_img,
						bank_img:this.c_img
					},
					{},
					function(res){
						console.log(res.msg)
						if(res.code == 200){
							uni.navigateTo({
								url:'/pages/generation_plan/passageway'
							})
						}
						// vm.msg_show(res.data.data)
						// uni.removeStorageSync('shiming');
						// uni.switchTab({
						//     url: '/pages/personal_center/personal_center'
						// });
					}
					)
				}
			}
		}
	}
</script>

<style>
	.sc {
		width: 100%;
		height: 640rpx;
		background-color: #FFFFFF;
	}

	.zm {
		display: inline-block;
		width: 324rpx;
		height: 252rpx;
		background-color: #F4F8FE;
		border-radius: 10rpx;
		margin-left: 30rpx;
		margin-top: 31rpx;
	}

	.bk {

		width: 234rpx;
		height: 152rpx;
		border: 1rpx dashed #999999;
		transform: translateY(20rpx);
		margin-left: 46rpx;
	}

	.ant {
		width: 324rpx;
		height: 60rpx;
		background-color: #1678FF;
		margin-top: 35rpx;
		border-radius: 0rpx 0rpx 10rpx 10rpx;

	}

	.tisi {
		width: 324rpx;
		height: 60rpx;
		background-color: #1678FF;
		margin-top: 35rpx;
		border-radius: 0rpx 0rpx 10rpx 10rpx;
	}

	.fm {
		display: inline-block;
		width: 324rpx;
		height: 252rpx;
		background-color: #F4F8FE;
		border-radius: 10rpx;
		margin-left: 30rpx;
		margin-top: 31rpx;
	}

	.scti {
		display: inline-block;
		width: 324rpx;
		height: 252rpx;
		background-color: #F4F8FE;
		border-radius: 10rpx;
		margin-left: 30rpx;
		transform: translateY(20rpx);
	}

	.cxk {
		display: inline-block;
		width: 324rpx;
		height: 252rpx;
		background-color: #F4F8FE;
		border-radius: 10rpx;
		margin-left: 30rpx;
		transform: translateY(20rpx);
	}

	.yaoqiu {
		width: 100%;
		height: 320rpx;
		background-color: #FFFFFF;
		margin-top: 2rpx;
	}

	.icos {
		width: 160rpx;
		height: 95rpx;
		background-color: #F2F7FE;
	}

	.item {
		margin-left: 65rpx;
		margin-top: -8rpx;
	}

	.sl {
		display: inline-block;
		margin-left: 30rpx;
		margin-top: 24rpx;
		margin-right: -17rpx;
	}

	.renz {
		margin-top: 26rpx;
	}
</style>
