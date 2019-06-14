(function ($) {
  // $(window).load(() => {
  //   // Preloader
  //   $('.loader').fadeOut();
  //   $('.loader-mask').delay(350).fadeOut('slow');

  //   $(window).trigger('resize');
  //   masonry();
  //   initOwlCarousel();
  // });


  $(window).resize(() => {
    megaMenu();
    megaMenuWide();
    container_full_height_init();
    container_photo_height_init();
    // $.stellar('refresh');

    const windowWidth = $(window).width();
    if (windowWidth <= 974) {
      $('.dropdown-toggle').attr('data-toggle', 'dropdown');
      $('.navigation, .navigation-overlay').removeClass('sticky offset scrolling');
      $('.nav-type-1 nav.navbar').removeClass('navbar-fixed-top');
    }
    if (windowWidth > 974) {
      $('.dropdown-toggle').removeAttr('data-toggle', 'dropdown');
      $('.dropdown').removeClass('open');
      $('.navigation-overlay nav.navbar').addClass('navbar-fixed-top');
    }

    /* Mobile Menu Resize
		-------------------------------------------------------*/
    $('.navbar .navbar-collapse').css('max-height', $(window).height() - $('.navbar-header').height());
  });


  /* Sticky Navigation
	-------------------------------------------------------*/
  $(window).scroll(() => {
    const windowWidth = $(window).width();
    if ($(window).scrollTop() > 190 & windowWidth > 974) {
      $('.navigation-overlay, .navigation').addClass('sticky');
      $('.logo-wrap').addClass('shrink');
    } else {
      $('.navigation-overlay, .navigation').removeClass('sticky');
      $('.logo-wrap').removeClass('shrink');
    }

    if ($(window).scrollTop() > 200 & windowWidth > 974) {
      $('.navigation').addClass('offset');
    } else {
      $('.navigation').removeClass('offset');
    }

    if ($(window).scrollTop() > 500 & windowWidth > 974) {
      $('.navigation').addClass('scrolling');
    } else {
      $('.navigation').removeClass('scrolling');
    }


    if ($(window).scrollTop() > 190) {
      $('.navbar-fixed-top').addClass('sticky');
    } else {
      $('.navbar-fixed-top').removeClass('sticky');
    }
  });


  /* Onepage Nav
	-------------------------------------------------------*/
  $('.onepage-nav .navbar-collapse ul li a').on('click', () => {
    $('.navbar-collapse').collapse('hide');
    return false;
  });

  // Smooth Scroll Navigation


  /* Full screen Navigation
	-------------------------------------------------------*/
  $('#nav-icon, .overlay-menu').on('click', () => {
    $('#nav-icon, #overlay').toggleClass('open');
    $('body').toggleClass('fs-open');


    $(() => {
      let delay = 0;

      $('.overlay-menu > ul > li').each(function () {
        $(this).css({ animationDelay: `${delay}s` });
        delay += 0.1;
      });
    });
  });


  /* Search
	-------------------------------------------------------*/
  $('.search-trigger').on('click', (e) => {
    e.preventDefault();
    $('.search-wrap').animate({ opacity: 'toggle' }, 500);
    $('.nav-search').addClass('open');
    $('.search-wrap .form-control').focus();
  });

  $('.search-close').on('click', (e) => {
    e.preventDefault();
    $('.search-wrap').animate({ opacity: 'toggle' }, 500);
    $('.nav-search').removeClass('open');
  });

  function closeSearch() {
    $('.search-wrap').fadeOut(200);
    $('.nav-search').removeClass('open');
  }

  $(document.body).on('click', (e) => {
    closeSearch();
  });

  $('.search-wrap, .search-trigger').on('click', (e) => {
    e.stopPropagation();
  });


  /* Bootstrap Dropdown Navigation
	-------------------------------------------------------*/
  'use strict'; !(function (a) { typeof define === 'function' && define.amd ? define(['jquery'], a) : typeof exports === 'object' ? module.exports = a(require('jquery')) : a(jQuery); }((a) => {
    function b(b) { this.$element = a(b), this.$main = this.$element.closest('.dropdown, .dropup, .btn-group'), this.$menu = this.$element.parent(), this.$drop = this.$menu.parent().parent(), this.$menus = this.$menu.siblings('.dropdown-submenu'); const d = this.$menu.find(`> .dropdown-menu > ${c}`); this.$submenus = d.filter('.dropdown-submenu'), this.$items = d.not('.dropdown-submenu'), this.init(); } var c = ':not(.disabled, .divider, .dropdown-header)'; return b.prototype = {
      init() { this.$element.on({ 'click.bs.dropdown': this.click.bind(this), keydown: this.keydown.bind(this) }), this.$menu.on('hide.bs.submenu', this.hide.bind(this)), this.$items.on('keydown', this.item_keydown.bind(this)), this.$menu.nextAll(`${c}:first:not(.dropdown-submenu)`).children('a').on('keydown', this.next_keydown.bind(this)); },
click(a) { a.stopPropagation(), this.toggle(); },
toggle() { this.$menu.hasClass('open') ? this.close() : (this.$menu.addClass('open'), this.$menus.trigger('hide.bs.submenu')); },
hide(a) { a.stopPropagation(), this.close(); },
close() { this.$menu.removeClass('open'), this.$submenus.trigger('hide.bs.submenu'); },
keydown(a) {
 if (/^(32|38|40)$/.test(a.keyCode) && a.preventDefault(), /^(13|32)$/.test(a.keyCode)) this.toggle(); else if (/^(27|38|40)$/.test(a.keyCode)) {if (a.stopPropagation(), a.keyCode==27) this.$menu.hasClass('open') ? this.close():(this.$menus.trigger('hide.bs.submenu'), this.$drop.removeClass('open').children('a').trigger('focus')); else { let b = this.$main.find('li:not(.disabled):visible > a'); var  
c = b.index(a.target); if (a.keyCode==38 && c!==0)c--; else { if (a.keyCode!=40 || c === b.length - 1) return; c++; }b.eq(c).trigger('focus') ;}} 
},
item_keydown(a) { a.keyCode == 27 && (a.stopPropagation(), this.close(), this.$element.trigger('focus')); },
next_keydown(a) {
 if (a.keyCode == 38) {
 a.preventDefault(), a.stopPropagation(); const b = this.$drop.find('li:not(.disabled):visible > a'); let
        c = b.index(a.target); b.eq(c - 1).trigger('focus'); 
} 
},
    }, a.fn.submenupicker = function (c) { const d = this instanceof a ? this : a(c); return d.each(function () { let c = a.data(this, 'bs.submenu'); c || (c = new b(this), a.data(this, 'bs.submenu', c)); }); };
  }));
  $('.dropdown-submenu > a').submenupicker();


  /* Mobile Navigation
	-------------------------------------------------------*/
  $('.dropdown-toggle').on('click', (e) => { e.preventDefault(); });


  /* Mobile Detect
	-------------------------------------------------------*/
  if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
		 $('html').addClass('mobile');
		 $('.dropdown-toggle').attr('data-toggle', 'dropdown');
  } else {
    $('html').removeClass('mobile');
  }


  /* IE Detect
	-------------------------------------------------------*/
  if (Function('/*@cc_on return document.documentMode===10@*/')()) { $('html').addClass('ie'); }


  /* Mega Menu
	-------------------------------------------------------*/
  function megaMenu() {
    $('.megamenu').each(function () {
      $(this).css('width', $('.container').width());
      let offset = $(this).closest('.dropdown').offset();
      offset = offset.left;
      let containerOffset = $(window).width() - $('.container').outerWidth();
      containerOffset /= 2;
      offset = offset - containerOffset - 15;
      $(this).css('left', -offset);
    });
  }

  function megaMenuWide() {
    $('.megamenu-wide').each(function () {
      $(this).css('width', $('.container-fluid').width());
      let offset = $(this).closest('.dropdown').offset();
      offset = offset.left;
      let containerOffset = $(window).width() - $('.container-fluid').outerWidth();
      containerOffset /= 2;
      offset = offset - containerOffset - 50;
      $(this).css('left', -offset);
    });
  }


  /* Text Rotator
	-------------------------------------------------------*/
  $('.rotate').textrotator({
    animation: 'dissolve',
    separator: ',',
    speed: 3000,
  });


  /* Counters
	-------------------------------------------------------*/


  /* Equal Height
	-------------------------------------------------------*/

  $('.equal-height').matchHeight({
    byRow: true,
    property: 'height',
    target: null,
    remove: false,
  });


  /* Grid/list Switch
	-------------------------------------------------------*/

  function get_grid() {
		 $('.list').removeClass('list-active');
		 $('.grid').addClass('grid-active');
		 $('.product-item').animate({ opacity: 0 }, () => {
		 $('.shop-catalogue').removeClass('list-view').addClass('grid-view');
		 $('.product').addClass('product-grid').removeClass('product-list');
		 $('.product-item').stop().animate({ opacity: 1 });
		 });
  }

  function get_list() {
    $('.grid').removeClass('grid-active');
    $('.list').addClass('list-active');
    $('.product-item').animate({ opacity: 0 }, () => {
      $('.shop-catalogue').removeClass('grid-view').addClass('list-view');
      $('.product').addClass('product-list').removeClass('product-grid');
      $('.product-item').stop().animate({ opacity: 1 });
    });
  }

  $('#list').on('click', () => {
    get_list();
  });

  $('#grid').on('click', () => {
    get_grid();
  });


  /* Price Slider
	-------------------------------------------------------*/

  /*! jQuery UI - v1.11.4 - 2015-07-16
	* http://jqueryui.com
	* Includes: core.js, widget.js, mouse.js, slider.js
	* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

  (function (e) { typeof define === 'function' && define.amd ? define(['jquery'], e) : e(jQuery); }((e) => {
    function t(t, s) {
      let n; let a; let o; const
        r = t.nodeName.toLowerCase(); return r === 'area' ? (n = t.parentNode, a = n.name, t.href && a && n.nodeName.toLowerCase() === 'map' ? (o = e(`img[usemap='#${a}']`)[0], !!o && i(o)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : r === 'a' ? t.href || s : s) && i(t);
    } function i(t) { return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () { return e.css(this, 'visibility') === 'hidden'; }).length; }e.ui = e.ui || {}, e.extend(e.ui, {
      version: '1.11.4',
      keyCode: {
        BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38,
      },
    }), e.fn.extend({
 scrollParent(t) {
 const i = this.css('position'); let s = 'absolute' === i; let n = t ? /(auto|scroll|hidden)/:/(auto|scroll)/; let
      a = this.parents().filter(function () { const t = e(this); return s && t.css('position') === 'static' ? !1 : n.test(t.css('overflow') + t.css('overflow-y') + t.css('overflow-x')); }).eq(0); return i !== 'fixed' && a.length ? a : e(this[0].ownerDocument || document); 
},
uniqueId: (function () { let e = 0; return function () { return this.each(function () { this.id || (this.id = `ui-id-${  ++e}`); }); }; }()),
removeUniqueId() { return this.each(function () { /^ui-id-\d+$/.test(this.id) && e(this).removeAttr('id'); }); } 
}), e.extend(e.expr[':'], {
 data: e.expr.createPseudo ? e.expr.createPseudo(t => function (i) { return !!e.data(i, t) ;}) : function (t, i, s) { return !!e.data(t, s[3]); },
focusable(i) { return t(i, !isNaN(e.attr(i, 'tabindex'))); },
tabbable(i) {
 const s = e.attr(i, 'tabindex'); let
      n = isNaN(s); return (n || s >= 0) && t(i, !n); 
} 
}), e('<a>').outerWidth(1).jquery || e.each(['Width', 'Height'], (t, i) => {
 function s(t, i, s, a) { return e.each(n, function () { i -= parseFloat(e.css(t, `padding${  this}`)) || 0, s && (i -= parseFloat(e.css(t, `border${  this  }Width`)) || 0), a && (i -= parseFloat(e.css(t, `margin${  this}`)) || 0); }), i; } var n = i === 'Width' ? ['Left', 'Right'] : ['Top', 'Bottom']; let a = i.toLowerCase(); let
      o = {
        innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight,
      }; e.fn[`inner${  i}`] = function (t) { return void 0 === t ? o[`inner${  i}`].call(this) : this.each(function () { e(this).css(a, `${s(this, t)}px`); }); }, e.fn[`outer${  i}`] = function (t, n) { return typeof t!=='number' ? o[`outer${  i}`].call(this, t) : this.each(function () { e(this).css(a, `${s(this, t, !0, n)}px`); }); }; 
}), e.fn.addBack || (e.fn.addBack = function (e) { return this.add(e == null ? this.prevObject : this.prevObject.filter(e)); }), e('<a>').data('a-b', 'a').removeData('a-b').data('a-b') && (e.fn.removeData = (function (t) { return function (i) { return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this); }; }(e.fn.removeData))), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
      focus: (function (t) { return function (i, s) { return typeof i==='number' ? this.each(function () { const t = this; setTimeout(() => { e(t).focus(), s && s.call(t); }, i); }) : t.apply(this, arguments); }; }(e.fn.focus)), disableSelection: (function () { const e = 'onselectstart' in document.createElement('div') ? 'selectstart' : 'mousedown'; return function () { return this.bind(`${e}.ui-disableSelection`, (e) => { e.preventDefault(); }); }; }()), enableSelection() { return this.unbind('.ui-disableSelection'); }, zIndex(t) { if (void 0 !== t) return this.css('zIndex', t); if (this.length) for (var i, s, n = e(this[0]); n.length && n[0] !== document;) { if (i = n.css('position'), (i === 'absolute' || i === 'relative' || i === 'fixed') && (s = parseInt(n.css('zIndex'), 10), !isNaN(s) && s !== 0)) return s; n = n.parent(); } return 0; },
    }), e.ui.plugin = {
 add(t, i, s) {
 let n; let
      a = e.ui[t].prototype; for (n in s)a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]]); 
},
call(e, t, i, s) {
 let n; let
      a = e.plugins[t]; if (a && (s || e.element[0].parentNode && e.element[0].parentNode.nodeType !== 11)) for (n = 0; a.length > n; n++)e.options[a[n][0]] && a[n][1].apply(e.element, i);
 } 
}; let s = 0; const
      n = Array.prototype.slice; e.cleanData = (function (t) {
 return function (i) {
 let s; let n; let
      a; for (a = 0; (n = i[a]) != null; a++) try { s = e._data(n, 'events'), s && s.remove && e(n).triggerHandler('remove'); } catch (o) {}t(i); 
};
 }(e.cleanData)), e.widget = function (t, i, s) {
      let n; let a; let o; let r; const h = {}; const
        l = t.split('.')[0]; return t = t.split('.')[1], n = `${l}-${t}`, s || (s = i, i = e.Widget), e.expr[':'][n.toLowerCase()] = function (t) { return !!e.data(t, n); }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t) { return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t); }, e.extend(o, a, { version: s.version, _proto: e.extend({}, s), _childConstructors: [] }), r = new i(), r.options = e.widget.extend({}, r.options), e.each(s, (t, s) => (e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0))), o.prototype = e.widget.extend(r, { widgetEventPrefix: a ? r.widgetEventPrefix || t : t }, h, {
        constructor: o, namespace: l, widgetName: t, widgetFullName: n,
      }), a ? (e.each(a._childConstructors, (t, i) => { const s = i.prototype; e.widget(`${s.namespace}.${s.widgetName}`, o, i._proto); }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o;
    }, e.widget.extend = function (t) { for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++) for (i in a[o])s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s); return t; }, e.widget.bridge = function (t, i) {
      const s = i.prototype.widgetFullName || t; e.fn[t] = function (a) {
        const o = typeof a === 'string'; const r = n.call(arguments, 1); let
          h = this; return o ? this.each(function () {
          let i; const
            n = e.data(this, s); return a === 'instance' ? (h = n, !1) : n ? e.isFunction(n[a]) && a.charAt(0) !== '_' ? (i = n[a](...r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error(`no such method '${a}' for ${t} widget instance`) : e.error(`cannot call methods on ${ t } prior to initialization; ` + `attempted to call method '${a}'`);
        }) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function () { const t = e.data(this, s); t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this)); })), h;
      };
    }, e.Widget = function () {}, e.Widget._childConstructors = [], e.Widget.prototype = {
      widgetName: 'widget',
widgetEventPrefix: '',
defaultElement: '<div>',
options: { disabled: !1, create: null },
_createWidget(t, i) { i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = `.${  this.widgetName  }${this.uuid}`, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, { remove(e) { e.target === i && this.destroy() ;} }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger('create', null, this._getCreateEventData()), this._init(); },
_getCreateOptions: e.noop,
_getCreateEventData: e.noop,
_create: e.noop,
_init: e.noop,
destroy() { this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(`${this.widgetFullName}-disabled ` + 'ui-state-disabled'), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass('ui-state-hover'), this.focusable.removeClass('ui-state-focus'); },
_destroy: e.noop,
widget() { return this.element; },
option(t, i) {
 let s; let n; let a; let
        o = t; if (arguments.length === 0) return e.widget.extend({}, this.options); if (typeof t == 'string') if (o = {}, s = t.split('.'), t = s.shift(), s.length) { for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++)n[s[a]] = n[s[a]] || {}, n = n[s[a]]; if (t = s.pop(), arguments.length === 1) return void 0 === n[t] ? null : n[t]; n[t] = i; } else { if (arguments.length === 1) return void 0 === this.options[t] ? null : this.options[t]; o[t] = i; } return this._setOptions(o), this; 
},
_setOptions(e) { let t; for (t in e) this._setOption(t, e[t]); return this; },
_setOption(e, t) { return this.options[e] = t, e === 'disabled' && (this.widget().toggleClass(`${this.widgetFullName}-disabled`, !!t), t && (this.hoverable.removeClass('ui-state-hover'), this.focusable.removeClass('ui-state-focus'))), this; },
enable() { return this._setOptions({ disabled: !1 }); },
disable() { return this._setOptions({ disabled: !0 }); },
_on(t, i, s) {
 let n; let
        a = this; typeof t != 'boolean' && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, (s, o) => { function r() { return t || a.options.disabled !== !0 && !e(this).hasClass('ui-state-disabled') ? ('string'===typeof o ? a[o]:o).apply(a, arguments):void 0 ;}'string' != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++); let h = s.match(/^([\w:-]*)\s*(.*)$/); var l=h[1]+a.eventNamespace; var  
u = h[2]; u ? n.delegate(u, l, r):i.bind(l, r); }); 
},
_off(t, i) { i = (i || '').split(' ').join(`${this.eventNamespace} `) + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get()); },
_delay(e, t) { function i() { return (typeof e==='string' ? s[e] : e).apply(s, arguments); } var s = this; return setTimeout(i, t || 0); },
_hoverable(t) { this.hoverable = this.hoverable.add(t), this._on(t, { mouseenter(t) { e(t.currentTarget).addClass('ui-state-hover'); }, mouseleave(t) { e(t.currentTarget).removeClass('ui-state-hover'); } }); },
_focusable(t) { this.focusable = this.focusable.add(t), this._on(t, { focusin(t) { e(t.currentTarget).addClass('ui-state-focus'); }, focusout(t) { e(t.currentTarget).removeClass('ui-state-focus') ;} }); },
_trigger(t, i, s) {
 let n; let a; let
        o = this.options[t]; if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (n in a)n in i || (i[n] = a[n]); return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented()); 
},
    }, e.each({ show: 'fadeIn', hide: 'fadeOut' }, (t, i) => {
 e.Widget.prototype[`_${  t}`] = function (s, n, a) {
 typeof n == 'string' && (n = { effect: n }); let o; let
      r = n ? n === !0 || typeof n==='number' ? i : n.effect || i : t; n = n || {}, typeof n==='number' && (n = { duration: n }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function (i) { e(this)[t](), a && a.call(s[0]), i(); }); 
}; 
}), e.widget; let a = !1; e(document).mouseup(() => { a = !1; }), e.widget('ui.mouse', {
      version: '1.11.4',
options: { cancel: 'input,textarea,button,select,option', distance: 1, delay: 0 },
_mouseInit() { const t = this; this.element.bind(`mousedown.${  this.widgetName}`, (e) => t._mouseDown(e)).bind(`click.${  this.widgetName}`, (i) => !0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0), this.started = !1; },
_mouseDestroy() { this.element.unbind(`.${  this.widgetName}`), this._mouseMoveDelegate && this.document.unbind(`mousemove.${  this.widgetName}`, this._mouseMoveDelegate).unbind(`mouseup.${  this.widgetName}`, this._mouseUpDelegate); },
_mouseDown(t) {
 if (!a) {
 this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t; const i = this; let s = t.which===1; let
        n = typeof this.options.cancel==='string' && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1; return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(() => { i.mouseDelayMet = !0 ;}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, `${this.widgetName}.preventClickEvent`) && e.removeData(t.target, `${this.widgetName}.preventClickEvent`), this._mouseMoveDelegate = function (e) { return i._mouseMove(e); }, this._mouseUpDelegate = function (e) { return i._mouseUp(e); }, this.document.bind(`mousemove.${  this.widgetName}`, this._mouseMoveDelegate).bind(`mouseup.${  this.widgetName}`, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0; 
} 
},
_mouseMove(t) { if (this._mouseMoved) { if (e.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button) return this._mouseUp(t); if (!t.which) return this._mouseUp(t); } return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted); },
_mouseUp(t) { return this.document.unbind(`mousemove.${  this.widgetName}`, this._mouseMoveDelegate).unbind(`mouseup.${  this.widgetName}`, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, `${this.widgetName}.preventClickEvent`, !0), this._mouseStop(t)), a = !1, !1; },
_mouseDistanceMet(e) { return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance; },
_mouseDelayMet() { return this.mouseDelayMet; },
_mouseStart() {},
_mouseDrag() {},
_mouseStop() {},
_mouseCapture() { return !0; },
    }), e.widget('ui.slider', e.ui.mouse, {
      version: '1.11.4',
      widgetEventPrefix: 'slide',
      options: {
        animate: !1, distance: 0, max: 100, min: 0, orientation: 'horizontal', range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null,
      },
      numPages: 5,
      _create() { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass(`ui-slider ui-slider-${  this.orientation  } ui-widget` + ` ui-widget-content` + ` ui-corner-all`), this._refresh(), this._setOption('disabled', this.options.disabled), this._animateOff = !1; },
      _refresh() { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue(); },
      _createHandles() {
 let t; let i; let s = this.options; let n = this.element.find('.ui-slider-handle').addClass('ui-state-default ui-corner-all'); let a = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>"; let
        o = []; for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++)o.push(a); this.handles = n.add(e(o.join('')).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (t) { e(this).data('ui-slider-handle-index', t); }); 
},
      _createRange() {
 const t = this.options; let
        i = ''; t.range ? (t.range === !0 && (t.values ? t.values.length && t.values.length !== 2 ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass('ui-slider-range-min ui-slider-range-max').css({ left: '', bottom: '' }) : (this.range = e('<div></div>').appendTo(this.element), i = 'ui-slider-range ui-widget-header ui-corner-all'), this.range.addClass(i + (t.range === 'min' || t.range === 'max' ? ` ui-slider-range-${  t.range}` : ''))) : (this.range && this.range.remove(), this.range = null); 
},
      _setupEvents() { this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles); },
      _destroy() { this.handles.remove(), this.range && this.range.remove(), this.element.removeClass('ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all'), this._mouseDestroy(); },
      _mouseCapture(t) {
 let i; let s; let n; let a; let o; let r; let h; let l; let u = this; let
        d = this.options; return d.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: t.pageX, y: t.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t) { const i = Math.abs(s - u.values(t)); (n > i || n === i && (t === u._lastChangedValue || u.values(t) === d.min)) && (n = i, a = e(this), o = t); }), r = this._start(t, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass('ui-state-active').focus(), h = a.offset(), l = !e(t.target).parents().addBack().is('.ui-slider-handle'), this._clickOffset = l ? { left: 0, top: 0 } : { left: t.pageX - h.left - a.width() / 2, top: t.pageY - h.top - a.height() / 2 - (parseInt(a.css('borderTopWidth'), 10) || 0) - (parseInt(a.css('borderBottomWidth'), 10) || 0) + (parseInt(a.css('marginTop'), 10) || 0) }, this.handles.hasClass('ui-state-hover') || this._slide(t, o, s), this._animateOff = !0, !0));
 },
      _mouseStart() { return !0; },
      _mouseDrag(e) {
 const t = { x: e.pageX, y: e.pageY }; let
        i = this._normValueFromMouse(t); return this._slide(e, this._handleIndex, i), !1; 
},
      _mouseStop(e) { return this.handles.removeClass('ui-state-active'), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1; },
      _detectOrientation() { this.orientation = this.options.orientation === 'vertical' ? 'vertical' : 'horizontal'; },
      _normValueFromMouse(e) {
 let t; let i; let s; let n; let
        a; return this.orientation === 'horizontal' ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), s < 0 && (s = 0), this.orientation === 'vertical' && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a);
 },
      _start(e, t) { const i = { handle: this.handles[t], value: this.value() }; return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger('start', e, i); },
      _slide(e, t, i) {
 let s; let n; let
        a; this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && i > s || t === 1 && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, a = this._trigger('slide', e, { handle: this.handles[t], value: i, values: n }), s = this.values(t ? 0 : 1), a !== !1 && this.values(t, i))) : i !== this.value() && (a = this._trigger('slide', e, { handle: this.handles[t], value: i }), a !== !1 && this.value(i)); 
},
      _stop(e, t) { const i = { handle: this.handles[t], value: this.value() }; this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger('stop', e, i); },
      _change(e, t) { if (!this._keySliding && !this._mouseSliding) { const i = { handle: this.handles[t], value: this.value() }; this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger('change', e, i); } },
      value(e) { return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0) : this._value(); },
      values(t, i) {
 let s; let n; let
        a; if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0; if (!arguments.length) return this._values(); if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value(); for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1)s[a] = this._trimAlignValue(n[a]), this._change(null, a); this._refreshValue(); 
},
      _setOption(t, i) {
 let s; let
        n = 0; switch (t === 'range' && this.options.range === !0 && (i === 'min' ? (this.options.value = this._values(0), this.options.values = null) : i === 'max' && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), t === 'disabled' && this.element.toggleClass('ui-state-disabled', !!i), this._super(t, i), t) { case 'orientation': this._detectOrientation(), this.element.removeClass('ui-slider-horizontal ui-slider-vertical').addClass(`ui-slider-${  this.orientation}`), this._refreshValue(), this.handles.css(i === 'horizontal' ? 'bottom' : 'left', ''); break; case 'value': this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1; break; case 'values': for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s); this._animateOff = !1; break; case 'step': case 'min': case 'max': this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1; break; case 'range': this._animateOff = !0, this._refresh(), this._animateOff = !1; } 
},
      _value() { let e = this.options.value; return e = this._trimAlignValue(e); },
      _values(e) {
 let t; let i; let
        s; if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t); if (this.options.values && this.options.values.length) { for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)i[s] = this._trimAlignValue(i[s]); return i; } return []; 
},
      _trimAlignValue(e) {
 if (this._valueMin() >= e) return this._valueMin(); if (e >= this._valueMax()) return this._valueMax(); const t = this.options.step > 0 ? this.options.step : 1; let i = (e - this._valueMin()) % t; let
        s = e - i; return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5)); 
},
      _calculateNewMax() {
 let e = this.options.max; let t = this._valueMin(); let i = this.options.step; let
        s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i; e = s + t, this.max = parseFloat(e.toFixed(this._precision())); 
},
      _precision() { let e = this._precisionOf(this.options.step); return this.options.min !== null && (e = Math.max(e, this._precisionOf(this.options.min))), e; },
      _precisionOf(e) {
 const t = `${  e}`; let
        i = t.indexOf('.'); return i === -1 ? 0 : t.length - i - 1; 
},
      _valueMin() { return this.options.min; },
      _valueMax() { return this.max; },
      _refreshValue() {
 let t; let i; let s; let n; let a; let o = this.options.range; let r = this.options; let h = this; let l = this._animateOff ? !1:r.animate; let
        u = {}; this.options.values && this.options.values.length ? this.handles.each(function (s) { i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u[h.orientation === 'horizontal' ? 'left' : 'bottom'] = `${i}%`, e(this).stop(1, 1)[l ? 'animate' : 'css'](u, r.animate), h.options.range === !0 && (h.orientation === 'horizontal' ? (s === 0 && h.range.stop(1, 1)[l ? 'animate' : 'css']({ left: `${i}%` }, r.animate), s === 1 && h.range[l ? 'animate' : 'css']({ width: `${i - t}%` }, { queue: !1, duration: r.animate })) : (s === 0 && h.range.stop(1, 1)[l ? 'animate' : 'css']({ bottom: `${i}%` }, r.animate), s === 1 && h.range[l ? 'animate' : 'css']({ height: `${i - t}%` }, { queue: !1, duration: r.animate }))), t = i; }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u[this.orientation === 'horizontal' ? 'left' : 'bottom'] = `${i}%`, this.handle.stop(1, 1)[l ? 'animate' : 'css'](u, r.animate), o === 'min' && this.orientation === 'horizontal' && this.range.stop(1, 1)[l ? 'animate' : 'css']({ width: `${i}%` }, r.animate), o === 'max' && this.orientation === 'horizontal' && this.range[l ? 'animate' : 'css']({ width: `${100 - i}%` }, { queue: !1, duration: r.animate }), o === 'min' && this.orientation === 'vertical' && this.range.stop(1, 1)[l ? 'animate' : 'css']({ height: `${i}%` }, r.animate), o === 'max' && this.orientation === 'vertical' && this.range[l ? 'animate' : 'css']({ height: `${100 - i}%` }, { queue: !1, duration: r.animate })); 
},
      _handleEvents: {
 keydown(t) {
 let i; let s; let n; let a; let
        o = e(t.target).data('ui-slider-handle-index'); switch (t.keyCode) { case e.ui.keyCode.HOME: case e.ui.keyCode.END: case e.ui.keyCode.PAGE_UP: case e.ui.keyCode.PAGE_DOWN: case e.ui.keyCode.UP: case e.ui.keyCode.RIGHT: case e.ui.keyCode.DOWN: case e.ui.keyCode.LEFT: if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass('ui-state-active'), i = this._start(t, o), i === !1)) return; } switch (a = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(o) : this.value(), t.keyCode) { case e.ui.keyCode.HOME: n = this._valueMin(); break; case e.ui.keyCode.END: n = this._valueMax(); break; case e.ui.keyCode.PAGE_UP: n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages); break; case e.ui.keyCode.PAGE_DOWN: n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages); break; case e.ui.keyCode.UP: case e.ui.keyCode.RIGHT: if (s === this._valueMax()) return; n = this._trimAlignValue(s + a); break; case e.ui.keyCode.DOWN: case e.ui.keyCode.LEFT: if (s === this._valueMin()) return; n = this._trimAlignValue(s - a); } this._slide(t, o, n); 
},
keyup(t) { const i = e(t.target).data('ui-slider-handle-index'); this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass('ui-state-active')); } 
},
    });
  }));


  $(() => {
    $('#slider-range').slider({
      range: true,
      min: 0,
      max: 1500,
      values: [160, 800],
      slide(event, ui) {
        $('#amount').val(`$${ui.values[0]} - $${ui.values[1]}`);
      },
    });
    $('#amount').val(`$${$('#slider-range').slider('values', 0)
			 } - $${$('#slider-range').slider('values', 1)}`);
  });


  /* Owl Carousel
	-------------------------------------------------------*/

  function initOwlCarousel() {
    (function ($) {
      /* Partners Logo
			-------------------------------------------------------*/

      $('#owl-partners').owlCarousel({

        autoPlay: 3000,
        pagination: false,
        itemsCustom: [
          [0, 2],
          [450, 2],
          [700, 3],
          [1000, 3],
          [1200, 4],
          [1400, 5],
          [1600, 6],
        ],

      });


      /* Testimonials
			-------------------------------------------------------*/




      // style-3
      $('#owl-testimonials-boxes').owlCarousel({

        navigation: false,
        slideSpeed: 300,
        pagination: true,
        paginationSpeed: 400,
        stopOnHover: true,
        itemsCustom: [
          [0, 1],
          [450, 1],
          [700, 2],
          [1200, 2],
        ],

      });


      /* Fetured Works
			-------------------------------------------------------*/

      $('#owl-featured-works').owlCarousel({

        navigation: true,
        pagination: false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
          [0, 1],
          [450, 2],
          [700, 3],
          [1000, 3],
          [1200, 3],
          [1400, 4],
          [1600, 4],
        ],

      });


      /* Photography v2
			-------------------------------------------------------*/

      $('#owl-photography').owlCarousel({

        autoHeight: true,
        navigation: true,
        slideSpeed: 700,
        singleItem: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],

      });


      /* Single Image
			-------------------------------------------------------*/

      $('#owl-single').owlCarousel({

        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],

      });


      /* Agency Promo
			-------------------------------------------------------*/
      const owlpromo = $('#owl-promo');
      owlpromo.owlCarousel({

        pagination: false,
        singleItem: true,
        transitionStyle: 'goDown',

      });


      /* Related Works
			-------------------------------------------------------*/

      const owl = $('#owl-related-works');
      owl.owlCarousel({

        slideSpeed: 300,
        paginationSpeed: 400,
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        pagination: false,

      });

      // Custom Navigation Events
      $('.next').on('click', () => {
        owl.trigger('owl.next');
        owlpromo.trigger('owl.next');
      });
      $('.prev').on('click', () => {
        owl.trigger('owl.prev');
        owlpromo.trigger('owl.prev');
      });


      /* Related Shop Products
			-------------------------------------------------------*/

      $('#owl-related-products').owlCarousel({

        slideSpeed: 300,
        paginationSpeed: 400,
        items: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        pagination: false,
        autoPlay: true,
        stopOnHover: true,

      });
    }(jQuery));
  }


  /* Slick Slider
	-------------------------------------------------------*/

  $('.slick-slider.photography-v2').slick({
    centerMode: true,
    centerPadding: '370px',
    slidesToShow: 1,
    touchThreshold: 15,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  });


  const slides = $('.slider-for .slick-track > .slick-slide').length;
  $('.slider-for').on('afterChange', (event, slick, currentSlide, nextSlide) => {
    const inFocus = $('.slider-for .slick-current').attr('data-slick-index');
    $('.slider-nav .slick-current').removeClass('slick-current');
    $(`.slider-nav .slick-slide[data-slick-index="${inFocus}"]`).addClass('slick-current');
  });


  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 15,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav',
  });

  $('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    touchThreshold: 15,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: false,
    focusOnSelect: true,
  });


  /* FlexSlider
	-------------------------------------------------------*/

  function masonry() {
    const $container = $('.masonry');
    $container.imagesLoaded(() => {
      $container.isotope({
        itemSelector: '.masonry-item',
        layoutMode: 'masonry',
      });
    });
  }


  // Flexslider / Masonry
  $('#flexslider').flexslider({
    animation: 'slide',
    directionNav: true,
    touch: true,
    slideshow: false,
    prevText: ["<i class='fa fa-angle-left'></i>"],
    nextText: ["<i class='fa fa-angle-right'></i>"],
    start() {
      const $container = $('.masonry');
      $container.imagesLoaded(() => {
        $container.isotope({
          itemSelector: '.masonry-item',
          layoutMode: 'masonry',
        });
      });
    },
  });


  $('#ticker').flexslider({
    animation: 'slide',
    controlNav: false,
    animationLoop: true,
    slideshow: true,
    touch: true,
    slideshowSpeed: 4000,
    prevText: ["<i class='fa fa-angle-left'></i>"],
    nextText: ["<i class='fa fa-angle-right'></i>"],
  });


  /* Flickity Slider (shop product)
	-------------------------------------------------------*/

  // main large image
  const $gallery = $('.gallery-main').flickity({
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
    autoPlay: false,
    prevNextButtons: true,
    percentPosition: true,
    imagesLoaded: true,
    lazyLoad: 1,
    pageDots: false,
    selectedAttraction: 0.1,
    friction: 0.6,
    rightToLeft: false,
    arrowShape: 'M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z',
  });

  // thumbs
  $('.gallery-thumbs').flickity({
    asNavFor: '.gallery-main',
    contain: true,
    cellAlign: 'left',
    wrapAround: false,
    autoPlay: false,
    prevNextButtons: false,
    percentPosition: true,
    imagesLoaded: true,
    pageDots: false,
    selectedAttraction: 0.1,
    friction: 0.6,
    rightToLeft: false,
  });


  // magnific popup bug fix
  const flkty = $gallery.data('flickity');
  const arr = $.map($('.gallery-main').find('img'), el => ({ src: el.src }));

  $gallery.on('staticClick', (event, pointer, cellElement, cellIndex) => {
    if (!cellElement) {
      return;
    }

    $.magnificPopup.open({
      items: arr,
      gallery: {
    	  enabled: true,
    	},
      type: 'image',
    }, cellIndex);
  });


  /* Progress Bars
	-------------------------------------------------------*/


  /* Pie Charts
	-------------------------------------------------------*/
  $('.chart').appear(function () {
    $(this).easyPieChart({

      animate: {
        duration: 1500,
        enabled: true,
      },
      scaleColor: false,
      trackColor: '#f7f7f7',
      lineWidth: 3,
      size: 160,
      lineCap: 'square',

      onStep(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent));
      },
    });
    const chart = window.chart = $('.chart').data('easyPieChart');
    $('.js_update').on('click', () => {
      chart.update(Math.random() * 200 - 100);
    });
  });


  /* Accordion
	-------------------------------------------------------*/
  function toggleChevron(e) {
    $(e.target)
      .prev('.panel-heading')
      .find('a')
      .toggleClass('plus minus');
  }
  $('#accordion').on('hide.bs.collapse', toggleChevron);
  $('#accordion').on('show.bs.collapse', toggleChevron);


  /* Toggle
	-------------------------------------------------------*/
  const allToggles = $('.toggle > .panel-content').hide();

  $('.toggle > .acc-panel > a').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).parent().next().slideUp('easeOutExpo');
      $(this).removeClass('active');
    } else {
      $(this).parent().next('.panel-content');
      $(this).addClass('active');
      $(this).parent().next().slideDown('easeOutExpo');
    }

    return false;
  });


  /* Payment Method Accordion
	-------------------------------------------------------*/
  const Methods = $('.payment_methods > li > .payment_box').hide();
  Methods.first().slideDown('easeOutExpo');

  $('.payment_methods > li > input').change(function () {
    const current = $(this).parent().children('.payment_box');
    Methods.not(current).slideUp('easeInExpo');
    $(this).parent().children('.payment_box').slideDown('easeOutExpo');

    return false;
  });


  /* Quantity
	-------------------------------------------------------*/
  $(() => {
    // Increase
    jQuery(document).on('click', '.plus', function (e) {
      e.preventDefault();
      const quantityInput = jQuery(this).parents('.quantity').find('input.qty');


      const newValue = parseInt(quantityInput.val(), 10) + 1;


      let maxValue = parseInt(quantityInput.attr('max'), 10);

      if (!maxValue) {
        maxValue = 9999999999;
      }

      if (newValue <= maxValue) {
        quantityInput.val(newValue);
        quantityInput.change();
      }
    });

    // Decrease
    jQuery(document).on('click', '.minus', function (e) {
      e.preventDefault();
      const quantityInput = jQuery(this).parents('.quantity').find('input.qty');


      const newValue = parseInt(quantityInput.val(), 10) - 1;


      let minValue = parseInt(quantityInput.attr('min'), 10);

      if (!minValue) {
        minValue = 1;
      }

      if (newValue >= minValue) {
        quantityInput.val(newValue);
        quantityInput.change();
      }
    });
  });


  /* Lightbox popup
	-------------------------------------------------------*/

  $('.lightbox-gallery').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    image: {
      titleSrc: 'title',
      verticalFit: true,
    },
  });


  $('.lightbox-video').magnificPopup();

  $('.lightbox-product').magnificPopup({
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    image: {
      titleSrc: 'title',
      verticalFit: true,
    },
  });


  /* Tooltip
	-------------------------------------------------------*/
  $(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });


  /* Portfolio Isotope
	-------------------------------------------------------*/

  const $portfolio = $('#portfolio-container');
  $portfolio.imagesLoaded(() => {
    $portfolio.isotope({
      isOriginLeft: true,
    });
    $portfolio.isotope();
  });

  // filter items on button click
  $('.portfolio-filter').on('click', 'a', function (e) {
    e.preventDefault();
    const filterValue = $(this).attr('data-filter');
    $portfolio.isotope({ filter: filterValue });

    $('.portfolio-filter a').removeClass('active');
    $(this).closest('a').addClass('active');
  });


  /* Parallax
	-------------------------------------------------------*/

  $.stellar({
    horizontalScrolling: false,
  });


  $(window).load(() => {
    setTimeout(() => {
      $.stellar('refresh');
    }, 1000);
  });


  // Wow Animations

  const wow = new WOW({
    offset: 50,
    mobile: false,
  });

  wow.init();

  /* FitVIds
	-------------------------------------------------------*/
  $('.video-wrap').fitVids();


  /* Contact Form
	-------------------------------------------------------*/

  const submitContact = $('#submit-message');


  const message = $('#msg');

  submitContact.on('click', function (e) {
    e.preventDefault();

    const $this = $(this);

    $.ajax({
      type: 'POST',
      url: 'contact.php',
      dataType: 'json',
      cache: false,
      data: $('#contact-form').serialize(),
      success(data) {
        if (data.info !== 'error') {
          $this.parents('form').find('input[type=text],input[type=email],textarea,select').filter(':visible').val('');
          message.hide().removeClass('success').removeClass('error').addClass('success')
            .html(data.msg)
            .fadeIn('slow')
            .delay(5000)
            .fadeOut('slow');
        } else {
          message.hide().removeClass('success').removeClass('error').addClass('error')
            .html(data.msg)
            .fadeIn('slow')
            .delay(5000)
            .fadeOut('slow');
        }
      },
    });
  });
}(jQuery));


/* Scroll to Top
-------------------------------------------------------*/

(function () {
  const docElem = document.documentElement;


  let didScroll = false;


  const changeHeaderOn = 550;
  document.querySelector('#back-to-top');
  function init() {
    window.addEventListener('scroll', () => {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 50);
      }
    }, false);
  }
}());

$(window).scroll((event) => {
  const scroll = $(window).scrollTop();
  if (scroll >= 50) {
    $('#back-to-top').addClass('show');
  } else {
    $('#back-to-top').removeClass('show');
  }
});

$('a[href="#top"]').on('click', () => {
  $('html, body').animate({ scrollTop: 0 }, 1350, 'easeInOutQuint');
  return false;
});


/* Full Height Container
-------------------------------------------------------*/

function container_full_height_init() {
  (function ($) {
    $('.container-full-height').height($(window).height());
  }(jQuery));
}


/* Container Photo Height
-------------------------------------------------------*/

function container_photo_height_init() {
  (function ($) {
    $('.container-photo-height').height($(window).height() - $('.nav-type-2').height() - $('.footer-type-5').height());
  }(jQuery));
}


/* Style Switcher
-------------------------------------------------------*/


$('.corner').on('click', () => {
  $('#customizer').toggleClass('s-open');
});
