(function(e){function t(t){for(var s,r,a=t[0],h=t[1],u=t[2],c=0,d=[];c<a.length;c++)r=a[c],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&d.push(n[r][0]),n[r]=0;for(s in h)Object.prototype.hasOwnProperty.call(h,s)&&(e[s]=h[s]);l&&l(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),i()}function i(){for(var e,t=0;t<o.length;t++){for(var i=o[t],s=!0,a=1;a<i.length;a++){var h=i[a];0!==n[h]&&(s=!1)}s&&(o.splice(t--,1),e=r(r.s=i[0]))}return e}var s={},n={app:0},o=[];function r(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=s,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(i,s,function(t){return e[t]}.bind(null,s));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],h=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=h;o.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},2943:function(e,t,i){"use strict";i("6fa8")},"4d97":function(e,t,i){},"56d7":function(e,t,i){"use strict";i.r(t);i("e260"),i("e6cf"),i("cca6"),i("a79d");var s=i("2b0e"),n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"test",attrs:{id:"app"}},[i("div",{staticClass:"box"},[i("div",{staticClass:"header"},[e._v("App.vue--vue-demo")]),i("ResizeLayout",{attrs:{resizeBarThick:1}},[i("ResizeCol",{attrs:{width:"240px"}},[i("div",{staticClass:"left"},[i("ul",e._l(e.menu,(function(t){return i("li",{key:t},[e._v(e._s(t))])})),0)])]),i("ResizeCol",[i("div",{staticClass:"right"},[i("ResizeLayout",{attrs:{resizeBarThick:1}},[i("ResizeRow",[i("div",{staticClass:"right-top"},[i("div",{staticClass:"top-main"},[i("div",{staticClass:"top-tab"},[i("span",[e._v("App.vue")]),i("span",[e._v("index.js")]),i("span",[e._v("index.html")]),i("span",[e._v("ResizeCol.vue")]),i("span",[e._v("ResizeLayout.vue")])]),i("div",{staticClass:"structure"},[i("span",[e._v("src > App.vue > tempate > div#app.test")])])]),i("div",{staticClass:"main clearfix"},[i("div",{staticClass:"fl line-number"},[i("ul",e._l(100,(function(t){return i("li",{key:t},[e._v(e._s(t))])})),0)]),i("div",{staticClass:"fl"},[i("textarea",{attrs:{name:"",id:""}})])])])]),i("ResizeRow",{ref:"bottom",staticClass:"right-bottom",attrs:{height:"200px"}},[i("div",{staticClass:"tab"},[i("span",[e._v("TERMINAL")]),i("span",[e._v("PROBLEMS")]),i("span",[e._v("OUTPUT")]),i("span",[e._v("DEBUG CONSOLE")])])])],1)],1)])],1)],1)])},o=[],r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"resizeLayout",staticClass:"resize-layout clearfix"},[e._t("default")],2)},a=[],h=(i("4160"),i("a9e3"),i("159b"),function(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)}),u=function(){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t},l={name:"ResizeLayout",props:{resizeBarThick:{type:Number,default:10}},provide:function(){return{ResizeLayout:this}},data:function(){return{resizeLayoutWidth:0,resizeLayoutHeight:0,slots:[],colWidthList:[],colHeightList:[],timerId:void 0}},computed:{slotsLength:function(){return this.slots?this.slots.length:0}},watch:{resizeLayoutWidth:function(e,t){"ResizeCol"===this.slots[0].componentOptions.tag&&this.timerId&&0!==t&&e!==t&&(this.init(),clearInterval(this.timerId))}},mounted:function(){this.init(),this.addEventListener()},methods:{init:function(){this.resizeLayoutWidth=this.getResizeLayoutWidth(this.$refs.resizeLayout),this.resizeLayoutHeight=this.getResizeLayoutHeight(this.$refs.resizeLayout),this.slots=this.$slots.default,this.setWidth(this.slots),this.setHeight(this.slots),this.setIndex(),"ResizeCol"===this.slots[0].componentOptions.tag&&this.loopEventWidth()},loopEventWidth:function(){var e=this;this.timerId=setInterval((function(){e.resizeLayoutWidth=e.getResizeLayoutWidth(e.$refs.resizeLayout)}))},addEventListener:function(){window.addEventListener("resize",this.handlerResize)},removeEventListener:function(){window.removeEventListener("resize",this.handlerResize)},handlerResize:function(){this.init()},setIndex:function(){var e=this;this.slots.forEach((function(t,i){e.$set(t.componentInstance,"index",i)}))},getResizeLayoutWidth:function(e){return e?h()?e.offsetWidth-u():e.offsetWidth:0},setWidth:function(e){var t=[];e.forEach((function(e){"ResizeCol"===e.componentOptions.tag&&t.push({width:e.componentOptions.propsData.width})})),this.setColWidthList(t)},setColWidthList:function(e){var t=0,i=0;e.forEach((function(e){e.width?i+=parseInt(e.width):t++}));var s=this.resizeLayoutWidth-i,n=s/t;e.forEach((function(e){e.width||(e.width=n+"px")})),this.colWidthList=e},getResizeLayoutHeight:function(e){return e?e.offsetHeight:0},setHeight:function(e){var t=[];e.forEach((function(e){"ResizeRow"===e.componentOptions.tag&&t.push({height:e.componentOptions.propsData.height})})),this.setColHeightList(t)},setColHeightList:function(e){var t=0,i=0;e.forEach((function(e){e.height?i+=parseInt(e.height):t++}));var s=this.resizeLayoutHeight-i,n=s/t;e.forEach((function(e){e.height||(e.height=n+"px")})),this.colHeightList=e}},destroyed:function(){this.removeEventListener()}},c=l,d=(i("ea05"),i("2877")),p=Object(d["a"])(c,r,a,!1,null,"73065ab8",null),f=p.exports,z=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"resize-col",style:e.resizeColStyle},[i("div",{staticClass:"resize-col-content"},[e._t("default")],2),e.ResizeLayout.slotsLength!==e.index+1?i("div",{staticClass:"resize-col-bar"},[i("div",{staticClass:"resize-col-area",style:e.resizeBarStyle}),i("div",{staticClass:"resize-col-line",style:e.resizeBarLineStyle,on:{mousedown:e.handlerMouseDown}})]):e._e()])},L=[],v={name:"ResizeCol",inject:["ResizeLayout"],props:{width:{type:String,default:""},minWidth:{type:String,default:"0px"},resizeBarThick:{type:[Number,String],default:""}},data:function(){return{index:0,startClientX:0,moveClientX:0,resizeBarLineStyle:{},isMouseDown:!1}},computed:{_resizeBarThick:function(){return this.ResizeLayout&&this.ResizeLayout.resizeBarThick&&!this.resizeBarThick?this.ResizeLayout.resizeBarThick:this.ResizeLayout&&this.ResizeLayout.resizeBarThick&&this.resizeBarThick?this.resizeBarThick:10},resizeBarStyle:function(){return{width:this._resizeBarThick+"px"}},borderLeftColor:function(){return this.isMouseDown?"rgb(231, 231, 231)":"transparent"},resizeColStyle:function(){var e={};return this.ResizeLayout&&this.ResizeLayout.colWidthList&&this.ResizeLayout.colWidthList.length>0&&(e.width=this.ResizeLayout.colWidthList[this.index].width),e}},watch:{},mounted:function(){this.setDefaultResizeBarLineStyle()},methods:{setDefaultResizeBarLineStyle:function(){this.resizeBarLineStyle={right:Math.ceil(this._resizeBarThick/2)+"px"}},handlerMouseDown:function(e){this.isMouseDown=!0,this.startClientX=e.clientX,this.addEventListener()},addEventListener:function(){document.addEventListener("mousemove",this.handlerMouseMove),document.addEventListener("mouseup",this.handlerMouseUp)},handlerMouseMove:function(e){this.moveClientX=e.clientX,this.setResizeBarLineStyle()},setResizeBarLineStyle:function(){var e=this.startClientX-this.moveClientX,t=parseInt(this.minWidth);if(t<0&&(console.warn("minWidth 不得小于0"),t=0),e>=0){var i=parseInt(this.ResizeLayout.colWidthList[this.index].width);i-e<t&&(e=i-t)}else{var s=parseInt(this.ResizeLayout.colWidthList[this.index+1].width);s-Math.abs(e)<t&&(e=-(s-t))}this.resizeBarLineStyle={right:e+Math.ceil(this._resizeBarThick/2)+"px",borderLeftColor:this.borderLeftColor}},handlerMouseUp:function(){this.isMouseDown=!1,this.removeEventListener(),this.setWidth(),this.moveClientX=0,this.startClientX=0,this.setResizeBarLineStyle(),this.patchResizeColWidth()},patchResizeColWidth:function(){var e=0;if(this.ResizeLayout.colWidthList.forEach((function(t){0===parseInt(t.width)&&e++})),e>0){var t=this.ResizeLayout.colWidthList[this.ResizeLayout.colWidthList.length-1].width,i=parseInt(t)-e*this._resizeBarThick;this.$set(this.ResizeLayout.colWidthList[this.ResizeLayout.colWidthList.length-1],"width",i+"px")}},setWidth:function(){var e=this.ResizeLayout.colWidthList[this.index].width,t=this.ResizeLayout.colWidthList[this.index+1].width,i=parseInt(this.resizeBarLineStyle.right),s=parseInt(e)-i+Math.ceil(this._resizeBarThick/2),n=parseInt(t)+i-Math.ceil(this._resizeBarThick/2);this.$set(this.ResizeLayout.colWidthList[this.index],"width",s+"px"),this.$set(this.ResizeLayout.colWidthList[this.index+1],"width",n+"px")},removeEventListener:function(){document.removeEventListener("mousemove",this.handlerMouseMove),document.removeEventListener("mouseup",this.handlerMouseUp)}},destroyed:function(){this.removeEventListener()}},y=v,m=(i("2943"),Object(d["a"])(y,z,L,!1,null,"a6368354",null)),g=m.exports,R=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"resize-row",style:e.resizeRowStyle},[i("div",{staticClass:"resize-row-content",style:e.resizeRowContentStyle},[e._t("default")],2),e.ResizeLayout.slotsLength!==e.index+1?i("div",{staticClass:"resize-row-bar"},[i("div",{staticClass:"resize-row-area",style:e.resizeBarStyle}),i("div",{staticClass:"resize-row-line",style:e.resizeBarLineStyle,on:{mousedown:e.handlerMouseDown}})]):e._e()])},w=[],C={name:"ResizeRow",inject:["ResizeLayout"],props:{height:{type:String,default:""},minHeight:{type:String,default:"0px"},resizeBarThick:{type:[Number,String],default:""}},data:function(){return{index:0,startClientY:0,moveClientY:0,resizeBarLineStyle:{},isMouseDown:!1}},computed:{_resizeBarThick:function(){return this.ResizeLayout&&this.ResizeLayout.resizeBarThick&&!this.resizeBarThick?this.ResizeLayout.resizeBarThick:this.ResizeLayout&&this.ResizeLayout.resizeBarThick&&this.resizeBarThick?this.resizeBarThick:10},resizeBarStyle:function(){return{height:this._resizeBarThick+"px"}},borderTopColor:function(){return this.isMouseDown?"rgb(231, 231, 231)":"transparent"},resizeRowStyle:function(){var e={};return this.ResizeLayout&&this.ResizeLayout.colHeightList&&this.ResizeLayout.colHeightList.length>0&&(e.height=this.ResizeLayout.colHeightList[this.index].height),e},resizeRowContentStyle:function(){return{height:parseInt(this.resizeRowStyle.height)-this._resizeBarThick+"px"}}},mounted:function(){this.setDefaultResizeBarLineStyle()},methods:{setDefaultResizeBarLineStyle:function(){this.resizeBarLineStyle={bottom:Math.ceil(this._resizeBarThick/2)+"px"}},handlerMouseDown:function(e){this.isMouseDown=!0,this.startClientY=e.clientY,this.addEventListener()},addEventListener:function(){document.addEventListener("mousemove",this.handlerMouseMove),document.addEventListener("mouseup",this.handlerMouseUp)},handlerMouseMove:function(e){this.moveClientY=e.clientY,this.setResizeBarLineStyle()},setResizeBarLineStyle:function(){var e=this.startClientY-this.moveClientY,t=parseInt(this.minHeight);if(t<0&&(console.warn("minHeight 不得小于0"),t=0),e>=0){var i=parseInt(this.ResizeLayout.colHeightList[this.index].height);i-e<t&&(e=i-t)}else{var s=parseInt(this.ResizeLayout.colHeightList[this.index+1].height);s-Math.abs(e)<t&&(e=-(s-t))}this.resizeBarLineStyle={bottom:e+Math.ceil(this._resizeBarThick/2)+"px",borderTopColor:this.borderTopColor}},handlerMouseUp:function(){this.isMouseDown=!1,this.removeEventListener(),this.setHeight(),this.moveClientY=0,this.startClientY=0,this.setResizeBarLineStyle()},patchResizeColHeight:function(){var e=0;if(this.ResizeLayout.colHeightList.forEach((function(t){0===parseInt(t.height)&&e++})),e>0){var t=this.ResizeLayout.colHeightList[this.ResizeLayout.colHeightList.length-1].hHeight,i=parseInt(t)-e*this._resizeBarThick;this.$set(this.ResizeLayout.colHeightList[this.ResizeLayout.colHeightList.length-1],"height",i+"px")}},setHeight:function(){var e=this.ResizeLayout.colHeightList[this.index].height,t=this.ResizeLayout.colHeightList[this.index+1].height,i=parseInt(e)-parseInt(this.resizeBarLineStyle.bottom)+Math.ceil(this._resizeBarThick/2),s=parseInt(t)+parseInt(this.resizeBarLineStyle.bottom)-Math.ceil(this._resizeBarThick/2);this.$set(this.ResizeLayout.colHeightList[this.index],"height",i+"px"),this.$set(this.ResizeLayout.colHeightList[this.index+1],"height",s+"px")},removeEventListener:function(){document.removeEventListener("mousemove",this.handlerMouseMove),document.removeEventListener("mouseup",this.handlerMouseUp)}},destroyed:function(){this.removeEventListener()}},x=C,b=(i("66b4"),Object(d["a"])(x,R,w,!1,null,"a4468932",null)),B=b.exports,_={components:{ResizeLayout:f,ResizeCol:g,ResizeRow:B},data:function(){return{menu:["ResizeLayout","node_modules","public","src","package.json"]}}},M=_,E=(i("a8bc"),Object(d["a"])(M,n,o,!1,null,"3552170e",null)),S=E.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(S)}}).$mount("#app")},"66b4":function(e,t,i){"use strict";i("4d97")},"6fa8":function(e,t,i){},a275:function(e,t,i){},a8bc:function(e,t,i){"use strict";i("a275")},ea05:function(e,t,i){"use strict";i("eca4")},eca4:function(e,t,i){}});
//# sourceMappingURL=app.5f0c13ff.js.map