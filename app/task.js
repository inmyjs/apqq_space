/**
 * 订阅发布任务
 */

var app_config = require("./app/config");
(function($) {
    var o = $({});//自定义事件对象
    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    }, function(key, val) {
        jQuery[val] = function() {
            o[key].apply(o, arguments);
        };
    });
})(jQuery);

var qqList,currentHtml,qqList_index,linkList=[];
var fs=require('fs');
function readQQ() {
    var ordersString = fs.readFileSync("./app/qq.json");
    try {
        return JSON.parse(ordersString ? ordersString.toString() : "[]");
    }
    catch (error) {
        Spider.logout("JSON数据解析错误，请检查app/qq.json",'error');
        return [];
    }
}
/**
 * 停止读取
 */
$.subscribe('spider_stop', function(e, msg) {
    qqList=[];
    Spider.vue.start_loading=false;
    Spider.vue.start_text='开始';
    Spider.logout("已打开链接无法中断!");
});
/**
 * 读取QQ列表
 */
$.subscribe('spider_start', function(e, msg) {
    Spider.logout("读取QQ列表");
    qqList=readQQ();
    Spider.iframeDOM.onload=iframeLoad;
    qqList_index=0;
    Spider.logout("开始执行");
    Spider.vue.start_loading=true;
    Spider.vue.start_text='正在执行...';
    $.publish('spider_list_start');
});
/**
 * 执行QQ
 */
$.subscribe('spider_list_start', function(e, msg) {
    var len=qqList.length;
    if(qqList_index<len) {
        Spider.logout(`开始执行QQ:${qqList[qqList_index].qq}`);
        Spider.logout("打开登录页面");
        currentHtml='login';
        Spider.iframe.attr('src',app_config.default.QQHtml);
    }else{
        Spider.logout("QQ列表已执行完毕");
        Spider.vue.start_loading=false;
        Spider.vue.start_text='开始';
    }
});
/**
 * 页面加载完成事件
 */
async function iframeLoad() {
    switch (currentHtml){
        case 'login':
            Spider.iframe.contents().find("#u").val(qqList[qqList_index].qq);
            Spider.iframe.contents().find("#p").val(qqList[qqList_index].pwd);
            await sleep(1000);
            Spider.logout("正在登录...");
            Spider.iframe.contents().find("#go").click();
            currentHtml='home';
            break;
        case 'home':
            Spider.logout("登录成功");
            Spider.logout("搜索推广链接...");
            var links=Spider.iframe.contents().find('#feed_list_cot_all .dataItem .feed-bd p.txt a');
            $.publish('spider_list_link_start',{
                links,
                index:0
            });
            break;
    }
}
/**
 * 打开页面
 */
$.subscribe('spider_list_link_start', function(e, msg) {
    var len=msg.links.length;
    if(msg.index<len) {
        var url=$(msg.links[msg.index]).attr('href');
        Spider.logout(`打开${url}`);
        nw.Window.open(url, {show:false}, function(new_win) {
            // 新窗口可完成工作
            new_win.on('loaded',async function() {
                var title=this.window.document.title;
                Spider.logout(`已打开${title}`,'success');
                //await sleep(app_config.default.closeViewTime);
                this.close(true);
            });
            msg.index++;
            $.publish('spider_list_link_start',msg);
        });
    }else{
        qqList_index++;
        $.publish('spider_list_start');
    }
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
var view_id=0;
function addView(url) {
    view_id++;
    var id='view_'+view_id;
    var view=`<el-col :span="6"><iframe id="${id}" class="show-iframe" src="${url}" nwfaketop frameborder="0"></iframe></el-col>`;
    $('#view_iframe').append(view);
    document.getElementById(id).onload = viewIframeLoad;
}
function viewIframeLoad() {
    var me=this;
    Spider.logout(`已打开${me.contentWindow.document.title}`);
    setTimeout(function () {
        Spider.logout(`关闭${me.contentWindow.document.title}`);
        $(me).parent().remove();
    },app_config.default.closeViewTime);
}