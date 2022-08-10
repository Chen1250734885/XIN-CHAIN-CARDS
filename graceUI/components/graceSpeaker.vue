<template name="graceSpeaker">
	<view class="grace-swiper-msg">
		<image src="../../static2/huankuanjilu.png" style="width: 70rpx;height: 70rpx;margin-left: 20rpx;margin-right: 40rpx;"></image>
		<!-- <view class="grace-swiper-msg-icon" :class="[iconClass]" :style="{color:iconColor}"></view> -->
		<swiper :vertical="vertical" autoplay="true" circular="true" :interval="interval" :style="{height:height}" style="width: 500rpx;"  >
			<swiper-item v-for="(item, index) in msgs" :key="index" :style="{height:height}" >
				<navigator 
				:url="item.url" :open-type="item.opentype" 
				
				:style="{ fontSize:fontSize, fontWeight:fontWeight, color:item.color, height:height, lineHeight:height}">{{item.title}}</navigator>
			</swiper-item>
	  </swiper>
	  <image @tap="phone()" src="../../static2/qianjin.png" style="width: 48rpx;height: 48rpx;margin-right: 95rpx;"></image>
	</view>
</template>
<script>
export default {
	name: "graceSpeaker",
	props: {
		msgs : {
		  type  : Array,
		  default : function(){return [];}
		},
		iconClass : {
		  type  : String,
		  default : ""
		},
		iconColor : {
		  type  : String,
		  default : "#3688FF"
		},
		interval : {
		  type : Number,
		  default: 3000
		},
		vertical : {
		  type : Boolean,
		  default : true
		},
		fontSize : {
			type  : String,
			default : "26rpx"
		},
		fontColor : {
			type  : String,
			default : "#333333"
		},
		fontWeight : {
			type  : String,
			default : ""
		},
		height:{
			type  : String,
			default : "60rpx"
		},
		phoneNumber:{
			type  : String,
			default : "028-69918477"
		}
	},
	methods:{
		phone(){
			// console.log(this.phoneNumber);
			// uni.makePhoneCall({
			//     phoneNumber: this.phoneNumber //仅为示例
			// });
			this.Goto('/pages/card_keeper/card_keeper')
		},
	}
}
</script>
<style scoped>
.grace-swiper-msg{width:100%; display:flex; flex-wrap:nowrap; align-items:center;}
.grace-swiper-msg-icon{margin-right:16rpx; display:inline-block; flex-shrink:0;}
.grace-swiper-msg swiper{width:100%; height:60rpx; overflow:hidden;}
.grace-swiper-msg swiper-item{overflow:hidden;}
.grace-swiper-msg navigator{line-height:60rpx; overflow:hidden;}
</style>