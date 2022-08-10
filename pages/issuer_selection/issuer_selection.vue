<template>
	<view>
		<!-- 全屏 Loading -->
		<graceFullLoading text='暂无可选银行' logoUrl='../../static/login2.png' :graceFullLoading="graceFullLoading"></graceFullLoading>
		<phone-directory :fakahang="fakahang" :phones="phones" @paramClick="paramClick"></phone-directory>
	</view>
</template>

<script>
	import graceFullLoading from "../../graceUI/components/graceFullLoading.vue";
	import phoneDirectory from '@/components/phone-directory/phone-directory.vue'
	export default {
		name: "phones",
		components: {
			phoneDirectory,
			graceFullLoading
		},
		data() {
			return {
				//示例数据
				phones: {
					tj: [],
					A: [],
					B: [],
					C: [],
					D: [],
					E: [],
					F: [],
					G: [],
					H: [],
					I: [],
					J: [],
					K: [],
					L: [],
					M: [],
					N: [],
					O: [],
					P: [],
					Q: [],
					R: [],
					S: [],
					T: [],
					U: [],
					V: [],
					W: [],
					X: [],
					Y: [],
					Z: []
				},
				fakahang: '',
				banck_card: '',
				graceFullLoading: true,
				var1: []

			}
		},
		onLoad(opt) {
			console.log(opt);
			var type = opt.type;
			var types = opt.types
			this.fakahang = opt.banck;
			if (opt.banck === '实名认证') {
				type = 1;
			}
			console.log()
			var vm = this;

			// var objcer = {
			// 	type:type,
			// 	types:types,
			// }
			// console.log(objcer);
			// return
			this.req.post(
				this.lochost + '/index/index?method=get_bank_list', {
					type: opt.type
				}, {},
				function(res) {
					// console.log(res.data);
					vm.var1 = res.data.ordinary
					for (var i = 0; i < vm.var1.length; i++) {
						// console.log(vm.var1[i]);
						var back = {
							id: vm.var1[i].bank_id,
							spell: vm.var1[i].bank_name,
							name: vm.var1[i].bank_name
						}
						if (type == 2 && vm.var1[i].is_recommend == 1) {
							vm.phones.tj.push(back);

						}
						vm.phones[vm.var1[i].bank_alphabet].push(back);
					}

					vm.graceFullLoading = false

				}
			)
		},
		onBackPress() {
			uni.$off('xuanzefakahang');
		},
		methods: {
			// showFullLoading : function(){
			// 			this.graceFullLoading = true;
			// 			setTimeout(()=>{this.graceFullLoading = false;}, 3000);
			// 		},
			paramClick(e) {
				console.log(e);
				console.log(this.fakahang);
				uni.$emit('xuanzefakahang', {
					id: e.id,
					name: e.name
				});
				this.Back(1);
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
