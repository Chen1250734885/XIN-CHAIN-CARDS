<template>
  <gracePage :customHeader="false">
    <view slot="gBody">
      <view
        class="grace-space-between"
        style="margin-top: 16rpx; padding: 0 24rpx"
      >
        <view
          class="grace-flex-center"
          style="
            background-image: url(../../static/jindutiao1.png);
            background-repeat: no-repeat;
            width: 230rpx;
            height: 40rpx;
            background-size: contain;
          "
        >
          <text
            style="
              font-size: 28rpx;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            "
            >1.卡号信息</text
          >
        </view>
        <view
          class="grace-flex-center"
          style="
            background-image: url(../../static/jindutiao1.png);
            background-repeat: no-repeat;
            width: 230rpx;
            height: 40rpx;
            background-size: contain;
          "
        >
          <text
            style="
              font-size: 28rpx;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            "
            >2.安全码</text
          >
        </view>
        <view
          class="grace-flex-center"
          style="
            background-image: url(../../static/jindutian.png);
            background-repeat: no-repeat;
            width: 230rpx;
            height: 40rpx;
            background-size: contain;
          "
        >
          <text
            style="
              font-size: 28rpx;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            "
            >3.还款日/账单日</text
          >
        </view>
      </view>

      <view class="grace-flex-center" style="width: 750rpx; margin-top: 40rpx">
        <view>
          <image
            src="../../static/yuliushouji.png"
            style="width: 544rpx; height: 328rpx"
          ></image>
        </view>
      </view>

      <view class="grace-rows grace-flex-center" style="margin-top: 25rpx">
        <text
          style="
            margin-left: 20rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          "
          >忘记预留手机号码，请联系银行客服处理</text
        >
      </view>

      <view style="margin-top: 35rpx">
        <view
          class="grace-rows grace-flex-vcenter"
          style="
            width: 750rpx;
            height: 100rpx;
            background: rgba(255, 255, 255, 1);
          "
        >
          <text
            style="
              margin-left: 35rpx;
              font-size: 28rpx;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            "
            >预留手机：</text
          >
          <input
            type="number"
            v-model="bc_mobile"
            placeholder="请输入银行预留手机号码"
            style="margin-left: 60rpx; width: 500rpx; font-size: 24rpx"
          />
        </view>
        <view
          @tap="toggleTab('还款日')"
          class="grace-rows grace-flex-vcenter"
          style="
            margin: 3rpx 0;
            width: 750rpx;
            height: 100rpx;
            background: rgba(255, 255, 255, 1);
          "
        >
          <text
            style="
              margin-left: 35rpx;
              font-size: 28rpx;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            "
            >还款日：</text
          >
          <text
            style="
              text-align: center;
              width: 500rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 60px;
            "
            >{{ bc_repayment_name }}</text
          >
          <image
            src="../../static/jiantou.png"
            style="width: 13rpx; height: 24rpx"
          ></image>
          <!-- <input type="number" v-model="bc_repayment" @input="yanzheng" placeholder="请输入还款日" style="margin-left: 60rpx;width: 500rpx"/> -->
        </view>
        <!-- <view style="width:530rpx;height:1rpx;background:#CCCCCC; margin-left: 158rpx;transform: translateY(-23rpx);"></view> -->
        <view
          @tap="toggleTab('账单日')"
          class="grace-rows grace-flex-vcenter"
          style="
            width: 750rpx;
            height: 100rpx;
            background: rgba(255, 255, 255, 1);
          "
        >
          <text
            style="
              margin-left: 35rpx;
              font-size: 28rpx;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            "
            >账单日：</text
          >
          <text
            style="
              text-align: center;
              width: 500rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 60px;
            "
            >{{ bc_bill_name }}</text
          >
          <image
            src="../../static/jiantou.png"
            style="width: 13rpx; height: 24rpx"
          ></image>
          <!-- <input type="number" v-model="bc_bill" @input="yanzheng" placeholder="请输入账单日" style="margin-left: 60rpx;width: 500rpx"/> -->
        </view>
        <!-- <view style="width:530rpx;height:1rpx;background:#CCCCCC; margin-left: 158rpx;transform: translateY(-23rpx);"></view> -->

        <view style="margin-top: 10rpx; margin-left: 30rpx">
          <text
            style="
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            "
            >*如账单日判断有误请手动调整。</text
          >
        </view>
        <view style="margin-top: -2rpx; margin-left: 30rpx">
          <text
            style="
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            "
            >*还款日是你必须偿还当期账单金额的最后期限。
          </text>
          <view style="margin-top: -10rpx; margin-left: 10rpx">
            <text style="font-size: 24rpx; font-weight: 400; color: #999999"
              >账单日就是当期所有消费最终生成账单的日期。</text
            >
          </view>
        </view>
      </view>
      <view>
        <button
          @tap="submit"
          style="
            margin-top: 70rpx;
            width: 500rpx;
            height: 90rpx;
            background: #1678ff;
            box-shadow: 0px 2rpx 5rpx 0px rgba(67, 67, 67, 0.3);
            border-radius: 20rpx;
            font-size: 32rpx;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          "
        >
          确认添加
        </button>
      </view>
      <w-picker
        mode="selector"
        defaultVal="每月1日"
        @confirm="onConfirm"
        ref="selector"
        themeColor="#f00"
        :selectList="selectList"
      ></w-picker>
      <w-picker
        mode="selector"
        defaultVal="每月13日"
        @confirm="onConfirm"
        ref="selectors"
        themeColor="#f00"
        :selectList="selectList"
      ></w-picker>
    </view>
  </gracePage>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
import gracePage from "../../graceUI/components/gracePage.vue";
export default {
  data () {
    return {
      edu: '',
      bc_bank_id: '',
      bc_bank_number: '',
      bc_cvn2: '',
      bc_effective: '',
      tubiao: '',
      bc_mobile: '', //预留手机
      bc_repayment_name: '请选择还款日期', //还款日名字
      bc_bill_name: '请选择账单日期', //账单日名字
      bc_repayment: '', //还款日
      bc_bill: '', //账单日
      dianji_tpye: '', //用来判断点击的是账单日还是还款日
      selectList: [{
        label: "每月1日",
        value: 1
      }, {
        label: "每月2日",
        value: 2
      }, {
        label: "每月3日",
        value: 3
      }, {
        label: "每月4日",
        value: 4
      }, {
        label: "每月5日",
        value: 5
      }, {
        label: "每月6日",
        value: 6
      }, {
        label: "每月7日",
        value: 7
      }, {
        label: "每月8日",
        value: 8
      }, {
        label: "每月9日",
        value: 9
      }, {
        label: "每月10日",
        value: 10
      }, {
        label: "每月11日",
        value: 11
      },
      {
        label: "每月12日",
        value: 12
      }, {
        label: "每月13日",
        value: 13
      }, {
        label: "每月14日",
        value: 14
      }, {
        label: "每月15日",
        value: 15
      }, {
        label: "每月16日",
        value: 16
      }, {
        label: "每月17日",
        value: 17
      }, {
        label: "每月18日",
        value: 18
      }, {
        label: "每月19日",
        value: 19
      }, {
        label: "每月20日",
        value: 20
      }, {
        label: "每月21日",
        value: 21
      },
      {
        label: "每月22日",
        value: 22
      }, {
        label: "每月23日",
        value: 23
      }, {
        label: "每月24日",
        value: 24
      }, {
        label: "每月25日",
        value: 25
      }, {
        label: "每月26日",
        value: 26
      }, {
        label: "每月27日",
        value: 27
      }, {
        label: "每月28日",
        value: 28
      }, {
        label: "每月29日",
        value: 29
      }, {
        label: "每月30日",
        value: 30
      }, {
        label: "每月31日",
        value: 31
      }
      ],
    }
  },
  onLoad (opt) {
    // this.bc_repayment_name = '每月30日';
    // this.bc_bill_name = '每月12日';
    // this.bc_repayment = '30';
    // this.bc_bill = '12';
    console.log(opt);
    this.bc_bank_id = opt.bc_bank_id;
    this.bc_bank_number = opt.bc_bank_number;
    this.bc_cvn2 = opt.bc_cvn2;
    this.bc_effective = opt.bc_effective;
    this.edu = opt.edu
    this.tubiao = opt.tubiao;
  },
  components: {
    gracePage,
    wPicker
  },
  methods: {
    toggleTab (dianji_tpye) {
      console.log(dianji_tpye);
      if (dianji_tpye == '还款日') {
        this.dianji_tpye = dianji_tpye;
        this.$refs['selector'].show();
      } else {
        this.dianji_tpye = dianji_tpye;
        this.$refs['selectors'].show();
      }

    },
    onConfirm (val) {
      if (this.dianji_tpye === '账单日') {
        this.bc_bill_name = val.checkArr.label;
        // console.log(val.checkArr.value);
        this.bc_bill = val.checkArr.value;
      } else if (this.dianji_tpye === '还款日') {
        this.bc_repayment_name = val.checkArr.label;
        this.bc_repayment = val.checkArr.value;
      }
    },
    submit () {
      var vm = this;
      if (this.bc_mobile === '' || this.bc_repayment === '' || this.bc_bill === '') {
        this.msg_show('请将信息填写完整！');
      } else {
        this.req.post(
          this.lochost + '/index/index?method=add_credit', {
          bank_id: this.bc_bank_id,
          bank_card: this.bc_bank_number,
          bank_tel: this.bc_mobile,
          cvn2: this.bc_cvn2,
          effective: this.bc_effective,
          bill: this.bc_bill,
          repayment: this.bc_repayment,
          sms_code: '',
          bank_card_img: this.tubiao
        }, {},
          function (res) {
            vm.msg_show(res.msg);
            setTimeout(function () {
              uni.navigateBack({
                url: '/pages/card_bag/card_bag'
              });
            }, 500)


          }
        )
      }
    },
    // 优化-->通过修改正则表达式中对于手机号码长度验证
    yanzheng (event) {
      // var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/; --> 原代码
      var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      //正整数 reg = /^[1-9]+[0-9]*]*$/ 
      if (event.target.value == "" || reg.test(event.target.value) == true) {
        this.msg_show('请输入数字！')
      } else {

      }
    }
  }
}
</script>

<style>
</style>
