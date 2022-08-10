<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
			<view v-for="(item2,index1) in keyong_list" :key="index1" style="margin: 10rpx auto; position: relative; background-image: url(../../static/youhuiquan.png);width: 713rpx;height: 248rpx;background-size: contain; background-repeat: no-repeat;">
				<view style="position: absolute;top: 10rpx;left: 310rpx; font-size:18rpx;font-weight:bold;color:rgba(229,0,108,1);">有效期：{{ item2.end_time }}</view>
				<view  style="position: absolute;left: 53rpx;top: 103rpx; width:489rpx;height:70rpx;background:rgba(223,8,22,0.21);border-radius:35rpx;">
					<view class="grace-rows" style="position: relative;top: 10rpx;">
						<view class="grace-rows">
							<view  v-for="dex of item2.yiyong/10" :key="dex" style="margin-left: 10rpx; width: 54rpx;height: 50rpx;background-size: contain;background-image: url(../../static/allowance2_bunengshiyong.png);" ></view>
						</view>
						<view class="grace-rows">
							<view @tap="xuanze(index,index1,item2.id)" v-for="index of item2.progress_bar_num/10" :key="index" :class="xuanzhongliebiao.indexOf(index)!=-1 && index1===quan_index?'xuanzhong':'weixuan'" style="margin-left: 10rpx; width: 54rpx;height: 50rpx;background-size: contain;"></view>
						</view>
					</view>
				</view>
				<view style="font-size:18rpx;font-weight:bold;color:rgba(229,0,108,1);position: absolute;top: 203rpx;left: 125rpx;">使用条件：{{ item2.tiaojian }}</view>
				<image @tap="tap_shiyong(index1)" :src="index1===quan_index? '../../static/allowance2_yixuan.png':'../../static/allowance2_shiyong.png'" style="position: absolute;top: 120rpx;left: 603rpx;width: 61rpx;height: 62rpx;"></image>
				<!-- <view style="position: absolute;top: 130rpx;left: 603rpx;width: 61rpx;height: 62rpx;background-size: contain;background-repeat: no-repeat;" :style="{backgroundImage:index1===quan_index? 'url(../../static/allowance2_yixuan.png)':'url(../../static/allowance2_shiyong.png'}"></view> -->
				<view style="font-size:16rpx;font-weight:bold;color:rgba(255,255,255,1);position: absolute;top: 180rpx;left: 560rpx;">编号：{{ item2.my_num }}</view>
			</view>
			<view style="height: 100rpx;"></view>
		
		<button @tap="queren()" style="position: fixed;bottom: 0; width:750rpx;height:100rpx;background:rgba(218,28,30,1);font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);line-height: 100rpx;">确认</button>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				xuanzhongliebiao:[],
				quan_index:0,
				max:0,
				val:0,//选择的金额
				quan_id:0,//券的id
				pattern:'',
				card_id:'',
				bill_money:'',
				keyong_list:[],
				bukeyong_list:[],
				
			}
		},
		onLoad:function(opt){
			console.log(typeof ((70 - parseInt('70'))/10), ((70 - parseInt('70'))/10));
			var vm=this
			this.pattern=opt.pattern,
			this.card_id=opt.card_id,
			console.log(opt);
			this.bill_money=opt.bill_money;
			this.req.post(
			this.lochost+'/mytrunk/repaymentplan/get_deduction',
			{bill_money:this.bill_money,
			card_id:this.card_id,
			pattern:this.pattern,
			},
			{},
			function(res){
				vm.max=res.data.dangci.max;
				console.log(vm.max/10);
				for (let i = 1; i <= (vm.max/10); i++) {
					console.log(i);
					if((vm.xuanzhongliebiao.length)*10<=vm.max){
						
						vm.xuanzhongliebiao.push(i);
					}
				}
				vm.quan=res.data.quan;
				for (let j = 0; j <vm.quan.length; j++) {
					if(vm.quan[j].c_state==='可用'){
						vm.keyong_list.push(vm.quan[j])
					}else if(vm.quan[j].c_state==='不可用'){
						vm.bukeyong_list.push(vm.quan[j])
					}
				}
				vm.quan_id=vm.keyong_list[0].id;
			}
			)
		},
		methods:{
			tap_shiyong(index){
				if(this.quan_index===index){
					this.quan_index=null;
					this.xuanzhongliebiao=[];
				}else{
					this.quan_index=index;
					this.xuanzhongliebiao=[];
				}
				
			},
			xuanze(val,index,quan_id){
				if(index!==this.quan_index){
				this.xuanzhongliebiao=[];
				}
				this.quan_index=index;
				var index = this.xuanzhongliebiao.indexOf(val);
				if (index > -1) {
					this.xuanzhongliebiao.splice(index, 1);
				}else{
					if(this.xuanzhongliebiao.length<this.max/10){
						this.xuanzhongliebiao.push(val);
						this.quan_id=quan_id;
					}else{
						this.msg_show('本次计划只能优惠'+this.max+'元')
					}
				}	
			},
			queren(){
				var vm=this;
				vm.val=(vm.xuanzhongliebiao.length)*10;
				vm.req.post(
				vm.lochost+'/mytrunk/repaymentplan/confim_choice',
				{
					coupon:vm.val,
					coupon_id:vm.quan_id
				},
				{},
				function(res){
					vm.msg_show(res.msg);
					vm.Goto('/pages/preview_plan/preview_plan');
				}
				)
				
			},
		},
		components:{
			gracePage
		}
	}
</script>

<style>
	.weixuan{
		background-image: url(../../static/allowance2_weixuanzhong.png);
	}
	.xuanzhong{
		background-image: url(../../static/allowance2_xuanzhong.png);
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
