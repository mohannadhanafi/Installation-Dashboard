(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{1282:function(e,t,a){"use strict";a.r(t);var n=a(13),i=a.n(n),r=a(34),s=a(17),l=a(18),o=a(21),c=a(19),p=a(20),u=a(0),m=a.n(u),f=a(622),h=a(620),d=a(14),v=a(627),g=a(621),b=a(623),w=a(45),E=a(637),x=a.n(E),C=(a(633),a(25)),y=a.n(C),N=a(35),O=(f.a.TextArea,h.a.Item),S=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),p=0;p<n;p++)l[p]=arguments[p];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={footer_description:"",mobile:"",email:"",logo:"",copyrighrs:"",previewVisible:!1,previewImage:"",fileList:[],inputVisible:!1,fileName:"",pic:"noPic.jpg",removedFile:[]},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){var n=a.state,i=n.fileList,r=n.fileName;if(!e){var s=a.props.match.params.id;""!==r&&(t.image=r),i.length?y.a.post("/api/v2/partners/update/".concat(s),t).then(function(e){var t=e.data.message,n=e.statusText;200===e.status?(N.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/partners/view")},3e3)):N.NotificationManager.error(t||n,"ERROR",2e3)}).catch(function(e){a.setState({loading:!1},function(){var t=e.response,a=t.data.message,n=t.statusText;N.NotificationManager.error(a||n,"ERROR",2e3)})}):N.NotificationManager.error("Please Choose an image !","ERROR",2e3)}})},a.handleCancel=function(){return a.setState({previewVisible:!1})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.removeFile=function(){var e=Object(r.a)(i.a.mark(function e(t){var n,r,s,l,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.removedFile,(r=t.url)?(s=r.split("/"),l=s[s.length-1],n.push(l)):(o=t.response.fullName,n.push(o)),a.setState({removedFile:n});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.handleChange=function(e){var t=e.file,n=e.fileList;if(a.setState({fileList:n}),"done"===t.status){var i=t.response.fullName;a.setState({fileName:i})}},a.componentDidMount=function(){var e=a.props.match.params.id;y()("/api/v2/partners/".concat(e)).then(function(){var e=Object(r.a)(i.a.mark(function e(t){var n,r,s,l,o,c;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.data,r=n[0],s=r.name,l=r.image,o=r.link,c=[],e.next=5,y.a.get("/api/v2/files/getFile/".concat(l)).then(function(e){return c.push({uid:x()(),name:"image.png",status:"done",url:"/api/v2/files/getFile/".concat(l)})}).catch(function(e){});case 5:a.setState({name:s,fileList:c,link:o});case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){var t=e.response,n=t.data.message,i=t.statusText;N.NotificationManager.error(n||i,"ERROR",2e3),setTimeout(function(){a.props.history.push("/admin/partners/view")},2e3)})},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.fileList,n=t.previewVisible,i=t.pic,r=t.name,s=t.link,l={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}},o=m.a.createElement("div",null,m.a.createElement(d.a,{type:"plus"}),m.a.createElement("div",{className:"ant-upload-text"},"Upload"));return m.a.createElement(v.a,{className:"gx-card",title:"Partner Details"},m.a.createElement(h.a,{onSubmit:this.handleSubmit},m.a.createElement(O,Object.assign({},l,{label:"Image"}),m.a.createElement(g.a,{action:"/api/v2/files/uploadFile",listType:"picture-card",fileList:a,onPreview:this.handlePreview,onChange:this.handleChange,withCredentials:!0,onRemove:this.removeFile},a.length>=1?null:o),m.a.createElement(b.a,{visible:n,footer:null,onCancel:this.handleCancel},m.a.createElement("img",{alt:"example",style:{width:"100%"},src:"/api/v2/files/getFile/".concat(i)}))),m.a.createElement(O,Object.assign({},l,{label:m.a.createElement("span",null,"Name")}),e("name",{rules:[{required:!0,message:"Please enter the name !"}],initialValue:r})(m.a.createElement(f.a,null))),m.a.createElement(O,Object.assign({},l,{label:m.a.createElement("span",null,"Link")}),e("link",{rules:[{max:100,message:"Max is 100 Letter !"}],initialValue:s})(m.a.createElement(f.a,null))),m.a.createElement(O,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},m.a.createElement(w.a,{type:"primary",htmlType:"submit"},"Edit Partner"))),m.a.createElement(N.NotificationContainer,null))}}]),t}(u.Component),R=h.a.create()(S);t.default=R}}]);
//# sourceMappingURL=82.3e0254a9.chunk.js.map