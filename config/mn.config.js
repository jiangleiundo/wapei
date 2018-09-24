/* config*/

//API基地址
const BASE_URL = "http://meeno.f3322.net:8082/excavator/index.php/"; //内网

//跳转基地址
const JUMP_URL = ""; //正式地址
//const JUMP_URL = "http://192.168.2.117:8020/wapei/"; //测试地址
//const JUMP_URL = "192.168.2.107/wapei/"; //测试地址

//API

//
const API_CLEAR_REDIS = BASE_URL + "common/clearRedis";//清除缓存
const API_GET_CONFIGDATA = BASE_URL + "common/getConfigData";//获取常量
const API_UPLOAD_IMAGE = BASE_URL + "upload/uploadImages";//上传图片


//user模块
const API_LOGIN = BASE_URL + "account/login";//登录
const API_REGISTER = BASE_URL + "account/registerUser";//注册
const API_RELOGIN = BASE_URL + "account/reLogin";//重登录
const API_CHANGEPWD = BASE_URL + "account/changePassword";//修改密码
const API_GET_CODE = BASE_URL + "account/getMobileCode";//获取短信验证码
const API_GET_SELFINFO = BASE_URL + "u_user/getSelfInfo";//获取用户数据
const API_MOD_INFO = BASE_URL + "u_user/modInfo";//修改个人数据

//banner
const API_GET_BANNERS = BASE_URL + "banner/Banner/getBanners"; //首页banner
const API_GET_CATEGORY = BASE_URL + "goods/Category/getCategory"; //获取分类

//商品
const API_GET_GOODS = BASE_URL + "goods/Goods/getGoods"; //获取商品列表
const API_GET_ONE_GOODS = BASE_URL + "goods/Goods/getOneGoods"; //获取商品详情
const API_GET_TAGS = BASE_URL + "goods/Tag/getTags"; //获取商品标签
const API_GET_BRANDS = BASE_URL + "goods/Brand/getBrands"; //获取品牌
const API_GET_DAILY_SEE_LIST = BASE_URL + "app/DailySee/getDailySeeList"; //获取每日必看


/*
 * url地址
 */

//login
const URL_LOGIN = JUMP_URL + "ui-login.html";
const URL_GUIDEPAGE = JUMP_URL + "ui-guidePage.html";
//mine
const URL_MINE = JUMP_URL + "ui-mine.html";

//index
const URL_INDEX = JUMP_URL + "ui-index.html";

const URL_GOODS_DETAIL = JUMP_URL + "ui-goods-detail.html";

//商品
const URL_CLASSIFY_DETAIL = JUMP_URL + "ui-classify-detail.html"; //分类详情
const URL_HOT_BRANDS = JUMP_URL + "ui-hot-brands.html"; //热门品牌

/*
 * 本地存储键值
 */
const K_EX_LOGIN_STATUS = "K_EX_LOGIN_STATUS";
const K_EX_TOKEN = "K_EX_TOKEN";
const K_EX_SESSIONID = "K_EX_SESSIONID";
const K_EX_USER_INFO = "K_EX_USER_INFO";
const K_EX_ISNEW_USER = "K_EX_ISNEW_USER";

//常量
const NEWUSER = 1;
const OLDUSER = 2;
const HASLOGIN = 1;
const UNLOGIN = 0;
const TOKEN_INVALID = 102;//token失效
const simulate = false;//手机调试
//const simulate = true;//电脑调试
//
const DEFAULT_POSTIMAGE = "";


//错误信息
const ERR_USERNAME_BLANK = "请输入用户名";
const ERR_MOBILEPHONE_BLANK = "请输入手机号";
const ERR_LOGINACCOUNT_BLANK = "请输入登录账号";
const ERR_CODE_BLANK = "请输入验证码";
const ERR_PWD_BLANK = "请输入密码";
const LOGIN_SUCCESS = "登录成功";
const ERR_CONFIRMPWD_DIFFERENCE = "两次输入的密码不一致";
const ERR_LOGININFO_BLANK = "请输入登录信息";
const GET_CODE_SUCCESS = "短信验证码发送成功";
const REGISTER_SUCCESS = "注册成功";
const CHANGE_PWD_SUCCESS = "修改密码成功";