(window.webpackJsonp=window.webpackJsonp||[]).push([[36,35],{633:function(n,t,e){},642:function(n,t,e){"use strict";var o=e(0),i=e(1),r=function(){return(r=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var i in t=arguments[e])Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n}).apply(this,arguments)},u={onActivate:i.func,onAddUndo:i.func,onBeforeAddUndo:i.func,onBeforeExecCommand:i.func,onBeforeGetContent:i.func,onBeforeRenderUI:i.func,onBeforeSetContent:i.func,onBeforePaste:i.func,onBlur:i.func,onChange:i.func,onClearUndos:i.func,onClick:i.func,onContextMenu:i.func,onCopy:i.func,onCut:i.func,onDblclick:i.func,onDeactivate:i.func,onDirty:i.func,onDrag:i.func,onDragDrop:i.func,onDragEnd:i.func,onDragGesture:i.func,onDragOver:i.func,onDrop:i.func,onExecCommand:i.func,onFocus:i.func,onFocusIn:i.func,onFocusOut:i.func,onGetContent:i.func,onHide:i.func,onInit:i.func,onKeyDown:i.func,onKeyPress:i.func,onKeyUp:i.func,onLoadContent:i.func,onMouseDown:i.func,onMouseEnter:i.func,onMouseLeave:i.func,onMouseMove:i.func,onMouseOut:i.func,onMouseOver:i.func,onMouseUp:i.func,onNodeChange:i.func,onObjectResizeStart:i.func,onObjectResized:i.func,onObjectSelected:i.func,onPaste:i.func,onPostProcess:i.func,onPostRender:i.func,onPreProcess:i.func,onProgressState:i.func,onRedo:i.func,onRemove:i.func,onReset:i.func,onSaveContent:i.func,onSelectionChange:i.func,onSetAttrib:i.func,onSetContent:i.func,onShow:i.func,onSubmit:i.func,onUndo:i.func,onVisualAid:i.func},c=r({apiKey:i.string,id:i.string,inline:i.bool,init:i.object,initialValue:i.string,onEditorChange:i.func,value:i.string,tagName:i.string,cloudChannel:i.string,plugins:i.oneOfType([i.string,i.array]),toolbar:i.oneOfType([i.string,i.array]),disabled:i.bool,textareaName:i.string},u),s=function(n){return"function"===typeof n},p=0,a=function(n){var t=(new Date).getTime();return n+"_"+Math.floor(1e9*Math.random())+ ++p+String(t)},f=function(n){return null!==n&&"textarea"===n.tagName.toLowerCase()},l=function(n){return"undefined"===typeof n||""===n?[]:Array.isArray(n)?n:n.split(" ")},d=function(n,t){return l(n).concat(l(t))},h=e(643),y=function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])})(t,e)};return function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}(),g=function(){return(g=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var i in t=arguments[e])Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n}).apply(this,arguments)},m={listeners:[],scriptId:a("tiny-script"),scriptLoaded:!1},v=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.element=null,t.initialise=function(){var n=g({},t.props.init,{target:t.element,readonly:t.props.disabled,inline:t.inline,plugins:d(t.props.init&&t.props.init.plugins,t.props.plugins),toolbar:t.props.toolbar||t.props.init&&t.props.init.toolbar,setup:function(n){t.editor=n,n.on("init",function(e){t.initEditor(e,n)}),t.props.init&&"function"===typeof t.props.init.setup&&t.props.init.setup(n)}});f(t.element)&&(t.element.style.visibility=""),Object(h.a)().init(n)},t}return y(t,n),t.prototype.componentWillMount=function(){this.id=this.id||this.props.id||a("tiny-react"),this.inline=this.props.inline?this.props.inline:this.props.init&&this.props.init.inline},t.prototype.componentDidMount=function(){if(null!==Object(h.a)())this.initialise();else if(this.element&&this.element.ownerDocument){var n=this.element.ownerDocument,t=this.props.cloudChannel,e=this.props.apiKey?this.props.apiKey:"";!function(n,t,e,o){n.scriptLoaded?o():(n.listeners.push(o),t.getElementById(n.scriptId)||function(n,t,e,o){var i=t.createElement("script");i.type="application/javascript",i.id=n,i.addEventListener("load",o),i.src=e,t.head&&t.head.appendChild(i)}(n.scriptId,t,e,function(){n.listeners.forEach(function(n){return n()}),n.scriptLoaded=!0}))}(m,n,"https://cloud.tinymce.com/"+t+"/tinymce.min.js?apiKey="+e,this.initialise)}},t.prototype.componentWillUnmount=function(){null!==Object(h.a)()&&Object(h.a)().remove(this.editor)},t.prototype.componentWillReceiveProps=function(n){this.editor&&this.editor.initialized&&(this.currentContent=this.currentContent||this.editor.getContent(),"string"===typeof n.value&&n.value!==this.props.value&&n.value!==this.currentContent&&this.editor.setContent(n.value),"boolean"===typeof n.disabled&&n.disabled!==this.props.disabled&&this.editor.setMode(n.disabled?"readonly":"design"))},t.prototype.render=function(){return this.inline?this.renderInline():this.renderIframe()},t.prototype.initEditor=function(n,t){var e=this,o="string"===typeof this.props.value?this.props.value:"string"===typeof this.props.initialValue?this.props.initialValue:"";t.setContent(o),s(this.props.onEditorChange)&&t.on("change keyup setcontent",function(n){e.currentContent=t.getContent(),s(e.props.onEditorChange)&&e.props.onEditorChange(e.currentContent)}),function(n,t,e){var o;Object.keys(n).filter((o=Object.keys(u),function(n){return-1!==o.indexOf(n)})).forEach(function(o){var i=n[o];s(i)&&("onInit"===o?i(e,t):t.on(o.substring(2),function(n){return i(n,t)}))})}(this.props,t,n)},t.prototype.renderInline=function(){var n=this,t=this.props.tagName,e=void 0===t?"div":t;return o.createElement(e,{ref:function(t){return n.element=t},id:this.id})},t.prototype.renderIframe=function(){var n=this;return o.createElement("textarea",{ref:function(t){return n.element=t},style:{visibility:"hidden"},id:this.id,name:this.props.textareaName})},t.propTypes=c,t.defaultProps={cloudChannel:"5"},t}(o.Component);e.d(t,"a",function(){return v})},643:function(n,t,e){"use strict";(function(n){e.d(t,"a",function(){return i});var o=function(){return"undefined"!==typeof window?window:n},i=function(){var n=o();return n&&n.tinymce?n.tinymce:null}}).call(this,e(61))}}]);
//# sourceMappingURL=36.d95acefd.chunk.js.map