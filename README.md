# Webpack5 + LayUi集成
``` bash
## 网上找的方案或多或少都有些没有通过，通过如下操作成功
1、安装 npm i layui-src
2、拷贝 node_modules下的 layui-src 到 指定目录(assets)下
3、删除  npm uninstall layui-src   
4、index.html引入 layui 如下：
<link rel="stylesheet" href="./assets/js/layui-src/dist/css/layui.css" media="all">
<script src="./assets/js/layui-src/dist/layui.js" charset="utf-8"></script>
5、layui 示例：
 // 设置全局变量
    layui.use(['layer', 'form'], function(){
        let layer = layui.layer,form = layui.form;
    });
    
    function test() {
        layer.open({
            title: '在线调试1',
            offset: 'auto',
            content: '可以填写任意的layer代码'
        });
    }

```
# 依赖安装
``` bash
# install dependencies
npm install --registry=https://registry.npm.taobao.org
# 清除缓存
npm cache clean --force

# npm 淘宝镜像 node-sass 安装失败
https://blog.csdn.net/zzk220106/article/details/89178991

npm install --save node-sass --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass
npm rebuild node-sass --force

```

# Webpack5 资源模块处理
``` bash
# 地址 https://webpack.docschina.org/guides/asset-modules/
asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
``` 

# ESlint配置
``` bash
https://my.oschina.net/u/4125329/blog/4913623
``` 