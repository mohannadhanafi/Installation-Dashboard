(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{1298:function(e,t,a){"use strict";a.r(t);var n=a(13),r=a.n(n),l=a(34),i=a(17),s=a(18),c=a(21),o=a(19),u=a(20),m=a(0),p=a.n(m),f=a(620),d=a(14),g=a(622),h=a(627),v=a(621),b=a(623),E=a(606),y=a(45),w=(a(633),a(25)),x=a.n(w),F=a(35),O=a(708),C=a.n(O),j=f.a.Item,k=0,N=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),u=0;u<n;u++)s[u]=arguments[u];return(a=Object(c.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(s)))).state={footer_description:"",mobile:"",email:"",logo:"",copyrighrs:"",previewVisible:!1,previewImage:"",fileList:[],inputVisible:!1,fileName:"",pic:"noPic.jpg",removedFile:[],features:[]},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){if(!e){var n=a.state,i=n.removedFile,s=n.fileName;t.image=s,x.a.post("/api/v2/pricingPlans",t).then(function(e){var t=e.data.message,n=e.statusText;200===e.status?(F.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/pricing/view")},3e3),i.length&&i.map(function(){var e=Object(l.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.post("/api/v2/files/removeFile",{pic:t});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())):F.NotificationManager.error(t||n,"ERROR",2e3)}).catch(function(e){a.setState({loading:!1},function(){var t=e.response,a=t.data.message,n=t.statusText;F.NotificationManager.error(a||n,"ERROR",2e3)})})}})},a.handleCancel=function(){return a.setState({previewVisible:!1})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.removeFile=function(){var e=Object(l.a)(r.a.mark(function e(t){var n,l,i,s,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.removedFile,(l=t.url)?(i=l.split("/"),s=i[i.length-1],n.push(s)):(c=t.response.fullName,n.push(c)),a.setState({removedFile:n});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.handleChange=function(e){var t=e.file,n=e.fileList,r="image/svg"===t.type,l="image/png"===t.type,i=t.size/1024/1024<2;if(r||l)if(i){if(a.setState({fileList:n}),"done"===t.status){var s=t.response.fullName;a.setState({fileName:s})}}else F.NotificationManager.error("Image must smaller than 2MB!","ERROR",2e3);else F.NotificationManager.error("You can only upload image files!","ERROR",2e3)},a.remove=function(e){var t=a.props.form,n=t.getFieldValue("keys");if(1!==n.length){var r=a.state.features.filter(function(t,a){return a!==e});a.setState(function(){return{features:r}}),t.setFieldsValue({keys:n.filter(function(t){return t!==e})})}},a.add=function(){var e=a.props.form,t=e.getFieldValue("keys").concat(k++);e.setFieldsValue({keys:t})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props.form,a=t.getFieldDecorator,n=t.getFieldValue,r=this.state,l=r.fileList,i=r.previewVisible,s=r.pic,c=(r.features,{labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}}),o=p.a.createElement("div",null,p.a.createElement(d.a,{type:"plus"}),p.a.createElement("div",{className:"ant-upload-text"},"Upload"));a("keys",{initialValue:[]});var u=n("keys"),m=u.map(function(t,n){return p.a.createElement(j,Object.assign({},c,{label:0===n?"Features":" ",required:!1,key:u[n]}),a("features[".concat(u[n],"]"),{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input feature or delete this field."}]})(p.a.createElement(g.a,{placeholder:"Feature",style:{width:"40%",marginRight:8}})),u.length>0?p.a.createElement(d.a,{className:"dynamic-delete-button",type:"minus-circle-o",onClick:function(){return e.remove(t)}}):null)});return p.a.createElement(h.a,{className:"gx-card",title:"Add Pricing Plan"},p.a.createElement(f.a,{onSubmit:this.handleSubmit},p.a.createElement(j,Object.assign({},c,{label:"Image"}),p.a.createElement(v.a,{action:"/api/v2/files/uploadFile",listType:"picture-card",fileList:l,onPreview:this.handlePreview,onChange:this.handleChange,withCredentials:!0,onRemove:this.removeFile,accept:".png,.svg"},l.length>=1?null:o),p.a.createElement(b.a,{visible:i,footer:null,onCancel:this.handleCancel},p.a.createElement("img",{alt:"example",style:{width:"100%"},src:"/api/v2/files/getFile/".concat(s)}))),p.a.createElement(j,Object.assign({},c,{label:p.a.createElement("span",null,"Title")}),a("title",{rules:[{required:!0,message:"Please enter the title !"},{max:30,message:"Max is 30 Letter"}]})(p.a.createElement(g.a,null))),p.a.createElement(j,Object.assign({},c,{label:p.a.createElement("span",null,"Description")}),a("description",{rules:[{max:150,message:"Max is 150 Letter"}]})(p.a.createElement(C.a,{rows:4}))),p.a.createElement(j,Object.assign({},c,{label:p.a.createElement("span",null,"Price - Currency")}),a("price",{rules:[{required:!0,message:"Please enter the price !"},{max:15,message:"Max is 15 Letter"}]})(p.a.createElement(g.a,null))),p.a.createElement(j,Object.assign({},c,{label:p.a.createElement("span",null,"Interval")}),a("interval",{rules:[{required:!0,message:"Please enter the interval !"},{max:15,message:"Max is 15 Letter"}]})(p.a.createElement(g.a,null))),p.a.createElement(j,Object.assign({},c,{label:p.a.createElement("span",null,"Call To Action")}),a("cta",{rules:[{max:15,message:"Max is 15 Letter"}]})(p.a.createElement(g.a,null))),p.a.createElement(j,Object.assign({},c,{label:p.a.createElement("span",null,"Primary")}),a("primary")(p.a.createElement(E.a,null,"Mark As Primary Plan ?"))),m,p.a.createElement(j,Object.assign({},c,{label:p.a.createElement("span",null,m.length<1?"Features":"")}),p.a.createElement(y.a,{type:"dashed",onClick:this.add,style:{width:"40%"}},p.a.createElement(d.a,{type:"plus"})," Add New Feature")),p.a.createElement(j,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},p.a.createElement(y.a,{type:"primary",htmlType:"submit"},"Submit"))),p.a.createElement(F.NotificationContainer,null))}}]),t}(m.Component),P=f.a.create()(N);t.default=P}}]);
//# sourceMappingURL=93.659291a9.chunk.js.map