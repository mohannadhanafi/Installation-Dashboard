(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{1292:function(e,t,n){"use strict";n.r(t);var a=n(17),r=n(18),c=n(21),i=n(19),o=n(20),l=n(0),s=n.n(l),u=n(25),d=n.n(u),f=n(613),m=n(644),p=n(614),h=n(627),v=n(1355),g=n(35),b=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(n=Object(c.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={data:[],columns:[]},n.delete=function(e){d.a.delete("/api/v2/core",{data:{id:e}}).then(function(t){var a=t.data.message,r=t.statusText;200===t.status?(g.NotificationManager.success(a,"SUCCESS",2e3),setTimeout(function(){var t=n.state.data.filter(function(t){return t.id!==e});n.setState({data:t})},3e3)):g.NotificationManager.error(a||r,"ERROR",2e3)})},n.componentWillMount=function(){d.a.get("/api/v2/core").then(function(e){var t=e.data,a=[{title:"Image",dataIndex:"icon",render:function(e,t){return s.a.createElement("img",{className:"gx-size-30 gx-mr-2",src:"/api/v2/files/getFile/".concat(t.icon),alt:""})}},{title:"Title",dataIndex:"title",key:"title",sorter:function(e,t){return e.title.props.children.length-t.title.props.children.length}},{title:"Description",dataIndex:"desc",key:"description",sorter:function(e,t){return e.desc.length-t.desc.length}},{title:"Action",key:"action",dataIndex:"action",width:100}];n.setState({columns:a}),t.map(function(e){return e.action=s.a.createElement("span",null,s.a.createElement(f.a,{to:"/admin/core/".concat(e.id),className:"icon icon-feedback"}),s.a.createElement(m.a,{type:"vertical"}),s.a.createElement(p.a,{title:"Are you sure delete this core?",onConfirm:function(){return n.delete(e.id)},okText:"Yes",cancelText:"No"},s.a.createElement("a",{className:"gx-mb-3 icon icon-trash",href:"/"}))),e.title=s.a.createElement(f.a,{to:"/admin/core/".concat(e.id)},e.title),e}),n.setState(function(){return{data:t}})})},n}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.state,t=e.data,n=e.columns;return s.a.createElement(h.a,{title:"Core Items List"},s.a.createElement(v.a,Object.assign({className:"gx-table-responsive"},this.state,{columns:n,dataSource:t})),s.a.createElement(g.NotificationContainer,null))}}]),t}(s.a.Component);t.default=b},644:function(e,t,n){"use strict";var a=n(0),r=n(3),c=n.n(r),i=n(10);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&(n[a[r]]=e[a[r]])}return n};t.a=function(e){return a.createElement(i.a,null,function(t){var n,r=t.getPrefixCls,i=e.prefixCls,u=e.type,d=void 0===u?"horizontal":u,f=e.orientation,m=void 0===f?"":f,p=e.className,h=e.children,v=e.dashed,g=s(e,["prefixCls","type","orientation","className","children","dashed"]),b=r("divider",i),y=m.length>0?"-"+m:m,O=c()(p,b,"".concat(b,"-").concat(d),(l(n={},"".concat(b,"-with-text").concat(y),h),l(n,"".concat(b,"-dashed"),!!v),n));return a.createElement("div",o({className:O},g),h&&a.createElement("span",{className:"".concat(b,"-inner-text")},h))})}}}]);
//# sourceMappingURL=70.5d367f3e.chunk.js.map