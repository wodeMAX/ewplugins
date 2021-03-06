# ewplugins

一个基于原生js而封装的插件集合，目前包含创建自适应的文本输入框，拖拽（支持移动端和PC端）的插件，颜色选择器插件,其它插件逐步添加中。

## 安装与使用

### 安装
```
  npm install ewplugins --save-dev

```
### 引入

```
  <script src="./release/ewPlugins.min.js"></script>
  
```

拖拽插件配置如下:

```
  //自定义配置
  //参数为插件的配置对象
  var drag = new ewPlugins('drag',{
      el: document.getElementsByClassName('demo'),//拖动元素
      designEL:'.title',//或document.getElementByClassName('title),//指定拖拽区域
      isWindow: true,//是否限制在浏览器可见窗口内,如果为false，超出后出现滚动条
      scopeEl:document.getElementsByClassName('box'),//如果和width与height同时设置了，则优先执行这个限制元素,设置了此属性，则不能将isWindow属性设置为false
      width: 400,//限制拖动元素范围宽，则不能将isWindow属性设置为false
      height: 400//限制拖动元素范围高，则不能将isWindow属性设置为false
      axis:"x" //或"y",限制在X轴或者y轴拖动
      origin:true, //或false,是否在拖动之后还原位置
      originSpeed:100,//还原速度,不超过拖拽的偏移量
      startCB:function(){},//拖动开始回调
      moveCB:function(){},//拖动时回调
      endCB:function(){},//拖动结束时回调
      dragDisabled:true,//或false，是否禁止拖拽
      disabledButton:'.btn',//或document.getElementByClassName('btn'),//点击按钮禁止或启用拖拽
      ani_transition:'transition:all .1s linear',//动画过渡效果或者以对象形式{'transition':'all .1s linear'}
      grid:[50,50] //网格规范拖动
  });
  //其中el和scopeEl的值也可以是传成字符串,如el:'.demo',scopeEl:'.box'
  //默认配置(传入拖拽元素的dom对象或者获取dom对象的字符串)
  var drag = new ewPlugins('drag','.demo');
  //或var drag = new ewPlugins('drag',document.getElementByClassName('demo'))

```
  创建一个自适应文本框插件如下:

```
  //自定义配置
  var text = new ewPlugins('textarea',{
      el:'.demo',//如果指定了此项，则后面两项无效，指定此项就表示要将某个元素转换成自适应文本元素，也可以传document.getElementByClassName('demo')
      mode:"auto",//创建的是textarea元素还是普通元素,auto或notAuto,auto即textarea元素，否则就是div元素
      container:".box" //或document.getElementByClassName(box)需要添加自适应文本元素的元素
  })
  //默认配置
  var text = new ewPlugins('textarea','.demo');
  或 var text = new ewPlugins('textarea','auto');
  或 var text = new ewPlugins('textarea',document.getElementByClassName('demo'));
  //也可以不用传第二个参数
  var text = new ewPlugins('textarea')

```

颜色选择器插件如下:

```
   //默认配置
   var color = new ewPlugins('colorpicker','.demo');
   或 var color = new ewPlugins('colorpicker',document.getElementByClassName('demo'));
   //点击确定
   color.config.sure = function(color){
       //返回颜色值
   }
   //点击取消
   color.config.clear = function(defaultColor){
     //返回默认颜色值
   }
   //自定义配置
   var color = new ewPlugins('colorpicker',{
      el:'.demo2',//绑定选择器的dom元素
      alpha:true,//是否开启透明度
      size:{
          width:100,
          height:50
      },//颜色选择器类型，有四个字符串值normal,medium,small,mini或者一个对象自定义宽高
      predefineColor:['#223456','rgba(122,35,77,.5)'],//预定义颜色是一个数组
      disabled:false,//是否禁止开启选择器面板
      defaultColor:'#eeff22',//默认颜色
      openPickerAni:'opacity',//或者'height'，开启颜色选择器面板的动画
      sure:function(color){
          console.log(color);
      },//点击确定按钮的回调
      clear:function(){
          console.log(this)
      },//点击清空按钮的回调
      openPicker:function(scope){
         if(scope.pickerFlag){
             console.log('打开颜色选择器')
         }else{
             console.log('关闭颜色选择器')
         }
      }//点击色块事件回调
  })

```

## cdn引入

CDN:https://www.unpkg.com/ewplugins@1.2.9/release/ewPlugins.min.js

## 在组件中使用


```
   import ewPlugins from 'ewplugins'

   var pluginName = new ewPlugins(type,option);//type为指定插件的类型，option为配置对象，详情见前述

   如果是在`vue`中使用，最好在`mounted`周期中实例化
   
```

更多详情参阅文档官网介绍[ewPlugins](https://www.eveningwater.com/ewplugins/);
