(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{1318:function(t,e,a){"use strict";a.r(e);var n=a(13),o=a.n(n),c=a(34),i=a(17),r=a(18),s=a(21),l=a(19),u=a(20),d=a(0),m=a.n(d),g=a(25),f=a.n(g),p=a(627),b=a(1355),h=a(35),v=a(613),w=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,r=new Array(n),u=0;u<n;u++)r[u]=arguments[u];return(a=Object(s.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(r)))).state={data:[],columns:[],loading:!1},a.toggleLoading=function(){a.setState({loading:!a.state.loading})},a.getData=function(){a.setState({loading:!0},Object(c.a)(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:f.a.get("/api/v2/categories/getAll").then(function(t){var e=t.data,n=[{title:"categories",dataIndex:"name",key:"name",sorter:function(t,e){return t.name.length-e.name.length}},{title:"Action",key:"action",dataIndex:"action"}];e.map(function(t){return t.action=m.a.createElement("span",null,m.a.createElement(v.a,{to:"/admin/layouts/Home/".concat(t.id),className:"icon icon-feedback"})),t}),a.setState(function(){return{columns:n,data:e,loading:!1}})});case 1:case"end":return t.stop()}},t)})))},a.componentWillMount=function(){a.getData()},a}return Object(u.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this.state,e=t.data,a=t.columns;return m.a.createElement(p.a,{title:"Layout Setting"},m.a.createElement(b.a,Object.assign({className:"gx-table-responsive"},this.state,{columns:a,dataSource:e})),m.a.createElement(h.NotificationContainer,null))}}]),e}(m.a.Component);e.default=w}}]);
//# sourceMappingURL=78.eda5fbd3.chunk.js.map