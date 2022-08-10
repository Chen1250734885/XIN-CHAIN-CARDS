<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	var vm = this;
	export default {
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
			let pages = getCurrentPages()
			let page = pages[pages.length - 1];
			let currentPages = page.$getAppWebview()
			let children = currentPages.children()
			if (children.length === 0) {
				uni.navigateTo({
					url: '/pages/preview_plan/preview_plan?channel_id=' + this.channel_id + '&bc_id=' + this.card_id + '&times=' +this.bishu + '&dates=' + this.dates + '&pay_money=' + this.vale + '&had_money=' + this.zhouzhuanjine +'&c_code=' + this.c_code + '&now_time=' + this.now_time + '&schema=' + this.type + '&coupon=' + this.coupon
				})
			} else {
				// children[0].close()  
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/preview_plan/preview_plan?channel_id=' + this.channel_id + '&bc_id=' + this.card_id + '&times=' +this.bishu + '&dates=' + this.dates + '&pay_money=' + this.vale + '&had_money=' + this.zhouzhuanjine +'&c_code=' + this.c_code + '&now_time=' + this.now_time + '&schema=' + this.type + '&coupon=' + this.coupon
					})
				}, 80)
			}
			// #endif
			// #ifdef H5
			let pages1 = getCurrentPages()
			for (var i = 0; i < pages1.length; i++) {
				uni.navigateTo({
					url: '/pages/preview_plan/preview_plan?channel_id=' + this.channel_id + '&bc_id=' + this.card_id + '&times=' +this.bishu + '&dates=' + this.dates + '&pay_money=' + this.vale + '&had_money=' + this.zhouzhuanjine +'&c_code=' + this.c_code + '&now_time=' + this.now_time + '&schema=' + this.type + '&coupon=' + this.coupon
				})
			}
			// #endif
		},
		data() {
			return {
				url: '',
				channel_id: '', //支付渠道id
				card_id: '',
				bishu: 0,
				dates: '',
				vale: '',
				zhouzhuanjine: '0',
				c_code: '',
				now_time: '', //默认笔数时间
				type: 1,
				coupon: 0
			}
		},
		// onUnload() {
		// 	uni.switchTab({
		// 	    url: '/pages/index/index'
		// 	});
		// },
		onLoad(op) {
			this.url = op.url;
			this.channel_i = op.channel_id;
			this.card_id = op.bc_id;
			this.bishu = op.times;
			this.dates = op.dates;
			this.vale = op.pay_money
			this.zhouzhuanjine = op.had_money
			this.c_code = op.c_code
			this.now_time = op.now_time
			this.type = op.schema
			this.coupon = op.coupon
			console.log(op)
		}

	}
</script>

<style>
</style>
