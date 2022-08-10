<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
		
			<rich-text :nodes="strings"></rich-text>
		
		
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				 strings: ''
			}
		},
		onLoad:function(opt){
			
			this.strings=opt.str;
			console.log(this.strings);
		},
		methods:{},
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
