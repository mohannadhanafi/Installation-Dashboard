(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{1288:function(e,t,a){"use strict";a.r(t);var n=a(13),s=a.n(n),i=a(34),l=a(17),r=a(18),c=a(21),u=a(19),m=a(20),o=a(0),p=a.n(o),b=a(620),d=a(622),f=a(627),h=a(45),E=a(25),g=a.n(E),v=a(35),S=b.a.Item,w=d.a.TextArea,y=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),m=0;m<n;m++)r[m]=arguments[m];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={teamtitle:"",teamsub:"",teamdesc:"",disable:!1},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){e||(a.setState({disable:!0}),g.a.post("/api/v2/titles",t).then(function(e){var t=e.data.message;v.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/teams/settings"),a.setState({disable:!1})},3e3)}).catch(function(){var e=Object(i.a)(s.a.mark(function e(t){var n,i,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.response,i=n.data.message,l=n.statusText,v.NotificationManager.error(i||l,"ERROR",2e3),setTimeout(function(){a.setState({disable:!1})},2e3);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()))})},a.componentDidMount=function(){g.a.get("/api/v2/titles").then(function(e){var t=e.data[0],n=t.teamtitle,s=t.teamsub,i=t.teamdesc;a.setState(function(){return{teamtitle:n,teamsub:s,teamdesc:i}})})},a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.teamtitle,n=t.teamsub,s=t.teamdesc,i=t.disable,l={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}};return p.a.createElement(f.a,{className:"gx-card",title:"Setting"},p.a.createElement(b.a,{onSubmit:this.handleSubmit},p.a.createElement(S,Object.assign({},l,{label:p.a.createElement("span",null,"Title")}),e("teamtitle",{initialValue:a,rules:[{required:!0,message:"Please input the title!",whitespace:!0},{max:20,message:"Max is 20 letter"}]})(p.a.createElement(d.a,null))),p.a.createElement(S,Object.assign({},l,{label:p.a.createElement("span",null,"subtitle")}),e("teamsub",{initialValue:n,rules:[{required:!0,message:"Please input the subtitle!",whitespace:!0}]})(p.a.createElement(w,null))),p.a.createElement(S,Object.assign({},l,{label:p.a.createElement("span",null,"Description")}),e("teamdesc",{initialValue:s})(p.a.createElement(w,null))),p.a.createElement(S,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},i?p.a.createElement(h.a,{type:"primary",disabled:!0,htmlType:"submit"},"Submit"):p.a.createElement(h.a,{type:"primary",htmlType:"submit"},"Submit"))),p.a.createElement(v.NotificationContainer,null))}}]),t}(o.Component),O=b.a.create()(y);t.default=O}}]);
//# sourceMappingURL=100.93e30ee1.chunk.js.map