<template>
	<gracePage :customHeader="false">
			<!-- 页面主体 -->
			<view slot="gBody">
					<graceShade background="rgba(0,0,0,0.7)" :show="show" @closeShade="closeShade">
						<view class="grace-flex grace-columns">
						<view style="text-align: center; background-image: url(../../static/shiyongyouhuijuan.png);background-size: contain;width: 500rpx;height: 658rpx;">
							<view style="margin-top: 230rpx; font-size:34rpx;font-weight:bold;color:rgba(157,27,6,1);">请选择使用金额</view>
							<view class="grace-flex grace-wrap grace-rows" style="margin: 30rpx auto; width: 500rpx;height: 160rpx;">
								<view @tap="xuanze(item)" :class="item===val?'xuanzhong':'weixuan'" v-for="(item,index) in xuanze_jine" :key="index" style="margin-left: 20rpx; width: 100rpx;height: 70rpx;border-radius:10px;font-size:28rpx;font-weight:bold;color:rgba(47,46,46,1); text-align: center;line-height: 70rpx;">{{ item }}</view>
							</view>
							<button @tap="queren" style="width:316rpx;height:93rpx;background:rgba(251,217,81,1);box-shadow:0px 3rpx 5rpx 0px rgba(169,30,7,0.75);border-radius:10rpx; font-size:42rpx;font-weight:bold;color:rgba(86,86,86,1);line-height: 93rpx;">确认</button>
						</view>
						<view @tap="closeShade()" style="margin: 53rpx auto; background-image: url(../../static/guanbiyouhuijuan.png);background-size: contain;width: 70rpx;height: 70rpx;"></view>
						</view>
	<!-- 					<view class="demo-msg grace-relative">
							<image src="https://images.pexels.com/photos/1937394/pexels-photo-1937394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" mode="widthFix" style="width:100%;"></image>
							<view class="close-btn grace-icons icon-close3 grace-white grace-absolute-rt" @tap.self="closeShade"></view>
						</view> -->
					</graceShade>
					
					<view @tap="Goto('/pages/preview_plan/preview_plan')" class="grace-flex-cente20r" style="margin-top: 20rpx;">
						<view style="width:707rpx;height:85rpx;background:rgba(255,255,255,1);">
							<text style="margin-left: 20rpx; font-size:29rpx;font-weight:400;color:rgba(61,61,61,1);line-height: 85rpx;">不使用优惠券</text>
							<image src="../../static/weixuan.png" style="margin-left: 421rpx; width: 30rpx;height: 30rpx;position: relative;top: 8rpx;"></image>
						</view>
					</view>
					
					<view class="grace-wrap grace-flex-center" v-for="(item,index) in keyong_list" :key="index">
						<view style="margin-top: 10rpx; width: 714rpx;height: 218rpx;background-image: url(../../static/youhuijuan_keyong.png);background-size: contain;background-repeat: no-repeat;">
							<view class="grace-rows" style="margin-top: 30rpx;">
								<view class="grace-flex-bottom ">
									<text style="margin-left: 20rpx; font-size:29rpx;font-weight:400;color:rgba(255,255,255,1);">￥</text>
									<text style="margin-left: 20rpx; font-size:63rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item.progress_bar_num }}</text>
									<text style="margin-left: 30rpx; font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">手续费抵用券</text>
								</view>
								<view @tap="showShade(item.id,item.progress_bar_num)" style="margin-left: 150rpx; margin-top: 20rpx; text-align: center; line-height: 54rpx; left: 180rpx; width:161rpx;height:54rpx;background:rgba(255,255,255,1);border-radius: 30rpx;font-size:27rpx;font-weight:bold;color:rgba(254,135,79,1);">
									立即使用
								</view>
							</view>
							<view style="position: relative;top: 58rpx; margin: 0 20rpx;" class="grace-space-between">
								<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">到期时间：{{ item.end_time }}</view>
								<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">使用条件：{{ item.tiaojian }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="grace-wrap grace-flex-center" v-for="(item1,index1) in bukeyong_list" :key="index1" >
					<view style="margin-top: 10rpx; width: 714rpx;height: 218rpx;background-image: url(../../static/youhuijuan_bukeyong.png);background-size: contain;background-repeat: no-repeat;">
						<view class="grace-rows" style="margin-top: 30rpx;">
							<view class="grace-flex-bottom ">
								<text style="margin-left: 20rpx; font-size:29rpx;font-weight:400;color:rgba(255,255,255,1);">￥</text>
								<text style="margin-left: 20rpx; font-size:63rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item1.progress_bar_num }}</text>
								<text style="margin-left: 30rpx; font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">手续费抵用券</text>
							</view>
							<view style="margin-left: 150rpx; margin-top: 20rpx; text-align: center; line-height: 54rpx; left: 180rpx; width:161rpx;height:54rpx;background:rgba(255,255,255,1);border-radius: 30rpx;font-size:29rpx;font-weight:bold;color:rgba(204,204,204,1);">
								不可用
							</view>
						</view>
						<view style="position: relative;top: 58rpx; margin: 0 20rpx;" class="grace-space-between">
							<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">到期时间：{{ item1.end_time }}</view>
							<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">不可用原因：{{ item1.tiaojian }}</view>
						</view>
					</view>
				</view>
				

			</view>
	</gracePage>
</template>

<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceShade from "../../graceUI/components/graceShade.vue";
// import graceSelectTags from '../../graceUI/components/graceSelectTags.vue';
export default {
  data () {
    return {
      xuanze_jine: [],
      dangci: [],
      val: 0,
      quan_id: '',
      show: false,
      bill_money: 0,
      quan: [],
      keyong_list: [],
      bukeyong_list: [],
      card_id: '',
      pattern: '',
    }
  },
  onLoad: function (opt) {
    var vm = this
    this.pattern = opt.pattern,
      this.card_id = opt.card_id,
      console.log(opt);
    this.bill_money = opt.bill_money;
    this.req.post(
      this.lochost + '/mytrunk/repaymentplan/get_deduction',
      {
        bill_money: this.bill_money,
        card_id: this.card_id,
        pattern: this.pattern,
      },
      {},
      function (res) {
        vm.dangci = res.data.dangci;
        vm.quan = res.data.quan;
        for (let i = 0; i < vm.quan.length; i++) {
          if (vm.quan[i].c_state === '可用') {
            vm.keyong_list.push(vm.quan[i])
          } else if (vm.quan[i].c_state === '不可用') {
            vm.bukeyong_list.push(vm.quan[i])
          }
        }
        console.log(res);
      }
    )
  },
  methods: {
    queren () {
      var vm = this;
      if (this.val === 0) {
        this.msg_show('未选择金额');
      } else {
        vm.req.post(
          vm.lochost + '/mytrunk/repaymentplan/confim_choice',
          {
            coupon: vm.val,
            coupon_id: vm.quan_id
          },
          {},
          function (res) {
            vm.msg_show(res.msg);
            vm.Goto('/pages/preview_plan/preview_plan');
          }
        )
      }

    },
    xuanze (val) {
      this.val = val;
    },

    showShade: function (id, yue) {
      this.xuanze_jine = [];
      this.quan_id = id;
      for (let i = 0; i < this.dangci.length; i++) {
        console.log(this.dangci[i].max, parseInt(yue));
        if (this.dangci[i].max <= parseInt(yue)) {
          this.xuanze_jine.push(this.dangci[i].max);
        }


      }

      this.show = true;
    },
    closeShade: function () {
      this.show = false;
    },

    change: function (e) {
      this.current = e;
    }
  },
  components: {
    gracePage,
    graceShade,
    // graceSelectTags
  },
}
</script>

<style>
.weixuan {
  background: rgba(247, 247, 247, 1);
}
.xuanzhong {
  background: rgba(251, 217, 81, 1);
}
.demo-msg {
  width: 500rpx;
}
.close-btn {
  width: 80rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 40rpx;
  z-index: 7;
}
</style>
