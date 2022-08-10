<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
			<view @tap="showDialog3" style="margin-bottom: 20rpx; width:750rpx;height:360rpx;background-image: url(../../static/allowance1_banner.png);background-size: contain;"></view>
<!-- 			<view class="grace-rows" style="position: relative; width:707rpx;height:120rpx;background:rgba(255,255,255,1);margin: 20rpx auto;">
				<view class="grace-flex grace-columns">
					<view style="position: relative;top: 20rpx;">
						<text style="margin-left: 20rpx; font-size:24rpx;font-weight:400;color:rgba(61,61,61,1);">账单金额：{{ zhangdan }}元</text>
						<text style="margin-left: 20rpx;font-size:24rpx;font-weight:400;color:rgba(61,61,61,1);">手续费：{{ shouxu }}元</text>
					</view>
					<text style="position: relative;top:30rpx;left: 20rpx; font-size:30rpx;font-weight:bold;color:rgba(61,61,61,1);">可使用优惠券({{ max }}元)</text>
				</view>
				<view @tap="Goto('/pages/allowance/allowance2?bill_money='+bill_money+'&card_id='+card_id+'&pattern='+pattern)" style="position: absolute;top: 35rpx;left: 550rpx; width:140rpx;height:50rpx;background:linear-gradient(270deg,rgba(252,209,36,1) 0%,rgba(252,121,36,1) 100%);border-radius:25rpx;font-size:24rpx;font-weight:bold;color:rgba(255,254,254,1);text-align: center;line-height: 50rpx;">立即使用</view>
			</view> -->
			<view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">计划截止日期：{{ end_time }}</text> 
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">还款总金额：{{ bill_money }}元</text> 
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">启动金额：{{ rp_price }}元</text> 
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">还款笔数：{{ num }}笔</text> 
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">周转金手续费：{{ revolving_fund }}元</text> 
				</view>
				<view class="grace-space-between" style="padding: 0 20rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);margin-top: 2rpx;">
					<view class="grace-columns" style="position: relative;top: 20rpx;">
						<text style="font-size:32rpx;font-weight:bold;color:rgba(51,51,51,1);">还款手续费：{{ poundage }}元</text>
						<text style="font-size:32rpx;font-weight:bold;color:rgba(218,28,30,1);position: relative;right: 15rpx;top: 5rpx;">（可使用抵用券：{{ max }}元）</text>
					</view>
					<button @tap="quan_you===0?showDialog3():Goto('/pages/allowance/allowance2?bill_money='+bill_money+'&card_id='+card_id+'&pattern='+pattern)" style="position: relative;top: 30rpx; line-height: 60rpx; width:180rpx;height:60rpx;background:linear-gradient(270deg,rgba(252,209,36,1) 0%,rgba(252,121,36,1) 100%);border-radius:25rpx;font-size:30rpx;font-weight:bold;color:rgba(255,254,254,1);">立即使用</button>
				</view>
			</view>
			
			<view @tap="Goto('/pages/preview_plan/preview_plan')" style="margin: 0 auto; position: relative;top: 260rpx; width:500rpx;height:90rpx;background:rgba(218,28,30,1);box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);text-align: center;line-height: 90rpx;">下一步</view>
			
			<!-- 底部通知 -->
			<graceBottomDialog :show="show3" v-on:closeDialog="closeDialog3">
				<view slot="content">
					<view style="width:750rpx;height:1030rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;">
						<view style="position: relative;bottom: 5rpx; width:750rpx;height:470rpx;background:rgba(255,234,169,1);border-radius:20rpx 20rpx 0px 0px;">
							<view style="position: relative;top: 20rpx;">
								<image src="../../static/index_tejia.png" style="width: 422rpx;height: 50rpx;margin-left: 164rpx;"></image>
								<image @tap="closeDialog3()" src="../../static/quxiao_yuan.png" style="margin-left: 84rpx; width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="grace-space-between grace-wrap" style="padding:0 30rpx;">
								<image v-for="(item,index) in tejia" :key="index" @tap="is_vip===0?showDialog2(item.id,item.txt):Goto('/pages/buy_coupons/buy_coupons?id='+item.id)" :src="item.tubiao" style="margin-top: 30rpx; width: 332rpx;height: 438rpx;"></image>
							</view>
							
						</view>
					</view>
				</view>
			</graceBottomDialog>
		
		</view>
	</gracePage>
</template>

<script>
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				tanchuang_text:'',
				quan_id:0,
				is_vip:0,
				tejia:[],
				card_id:'',
				pattern:'',
				show3:false,
				max:0,
				bill_money: "0",//还款总金额
				zhangdan:'0',//还款总金额
				rp_price: "0",//启动资金
				end_time: "2020-01-1",//截止日期
				num: "0",//还款笔数
				revolving_fund: "0",//周转金手续费
				poundage: 0,//手续费
				quan_you:0,
			}
		},
		onLoad:function(opt){
			this.bill_money=opt.bill_money;
			this.card_id=opt.card_id;
			this.pattern=opt.pattern;
			this.get_data();
			this.tanhcuang_img();
		},
		methods:{
			tanhcuang_img(){
				var vm=this;
				vm.req.post(
				vm.lochost+'/mytrunk/index/getvipandtequan2',
				{},
				{},
				function(res){
					vm.tejia=res.data.data;
					vm.is_vip=res.data.is_vip;
				}
				)
			},
			showDialog2 : function(id,text){
				this.tanchuang_text=text;
				this.quan_id=id;
				this.show2 = true;
			},
			closeDialog2 : function(){
				this.show2 = false;
			},
			confirm2(){
				this.closeDialog2();
				this.Goto('/pages/rise_vip/rise_vip');
			},
			closefirm2(){
				this.closeDialog2();
				this.Goto('/pages/buy_coupons/buy_coupons?id='+this.quan_id);
			},
			get_data(){
				var vm=this;
				vm.req.post(
				vm.lochost+'/mytrunk/repaymentplan/getdikouquan',
				{bill_money:vm.bill_money,
				card_id:vm.card_id,
				pattern:vm.pattern,
				},
				{},
				function(res){
				vm.max=res.data.dangci.max;
				vm.poundage=res.data.dingdan.poundage;
				vm.zhangdan=res.data.zhangdan;
				vm.rp_price=res.data.dingdan.rp_price;
				vm.num=res.data.dingdan.num;
				vm.end_time=res.data.dingdan.end_time;
				vm.revolving_fund=res.data.dingdan.revolving_fund;
				vm.quan_you=res.data.you;
				}
				)
			},
			showDialog3 : function(){
				this.show3 = true;
			},
			closeDialog3 : function(){
				this.show3 = false;
			},
		},
		components:{
			gracePage,
			graceBottomDialog,
			graceDialog
		}
	}
</script>

<style>
	.content2{padding:30rpx; line-height:50rpx;}
	.grace-dialog-buttons{width:700rpx; line-height:88rpx; height:88rpx; display:block; overflow:hidden; text-align:center; font-size:26rpx; color:#999999;}
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
