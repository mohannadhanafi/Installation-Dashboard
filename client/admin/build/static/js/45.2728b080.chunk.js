(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{1349:function(e,t,n){"use strict";n.r(t);var r=n(13),o=n.n(r),a=n(34),i=n(17),c=n(18),l=n(21),s=n(19),u=n(20),f=n(0),p=n.n(f),d=n(25),y=n.n(d),m=n(661),b=n(614),h=n(644),v=n(627),g=n(1355),O=n(35),w=n(613),C=function(e){return p.a.createElement("p",null,e.title)},k=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,c=new Array(r),u=0;u<r;u++)c[u]=arguments[u];return(n=Object(l.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(c)))).state={expandedRowRender:C,data:[],columns:[],loading:!1},n.toggleLoading=function(){n.setState({loading:!n.state.loading})},n.delete=function(e){y.a.post("/api/v2/comments/delete",{data:{id:e}}).then(function(t){var r=t.data.message,o=t.statusText;if(200===t.status){var a=n.state.data.filter(function(t){return t.id!==e});n.setState({data:a},function(){O.NotificationManager.success(r,"SUCCESS",2e3)})}else O.NotificationManager.error(r||o,"ERROR",2e3)})},n.update=function(e){y.a.post("/api/v2/comments/update",{data:{id:e}}).then(function(t){var r=t.data.message,o=t.statusText;if(200===t.status){var a=n.state.data;a.forEach(function(t){t.id===e&&("0"===t.approve?t.approve="1":t.approve="0")}),n.setState(function(){return{data:a}})}else O.NotificationManager.error(r||o,"ERROR",2e3)})},n.getData=function(){n.setState({loading:!0},Object(a.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:y.a.get("/api/v2/comments/getAll").then(function(e){var t=e.data,r=[{title:"Email",dataIndex:"email",key:"email",sorter:function(e,t){return e.email.length-t.email.length}},{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.length-t.name.length}},{title:"Post",dataIndex:"post",key:"post",sorter:function(e,t){return e.post.props.children.length-t.post.props.children.length}},{title:"Status",dataIndex:"approve",key:"Status",render:function(e){return p.a.createElement("span",null,p.a.createElement(m.a,{color:"0"===e?"red":"green",key:"0"===e?"0":"1"},"0"===e?"NOT APPROVED":"APPROVED"))},sorter:function(e,t){return e.approve-t.approve}},{title:"Action",key:"action",dataIndex:"action",width:260}];n.setState(function(){return{columns:r}}),t.map(function(e){return e.action=p.a.createElement("span",null,p.a.createElement(b.a,{title:"Are you sure update this comment ?",onConfirm:function(){return n.update(e.id)},okText:"Yes",cancelText:"No"},p.a.createElement("span",{className:"0"===e.approve?"icon icon-check-circle-o":"icon icon-close-circle"})),p.a.createElement(h.a,{type:"vertical"}),p.a.createElement(b.a,{title:"Are you sure delete this task?",onConfirm:function(){return n.delete(e.id)},okText:"Yes",cancelText:"No"},p.a.createElement("a",{className:"gx-mb-3 icon icon-trash",href:"/"}))),e.post=p.a.createElement(w.a,{to:e.post?"/admin/posts/".concat(e.post.id):"posts"},e.post&&e.post.title.slice(0,50)),e});var o,a=n.props.match.params.status;"approved"===a.toLowerCase()?o=t.filter(function(e){return"1"===e.approve}):"notapproved"===a.toLowerCase()?o=t.filter(function(e){return"0"===e.approve}):"all"===a.toLowerCase()?o=t:n.props.history.push("/admin/comments/all"),n.setState(function(){return{data:o,loading:!1}})});case 1:case"end":return e.stop()}},e)})))},n.componentWillMount=function(){n.getData()},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state,t=e.data,n=e.columns;return p.a.createElement(v.a,{title:"Dynamic"},p.a.createElement(g.a,Object.assign({className:"gx-table-responsive"},this.state,{columns:n,dataSource:t})),p.a.createElement(O.NotificationContainer,null))}}]),t}(p.a.Component);t.default=k},644:function(e,t,n){"use strict";var r=n(0),o=n(3),a=n.n(o),i=n(10);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n};t.a=function(e){return r.createElement(i.a,null,function(t){var n,o=t.getPrefixCls,i=e.prefixCls,u=e.type,f=void 0===u?"horizontal":u,p=e.orientation,d=void 0===p?"":p,y=e.className,m=e.children,b=e.dashed,h=s(e,["prefixCls","type","orientation","className","children","dashed"]),v=o("divider",i),g=d.length>0?"-"+d:d,O=a()(y,v,"".concat(v,"-").concat(f),(l(n={},"".concat(v,"-with-text").concat(g),m),l(n,"".concat(v,"-dashed"),!!b),n));return r.createElement("div",c({className:O},h),m&&r.createElement("span",{className:"".concat(v,"-inner-text")},m))})}},661:function(e,t,n){"use strict";var r=n(0),o=n(38),a=n(3),i=n.n(a),c=n(37),l=n(30),s=n(14),u=n(10);function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return!t||"object"!==f(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n},g=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=m(this,b(t).apply(this,arguments))).handleClick=function(){var t=e.props,n=t.checked,r=t.onChange;r&&r(!n)},e.renderCheckableTag=function(t){var n,o=t.getPrefixCls,a=e.props,c=a.prefixCls,l=a.className,s=a.checked,u=v(a,["prefixCls","className","checked"]),f=o("tag",c),y=i()(f,(d(n={},"".concat(f,"-checkable"),!0),d(n,"".concat(f,"-checkable-checked"),s),n),l);return delete u.onChange,r.createElement("div",p({},u,{className:y,onClick:e.handleClick}))},e}var n,o,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,r["Component"]),n=t,(o=[{key:"render",value:function(){return r.createElement(u.a,null,this.renderCheckableTag)}}])&&y(n.prototype,o),a&&y(n,a),t}(),O=n(188);function w(e){return(w="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(e,t){return!t||"object"!==w(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var S=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n},N=function(e){e.show;var t=S(e,["show"]),n=Object(c.default)(t,["onClose","afterClose","color","visible","closable"]);return r.createElement("div",n)},T=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=P(this,E(t).apply(this,arguments))).state={visible:!0},e.handleIconClick=function(t){e.setVisible(!1,t)},e.animationEnd=function(t,n){if(!n){var r=e.props.afterClose;r&&r()}},e.renderTag=function(t){var n=t.getPrefixCls,a=e.props,i=a.prefixCls,c=a.children,l=S(a,["prefixCls","children"]),s=e.state.visible,u=n("tag",i);return r.createElement(O.a,null,r.createElement(o.a,{component:"",showProp:"show",transitionName:"".concat(u,"-zoom"),onEnd:e.animationEnd},r.createElement(N,k({show:s},l,{className:e.getTagClassName(t),style:e.getTagStyle()}),c,e.renderCloseIcon())))},e}var n,a,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(t,r["Component"]),n=t,c=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:null}}],(a=[{key:"setVisible",value:function(e,t){var n=this.props.onClose;n&&n(t),t.defaultPrevented||"visible"in this.props||this.setState({visible:e})}},{key:"isPresetColor",value:function(e){return!!e&&/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(e)}},{key:"getTagStyle",value:function(){var e=this.props,t=e.color,n=e.style,r=this.isPresetColor(t);return k({backgroundColor:t&&!r?t:void 0},n)}},{key:"getTagClassName",value:function(e){var t,n=e.getPrefixCls,r=this.props,o=r.prefixCls,a=r.className,c=r.color,l=this.state.visible,s=this.isPresetColor(c),u=n("tag",o);return i()(u,(C(t={},"".concat(u,"-").concat(c),s),C(t,"".concat(u,"-has-color"),c&&!s),C(t,"".concat(u,"-hidden"),!l),t),a)}},{key:"renderCloseIcon",value:function(){return this.props.closable?r.createElement(s.a,{type:"close",onClick:this.handleIconClick}):null}},{key:"render",value:function(){return r.createElement(u.a,null,this.renderTag)}}])&&j(n.prototype,a),c&&j(n,c),t}();T.CheckableTag=g,T.defaultProps={closable:!1},Object(l.polyfill)(T);t.a=T}}]);
//# sourceMappingURL=45.2728b080.chunk.js.map