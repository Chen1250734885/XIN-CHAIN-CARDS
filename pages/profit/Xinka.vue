<template>
	<!-- 推荐佣金 -->
	<view slot="gBody">
		<!-- 一刷通记录按钮 -->
			<view class="wqann" @tap="jilu">
				<image :style="'left:'+moveX+'px;top:'+moveY+'px'" src="../../static2/xnkjinu.png" @touchstart="drag_start"
				 @touchmove.prevent="drag_hmove" mode="aspectFit" style="width: 150rpx;height: 150rpx;"></image>
			</view>
		<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="get_info()">
			<view v-for="(item,index) in club" :key="index">
				<image :src="item.cc_img_url" mode="" style="width: 580rpx;height: 270rpx;margin:10rpx 85rpx;"></image>
				<view class="covse" v-show="item.cc_id" v-if="item.cc_state==3" >
					<text style="font-size: 80rpx;color: #FFFFFF;line-height: 270rpx;" @tap="chehui">撤回</text>
				</view>
				<view class="bhan" v-show="item.cc_state!==2" v-else>
					<view class="bianhao">{{'NO.'+item.cc_encoding}}</view>
					<view class="bianx" v-show="item.cc_state!==0">
						<view class="btn" style="margin-right: 18rpx;" @tap="bianxian(item.cc_id)">变现</view>
						<view class="btn" @tap="use_sy(item.cc_encoding,item.cc_id)">使用</view>
					</view>
				</view>

			</view>
		</scroll-view>
		<!-- 确认变现弹框 -->
		<uni-popup ref="popup" type="center" style="z-index: 9999;">
			<view class="tabk">
				<view class="tabk_b">一刷通变现</view>
				<view class="tabk_x">确认将此卡交易变现</view>
				<view class="tabk_y">折扣价{{sell_money}}元</view>
				<view class="tabk_k">可在收益页面查看余额后提现</view>
				<view class="bnts">
					<view class="qr_s" @tap="qr">确认</view>
					<view class="qx_s" @tap="qx">取消</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				page: 0,
				club: [],
				sell_money: '',
				id: '',
				is_cover: false,
				cc_id: '',
				start: [0, 0],
				moveY: 0,
				moveX: 0,
				windowWidth: '',
				windowHeight: '',
			}
		},
		onShow() {
			var sysinfo = uni.getSystemInfoSync();
			this.height = (sysinfo.safeArea.height - 20) + 'px';
			this.get_info();
			
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
		methods: {
			// 一刷通记录按钮拖拽功能
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
			jilu(){
				this.Goto('/pages/profit/Xinka_record')
			},
			get_info() {
				var vm = this;
				vm.page += 1;
				vm.req.post(
					vm.lochost + '/index/index?method=club_card_list', {
						page: vm.page,
						size: 10,
					}, {},
					function(res) {
						console.log(res);
						var club_list = res.data.data;
						for (let i = 0; i < club_list.length; i++) {
							vm.club.push(club_list[i])
						}
					}
				)
			},
			// 变现按钮
			bianxian(card_id) {
				console.log(card_id);
				this.cc_id = card_id
				this.id = card_id
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=sell_money', {
						card_id: card_id
					}, {},
					function(res) {
						if (res.code == 200) {
							vm.sell_money = res.data.sell_money
							vm.$refs.popup.open()
						}
					}
				)

			},
			// 变现确认按钮
			qr() {
				var cc_id = this.cc_id;
				console.log(cc_id);

				var vm = this
				// vm.is_cover = true
				vm.$refs.popup.close()
				vm.req.post(
					vm.lochost + '/index/index?method=apply_sell', {
						card_id: vm.cc_id
					}, {},
					function(res) {
						if (res.code == 200) {
							uni.redirectTo({
								url: '/pages/profit/Xinka'
							})
						}
					}
				)
			},
			// 变现取消按钮
			qx() {
				this.$refs.popup.close()
			},
			// 一刷通使用
			use_sy(coding, card_id) {
				this.Goto('/pages/profit/Use_file?card_id=' + card_id + '&coding=' + coding)
			},
			// 撤回按钮
			chehui() {
				var current = 1
				// this.Goto('/pages/classify/classify?currentIndex='+ current)
				uni.switchTab({
				    url: '/pages/classify/classify'
				});
			}
		},
		components: {
			uniPopup
		}
	}
</script>

<style>
	.bhan {
		display: flex;
		justify-content: space-between;
	}

	.bianhao {
		float: left;
		margin-top: -65rpx;
		z-index: 99;
		color: rgba(250, 146, 52, 1);
		font-size: 29rpx;
		margin-left: 120rpx;
	}

	.bianx {
		margin-right: 90rpx;
	}

	.btn {
		display: inline-block;
		/* float: right; */
		width: 120rpx;
		height: 35rpx;
		font-size: 22rpx;
		line-height: 35rpx;
		transform: translateY(-60rpx);
		background-color: #000000;
		color: #FFFFFF;
		border: 1rpx solid #FFFFFF;
		text-align: center;
		border-radius: 10rpx;
		/* margin-right: 18rpx; */
	}

	.tabk {
		width: 540rpx;
		height: 340rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;

	}

	.tabk_b {
		font-size: 32rpx;
		margin-left: 180rpx;
		transform: translateY(40rpx);
	}

	.tabk_x {
		margin-top: 10rpx;
		font-size: 32rpx;
		margin-left: 120rpx;
		transform: translateY(40rpx);
	}

	.tabk_y {
		font-size: 32rpx;
		margin-left: 180rpx;
		transform: translateY(40rpx);
	}

	.tabk_k {
		font-size: 22rpx;
		margin-left: 120rpx;
		transform: translateY(40rpx);
		color: rgba(154, 154, 154, 1);
		margin-top: 21rpx;
	}

	.bnts {
		display: flex;
		justify-content: space-between;
		margin-top: 82rpx;
	}

	.qr_s {
		width: 270rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: rgba(80, 160, 254, 1);
		font-size: 34rpx;
		color: #FFFFFF;
		border-radius: 0 0 0 10rpx;
		text-align: center;
	}

	.qx_s {
		width: 270rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: rgba(80, 187, 254, 1);
		font-size: 34rpx;
		color: #FFFFFF;
		border-radius: 0 0 10rpx 0;
		text-align: center;
	}

	.covse {
		/* position:absolute;left:0rpx;top:0rpx; */
		margin-top: -250rpx;
		background: rgba(0, 0, 0, 1);
		width: 580rpx;
		/*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
		height: 270rpx;
		filter: alpha(opacity=60);
		/*设置透明度为60%*/
		opacity: 0.5;
		/*非IE浏览器下设置透明度为60%*/
		/* display: none; */
		transform: translateY(-40rpx);
		margin-left: 85rpx;
		z-Index: 9;
		border-radius: 20rpx;
		text-align: center;
	}

	.wqann {
		position: absolute;
		top: 957rpx;
		right: 0;
		margin-right: 15rpx;
		z-index: 99;
	}
</style>
