<template>
	<!-- 今日新增 -->
	<view class="New_today">
		<!-- 日期 -->
		<view class="dan_date">
			<text>{{date}}</text>
			<!-- <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{date}}</view>
			</picker> -->
		</view>
		<!-- 往期新增按钮 -->
		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="day">
			<!-- <view class="uni-input">{{date}}</view> -->
			<view class="wqann">
				<image :style="'left:'+moveX+'px;top:'+moveY+'px'" src="../../static2/wangqi.png" @touchstart="drag_start"
				 @touchmove.prevent="drag_hmove" mode="aspectFit" style="width: 165rpx;height: 165rpx;"></image>
			</view>
		</picker>

		<!-- 新增列表 -->
		<scroll-view class="grace-scroll-y" scroll-y="true" :style="{height:height}">
			<view class="yhs" v-for="(item,index) in add_user" :key="index">
				<view class="leves">
					<view style="font-size: 30rpx;color: rgba(68, 68, 68, 1);">{{item.user.name}}</view>
					<view style="font-size: 22rpx;color:RGBA(110, 110, 110, 1);margin: 0 55rpx;">{{item.user.level_name}}</view>
				</view>
				<view class="leves">
					<view style="font-size: 22rpx;color: rgba(86, 86, 86, 1);">{{item.user.tel}}</view>
					<view style="font-size: 22rpx;color:RGBA(110, 110, 110, 1);margin: 0 55rpx;">{{item.user.date}}</view>
				</view>
				<view class="biaoji">
					<image @tap="tasg(item.user.uid,item.user.tag,index)" v-if="item.user.tag" src="../../static2/biaoji.png" mode=""></image>
					<image @tap="tasg(item.user.uid,item.user.tag,index)" v-else src="../../static2/weibiaoji.png" mode=""></image>
					<text class="biaojis" v-if="item.user.tag" style="color: rgba(88, 208, 106, 1);">标记</text>
					<text class="biaojis" v-else style="color: rgba(153, 153, 153, 1);">标记</text>
				</view>
				<!-- 亲推 -->
				<view class="inseli_2">
					<text>{{item.str[0]}}</text>
					<text>{{item.str[1]}}</text>
				</view>
				<view class="bohao" @tap="baohao(index)">
					<image src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;margin-right: 11rpx;"></image>
					<text class="yijian">一 键 拨 号</text>
				</view>

			</view>
			<view style="color: rgba(68, 68, 68, 1);text-align: center;margin-top: 20rpx;margin-bottom: 20rpx;">没有更多了</view>
		</scroll-view>

		<!-- 拨号弹框 -->
		<uni-popup ref="popup" type="center">
			<view class="tabkt" v-show="xians_2">
				<view class="tabk_1" style="margin-bottom: 20rpx;">
					<text style="font-size: 28rpx;line-height: 70rpx;">选择拨打号码</text>
					<image @tap="close" src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(130rpx,10rpx);"></image>
				</view>
				<view class="tabk_2" v-for="(item1,index1) in call" :key="index1">
					<view style="font-size: 24rpx;transform: translateY(15rpx);">{{item1.show_str}}</view>
					<view style="transform: translateY(30rpx);">{{item1.tel}}</view>
					<image src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(220rpx,-30rpx);"
					 @tap="yhhaoma(item1.tel)"></image>
				</view>
			</view>
			<view class="tabk" v-show="xians">
				<view class="tabk_1" style="margin-bottom: 20rpx;">
					<text style="font-size: 28rpx;line-height: 70rpx;">选择拨打号码</text>
					<image @tap="close" src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(130rpx,10rpx);"></image>
				</view>
				<view class="tabk_2" v-for="(item1,index1) in call" :key="index1">
					<view style="font-size: 24rpx;transform: translateY(15rpx);">{{item1.show_str}}</view>
					<view style="transform: translateY(30rpx);">{{item1.tel}}</view>
					<image src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(220rpx,-30rpx);"
					 @tap="yhhaoma(item1.tel)"></image>
				</view>
			</view>
			<view class="tabks" v-show="xians_1">
				<view class="tabk_1" style="margin-bottom: 20rpx;">
					<text style="font-size: 28rpx;line-height: 70rpx;">选择拨打号码</text>
					<image @tap="close" src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(130rpx,10rpx);"></image>
				</view>
				<view class="tabk_2" v-for="(item1,index1) in call" :key="index1">
					<view style="font-size: 24rpx;transform: translateY(15rpx);">{{item1.show_str}}</view>
					<view style="transform: translateY(30rpx);">{{item1.tel}}</view>
					<image src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(220rpx,-30rpx);"
					 @tap="yhhaoma(item1.tel)"></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				page: 1,
				// date: new Date().toISOString().slice(5, 10),
				date: currentDate,

				add_user: [],
				str: '',
				call: [],
				tag: 0,
				xians: false,
				xians_1: false,
				xians_2: false,
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
			this.today()

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
			// startDate:{
			//              type:'start',
			//              default:"1920/01/01"
			//          },
			//          endDate:{
			//              type:'end',
			//              default:"2099/01/01"
			//          },
		},
		methods: {
			// 往期新增按钮拖拽功能
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
			// 获取新增用户列表
			today() {
				console.log(this.date);
				var vm = this
				// vm.page = vm.page + 1
				vm.req.post(
					vm.lochost + '/index/index?method=today_add_user_list', {
						page: vm.page,
						size: 10,
						date: vm.date
					}, {},
					function(res) {
						console.log(res.data.data);
						var user_list = res.data.data
						for (let i = 0; i < user_list.length; i++) {
							vm.add_user.push(user_list[i])
							var strd = user_list[i].str
							vm.str = strd.toString()
							vm.call = user_list[i].call

						}
					}
				)
				// this.today()
			},
			// 日期选择器触发change事件
			bindDateChange: function(e) {
				this.date = e.target.value
				this.add_user = []
				this.today()
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
				return `${year}-${month}-${day}`;
			},
			// 标记
			tasg(id, bj, index) {
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=click_tag', {
						uid: id,
						type: 1,
						tag: bj
					}, {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							var awaits = vm.add_user
							vm.req.each(awaits, function(i, v) {
								if (index == i) {
									if (v.user.tag == res.data.tag) {
										v.user.tag = res.data.tag;
									} else {
										v.user.tag = res.data.tag;
									}
									awaits[i] = v;
								}
							})
							vm.add_user = awaits
						}

					}
				)
			},
			// 拨号弹框
			baohao(index) {
				console.log(index);
				var awaits = this.add_user;
				this.call = awaits[index].call;
				console.log(awaits[index].call)
				if (this.call.length == 2) {
					this.xians = true
					this.xians_1 = false
					this.xians_2 = false
				} else if (this.call.length == 3) {
					this.xians = false
					this.xians_1 = true
					this.xians_2 = false
				} else {
					this.xians = false
					this.xians_1 = false
					this.xians_2 = true
				}
				this.$refs.popup.open()
			},
			// 隐藏拨号弹框
			close() {
				this.$refs.popup.close()
			},
			// 拨打用户号码
			yhhaoma(phone) {
				console.log(phone);
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			}
		}
	}
</script>

<style>
	.dan_date {
		width: 750rpx;
		height: 60rpx;
		background-color: #FFFFFF;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 1);
		line-height: 60rpx;
		padding-left: 24rpx;
	}

	.yhs {
		width: 750rpx;
		height: 220rpx;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
		margin-top: 10rpx;
	}

	.leves {
		display: flex;
		justify-content: space-between;
		transform: translateY(15rpx);
		margin: 0 24rpx;
	}

	.biaoji image {
		position: absolute;
		/* top: 120rpx; */
		left: 690rpx;
		width: 40rpx;
		height: 40rpx;
		margin-top: -60rpx;
	}

	.biaojis {
		position: absolute;
		left: 690rpx;
		margin-top: -15rpx;
		font-size: 22rpx;
	}

	.str {
		font-size: 5rpx;
		margin-top: 29rpx;
		margin-left: 24rpx;
	}

	.inseli_2 {
		display: flex;
		justify-content: space-between;
		margin: 0 25rpx;
		transform: translateY(50rpx);
		font-size: 24rpx;
	}

	.bohao {
		margin-top: 60rpx;
		text-align: center;
	}

	.yijian {
		font-size: 35rpx;
		color: rgba(80, 160, 254, 1);
	}

	.tabk {
		width: 540rpx;
		height: 351rpx;
		background-color: rgba(243, 243, 243, 1);
		border-radius: 16rpx;
	}

	.tabks {
		width: 540rpx;
		height: 481rpx;
		background-color: rgba(243, 243, 243, 1);
		border-radius: 16rpx;
	}

	.tabkt {
		width: 540rpx;
		height: 221rpx;
		background-color: rgba(243, 243, 243, 1);
		border-radius: 16rpx;
	}

	.tabk_1 {
		width: 540rpx;
		height: 70rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		text-align: center;
		/* transform: translateY(10rpx) */
	}

	.tabk_2 {
		margin-top: 23rpx;
		width: 540rpx;
		height: 110rpx;
		background-color: #FFFFFF;
		text-align: center;
		/* transform: translateY(-60rpx); */
	}

	.tabk_3 {
		margin-top: 20rpx;
		width: 540rpx;
		height: 120rpx;
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 0 0 16rpx 16rpx;
	}

	.wqann {
		position: absolute;
		top: 857rpx;
		right: 0;
		margin-right: 15rpx;
		z-index: 99;
	}
</style>
