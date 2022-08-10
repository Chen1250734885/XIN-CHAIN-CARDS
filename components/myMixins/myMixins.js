// 创建一个需要混入的对象
export const myMixins = {
	onLoad(){
		setTimeout(function () {
			console.log('start pulldown');
		},1000);
		uni.startPullDownRefresh({
			success:function(res) {
				console.log(res); // success 返回参数说明
			}
		}); // 这里表示当进入页面的时候就开始执行下拉刷新动画
	},
	onPullDownRefresh(){
		// 监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		console.log('refresh');
		setTimeout(function () {
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		},1000)
	}
}