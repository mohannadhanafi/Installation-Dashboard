(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{1295:function(t,e,n){"use strict";n.r(e);var a=n(17),i=n(18),r=n(21),c=n(19),o=n(20),s=n(0),l=n.n(s),u=n(25),d=n.n(u),f=n(613),p=n(644),m=n(614),h=n(627),v=n(1355),b=n(35),y=function(t){function e(){var t,n;Object(a.a)(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(n=Object(r.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(o)))).state={data:[],columns:[]},n.delete=function(t){d.a.delete("/api/v2/statistics",{data:{id:t}}).then(function(e){var a=e.data.message,i=e.statusText;200===e.status?(b.NotificationManager.success(a,"SUCCESS",2e3),setTimeout(function(){var e=n.state.data.filter(function(e){return e.id!==t});n.setState({data:e})},500)):b.NotificationManager.error(a||i,"ERROR",2e3)})},n.componentWillMount=function(){d.a.get("/api/v2/statistics").then(function(t){var e=t.data;n.setState({columns:[{title:"Title",dataIndex:"title",key:"title",sorter:function(t,e){return t.title.props.children.length-e.title.props.children.length}},{title:"Count",dataIndex:"count",key:"count",sorter:function(t,e){return t.count-e.count}},{title:"Action",key:"action",dataIndex:"action",width:100}]}),e.map(function(t){return t.action=l.a.createElement("span",null,l.a.createElement(f.a,{to:"/admin/statistics/".concat(t.id),className:"icon icon-feedback"}),l.a.createElement(p.a,{type:"vertical"}),l.a.createElement(m.a,{title:"Are you sure delete this statistic?",onConfirm:function(){return n.delete(t.id)},okText:"Yes",cancelText:"No"},l.a.createElement("a",{className:"gx-mb-3 icon icon-trash",href:"/"}))),t.title=l.a.createElement(f.a,{to:"/admin/statistics/".concat(t.id)},t.title),t}),n.setState(function(){return{data:e}})})},n}return Object(o.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this.state,e=t.data,n=t.columns;return l.a.createElement(h.a,{title:"Statistics List"},l.a.createElement(v.a,Object.assign({className:"gx-table-responsive"},this.state,{columns:n,dataSource:e})),l.a.createElement(b.NotificationContainer,null))}}]),e}(l.a.Component);e.default=y},644:function(t,e,n){"use strict";var a=n(0),i=n(3),r=n.n(i),c=n(10);function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t}).apply(this,arguments)}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(t);i<a.length;i++)e.indexOf(a[i])<0&&(n[a[i]]=t[a[i]])}return n};e.a=function(t){return a.createElement(c.a,null,function(e){var n,i=e.getPrefixCls,c=t.prefixCls,u=t.type,d=void 0===u?"horizontal":u,f=t.orientation,p=void 0===f?"":f,m=t.className,h=t.children,v=t.dashed,b=l(t,["prefixCls","type","orientation","className","children","dashed"]),y=i("divider",c),O=p.length>0?"-"+p:p,g=r()(m,y,"".concat(y,"-").concat(d),(s(n={},"".concat(y,"-with-text").concat(O),h),s(n,"".concat(y,"-dashed"),!!v),n));return a.createElement("div",o({className:g},b),h&&a.createElement("span",{className:"".concat(y,"-inner-text")},h))})}}}]);
//# sourceMappingURL=66.89fe990f.chunk.js.map