<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
			<view class="grace-rows" style="margin-top: 10rpx;margin-bottom: 54rpx;">
				<view @tap="weishiyong_tap()" style="margin-left: 40rpx;" :class="weishiyong" >未使用</view>
				<view @tap="yishiyong_tap()" style="margin-left: 40rpx;" :class="yishiyong">已使用</view>
			</view>
			<!-- <view style="height: 84rpx;"></view> -->
			<scroll-view :style="{height: (sys.safeArea.height-48)+'px'}" :scroll-y="true" @scrolltolower="jiazai">
				<view style="margin-left: 27rpx;"  v-for="(item,index) in show_info_list">
					<image :src="item.img_url" mode="" style="width: 696rpx;height: 216rpx;"></image>
					<text class="shenyuq" v-show="type==1">剩余抵扣券：{{item.show_num}}</text>
					<text class="shenyuqr" v-show="type==2">使用抵扣券数：{{item.show_num}}</text>
					<!-- 充值按钮 -->
					<view class="chozhi" v-show="type==1" @tap="chongz(item.type,item.id,item.show_num)" :style="{background:item.show_num==0?'#DBDBDB':''}">
						<text :style="{color:item.show_num==0?'#000000':''}">充值</text>
					</view>
					<!-- 转让按钮 -->
					<view class="zhuanras" v-show="type==1" @tap="zhuanrangs(item.id,item.type,item.show_num)" :style="{background:item.show_num==0?'#DBDBDB':''}">
						<text  :style="{color:item.show_num==0?'#000000':''}">转让</text>
					</view>
				</view>
			</scroll-view>
			<!-- 抵扣券明细 -->
			<view class="mingxi" @tap="dkmingx">
				<text style="font-size: 22rpx;width: 95rpx;position: absolute;color: #FFFFFF;padding-left: 3rpx;">抵扣券明细</text>
				<image src="../../static/qunfengshiyongmingxi.png" mode="" style="width: 46rpx;height: 46rpx;margin-top: 10rpx;transform: translateX(-34rpx);"></image>
				
			</view>
			
			<!-- 充值遮罩弹窗 -->
			<graceShade background ="rgba(0,0,0,0.8)" :show="show" style="z-index: 999;">
					<image src="../../static/cztk.png" mode="" style="width: 750rpx;height: 1225rpx;"></image>
					<image src="../../static/jians.png" mode="" class="suljian" @tap="jianshu"></image>
					<text class="sulian">{{num}}</text>
					<image src="../../static/jias.png" mode="" class="suljia" @tap="jiashu"></image>
					<view class="qrcz" @tap="chongzhi">
						<text>确认充值</text>
					</view>
					<image src="../../static/guanbis.png" class="guanbi" @tap="c_tanchuang"></image>
			</graceShade>
			
		
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceShade from "../../graceUI/components/graceShade.vue";
	export default {
		data() {
			return {
				tupian:'../../static/card_coupon2_chai.png',
				show_info_list:[],
				weishiyong:'xuanzhong',
				yishiyong:'weixuanzhong',
				chai_show:false,
				zhuangrang:true,
				show : false,
				page:0,
				limit:20,
				type:1,
				num: 0,// 可使用抵扣券充值数量
				types: '', // 获取券类型 
				id: '', // 列表id
			}
		},
		onShow:function(){
			this.show_info_list=[];
			this.page=0;
			this.jiazai();
		},
		methods:{
			// shiyong_tap(id){
			// 	var vm=this;
			// 	vm.req.post(
			// 	vm.lochost+'/mytrunk/discounts/shi_yong',
			// 	{id:id},
			// 	{},
			// 	function(res){
			// 		vm.show_info_list=[];
			// 		vm.page=0;
			// 		vm.jiazai();
			// 		vm.msg_show(res.msg);
					
			// 	}
			// 	)
			// },
			// show_tanchuang(){
			// 	this.show=true;
			// },
			// 关闭充值弹框
			c_tanchuang(){
				this.show=false;
			},
			// card_chai(id){
			// 	var vm=this;
			// 	vm.req.post(
			// 	vm.lochost+'/mytrunk/discounts/chaifen',
			// 	{id:id},
			// 	{},
			// 	function(res){
			// 		vm.tupian=res.data.tupian;
			// 		vm.show_info_list=[];
			// 		vm.page=0;
			// 		vm.jiazai();
			// 		vm.show_tanchuang();
					
			// 	}
			// 	)
			// },
			// 加载数据
			jiazai(){
				this.get_info();
			},
			// 获取抵扣券包列表
			get_info(){
				var vm=this;
				vm.req.post(
				vm.lochost+'/index/index?method=get_deduct_roll',
				{
					state:vm.type,
				},
				{},
				function(res){
					console.log(res);
					var data=res.data;
					for (let i = 0; i < data.length; i++) {
						vm.show_info_list.push(data[i]) 
					}
				}
				)
			},
			// 抵扣券充值弹框
			chongz(types,id,nums){
				if (nums == 0) {
					uni.showToast({
						title: '剩余抵扣券不足',
						icon: 'none'
					})
				} else {
					this.show = true;
					this.types = types
					this.id = id
					this.jiashu()
				}
			},
			// 抵扣券转让页面跳转事件
			zhuanrangs(id,typeim,numst){
				if (numst == 0) {
					uni.showToast({
						title: '剩余抵扣券不足',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/personal_center/card_coupon_zhuanrang?type=' + typeim + '&id=' + id
					});
				}
			},
			// 充值抵扣券减
			jianshu(){
				var vm = this;
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_num_change',{
						change: 2,
						type: vm.types,
						entry: 1,
						num: vm.num
					},function(res){
						console.log(res);
						if(res.code !== 200){
							uni.showToast({
								title:res.msg,
								icon: 'none'
							})
						}else{
							vm.num = res.data.num
						}
					}
				)
			},
			// 充值抵扣券加
			jiashu(){
				var vm = this;
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_num_change',{
						change: 1,
						type: vm.types,
						entry: 1,
						num: vm.num
					},function(res){
						if(res.code !== 200){
							uni.showToast({
								title:res.msg,
								icon: 'none'
							})
						}else{
							vm.num = res.data.num
						}
						console.log(res);
						
					}
				)
			},
			// 确认充值
			chongzhi(){
				var vm = this
				vm.req.post(
					vm.lochost + '/index/index?method=deduct_roll_recharge',{
						num: vm.num,
						id: vm.id,
					},{},function(res){
						console.log(res);
						if(res.code == 200){
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							vm.show=false;
							vm.show_info_list=[];
							vm.jiazai();
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							vm.show=false;
							vm.show=false;
							vm.show_info_list=[];
							vm.jiazai();
						}
					}
				)
			},
			// 抵扣券明细页面跳转事件
			dkmingx(){
				uni.navigateTo({
				    url: '/pages/personal_center/deduction'
				});
			},
			weishiyong_tap(){
				this.weishiyong='xuanzhong';
				this.yishiyong='weixuanzhong';
				this.show_info_list=[];
				this.type=1,
				this.page=0;
				this.jiazai();
			},
			yishiyong_tap(){
				this.weishiyong='weixuanzhong';
				this.yishiyong='xuanzhong';
				this.show_info_list=[];
				this.type=2,
				this.page=0;
				this.jiazai();
			}
		},
		components:{
			gracePage,
			graceShade
		}
	}
</script>

<style>
	.xuanzhong{
		width:320rpx;height:74rpx;border:5rpx solid rgba(48,207,0,1);box-shadow:2rpx 2rpx 0px 0px rgba(10,2,4,0.29);font-size:30rpx;font-weight:500;color:rgba(48,207,0,1);text-align: center;line-height: 74rpx;
	}
	.weixuanzhong{
		width:320rpx;
		height:74rpx;
		border:2rpx solid rgba(153,153,153,1);
		font-size:30rpx;
		font-weight:500;
		color:rgba(153,153,153,1);
		text-align: center;
		line-height: 74rpx;
	}
	.shenyuq{
		color: #FFFFFF;
		position: absolute;
		z-index: 99;
		left: 335rpx;
		font-size: 18rpx;
		margin-top: 150rpx;
	}
	.shenyuqr{
		color: #FFFFFF;
		position: absolute;
		z-index: 99;
		left: 335rpx;
		font-size: 18rpx;
		margin-top: 125rpx;
	}
	.chozhi{
		display: inline-block;
		width: 93rpx;
		height: 48rpx;
		background: linear-gradient(180deg, #FA2F51, #F2561F);
		box-shadow: 0rpx 3rpx 2rpx 0rpx rgba(227, 29, 44, 0.26);
		border-radius: 6rpx;
		position: absolute;
		left:609rpx;
		margin-top: 54rpx;
		z-index: 99;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
	}
	.zhuanras{
		display: inline-block;
		width: 93rpx;
		height: 48rpx;
		background: linear-gradient(180deg, #FA2F51, #F2561F);
		box-shadow: 0rpx 3rpx 2rpx 0rpx rgba(227, 29, 44, 0.26);
		border-radius: 6rpx;
		position: absolute;
		left:609rpx;
		margin-top: 124rpx;
		z-index: 99;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
	}
	.sulian{
		font-size: 29rpx;
		position: absolute;
		top: 790rpx;
		left: 471rpx;
		color: #FFFFFF;
	}
	.suljian{
		width: 43rpx;
		height: 43rpx;
		position: absolute;
		top: 790rpx;
		left: 373rpx;
	}
	.suljia{
		width: 43rpx;
		height: 43rpx;
		position: absolute;
		top: 790rpx;
		left: 534rpx;
	}
	.qrcz{
		width: 500rpx;
		height: 98rpx;
		background: #FFD957;
		box-shadow: 0rpx 8rpx 0rpx 0rpx #EB9C11;
		border-radius: 49rpx;
		position: absolute;
		top: 880rpx;
		font-size: 48rpx;
		text-align: center;
		line-height: 95rpx;
		color: #F53610;
	}
	.guanbi{
		width: 70rpx;
		height: 70rpx;
		position: absolute;
		top: 1120rpx;
	}
	.mingxi{
		width: 130rpx;
		height: 65rpx;
		background: #FB1217;
		box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(251, 18, 23, 0.5);
		border-radius: 33rpx 0rpx 0rpx 33rpx;
		z-index: 999;
		position: absolute;
		top: 751rpx;
		left: 620rpx;
		text-align: center;
	}
</style>


<!-- .grace-flex // 声明 flex
.grace-rows // flex 横向
.grace-columns  //flex 竖向
.grace-wrap //flex 自动换行
.grace-nowrap //flex 横向不换行
.grace-space-between //flex 横向两端对齐
.grace-flex-end //flex 横向右对齐
.grace-flex-center  //flex 横向居中
.grace-flex-top  //flex 垂直顶端对齐
.grace-flex-vcenter //flex 垂直居中对齐
.grace-flex-bottom //flex 垂直底部对齐
.grace-no-scale //元素不缩放 -->
