(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{496:function(e,t,r){var content=r(518);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(14).default)("9cd49bb8",content,!0,{sourceMap:!1})},517:function(e,t,r){"use strict";var n=r(496);r.n(n).a},518:function(e,t,r){(t=r(13)(!1)).push([e.i,".cursor-pointer[data-v-da88617c]{cursor:pointer}",""]),e.exports=t},566:function(e,t,r){"use strict";r.r(t);r(12),r(8),r(7),r(6),r(9);var n=r(4),o=r(79);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var l={data:function(){return{headers:[{text:"",value:"star",width:"0%",divider:!0},{text:"Name",value:"name",width:"100%"}]}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.c)("houses",["list"])),methods:{handleClickRow:function(e){var t=e.id;this.$router.push("/houses/".concat(t,"/market"))}}},d=(r(517),r(50)),f=r(78),v=r.n(f),h=r(158),O=r(493),w=r(491),m=r(565),j=r(487),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",[r("v-card-title",[e._v("\n    Houses\n    "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{nuxt:"",to:"/houses/new",color:"primary"}},[e._v("\n      + New house\n    ")])],1),e._v(" "),r("v-card-text",[r("v-data-table",{attrs:{headers:e.headers,items:e.list||[],"mobile-breakpoint":0,loading:!e.list,"hide-default-footer":"","disable-sort":""},on:{"click:row":e.handleClickRow},scopedSlots:e._u([{key:"item.name",fn:function(t){var n=t.item;return[r("div",{staticClass:"cursor-pointer"},[e._v("\n          "+e._s(n.name)+"\n        ")])]}}])})],1)],1)}),[],!1,null,"da88617c",null);t.default=component.exports;v()(component,{VBtn:h.a,VCard:O.a,VCardText:w.a,VCardTitle:w.b,VDataTable:m.a,VSpacer:j.a})}}]);