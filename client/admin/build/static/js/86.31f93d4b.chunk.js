(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{1305:function(e,t,a){"use strict";a.r(t);var n=a(13),i=a.n(n),l=a(34),r=a(17),s=a(18),o=a(21),c=a(19),u=a(20),p=a(0),m=a.n(p),f=a(112),d=a.n(f),h=a(607),g=a(620),v=a(14),b=a(627),E=a(621),w=a(623),y=a(622),k=a(1356),x=a(45),S=a(637),C=a.n(S),O=(a(633),a(25)),F=a.n(O),j=a(35),_=a(642),N=(h.a.Option,g.a.Item),L=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),u=0;u<n;u++)s[u]=arguments[u];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(s)))).state={content:"",fileList:[],previewVisible:!1,previewImage:"",categories:[],fileName:"",removedFile:[],services:[],finalResult:"",disable:!1},a.handleCancel=function(){return a.setState({previewVisible:!1})},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){if(!e){a.setState({disable:!0});var n=a.state,r=(n.icon,n.content),s=n.removedFile,o=n.fileList,c=n.fileName;""!==c&&(t.image=c),t.body=r;var u=a.props.match.params.id;o.length?F.a.post("/api/v2/portfolio/update/".concat(u),t).then(function(e){var t=e.data.message;j.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/portfolio/view"),a.setState({disable:!1})},3e3),s.length&&s.map(function(){var e=Object(l.a)(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.post("/api/v2/files/removeFile",{pic:t});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}).catch(function(){var e=Object(l.a)(i.a.mark(function e(t){var n,l,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.response,l=n.data.message,r=n.statusText,j.NotificationManager.error(l||r,"ERROR",2e3),setTimeout(function(){a.setState({disable:!1})},2e3);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()):(j.NotificationManager.error("Please Choose image !","ERROR",2e3),setTimeout(function(){a.setState({disable:!1})},2e3))}})},a.handleEditorChange=function(e){var t=e.target.getContent();a.setState(function(){return{content:t}})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.removeFile=function(){var e=Object(l.a)(i.a.mark(function e(t){var n,l,r,s,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.removedFile,(l=t.url)?(r=l.split("/"),s=r[r.length-1],n.push(s)):(o=t.response.fullName,n.push(o)),a.setState({removedFile:n});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.handleChange=function(e){var t=e.file,n=e.fileList;if(a.setState({fileList:n}),"done"===t.status){var i=t.response.fullName;a.setState({fileName:i})}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.match.params.id;F.a.get("/api/v2/portfolio/".concat(t)).then(function(){var t=Object(l.a)(i.a.mark(function t(a){var n,l,r,s,o;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a.data,l=n.image,r=n.body,s=a.data,o=[],""===l){t.next=6;break}return t.next=6,F.a.get("/api/v2/files/getFile/".concat(l)).then(function(e){return o.push({uid:C()(),name:"image.png",status:"done",url:"/api/v2/files/getFile/".concat(l)})}).catch(function(t){e.props.history.push("/admin")});case 6:e.setState(function(){return{finalResult:s,fileList:o,content:r}}),F.a.get("/api/v2/services").then(function(t){var a=t.data;e.setState(function(){return{services:a}})});case 8:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()).catch(function(t){e.props.history.push("/admin")})}},{key:"componentDidMount",value:function(){var e=this;F.a.get("/api/v2/portfolio/portfolioCategory").then(function(t){var a=t.data;e.setState({categories:a})})}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.previewVisible,n=t.fileList,i=t.previewImage,l=(t.services,t.content),r=t.finalResult,s=r.title,o=r.date,c=r.categoty_id,u=r.location,p=r.client,f=t.disable,S=t.categories,C=m.a.createElement("div",null,m.a.createElement(v.a,{type:"plus"}),m.a.createElement("div",{className:"ant-upload-text"},"Upload")),O={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}};return m.a.createElement(b.a,{className:"gx-card",title:"Update Portfolio"},m.a.createElement(g.a,{onSubmit:this.handleSubmit},m.a.createElement(N,Object.assign({},O,{label:m.a.createElement("span",null,"Image")}),m.a.createElement(m.a.Fragment,null,m.a.createElement(E.a,{action:"/api/v2/files/uploadFile",listType:"picture-card",fileList:n,onPreview:this.handlePreview,onChange:this.handleChange,onRemove:this.removeFile},1===n.length?null:C),m.a.createElement(w.a,{visible:a,footer:null,onCancel:this.handleCancel},m.a.createElement("img",{alt:"example",style:{width:"100%"},src:i})))),m.a.createElement(N,Object.assign({},O,{label:m.a.createElement("span",null,"Title")}),e("title",{initialValue:s,rules:[{required:!0,message:"Please input the title!",whitespace:!0},{max:30,message:"Max is 30 letter"}]})(m.a.createElement(y.a,null))),m.a.createElement(N,Object.assign({},O,{label:m.a.createElement("span",null,"Category")}),e("categoty_id",{initialValue:c||null})(m.a.createElement(h.a,null,S.length&&S.map(function(e){return m.a.createElement("option",{value:e.id},e.name)})))),m.a.createElement(N,Object.assign({},O,{label:m.a.createElement("span",null,"Date")}),e("date",{initialValue:o?d()(o):null})(m.a.createElement(k.a,null))),m.a.createElement(N,Object.assign({},O,{label:m.a.createElement("span",null,"Client")}),e("client",{initialValue:p,rules:[{max:30,message:"Max is 30 Letter !",whitespace:!0}]})(m.a.createElement(y.a,{type:"text"}))),m.a.createElement(N,Object.assign({},O,{label:m.a.createElement("span",null,"Location")}),e("location",{initialValue:u,rules:[{max:40,message:"Max is 40 Letter !",whitespace:!0}]})(m.a.createElement(y.a,{type:"text"}))),l?m.a.createElement(N,Object.assign({},O,{label:m.a.createElement("span",null,"Body")}),m.a.createElement(_.a,{initialValue:l,init:{images_upload_url:"/api/v2/files/uploadFile",images_upload_base_path:"/api/v2/files/uploadFile",image_caption:!0,images_upload_handler:function(e,t,a){var n=new FormData;n.append("file",e.blob()),F.a.post("/api/v2/files/uploadFile",n).then(function(e){var a=e.data.fullName;t("/api/v2/files/getFile/".concat(a))}).catch(function(e){a("error !")})},height:500,image_title:!0,automatic_uploads:!0,file_picker_types:"file image media",images_upload_credentials:!0,plugins:"print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker imagetools textpattern help formatpainter permanentpen pageembed mentions linkchecker",toolbar:"formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment"},onChange:this.handleEditorChange})):null,m.a.createElement(N,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},f?m.a.createElement(x.a,{type:"primary",disabled:!0,htmlType:"submit"},"Save"):m.a.createElement(x.a,{type:"primary",htmlType:"submit"},"Save"))),m.a.createElement(j.NotificationContainer,null))}}]),t}(p.Component),R=g.a.create()(L);t.default=R}}]);
//# sourceMappingURL=86.31f93d4b.chunk.js.map