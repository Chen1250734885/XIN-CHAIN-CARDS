<template>
	<view>
		<web-view :src="url" ></web-view>
	</view>
</template>

<script>
	var vm=this;
	 export default {
		 onNavigationBarButtonTap(e){
			 // #ifdef APP-PLUS
				let pages = getCurrentPages()
				let page = pages[pages.length - 1];  
				let currentPages = page.$getAppWebview()  
				let children=currentPages.children()  
				if(children.length===0){  
				           this.Back(1) 
				}else{  
				   // children[0].close()  
				  setTimeout(()=>{  
				    uni.navigateBack()  
				  },80)  
				}
			 // #endif
			 // #ifdef H5
			 let pages1 = getCurrentPages()
			 for (var i = 0; i < pages1.length; i++) {
				 this.Back(1)
			 }
			 // #endif
		 },
	        data() {
	            return {
	                url:'',
	            }
	        },
			// onUnload() {
			// 	uni.switchTab({
			// 	    url: '/pages/index/index'
			// 	});
			// },
			onLoad(op) {
				this.url=op.url;
				console.log(this.url)
			}
			
	    }
</script>

<style>
</style>
