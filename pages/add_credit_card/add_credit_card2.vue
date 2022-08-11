<template>
	<gracePage :customHeader="false">
		<view slot="gBody" >
			<view class="grace-space-between" style="margin-top: 16rpx;padding: 0 24rpx;">
				<view class="grace-flex-center" style="background-image:url(../../static/jindutiao1.png);background-repeat: no-repeat; width: 230rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">1.卡号信息</text>
				</view>
				<view class="grace-flex-center" style="background-image:url(../../static/jindutian.png);background-repeat: no-repeat; width: 230rpx;height: 40rpx;background-size:contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">2.安全码</text>
				</view>
				<view class="grace-flex-center" style="background-image:url(../../static/jindutiao1.png);background-repeat: no-repeat; width: 230rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">3.还款日/账单日</text>
				</view>
			</view>
			
			<view class="grace-flex-center" style="width: 750rpx;margin-top: 40rpx;" @tap="getIDCard()">
				<view >
					<image src="../../static/cvv2.png" style=" width: 544rpx;height: 328rpx;"></image>
				</view>
			</view>
			
			<view class="grace-rows grace-flex-center" style="margin-top: 25rpx;">
				<text style="margin-left: 20rpx; font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">信用卡安全码为卡背面签名栏后三位数字</text>
			</view>
			
			<view style="margin-top: 35rpx;">
				<view class="grace-rows grace-flex-vcenter" style="width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">信用卡安全码：</text>
					<input type="number" v-model="cvv2" maxlength="3" placeholder="请填写三位数字安全码" style="margin-left: 10rpx;width: 450rpx;font-size: 24rpx; "/>
					<!-- maxlength="3" 设置 输入数字长度为3 -->
				</view>
			</view>
			<view>
				<button @tap="submit" style="margin-top: 100rpx; width:500rpx;height:90rpx;background:#1678FF;box-shadow:0px 2rpx 5rpx 0px rgba(67,67,67,0.3);border-radius:20rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">下一步</button>
			</view>
		</view>
	</gracePage>
</template>

<script>
import gracePage from "../../graceUI/components/gracePage.vue";
export default {
	data() {
		// const cvv2 = /^\d{3,}$/
		return {
			bc_bank_id:'',
			bc_bank_number:'',
			bc_effective:'',
			tubiao:'',
			cvv2:'',
			edu:'',
		}
	},
	onLoad:function(opt){
		console.log(opt);
		this.bc_bank_id=opt.bc_bank_id;
		this.bc_bank_number=opt.bc_bank_number;
		this.bc_effective=opt.bc_effective;
		this.tubiao=opt.tubiao;
		this.edu = opt.edu
	},
	components:{
		gracePage
	},
	methods:{
		submit(){
			if(this.cvv2===''){
				this.msg_show('请将信息填写完整！')
			}else{
				this.Goto('/pages/add_credit_card/add_credit_card3?bc_bank_id='+this.bc_bank_id+'&bc_bank_number='+this.bc_bank_number+'&tubiao='+this.tubiao+'&bc_effective='+this.bc_effective+'&bc_cvn2='+this.cvv2+'&edu='+this.edu)
			}
		}
	}
}
</script>

<style>
</style>