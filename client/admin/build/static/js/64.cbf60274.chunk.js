(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{1311:function(t,e,n){"use strict";n.r(e);var a=n(17),i=n(18),o=n(21),r=n(19),c=n(20),s=n(0),l=n.n(s),u=n(25),d=n.n(u),m=n(688),f=n.n(m),p=n(613),h=n(614),v=n(627),g=n(1355),b=n(35),w=function(t){return f()(t.description)},E=function(t){function e(){var t,n;Object(a.a)(this,e);for(var i=arguments.length,c=new Array(i),s=0;s<i;s++)c[s]=arguments[s];return(n=Object(o.a)(this,(t=Object(r.a)(e)).call.apply(t,[this].concat(c)))).state={expandedRowRender:w,data:[],columns:[]},n.delete=function(t){d.a.post("/api/v2/removeheading",{data:{id:t}}).then(function(e){var a=e.data.message,i=e.statusText;200===e.status?(b.NotificationManager.success(a,"SUCCESS",2e3),setTimeout(function(){var e=n.state.data.filter(function(e){return e.id!==t});n.setState({data:e})},3e3)):b.NotificationManager.error(a||i,"ERROR",2e3)})},n.componentWillMount=function(){d.a.get("/api/v2/heading").then(function(t){var e=t.data;n.setState({columns:[{title:"Name",dataIndex:"title",key:"name",sorter:function(t,e){return t.title.props.children.length-e.title.props.children.length}},{title:"Action",key:"action",dataIndex:"action",width:360}]}),e.map(function(t){return t.action=l.a.createElement("span",null,l.a.createElement(h.a,{title:"Are you sure remove this post from hero section?",onConfirm:function(){return n.delete(t.id)},okText:"Yes",cancelText:"No"},l.a.createElement("a",{className:"gx-mb-3 icon icon-trash",href:"/"}))),t.title=l.a.createElement(p.a,{to:"/admin/posts/".concat(t.id)},t.title),t}),n.setState(function(){return{data:e}})})},n}return Object(c.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this.state,e=t.data,n=t.columns;return l.a.createElement(v.a,{title:"Hero Section Posts"},l.a.createElement(g.a,Object.assign({className:"gx-table-responsive"},this.state,{columns:n,dataSource:e})),l.a.createElement(b.NotificationContainer,null))}}]),e}(l.a.Component);e.default=E},689:function(t,e){}}]);
//# sourceMappingURL=64.cbf60274.chunk.js.map