(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{1262:function(t,e,a){"use strict";a.r(e);var n=a(186),i=a(17),r=a(18),s=a(21),o=a(19),c=a(20),l=a(0),u=a.n(l),f=a(25),m=a.n(f),d=(a(688),a(22)),h=a(627),p=a(1355),v=a(35),g=function(t){function e(){var t,a;Object(i.a)(this,e);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(a=Object(s.a)(this,(t=Object(o.a)(e)).call.apply(t,[this].concat(c)))).state={data:[],columns:[]},a.delete=function(t){m.a.delete("/api/v2/posts/delete",{data:{id:t}}).then(function(e){var n=e.data.message,i=e.statusText;if(200===e.status){var r=a.state.items.filter(function(e){return e.id!==t});a.setState(function(){return{items:r}},function(){v.NotificationManager.success(n,"SUCCESS",2e3)})}else v.NotificationManager.error(n||i,"ERROR",2e3)}).catch(function(t){var e=t.response,a=e.data.message,n=e.statusText;v.NotificationManager.error(a||n,"ERROR",2e3)})},a.clearFilters=function(){a.setState({filteredInfo:null})},a.componentWillMount=function(){m.a.get("/api/v2/newsletters").then(function(t){var e=t.data;a.setState({columns:[{title:"Email",dataIndex:"email",key:"email",sorter:function(t,e){return t.email.length-e.email.length}}],items:e})})},a.onChange=function(t){var e=t.target,i=e.name,r=e.value;a.setState(Object(n.a)({},i,r));var s=a.state.data;0!==(s=s.filter(function(t){return-1!==t.title.props.children[0].toLowerCase().indexOf(r.toLowerCase())})).length?a.setState({items:s}):a.setState({items:null})},a}return Object(c.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this.state,e=t.columns,a=t.items;return u.a.createElement(h.a,{title:"NewsLetter"},u.a.createElement(p.a,Object.assign({className:"gx-table-responsive"},this.state,{columns:e,dataSource:a})),u.a.createElement(v.NotificationContainer,null))}}]),e}(u.a.Component);e.default=Object(d.b)(function(t){return{role:t.auth.role}})(g)},689:function(t,e){}}]);
//# sourceMappingURL=60.2a460459.chunk.js.map