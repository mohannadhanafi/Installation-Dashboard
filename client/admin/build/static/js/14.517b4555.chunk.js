(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{634:function(n,e){var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(t){var o=new Uint8Array(16);n.exports=function(){return t(o),o}}else{var r=new Array(16);n.exports=function(){for(var n,e=0;e<16;e++)0===(3&e)&&(n=4294967296*Math.random()),r[e]=n>>>((3&e)<<3)&255;return r}}},635:function(n,e){for(var t=[],o=0;o<256;++o)t[o]=(o+256).toString(16).substr(1);n.exports=function(n,e){var o=e||0,r=t;return[r[n[o++]],r[n[o++]],r[n[o++]],r[n[o++]],"-",r[n[o++]],r[n[o++]],"-",r[n[o++]],r[n[o++]],"-",r[n[o++]],r[n[o++]],"-",r[n[o++]],r[n[o++]],r[n[o++]],r[n[o++]],r[n[o++]],r[n[o++]]].join("")}},637:function(n,e,t){var o=t(638),r=t(639),i=r;i.v1=o,i.v4=r,n.exports=i},638:function(n,e,t){var o,r,i=t(634),c=t(635),u=0,a=0;n.exports=function(n,e,t){var s=e&&t||0,l=e||[],f=(n=n||{}).node||o,p=void 0!==n.clockseq?n.clockseq:r;if(null==f||null==p){var y=i();null==f&&(f=o=[1|y[0],y[1],y[2],y[3],y[4],y[5]]),null==p&&(p=r=16383&(y[6]<<8|y[7]))}var d=void 0!==n.msecs?n.msecs:(new Date).getTime(),h=void 0!==n.nsecs?n.nsecs:a+1,b=d-u+(h-a)/1e4;if(b<0&&void 0===n.clockseq&&(p=p+1&16383),(b<0||d>u)&&void 0===n.nsecs&&(h=0),h>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");u=d,a=h,r=p;var v=(1e4*(268435455&(d+=122192928e5))+h)%4294967296;l[s++]=v>>>24&255,l[s++]=v>>>16&255,l[s++]=v>>>8&255,l[s++]=255&v;var m=d/4294967296*1e4&268435455;l[s++]=m>>>8&255,l[s++]=255&m,l[s++]=m>>>24&15|16,l[s++]=m>>>16&255,l[s++]=p>>>8|128,l[s++]=255&p;for(var g=0;g<6;++g)l[s+g]=f[g];return e||c(l)}},639:function(n,e,t){var o=t(634),r=t(635);n.exports=function(n,e,t){var i=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var c=(n=n||{}).random||(n.rng||o)();if(c[6]=15&c[6]|64,c[8]=63&c[8]|128,e)for(var u=0;u<16;++u)e[i+u]=c[u];return e||r(c)}},642:function(n,e,t){"use strict";var o=t(0),r=t(1),i=function(){return(i=Object.assign||function(n){for(var e,t=1,o=arguments.length;t<o;t++)for(var r in e=arguments[t])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}).apply(this,arguments)},c={onActivate:r.func,onAddUndo:r.func,onBeforeAddUndo:r.func,onBeforeExecCommand:r.func,onBeforeGetContent:r.func,onBeforeRenderUI:r.func,onBeforeSetContent:r.func,onBeforePaste:r.func,onBlur:r.func,onChange:r.func,onClearUndos:r.func,onClick:r.func,onContextMenu:r.func,onCopy:r.func,onCut:r.func,onDblclick:r.func,onDeactivate:r.func,onDirty:r.func,onDrag:r.func,onDragDrop:r.func,onDragEnd:r.func,onDragGesture:r.func,onDragOver:r.func,onDrop:r.func,onExecCommand:r.func,onFocus:r.func,onFocusIn:r.func,onFocusOut:r.func,onGetContent:r.func,onHide:r.func,onInit:r.func,onKeyDown:r.func,onKeyPress:r.func,onKeyUp:r.func,onLoadContent:r.func,onMouseDown:r.func,onMouseEnter:r.func,onMouseLeave:r.func,onMouseMove:r.func,onMouseOut:r.func,onMouseOver:r.func,onMouseUp:r.func,onNodeChange:r.func,onObjectResizeStart:r.func,onObjectResized:r.func,onObjectSelected:r.func,onPaste:r.func,onPostProcess:r.func,onPostRender:r.func,onPreProcess:r.func,onProgressState:r.func,onRedo:r.func,onRemove:r.func,onReset:r.func,onSaveContent:r.func,onSelectionChange:r.func,onSetAttrib:r.func,onSetContent:r.func,onShow:r.func,onSubmit:r.func,onUndo:r.func,onVisualAid:r.func},u=i({apiKey:r.string,id:r.string,inline:r.bool,init:r.object,initialValue:r.string,onEditorChange:r.func,value:r.string,tagName:r.string,cloudChannel:r.string,plugins:r.oneOfType([r.string,r.array]),toolbar:r.oneOfType([r.string,r.array]),disabled:r.bool,textareaName:r.string},c),a=function(n){return"function"===typeof n},s=0,l=function(n){var e=(new Date).getTime();return n+"_"+Math.floor(1e9*Math.random())+ ++s+String(e)},f=function(n){return null!==n&&"textarea"===n.tagName.toLowerCase()},p=function(n){return"undefined"===typeof n||""===n?[]:Array.isArray(n)?n:n.split(" ")},y=function(n,e){return p(n).concat(p(e))},d=t(643),h=function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}}(),b=function(){return(b=Object.assign||function(n){for(var e,t=1,o=arguments.length;t<o;t++)for(var r in e=arguments[t])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}).apply(this,arguments)},v={listeners:[],scriptId:l("tiny-script"),scriptLoaded:!1},m=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.element=null,e.initialise=function(){var n=b({},e.props.init,{target:e.element,readonly:e.props.disabled,inline:e.inline,plugins:y(e.props.init&&e.props.init.plugins,e.props.plugins),toolbar:e.props.toolbar||e.props.init&&e.props.init.toolbar,setup:function(n){e.editor=n,n.on("init",function(t){e.initEditor(t,n)}),e.props.init&&"function"===typeof e.props.init.setup&&e.props.init.setup(n)}});f(e.element)&&(e.element.style.visibility=""),Object(d.a)().init(n)},e}return h(e,n),e.prototype.componentWillMount=function(){this.id=this.id||this.props.id||l("tiny-react"),this.inline=this.props.inline?this.props.inline:this.props.init&&this.props.init.inline},e.prototype.componentDidMount=function(){if(null!==Object(d.a)())this.initialise();else if(this.element&&this.element.ownerDocument){var n=this.element.ownerDocument,e=this.props.cloudChannel,t=this.props.apiKey?this.props.apiKey:"";!function(n,e,t,o){n.scriptLoaded?o():(n.listeners.push(o),e.getElementById(n.scriptId)||function(n,e,t,o){var r=e.createElement("script");r.type="application/javascript",r.id=n,r.addEventListener("load",o),r.src=t,e.head&&e.head.appendChild(r)}(n.scriptId,e,t,function(){n.listeners.forEach(function(n){return n()}),n.scriptLoaded=!0}))}(v,n,"https://cloud.tinymce.com/"+e+"/tinymce.min.js?apiKey="+t,this.initialise)}},e.prototype.componentWillUnmount=function(){null!==Object(d.a)()&&Object(d.a)().remove(this.editor)},e.prototype.componentWillReceiveProps=function(n){this.editor&&this.editor.initialized&&(this.currentContent=this.currentContent||this.editor.getContent(),"string"===typeof n.value&&n.value!==this.props.value&&n.value!==this.currentContent&&this.editor.setContent(n.value),"boolean"===typeof n.disabled&&n.disabled!==this.props.disabled&&this.editor.setMode(n.disabled?"readonly":"design"))},e.prototype.render=function(){return this.inline?this.renderInline():this.renderIframe()},e.prototype.initEditor=function(n,e){var t=this,o="string"===typeof this.props.value?this.props.value:"string"===typeof this.props.initialValue?this.props.initialValue:"";e.setContent(o),a(this.props.onEditorChange)&&e.on("change keyup setcontent",function(n){t.currentContent=e.getContent(),a(t.props.onEditorChange)&&t.props.onEditorChange(t.currentContent)}),function(n,e,t){var o;Object.keys(n).filter((o=Object.keys(c),function(n){return-1!==o.indexOf(n)})).forEach(function(o){var r=n[o];a(r)&&("onInit"===o?r(t,e):e.on(o.substring(2),function(n){return r(n,e)}))})}(this.props,e,n)},e.prototype.renderInline=function(){var n=this,e=this.props.tagName,t=void 0===e?"div":e;return o.createElement(t,{ref:function(e){return n.element=e},id:this.id})},e.prototype.renderIframe=function(){var n=this;return o.createElement("textarea",{ref:function(e){return n.element=e},style:{visibility:"hidden"},id:this.id,name:this.props.textareaName})},e.propTypes=u,e.defaultProps={cloudChannel:"5"},e}(o.Component);t.d(e,"a",function(){return m})},643:function(n,e,t){"use strict";(function(n){t.d(e,"a",function(){return r});var o=function(){return"undefined"!==typeof window?window:n},r=function(){var n=o();return n&&n.tinymce?n.tinymce:null}}).call(this,t(61))},647:function(n,e,t){"use strict";function o(n){return function(n){if(Array.isArray(n)){for(var e=0,t=new Array(n.length);e<n.length;e++)t[e]=n[e];return t}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.d(e,"a",function(){return o})},661:function(n,e,t){"use strict";var o=t(0),r=t(38),i=t(3),c=t.n(i),u=t(37),a=t(30),s=t(14),l=t(10);function f(n){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"===typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function p(){return(p=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n}).apply(this,arguments)}function y(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function d(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function h(n,e){return!e||"object"!==f(e)&&"function"!==typeof e?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):e}function b(n){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function v(n,e){return(v=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n})(n,e)}var m=function(n,e){var t={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&e.indexOf(o)<0&&(t[o]=n[o]);if(null!=n&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(n);r<o.length;r++)e.indexOf(o[r])<0&&(t[o[r]]=n[o[r]])}return t},g=function(n){function e(){var n;return function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=h(this,b(e).apply(this,arguments))).handleClick=function(){var e=n.props,t=e.checked,o=e.onChange;o&&o(!t)},n.renderCheckableTag=function(e){var t,r=e.getPrefixCls,i=n.props,u=i.prefixCls,a=i.className,s=i.checked,l=m(i,["prefixCls","className","checked"]),f=r("tag",u),d=c()(f,(y(t={},"".concat(f,"-checkable"),!0),y(t,"".concat(f,"-checkable-checked"),s),t),a);return delete l.onChange,o.createElement("div",p({},l,{className:d,onClick:n.handleClick}))},n}var t,r,i;return function(n,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&v(n,e)}(e,o["Component"]),t=e,(r=[{key:"render",value:function(){return o.createElement(l.a,null,this.renderCheckableTag)}}])&&d(t.prototype,r),i&&d(t,i),e}(),C=t(188);function O(n){return(O="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"===typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function w(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function j(){return(j=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n}).apply(this,arguments)}function P(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function k(n,e){return!e||"object"!==O(e)&&"function"!==typeof e?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):e}function E(n){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function S(n,e){return(S=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n})(n,e)}var x=function(n,e){var t={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&e.indexOf(o)<0&&(t[o]=n[o]);if(null!=n&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(n);r<o.length;r++)e.indexOf(o[r])<0&&(t[o[r]]=n[o[r]])}return t},_=function(n){n.show;var e=x(n,["show"]),t=Object(u.default)(e,["onClose","afterClose","color","visible","closable"]);return o.createElement("div",t)},T=function(n){function e(){var n;return function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=k(this,E(e).apply(this,arguments))).state={visible:!0},n.handleIconClick=function(e){n.setVisible(!1,e)},n.animationEnd=function(e,t){if(!t){var o=n.props.afterClose;o&&o()}},n.renderTag=function(e){var t=e.getPrefixCls,i=n.props,c=i.prefixCls,u=i.children,a=x(i,["prefixCls","children"]),s=n.state.visible,l=t("tag",c);return o.createElement(C.a,null,o.createElement(r.a,{component:"",showProp:"show",transitionName:"".concat(l,"-zoom"),onEnd:n.animationEnd},o.createElement(_,j({show:s},a,{className:n.getTagClassName(e),style:n.getTagStyle()}),u,n.renderCloseIcon())))},n}var t,i,u;return function(n,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&S(n,e)}(e,o["Component"]),t=e,u=[{key:"getDerivedStateFromProps",value:function(n){return"visible"in n?{visible:n.visible}:null}}],(i=[{key:"setVisible",value:function(n,e){var t=this.props.onClose;t&&t(e),e.defaultPrevented||"visible"in this.props||this.setState({visible:n})}},{key:"isPresetColor",value:function(n){return!!n&&/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(n)}},{key:"getTagStyle",value:function(){var n=this.props,e=n.color,t=n.style,o=this.isPresetColor(e);return j({backgroundColor:e&&!o?e:void 0},t)}},{key:"getTagClassName",value:function(n){var e,t=n.getPrefixCls,o=this.props,r=o.prefixCls,i=o.className,u=o.color,a=this.state.visible,s=this.isPresetColor(u),l=t("tag",r);return c()(l,(w(e={},"".concat(l,"-").concat(u),s),w(e,"".concat(l,"-has-color"),u&&!s),w(e,"".concat(l,"-hidden"),!a),e),i)}},{key:"renderCloseIcon",value:function(){return this.props.closable?o.createElement(s.a,{type:"close",onClick:this.handleIconClick}):null}},{key:"render",value:function(){return o.createElement(l.a,null,this.renderTag)}}])&&P(t.prototype,i),u&&P(t,u),e}();T.CheckableTag=g,T.defaultProps={closable:!1},Object(a.polyfill)(T);e.a=T}}]);
//# sourceMappingURL=14.517b4555.chunk.js.map