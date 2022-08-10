
<script>
	export default {
		
		onLaunch: function() {
			console.log('App Launch')
			var vm=this;
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,function(res){
			var version=res.version;
			vm.req.post(
			vm.lochost+'/mytrunk/uploadfile/is_update_app',
			{},
			{},
			function(res){
				console.log(res);
				var ve_list=version.split('.');
				var ve_int=parseInt(ve_list.join(''));
				var res_ve_list=res.data.banben.split('.');
				var res_ve_int=parseInt(res_ve_list.join(''));
				if(res_ve_int>ve_int){
					if(res.data.is_q===1){
						vm.reto('/pages/update/update')
					}else{
						vm.Goto('/pages/update/update')
					}
				}
			}
			)
			});
			
			// const downloadTask = uni.downloadFile({
			// 	url : this.download_url,
			// 	success : (res) => {
			// 		if (res.statusCode === 200) {
			// 			this.progress = 100;
			// 			this.buttonText = '正在安装';
			// 			uni.showToast({
			// 				title :'新版本下载成功，开始安装',
			// 				icon  :"none"
			// 			});
			// 			plus.runtime.install(res.tempFilePath);
			// 		}
			// 	}
			// });
			// #endif

			
			
			//替换底部
			// this.req.post(
			// this.lochost+'/mytrunk/index/get_config',
			// {},
			// {},
			// function(res){
			// 	vm.is_shopping=res.data.platform.is_shopping
			// 	var tabbars=res.data.tabbar;
			// 	for(var i = 0;i<tabbars.length;i++) {
			// 		uni.setTabBarItem({
			// 			index:i,
			// 			text:tabbars[i].name,
			// 			iconPath:'../../static/tabbar/'+tabbars[i].tubiao,
			// 			selectedIconPath:'../../static/tabbar/'+tabbars[i].xuanze
			// 		});
			// 	}
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "./graceUI/graceIcons.css";
	@import "./graceUI/graceUI.css";
	page{
		background: #F7F7F7;
	}
	/*每个页面公共css */
</style>
