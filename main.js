/**
 * 主入口
 */
let gui = require('nw.gui');
gui.App.clearCache();

// 获取window对象
var win = nw.Window.get();
win.maximize();
//win.showDevTools();

// Listen to main window's close event
win.on('close', function() {
    // Hide the window to give user the feeling of closing immediately
    gui.App.closeAllWindows();
    //gui.App.quit();
    this.close(true);
});


// # Alipay-Supervisor Startup
const forever=require("forever");
var schedule = require("node-schedule");

var moment = require("moment");
var app_config = require("./app/config");


var iframe ,iframeDOM,currentHtml;
var view_id=0;
Spider.vue=new Vue({
    el:'#app',
    data:{
        login_text:'登录',
        start_text:'开始',
        start_loading:false,
        activeName:'first',
        logs:[],
        view_iframes:[]
    },
    methods:{
        clear(){
          this.logs=[];
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        },
        handleClick(tab, event) {
        },
        login(){

        },
        start(){
            $.publish('spider_start');
        },
        close(){
            Spider.logout("正在关闭...");
            $.publish('spider_stop');
        }
    }
});

/**
 * 输出日志
 * @param text
 */
Spider.logout=function(text,type) {
    if (!app_config.default.debug || !text) {
        return;
    }
    type=type?type:'info';
    Spider.vue.logs.push({title:`[${moment().format("YYYY-MM-DD HH:mm:ss")}]  ${text}`,type});
    Spider.vue.$nextTick(function(){
        var scrollHeight = $('#logout').prop("scrollHeight");
        $('#logout').scrollTop(scrollHeight,200);
    });
};

$(function () {
    Spider.iframe = $('#pay_iframe');
    Spider.iframeDOM = document.getElementById("pay_iframe");
    Spider.iframe.show();
});
