<template>
	<!-- 未继续使用 -->
	<view class="continse">
		<scroll-view class="grace-scroll-y" scroll-y="true" :style="{height:height}" @scrolltolower="continued()">
		<view class="inseli" v-for="(item,index) in continues" :key="index">
			<view class="inseli_1">
				<view style="font-size: 30rpx;color: rgba(68, 68, 68, 1);">{{item.user.name}}</view>
				<view style="font-size: 22rpx;color:RGBA(110, 110, 110, 1);margin: 0 55rpx;">{{item.user.level_name}}</view>
			</view>
			<view class="inseli_1">
				<view style="font-size: 22rpx;color: rgba(86, 86, 86, 1);">{{item.user.tel}}</view>
				<view style="font-size: 22rpx;color:RGBA(110, 110, 110, 1);margin: 0 55rpx;">{{item.user.date}}</view>
			</view>
			<!-- 标记 -->
			<view class="biaoji">
				<image @tap="tasg(item.user.uid,item.user.tag,index)" v-if="item.user.tag" src="../../static2/biaoji.png" mode=""></image>
				<image @tap="tasg(item.user.uid,item.user.tag,index)" v-else src="../../static2/weibiaoji.png" mode=""></image>
				<text class="biaojis" v-if="item.user.tag" style="color: rgba(88, 208, 106, 1);">标记</text>
				<text class="biaojis" v-else style="color: rgba(52, 52, 52, 1);">标记</text>
			</view>

			<view class="inseli_2">
				<text>{{item.str[0]}}</text>
				<text>{{item.str[1]}}</text>
			</view>
			<!-- 拨号 -->
			<view class="bohao" @tap="baohao(index)">
				<image src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;margin-right: 11rpx;"></image>
				<text class="yijian">一 键 拨 号</text>
			</view>
		</view>
		</scroll-view>
		<!-- 拨号弹框 -->
		<uni-popup ref="popup" type="center">
			<view class="tabkt" v-show="xians_2">
				<view class="tabk_1" style="margin-bottom: 20rpx;">
					<text style="font-size: 28rpx;line-height: 70rpx;">选择拨打号码</text>
					<image @tap="close" src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(130rpx,10rpx);"></image>
				</view>
					<view class="tabk_2" v-for="(item1,index1) in call" :key="index1" >
					<view style="font-size: 24rpx;transform: translateY(15rpx);">{{item1.show_str}}</view>
					<view style="transform: translateY(30rpx);">{{item1.tel}}</view>
					<image  src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(220rpx,-30rpx);" @tap="yhhaoma(item1.tel)"></image>
				</view>
			</view>
			<view class="tabk" v-show="xians">
				<view class="tabk_1" style="margin-bottom: 20rpx;">
					<text style="font-size: 28rpx;line-height: 70rpx;">选择拨打号码</text>
					<image @tap="close" src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(130rpx,10rpx);"></image>
				</view>
					<view class="tabk_2" v-for="(item1,index1) in call" :key="index1" >
					<view style="font-size: 24rpx;transform: translateY(15rpx);">{{item1.show_str}}</view>
					<view style="transform: translateY(30rpx);">{{item1.tel}}</view>
					<image  src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(220rpx,-30rpx);" @tap="yhhaoma(item1.tel)"></image>
				</view>
			</view>
			<view class="tabks" v-show="xians_1">
				<view class="tabk_1" style="margin-bottom: 20rpx;">
					<text style="font-size: 28rpx;line-height: 70rpx;">选择拨打号码</text>
					<image @tap="close" src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(130rpx,10rpx);"></image>
				</view>
					<view class="tabk_2" v-for="(item1,index1) in call" :key="index1" >
					<view style="font-size: 24rpx;transform: translateY(15rpx);">{{item1.show_str}}</view>
					<view style="transform: translateY(30rpx);">{{item1.tel}}</view>
					<image  src="../../static2/bohao.png" mode="" style="width: 40rpx;height: 40rpx;transform: translate(220rpx,-30rpx);" @tap="yhhaoma(item1.tel)"></image>
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
				continues: [],
				call: [],
				xians: false,
				xians_1: false,
				xians_2: false,
			}
		},
		onShow() {
			var sysinfo = uni.getSystemInfoSync();
			this.height = (sysinfo.safeArea.height - 20) + 'px';
			this.continued()
		},
		methods: {
			continued() {
				var vm = this
				vm.page = vm.page + 1
				vm.req.post(
					vm.lochost + '/index/index?method=not_continue_use_user_list', {
						page: vm.page,
						size: 10
					}, {},
					function(res) {
						console.log(res.data.data);
						var user_list = res.data.data
						for (let i = 0; i < user_list.length; i++) {
							vm.continues.push(user_list[i])
						}
					}
				)
			},
			tasg(id, bj, index) {
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=click_tag', {
						uid: id,
						type: 2,
						tag: bj
					}, {},
					function(res) {
						console.log(res);
						if (res.code == 200) {
							var continues = vm.continues
							vm.req.each(continues, function(i, v) {
								if (index == i) {
									if (v.user.tag == res.data.tag) {
										v.user.tag = res.data.tag;
									} else {
										v.user.tag = res.data.tag;
									}
									continues[i] = v;
								}
							})
							vm.continues = continues
						}

					}
				)

			},
			// 拨号弹框
			baohao(index){
				// console.log(index);
				var continues = this.continues;
				this.call = continues[index].call;
				console.log(continues[index].call)
				if(this.call.length ==2){
					this.xians = true
					this.xians_1 = false
					this.xians_2 = false
				}else if(this.call.length ==3){
					this.xians = false
					this.xians_1 = true
					this.xians_2 = false
				}else{
					this.xians = false
					this.xians_1 = false
					this.xians_2 = true
				}
				this.$refs.popup.open()
			},
			// 隐藏拨号弹框
			close(){
				this.$refs.popup.close()
			},
			// 拨打用户号码
			yhhaoma(phone){
				console.log(phone);
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			}
		},
		components: {
			uniPopup
		}
	}
</script>

<style>
	.inseli {
		width: 750rpx;
		height: 220rpx;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
	}

	.inseli_1 {
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

	.inseli_2 {
		display: flex;
		justify-content: space-between;
		margin: 0 25rpx;
		transform: translateY(50rpx);
		font-size: 24rpx;
	}
	.bohao{
		margin-top: 60rpx;
		text-align: center;
	}
	.yijian{
		font-size: 35rpx;
		color: rgba(80, 160, 254, 1);
	}
	.tabk{
		width: 540rpx;
		height:351rpx;
		background-color: rgba(243, 243, 243, 1);
		border-radius: 16rpx;
	}
	.tabks{
		width: 540rpx;
		height:481rpx;
		background-color: rgba(243, 243, 243, 1);
		border-radius: 16rpx;
	}
	.tabkt{
		width: 540rpx;
		height:221rpx;
		background-color: rgba(243, 243, 243, 1);
		border-radius: 16rpx;
	}
	.tabk_1{
		width: 540rpx;
		height: 70rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		text-align: center;
		/* transform: translateY(10rpx) */
	}
	.tabk_2{
		margin-top:23rpx;
		width: 540rpx;
		height: 110rpx;
		background-color: #FFFFFF;
		text-align: center;
		/* transform: translateY(-60rpx); */
	}
</style>
