(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{1281:function(e,t,a){"use strict";a.r(t);var n=a(13),r=a.n(n),s=a(34),i=a(17),l=a(18),c=a(21),p=a(19),o=a(20),u=a(0),m=a.n(u),f=a(620),b=a(622),d=a(627),h=a(45),v=a(25),E=a.n(v),g=a(35),w=f.a.Item,x=b.a.TextArea,O=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(l)))).state={partnerstitle:"",partnerssub:""},a.componentDidMount=function(){E()("/api/v2/getTitle").then(function(e){var t=e.data[0],n=t.partnerstitle,r=t.partnerssub;a.setState({partnerstitle:n,partnerssub:r})})},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){e||E.a.post("/api/v2/titles/update",t).then(function(e){var t=e.data.message;g.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/partners/view")},3e3)}).catch(function(){var e=Object(s.a)(r.a.mark(function e(t){var a,n,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.response,n=a.data.message,s=a.statusText,g.NotificationManager.error(n||s,"ERROR",2e3);case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())})},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.partnerstitle,n=t.partnerssub,r={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}};return m.a.createElement(d.a,{className:"gx-card",title:"Setting"},m.a.createElement(f.a,{onSubmit:this.handleSubmit},m.a.createElement(w,Object.assign({},r,{label:m.a.createElement("span",null,"Title")}),e("partnerstitle",{initialValue:a,rules:[{max:20,message:"Max is 20 letter"}]})(m.a.createElement(b.a,null))),m.a.createElement(w,Object.assign({},r,{label:m.a.createElement("span",null,"subtitle")}),e("partnerssub",{initialValue:n})(m.a.createElement(x,null))),m.a.createElement(w,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},m.a.createElement(h.a,{type:"primary",htmlType:"submit"},"Update"))),m.a.createElement(g.NotificationContainer,null))}}]),t}(u.Component),S=f.a.create()(O);t.default=S}}]);
//# sourceMappingURL=83.ae90e4d9.chunk.js.map