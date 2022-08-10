<template>
	<view class="gap" v-if="show" @touchmove.stop="" @tap.stop="" :style="{backgroundColor:background}">
		<view class="gap-body">
			<view class="gap-header grace-space-between">
				<text class="gap-header-btn" :style="{color:cancelTColor}" @tap="close">{{cancelText}}</text>
				<text class="gap-header-btn" :style="{textAlign:'right', color:confirmColor}" @tap="confirm">{{confirmText}}</text>
			</view>
			<picker-view :indicator-style="indicatorStyle" class="gap-main" :value="defaultVal" @change="change">
				<picker-view-column v-if="level >= 1">
					<text class="gap-item" v-for="(item, index) in shilist" :key="index">{{item.name}}</text>
				</picker-view-column>
				<picker-view-column v-if="level >= 2">
					<text class="gap-item" v-for="(item, index) in zhenshi" :key="index">{{item.city}}</text>
				</picker-view-column>
				<picker-view-column v-if="level >= 3">
					<text class="gap-item" v-for="(item, index) in area[defaultVal[0]][defaultVal[1]]" :key="index">{{item.label}}</text>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>
<script>
// import provinceData from '../data/city-data/province.js';
// import cityData from '../data/city-data/city.js';
import areaData from '../data/city-data/area.js';
export default {
	name: "graceAddressPicker",
	props: {
		show : { type : Boolean, default : true },
		background:{ type : String, default : 'rgba(0, 0, 0, 0.5)' },
		cancelText : { type : String, default : '取消' },
		cancelTColor : { type : String, default : '#888888' },
		confirmText : { type : String, default : '确定' },
		confirmColor : { type : String, default : '#3688FF' },
		value : { type : Array , default () { return [0, 0] }},
		level : {type : Number, default : 3},
		channel_id:{type:String, default: "1"}
	},
	data() {
		return {
			// provinceData   : [],
			indicatorStyle : 'height:35px',
			province       : [],
			// city           : cityData,
			// area           : areaData,
			defaultVal : [0,0,0],
			shilist	: [],
			sheng_code : 11,
			shi_code: 0 ,
			shi_name:'暂无',
			zhenshi:[],
			zhenshi_index:0,
			res: [0,0]
		}
	},
	created() {
		this.defaultVal = this.value;
		console.log(this.channel_id);
		var vm=this
		this.req.post(
		this.lochost+'/index?method=city_merchants_list',
		{c_code:1,channel_id:5},
		{},
		function(res){
			vm.province=res.data;
			vm.get_shi();
			
			// console.log(vm.get_shi(11));
		}
		)
	},
	methods: {
		// 通过省获取市
		 get_shi(code){
			var vm=this
			this.req.post(
			this.lochost+'/index/index?method=city_list',
			{},
			{},
			function(res){
				// console.log(res);
				var data = res.data;
				var newdata = [];
				vm.req.each(data,function(i,v){
					var list = {
						'name':i,
						'child':v
					};
					newdata.push(list);
				})
				
				
				vm.shilist=newdata;
				vm.zhenshi = newdata[0].child
				vm.zhenshi_index = 0
				return newdata
			}
			)
		},
		
		//
		change : function (e) {
			// console.log(e)
			var res = e.detail.value;
			this.res = e.detail.value
			var shilist = this.shilist;
			// console.log(shilist[res[0]])
			
			this.zhenshi = shilist[res[0]].child
			this.zhenshi_index = res[1]
			// var newshilist = [];
			
			// this.req.each(shilist,function(i,v){
				
			// })
			
			
			// console.log(res[0]);
			// if(!res[0]){res[0] = 0;}
			// if(!res[1]){res[1] = 0;}
			// if(!res[2]){res[2] = 0;}
			// this.defaultVal = res;
			// console.log(this.shilist);
			// if (this.province[this.defaultVal[0]].c_code!=this.sheng_code){
			// 	this.get_shi(this.province[this.defaultVal[0]].c_code);
			// 	this.sheng_code=this.province[this.defaultVal[0]].c_code;
			// }
			// console.log( this.shilist);
			
			// if(typeof this.shilist!='undefined'){
			// 	this.shi_code=this.shilist[this.defaultVal[1]].c_code;
			// 	this.shi_name=this.shilist[this.defaultVal[1]].c_name;
			// }
			
			
			
		},
		confirm:function (e) {
			var shuzu = this.zhenshi;
			var shi_index = this.zhenshi_index
			var codes = [
				shuzu[shi_index].city_code,
				// this.shilist[this.defaultVal[1]].c_code,
				// this.get_shi(this.province[this.defaultVal[0]].c_code).c_code,
				// cityData[this.defaultVal[0]][this.defaultVal[1]].value,
				// areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].value ? areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].value : 0
			];
			var names = [
				shuzu[shi_index].city,
				// this.shilist[this.defaultVal[1]].c_name,
				// this.get_shi(this.province[this.defaultVal[0]].c_code).c_name,
				
				// cityData[this.defaultVal[0]][this.defaultVal[1]].c_name,
				// areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].label ? areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].label : ''
			];
			codes = codes.splice(0, this.level);
			names = names
			var res = {codes : codes, names : names, indexs : this.res};
			console.log(res);
			this.$emit('confirm', res);
		},
		close : function () {
			this.$emit('close');
		}
	}
}
</script>
<style scoped>
.gap{position:fixed; width:100%; height:100%; top:0; left:0; bottom:0; z-index:998;}
.gap-body{background-color:#FFFFFF; position:absolute; z-index:999; bottom:0; left:0; width:100%;}
.gap-header{padding:25rpx;}
.gap-header-btn{width:200rpx; line-height:38rpx; height:38rpx; display:block; font-size:28rpx;}
.gap-main{width:100%; height:280px;}
.gap-item{display:block; width:100%; height:35px; font-size:12px; line-height:35px; overflow:hidden; text-align:center;}
</style>
