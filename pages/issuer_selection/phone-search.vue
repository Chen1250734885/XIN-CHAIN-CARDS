<template>
	<view>
		<phone-search-list :phones="phones" @paramClick="paramClick"></phone-search-list>
	</view>		
</template>

<script>
	
	import phoneSearchList from '@/components/phone-directory/phone-search-list.vue'
	
	export default {
		name:"phone-search",
		components:{
			phoneSearchList
		},
		data() {
			return {
				phones:null,
				fakahang:''
			}
		},
		onLoad (option) {
			this.fakahang=option.fakahang;
			this.phones = JSON.parse(unescape(option.phones));
		},
		onBackPress(){
			uni.$off('xuanzefakahang');
		},
		methods:{
			paramClick (e) {
				uni.$emit('xuanzefakahang',{id:e.id,name:e.name});
				this.Back(2);
				// if(this.fakahang==='储蓄卡'){
				// this.reto('/pages/add_savings_card/add_savings_card?id='+e.id+'&name='+e.name);
				// }else if(this.fakahang==='信用卡'){
				// this.reto('/pages/add_credit_card/add_credit_card1?id='+e.id+'&name='+e.name);
				// }else if(this.fakahang==='实名认证'){
				// this.reto('/pages/authentication/authentication2?id='+e.id+'&name='+e.name)
				// }
			}
		}
	}
</script>

<style>
	
</style>
