
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/personal_center/personal_centers","pages/profit/profit","pages/share/share","pages/classify/classify","pages/personal_center/change_password","pages/profit/Xinka_record","pages/Last_page/Custome_service","pages/Last_page/Custome_services","pages/personal_center/About_us","pages/personal_center/Limited_activities","pages/index/Card_Application","pages/Last_page/Change_password","pages/Last_page/Security","pages/buy_coupons/buy_coupons","pages/cloud_brush/cloud_brush1","pages/cloud_brush/brush_voucher","pages/cloud_brush/yunshu_voucher","pages/cloud_brush/Use_details","pages/cloud_brush/cloud_brush2","pages/web_view/web_view","pages/web_view/web_views","pages/web_view/webs_view","pages/web_view/sweb_view","pages/souxin_view/souxin_view","pages/register/register","pages/forget_password/forget_password","pages/login/login","pages/card_keeper/card_keeper","pages/card_keeper/card_shanchu","pages/authentication/authentication1","pages/authentication/real_name","pages/authentication/authentication2","pages/authentication/non_real_name","pages/authentication/modify_real_name","pages/generation_plan/passageway","pages/card_bag/card_bag","pages/personal_center/card_coupon","pages/personal_center/materials","pages/add_savings_card/add_savings_card","pages/issuer_selection/issuer_selection","pages/issuer_selection/phone-search","pages/add_credit_card/add_credit_card1","pages/add_credit_card/add_credit_card2","pages/add_credit_card/add_credit_card3","pages/generation_plan/generation_plan","pages/generation_plan/details_of_the_plan","pages/personal_center/card_coupon2","pages/allowance/allowance1","pages/personal_center/card_coupon_zhuanrang","pages/personal_center/deduction","pages/allowance/allowance","pages/allowance/allowance2","pages/credit_card_record/credit_card_record","pages/transaction_details/transaction_details","pages/preview_plan/preview_plan","pages/card_bag/modify_savings_card","pages/card_bag/Unbundling","pages/card_bag/Credit_unbund","pages/card_bag/modify_credit_card","pages/profit/cash_withdrawal","pages/profit/withdrawals_record","pages/profit/Details_activated","pages/profit/New_today","pages/profit/Consumed","pages/profit/Continued_use","pages/profit/income_details","pages/profit/Xinka","pages/profit/Use_file","pages/generation_plan/payment_history","pages/generation_plan/details_of_previous_plans","pages/update/update","pages/rise_vip/rise_vip","pages/rise_vip/shuyintai","pages/rise_vip/shuyintais","pages/shouxin/shouxin_huaikuai","pages/Repayment/Repayment_plan","pages/Details_plan/details_plans","pages/Past_period/PastPeriod_plan","pages/modify_ims/information","pages/Picture_seriously/seriously","pages/Download_page/Download_page","pages/My_merchants/my_merchants","pages/Huabei_collection/Huabei_collection","pages/Huabei_collection/Huabei_record","pages/Huabei_collection/Huabei_details","pages/share/share_qr_code","pages/share/share_ios_code"],"tabBar":{"color":"#DBDBDB","borderStyle":"white","backgroundColor":"rgba(255,255,255,1)","list":[{"pagePath":"pages/index/index","iconPath":"static/tabbar/9c5c55ac0ceb2ae3f2c28b102b740a9a.png","selectedIconPath":"static/tabbar/shouye.png","text":"首页"},{"pagePath":"pages/profit/profit","iconPath":"static/tabbar/005420618619cc9a2c17b437d9cd27ac.png","selectedIconPath":"static/tabbar/b46c821a5f9e4a1c07e96bccfbb019e1.png","text":"收益"},{"pagePath":"pages/share/share","iconPath":"static/tabbar/e79efcb5a9e8c92cdeecc44325b70d2d.png","selectedIconPath":"static/tabbar/8ff7187c6b38b2a3aead7f868f2f79cf.png","text":"分享"},{"pagePath":"pages/personal_center/personal_centers","iconPath":"static/tabbar/07a373657535dd223827b5f565490d6d.png","selectedIconPath":"static/tabbar/myd.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"一刷通","compilerVersion":"3.5.3","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false,"bounce":"none","scrollIndicator":"none","navigationStyle":"custom","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/personal_center/personal_centers","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":true,"bounce":"none","scrollIndicator":"none","navigationStyle":"default","navigationBarTitleText":"我的","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/profit","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false,"enablePullDownRefresh":true,"bounce":"none","scrollIndicator":"none","navigationStyle":"custom","pullToRefresh":{"color":"#1678FF"}}},{"path":"/pages/share/share","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":true,"bounce":"none","scrollIndicator":"none","navigationStyle":"default","navigationBarTitleText":"分享","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/classify/classify","meta":{},"window":{"titleNView":true,"bounce":"none","scrollIndicator":"none","navigationStyle":"default","navigationBarTitleText":"交易中心","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/personal_center/change_password","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/profit/Xinka_record","meta":{},"window":{"navigationBarTitleText":"一刷通记录","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/Last_page/Custome_service","meta":{},"window":{"navigationBarTitleText":"联系客服","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/Last_page/Custome_services","meta":{},"window":{"navigationBarTitleText":"人工客服","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/personal_center/About_us","meta":{},"window":{"navigationBarTitleText":"关于我们","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/personal_center/Limited_activities","meta":{},"window":{"navigationBarTitleText":"限时活动","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/index/Card_Application","meta":{},"window":{"navigationBarTitleText":"申请信用卡","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/Last_page/Change_password","meta":{},"window":{"navigationBarTitleText":"安全设置","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/Last_page/Security","meta":{},"window":{"navigationBarTitleText":"修改密码","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/buy_coupons/buy_coupons","meta":{},"window":{"navigationBarTitleText":"购买优惠券","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/cloud_brush/cloud_brush1","meta":{},"window":{"navigationBarTitleText":"T+0到账","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/cloud_brush/brush_voucher","meta":{},"window":{"navigationBarTitleText":"抵用券选择","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/cloud_brush/yunshu_voucher","meta":{},"window":{"navigationBarTitleText":"抵用券选择","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/cloud_brush/Use_details","meta":{},"window":{"navigationBarTitleText":"抵扣余额明细","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/cloud_brush/cloud_brush2","meta":{},"window":{"navigationBarTitleText":"T+0到账","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/web_view/web_view","meta":{},"window":{"navigationBarBackgroundColor":"#2483F5","titleNView":{"autoBackButton":"true","buttons":[{"type":"close"}]}}},{"path":"/pages/web_view/web_views","meta":{},"window":{"navigationBarBackgroundColor":"#2483F5","titleNView":{"autoBackButton":"false","buttons":[{"type":"close"}]}}},{"path":"/pages/web_view/webs_view","meta":{},"window":{"navigationBarBackgroundColor":"#2483F5","titleNView":{"autoBackButton":"false","buttons":[{"type":"close"}]}}},{"path":"/pages/web_view/sweb_view","meta":{},"window":{"navigationBarBackgroundColor":"#2483F5","titleNView":{"autoBackButton":"false","buttons":[{"type":"close"}]}}},{"path":"/pages/souxin_view/souxin_view","meta":{},"window":{"navigationBarTitleText":"使用教程","navigationBarBackgroundColor":"#2483F5","titleNView":{"autoBackButton":"true"}}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/forget_password/forget_password","meta":{},"window":{"navigationBarTitleText":"忘记密码","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/login/login","meta":{},"window":{"titleNView":false,"bounce":"none","scrollIndicator":"none","navigationStyle":"custom"}},{"path":"/pages/card_keeper/card_keeper","meta":{},"window":{"navigationBarTitleText":"信用卡管家","navigationBarBackgroundColor":"#1678FF","enablePullDownRefresh":true,"pullToRefresh":{"color":"#1678FF"}}},{"path":"/pages/card_keeper/card_shanchu","meta":{},"window":{"navigationBarTitleText":"删除信用卡","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/authentication/authentication1","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/authentication/real_name","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/authentication/authentication2","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/authentication/non_real_name","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/authentication/modify_real_name","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/generation_plan/passageway","meta":{},"window":{"navigationBarTitleText":"通道","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/card_bag/card_bag","meta":{},"window":{"titleNView":false,"titleSize":30,"bounce":"none","scrollIndicator":"none","navigationStyle":"custom"}},{"path":"/pages/personal_center/card_coupon","meta":{},"window":{"titleNView":true,"bounce":"none","scrollIndicator":"none","navigationStyle":"custom","navigationBarTitleText":"我的"}},{"path":"/pages/personal_center/materials","meta":{},"window":{"navigationBarTitleText":"编辑资料","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/add_savings_card/add_savings_card","meta":{},"window":{"navigationBarTitleText":"添加储蓄卡","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/issuer_selection/issuer_selection","meta":{},"window":{"navigationBarTitleText":"选择发卡行","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/issuer_selection/phone-search","meta":{},"window":{"navigationBarTitleText":"搜索银行","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/add_credit_card/add_credit_card1","meta":{},"window":{"navigationBarTitleText":"添加信用卡","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/add_credit_card/add_credit_card2","meta":{},"window":{"navigationBarTitleText":"添加信用卡","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/add_credit_card/add_credit_card3","meta":{},"window":{"navigationBarTitleText":"添加信用卡","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/generation_plan/generation_plan","meta":{},"window":{"navigationBarTitleText":"生成计划","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/generation_plan/details_of_the_plan","meta":{},"window":{"navigationBarTitleText":"还款计划","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/personal_center/card_coupon2","meta":{},"window":{"navigationBarTitleText":"抵用卷","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/allowance/allowance1","meta":{},"window":{"navigationBarTitleText":"抵用卷选择"}},{"path":"/pages/personal_center/card_coupon_zhuanrang","meta":{},"window":{"navigationBarTitleText":"抵用卷转让","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/personal_center/deduction","meta":{},"window":{"navigationBarTitleText":"抵用券明细","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/allowance/allowance","meta":{},"window":{"navigationBarTitleText":"抵用券选择"}},{"path":"/pages/allowance/allowance2","meta":{},"window":{"navigationBarTitleText":"抵用券选择"}},{"path":"/pages/credit_card_record/credit_card_record","meta":{},"window":{"navigationBarTitleText":"云刷记录","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/transaction_details/transaction_details","meta":{},"window":{"navigationBarTitleText":"交易详情","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/preview_plan/preview_plan","meta":{},"window":{"navigationBarTitleText":"预览计划","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/card_bag/modify_savings_card","meta":{},"window":{"navigationBarTitleText":"修改储蓄卡","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/card_bag/Unbundling","meta":{},"window":{"navigationBarTitleText":"删除储蓄卡","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/card_bag/Credit_unbund","meta":{},"window":{"navigationBarTitleText":"删除信用卡","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/card_bag/modify_credit_card","meta":{},"window":{"navigationBarTitleText":"修改信用卡","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/cash_withdrawal","meta":{},"window":{"navigationBarTitleText":"余额提现","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/profit/withdrawals_record","meta":{},"window":{"navigationBarTitleText":"提现记录","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/profit/Details_activated","meta":{},"window":{"navigationBarTitleText":"活跃用户","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/New_today","meta":{},"window":{"navigationBarTitleText":"今日新增用户","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/Consumed","meta":{},"window":{"navigationBarTitleText":"我的推广","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/Continued_use","meta":{},"window":{"navigationBarTitleText":"未继续使用（40日内）","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/income_details","meta":{},"window":{"navigationBarTitleText":"我的分润","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/Xinka","meta":{},"window":{"navigationBarTitleText":"一刷通","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/profit/Use_file","meta":{},"window":{"navigationBarTitleText":"一刷通使用","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/generation_plan/payment_history","meta":{},"window":{"navigationBarTitleText":"往期记录","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#1678FF","pullToRefresh":{"color":"#1678FF"}}},{"path":"/pages/generation_plan/details_of_previous_plans","meta":{},"window":{"navigationBarTitleText":"计划详情","navigationBarBackgroundColor":"#1678FF"}},{"path":"/pages/update/update","meta":{},"window":{"navigationBarTitleText":"应用更新","navigationBarBackgroundColor":"#1678FF","bounce":"none"}},{"path":"/pages/rise_vip/rise_vip","meta":{},"window":{"navigationBarTitleText":"升级代理","navigationBarBackgroundColor":"#1678FF","scrollIndicator":"none"}},{"path":"/pages/rise_vip/shuyintai","meta":{},"window":{"navigationBarTitleText":"收银台","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/rise_vip/shuyintais","meta":{},"window":{"navigationBarTitleText":"收银台","navigationBarBackgroundColor":"#2483F5"}},{"path":"/pages/shouxin/shouxin_huaikuai","meta":{},"window":{"navigationBarTitleText":"授信还款"}},{"path":"/pages/Repayment/Repayment_plan","meta":{},"window":{"navigationBarTitleText":"还款计划"}},{"path":"/pages/Details_plan/details_plans","meta":{},"window":{"navigationBarTitleText":"还款计划"}},{"path":"/pages/Past_period/PastPeriod_plan","meta":{},"window":{"navigationBarTitleText":"往期计划","enablePullDownRefresh":true}},{"path":"/pages/modify_ims/information","meta":{},"window":{"navigationBarTitleText":"修改卡信息"}},{"path":"/pages/Picture_seriously/seriously","meta":{},"window":{"navigationBarTitleText":"图片认证"}},{"path":"/pages/Download_page/Download_page","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/My_merchants/my_merchants","meta":{},"window":{"navigationBarTitleText":"我的商户"}},{"path":"/pages/Huabei_collection/Huabei_collection","meta":{},"window":{"navigationBarTitleText":"花呗收款"}},{"path":"/pages/Huabei_collection/Huabei_record","meta":{},"window":{"navigationBarTitleText":"收款记录"}},{"path":"/pages/Huabei_collection/Huabei_details","meta":{},"window":{"navigationBarTitleText":"交易详情"}},{"path":"/pages/share/share_qr_code","meta":{},"window":{"navigationBarTitleText":"分享二维码","navigationBarBackgroundColor":"#1678FF","scrollIndicator":"none","titleNView":{"buttons":[{"type":"share"}]}}},{"path":"/pages/share/share_ios_code","meta":{},"window":{"navigationBarTitleText":"分享二维码","titleNView":{"buttons":[{"type":"share"}]}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
