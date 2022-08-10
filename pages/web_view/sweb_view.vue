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
				uni.redirectTo({
					url: '/pages/cloud_brush/cloud_brush2?channel_id=' + this.channel_id + '&bc_id=' + this.bc_id + '&pay_money=' + this.pay_money + '&num=' + this.num + '&coupon=' + this.coupon
				})
			} else {
				children[0].close()  
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/cloud_brush/cloud_brush2?channel_id=' + this.channel_id + '&bc_id=' + this.bc_id + '&pay_money=' + this.pay_money + '&num=' + this.num + '&coupon=' + this.coupon
					})
				}, 80)
			}
			// #endif
			// #ifdef H5
			let pages1 = getCurrentPages()
			for (var i = 0; i < pages1.length; i++) {
				uni.redirectTo({
					url: '/pages/cloud_brush/cloud_brush2?channel_id=' + this.channel_id + '&bc_id=' + this.bc_id + '&pay_money=' + this.pay_money + '&num=' + this.num + '&coupon=' + this.coupon
				})
			}
			// #endif
		},
		data() {
			return {
				url: '',
				channel_id: '', //支付渠道id
				bc_id: '',
				pay_money: '',
				num: '',
				coupon: '',
				zhouzhuanjine: '0',
				c_code: '',
				now_time: '', //默认笔数时间
				type: 1,
			}
		},
		// onUnload() {
		// 	uni.switchTab({
		// 	    url: '/pages/index/index'
		// 	});
		// },
		onLoad(op) {
			this.url = op.url;
			this.channel_id = op.channel_id
			this.bc_id = op.bc_id
			this.pay_money = op.pay_money
			this.num = op.num
			this.coupon = op.coupon
			console.log(op)
		}

	}
</script>

<style>
</style>
