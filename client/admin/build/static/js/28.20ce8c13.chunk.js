(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1255:function(e,t,a){"use strict";a.r(t);var n=a(13),i=a.n(n),s=a(34),r=a(17),l=a(18),o=a(21),c=a(19),u=a(20),m=a(0),p=a.n(m),f=a(620),d=a(622),v=a(14),g=a(627),h=a(621),b=a(623),w=a(45),y=a(637),S=a.n(y),E=a(25),x=a.n(E),R=a(35),C=f.a.Item,k=d.a.TextArea,O=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),u=0;u<n;u++)l[u]=arguments[u];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={testimonialstitle:"",testimonialssub:"",testimonialscall:"",background:"",content:"",fileList:[],fileName:"",removedFile:[],disable:!1},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){if(!e){a.setState({disable:!0});var n=a.state,r=n.removedFile,l=n.fileList,o=n.fileName;""!==o&&(t.background=o),l.length?x.a.post("/api/v2/titles",t).then(function(e){var t=e.data.message,n=e.statusText;200===e.status?a.setState({loading:!1},function(){R.NotificationManager.success(t,"SUCCESS",2e3),setTimeout(function(){a.props.history.push("/admin/testimonials/settings"),a.setState({disable:!1})},3e3),r.length&&r.map(function(){var e=Object(s.a)(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.post("/api/v2/files/removeFile",{pic:t});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}):a.setState({loading:!1},function(){R.NotificationManager.error(t||n,"ERROR",2e3),setTimeout(function(){a.setState({disable:!1})},2e3)})}).catch(function(e){a.setState({loading:!1},function(){var t=e.response,n=t.data.message,i=t.statusText;R.NotificationManager.error(n||i,"ERRRO",2e3),setTimeout(function(){a.setState({disable:!1})},2e3)})}):(R.NotificationManager.error("Please Choose an image !","ERROR",2e3),setTimeout(function(){a.setState({disable:!1})},2e3))}})},a.componentDidMount=Object(s.a)(i.a.mark(function e(){var t,n,s,r,l,o,c,u;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get("/api/v2/titles");case 2:if(t=e.sent,n=t.data,s=n[0],r=s.testimonialstitle,l=s.testimonialssub,o=s.testimonialscall,c=s.background,u=[],""===c){e.next=9;break}return e.next=9,x.a.get("/api/v2/files/getFile/".concat(c)).then(function(e){return u.push({uid:S()(),name:"image.png",status:"done",url:"/api/v2/files/getFile/".concat(c)})}).catch(function(e){});case 9:a.setState(function(){return{testimonialstitle:r,background:c,testimonialssub:l,testimonialscall:o,fileList:u}});case 10:case"end":return e.stop()}},e)})),a.handleCancel=function(){return a.setState({previewVisible:!1})},a.showPickedIcon=function(e){var t=e.name;a.setState({background:t})},a.handleChange=function(e){var t=e.file,n=e.fileList,i="image/jpeg"===t.type,s="image/png"===t.type,r=t.size/1024/1024<2;a.setState({fileList:n});var l=t.status;if(n.length)if(i||s)if(r){if("done"===l){var o=t.response.fullName;a.setState({fileName:o})}}else R.NotificationManager.error("Image must smaller than 2MB!","ERROR",2e3),a.setState({fileList:[]});else R.NotificationManager.error("You can only upload image files!","ERROR",2e3),a.setState({fileList:[]})},a.removeFile=function(){var e=Object(s.a)(i.a.mark(function e(t){var n,s,r,l,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.removedFile,(s=t.url)?(r=s.split("/"),l=r[r.length-1],n.push(l)):(o=t.response.fullName,n.push(o)),a.setState({removedFile:n});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.testimonialstitle,n=t.testimonialssub,i=(t.testimonialscall,t.fileList),s=t.background,r=t.previewVisible,l=t.disable,o=p.a.createElement("div",null,p.a.createElement(v.a,{type:"plus"}),p.a.createElement("div",{className:"ant-upload-text"},"Upload")),c={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}};return p.a.createElement(g.a,{className:"gx-card",title:"Settings"},p.a.createElement(f.a,{onSubmit:this.handleSubmit},p.a.createElement(C,Object.assign({},c,{label:p.a.createElement("span",null,"Title")}),e("testimonialstitle",{initialValue:a,rules:[{required:!0,message:"Please input the title!",whitespace:!0},{max:20,message:"Max is 20 letter"}]})(p.a.createElement(d.a,null))),p.a.createElement(C,Object.assign({},c,{label:p.a.createElement("span",null,"Subtitle")}),e("testimonialssub",{initialValue:n,rules:[{required:!0,message:"Please input the subtitle!",whitespace:!0},{max:150,message:"Max is 150 letter"}]})(p.a.createElement(k,null))),p.a.createElement(C,Object.assign({},c,{label:p.a.createElement("span",null," Background Testimonial")}),p.a.createElement(p.a.Fragment,null,p.a.createElement(h.a,{action:"/api/v2/files/uploadFile",listType:"picture-card",fileList:i,onPreview:this.handlePreview,onChange:this.handleChange,onRemove:this.removeFile},1===i.length?null:o),p.a.createElement(b.a,{visible:r,footer:null,onCancel:this.handleCancel},p.a.createElement("img",{alt:"example",style:{width:"100%"},src:"/api/v2/files/getFile/".concat(s)})))),p.a.createElement(C,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},l?p.a.createElement(w.a,{type:"primary",disabled:!0,htmlType:"submit"},"Save"):p.a.createElement(w.a,{type:"primary",htmlType:"submit"},"Save"))),p.a.createElement(R.NotificationContainer,null))}}]),t}(m.Component),F=f.a.create()(O);t.default=F},634:function(e,t){var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(a){var n=new Uint8Array(16);e.exports=function(){return a(n),n}}else{var i=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i}}},635:function(e,t){for(var a=[],n=0;n<256;++n)a[n]=(n+256).toString(16).substr(1);e.exports=function(e,t){var n=t||0,i=a;return[i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]]].join("")}},637:function(e,t,a){var n=a(638),i=a(639),s=i;s.v1=n,s.v4=i,e.exports=s},638:function(e,t,a){var n,i,s=a(634),r=a(635),l=0,o=0;e.exports=function(e,t,a){var c=t&&a||0,u=t||[],m=(e=e||{}).node||n,p=void 0!==e.clockseq?e.clockseq:i;if(null==m||null==p){var f=s();null==m&&(m=n=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==p&&(p=i=16383&(f[6]<<8|f[7]))}var d=void 0!==e.msecs?e.msecs:(new Date).getTime(),v=void 0!==e.nsecs?e.nsecs:o+1,g=d-l+(v-o)/1e4;if(g<0&&void 0===e.clockseq&&(p=p+1&16383),(g<0||d>l)&&void 0===e.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");l=d,o=v,i=p;var h=(1e4*(268435455&(d+=122192928e5))+v)%4294967296;u[c++]=h>>>24&255,u[c++]=h>>>16&255,u[c++]=h>>>8&255,u[c++]=255&h;var b=d/4294967296*1e4&268435455;u[c++]=b>>>8&255,u[c++]=255&b,u[c++]=b>>>24&15|16,u[c++]=b>>>16&255,u[c++]=p>>>8|128,u[c++]=255&p;for(var w=0;w<6;++w)u[c+w]=m[w];return t||r(u)}},639:function(e,t,a){var n=a(634),i=a(635);e.exports=function(e,t,a){var s=t&&a||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var r=(e=e||{}).random||(e.rng||n)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t)for(var l=0;l<16;++l)t[s+l]=r[l];return t||i(r)}}}]);
//# sourceMappingURL=28.20ce8c13.chunk.js.map