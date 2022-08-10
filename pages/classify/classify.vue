<template>
  <view class="content">
    <!-- 头部 -->
    <view class="ui-car-name-list">
      <view
        class="ui-car-name-item"
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ active: currentIndex == index }"
        :data-current="index"
        @tap="tabChange"
        >{{ item }}</view
      >
      <!-- 这里的v-for缺少一个key值 -->
    </view>
    <swiper
      style="width: 750rpx"
      :style="{ height: height }"
      class="swiper"
      :current="currentIndex"
      @change="swiperChange"
    >
      <swiper-item
        class="demo"
        v-for="(item1, index1) in sellds_list"
        :key="index1"
      >
        <scroll-view
          class="grace-scroll-y"
          scroll-y
          :style="{ height: height }"
        >
          <view v-for="(item2, index2) in item1.data" :key="index2">
            <view class="cehuis">
              <view>
                <image :src="item2.img" mode="" class="imgsa"></image>
                <text class="stes">{{
                  item2.is_sell == 2 ? "审核中" : "挂卖中"
                }}</text>
                <view class="bianhs">No.{{ item2.number }}</view>
              </view>
              <view>
                <view style="margin-right: 24rpx; margin-top: 10rpx">
                  <text
                    style="
                      text-decoration: line-through;
                      color: rgba(36, 131, 245, 1);
                      font-size: 22rpx;
                      margin-right: 10rpx;
                    "
                    >￥{{ item2.old_money }}</text
                  >
                  <text style="color: rgba(238, 16, 16, 1); font-size: 28rpx"
                    >￥{{ item2.sell_money }}</text
                  >
                </view>
                <view class="ann_cehui" @tap="cehuib(item2.card_id)">
                  <text>撤回</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <!-- 客服帮助 -->
    <view class="kef_s" @tap="qiaozhuandaokehu">
      <image
        :style="'left:' + moveX + 'px;top:' + moveY + 'px'"
        @touchstart="drag_start"
        @touchmove.prevent="drag_hmove"
        src="../../static2/kefs.png"
        mode=""
        style="width: 152rpx; height: 79rpx; transform: translate(4rpx, 4rpx)"
      ></image>
    </view>
  </view>
</template>

<script>
import graceNavBar from "../../graceUI/components/graceNavBar.vue";
export default {
  data () {
    return {
      currentIndex: 1,
      tabs: ['交易市场', '我的交易'],
      height: '',
      sellds: [],
      start: [0, 0],
      moveY: 0,
      moveX: 0,
      windowWidth: '',
      windowHeight: '',
    }
  },
  onLoad (opt) {
    console.log(opt);
    const {
      windowWidth,
      windowHeight
    } = uni.getSystemInfoSync();
    this.windowWidth = windowWidth
    this.windowHeight = windowHeight
  },
  methods: {
    drag_start (event) {
      this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
      this.start[1] = event.touches[0].clientY - event.target.offsetTop;
    },
    drag_hmove (event) {
      let tag = event.touches;
      if (tag[0].clientX < 0) {
        tag[0].clientX = 0
      }
      if (tag[0].clientY < 0) {
        tag[0].clientY = 0
      }
      if (tag[0].clientX > this.windowWidth) {
        tag[0].clientX = this.windowWidth
      }
      if (tag[0].clientY > this.windowHeight) {
        tag[0].clientY = this.windowHeight
      }
      this.moveX = tag[0].clientX - this.start[0];
      this.moveY = tag[0].clientY - this.start[1];
    },
    qiaozhuandaokehu () {
      uni.navigateTo({
        url: '/pages/Last_page/Custome_services'
      })
    },
    tabChange (e) {
      this.currentIndex = e.target.dataset.current;
      // console.log(e);
    },
    swiperChange (e) {
      var index = e.target.current;
      this.currentIndex = index;
      // console.log(e);
    },
    My_sell () {
      var vm = this
      this.sellds = [];
      this.height = (this.sys.safeArea.height - 48) + 'px';
      vm.req.post(
        vm.lochost + '/index/index?method=sell_card_list', {
        page: 1,
        size: 5
      }, {}, function (res) {
        console.log(res);
        vm.sellds.push({
          data: res.data.data,
          name: '交易中心'
        })
        vm.req.post(
          vm.lochost + '/index/index?method=my_sell_card', {
          page: 1,
          size: 10
        }, {},
          function (res) {
            console.log(res);
            vm.sellds.push({
              data: res.data.data,
              name: '我的交易'
            })
          }
        )
      }
      )
    },
    cehuib (card_id) {
      console.log(card_id);
      var vm = this
      vm.req.post(
        vm.lochost + '/index/index?method=cancel_sell_card', {
        card_id: card_id
      }, {}, function (res) {
        console.log(res);
        if (res.code == 200) {
          vm.My_sell()
          setTimeout(function () {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
          }, 500)

        }
      }
      )
    }
  },
  onShow: function () {
    this.My_sell();
  },
  components: {
    graceNavBar
  },
  computed: {
    sellds_list () {
      return this.sellds;
    }
  }
}
</script>

<style>
.kef_s {
  position: absolute;
  top: 450rpx;
  left: 598rpx;
  z-index: 9999;
  float: right;
}
.ui-car-name-list {
  width: 750rpx;
  height: 87rpx;
  background-color: rgba(36, 131, 245, 1);
}
.ui-car-name-item {
  width: 140rpx;
  height: 83rpx;
  display: inline-block;
  color: #ffffff;
  font-size: 30rpx;
  margin-left: 150rpx;
}
.active {
  border-bottom: 5rpx solid #ffffff;
  line-height: 85rpx;
}
.cehuis {
  width: 750rpx;
  height: 120rpx;
  background-color: #ffffff;
  margin-top: 10rpx;
  display: flex;
  justify-content: space-between;
}
.imgsa {
  display: inline-block;
  width: 156rpx;
  height: 80rpx;
  margin-left: 24rpx;
  margin-top: 10rpx;
  border-radius: 5rpx;
}
.bianhs {
  font-size: 22rpx;
  color: rgba(153, 153, 153, 1);
  margin-top: -10rpx;
  margin-left: 24rpx;
}
.stes {
  font-size: 30rpx;
  color: rgba(255, 96, 0, 1);
  /* position: absolute;
		top: 40rpx;
		left: 202rpx; */
  position: relative;
  margin-left: 20rpx;
  top: -25rpx;
}
.ann_cehui {
  width: 140rpx;
  height: 50rpx;
  border-radius: 10rpx;
  border: 1rpx solid rgba(238, 16, 16, 1);
  font-size: 22rpx;
  line-height: 50rpx;
  text-align: center;
  color: rgba(238, 16, 16, 1);
  margin-left: 50rpx;
  margin-top: 10rpx;
}
</style>
