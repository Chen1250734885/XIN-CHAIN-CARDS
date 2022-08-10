<template>
	<!-- 联系客服 -->
	<view>
		<scroll-view id="scrollview" style="height: 1225rpx; overflow:scroll;" scroll-y="true" :scroll-top="scrollTop" scroll-with-animation="true">
			<view  class="conent m-item">
				<!-- 客服 -->
				<view class="kefus" v-if="yanchi">
					<image src="../../static2/weibiaoti-_huabanfuben.png" style="width: 60rpx;height: 60rpx;"></image>
					<view class="kefu_a">
						<text style="width: 433rpx;">请问有什么需要帮助的吗？</text>
					</view>
				</view>

				<!-- 客户 -->
				<view v-for="item in data ">
					<view v-if="item.type == 'h'" class="kehu">
						<view class="kehu_a">
							<text>{{item.text}}</text>
						</view>
						<image src="../../static2/icon-test.png" style="width: 60rpx;height: 60rpx;margin-right: 30rpx;transform: translateY(5rpx);"></image>
					</view>
					<!-- 客服 -->
					<view class="kefus" v-if="item.type == 'F'">
						<image src="../../static2/weibiaoti-_huabanfuben.png" style="width: 60rpx;height: 60rpx;"></image>
						<view class="kefu_a" v-if="item.text_type=='text'">
							{{item.text}}
						</view>
						<view class="kefu_as" v-if="item.text_type=='img'">
							<image :src="item.text.slice(11,48)" class="tupians" @longtap="baochun(item.text.slice(11,48))"></image>
						</view>
					</view>
				</view>

			</view>
		</scroll-view>
		<!-- 输入 -->
		<view class="shuru">
			<view class="shuru_1">
				<view style="display: inline-block;">
					<image src="../../static2/yuyin.png" mode="" style="width: 65rpx;height: 65rpx;margin-left: 30rpx;"></image>
				</view>
				<view style="display: inline-block;margin-left: 8rpx;">
					<input type="text" v-model="shurusrc" class="inps" @input="inpus" />
				</view>
				<view style="position: absolute;top: 58rpx;left: 648rpx;" @tap="jias">
					<image src="../../static2/jia.png" mode="" style="width: 65rpx;height: 65rpx;margin-left: 30rpx;"></image>
				</view>
				<view style="position: absolute;top: 66rpx;left: 610rpx;">
					<image src="../../static2/biaoqing.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				shurusrc: '',
				data: [],
				first: true,
				yanchi: false,
				scrollTop: 0,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
			}

		},
		// mounted() {
		// 	this.scrollToBottom()
		// },
		updated() {
			this.scrollToBottom()
		},

		onLoad() {
			var vm = this
			setTimeout(function() {
				vm.yanchi = true
			}, 500)
			// this.jias()

		},
		methods: {
			inpus(e) {
				console.log(e);
				this.shurusrc = e.detail.value
			},
			jias() {
				var phone = uni.getStorageSync('user_phone');
				var name = '桐罐卡-' + phone
				var str = this.shurusrc;
				console.log(str)
				var array = {
					type: 'h',
					text: str,
					name: name,
					text_type: 'text'
				};
				var datashuju = this.data;
				datashuju.push(array)
				// this.scrollToBottom();
				this.data = datashuju;
				this.shurusrc = '';
				var vm = this
				if (this.first) {
					vm.req.post(
						vm.lochost + '/index/index?method=customer_service', {
							message: vm.shursrc
						}, {},
						function(res) {
							vm.shurusrc = ''
							setTimeout(function() {
								vm.tianjia(res.data, 1);
							}, 1000)
							vm.first = false
						}
					)
				}

			},
			tianjia(array, index) {
				// console.log(array);
				var vm = this
				// if(!index){
				// 	index = 0;
				// }
				// var that = this;
				// if(array[index]){
				if (index) {
					var datas = array
					for (var i = 0; i < datas.length; i++) {
						var datashuju = vm.data;
						datashuju.push(datas[i]);
						vm.data = datashuju;
						// vm.scrollToBottom();
					}

				} else {
					var datashuju = this.data;
					datashuju.push(array);
					vm.data = datashuju;
				}

				// vm.scrollToBottom();
				// setTimeout(function(){
				// 	// index++;
				// 	vm.tianjia(array,index);
				// },1000)
				// }
			},
			scrollToBottom: function() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec(function(res) {
					that.style.mitemHeight = 0;
					console.log(res);
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 200) //获取所有内部子元素的高度

					setTimeout(function() {
						if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) { //判断子元素高度是否大于显示高度
							that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight + 50 //用子元素的高度减去显示的高度就获益获得序言滚动的高度
							// console.log(that.scrollTop);
						}
					}, 100)
				})
			},
			baochun: function(src) {
				uni.showModal({
					title: '保存图片',
					content: '确定要保存图片吗？',
					success: function(res) {
						console.log(res)
						if (res.confirm) {
							uni.downloadFile({
								url: src,
								success: function(res) {
									console.log(res)
									var tempFilePath = res.tempFilePath;
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: function() {
											uni.showToast({
												title: '保存成功',
												icon: 'none'
											})
										}
									})
								}
							})
						}
					}
				})
			}
		},
	}
</script>

<style>
	page {
		background-color: #E5E5E5;
	}

	.kehu {
		display: flex;
		justify-content: flex-end;
		margin-top: 27rpx;
	}

	.kehu_a {
		display: inline-block;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		padding: 18rpx 33rpx;
		font-size: 24rpx;
		margin-right: 15rpx;
	}

	.kefus {
		display: flex;
		justify-content: flex-start;
		margin-top: 25rpx;
		margin-left: 21rpx;
	}

	.kefu_a {
		background-color: #FFFFFF;
		border-radius: 10rpx;
		padding: 19rpx 16rpx;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.kefu_as image {
		width: 300rpx;
		height: 300rpx;
		margin-left: 15rpx;
		border-radius: 10rpx;
	}

	.shuru {
		width: 100%;
		height: 180rpx;
		background-color: #F2F2F2;
		position: absolute;
		bottom: 0;
	}

	.shuru_1 {
		margin-top: 58rpx;
		display: inline-block;
	}

	.inps {
		width: 485rpx;
		height: 65rpx;
		display: inline-block;
		background-color: #FFFFFF;
		border: 0;
		border-radius: 33rpx;
		padding-left: 20rpx;
		padding-right: 66rpx;

	}
</style>
