<template>
  <!-- 限时活动页面 -->
  <view slot="gBody">
    <view class="guizhe" @tap="guizhes">领取规则</view>
    <view class="title_1"></view>
    <view class="titlequ">限时领取</view>
    <view class="title_2"></view>
    <view class="zhuancx">VIP专享</view>
    <view class="zhuancx_2">一刷通加速包</view>
    <view class="zhuancx_3">年营利5倍以上静态收益</view>
    <view class="zhuancx_3">70天可获全额度变现卡一张</view>
    <view class="liqujd">
      <view class="liqujd_tit">
        <text style="font-size: 22rpx; color: #ffffff; margin-left: 36rpx"
          >当前进度</text
        >
        <text style="font-size: 22rpx; color: #ffffff; margin-right: 37rpx"
          >{{ progress_bar }}%</text
        >
      </view>
      <view style="margin-top: 12rpx; margin-left: 25rpx">
        <image
          src="../../static2/jubk.png"
          mode=""
          style="width: 500rpx; height: 48rpx"
        ></image>
        <cmd-progress
          class="jdt"
          :percent="progress_bar"
          :showInfo="false"
          stroke-color="RGBA(255, 158, 5, 1)"
          status="normal"
          :stroke-width="21"
          :width="26"
        ></cmd-progress>
      </view>
      <view
        style="
          font-size: 22rpx;
          color: #ffffff;
          margin-left: 34rpx;
          margin-top: -45rpx;
        "
        >*进度到达100%后获得一张一刷通</view
      >
    </view>
    <view class="ann_linq" @tap="lingqus">
      <image
        src="../../static2/btn.png"
        mode=""
        style="width: 100%; height: 100%"
      ></image>
    </view>
    <view class="huiyuan">
		<!-- 缺少素材，等后期添加 -->
      <!-- <image
        src="../../static2/caidai.png"
        mode=""
        style="width: 100%; height: 100%"
      ></image> -->
    </view>
    <!-- 领取规则 -->
    <uni-popup ref="popup" type="center">
      <view class="popup">
        <view class="linqu">领取规则</view>
        <view class="linqu_1">1.此活动仅对VIP及以上用户有效。</view>
        <view class="linqu_2">2.每周产生一笔云刷或代还，即可</view>
        <view class="linqu_2s">领取10%一刷通加速包。</view>
        <view class="linqu_3">3.获取的一刷通进度可在“卡券-一</view>
        <view class="linqu_3s">刷通中查看。</view>
        <view class="linqu_4">本活动最终解释权归xxxxxxxx所有</view>
        <view @tap="quxiao">
          <image
            src="../../static2/guizbj.png"
            mode=""
            style="width: 616rpx; height: 722rpx"
          ></image>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
export default {
  data () {
    return {
      progress_bar: 0
    }
  },
  onLoad () {
    var vm = this
    vm.req.post(
      vm.lochost + '/index/index?method=is_get_progress_bar', {}, {},
      function (res) {
        console.log(res);
        vm.progress_bar = res.data.progress
      }
    )
  },
  methods: {
    guizhes () {
      this.$refs.popup.open()
    },
    quxiao () {
      this.$refs.popup.close()
    },
    // 领取按钮
    lingqus () {
      // console.log(123);
      // return
      var vm = this
      vm.req.mypost(
        vm.lochost + '/index/index?method=get_progress_bar', {},
        function (res) {
          console.log(res);
          if (res.code == 200) {
            uni.redirectTo({
              url: '/pages/personal_center/Limited_activities'
            })
            setTimeout(function () {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            }, 500)
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        }
      )
    }
  },
  components: {
    uniPopup,
    cmdProgress
  }
}
</script>

<style>
page {
  background-color: rgba(36, 131, 245, 1);
  overflow: hidden;
  height: 100%;
}

.huiyuan {
  position: absolute;
  width: 750rpx;
  height: 1000rpx;
  bottom: 0;
}

.title_1 {
  width: 73rpx;
  height: 2rpx;
  background-color: #ffffff;
  position: absolute;
  left: 204rpx;
  top: 74rpx;
}

.titlequ {
  font-size: 38rpx;
  color: #ffffff;
  margin-top: 46rpx;
  text-align: center;
}

.title_2 {
  width: 73rpx;
  height: 2rpx;
  background-color: #ffffff;
  position: absolute;
  left: 470rpx;
  top: 75rpx;
}

.zhuancx {
  font-size: 115.3rpx;
  color: #ffffff;
  text-align: center;
}

.zhuancx_2 {
  font-size: 59.99rpx;
  color: #ffffff;
  text-align: center;
}

.zhuancx_3 {
  font-size: 24rpx;
  color: #ffffff;
  text-align: center;
}

.guizhe {
  position: absolute;
  right: 0;
  width: 140rpx;
  height: 50rpx;
  background: rgba(253, 197, 77, 1);
  box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(119, 53, 0, 0.5);
  border-radius: 10rpx 0rpx 0rpx 10rpx;
  line-height: 50rpx;
  text-align: center;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 1);
}

.linqu {
  position: absolute;
  top: 179rpx;
  left: 240.99rpx;
  font-size: 34rpx;
  color: rgba(255, 70, 75, 1);
  z-index: 99;
}

.linqu_1 {
  position: absolute;
  top: 231rpx;
  left: 105rpx;
  font-size: 28rpx;
  color: rgba(196, 120, 50, 1);
  z-index: 99;
}

.linqu_2 {
  position: absolute;
  top: 272rpx;
  left: 104rpx;
  font-size: 28rpx;
  color: rgba(196, 120, 50, 1);
  z-index: 99;
}

.linqu_2s {
  position: absolute;
  top: 310rpx;
  left: 130rpx;
  font-size: 28rpx;
  color: rgba(196, 120, 50, 1);
  z-index: 99;
}

.linqu_3 {
  position: absolute;
  top: 356rpx;
  left: 104rpx;
  font-size: 28rpx;
  color: rgba(196, 120, 50, 1);
  z-index: 99;
}

.linqu_3s {
  position: absolute;
  top: 389rpx;
  left: 130rpx;
  font-size: 28rpx;
  color: rgba(196, 120, 50, 1);
  z-index: 99;
}

/* 解释权UI样式放置地点 */
.linqu_4 {
  position: absolute;
  top: 545rpx;
  left: 111rpx;
  width: 425rpx;
  font-size: 18rpx;
  color: rgba(196, 120, 50, 1);
  z-index: 99;
}

.liqujd {
  position: absolute;
  width: 550rpx;
  height: 160rpx;
  background: rgba(0, 0, 0, 0.3);
  /* opacity:0.4; */
  border-radius: 10rpx;
  margin: 34rpx 100rpx;
  z-index: 99;
}

.liqujd_tit {
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
  color: #ffffff;
}

.jdt {
  position: absolute;
  top: -57rpx;
  left: 4rpx;
}

.ann_linq {
  position: absolute;
  top: 750rpx;
  left: 193rpx;
  width: 368rpx;
  height: 114rpx;
  z-index: 99;
}
</style>
