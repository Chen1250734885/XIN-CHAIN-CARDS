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
				// uni.navigateBack()
				uni.redirectTo({
					url: '/pages/generation_plan/passageway?card_id=' +
						this.card_id +
						'&type=2' +
						'&card_name=' +
						this.card_name +
						'&bank_icon_url=' +
						this.tubiao +
						'&channel_id=' +
						this.channel_id +
						'&bc_effective=' +
						this.bc_effective +
						'&bc_cvn2=' +
						this.bc_cvn2 +
						'&back_img=' +
						this.back_img +
						'&card_color=' +
						this.card_color +
						'&id=' +
						this.order_id +
						'&state=' +
						this.state +
						'&schema_arr=' +
						this.schema_arr
				})
			} else {
				children[0].close()  
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/generation_plan/passageway?card_id=' +
						this.card_id +
						'&type=2' +
						'&card_name=' +
						this.card_name +
						'&bank_icon_url=' +
						this.tubiao +
						'&channel_id=' +
						this.channel_id +
						'&bc_effective=' +
						this.bc_effective +
						'&bc_cvn2=' +
						this.bc_cvn2 +
						'&back_img=' +
						this.bank_icon_url +
						'&card_color=' +
						this.card_color +
						'&id=' +
						this.order_id +
						'&state=' +
						this.state +
						'&schema_arr=' +
						this.schema_arr
					})
				}, 80)
			}
			// #endif
			// #ifdef H5
			let pages1 = getCurrentPages()
			for (var i = 0; i < pages1.length; i++) {
				uni.redirectTo({
					url: '/pages/generation_plan/passageway?card_id=' +
						this.card_id +
						'&type=2' +
						'&card_name=' +
						this.card_name +
						'&bank_icon_url=' +
						this.tubiao +
						'&channel_id=' +
						this.channel_id +
						'&bc_effective=' +
						this.bc_effective +
						'&bc_cvn2=' +
						this.bc_cvn2 +
						'&back_img=' +
						this.back_img +
						'&card_color=' +
						this.card_color +
						'&id=' +
						this.order_id +
						'&state=' +
						this.state +
						'&schema_arr=' +
						this.schema_arr
				})
			}
			// #endif
		},
		data() {
			return {
				url: '',
				channel_id: '', //支付渠道id
				bishu: 0,
				dates: '',
				vale: '',
				zhouzhuanjine: '0',
				c_code: '',
				now_time: '', //默认笔数时间
				type: 1,
				types: '',
				card_id: '',
				card_name: '',
				tubiao: '',
				card_color: '',
				card_icon: '',
				huankuanri: '',
				schema_arr: '',
				bc_cvn2: '',
				bc_effective: '',
				back_img: '',
				state: '',
				order_id: ''
			}
		},
		// onUnload() {
		// 	uni.switchTab({
		// 	    url: '/pages/index/index'
		// 	});
		// },
		onLoad(op) {
			this.url = op.url;
			this.card_id = op.card_id;
			this.types = op.type;
			this.card_name = op.card_name
			this.tubiao = op.bank_icon_url
			this.channel_id = op.channel_id
			this.card_color = op.card_color
			this.card_icon = op.card_icon
			this.huankuanri = op.huankuanri
			this.schema_arr = op.schema_arr
			this.bc_cvn2 = op.bc_cvn2;
			this.bc_effective = op.bc_effective;
			this.back_img = op.back_img;
			this.state = op.state;
			this.order_id = op.id;
			console.log(op)
		}

	}
</script>

<style>
</style>
