(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{1313:function(e,t,a){"use strict";a.r(t);var n=a(647),i=a(13),r=a.n(i),s=a(34),l=a(17),o=a(18),c=a(21),u=a(19),p=a(20),m=a(187),h=a(0),d=a.n(h),f=a(620),g=a(607),v=a(622),b=a(14),w=a(627),E=a(69),k=a(621),y=a(623),C=a(661),S=a(606),O=a(45),x=a(22),j=a(35),N=a(665),F=a(637),_=a.n(F),P=a(642),V=(a(633),a(25)),R=a.n(V),I=f.a.Item,D=g.a.Option,T=v.a.TextArea,L=function(e){function t(){var e,a;Object(l.a)(this,t);for(var i=arguments.length,o=new Array(i),p=0;p<i;p++)o[p]=arguments[p];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={confirmDirty:!1,autoCompleteResult:[],editorState:N.EditorState.createEmpty(),fileList:[],previewVisible:!1,previewImage:"",values:"",categories:[],removedFile:[],checked:!0,content:"",headingLength:"",tags:[],inputVisible:!1,inputValue:"",breakingNews:!0},a.componentDidMount=Object(s.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(t=a.props.match.params.id)&&Number.isInteger(parseInt(t,10))?R.a.get("/api/v2/post/".concat(t)).then(function(){var e=Object(s.a)(r.a.mark(function e(t){var n,i,l,o,c,u,p,m,h,d,f,g,v,b;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.data,i=n[0],l=i.header_media,o=i.hero,c=i.description,u=i.approve,p=i.tags,m=i.breaking,a.setState({checked:o,breakingNews:m}),e.next=6,R.a.get("/api/v2/categories");case 6:return h=e.sent,e.next=9,R.a.get("/api/v2/heading");case 9:return d=e.sent,f=d.data,g=h.data,v=[],b=l.map(function(){var e=Object(s.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.get("/api/v2/files/getFile/".concat(t)).then(function(e){return v.push({uid:_()(),name:"image.png",status:"done",url:"/api/v2/files/getFile/".concat(t)})}).catch(function(e){});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),e.next=16,Promise.all(b).then(function(){a.setState({values:i,fileList:v,categories:g,content:c,headingLength:f.length,approve:u,tags:p})});case 16:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){var t=e.response,n=t.data.message,i=t.statusText;j.NotificationManager.error(n||i,"ERROR",2e3),setTimeout(function(){a.props.history.push("/admin/Posts/viewPosts/all")},2e3)}):a.props.history.push("/admin/Posts/viewPosts/all");case 2:case"end":return e.stop()}},e)})),a.handleChange=function(e){var t=e.file,n=e.fileList;if(a.setState({fileList:n}),"done"===t.status){var i=t.response.fullName;a.setState({fullName:i})}},a.toggleDisable=function(){a.setState({disabled:!a.state.disabled})},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.fileList,i=t.removedFile,l=t.tags,o=[];if(n.map(function(e){var t=e.url;if(!t){var a=e.response.fullName;return o.push(a),o}var n=t.split("/"),i=n[n.length-1];o.push(i)}),0!==o.length){var c=a.state.content;c.trim()&&a.props.form.validateFieldsAndScroll(function(e,t){if(!e){var n=a.props.match.params.id;t.header_media=o,t.description=c,t.tags=l,R.a.post("/api/v2/post/update",{data:t,params:{id:n}}).then(function(e){var t=e.data.message,n=e.statusText;200===e.status?(a.setState({loading:!1},function(){j.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/Posts/viewPosts/all")},3e3)}),i.length&&i.map(function(){var e=Object(s.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.post("/api/v2/files/removeFile",{pic:t});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())):a.setState({loading:!1},function(){j.NotificationManager.error(t||n,"ERROR",2e3)})}).catch(function(){var e=Object(s.a)(r.a.mark(function e(t){var a,n,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.response,n=a.data.message,i=a.statusText,j.NotificationManager.error(n||i,"ERROR",2e3);case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}})}else j.NotificationManager.error("Please Choose image or video !","ERROR",2e3)},a.removeFile=function(){var e=Object(s.a)(r.a.mark(function e(t){var n,i,s,l,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.removedFile,(i=t.url)?(s=i.split("/"),l=s[s.length-1],n.push(l)):(o=t.response.fullName,n.push(o)),a.setState({removedFile:n});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.handleConfirmBlur=function(e){var t=e.target.value;a.setState({confirmDirty:a.state.confirmDirty||!!t})},a.compareToFirstPassword=function(e,t,n){var i=a.props.form;t&&t!==i.getFieldValue("password")?n("Two passwords that you enter is inconsistent!"):n()},a.validateToNextPassword=function(e,t,n){var i=a.props.form;t&&a.state.confirmDirty&&i.validateFields(["confirm"],{force:!0}),n()},a.handleWebsiteChange=function(e){var t;t=e?[".com",".org",".net"].map(function(t){return"".concat(e).concat(t)}):[],a.setState({autoCompleteResult:t})},a.handleClose=function(e){var t=a.state.tags.filter(function(t){return t!==e});a.setState({tags:t})},a.showInput=function(){a.setState({inputVisible:!0},function(){return a.input.focus()})},a.handleInputChange=function(e){a.setState({inputValue:e.target.value})},a.handleInputConfirm=function(){var e=Object(m.a)(Object(m.a)(a)).state,t=e.inputValue,i=e.tags;t&&-1===i.indexOf(t)&&(i=[].concat(Object(n.a)(i),[t])),a.setState({tags:i,inputVisible:!1,inputValue:""})},a.onChangeBreaking=function(){a.setState({breakingNews:!a.state.breakingNews})},a.onChangeCheck=function(){a.setState({checked:!a.state.checked})},a.onEditorStateChange=function(e){a.setState({editorState:e})},a.handleEditorChange=function(e){var t=e.target.getContent();a.setState(function(){return{content:t}})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.editorChange=function(e){var t=e.editor.getData();a.setState({content:t})},a.saveInputRef=function(e){return a.input=e},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e,t=this,a=this.props.form.getFieldDecorator,n=this.state,i=n.previewVisible,r=n.fileList,s=n.values,l=n.categories,o=n.tags,c=n.inputVisible,u=n.inputValue,p=n.content,m=(n.breakingNews,this.props.role),h=this.state.headingLength,x=s.title,N=s.pic,F=s.seo,_=(s.description,s.post_intro),V=(s.user,s.category),L=s.hero,M=s.category_id,U=s.approve;V&&(e=M);var B=d.a.createElement("div",null,d.a.createElement(b.a,{type:"plus"}),d.a.createElement("div",{className:"ant-upload-text"},"Upload")),H={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}};return d.a.createElement(w.a,{className:"gx-card",title:"Post Details"},d.a.createElement(f.a,{onSubmit:this.handleSubmit},d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Title\xa0",d.a.createElement(E.a,{title:"What is the title of the post"},d.a.createElement(b.a,{type:"question-circle-o"})))}),a("title",{initialValue:x})(d.a.createElement(v.a,null))),d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Seo name")}),a("seo",{initialValue:F,rules:[{max:20,message:"Max Letters for Seo is 20",whitespace:!0}]})(d.a.createElement(v.a,null))),d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Post Introduction")}),a("post_intro",{initialValue:_,rules:[{max:260,message:"Max Letters for Intro is 260",whitespace:!0}]})(d.a.createElement(T,{rows:4}))),d.a.createElement(I,Object.assign({},H,{label:"Header Photo"}),d.a.createElement(k.a,{action:"/api/v2/files/uploadFile",listType:"picture-card",fileList:r,onPreview:this.handlePreview,onChange:this.handleChange,withCredentials:!0,onRemove:this.removeFile},r.length>=5?null:B),d.a.createElement(y.a,{visible:i,footer:null,onCancel:this.handleCancel},d.a.createElement("img",{alt:"example",style:{width:"100%"},src:"/api/v2/files/getFile/".concat(N)}))),d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Category")}),a("category_id",{initialValue:e})(d.a.createElement(g.a,null,l.length&&l.map(function(e){return d.a.createElement(D,{value:e.id},e.name)})))),p.length?d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Description")}),d.a.createElement(P.a,{initialValue:p,init:{images_upload_url:"/api/v2/files/uploadFile",images_upload_base_path:"/api/v2/files/uploadFile",image_caption:!0,images_upload_handler:function(e,t,a){var n=new FormData;n.append("file",e.blob()),R.a.post("/api/v2/files/uploadFile",n).then(function(e){var a=e.data.fullName;t("/api/v2/files/getFile/".concat(a))}).catch(function(e){a("error !")})},height:700,image_title:!0,automatic_uploads:!0,file_picker_types:"file image media",images_upload_credentials:!0,plugins:"print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker imagetools textpattern help formatpainter permanentpen pageembed mentions linkchecker",toolbar:"formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment"},onChange:this.handleEditorChange})):null,d.a.createElement(I,Object.assign({},H,{label:"Meta tags"}),d.a.createElement("div",null,o.map(function(e){var a=e.length>20,n=d.a.createElement(C.a,{key:e,closable:!0,afterClose:function(){return t.handleClose(e)}},a?"".concat(e.slice(0,20),"..."):e);return a?d.a.createElement(E.a,{title:e,key:e},n):n}),c&&d.a.createElement(v.a,{ref:this.saveInputRef,type:"text",size:"small",style:{width:78},value:u,onChange:this.handleInputChange,onBlur:this.handleInputConfirm,onPressEnter:this.handleInputConfirm}),!c&&d.a.createElement(C.a,{onClick:this.showInput,style:{background:"#fff",borderStyle:"dashed"}},d.a.createElement(b.a,{type:"plus"})," New Tag"))),s&&"admin"===m?U?h<4||L?d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Hero Section")}),a("hero")(d.a.createElement(S.a,{checked:this.state.checked,onChange:this.onChangeCheck},"Do you want to view this post in the hero section"))):d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Hero Section")}),d.a.createElement("span",{style:{color:"red"}},"You can only put 4 posts in Hero Section"),","):d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Hero Section")}),d.a.createElement("span",{style:{color:"red"}},"Post isn't approved !"),","):null,d.a.createElement(I,Object.assign({},H,{label:d.a.createElement("span",null,"Breaking News")}),a("breaking")(d.a.createElement(S.a,{checked:this.state.breakingNews,onChange:this.onChangeBreaking},"Do you want to consider this post as a breaking news ?"))),d.a.createElement(I,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},d.a.createElement(O.a,{type:"primary",htmlType:"submit"},"Update Post"))),d.a.createElement(j.NotificationContainer,null))}}]),t}(h.Component),M=f.a.create()(L);t.default=Object(x.b)(function(e){var t=e.auth;return{authUser:t.authUser,url:t.url,role:t.role}})(M)}}]);
//# sourceMappingURL=91.98169160.chunk.js.map