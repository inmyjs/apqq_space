# apqq_space
批量登录qq空间，点击推广链接

> **此软件适合在qq空间中做推广，增加点击量的同事使用**

![](https://raw.githubusercontent.com/wiki/inmyjs/apqq_space/images/1.png)

### 技术架构：
1. nw.js
2. jquery
3. element-ui

### 安装步骤
1. 下载nw.js ,根据自己系统下载相应版本即可，官网：https://nwjs.io/ ，若自己需要二次开发，请下载SDK版本，方可开启debug，使用方法详见官网，不再阐述
2. 克隆apqq_space,复制到nw.js目录，启动cmd，进入当前目录，执行 npm install 安装依赖
3. 编辑app/qq.json文件，按json数组格式填写需要登录的qq账户密码
4. 启动nw.exe 就可以使用啦

### 使用说明
1. 点击【开始】，程序将逐一登录qq空间，打开页面上所有的推广链接
2. 由于qq保护机制，第一次登录可能会出现图片验证码，手动完成验证即可
![](https://raw.githubusercontent.com/wiki/inmyjs/apqq_space/images/2.png)
![](https://raw.githubusercontent.com/wiki/inmyjs/apqq_space/images/3.png)

### 其他
1. 本软件未做定时器，后续可加入定时启动任务
2. 点击量如果有ip过滤机制，可以加入伪造ip列表

### 非常感谢您的支持
撸码不易，如果对你有所帮助，欢迎您的赞赏！微信赞赏码：

![](https://raw.githubusercontent.com/wiki/inmyjs/asweb/images/20180831154543.jpg)
