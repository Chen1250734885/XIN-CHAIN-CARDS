<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
		<!-- 转让账户 -->
		<view class="grace-rows" style="margin-top: 15rpx; width:750rpx;height:87rpx;background:rgba(255,255,255,1);">
			<view style=" margin-left: 40rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);line-height: 87rpx;">转让账户：</view>
			<view style="position: relative;top: 20rpx;left: 20rpx;">
				<input v-model="phone" placeholder="请输入对方手机号码" type="number" style="font-size: 22rpx;" @input="phones" @blur="shiqu"/>
				<view style="position: relative;top: 10rpx; width:400rpx;height:1rpx;background:rgba(153,153,153,1);"></view>
			</view>
		</view>
		<!-- 账户姓名 -->
		<view class="grace-rows" style="margin-top: 15rpx; width:750rpx;height:87rpx;background:rgba(255,255,255,1);">
			<view style=" margin-left: 40rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);line-height: 87rpx;">账户姓名：</view>
			 <view style="">
			        <xfl-select 
			            :list="list"
			            :clearable="false"
			            :showItemNum="5" 
			            :listShow="false"
			            :isCanInput="false"  
			            :style_Container="'height: 50rpx; font-size: 16rpx;line-height:50rpx;border: 2rpx solid #333333;top:15rpx;padding-right: 33rpx'"
			            :placeholder = "list[0]"
			            :initValue="list[0]"
			            :selectHideType="'hideAll'"
			        >
			        </xfl-select>
			    </view>
		</view>
		<!-- 转让券数量 -->
		<view class="grace-rows" style="margin-top: 15rpx; width:750rpx;height:87rpx;background:rgba(255,255,255,1);">
			<view style=" margin-left: 40rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);line-height: 87rpx;">转让数量：</view>
			<view style="position: relative;top: 20rpx;left: 20rpx;">
				<image src="../../static/jianr.png" mode="" class="jianrs" @tap="jianshul"></image>
				<text class="numsl">{{num}}</text>
				<image src="../../static/jiar.png" mode="" class="jiars" @tap="jiashul"></image>
				<view style="position: relative;top: 2rpx; width:200rpx;height:1rpx;background:rgba(153,153,153,1);margin-left: 30rpx;"></view>
				
			</view>
		</view>
		<!-- 确认转让 -->
		<view  class="confirm">
			<view class="confirm2" @tap="transfer">
				<text>确认转让</text>
			</view>
			<text style="font-size: 26rpx;display: block;margin-top: 62rpx;color: rgba(102, 102, 102, 1);">提示：转出后无法收回，请认真确认转让信息！</text>
		</view>
		
		
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import xflSelect from '../../components/xfl-select/xfl-select.vue'; 
	export default {
		data() {
			return {
				quan_id:'',
				type:'', // 可使用抵扣券类型
				phone:'',
				id: '', // 列表id
				tel: '', // 输入时获取的电话
				list: [],
				num: 0, // 默认转让数量
				j_uid: '', // 接收用户id
			}
		},
		onLoad:function(opt){
			this.type=opt.type;
			this.id = opt.id
			this.jiashul()
		},
		onReady() {
			
		},
		methods:{
			// querenzhuangrang(){
			// 	var vm=this;
			// 	if(vm.phone===''){
			// 		vm.msg_show('请填写转让手机号');
			// 	}else{
			// 		var vm = this
			// 		vm.req.post(
			// 			vm.lochost + '/index/index?method=deduct_roll_shift',{
			// 				num: vm.num,
			// 				id: vm.id,
			// 				j_uid: vm.j_uid
			// 			},{},function(res){
			// 				console.log(res);
			// 				if(res.code == 200){
			// 					uni.redirectTo({
			// 						url:'/pages/personal_center/card_coupon2'
			// 					})
			// 				}else{
			// 					uni.showToast({
			// 						title: res.msg,
			// 						icon: 'none'
			// 					})
			// 				}
			// 			}
			// 		)
			// 	}
			// },
			// input键盘输入事件
			phones(v){
				this.tel = v.detail.value
				// if(this.tel.length < 11){
					this.shiqu()
				// }
			},
			// 失去焦点事件
			shiqu(){
				var vm = this;
				// if(vm.tel.length < 11){
				// 	uni.showToast({
				// 		title: '请输入完整手机号',
				// 		icon: 'none'
				// 	})
				// }else{
					vm.req.post(
						vm.lochost + '/index/index?method=get_team_users',{
							tel: vm.tel
						},{},function(res){
							console.log(res);
							if(res.data.length == 0&&res.code == 200){
								uni.showToast({
									title: '请输入正确手机号码',
									icon: 'none'
								})
							}
							for (let i = 0; i < res.data.length; i++) {
								console.log(res.data[i].u_name+res.data[i].u_tel);
								var name = []
								name.push(res.data[i].u_name+res.data[i].u_tel) 
								vm.list = name
								vm.j_uid = res.data[0].id
							}
						}
					)
				// }
			},
			// 增加转让数量事件
			jiashul(){
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_num_change',{
						change: 1,
						type: vm.type,
						entry: 2,
						num: vm.num
					},function(res){
						if(res.code !== 200){
							uni.showToast({
								title:res.msg,
								icon: 'none'
							})
						}else{
							vm.num = res.data.num
						}
					}
				)
			},
			// 减少转让数量事件
			jianshul(){
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=deduct_roll_num_change',{
						change: 2,
						type: vm.type,
						entry: 2,
						num: vm.num
					},function(res){
						if(res.code !== 200){
							uni.showToast({
								title:res.msg,
								icon: 'none'
							})
						}else{
							vm.num = res.data.num
						}
					}
				)
			},
			// 确认转让事件
			transfer(){
				var vm = this
				vm.req.mypost(
					vm.lochost  + '/index/index?method=deduct_roll_shift',{
						num: vm.num,
						id: vm.id,
						j_uid: vm.j_uid
					},function(res){
						console.log(res);
					if(res.code == 200){
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						setTimeout(function(){
							uni.redirectTo({
								url: '/pages/personal_center/card_coupon2'
							})
						},500)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
						
					}
				)
			}
		},
		components:{
			gracePage,
			xflSelect
		}
	}
</script>

<style>
	.jianrs{
		width: 41rpx;
		height: 41rpx;
		
	}
	.jiars{
		width: 41rpx;
		height: 41rpx;
		margin-left: 185rpx;
	}
	.numsl{
		position: absolute;
		margin-left: 69rpx;
		font-size: 36rpx;
	}
	.confirm{
		width: 750rpx;
		height: 194rpx;
		background: #FFFFFF;	
		margin-top: 78rpx;
		text-align: center;
	}
	.confirm2{
		width: 385rpx;
		height: 73rpx;
		background: #FF1217;
		border-radius: 20rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 35rpx;
		line-height: 73rpx;
		margin: auto;
		transform: translateY(57rpx);
	}
	
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
