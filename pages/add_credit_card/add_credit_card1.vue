<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<view class="grace-space-between" style="margin-top: 16rpx;padding: 0 24rpx;">
				<view class="grace-flex-center" style="background-image:url(../../static/jindutian.png);background-repeat: no-repeat; width: 230rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">1.卡号信息</text>
				</view>
				<view class="grace-flex-center" style="background-image:url(../../static/jindutiao1.png);background-repeat: no-repeat; width: 230rpx;height: 40rpx;background-size:contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">2.安全码</text>
				</view>
				<view class="grace-flex-center" style="background-image:url(../../static/jindutiao1.png);background-repeat: no-repeat; width: 230rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">3.还款日/账单日</text>
				</view>
			</view>
			<view style="margin-top: 35rpx;">
				<!-- reto('/pages/issuer_selection/issuer_selection?banck=信用卡') -->
				<view @tap="xuanzefakahang" class="grace-rows grace-flex-vcenter" style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 28rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">发卡银行：</text>
					<text class="grace-ellipsis" style="position: relative; left: 60rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);">{{ fakahangname != '' ? fakahangname:'请选择发卡行'}}</text>
					<image src="../../static/jiantou.png" style="position: absolute;left: 650rpx; width: 20rpx;height: 35rpx;"></image>
				</view>
			</view>
			<!--  -->
			<view  v-show="fakahangname">
				<view class="grace-flex-center" style="width: 750rpx;margin-top: 40rpx;" @tap="getIDCard()">
					<view>
						<image :src=" id_card_img.length>0 ? id_card_img : '../../static/youxiaoqi.png'" style=" width: 544rpx;height: 328rpx;"></image>
					</view>
				</view>

				<view @tap="getIDCard()" class="grace-rows grace-flex-center" style="margin: 25rpx 0;">
					<image src="../../static/xiangji.png" style="width: 40rpx;height: 40rpx;"></image>
					<text style="margin-left: 20rpx; font-size:23rpx;font-weight:400;color:rgba(51,51,51,1);">{{ xiangjishuoming }}</text>
				</view>
			</view>

			<view style="margin-top: 1rpx;">
				<view class="grace-rows grace-flex-vcenter" style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 28rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">信用卡卡号：</text>
					<input v-model="xinyongkahao" placeholder="请输入信用卡号" style="margin-left: 30rpx;width: 500rpx;font-size: 24rpx;" @blur="jianche" />
				</view>

				
					<view class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">

						<text style="margin-left: 28rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">有效期：</text>
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
						<input v-model="date" placeholder="例:MM/YY" style="margin-left: 95rpx;width: 500rpx;font-size: 24rpx;" disabled />
						</picker>
						<image @tap="xianshow" src="../../static2/wenhao.png" style="position: absolute;left: 650rpx; width: 42rpx;height: 42rpx;"></image>
					</view>
				

				<view style="margin-top: 10rpx;margin-left: 30rpx;">
					<text style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">*仅支持添加本人名下信用卡</text>
				</view>
			</view>
			<view>
				<button @tap="submit" style="margin-top: 70rpx; width:500rpx;height:90rpx;background:#1678FF;box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">下一步</button>
			</view>

			<!-- 有效期说明 -->
			<uni-popup ref="popup" type="center">
				<view class="popup">
					<view class="tisis">
						<text>有效期说明</text>
						<image class="tuspm" src="../../static2/youxiaoqi.png" mode=""></image>
						<view style="font-size: 24rpx;">信用卡有效期为信用卡正面4位数字，格式为XX/XX 。</view>
					</view>
					<view class="zdl" @tap="wzdl">我知道了</view>
				</view>
			</uni-popup>
			<!-- 卡号有误确认添加弹框 -->
			<uni-popup ref="popups" type="center">
				<view class="popupt">
					<view class="tianjia">确认添加</view>
					<view class="tishiwenzi">
						<text>我们检测到您的<text style="color: RGBA(255, 72, 0, 1);">卡号可能有误</text>，可点击取消修改，或点击确定继续添加。</text>
					</view>
					<view class="tianjia_ann">
						<text class="ann_1" @tap="submits">确认</text>
						<text class="ann_2" @tap="qxg">取消</text>
					</view>
				</view>
			</uni-popup>
		</view>
	</gracePage>
</template>

<script>

	const card = uni.requireNativePlugin('DC-CardRecognize');
	
	import gracePage from "../../graceUI/components/gracePage.vue";
	import {md5} from "../../graceUI/jsTools/md5.js"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				id_card_img: '',
				card_img_id: '',
				fakahangid: '',
				fakahangname: '',
				xinyongkahao: '',
				youxiaoqi_M: '',
				youxiaoqi_Y: '',
				M_jujiao: false,
				Y_jujiao: false,
				show_youxiaoqi: '',
				Y_len: 0,
				xiangjishuoming: '请点击卡片上传图片',
				edu: '',
				types: '',
				date: '',
				dates: ''
			}
		},

		onLoad: function(opt) {
			this.types = opt.types
			this.xiangjishuoming = '请点击卡片上传图片';
		},
		onShow() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		components: {
			gracePage
		},
		methods: {
			// 日期选择器触发change事件
			bindDateChange: function(e) {
				this.date = e.target.value.slice(5) + '/' + e.target.value.slice(2, 4)
				this.dates = e.target.value
				console.log(this.dates);
				// this.add_user = []
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${month}/${day}`;
			},
			// 显示有效期说明
			xianshow() {
				this.$refs.popup.open()
			},
			// 隐藏有效期说明弹框
			wzdl() {
				this.$refs.popup.close()
			},
			xuanzefakahang() {
				console.log(this.types)
				uni.$once('xuanzefakahang', this.querenfakahang);
				this.Goto('/pages/issuer_selection/issuer_selection?type=1');
			},
			querenfakahang(data) {
				this.fakahangid = data.id,
				this.fakahangname = data.name
			},
			// 隐藏确认添加弹框
			qxg() {
				this.$refs.popups.close()
			},
			// 确认弹框确认按钮
			submits() {
				this.$refs.popups.open()
				this.Goto('/pages/add_credit_card/add_credit_card2?bc_bank_id=' + this.fakahangid + '&bank_card=' + this.xinyongkahao + '&tubiao=' + this.card_img_id + '&bc_effective=' + this.dates)
			},
			// 检测卡号
			jianche(e){
				var value = e.detail.value
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=testing_bank_card',{
						bank_card_num: value
					},function(res){
						console.log(res);
						// return
						if(res.data.type !== 'CC' || res.data.code == 200){
							uni.showModal({
								title: '提示',
								content: '请核实该卡号是否有误或是否为信用卡',
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
			// 下一步按钮
			submit() {
				if (this.fakahangid === '' || this.xinyongkahao === '') {
					this.msg_show('请将信息填写完整');
				} else {
					var vm = this
					vm.req.post(
						vm.lochost + '/index/index?method=validation_bank_card_num', {
							bank_card_num: this.xinyongkahao,
						}, {},
						function(res) {
							console.log(res);
							if (res.data.is_pass !== 1) {
								vm.$refs.popups.open()
							} else {
								vm.Goto('/pages/add_credit_card/add_credit_card2?bc_bank_id=' + vm.fakahangid + '&bc_bank_number=' + vm.xinyongkahao + '&tubiao=' + vm.card_img_id + '&bc_effective=' + vm.dates)
							}
						}
					)
				}
			},
			//填写额度
			tianxieedu: function(obj) {
				var edu = obj.detail.value;
				this.edu = edu;
			},

			tupian(file_base64, path) {
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=user_upload_picture', {
						image:file_base64,
						type:3,
						name: path,
						file_type: 1
					}, {},
					function(res) {
						vm.id_card_img = res.data.img_url;
						vm.card_img_id = res.data[0].id;
						console.log(res);
					}
				)
			},
			youxiaoqi_js_M(val) {
				console.log(val)
				var vale = val.target.value;
				if (vale.length === 2) {
					this.M_jujiao = false;
					this.Y_jujiao = true;
				}
			},
			youxiaoqi_js_Y(val) {
				console.log(val)
				var vale = val.target.value;
				if (vale.length === 0 && this.Y_len === 1) {
					this.Y_jujiao = false;
					this.M_jujiao = true;
				}
				this.Y_len = vale.length;
			},
			// youxiaoqi(val){
			// 	var vale=val.target.value;
			// 	this.youxiaoqi_val=vale;
			// 	if(vale.length===2){
			// 		this.show_youxiaoqi=vale+'/';
			// 	}
			// 	if(vale.length===3){
			// 		if(this.show_youxiaoqi.length===4){
			// 			this.show_youxiaoqi=this.show_youxiaoqi.substring(-3, 2);
			// 		}else if(this.show_youxiaoqi.length===2){
			// 			console.log(vale.length);
			// 			this.show_youxiaoqi=vale.slice(0,2)+'/'+vale.slice(2)  
			// 		}
			// 	}
			// },
			getIDCard() {
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
								'file_type':2,
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
				
				// if (this.fakahangid === '') {
				// 	this.msg_show('请先选择发卡行喔！')
				// } else {
					// var vm = this;
					//  card.startRecognize({
					// 	maskType: "BankCard"
					// }, result => {
					// 	console.log(result.path);
					// 	this.xinyongkahao = result.bank_card_number;
					// 	this.date = result.valid_date
					// 	// 从本地加载Bitmap图片
					// 	//result.path:ocr识别返回的路径
					// 	if (result.path) {
					// 		const bitmapT = new plus.nativeObj.Bitmap("test"); //test标识随便取
					// 		bitmapT.load(result.path, function() {
					// 			console.log('加载图片成功');
					// 			const base64 = bitmapT.toBase64Data();
					// 			console.log(base64);
					// 			// base4:已转为base64的图片
					// 			const file_base64 = {
					// 				name: 'pic.jpg',
					// 				base64: base64
					// 			};
					// 			vm.tupian(file_base64, result.path);
					// 			bitmapT.clear();
					// 		}, function(e) {
					// 			console.log('加载图片失败：' + JSON.stringify(e));
					// 		});
					// 	}
					// 	console.log(JSON.stringify(result));
					// });
					

					// // #ifndef APP-PLUS
					
					// // #endif
				// }
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
	.popup {
		width: 540rpx;
		height: 500rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}

	.tisis {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		transform: translateY(31rpx);
	}

	.tuspm {
		width: 430rpx;
		height: 230rpx;
	}

	.zdl {
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

	.popupt {
		width: 540rpx;
		height: 280rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
	}

	.tianjia {
		font-size: 36rpx;
		color: rgba(51, 51, 51, 1);
		font-weight: 700;
		text-align: center;
		/* transform: translateY(30rpx); */
		line-height: 170rpx;
	}

	.tishiwenzi {
		font-size: 24rpx;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		margin-left: 20rpx;
		margin-top: -60rpx;
		/* line-height: 280rpx; */
	}

	.tianjia_ann {
		display: flex;
		justify-content: space-between;
		margin-left: 101rpx;
		margin-right: 101rpx;
		margin-top: 40rpx;
	}

	.ann_1 {
		font-size: 34rpx;
		color: rgba(51, 51, 51, 1);
	}

	.ann_2 {
		font-size: 34rpx;
		color: rgba(51, 51, 51, 1);
	}
</style>
