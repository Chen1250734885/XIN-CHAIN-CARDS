import Vue from 'vue'
import App from './App'
import req from 'graceUI/jsTools/request.js'

Vue.prototype.Goto = (url) => {
	uni.navigateTo({
		url: url,
	})
}

Vue.prototype.Back = (page_num) => {
	uni.navigateBack({
		delta: page_num
	});
}

Vue.prototype.reto = (url) => {
	uni.redirectTo({
		url: url,
	});
}

Vue.prototype.toTab = (url) => {
	uni.switchTab({
		url: url,
	});
}
Vue.prototype.each = (data, callback) => {
	if (Array.isArray(data)) {
		for (var a = 0; a < data.length; a++) {
			if (callback) {
				callback(data[a], a);
			}
		}
	} else {
		for (r in data) {
			if (callback) {
				callback(data[r], r);
			}
		}
	}
}




// 显示消息处理
// type  
// 1:下方显示我知道了按钮,点击则退出弹窗;
// 2:下方显示取消及确认按钮,点击确认则关闭当前页面并跳转至某页面,页面地址由后台返回
// 3:下方显示取消及确认按钮,点击确认则保留当前页面并跳转至某页面(可点击返回返回至当前页面),页面地址由后台返回
// 4:下方显示取消及确认按钮,点击确认则关闭当前页面并跳转至url,url地址由后台返回
// 试列:
// {
// 	content:'你好!',//提示的字体
// 	type:3,//弹窗类型
// 	showCancel:1,//是否显示取消按钮,1为是,0为否
// 	page:'/pages/index/index',//跳转的页面地址,不需要时请传:''
// 	url:'www.baidu.com',//跳转的url网址,不需要时请传:''
// }
Vue.prototype.msg_show = (msg) => {
	if (typeof msg === 'object') {
		if (msg.type === 1) {
			uni.showModal({
				content: msg.content,
				// showCancel:msg.showCancel===0?false:true,
				showCancel: false,
				confirmText: '知道了',
			});
		} else if (msg.type === 2) {
			uni.showModal({
				content: msg.content,
				showCancel: msg.showCancel === 0 ? false : true,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.redirectTo({
							url: msg.page,
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		} else if (msg.type === 3) {
			uni.showModal({
				content: msg.content,
				showCancel: msg.showCancel === 0 ? false : true,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.navigateTo({
							url: msg.page,
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		} else if (msg.type === 4) {
			uni.showModal({
				content: msg.content,
				showCancel: msg.showCancel === 0 ? false : true,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.redirectTo({
							url: '/pages/web_view/web_view?url=' + msg.url + '?token=' + uni
								.getStorageSync('user_token'),
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	} else if (typeof msg === 'string') {
		uni.showToast({
			title: msg,
			icon: "none"
		});
	}
}
// ---显示消息处理


module.exports = {
	msg_show(msg) {
		if (typeof msg === 'object') {
			if (msg.type === 1) {
				uni.showModal({
					content: msg.content,
					// showCancel:msg.showCancel===0?false:true,
					showCancel: false,
					confirmText: '知道了',
				});
			} else if (msg.type === 2) {
				uni.showModal({
					content: msg.content,
					showCancel: msg.showCancel === 0 ? false : true,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.redirectTo({
								url: msg.page,
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			} else if (msg.type === 3) {
				uni.showModal({
					content: msg.content,
					showCancel: msg.showCancel === 0 ? false : true,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateTo({
								url: msg.page,
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			} else if (msg.type === 4) {
				uni.showModal({
					content: msg.content,
					showCancel: msg.showCancel === 0 ? false : true,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.redirectTo({
								url: '/pages/web_view/web_view?url=' + msg.url + '?token=' + uni
									.getStorageSync('user_token'),
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		} else if (typeof msg === 'string') {
			uni.showToast({
				title: msg,
				icon: "none"
			});
		}
	}
}
Vue.prototype.lochost = "https://www.yihuanpay.com/api"

Vue.prototype.req = req
Vue.prototype.sys = uni.getSystemInfoSync();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
