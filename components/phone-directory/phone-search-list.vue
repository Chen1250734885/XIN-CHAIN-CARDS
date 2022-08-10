<template>
	<view>
		<view class="search">
			<input 
			@input="handleInput"
			class="search-input" 
			type="text" 
			focus  
			placeholder="请输入银行名称"
			/>
		</view>
		<view class="search-main" v-if="keyword">
			<view class="search-main-errtitle" v-if="hasNoData">无搜索结果</view>
			<view class="search-main-title"
			hover-class="hover" 
			@click="handleClick"
			:hover-start-time="20" 
			:hover-stay-time="70" 
			v-for="item of list" 
			:key="item.id"
			:data-name="item.name"
			:data-id="item.id"
			:data-phoneNumber="item.phoneNumber">
				{{item.name}}
			</view>
		</view>
	</view>		
</template>

<script>
	export default {
		name:"phone-search-list",
		props:{
			phones:Object
		},
		data() {
			return {
				fakahang:'',
				keyword:'',
				list:[],
				timer:null
			}
		},
		computed:{
			hasNoData () {
				return !this.list.length
			}
		},
		watch:{
			keyword () {
				if(this.timer) {
					clearTimeout(this.timer)
				}
				if(!this.keyword){
					this.list = []
					return
				}
				this.timer = setTimeout(()=>{
					const result = []
					const res=[]
					var id_list=[]
					for (let i in this.phones){
						this.phones[i].forEach((item)=>{
							if(item.spell.indexOf(this.keyword) > -1||item.name.indexOf(this.keyword) > -1){
								// for (let var1 in result) {
								// 	console.log(item.id===result[var1].id);
								// 	if(item.id===result[var1].id){
								// 		result.push(item)
								// 		break;
								// 		}
								// 	res.push(item)
								// }
								if(id_list.indexOf(item.id) === -1){
									result.push(item);
									id_list.push(item.id)
								}
								
								// result.push(item)
								// console.log(result);
								// console.log(this.keyword);
								// if(result.indexOf(item) === -1||result.indexOf(item) === -1){
								// 	result.push(item)
								// 	}
							}
						})
					}
					this.list = result
				},5)
			}
		},
		methods:{
			handleInput (e) {
				this.keyword = e.detail.value;
			},
			handleClick (e) {
				console.log(e);
				this.$emit('paramClick',e.target.dataset)
				
				
				// if(this.fakahang==='储蓄卡'){
				// this.reto('/pages/add_savings_card/add_savings_card?id='+e.target.dataset.id+'&name='+e.target.dataset.name);
				// }else if(this.fakahang==='信用卡'){
				// this.reto('/pages/add_credit_card/add_credit_card1?id='+e.target.dataset.id+'&name='+e.target.dataset.name);
				// }
				
			}
		}
	}
</script>

<style>
	.hover{
		background-color: #eee;
	}
	.search{
		background-color: #fff;
		padding: 10upx 20upx;
		border-bottom: 1px solid #e5e5e5;
	}

	.search-input{
		font-size:28upx;
		border: 1px solid #e5e5e5;
		border-radius: 3px;
		padding: 10upx 20upx 10upx 20upx;
	}
	
	.search-main{
		height: 100%;
		padding-bottom: 20upx;
		background-color:#fff;
		overflow: hidden;
	}
	
	.search-main-errtitle,.search-main-title{
		width: 100%;
		height: 92upx;
		line-height: 92upx;
		font-size: 32upx;
		padding: 0 20upx;
		border-bottom: 1px solid #e5e5e5;
	}

</style>
