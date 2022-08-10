<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
			<view class="grace-flex grace-flex-top" style="width:750rpx;background:rgba(255,255,255,1);margin-bottom: 10rpx;height: 80rpx;">
				<text style="font-size: 30rpx;line-height: 80rpx;margin-left: 24rpx;" >今日收益：{{ suoming }}</text>
			</view>
			<scroll-view class="grace-scroll-y" scroll-y="true" :style="{height:height}" @scrolltolower="get_info()">
				<view v-for="(item ,index) in shuju" :key="index" style="margin: 1rpx auto; width:750rpx;height:120rpx;background:rgba(255,255,255,1);box-shadow:0px 2rpx 10rpx 0px rgba(255,255,255,0.06);border-radius:10rpx;">
					
					<view class="grace-space-between">
						<view style="left: 24rpx; position: relative;top:20rpx; font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">
							{{ item.name }}
						</view>
						<text style="margin-right: 24rpx; font-size:30rpx;font-weight:400;transform: translateY(40rpx);" :style="{color:item.m_state===2?'rgba(35,183,20,1)':item.m_state===1?'rgba(255, 0, 0, 1.0)':'rgba(255,170,0,255)'}">{{item.m_real_money>0?'+'+item.m_real_money:item.m_real_money}}</text>
					</view>
					
					<view class="grace-rows" style="position: relative;top: 36rpx;left: 24rpx;">
						<image src="../../static/credit_card_record_shijian.png" style="position: relative;top: 5rpx; width: 26rpx;height: 26rpx;"></image>
						<view style="margin-left: 16rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);">{{ item.m_time }}</view>
					</view>	
					
				</view>
				<view style="font-size: 15rpx;color: rgba(68, 68, 68, 1);text-align: center;margin: 20rpx auto;">没有更多了</view>
			</scroll-view>
			
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				suoming:"各个银行的分润层次不同",//收益说明
				shuju:[],
				limit:20,
				page:0,
				height:'',
			}
		},
		onShow:function(){
			var sysinfo=uni.getSystemInfoSync();
			this.height=(sysinfo.safeArea.height-20)+'px';
			this.get_info();
		},
		methods:{
			get_info(){
				var vm=this;
				vm.page+=1;
				vm.req.post(
				vm.lochost+'/index/index?method=get_money_log',
				{
					page:vm.page,
					size:vm.limit,
					type:'benefit'
				},
				{},
				function(res){
					vm.suoming=res.data.today_num;
					console.log(res);
					var shuju_list=res.data.data;
					for (let i = 0; i < shuju_list.length; i++) {
						vm.shuju.push(shuju_list[i])
					}
				}
				)
			}
		},
		components:{
			gracePage
		}
	}
</script>

<style>
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
