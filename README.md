# Webpack5 + LayUi集成  简版
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

```
