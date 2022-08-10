<template>
	<!-- 修改信息 -->
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">持卡人：</text>
				<view class="grace-columns">
					<input v-model="bc_account_name" style="width:530rpx;text-align: center;" placeholder="安**" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: -100rpx;"/>
					<!-- <view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view> -->
				</view>
			</view>
		</view>
		
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">卡号：</text>
				<view class="grace-columns" style="margin-left: 20rpx;">
					<input v-model="bc_bank_number" style="width:530rpx;text-align: center;" placeholder="5466221563322222" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);"/>
					<!-- <view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view> -->
				</view>
			</view>
		</view>
		
		<view @tap="show = true" class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
			<text style="margin-left: 60rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">有效期：</text>
			<text style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: 135rpx ;">2018-12</text>
			<!-- {{ date.length>0?'已选择'+date.length+'天':'请选择还款日期' }} -->
			<image src="../../static/jiantou.png" style="width: 14rpx;height: 24rpx;margin-left: 185rpx;"></image>
		</view>
		
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">CVN2：</text>
				<view class="grace-columns">
					<input v-model="bc_cvn2" style="width:530rpx;text-align: center;" placeholder="456" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: -90rpx;"/>
					<!-- <view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view> -->
				</view>
			</view>
		</view>
		<view @tap="toggleTab('账单日')" class="grace-rows grace-flex-vcenter" style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);margin-top: 2rpx;">
			<text style="margin-left: 60rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">账单日：</text>
			<text style="text-align: center;width: 500rpx; font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);line-height:60px;margin-left: -80rpx;">16日</text>
			<image src="../../static/jiantou.png" style=" width:13rpx;height:24rpx;"></image>
			<!-- <input type="number" v-model="bc_bill" @input="yanzheng" placeholder="请输入账单日" style="margin-left: 60rpx;width: 500rpx"/> -->
		</view>
		<view @tap="toggleTab('还款日')" class="grace-rows grace-flex-vcenter" style="margin: 3rpx 0; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<text style="margin-left: 60rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">还款日：</text>
			<text style="text-align: center;width: 500rpx; font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);line-height:60px;margin-left: -80rpx;">16日</text>
			<image src="../../static/jiantou.png" style="width:13rpx;height:24rpx;"></image>
			<!-- <input type="number" v-model="bc_repayment" @input="yanzheng" placeholder="请输入还款日" style="margin-left: 60rpx;width: 500rpx"/> -->
		</view>
		
		
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 60rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">预留手机：</text>
				<view class="grace-columns">
					<input v-model="bc_mobile" style="width:530rpx;text-align: center;" placeholder="18645725783" placeholder-style="font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: -59rpx;"/>
					<!-- <view style="width:530rpx;height:1rpx;background:rgba(153,153,153,1);"></view> -->
				</view>
			</view>
		</view>
		<button @tap="submit" type="primary" style="margin-top: 200rpx; width:500rpx;height:90rpx;background:rgba(22,120,255,1);border-radius:6rpx;font-size: 28rpx;line-height: 90rpx;">确认</button>
		<w-picker
			mode="selector" 
			defaultVal="每月1日"
			@confirm="onConfirm" 
			ref="selector" 
			themeColor="#f00"
			:selectList="selectList"
		></w-picker>
	
		
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				bc_id:'',
				bc_account_name:'',
				bc_bank_number:'',
				bc_mobile:'',
				bc_cvn2:'',
				bc_effective:'',
				bc_bill:'',
				bc_repayment:'',
				M_jujiao:false,
				Y_jujiao:false,
				youxiaoqi_M:'',
				youxiaoqi_Y:'',
				dianji_tpye:'',//用来判断点击的是账单日还是还款日
				bc_repayment_name:'请选择还款日',//还款日名字
				bc_bill_name:'请选择账单日',//账单日名字
				selectList:[{label:"每月1日",value:1},{label:"每月2日",value:2},{label:"每月3日",value:3},{label:"每月4日",value:4},{label:"每月5日",value:5},{label:"每月6日",value:6},{label:"每月7日",value:7},{label:"每月8日",value:8},{label:"每月9日",value:9},{label:"每月10日",value:10},{label:"每月11日",value:11},
				{label:"每月12日",value:12},{label:"每月13日",value:13},{label:"每月14日",value:14},{label:"每月15日",value:15},{label:"每月16日",value:16},{label:"每月17日",value:17},{label:"每月18日",value:18},{label:"每月19日",value:19},{label:"每月20日",value:20},{label:"每月21日",value:21},
				{label:"每月22日",value:22},{label:"每月23日",value:23},{label:"每月24日",value:24},{label:"每月25日",value:25},{label:"每月26日",value:26},{label:"每月27日",value:27},{label:"每月28日",value:28},{label:"每月29日",value:29},{label:"每月30日",value:30},{label:"每月31日",value:31}],
			}
		},
		onLoad:function(opt){
			this.bc_id=opt.bc_id;
			this.bc_account_name=opt.bc_account_name;
			this.bc_bank_number=opt.bc_bank_number;
			this.bc_mobile=opt.bc_mobile;
			this.bc_cvn2=opt.bc_cvn2;
			this.youxiaoqi_M=opt.bc_effective.substring(0,2);
			this.youxiaoqi_Y=opt.bc_effective.substring(3,5);
			this.bc_bill=opt.bc_bill;
			this.bc_repayment=opt.bc_repayment;
			this.bc_bill_name='每月'+this.bc_bill+'日';
			this.bc_repayment_name='每月'+this.bc_repayment+'日';
		},
		methods:{
			submit(){
				if(this.bc_id===''||this.bc_account_name===''||this.bc_bank_number===''||this.bc_mobile===''||this.bc_cvn2===''||this.youxiaoqi_M===''||this.youxiaoqi_Y===''||this.bc_bill===''||this.bc_repayment===''){
					this.msg_show('请将信息填写完整');
				}else{
					var vm=this;
					this.req.post(
					this.lochost+'/mytrunk/cardmanagement/update_credit',
					{
						bc_id:this.bc_id,
						bc_account_name:this.bc_account_name,
						bc_bank_number:this.bc_bank_number,
						bc_mobile:this.bc_mobile,
						bc_cvn2:this.bc_cvn2,
						bc_effective:this.youxiaoqi_M+'/'+this.youxiaoqi_Y,
						bc_bill:this.bc_bill,
						bc_repayment:this.bc_repayment,
					},
					{},
					function(res){
						vm.msg_show(res.msg);
						setTimeout(function(){
							uni.navigateBack({
							    delta: 1
							});
						},500);
					}
					)
				}
			},
			toggleTab(dianji_tpye){
				this.dianji_tpye=dianji_tpye;
				this.$refs['selector'].show();
			},
			onConfirm(val){
				if(this.dianji_tpye==='账单日'){
					this.bc_bill_name=val.checkArr.label;
					this.bc_bill=val.checkArr.value;
				}else if(this.dianji_tpye==='还款日'){
					this.bc_repayment_name=val.checkArr.label;
					this.bc_repayment=val.checkArr.value;
				}
			},
			youxiaoqi_js_M(val){
				var vale=val.target.value;
				if(vale.length===2){
					this.M_jujiao=false;
					this.Y_jujiao=true;
				}
			},
			youxiaoqi_js_Y(val){
				var vale=val.target.value;
				if(vale.length===0 && this.Y_len===1){
					this.Y_jujiao=false;
					this.M_jujiao=true;
				}
				this.Y_len=vale.length;
			},
	
		},
		components:{
			gracePage,
			wPicker
		}
	}
</script>

<style>
</style>
