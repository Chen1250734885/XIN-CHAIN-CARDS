# 一刷通目录结构(2022.8.9)

## components文件夹(插件库)

- [bory-dateTimePicker]: https://www.datetimepicker.cn/intro/	"DateTimePicker是基于JQuery的时间日期选择插件。"

- [cmd-circle]: https://ext.dcloud.net.cn/plugin?id=965	"用圈显示一个操作完成的百分比时，为用户显示该操作的当前进度和状态。"

- [cmd-progress]: https://ext.dcloud.net.cn/plugin?id=259	"显示一个操作完成的百分比时，为用户显示该操作的当前进度和状态。"

- [dn-icon/dn-icon_1.2]: https://iconscout.com/icons/dn	"icon图标库和修改icon图标样式"

- [ei-calendar]: https://ext.dcloud.net.cn/plugin?id=452	"微信小程序日历组件"

- min-popup

- [phone-directory]: https://ext.dcloud.net.cn/plugin?id=121	"通讯录城市索引列表，带搜索功能，可用于通讯录 城市索引列表等(原UI有bug)"

- [uni-popup]: https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html	"弹层组件"

- [uni-transition]: https://uniapp.dcloud.net.cn/component/uniui/uni-transition.html	"Transition过渡动画"

- [w-picker]: https://ext.dcloud.net.cn/plugin?id=273	"日期、时间、多级联动picker"

- [xfl-select]: https://ext.dcloud.net.cn/plugin?id=518	"模拟select标签--下拉选项"

- [yangxiaochuang-icons]: https://ext.dcloud.net.cn/plugin?id=846	"扩充了官方的图标和解决了官方图标无法正常显示问题，图标本地化处理"

- [graceUI]: https://ext.dcloud.net.cn/plugin?id=4875	"Grace Animation Library ( 简写 ： GAL ) 是 GraceUI 团队为 uni-app 打造的一款 免费、开源的动画库。使用它可以方便的实现开发过程中所需的各类动画效果。"

- QuShe-SharerPoster -- 实现海报 通过base64实现存储

## pages文件夹

### add_credit_card(添加信用卡)

- (预留手机号码没做11位数字验证)

- add_credit_card1 -- 添加信用卡(第一个页面--卡号信息)

  - ~~~
    data:数据类型
    				id_card_img: '',	
    				card_img_id: '',	
    				fakahangid: '',		
    				fakahangname: '',
    				xinyongkahao: '',
    				youxiaoqi_M: '',
    				youxiaoqi_Y: '',
    				M_jujiao: false,
    				Y_jujiao: false,
    				show_youxiaoqi: '',
    				Y_len: 0,
    				xiangjishuoming: '请点击卡片上传图片',
    				edu: '',
    				types: '',
    				date: '',
    				dates: ''
    ~~~

- add_credit_card2 -- 安全码(第二个页面--安全码的验证)

- add_credit_card3 -- 信用卡的还款日/账单日

### add_savings_card(添加储蓄卡)

- (预留手机号码没做11位数字验证)
- add_savings_card -- 添加储蓄卡详细信息(填写卡号和预留电话)

### allowance(津贴模块)--未使用

### authentication(认证模块)

- authentication1(实名认证)

  <img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%AE%9E%E5%90%8D%E8%AE%A4%E8%AF%81.png" alt="身份证实名认证" style="zoom:80%;" />

- authentication2(储蓄卡认证)

- modify_real_name(实名认证的修改页面)

- non_real_name(未实名认证的login页面+跳转实名)

- real_name(显示实名认证的确认信息(我的页面点进去默认页))

### buy_coupons(购买优惠卷)

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%5Bid%E5%8F%82%E6%95%B0%E7%BC%BA%E5%A4%B1%5D.png" alt="image-20220810162826916" style="zoom: 80%;" />

### card_bag(储蓄卡/信用卡--修改/删除)

- card_bag(添加储蓄卡页面)
- Credit_unbund(删除信用卡页面)
- modify_credit_card(修改信用卡信息页面)
- modify_savings_card(修改储蓄卡信息 (银行卡卡号识别做了逻辑交互了 console.log --> 123  at pages/card_bag/modify_savings_card.vue:134))
- Unbundling(删除储蓄卡) --> 功能测试没问题

### card_keeper(信用卡管家)

- card_keeper(信用卡管家)
- card_shanchu(删除信用卡)

### classify(交易中心)

- classify(前端有部分代码，但是是空白页)
  - 目前做法是在pages.json中暂时注释

### cloud_brush(极速云刷)

- brush_voucher/yunshu_voucher(抵用券选择)
- cloud_brush1(极速云刷-->![image-20220810173503629](https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/202208101737405.png))
- cloud_brush2(极速云刷-->![image-20220810173639406](https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/202208101737378.png))
- Use_details(抵扣余额明细)

### credit_card_record(云刷记录)

### details_plans(还款计划)--未使用

### Download_page(宣传图)--未使用

### forget_password(忘记密码)

### generation_plan(--智能还款)

- details_of_previous_plans(计划详情)
- details_of_the_plan(还款计划)
- generation_plan(生成计划)
- passageway(通道)
- payment_history(往期记录)

### Huabei_collection(花呗)--未使用

### index(首页)

- Card_Application(信用卡列表)
- index(首页-login)

### issuer_selection

- issuer_selection(选择发卡行)
- phone-seach(搜索银行)

### Last_page

- Change_password(安全设置--登录密码-->修改密码)
- Custome_service(联系客服)
- Custome_services(人工客服-->实现对话功能(没有使用))
- Security(修改密码页面)

### login(登录页)

### modify_ims

- information(修改卡信息)

### personal_center(个人中心)

- About_us(关于我们-->使用教程(需要调整页面内容))
- card_coupon(会员卡/**优惠卷**未使用)
- card_coupon_zhuanrang(抵用券转让)
- card_coupon2(抵用券-->**未使用**/已使用)
- deduction(抵扣劵明细)
- Limited_activities(限时活动)

## UI样式问题

银行卡选择发卡行UI没有问题

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E9%93%B6%E8%A1%8C%E5%8D%A1%E9%80%89%E6%8B%A9%E5%8F%91%E5%8D%A1%E8%A1%8C.png" alt="银行卡发卡行" style="zoom:80%;" />

信用卡选择发卡行UI样式有问题

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E4%BF%A1%E7%94%A8%E5%8D%A1%E5%8F%91%E5%8D%A1%E8%A1%8C%E5%88%97%E8%A1%A8.png" alt="信用卡发卡行列表" style="zoom:80%;" />

![image-20220809172735364](https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/phone-list%E6%A0%B7%E5%BC%8F(%E4%BB%A3%E7%A0%81).png)

![image-20220809172809505](https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E4%BF%AE%E6%94%B9%E5%AE%8C%E7%9A%84.png)

分享二维码模块下的二维码绘制图片位置有问题(二维码通过uniapp的canvas画布绘制)

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E5%88%86%E4%BA%AB%E4%BA%8C%E7%BB%B4%E7%A0%81.png" alt="image-20220810103412454" style="zoom:80%;" />

目前效果：实现iPhoneX系列+位置正确

- iPhone X

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/iPhone%20X.png" alt="image-20220810174031245" style="zoom:67%;" />

- iPhone XS Max

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/iPhone%20XS%20Max.png" alt="image-20220810174111418" style="zoom:67%;" />

https://v5.rabbitpre.com/m2/aUe1ZjWhPt#166019931730300

使用教程(需要调整里面的具体内容)

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.png" alt="image-20220811142923923" style="zoom:80%;" />

调整样式

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E9%A6%96%E9%A1%B5indexUI%E6%A0%B7%E5%BC%8F%E8%B0%83%E6%95%B4.png" alt="image-20220812165400430" style="zoom: 80%;" />

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E6%94%B6%E7%9B%8A%E9%A1%B5%E9%9D%A2UI%E6%A0%B7%E5%BC%8F%E8%B0%83%E6%95%B4.png" alt="image-20220812165610099" style="zoom:80%;" />

<img src="https://chenwei-blog-1301583529.cos.ap-chengdu.myqcloud.com/%E6%88%91%E7%9A%84login%E9%A1%B5%E9%9D%A2%E4%BF%AE%E6%94%B9UI%E5%B8%83%E5%B1%80%E8%B0%83%E6%95%B4.png" alt="image-20220812165801350" style="zoom:80%;" />