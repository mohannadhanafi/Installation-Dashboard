(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{1254:function(e,t,a){"use strict";a.r(t);var n=a(13),i=a.n(n),s=a(34),r=a(17),l=a(18),o=a(21),c=a(19),m=a(20),u=a(0),p=a.n(u),f=a(622),d=a(620),b=a(14),h=a(627),v=a(45),g=(a(633),a(25)),E=a.n(g),w=a(35),S=f.a.TextArea,y=d.a.Item,N=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),m=0;m<n;m++)l[m]=arguments[m];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={footer_description:"",mobile:"",email:"",logo:"",copyrighrs:"",previewVisible:!1,previewImage:"",fileList:[],inputVisible:!1,fileName:"",pic:"noPic.jpg",removedFile:[],disable:!1},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){var n=a.state;n.fileList,n.fileName;e||(a.setState({disable:!0}),E.a.post("/api/v2/testimonials",t).then(function(e){var t=e.data.message,n=e.statusText;200===e.status?(w.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/testimonials/view"),a.setState({disable:!1})},3e3)):(w.NotificationManager.error(t||n,"ERROR",2e3),setTimeout(function(){a.setState({disable:!1})},2e3))}).catch(function(e){a.setState({loading:!1},function(){var t=e.response,n=t.data.message,i=t.statusText;w.NotificationManager.error(n||i,"ERROR",2e3),setTimeout(function(){a.setState({disable:!1})},2e3)})}))})},a.handleCancel=function(){return a.setState({previewVisible:!1})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.removeFile=function(){var e=Object(s.a)(i.a.mark(function e(t){var n,s,r,l,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.removedFile,(s=t.url)?(r=s.split("/"),l=r[r.length-1],n.push(l)):(o=t.response.fullName,n.push(o)),a.setState({removedFile:n});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.handleChange=function(e){var t=e.file,n=e.fileList;if(a.setState({fileList:n}),"done"===t.status){var i=t.response.fullName;a.setState({fileName:i})}},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=(t.fileList,t.previewVisible,t.pic,t.disable),n={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}};p.a.createElement("div",null,p.a.createElement(b.a,{type:"plus"}),p.a.createElement("div",{className:"ant-upload-text"},"Upload"));return p.a.createElement(h.a,{className:"gx-card",title:"Add Testimonial"},p.a.createElement(d.a,{onSubmit:this.handleSubmit},p.a.createElement(y,Object.assign({},n,{label:p.a.createElement("span",null,"Name")}),e("name",{rules:[{required:!0,message:"Please enter the name !"}]})(p.a.createElement(f.a,null))),p.a.createElement(y,Object.assign({},n,{label:p.a.createElement("span",null,"Job Title")}),e("jobTitle",{rules:[{required:!0,message:"Please enter the name !"}]})(p.a.createElement(f.a,null))),p.a.createElement(y,Object.assign({},n,{label:p.a.createElement("span",null,"Description")}),e("description",{rules:[{required:!0,message:"Please enter the name !"},{max:450,message:"Max is 450 letter !"}]})(p.a.createElement(S,{rows:4}))),p.a.createElement(y,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},a?p.a.createElement(v.a,{type:"primary",disabled:!0,htmlType:"submit"},"Submit"):p.a.createElement(v.a,{type:"primary",htmlType:"submit"},"Submit"))),p.a.createElement(w.NotificationContainer,null))}}]),t}(u.Component),j=d.a.create()(N);t.default=j},633:function(e,t,a){}}]);
//# sourceMappingURL=52.653ad246.chunk.js.map