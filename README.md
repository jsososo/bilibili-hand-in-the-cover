# bilibili-hand-in-the-cover
bilibili 交封不杀 （b站 视频封面获取 chrome 插件）

[下载地址](https://github.com/jsososo/bilibili-hand-in-the-cover/releases)

## 使用
chrome 打开 [chrome://extensions/](chrome://extensions/)，钩上右上角的开发者选项，把解压好的文件夹拖进去就好啦

## 实现
简单的用 jQuery 定时获取页面的信息，对于播放页的视频信息，从 ```<meta>``` 中获取
