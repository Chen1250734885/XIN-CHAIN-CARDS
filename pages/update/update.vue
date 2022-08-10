<template>
	<gracePage :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view style="">
				<image src="../../static2/logo.png" style="margin-left: 270rpx;margin-top: 20rpx; width: 150rpx;height: 150rpx;"></image>
			</view>
			<view class="grace-title grace-h4" style="margin-top:30px;">
				有新的版本
			</view>
			<view class="grace-text">
				<view v-for="(item,index) in shuoming" :key="index">{{item}}</view>
			</view>
		</view>
		<view slot="gFooter" class="concerns-footer" @tap="download" v-show="download_url != ''">
			<graceProgressButton :buttonText="buttonText" borderRadius="50rpx" :val="progress" ></graceProgressButton>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceProgressButton from "../../graceUI/components/graceProgressButton.vue";
export default{
	data() {
		return {
			progress : 0,
			buttonText : "安装新版本",
			fileUrl  : '',
			updateContent : null,
			shuoming:[],
			download_url:'',
		}
	},
	components:{
		gracePage,
		graceProgressButton
	},
	onLoad(opt) {
		console.log(opt);
		this.download_url = opt.url
	},
	// onShow:function(){
	// 	var vm=this;
	// 	vm.req.post(
	// 	vm.lochost+'/index/index?method=check_version',
	// 	{},
	// 	{},
	// 	function(res){
	// 		console.log(res);
	// 		vm.shuoming=res.data.suoming;
	// 		vm.download_url=res.data.up_url;
	// 		// vm.updateContent = res.data;
	// 	}
	// 	)
	// },
	methods:{
		download : function(){
			var type=uni.getSystemInfoSync().platform;
			if(type==='ios'){
				plus.runtime.openURL(vm.download_url);  
			}else{
				if(this.buttonText != "安装新版本"){return ;}
				this.buttonText = "开始下载新版本";
				// 根据进度判断要做什么
				// 0 下载
				if(this.progress == 0){
					const downloadTask = uni.downloadFile({
						url : this.download_url,
						success : (res) => {
							if (res.statusCode === 200) {
								this.progress = 100;
								this.buttonText = '正在安装';
								uni.showToast({
									title :'新版本下载成功，开始安装',
									icon  :"none"
								});
									plus.runtime.install(res.tempFilePath,{},function(){
							        plus.nativeUI.closeWaiting();   
									plus.runtime.restart();

							  },function(e){
							        plus.nativeUI.closeWaiting(); 
							    });
								// plus.runtime.install(plus.io.convertLocalFileSystemURL(res.tempFilePath),{},{},function(error){  
								// 	uni.showToast({  
								// 		title: '安装失败', 
								// 		duration: 1500  
								// 	});  
								// })
							}
						}
					});
					downloadTask.onProgressUpdate((res) => {
						this.progress = res.progress;
					});
				}
			}
			

		}
	}
}
</script>
<style>
.concerns-footer{padding:10rpx 20rpx; background-color:#F4F5F6;}
</style>