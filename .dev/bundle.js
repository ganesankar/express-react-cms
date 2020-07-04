
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var myapp = (function () {
    'use strict';

    function noop() {}

    function assign(tar, src) {
    	for (var k in src) tar[k] = src[k];
    	return tar;
    }

    function assignTrue(tar, src) {
    	for (var k in src) tar[k] = 1;
    	return tar;
    }

    function callAfter(fn, i) {
    	if (i === 0) fn();
    	return () => {
    		if (!--i) fn();
    	};
    }

    function addLoc(element, file, line, column, char) {
    	element.__svelte_meta = {
    		loc: { file, line, column, char }
    	};
    }

    function run(fn) {
    	fn();
    }

    function append(target, node) {
    	target.appendChild(node);
    }

    function insert(target, node, anchor) {
    	target.insertBefore(node, anchor);
    }

    function detachNode(node) {
    	node.parentNode.removeChild(node);
    }

    function reinsertChildren(parent, target) {
    	while (parent.firstChild) target.appendChild(parent.firstChild);
    }

    function createFragment() {
    	return document.createDocumentFragment();
    }

    function createElement(name) {
    	return document.createElement(name);
    }

    function createText(data) {
    	return document.createTextNode(data);
    }

    function setAttribute(node, attribute, value) {
    	if (value == null) node.removeAttribute(attribute);
    	else node.setAttribute(attribute, value);
    }

    function setStyle(node, key, value) {
    	node.style.setProperty(key, value);
    }

    function blankObject() {
    	return Object.create(null);
    }

    function destroy(detach) {
    	this.destroy = noop;
    	this.fire('destroy');
    	this.set = noop;

    	this._fragment.d(detach !== false);
    	this._fragment = null;
    	this._state = {};
    }

    function destroyDev(detach) {
    	destroy.call(this, detach);
    	this.destroy = function() {
    		console.warn('Component was already destroyed');
    	};
    }

    function _differs(a, b) {
    	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function fire(eventName, data) {
    	var handlers =
    		eventName in this._handlers && this._handlers[eventName].slice();
    	if (!handlers) return;

    	for (var i = 0; i < handlers.length; i += 1) {
    		var handler = handlers[i];

    		if (!handler.__calling) {
    			try {
    				handler.__calling = true;
    				handler.call(this, data);
    			} finally {
    				handler.__calling = false;
    			}
    		}
    	}
    }

    function flush(component) {
    	component._lock = true;
    	callAll(component._beforecreate);
    	callAll(component._oncreate);
    	callAll(component._aftercreate);
    	component._lock = false;
    }

    function get() {
    	return this._state;
    }

    function init(component, options) {
    	component._handlers = blankObject();
    	component._slots = blankObject();
    	component._bind = options._bind;
    	component._staged = {};

    	component.options = options;
    	component.root = options.root || component;
    	component.store = options.store || component.root.store;

    	if (!options.root) {
    		component._beforecreate = [];
    		component._oncreate = [];
    		component._aftercreate = [];
    	}
    }

    function on(eventName, handler) {
    	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
    	handlers.push(handler);

    	return {
    		cancel: function() {
    			var index = handlers.indexOf(handler);
    			if (~index) handlers.splice(index, 1);
    		}
    	};
    }

    function set(newState) {
    	this._set(assign({}, newState));
    	if (this.root._lock) return;
    	flush(this.root);
    }

    function _set(newState) {
    	var oldState = this._state,
    		changed = {},
    		dirty = false;

    	newState = assign(this._staged, newState);
    	this._staged = {};

    	for (var key in newState) {
    		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
    	}
    	if (!dirty) return;

    	this._state = assign(assign({}, oldState), newState);
    	this._recompute(changed, this._state);
    	if (this._bind) this._bind(changed, this._state);

    	if (this._fragment) {
    		this.fire("state", { changed: changed, current: this._state, previous: oldState });
    		this._fragment.p(changed, this._state);
    		this.fire("update", { changed: changed, current: this._state, previous: oldState });
    	}
    }

    function _stage(newState) {
    	assign(this._staged, newState);
    }

    function setDev(newState) {
    	if (typeof newState !== 'object') {
    		throw new Error(
    			this._debugName + '.set was called without an object of data key-values to update.'
    		);
    	}

    	this._checkReadOnly(newState);
    	set.call(this, newState);
    }

    function callAll(fns) {
    	while (fns && fns.length) fns.shift()();
    }

    function _mount(target, anchor) {
    	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
    }

    var protoDev = {
    	destroy: destroyDev,
    	get,
    	fire,
    	on,
    	set: setDev,
    	_recompute: noop,
    	_set,
    	_stage,
    	_mount,
    	_differs
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var svelteRouter = createCommonjsModule(function (module, exports) {
    !function(t,n){module.exports=n();}(commonjsGlobal,function(){function e(t){return (e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o);}}function c(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function n(){}function i(t,n){for(var e in n)t[e]=n[e];return t}function o(t,n){t._handlers=Object.create(null),t._bind=n._bind,t.options=n,t.root=n.root||t,t.store=n.store||t.root.store;}function a(t){for(;t&&t.length;)t.shift()();}var s="router-link-active";var t={navigate:function(t,n){(t.preventDefault(),n)&&(history.location.pathname!==n&&(this.get().replace?history.replace(n):history.push(n)));},setActiveClass:function(t){var n=this.get(),e=n.match,o=n.to,r=t.pathname===o;if(!r){var i=e.split("/"),a=t.pathname.split("/");if(i.length===a.length){for(var s=!1,c=0;c<i.length&&(s=i[c]===a[c]||0===i[c].indexOf(":"));c++);r=s;}}this.set({isActive:r});}};function u(){this.get().event();}function h(n,o){var i,a=n._slotted.default;function r(t){n.navigate(t,o.to);}return {c:function(){var t,n,e;t="a",i=document.createElement(t),n="click",e=r,i.addEventListener(n,e,!1),i.href=o.to,i.className=o.computedClassName;},m:function(t,n){var e,o,r;e=i,o=n,t.insertBefore(e,o),a&&(r=a,i.appendChild(r));},p:function(t,n){o=n,t.to&&(i.href=o.to),t.computedClassName&&(i.className=o.computedClassName);},d:function(t){var n,e,o;t&&(n=i).parentNode.removeChild(n),a&&function(t,n){for(;t.firstChild;)n.appendChild(t.firstChild);}(i,a),e="click",o=r,i.removeEventListener(e,o,!1);}}}function f(t){var n=this;o(this,t),this._state=i({replace:!1,to:"/",isActive:!1,className:"",activeClassName:s,event:null,match:""},t.data),this._recompute({isActive:1,className:1,activeClassName:1},this._state),this._intro=!0,this._handlers.destroy=[u],this._slotted=t.slots||{},t.root||(this._oncreate=[]),this.slots={},this._fragment=h(this,this._state),this.root._oncreate.push(function(){(function(){this.setActiveClass(history.location),this.set({event:history.listen(this.setActiveClass.bind(this))});}).call(n),n.fire("update",{changed:function(t,n){for(var e in n)t[e]=1;return t}({},n._state),current:n._state});}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),a(this._oncreate));}i(f.prototype,{destroy:function(t){this.destroy=n,this.fire("destroy"),this.set=n,this._fragment.d(!1!==t),this._fragment=null,this._state={};},get:function(){return this._state},fire:function(t,n){var e=t in this._handlers&&this._handlers[t].slice();if(e)for(var o=0;o<e.length;o+=1){var r=e[o];if(!r.__calling)try{r.__calling=!0,r.call(this,n);}finally{r.__calling=!1;}}},on:function(t,n){var e=this._handlers[t]||(this._handlers[t]=[]);return e.push(n),{cancel:function(){var t=e.indexOf(n);~t&&e.splice(t,1);}}},set:function(t){this._set(i({},t)),this.root._lock||(this.root._lock=!0,a(this.root._beforecreate),a(this.root._oncreate),a(this.root._aftercreate),this.root._lock=!1);},_recompute:n,_set:function(t){var n=this._state,e={},o=!1;for(var r in t)this._differs(t[r],n[r])&&(e[r]=o=!0);o&&(this._state=i(i({},n),t),this._recompute(e,this._state),this._bind&&this._bind(e,this._state),this._fragment&&(this.fire("state",{changed:e,current:this._state,previous:n}),this._fragment.p(e,this._state),this.fire("update",{changed:e,current:this._state,previous:n})));},_mount:function(t,n){this._fragment[this._fragment.i?"i":"m"](t,n||null);},_differs:function(t,n){return t!=t?n==n:t!==n||t&&"object"===e(t)||"function"==typeof t}}),i(f.prototype,t),f.prototype._recompute=function(t,n){var e,o,r,i,a;(t.isActive||t.className||t.activeClassName)&&this._differs(n.computedClassName,n.computedClassName=(o=(e=n).isActive,r=e.className,i=e.activeClassName,a=[],"string"==typeof r&&a.push(r),o&&a.push(i),a.join(" ")))&&(t.computedClassName=!0);};var E=function(){},j=function(t,n,e,o,r,i,a,s){if(!t){var c;if(void 0===n)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[e,o,r,i,a,s],h=0;(c=new Error(n.replace(/%s/g,function(){return u[h++]}))).name="Invariant Violation";}throw c.framesToPop=1,c}};function d(t){return "/"===t.charAt(0)}function p(t,n){for(var e=n,o=e+1,r=t.length;o<r;e+=1,o+=1)t[e]=t[o];t.pop();}var l="function"==typeof Symbol&&"symbol"===e(Symbol.iterator)?function(t){return e(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":e(t)};var v,T=function(t){return "/"===t.charAt(0)?t:"/"+t},m=function(t){return "/"===t.charAt(0)?t.substr(1):t},L=function(t,n){return new RegExp("^"+n+"(\\/|\\?|#|$)","i").test(t)},R=function(t,n){return L(t,n)?t.substr(n.length):t},N=function(t){return "/"===t.charAt(t.length-1)?t.slice(0,-1):t},H=function(t){var n=t.pathname,e=t.search,o=t.hash,r=n||"/";return e&&"?"!==e&&(r+="?"===e.charAt(0)?e:"?"+e),o&&"#"!==o&&(r+="#"===o.charAt(0)?o:"#"+o),r},y=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);}return t},U=function(t,n,e,o){var r=void 0;"string"==typeof t?(r=function(t){var n=t||"/",e="",o="",r=n.indexOf("#");-1!==r&&(o=n.substr(r),n=n.substr(0,r));var i=n.indexOf("?");return -1!==i&&(e=n.substr(i),n=n.substr(0,i)),{pathname:n,search:"?"===e?"":e,hash:"#"===o?"":o}}(t)).state=n:(void 0===(r=y({},t)).pathname&&(r.pathname=""),r.search?"?"!==r.search.charAt(0)&&(r.search="?"+r.search):r.search="",r.hash?"#"!==r.hash.charAt(0)&&(r.hash="#"+r.hash):r.hash="",void 0!==n&&void 0===r.state&&(r.state=n));try{r.pathname=decodeURI(r.pathname);}catch(t){throw t instanceof URIError?new URIError('Pathname "'+r.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return e&&(r.key=e),o?r.pathname?"/"!==r.pathname.charAt(0)&&(r.pathname=function(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",e=t&&t.split("/")||[],o=n&&n.split("/")||[],r=t&&d(t),i=n&&d(n),a=r||i;if(t&&d(t)?o=e:e.length&&(o.pop(),o=o.concat(e)),!o.length)return "/";var s=void 0;if(o.length){var c=o[o.length-1];s="."===c||".."===c||""===c;}else s=!1;for(var u=0,h=o.length;0<=h;h--){var f=o[h];"."===f?p(o,h):".."===f?(p(o,h),u++):u&&(p(o,h),u--);}if(!a)for(;u--;u)o.unshift("..");!a||""===o[0]||o[0]&&d(o[0])||o.unshift("");var l=o.join("/");return s&&"/"!==l.substr(-1)&&(l+="/"),l}(r.pathname,o.pathname)):r.pathname=o.pathname:r.pathname||(r.pathname="/"),r},C=function(t,n){return t.pathname===n.pathname&&t.search===n.search&&t.hash===n.hash&&t.key===n.key&&function e(n,o){if(n===o)return !0;if(null==n||null==o)return !1;if(Array.isArray(n))return Array.isArray(o)&&n.length===o.length&&n.every(function(t,n){return e(t,o[n])});var t=void 0===n?"undefined":l(n);if(t!==(void 0===o?"undefined":l(o)))return !1;if("object"===t){var r=n.valueOf(),i=o.valueOf();if(r!==n||i!==o)return e(r,i);var a=Object.keys(n),s=Object.keys(o);return a.length===s.length&&a.every(function(t){return e(n[t],o[t])})}return !1}(t.state,n.state)},I=function(){var i=null,o=[];return {setPrompt:function(t){return i=t,function(){i===t&&(i=null);}},confirmTransitionTo:function(t,n,e,o){if(null!=i){var r="function"==typeof i?i(t,n):i;"string"==typeof r?"function"==typeof e?e(r,o):(o(!0)):o(!1!==r);}else o(!0);},appendListener:function(t){var n=!0,e=function(){n&&t.apply(void 0,arguments);};return o.push(e),function(){n=!1,o=o.filter(function(t){return t!==e});}},notifyListeners:function(){for(var t=arguments.length,n=Array(t),e=0;e<t;e++)n[e]=arguments[e];o.forEach(function(t){return t.apply(void 0,n)});}}},M=!("undefined"==typeof window||!window.document||!window.document.createElement),B=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent("on"+n,e)},D=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent("on"+n,e)},Y=function(t,n){return n(window.confirm(t))},F="function"==typeof Symbol&&"symbol"===e(Symbol.iterator)?function(t){return e(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":e(t)},z=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);}return t},V="popstate",Z="hashchange",$=function(){try{return window.history.state||{}}catch(t){return {}}},g=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};j(M,"Browser history needs a DOM");var n,s=window.history,c=(-1===(n=window.navigator.userAgent).indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history,e=!(-1===window.navigator.userAgent.indexOf("Trident")),o=t.forceRefresh,u=void 0!==o&&o,r=t.getUserConfirmation,h=void 0===r?Y:r,i=t.keyLength,a=void 0===i?6:i,f=t.basename?N(T(t.basename)):"",l=function(t){var n=t||{},e=n.key,o=n.state,r=window.location,i=r.pathname+r.search+r.hash;return E(!f||L(i,f),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+i+'" to begin with "'+f+'".'),f&&(i=R(i,f)),U(i,o,e)},d=function(){return Math.random().toString(36).substr(2,a)},p=I(),v=function(t){z(C,t),C.length=s.length,p.notifyListeners(C.location,C.action);},m=function(t){void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")||w(l(t.state));},y=function(){w(l($()));},g=!1,w=function(n){if(g)g=!1,v();else{p.confirmTransitionTo(n,"POP",h,function(t){t?v({action:"POP",location:n}):b(n);});}},b=function(t){var n=C.location,e=O.indexOf(n.key);-1===e&&(e=0);var o=O.indexOf(t.key);-1===o&&(o=0);var r=e-o;r&&(g=!0,k(r));},_=l($()),O=[_.key],P=function(t){return f+H(t)},k=function(t){s.go(t);},A=0,x=function(t){1===(A+=t)?(B(window,V,m),e&&B(window,Z,y)):0===A&&(D(window,V,m),e&&D(window,Z,y));},S=!1,C={length:s.length,action:"POP",location:_,createHref:P,push:function(t,n){E(!("object"===(void 0===t?"undefined":F(t))&&void 0!==t.state&&void 0!==n),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var a=U(t,n,d(),C.location);p.confirmTransitionTo(a,"PUSH",h,function(t){if(t){var n=P(a),e=a.key,o=a.state;if(c)if(s.pushState({key:e,state:o},null,n),u)window.location.href=n;else{var r=O.indexOf(C.location.key),i=O.slice(0,-1===r?0:r+1);i.push(a.key),O=i,v({action:"PUSH",location:a});}else window.location.href=n;}});},replace:function(t,n){E(!("object"===(void 0===t?"undefined":F(t))&&void 0!==t.state&&void 0!==n),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var i="REPLACE",a=U(t,n,d(),C.location);p.confirmTransitionTo(a,i,h,function(t){if(t){var n=P(a),e=a.key,o=a.state;if(c)if(s.replaceState({key:e,state:o},null,n),u)window.location.replace(n);else{var r=O.indexOf(C.location.key);-1!==r&&(O[r]=a.key),v({action:i,location:a});}else window.location.replace(n);}});},go:k,goBack:function(){return k(-1)},goForward:function(){return k(1)},block:function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],n=p.setPrompt(t);return S||(x(1),S=!0),function(){return S&&(S=!1,x(-1)),n()}},listen:function(t){var n=p.appendListener(t);return x(1),function(){x(-1),n();}}};return C},q=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);}return t},W="hashchange",G={hashbang:{encodePath:function(t){return "!"===t.charAt(0)?t:"!/"+m(t)},decodePath:function(t){return "!"===t.charAt(0)?t.substr(1):t}},noslash:{encodePath:m,decodePath:T},slash:{encodePath:T,decodePath:T}},J=function(){var t=window.location.href,n=t.indexOf("#");return -1===n?"":t.substring(n+1)},K=function(t){var n=window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0,0<=n?n:0)+"#"+t);},w=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};j(M,"Hash history needs a DOM");var n=window.history,e=-1===window.navigator.userAgent.indexOf("Firefox"),o=t.getUserConfirmation,s=void 0===o?Y:o,r=t.hashType,i=void 0===r?"slash":r,c=t.basename?N(T(t.basename)):"",a=G[i],u=a.encodePath,h=a.decodePath,f=function(){var t=h(J());return E(!c||L(t,c),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+t+'" to begin with "'+c+'".'),c&&(t=R(t,c)),U(t)},l=I(),d=function(t){q(S,t),S.length=n.length,l.notifyListeners(S.location,S.action);},p=!1,v=null,m=function(){var t=J(),n=u(t);if(t!==n)K(n);else{var e=f(),o=S.location;if(!p&&C(o,e))return;if(v===H(e))return;v=null,y(e);}},y=function(n){if(p)p=!1,d();else{l.confirmTransitionTo(n,"POP",s,function(t){t?d({action:"POP",location:n}):g(n);});}},g=function(t){var n=S.location,e=O.lastIndexOf(H(n));-1===e&&(e=0);var o=O.lastIndexOf(H(t));-1===o&&(o=0);var r=e-o;r&&(p=!0,P(r));},w=J(),b=u(w);w!==b&&K(b);var _=f(),O=[H(_)],P=function(t){n.go(t);},k=0,A=function(t){1===(k+=t)?B(window,W,m):0===k&&D(window,W,m);},x=!1,S={length:n.length,action:"POP",location:_,createHref:function(t){return "#"+u(c+H(t))},push:function(t,n){var a=U(t,void 0,void 0,S.location);l.confirmTransitionTo(a,"PUSH",s,function(t){if(t){var n,e=H(a),o=u(c+e);if(J()!==o){v=e,n=o,window.location.hash=n;var r=O.lastIndexOf(H(S.location)),i=O.slice(0,-1===r?0:r+1);i.push(e),O=i,d({action:"PUSH",location:a});}else d();}});},replace:function(t,n){var r="REPLACE",i=U(t,void 0,void 0,S.location);l.confirmTransitionTo(i,r,s,function(t){if(t){var n=H(i),e=u(c+n);J()!==e&&(v=n,K(e));var o=O.indexOf(H(S.location));-1!==o&&(O[o]=n),d({action:r,location:i});}});},go:P,goBack:function(){return P(-1)},goForward:function(){return P(1)},block:function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],n=l.setPrompt(t);return x||(A(1),x=!0),function(){return x&&(x=!1,A(-1)),n()}},listen:function(t){var n=l.appendListener(t);return A(1),function(){A(-1),n();}}};return S},b="[a-zA-Z]+",_=function(t,n,e,o){var r=t[n],i=r.Component,a=r.props;i||(i=t[n]);var s={data:{path:o}};return a=a||{},Object.prototype.hasOwnProperty.call(a,"data")&&(a.data.path=o,s={}),new i(function(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},o=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.forEach(function(t){c(n,t,e[t]);});}return n}({target:e},a,s))},O=function(t,o){var n=t.filter(function(t){return null!==t.match(new RegExp(":".concat(b)))}).map(function(t){return t.match(new RegExp(":(".concat(b,")")))[1]}),r={};return n.forEach(function(t,n){var e=n+1;r[t]=o[e];}),r},P="default",k=function(){function n(t){var s=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),c(this,"target",null),c(this,"listener",null),c(this,"content",null),c(this,"options",{}),c(this,"handleRouteChange",function(t){var n=!1;for(var e in s.content&&(s.content.destroy(),s.content=null),s.options.routes)if(Object.prototype.hasOwnProperty.call(s.options.routes,e)){var o=e.split("/"),r=o.map(function(t){return null!==t.match(new RegExp(":".concat(b)))?"([a-zA-Z0-9]+)":t}).join("\\/"),i=t.pathname.match(new RegExp("^".concat(r,"$")));if(null!==i){var a=O(o,i);s.content=_(s.options.routes,e,s.target,a),n=!0;break}}!n&&s.options.routes[P]&&(s.content=_(s.options.routes,P,s.target,{}));}),this.options=t,v=function(t){switch(t){case"history":return g();default:return w()}}(t.mode),Object.defineProperty(window,"history",{get:function(){return v}});}var t,e;return t=n,(e=[{key:"create",value:function(t){this.target="string"==typeof t?document.querySelector(t):t,this.listener=v.listen(this.handleRouteChange),this.handleRouteChange(v.location);}},{key:"destroy",value:function(){this.listener&&(this.listener(),this.listener=null);}}])&&r(t.prototype,e),n}();return k.push=function(t){v.push(t);},k.replace=function(t){v.replace(t);},k.go=function(t){v.go(t);},k.listen=function(t){v.listen(t);},k.__VERSION__="2.0.0-beta.1",k.RouterLink=f,k});
    });

    /* src/views/Home.html generated by Svelte v2.16.1 */

    const file = "src/views/Home.html";

    function create_main_fragment(component, ctx) {
    	var div33, div2, div0, h4, text1, div1, a0, text3, ol, li0, a1, text5, div12, div5, div4, h30, text7, ul0, li1, div3, text8, li2, i0, text9, span0, text11, div8, div7, h31, text13, ul1, li3, div6, text14, li4, i1, text15, span1, text17, div11, div10, h32, text19, ul2, li5, div9, text20, li6, i2, text21, span2, text23, div17, div16, div15, div13, select, option0, option1, option2, option3, option4, text29, h33, text31, div14, table, thead, tr0, th0, text33, th1, text35, th2, text37, th3, text39, th4, text41, tbody, tr1, td0, text43, td1, text45, td2, text47, td3, text49, td4, span3, text51, tr2, td5, text53, td6, text55, td7, text57, td8, text59, td9, span4, text61, tr3, td10, text63, td11, text65, td12, text67, td13, text69, td14, span5, text71, tr4, td15, text73, td16, text75, td17, text77, td18, text79, td19, span6, text81, tr5, td20, text83, td21, text85, td22, text87, td23, text89, td24, span7, text91, tr6, td25, text93, td26, text95, td27, text97, td28, text99, td29, span8, text101, tr7, td30, text103, td31, text105, td32, text107, td33, text109, td34, span9, text111, div32, div29, div28, h34, text113, div27, div20, div18, img0, text114, div19, h50, span10, text117, br0, span11, text119, a2, i3, text120, a3, i4, text121, text122, div23, div21, img1, text123, div22, h51, span12, text126, br1, span13, text128, div26, div24, img2, text129, div25, h52, span14, text132, br2, span15, text134, div31, div30, current;

    	return {
    		c: function create() {
    			div33 = createElement("div");
    			div2 = createElement("div");
    			div0 = createElement("div");
    			h4 = createElement("h4");
    			h4.textContent = "Dashboard";
    			text1 = createText("\n        ");
    			div1 = createElement("div");
    			a0 = createElement("a");
    			a0.textContent = "Upgrade to Pro";
    			text3 = createText("\n            ");
    			ol = createElement("ol");
    			li0 = createElement("li");
    			a1 = createElement("a");
    			a1.textContent = "Dashboard";
    			text5 = createText("\n    \n    \n    \n    \n    \n    ");
    			div12 = createElement("div");
    			div5 = createElement("div");
    			div4 = createElement("div");
    			h30 = createElement("h3");
    			h30.textContent = "Total Visit";
    			text7 = createText("\n                ");
    			ul0 = createElement("ul");
    			li1 = createElement("li");
    			div3 = createElement("div");
    			text8 = createText("\n                    ");
    			li2 = createElement("li");
    			i0 = createElement("i");
    			text9 = createText(" ");
    			span0 = createElement("span");
    			span0.textContent = "659";
    			text11 = createText("\n        ");
    			div8 = createElement("div");
    			div7 = createElement("div");
    			h31 = createElement("h3");
    			h31.textContent = "Total Page Views";
    			text13 = createText("\n                ");
    			ul1 = createElement("ul");
    			li3 = createElement("li");
    			div6 = createElement("div");
    			text14 = createText("\n                    ");
    			li4 = createElement("li");
    			i1 = createElement("i");
    			text15 = createText(" ");
    			span1 = createElement("span");
    			span1.textContent = "869";
    			text17 = createText("\n        ");
    			div11 = createElement("div");
    			div10 = createElement("div");
    			h32 = createElement("h3");
    			h32.textContent = "Unique Visitor";
    			text19 = createText("\n                ");
    			ul2 = createElement("ul");
    			li5 = createElement("li");
    			div9 = createElement("div");
    			text20 = createText("\n                    ");
    			li6 = createElement("li");
    			i2 = createElement("i");
    			text21 = createText(" ");
    			span2 = createElement("span");
    			span2.textContent = "911";
    			text23 = createText("\n    \n    ");
    			div17 = createElement("div");
    			div16 = createElement("div");
    			div15 = createElement("div");
    			div13 = createElement("div");
    			select = createElement("select");
    			option0 = createElement("option");
    			option0.textContent = "March 2017";
    			option1 = createElement("option");
    			option1.textContent = "April 2017";
    			option2 = createElement("option");
    			option2.textContent = "May 2017";
    			option3 = createElement("option");
    			option3.textContent = "June 2017";
    			option4 = createElement("option");
    			option4.textContent = "July 2017";
    			text29 = createText("\n                ");
    			h33 = createElement("h3");
    			h33.textContent = "Recent sales";
    			text31 = createText("\n                ");
    			div14 = createElement("div");
    			table = createElement("table");
    			thead = createElement("thead");
    			tr0 = createElement("tr");
    			th0 = createElement("th");
    			th0.textContent = "#";
    			text33 = createText("\n                                ");
    			th1 = createElement("th");
    			th1.textContent = "NAME";
    			text35 = createText("\n                                ");
    			th2 = createElement("th");
    			th2.textContent = "STATUS";
    			text37 = createText("\n                                ");
    			th3 = createElement("th");
    			th3.textContent = "DATE";
    			text39 = createText("\n                                ");
    			th4 = createElement("th");
    			th4.textContent = "PRICE";
    			text41 = createText("\n                        ");
    			tbody = createElement("tbody");
    			tr1 = createElement("tr");
    			td0 = createElement("td");
    			td0.textContent = "1";
    			text43 = createText("\n                                ");
    			td1 = createElement("td");
    			td1.textContent = "Elite admin";
    			text45 = createText("\n                                ");
    			td2 = createElement("td");
    			td2.textContent = "SALE";
    			text47 = createText("\n                                ");
    			td3 = createElement("td");
    			td3.textContent = "April 18, 2017";
    			text49 = createText("\n                                ");
    			td4 = createElement("td");
    			span3 = createElement("span");
    			span3.textContent = "$24";
    			text51 = createText("\n                            ");
    			tr2 = createElement("tr");
    			td5 = createElement("td");
    			td5.textContent = "2";
    			text53 = createText("\n                                ");
    			td6 = createElement("td");
    			td6.textContent = "Real Homes WP Theme";
    			text55 = createText("\n                                ");
    			td7 = createElement("td");
    			td7.textContent = "EXTENDED";
    			text57 = createText("\n                                ");
    			td8 = createElement("td");
    			td8.textContent = "April 19, 2017";
    			text59 = createText("\n                                ");
    			td9 = createElement("td");
    			span4 = createElement("span");
    			span4.textContent = "$1250";
    			text61 = createText("\n                            ");
    			tr3 = createElement("tr");
    			td10 = createElement("td");
    			td10.textContent = "3";
    			text63 = createText("\n                                ");
    			td11 = createElement("td");
    			td11.textContent = "Ample Admin";
    			text65 = createText("\n                                ");
    			td12 = createElement("td");
    			td12.textContent = "EXTENDED";
    			text67 = createText("\n                                ");
    			td13 = createElement("td");
    			td13.textContent = "April 19, 2017";
    			text69 = createText("\n                                ");
    			td14 = createElement("td");
    			span5 = createElement("span");
    			span5.textContent = "$1250";
    			text71 = createText("\n                            ");
    			tr4 = createElement("tr");
    			td15 = createElement("td");
    			td15.textContent = "4";
    			text73 = createText("\n                                ");
    			td16 = createElement("td");
    			td16.textContent = "Medical Pro WP Theme";
    			text75 = createText("\n                                ");
    			td17 = createElement("td");
    			td17.textContent = "TAX";
    			text77 = createText("\n                                ");
    			td18 = createElement("td");
    			td18.textContent = "April 20, 2017";
    			text79 = createText("\n                                ");
    			td19 = createElement("td");
    			span6 = createElement("span");
    			span6.textContent = "-$24";
    			text81 = createText("\n                            ");
    			tr5 = createElement("tr");
    			td20 = createElement("td");
    			td20.textContent = "5";
    			text83 = createText("\n                                ");
    			td21 = createElement("td");
    			td21.textContent = "Hosting press html";
    			text85 = createText("\n                                ");
    			td22 = createElement("td");
    			td22.textContent = "SALE";
    			text87 = createText("\n                                ");
    			td23 = createElement("td");
    			td23.textContent = "April 21, 2017";
    			text89 = createText("\n                                ");
    			td24 = createElement("td");
    			span7 = createElement("span");
    			span7.textContent = "$24";
    			text91 = createText("\n                            ");
    			tr6 = createElement("tr");
    			td25 = createElement("td");
    			td25.textContent = "6";
    			text93 = createText("\n                                ");
    			td26 = createElement("td");
    			td26.textContent = "Digital Agency PSD";
    			text95 = createText("\n                                ");
    			td27 = createElement("td");
    			td27.textContent = "SALE";
    			text97 = createText("\n                                ");
    			td28 = createElement("td");
    			td28.textContent = "April 23, 2017";
    			text99 = createText("\n                                ");
    			td29 = createElement("td");
    			span8 = createElement("span");
    			span8.textContent = "-$14";
    			text101 = createText("\n                            ");
    			tr7 = createElement("tr");
    			td30 = createElement("td");
    			td30.textContent = "7";
    			text103 = createText("\n                                ");
    			td31 = createElement("td");
    			td31.textContent = "Helping Hands WP Theme";
    			text105 = createText("\n                                ");
    			td32 = createElement("td");
    			td32.textContent = "MEMBER";
    			text107 = createText("\n                                ");
    			td33 = createElement("td");
    			td33.textContent = "April 22, 2017";
    			text109 = createText("\n                                ");
    			td34 = createElement("td");
    			span9 = createElement("span");
    			span9.textContent = "$64";
    			text111 = createText("\n    ");
    			div32 = createElement("div");
    			div29 = createElement("div");
    			div28 = createElement("div");
    			h34 = createElement("h3");
    			h34.textContent = "Recent Comments";
    			text113 = createText("\n                ");
    			div27 = createElement("div");
    			div20 = createElement("div");
    			div18 = createElement("div");
    			img0 = createElement("img");
    			text114 = createText("\n                        ");
    			div19 = createElement("div");
    			h50 = createElement("h5");
    			h50.textContent = "Pavan kumar";
    			span10 = createElement("span");
    			span10.textContent = "10:20 AM   20  may 2016";
    			text117 = createText("\n                            ");
    			br0 = createElement("br");
    			span11 = createElement("span");
    			span11.textContent = "Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat";
    			text119 = createText(" ");
    			a2 = createElement("a");
    			i3 = createElement("i");
    			text120 = createText("Approve");
    			a3 = createElement("a");
    			i4 = createElement("i");
    			text121 = createText(" Reject");
    			text122 = createText("\n                    ");
    			div23 = createElement("div");
    			div21 = createElement("div");
    			img1 = createElement("img");
    			text123 = createText("\n                        ");
    			div22 = createElement("div");
    			h51 = createElement("h5");
    			h51.textContent = "Sonu Nigam";
    			span12 = createElement("span");
    			span12.textContent = "10:20 AM   20  may 2016";
    			text126 = createText("\n                            ");
    			br1 = createElement("br");
    			span13 = createElement("span");
    			span13.textContent = "Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat";
    			text128 = createText("\n                    ");
    			div26 = createElement("div");
    			div24 = createElement("div");
    			img2 = createElement("img");
    			text129 = createText("\n                        ");
    			div25 = createElement("div");
    			h52 = createElement("h5");
    			h52.textContent = "Arijit singh";
    			span14 = createElement("span");
    			span14.textContent = "10:20 AM   20  may 2016";
    			text132 = createText("\n                            ");
    			br2 = createElement("br");
    			span15 = createElement("span");
    			span15.textContent = "Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat";
    			text134 = createText("\n        ");
    			div31 = createElement("div");
    			div30 = createElement("div");
    			h4.className = "page-title";
    			addLoc(h4, file, 3, 12, 132);
    			div0.className = "col-lg-3 col-md-4 col-sm-4 col-xs-12";
    			addLoc(div0, file, 2, 8, 69);
    			a0.href = "https://wrappixel.com/templates/ampleadmin/";
    			a0.target = "_blank";
    			a0.className = "btn btn-danger pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light";
    			addLoc(a0, file, 5, 12, 248);
    			a1.href = "#";
    			addLoc(a1, file, 7, 20, 479);
    			addLoc(li0, file, 7, 16, 475);
    			ol.className = "breadcrumb";
    			addLoc(ol, file, 6, 12, 435);
    			div1.className = "col-lg-9 col-sm-8 col-md-8 col-xs-12";
    			addLoc(div1, file, 4, 8, 185);
    			div2.className = "row bg-title";
    			addLoc(div2, file, 1, 4, 34);
    			h30.className = "box-title";
    			addLoc(h30, file, 20, 16, 947);
    			div3.id = "sparklinedash";
    			addLoc(div3, file, 23, 24, 1085);
    			addLoc(li1, file, 22, 20, 1056);
    			i0.className = "ti-arrow-up text-success";
    			addLoc(i0, file, 25, 43, 1185);
    			span0.className = "counter text-success";
    			addLoc(span0, file, 25, 84, 1226);
    			li2.className = "text-right";
    			addLoc(li2, file, 25, 20, 1162);
    			ul0.className = "list-inline two-part";
    			addLoc(ul0, file, 21, 16, 1002);
    			div4.className = "white-box analytics-info";
    			addLoc(div4, file, 19, 12, 892);
    			div5.className = "col-lg-4 col-sm-6 col-xs-12";
    			addLoc(div5, file, 18, 8, 838);
    			h31.className = "box-title";
    			addLoc(h31, file, 31, 16, 1450);
    			div6.id = "sparklinedash2";
    			addLoc(div6, file, 34, 24, 1593);
    			addLoc(li3, file, 33, 20, 1564);
    			i1.className = "ti-arrow-up text-purple";
    			addLoc(i1, file, 36, 43, 1694);
    			span1.className = "counter text-purple";
    			addLoc(span1, file, 36, 83, 1734);
    			li4.className = "text-right";
    			addLoc(li4, file, 36, 20, 1671);
    			ul1.className = "list-inline two-part";
    			addLoc(ul1, file, 32, 16, 1510);
    			div7.className = "white-box analytics-info";
    			addLoc(div7, file, 30, 12, 1395);
    			div8.className = "col-lg-4 col-sm-6 col-xs-12";
    			addLoc(div8, file, 29, 8, 1341);
    			h32.className = "box-title";
    			addLoc(h32, file, 42, 16, 1957);
    			div9.id = "sparklinedash3";
    			addLoc(div9, file, 45, 24, 2098);
    			addLoc(li5, file, 44, 20, 2069);
    			i2.className = "ti-arrow-up text-info";
    			addLoc(i2, file, 47, 43, 2199);
    			span2.className = "counter text-info";
    			addLoc(span2, file, 47, 81, 2237);
    			li6.className = "text-right";
    			addLoc(li6, file, 47, 20, 2176);
    			ul2.className = "list-inline two-part";
    			addLoc(ul2, file, 43, 16, 2015);
    			div10.className = "white-box analytics-info";
    			addLoc(div10, file, 41, 12, 1902);
    			div11.className = "col-lg-4 col-sm-6 col-xs-12";
    			addLoc(div11, file, 40, 8, 1848);
    			div12.className = "row";
    			addLoc(div12, file, 17, 4, 812);
    			option0.__value = "March 2017";
    			option0.value = option0.__value;
    			addLoc(option0, file, 58, 24, 2631);
    			option1.__value = "April 2017";
    			option1.value = option1.__value;
    			addLoc(option1, file, 59, 24, 2683);
    			option2.__value = "May 2017";
    			option2.value = option2.__value;
    			addLoc(option2, file, 60, 24, 2735);
    			option3.__value = "June 2017";
    			option3.value = option3.__value;
    			addLoc(option3, file, 61, 24, 2785);
    			option4.__value = "July 2017";
    			option4.value = option4.__value;
    			addLoc(option4, file, 62, 24, 2836);
    			select.className = "form-control pull-right row b-none";
    			addLoc(select, file, 57, 20, 2555);
    			div13.className = "col-md-3 col-sm-4 col-xs-6 pull-right";
    			addLoc(div13, file, 56, 16, 2483);
    			h33.className = "box-title";
    			addLoc(h33, file, 65, 16, 2932);
    			addLoc(th0, file, 70, 32, 3158);
    			addLoc(th1, file, 71, 32, 3201);
    			addLoc(th2, file, 72, 32, 3247);
    			addLoc(th3, file, 73, 32, 3295);
    			addLoc(th4, file, 74, 32, 3341);
    			addLoc(tr0, file, 69, 28, 3121);
    			addLoc(thead, file, 68, 24, 3085);
    			addLoc(td0, file, 79, 32, 3520);
    			td1.className = "txt-oflo";
    			addLoc(td1, file, 80, 32, 3563);
    			addLoc(td2, file, 81, 32, 3633);
    			td3.className = "txt-oflo";
    			addLoc(td3, file, 82, 32, 3679);
    			span3.className = "text-success";
    			addLoc(span3, file, 83, 36, 3756);
    			addLoc(td4, file, 83, 32, 3752);
    			addLoc(tr1, file, 78, 28, 3483);
    			addLoc(td5, file, 86, 32, 3898);
    			td6.className = "txt-oflo";
    			addLoc(td6, file, 87, 32, 3941);
    			addLoc(td7, file, 88, 32, 4019);
    			td8.className = "txt-oflo";
    			addLoc(td8, file, 89, 32, 4069);
    			span4.className = "text-info";
    			addLoc(span4, file, 90, 36, 4146);
    			addLoc(td9, file, 90, 32, 4142);
    			addLoc(tr2, file, 85, 28, 3861);
    			addLoc(td10, file, 93, 32, 4287);
    			td11.className = "txt-oflo";
    			addLoc(td11, file, 94, 32, 4330);
    			addLoc(td12, file, 95, 32, 4400);
    			td13.className = "txt-oflo";
    			addLoc(td13, file, 96, 32, 4450);
    			span5.className = "text-info";
    			addLoc(span5, file, 97, 36, 4527);
    			addLoc(td14, file, 97, 32, 4523);
    			addLoc(tr3, file, 92, 28, 4250);
    			addLoc(td15, file, 100, 32, 4668);
    			td16.className = "txt-oflo";
    			addLoc(td16, file, 101, 32, 4711);
    			addLoc(td17, file, 102, 32, 4790);
    			td18.className = "txt-oflo";
    			addLoc(td18, file, 103, 32, 4835);
    			span6.className = "text-danger";
    			addLoc(span6, file, 104, 36, 4912);
    			addLoc(td19, file, 104, 32, 4908);
    			addLoc(tr4, file, 99, 28, 4631);
    			addLoc(td20, file, 107, 32, 5054);
    			td21.className = "txt-oflo";
    			addLoc(td21, file, 108, 32, 5097);
    			addLoc(td22, file, 109, 32, 5174);
    			td23.className = "txt-oflo";
    			addLoc(td23, file, 110, 32, 5220);
    			span7.className = "text-success";
    			addLoc(span7, file, 111, 36, 5297);
    			addLoc(td24, file, 111, 32, 5293);
    			addLoc(tr5, file, 106, 28, 5017);
    			addLoc(td25, file, 114, 32, 5439);
    			td26.className = "txt-oflo";
    			addLoc(td26, file, 115, 32, 5482);
    			addLoc(td27, file, 116, 32, 5559);
    			td28.className = "txt-oflo";
    			addLoc(td28, file, 117, 32, 5605);
    			span8.className = "text-danger";
    			addLoc(span8, file, 118, 36, 5682);
    			addLoc(td29, file, 118, 32, 5678);
    			addLoc(tr6, file, 113, 28, 5402);
    			addLoc(td30, file, 121, 32, 5824);
    			td31.className = "txt-oflo";
    			addLoc(td31, file, 122, 32, 5867);
    			addLoc(td32, file, 123, 32, 5948);
    			td33.className = "txt-oflo";
    			addLoc(td33, file, 124, 32, 5996);
    			span9.className = "text-success";
    			addLoc(span9, file, 125, 36, 6073);
    			addLoc(td34, file, 125, 32, 6069);
    			addLoc(tr7, file, 120, 28, 5787);
    			addLoc(tbody, file, 77, 24, 3447);
    			table.className = "table";
    			addLoc(table, file, 67, 20, 3039);
    			div14.className = "table-responsive";
    			addLoc(div14, file, 66, 16, 2988);
    			div15.className = "white-box";
    			addLoc(div15, file, 55, 12, 2443);
    			div16.className = "col-md-12 col-lg-12 col-sm-12";
    			addLoc(div16, file, 54, 8, 2387);
    			div17.className = "row";
    			addLoc(div17, file, 53, 4, 2361);
    			h34.className = "box-title";
    			addLoc(h34, file, 137, 16, 6427);
    			img0.src = "../plugins/images/users/pawandeep.jpg";
    			img0.alt = "user";
    			img0.className = "img-circle";
    			addLoc(img0, file, 140, 47, 6616);
    			div18.className = "user-img";
    			addLoc(div18, file, 140, 24, 6593);
    			addLoc(h50, file, 143, 28, 6806);
    			span10.className = "time";
    			addLoc(span10, file, 143, 48, 6826);
    			addLoc(br0, file, 144, 28, 6904);
    			span11.className = "mail-desc";
    			addLoc(span11, file, 144, 33, 6909);
    			i3.className = "ti-check text-success m-r-5";
    			addLoc(i3, file, 144, 348, 7224);
    			a2.href = "javacript:void(0)";
    			a2.className = "btn btn btn-rounded btn-default btn-outline m-r-5";
    			addLoc(a2, file, 144, 262, 7138);
    			i4.className = "ti-close text-danger m-r-5";
    			addLoc(i4, file, 144, 478, 7354);
    			a3.href = "javacript:void(0)";
    			a3.className = "btn-rounded btn btn-default btn-outline";
    			addLoc(a3, file, 144, 402, 7278);
    			div19.className = "mail-contnet";
    			addLoc(div19, file, 142, 24, 6751);
    			div20.className = "comment-body";
    			addLoc(div20, file, 139, 20, 6542);
    			img1.src = "../plugins/images/users/sonu.jpg";
    			img1.alt = "user";
    			img1.className = "img-circle";
    			addLoc(img1, file, 148, 47, 7560);
    			div21.className = "user-img";
    			addLoc(div21, file, 148, 24, 7537);
    			addLoc(h51, file, 151, 28, 7745);
    			span12.className = "time";
    			addLoc(span12, file, 151, 47, 7764);
    			addLoc(br1, file, 152, 28, 7842);
    			span13.className = "mail-desc";
    			addLoc(span13, file, 152, 33, 7847);
    			div22.className = "mail-contnet";
    			addLoc(div22, file, 150, 24, 7690);
    			div23.className = "comment-body";
    			addLoc(div23, file, 147, 20, 7486);
    			img2.src = "../plugins/images/users/arijit.jpg";
    			img2.alt = "user";
    			img2.className = "img-circle";
    			addLoc(img2, file, 156, 47, 8235);
    			div24.className = "user-img";
    			addLoc(div24, file, 156, 24, 8212);
    			addLoc(h52, file, 159, 28, 8422);
    			span14.className = "time";
    			addLoc(span14, file, 159, 49, 8443);
    			addLoc(br2, file, 160, 28, 8521);
    			span15.className = "mail-desc";
    			addLoc(span15, file, 160, 33, 8526);
    			div25.className = "mail-contnet";
    			addLoc(div25, file, 158, 24, 8367);
    			div26.className = "comment-body b-none";
    			addLoc(div26, file, 155, 20, 8154);
    			div27.className = "comment-center p-t-10";
    			addLoc(div27, file, 138, 16, 6486);
    			div28.className = "white-box";
    			addLoc(div28, file, 136, 12, 6387);
    			div29.className = "col-md-12 col-lg-8 col-sm-12";
    			addLoc(div29, file, 135, 8, 6332);
    			div30.className = "panel";
    			addLoc(div30, file, 167, 12, 8932);
    			div31.className = "col-lg-4 col-md-6 col-sm-12";
    			addLoc(div31, file, 166, 8, 8878);
    			div32.className = "row";
    			addLoc(div32, file, 133, 4, 6284);
    			div33.className = "container-fluid";
    			addLoc(div33, file, 0, 0, 0);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div33, anchor);
    			append(div33, div2);
    			append(div2, div0);
    			append(div0, h4);
    			append(div2, text1);
    			append(div2, div1);
    			append(div1, a0);
    			append(div1, text3);
    			append(div1, ol);
    			append(ol, li0);
    			append(li0, a1);
    			append(div33, text5);
    			append(div33, div12);
    			append(div12, div5);
    			append(div5, div4);
    			append(div4, h30);
    			append(div4, text7);
    			append(div4, ul0);
    			append(ul0, li1);
    			append(li1, div3);
    			append(ul0, text8);
    			append(ul0, li2);
    			append(li2, i0);
    			append(li2, text9);
    			append(li2, span0);
    			append(div12, text11);
    			append(div12, div8);
    			append(div8, div7);
    			append(div7, h31);
    			append(div7, text13);
    			append(div7, ul1);
    			append(ul1, li3);
    			append(li3, div6);
    			append(ul1, text14);
    			append(ul1, li4);
    			append(li4, i1);
    			append(li4, text15);
    			append(li4, span1);
    			append(div12, text17);
    			append(div12, div11);
    			append(div11, div10);
    			append(div10, h32);
    			append(div10, text19);
    			append(div10, ul2);
    			append(ul2, li5);
    			append(li5, div9);
    			append(ul2, text20);
    			append(ul2, li6);
    			append(li6, i2);
    			append(li6, text21);
    			append(li6, span2);
    			append(div33, text23);
    			append(div33, div17);
    			append(div17, div16);
    			append(div16, div15);
    			append(div15, div13);
    			append(div13, select);
    			append(select, option0);
    			append(select, option1);
    			append(select, option2);
    			append(select, option3);
    			append(select, option4);
    			append(div15, text29);
    			append(div15, h33);
    			append(div15, text31);
    			append(div15, div14);
    			append(div14, table);
    			append(table, thead);
    			append(thead, tr0);
    			append(tr0, th0);
    			append(tr0, text33);
    			append(tr0, th1);
    			append(tr0, text35);
    			append(tr0, th2);
    			append(tr0, text37);
    			append(tr0, th3);
    			append(tr0, text39);
    			append(tr0, th4);
    			append(table, text41);
    			append(table, tbody);
    			append(tbody, tr1);
    			append(tr1, td0);
    			append(tr1, text43);
    			append(tr1, td1);
    			append(tr1, text45);
    			append(tr1, td2);
    			append(tr1, text47);
    			append(tr1, td3);
    			append(tr1, text49);
    			append(tr1, td4);
    			append(td4, span3);
    			append(tbody, text51);
    			append(tbody, tr2);
    			append(tr2, td5);
    			append(tr2, text53);
    			append(tr2, td6);
    			append(tr2, text55);
    			append(tr2, td7);
    			append(tr2, text57);
    			append(tr2, td8);
    			append(tr2, text59);
    			append(tr2, td9);
    			append(td9, span4);
    			append(tbody, text61);
    			append(tbody, tr3);
    			append(tr3, td10);
    			append(tr3, text63);
    			append(tr3, td11);
    			append(tr3, text65);
    			append(tr3, td12);
    			append(tr3, text67);
    			append(tr3, td13);
    			append(tr3, text69);
    			append(tr3, td14);
    			append(td14, span5);
    			append(tbody, text71);
    			append(tbody, tr4);
    			append(tr4, td15);
    			append(tr4, text73);
    			append(tr4, td16);
    			append(tr4, text75);
    			append(tr4, td17);
    			append(tr4, text77);
    			append(tr4, td18);
    			append(tr4, text79);
    			append(tr4, td19);
    			append(td19, span6);
    			append(tbody, text81);
    			append(tbody, tr5);
    			append(tr5, td20);
    			append(tr5, text83);
    			append(tr5, td21);
    			append(tr5, text85);
    			append(tr5, td22);
    			append(tr5, text87);
    			append(tr5, td23);
    			append(tr5, text89);
    			append(tr5, td24);
    			append(td24, span7);
    			append(tbody, text91);
    			append(tbody, tr6);
    			append(tr6, td25);
    			append(tr6, text93);
    			append(tr6, td26);
    			append(tr6, text95);
    			append(tr6, td27);
    			append(tr6, text97);
    			append(tr6, td28);
    			append(tr6, text99);
    			append(tr6, td29);
    			append(td29, span8);
    			append(tbody, text101);
    			append(tbody, tr7);
    			append(tr7, td30);
    			append(tr7, text103);
    			append(tr7, td31);
    			append(tr7, text105);
    			append(tr7, td32);
    			append(tr7, text107);
    			append(tr7, td33);
    			append(tr7, text109);
    			append(tr7, td34);
    			append(td34, span9);
    			append(div33, text111);
    			append(div33, div32);
    			append(div32, div29);
    			append(div29, div28);
    			append(div28, h34);
    			append(div28, text113);
    			append(div28, div27);
    			append(div27, div20);
    			append(div20, div18);
    			append(div18, img0);
    			append(div20, text114);
    			append(div20, div19);
    			append(div19, h50);
    			append(div19, span10);
    			append(div19, text117);
    			append(div19, br0);
    			append(div19, span11);
    			append(div19, text119);
    			append(div19, a2);
    			append(a2, i3);
    			append(a2, text120);
    			append(div19, a3);
    			append(a3, i4);
    			append(a3, text121);
    			append(div27, text122);
    			append(div27, div23);
    			append(div23, div21);
    			append(div21, img1);
    			append(div23, text123);
    			append(div23, div22);
    			append(div22, h51);
    			append(div22, span12);
    			append(div22, text126);
    			append(div22, br1);
    			append(div22, span13);
    			append(div27, text128);
    			append(div27, div26);
    			append(div26, div24);
    			append(div24, img2);
    			append(div26, text129);
    			append(div26, div25);
    			append(div25, h52);
    			append(div25, span14);
    			append(div25, text132);
    			append(div25, br2);
    			append(div25, span15);
    			append(div32, text134);
    			append(div32, div31);
    			append(div31, div30);
    			current = true;
    		},

    		p: noop,

    		i: function intro(target, anchor) {
    			if (current) return;

    			this.m(target, anchor);
    		},

    		o: run,

    		d: function destroy$$1(detach) {
    			if (detach) {
    				detachNode(div33);
    			}
    		}
    	};
    }

    function Home(options) {
    	this._debugName = '<Home>';
    	if (!options || (!options.target && !options.root)) {
    		throw new Error("'target' is a required option");
    	}

    	init(this, options);
    	this._state = assign({}, options.data);
    	this._intro = !!options.intro;

    	this._fragment = create_main_fragment(this, this._state);

    	if (options.target) {
    		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		this._fragment.c();
    		this._mount(options.target, options.anchor);
    	}

    	this._intro = true;
    }

    assign(Home.prototype, protoDev);

    Home.prototype._checkReadOnly = function _checkReadOnly(newState) {
    };

    /* src/views/About.html generated by Svelte v2.16.1 */

    const file$1 = "src/views/About.html";

    function create_main_fragment$1(component, ctx) {
    	var p, current;

    	return {
    		c: function create() {
    			p = createElement("p");
    			p.textContent = "This is About page";
    			addLoc(p, file$1, 0, 0, 0);
    		},

    		m: function mount(target, anchor) {
    			insert(target, p, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(target, anchor) {
    			if (current) return;

    			this.m(target, anchor);
    		},

    		o: run,

    		d: function destroy$$1(detach) {
    			if (detach) {
    				detachNode(p);
    			}
    		}
    	};
    }

    function About(options) {
    	this._debugName = '<About>';
    	if (!options || (!options.target && !options.root)) {
    		throw new Error("'target' is a required option");
    	}

    	init(this, options);
    	this._state = assign({}, options.data);
    	this._intro = !!options.intro;

    	this._fragment = create_main_fragment$1(this, this._state);

    	if (options.target) {
    		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		this._fragment.c();
    		this._mount(options.target, options.anchor);
    	}

    	this._intro = true;
    }

    assign(About.prototype, protoDev);

    About.prototype._checkReadOnly = function _checkReadOnly(newState) {
    };

    /* src/views/Pages.html generated by Svelte v2.16.1 */

    const file$2 = "src/views/Pages.html";

    function create_main_fragment$2(component, ctx) {
    	var div7, div2, div0, h4, text1, div1, a0, text3, ol, li0, a1, text5, li1, text7, div6, div5, div4, h3, text9, p, text10, code, text12, div3, table, thead, tr0, th0, text14, th1, text16, th2, text18, th3, text20, th4, text22, tbody, tr1, td0, text24, td1, text26, td2, text28, td3, text30, td4, text32, tr2, td5, text34, td6, text36, td7, text38, td8, text40, td9, text42, tr3, td10, text44, td11, text46, td12, text48, td13, text50, td14, text52, tr4, td15, text54, td16, text56, td17, text58, td18, text60, td19, text62, tr5, td20, text64, td21, text66, td22, text68, td23, text70, td24, text72, tr6, td25, text74, td26, text76, td27, text78, td28, text80, td29, current;

    	return {
    		c: function create() {
    			div7 = createElement("div");
    			div2 = createElement("div");
    			div0 = createElement("div");
    			h4 = createElement("h4");
    			h4.textContent = "Basic Table";
    			text1 = createText("\n        ");
    			div1 = createElement("div");
    			a0 = createElement("a");
    			a0.textContent = "Upgrade\n                to Pro";
    			text3 = createText("\n            ");
    			ol = createElement("ol");
    			li0 = createElement("li");
    			a1 = createElement("a");
    			a1.textContent = "Dashboard";
    			text5 = createText("\n                ");
    			li1 = createElement("li");
    			li1.textContent = "Basic Table";
    			text7 = createText("\n    \n    ");
    			div6 = createElement("div");
    			div5 = createElement("div");
    			div4 = createElement("div");
    			h3 = createElement("h3");
    			h3.textContent = "Basic Table";
    			text9 = createText("\n                ");
    			p = createElement("p");
    			text10 = createText("Add class ");
    			code = createElement("code");
    			code.textContent = ".table";
    			text12 = createText("\n                ");
    			div3 = createElement("div");
    			table = createElement("table");
    			thead = createElement("thead");
    			tr0 = createElement("tr");
    			th0 = createElement("th");
    			th0.textContent = "#";
    			text14 = createText("\n                                ");
    			th1 = createElement("th");
    			th1.textContent = "First Name";
    			text16 = createText("\n                                ");
    			th2 = createElement("th");
    			th2.textContent = "Last Name";
    			text18 = createText("\n                                ");
    			th3 = createElement("th");
    			th3.textContent = "Username";
    			text20 = createText("\n                                ");
    			th4 = createElement("th");
    			th4.textContent = "Role";
    			text22 = createText("\n                        ");
    			tbody = createElement("tbody");
    			tr1 = createElement("tr");
    			td0 = createElement("td");
    			td0.textContent = "1";
    			text24 = createText("\n                                ");
    			td1 = createElement("td");
    			td1.textContent = "Deshmukh";
    			text26 = createText("\n                                ");
    			td2 = createElement("td");
    			td2.textContent = "Prohaska";
    			text28 = createText("\n                                ");
    			td3 = createElement("td");
    			td3.textContent = "@Genelia";
    			text30 = createText("\n                                ");
    			td4 = createElement("td");
    			td4.textContent = "admin";
    			text32 = createText("\n                            ");
    			tr2 = createElement("tr");
    			td5 = createElement("td");
    			td5.textContent = "2";
    			text34 = createText("\n                                ");
    			td6 = createElement("td");
    			td6.textContent = "Deshmukh";
    			text36 = createText("\n                                ");
    			td7 = createElement("td");
    			td7.textContent = "Gaylord";
    			text38 = createText("\n                                ");
    			td8 = createElement("td");
    			td8.textContent = "@Ritesh";
    			text40 = createText("\n                                ");
    			td9 = createElement("td");
    			td9.textContent = "member";
    			text42 = createText("\n                            ");
    			tr3 = createElement("tr");
    			td10 = createElement("td");
    			td10.textContent = "3";
    			text44 = createText("\n                                ");
    			td11 = createElement("td");
    			td11.textContent = "Sanghani";
    			text46 = createText("\n                                ");
    			td12 = createElement("td");
    			td12.textContent = "Gusikowski";
    			text48 = createText("\n                                ");
    			td13 = createElement("td");
    			td13.textContent = "@Govinda";
    			text50 = createText("\n                                ");
    			td14 = createElement("td");
    			td14.textContent = "developer";
    			text52 = createText("\n                            ");
    			tr4 = createElement("tr");
    			td15 = createElement("td");
    			td15.textContent = "4";
    			text54 = createText("\n                                ");
    			td16 = createElement("td");
    			td16.textContent = "Roshan";
    			text56 = createText("\n                                ");
    			td17 = createElement("td");
    			td17.textContent = "Rogahn";
    			text58 = createText("\n                                ");
    			td18 = createElement("td");
    			td18.textContent = "@Hritik";
    			text60 = createText("\n                                ");
    			td19 = createElement("td");
    			td19.textContent = "supporter";
    			text62 = createText("\n                            ");
    			tr5 = createElement("tr");
    			td20 = createElement("td");
    			td20.textContent = "5";
    			text64 = createText("\n                                ");
    			td21 = createElement("td");
    			td21.textContent = "Joshi";
    			text66 = createText("\n                                ");
    			td22 = createElement("td");
    			td22.textContent = "Hickle";
    			text68 = createText("\n                                ");
    			td23 = createElement("td");
    			td23.textContent = "@Maruti";
    			text70 = createText("\n                                ");
    			td24 = createElement("td");
    			td24.textContent = "member";
    			text72 = createText("\n                            ");
    			tr6 = createElement("tr");
    			td25 = createElement("td");
    			td25.textContent = "6";
    			text74 = createText("\n                                ");
    			td26 = createElement("td");
    			td26.textContent = "Nigam";
    			text76 = createText("\n                                ");
    			td27 = createElement("td");
    			td27.textContent = "Eichmann";
    			text78 = createText("\n                                ");
    			td28 = createElement("td");
    			td28.textContent = "@Sonu";
    			text80 = createText("\n                                ");
    			td29 = createElement("td");
    			td29.textContent = "supporter";
    			h4.className = "page-title";
    			addLoc(h4, file$2, 3, 12, 132);
    			div0.className = "col-lg-3 col-md-4 col-sm-4 col-xs-12";
    			addLoc(div0, file$2, 2, 8, 69);
    			a0.href = "https://wrappixel.com/templates/ampleadmin/";
    			a0.target = "_blank";
    			a0.className = "btn btn-danger pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light";
    			addLoc(a0, file$2, 6, 12, 258);
    			a1.href = "#";
    			addLoc(a1, file$2, 12, 20, 535);
    			addLoc(li0, file$2, 12, 16, 531);
    			li1.className = "active";
    			addLoc(li1, file$2, 13, 16, 582);
    			ol.className = "breadcrumb";
    			addLoc(ol, file$2, 11, 12, 491);
    			div1.className = "col-lg-9 col-sm-8 col-md-8 col-xs-12";
    			addLoc(div1, file$2, 5, 8, 195);
    			div2.className = "row bg-title";
    			addLoc(div2, file$2, 1, 4, 34);
    			h3.className = "box-title";
    			addLoc(h3, file$2, 22, 16, 815);
    			addLoc(code, file$2, 23, 48, 902);
    			p.className = "text-muted";
    			addLoc(p, file$2, 23, 16, 870);
    			addLoc(th0, file$2, 28, 32, 1112);
    			addLoc(th1, file$2, 29, 32, 1155);
    			addLoc(th2, file$2, 30, 32, 1207);
    			addLoc(th3, file$2, 31, 32, 1258);
    			addLoc(th4, file$2, 32, 32, 1308);
    			addLoc(tr0, file$2, 27, 28, 1075);
    			addLoc(thead, file$2, 26, 24, 1039);
    			addLoc(td0, file$2, 37, 32, 1486);
    			addLoc(td1, file$2, 38, 32, 1529);
    			addLoc(td2, file$2, 39, 32, 1579);
    			addLoc(td3, file$2, 40, 32, 1629);
    			addLoc(td4, file$2, 41, 32, 1679);
    			addLoc(tr1, file$2, 36, 28, 1449);
    			addLoc(td5, file$2, 44, 32, 1793);
    			addLoc(td6, file$2, 45, 32, 1836);
    			addLoc(td7, file$2, 46, 32, 1886);
    			addLoc(td8, file$2, 47, 32, 1935);
    			addLoc(td9, file$2, 48, 32, 1984);
    			addLoc(tr2, file$2, 43, 28, 1756);
    			addLoc(td10, file$2, 51, 32, 2099);
    			addLoc(td11, file$2, 52, 32, 2142);
    			addLoc(td12, file$2, 53, 32, 2192);
    			addLoc(td13, file$2, 54, 32, 2244);
    			addLoc(td14, file$2, 55, 32, 2294);
    			addLoc(tr3, file$2, 50, 28, 2062);
    			addLoc(td15, file$2, 58, 32, 2412);
    			addLoc(td16, file$2, 59, 32, 2455);
    			addLoc(td17, file$2, 60, 32, 2503);
    			addLoc(td18, file$2, 61, 32, 2551);
    			addLoc(td19, file$2, 62, 32, 2600);
    			addLoc(tr4, file$2, 57, 28, 2375);
    			addLoc(td20, file$2, 65, 32, 2718);
    			addLoc(td21, file$2, 66, 32, 2761);
    			addLoc(td22, file$2, 67, 32, 2808);
    			addLoc(td23, file$2, 68, 32, 2856);
    			addLoc(td24, file$2, 69, 32, 2905);
    			addLoc(tr5, file$2, 64, 28, 2681);
    			addLoc(td25, file$2, 72, 32, 3020);
    			addLoc(td26, file$2, 73, 32, 3063);
    			addLoc(td27, file$2, 74, 32, 3110);
    			addLoc(td28, file$2, 75, 32, 3160);
    			addLoc(td29, file$2, 76, 32, 3207);
    			addLoc(tr6, file$2, 71, 28, 2983);
    			addLoc(tbody, file$2, 35, 24, 1413);
    			table.className = "table";
    			addLoc(table, file$2, 25, 20, 993);
    			div3.className = "table-responsive";
    			addLoc(div3, file$2, 24, 16, 942);
    			div4.className = "white-box";
    			addLoc(div4, file$2, 21, 12, 775);
    			div5.className = "col-sm-12";
    			addLoc(div5, file$2, 20, 8, 739);
    			div6.className = "row";
    			addLoc(div6, file$2, 19, 4, 713);
    			div7.className = "container-fluid";
    			addLoc(div7, file$2, 0, 0, 0);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div7, anchor);
    			append(div7, div2);
    			append(div2, div0);
    			append(div0, h4);
    			append(div2, text1);
    			append(div2, div1);
    			append(div1, a0);
    			append(div1, text3);
    			append(div1, ol);
    			append(ol, li0);
    			append(li0, a1);
    			append(ol, text5);
    			append(ol, li1);
    			append(div7, text7);
    			append(div7, div6);
    			append(div6, div5);
    			append(div5, div4);
    			append(div4, h3);
    			append(div4, text9);
    			append(div4, p);
    			append(p, text10);
    			append(p, code);
    			append(div4, text12);
    			append(div4, div3);
    			append(div3, table);
    			append(table, thead);
    			append(thead, tr0);
    			append(tr0, th0);
    			append(tr0, text14);
    			append(tr0, th1);
    			append(tr0, text16);
    			append(tr0, th2);
    			append(tr0, text18);
    			append(tr0, th3);
    			append(tr0, text20);
    			append(tr0, th4);
    			append(table, text22);
    			append(table, tbody);
    			append(tbody, tr1);
    			append(tr1, td0);
    			append(tr1, text24);
    			append(tr1, td1);
    			append(tr1, text26);
    			append(tr1, td2);
    			append(tr1, text28);
    			append(tr1, td3);
    			append(tr1, text30);
    			append(tr1, td4);
    			append(tbody, text32);
    			append(tbody, tr2);
    			append(tr2, td5);
    			append(tr2, text34);
    			append(tr2, td6);
    			append(tr2, text36);
    			append(tr2, td7);
    			append(tr2, text38);
    			append(tr2, td8);
    			append(tr2, text40);
    			append(tr2, td9);
    			append(tbody, text42);
    			append(tbody, tr3);
    			append(tr3, td10);
    			append(tr3, text44);
    			append(tr3, td11);
    			append(tr3, text46);
    			append(tr3, td12);
    			append(tr3, text48);
    			append(tr3, td13);
    			append(tr3, text50);
    			append(tr3, td14);
    			append(tbody, text52);
    			append(tbody, tr4);
    			append(tr4, td15);
    			append(tr4, text54);
    			append(tr4, td16);
    			append(tr4, text56);
    			append(tr4, td17);
    			append(tr4, text58);
    			append(tr4, td18);
    			append(tr4, text60);
    			append(tr4, td19);
    			append(tbody, text62);
    			append(tbody, tr5);
    			append(tr5, td20);
    			append(tr5, text64);
    			append(tr5, td21);
    			append(tr5, text66);
    			append(tr5, td22);
    			append(tr5, text68);
    			append(tr5, td23);
    			append(tr5, text70);
    			append(tr5, td24);
    			append(tbody, text72);
    			append(tbody, tr6);
    			append(tr6, td25);
    			append(tr6, text74);
    			append(tr6, td26);
    			append(tr6, text76);
    			append(tr6, td27);
    			append(tr6, text78);
    			append(tr6, td28);
    			append(tr6, text80);
    			append(tr6, td29);
    			current = true;
    		},

    		p: noop,

    		i: function intro(target, anchor) {
    			if (current) return;

    			this.m(target, anchor);
    		},

    		o: run,

    		d: function destroy$$1(detach) {
    			if (detach) {
    				detachNode(div7);
    			}
    		}
    	};
    }

    function Pages(options) {
    	this._debugName = '<Pages>';
    	if (!options || (!options.target && !options.root)) {
    		throw new Error("'target' is a required option");
    	}

    	init(this, options);
    	this._state = assign({}, options.data);
    	this._intro = !!options.intro;

    	this._fragment = create_main_fragment$2(this, this._state);

    	if (options.target) {
    		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		this._fragment.c();
    		this._mount(options.target, options.anchor);
    	}

    	this._intro = true;
    }

    assign(Pages.prototype, protoDev);

    Pages.prototype._checkReadOnly = function _checkReadOnly(newState) {
    };

    // Import all necessary view components here

    var Routes = {
    	// hash - will handle URLs like localhost:8080/#/sub1/sub2
    	// history - common URLs like localhost:8080/sub1/sub2 
    	// Note: On production server you should manually set rewrite all requests to index.html
    	mode: 'history',       

    	// Each route should have imported component from views directory
    	routes: {
    		'/': Home,
    		'/about': About,
    		'/pages': Pages
    	}
    };

    /* src/components/Router.html generated by Svelte v2.16.1 */



    const Router = {
        r: new svelteRouter(Routes)
    };

    function oncreate() {
        Router.r.create('#router-view');
    }
    function ondestroy() {
        Router.r.destroy();
    }
    const file$3 = "src/components/Router.html";

    function create_main_fragment$3(component, ctx) {
    	var div, current;

    	return {
    		c: function create() {
    			div = createElement("div");
    			div.id = "router-view";
    			addLoc(div, file$3, 0, 0, 0);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(target, anchor) {
    			if (current) return;

    			this.m(target, anchor);
    		},

    		o: run,

    		d: function destroy$$1(detach) {
    			if (detach) {
    				detachNode(div);
    			}
    		}
    	};
    }

    function Router_1(options) {
    	this._debugName = '<Router_1>';
    	if (!options || (!options.target && !options.root)) {
    		throw new Error("'target' is a required option");
    	}

    	init(this, options);
    	this._state = assign({}, options.data);
    	this._intro = !!options.intro;

    	this._handlers.destroy = [ondestroy];

    	this._fragment = create_main_fragment$3(this, this._state);

    	this.root._oncreate.push(() => {
    		oncreate.call(this);
    		this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
    	});

    	if (options.target) {
    		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		this._fragment.c();
    		this._mount(options.target, options.anchor);

    		flush(this);
    	}

    	this._intro = true;
    }

    assign(Router_1.prototype, protoDev);

    Router_1.prototype._checkReadOnly = function _checkReadOnly(newState) {
    };

    /* src/components/RouterLink.html generated by Svelte v2.16.1 */

    var RouterLink = svelteRouter.RouterLink;

    function data(){
        return {
            to:'/',
            class:'nav'
        }
    }
    function create_main_fragment$4(component, ctx) {
    	var slot_content_default = component._slotted.default, current;

    	var routerlink_initial_data = { className: ctx.class, to: ctx.to };
    	var routerlink = new RouterLink({
    		root: component.root,
    		store: component.store,
    		slots: { default: createFragment() },
    		data: routerlink_initial_data
    	});

    	return {
    		c: function create() {
    			routerlink._fragment.c();
    		},

    		m: function mount(target, anchor) {
    			if (slot_content_default) {
    				append(routerlink._slotted.default, slot_content_default);
    			}

    			routerlink._mount(target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var routerlink_changes = {};
    			if (changed.class) routerlink_changes.className = ctx.class;
    			if (changed.to) routerlink_changes.to = ctx.to;
    			routerlink._set(routerlink_changes);
    		},

    		i: function intro(target, anchor) {
    			if (current) return;

    			this.m(target, anchor);
    		},

    		o: function outro(outrocallback) {
    			if (!current) return;

    			if (routerlink) routerlink._fragment.o(outrocallback);
    			current = false;
    		},

    		d: function destroy$$1(detach) {
    			if (slot_content_default) {
    				reinsertChildren(routerlink._slotted.default, slot_content_default);
    			}

    			routerlink.destroy(detach);
    		}
    	};
    }

    function RouterLink_1(options) {
    	this._debugName = '<RouterLink_1>';
    	if (!options || (!options.target && !options.root)) {
    		throw new Error("'target' is a required option");
    	}

    	init(this, options);
    	this._state = assign(data(), options.data);
    	if (!('class' in this._state)) console.warn("<RouterLink_1> was created without expected data property 'class'");
    	if (!('to' in this._state)) console.warn("<RouterLink_1> was created without expected data property 'to'");
    	this._intro = !!options.intro;

    	this._slotted = options.slots || {};

    	this._fragment = create_main_fragment$4(this, this._state);

    	if (options.target) {
    		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		this._fragment.c();
    		this._mount(options.target, options.anchor);

    		flush(this);
    	}

    	this._intro = true;
    }

    assign(RouterLink_1.prototype, protoDev);

    RouterLink_1.prototype._checkReadOnly = function _checkReadOnly(newState) {
    };

    /* src/App.html generated by Svelte v2.16.1 */


      


    const file$5 = "src/App.html";

    function create_main_fragment$5(component, ctx) {
    	var div8, nav, div1, div0, a0, b0, text1, span0, text3, ul0, li0, a1, i0, text4, li1, a2, b1, text6, div5, div4, div2, h3, span1, i1, text7, span2, text9, ul1, li2, text10, text11, li3, text12, text13, li4, a3, i2, text14, text15, li5, a4, i3, text16, text17, li6, a5, i4, text18, text19, li7, a6, i5, text20, text21, li8, a7, i6, text22, text23, div3, a8, text25, div7, div6, text26, footer, current;

    	var routerlink0_initial_data = { class: "nav", to: "/" };
    	var routerlink0 = new RouterLink_1({
    		root: component.root,
    		store: component.store,
    		slots: { default: createFragment() },
    		data: routerlink0_initial_data
    	});

    	var routerlink1_initial_data = { class: "nav", to: "/pages" };
    	var routerlink1 = new RouterLink_1({
    		root: component.root,
    		store: component.store,
    		slots: { default: createFragment() },
    		data: routerlink1_initial_data
    	});

    	var router = new Router_1({
    		root: component.root,
    		store: component.store
    	});

    	return {
    		c: function create() {
    			div8 = createElement("div");
    			nav = createElement("nav");
    			div1 = createElement("div");
    			div0 = createElement("div");
    			a0 = createElement("a");
    			b0 = createElement("b");
    			b0.textContent = "FERNS ADMIN";
    			text1 = createText("\n\t\t\t\t\t");
    			span0 = createElement("span");
    			span0.textContent = "FA";
    			text3 = createText("\n\t\t\t");
    			ul0 = createElement("ul");
    			li0 = createElement("li");
    			a1 = createElement("a");
    			i0 = createElement("i");
    			text4 = createText("\n\t\t\t\t\n\t\t\t\t");
    			li1 = createElement("li");
    			a2 = createElement("a");
    			b1 = createElement("b");
    			b1.textContent = "Steave";
    			text6 = createText("\n\n\t");
    			div5 = createElement("div");
    			div4 = createElement("div");
    			div2 = createElement("div");
    			h3 = createElement("h3");
    			span1 = createElement("span");
    			i1 = createElement("i");
    			text7 = createText(" ");
    			span2 = createElement("span");
    			span2.textContent = "Navigation";
    			text9 = createText("\n\t\t\t");
    			ul1 = createElement("ul");
    			li2 = createElement("li");
    			text10 = createText("Home");
    			routerlink0._fragment.c();
    			text11 = createText("\n\t\t\t\t");
    			li3 = createElement("li");
    			text12 = createText("Pages");
    			routerlink1._fragment.c();
    			text13 = createText("\n\t\t\t\t");
    			li4 = createElement("li");
    			a3 = createElement("a");
    			i2 = createElement("i");
    			text14 = createText("Basic Table");
    			text15 = createText("\n\t\t\t\t");
    			li5 = createElement("li");
    			a4 = createElement("a");
    			i3 = createElement("i");
    			text16 = createText("Icons");
    			text17 = createText("\n\t\t\t\t");
    			li6 = createElement("li");
    			a5 = createElement("a");
    			i4 = createElement("i");
    			text18 = createText("Google Map");
    			text19 = createText("\n\t\t\t\t");
    			li7 = createElement("li");
    			a6 = createElement("a");
    			i5 = createElement("i");
    			text20 = createText("Blank Page");
    			text21 = createText("\n\t\t\t\t");
    			li8 = createElement("li");
    			a7 = createElement("a");
    			i6 = createElement("i");
    			text22 = createText("Error 404");
    			text23 = createText("\n\t\t\t");
    			div3 = createElement("div");
    			a8 = createElement("a");
    			a8.textContent = "Upgrade to Pro";
    			text25 = createText("\n\t");
    			div7 = createElement("div");
    			div6 = createElement("div");
    			router._fragment.c();
    			text26 = createText("\n\t\t\t");
    			footer = createElement("footer");
    			footer.textContent = "2017 © Ample Admin brought to you by wrappixel.com";
    			addLoc(b0, file$5, 5, 5, 180);
    			span0.className = "hidden-xs";
    			addLoc(span0, file$5, 8, 5, 217);
    			a0.className = "logo";
    			a0.href = "/";
    			addLoc(a0, file$5, 4, 4, 149);
    			div0.className = "top-left-part";
    			addLoc(div0, file$5, 3, 3, 117);
    			i0.className = "fa fa-bars";
    			addLoc(i0, file$5, 15, 110, 464);
    			a1.className = "nav-toggler open-close waves-effect waves-light hidden-md hidden-lg";
    			a1.href = "javascript:void(0)";
    			addLoc(a1, file$5, 15, 5, 359);
    			addLoc(li0, file$5, 14, 4, 349);
    			b1.className = "hidden-xs";
    			addLoc(b1, file$5, 19, 38, 557);
    			a2.className = "profile-pic";
    			a2.href = "#";
    			addLoc(a2, file$5, 19, 5, 524);
    			addLoc(li1, file$5, 18, 4, 514);
    			ul0.className = "nav navbar-top-links navbar-right pull-right";
    			addLoc(ul0, file$5, 13, 3, 287);
    			div1.className = "navbar-header";
    			addLoc(div1, file$5, 2, 2, 86);
    			nav.className = "navbar navbar-default navbar-static-top m-b-0 p-0";
    			addLoc(nav, file$5, 1, 1, 20);
    			i1.className = "ti-close ti-menu";
    			addLoc(i1, file$5, 28, 39, 801);
    			span1.className = "fa-fw open-close";
    			addLoc(span1, file$5, 28, 8, 770);
    			span2.className = "hide-menu";
    			addLoc(span2, file$5, 28, 79, 841);
    			addLoc(h3, file$5, 28, 4, 766);
    			div2.className = "sidebar-head";
    			addLoc(div2, file$5, 27, 3, 735);
    			setStyle(li2, "padding", "70px 0 0");
    			addLoc(li2, file$5, 31, 4, 937);
    			addLoc(li3, file$5, 34, 4, 1037);
    			i2.className = "fa fa-table fa-fw";
    			setAttribute(i2, "aria-hidden", "true");
    			addLoc(i2, file$5, 38, 53, 1175);
    			a3.href = "basic-table.html";
    			a3.className = "waves-effect";
    			addLoc(a3, file$5, 38, 5, 1127);
    			addLoc(li4, file$5, 37, 4, 1117);
    			i3.className = "fa fa-font fa-fw";
    			setAttribute(i3, "aria-hidden", "true");
    			addLoc(i3, file$5, 41, 53, 1315);
    			a4.href = "fontawesome.html";
    			a4.className = "waves-effect";
    			addLoc(a4, file$5, 41, 5, 1267);
    			addLoc(li5, file$5, 40, 4, 1257);
    			i4.className = "fa fa-globe fa-fw";
    			setAttribute(i4, "aria-hidden", "true");
    			addLoc(i4, file$5, 44, 52, 1447);
    			a5.href = "map-google.html";
    			a5.className = "waves-effect";
    			addLoc(a5, file$5, 44, 5, 1400);
    			addLoc(li6, file$5, 43, 4, 1390);
    			i5.className = "fa fa-columns fa-fw";
    			setAttribute(i5, "aria-hidden", "true");
    			addLoc(i5, file$5, 47, 47, 1580);
    			a6.href = "blank.html";
    			a6.className = "waves-effect";
    			addLoc(a6, file$5, 47, 5, 1538);
    			addLoc(li7, file$5, 46, 4, 1528);
    			i6.className = "fa fa-info-circle fa-fw";
    			setAttribute(i6, "aria-hidden", "true");
    			addLoc(i6, file$5, 50, 45, 1713);
    			a7.href = "404.html";
    			a7.className = "waves-effect";
    			addLoc(a7, file$5, 50, 5, 1673);
    			addLoc(li8, file$5, 49, 4, 1663);
    			ul1.className = "nav";
    			ul1.id = "side-menu";
    			addLoc(ul1, file$5, 30, 3, 901);
    			a8.href = "https://wrappixel.com/templates/ampleadmin/";
    			a8.target = "_blank";
    			a8.className = "btn btn-danger btn-block waves-effect waves-light";
    			addLoc(a8, file$5, 55, 5, 1839);
    			div3.className = "center p-20";
    			addLoc(div3, file$5, 54, 3, 1808);
    			div4.className = "sidebar-nav slimscrollsidebar";
    			addLoc(div4, file$5, 26, 2, 688);
    			div5.className = "navbar-default sidebar";
    			setAttribute(div5, "role", "navigation");
    			addLoc(div5, file$5, 25, 1, 631);
    			footer.className = "footer text-center";
    			addLoc(footer, file$5, 64, 3, 2070);
    			div6.id = "page-wrapper";
    			addLoc(div6, file$5, 62, 2, 2029);
    			addLoc(div7, file$5, 60, 1, 2018);
    			div8.id = "wrapper";
    			addLoc(div8, file$5, 0, 0, 0);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div8, anchor);
    			append(div8, nav);
    			append(nav, div1);
    			append(div1, div0);
    			append(div0, a0);
    			append(a0, b0);
    			append(a0, text1);
    			append(a0, span0);
    			append(div1, text3);
    			append(div1, ul0);
    			append(ul0, li0);
    			append(li0, a1);
    			append(a1, i0);
    			append(ul0, text4);
    			append(ul0, li1);
    			append(li1, a2);
    			append(a2, b1);
    			append(div8, text6);
    			append(div8, div5);
    			append(div5, div4);
    			append(div4, div2);
    			append(div2, h3);
    			append(h3, span1);
    			append(span1, i1);
    			append(h3, text7);
    			append(h3, span2);
    			append(div4, text9);
    			append(div4, ul1);
    			append(ul1, li2);
    			append(routerlink0._slotted.default, text10);
    			routerlink0._mount(li2, null);
    			append(ul1, text11);
    			append(ul1, li3);
    			append(routerlink1._slotted.default, text12);
    			routerlink1._mount(li3, null);
    			append(ul1, text13);
    			append(ul1, li4);
    			append(li4, a3);
    			append(a3, i2);
    			append(a3, text14);
    			append(ul1, text15);
    			append(ul1, li5);
    			append(li5, a4);
    			append(a4, i3);
    			append(a4, text16);
    			append(ul1, text17);
    			append(ul1, li6);
    			append(li6, a5);
    			append(a5, i4);
    			append(a5, text18);
    			append(ul1, text19);
    			append(ul1, li7);
    			append(li7, a6);
    			append(a6, i5);
    			append(a6, text20);
    			append(ul1, text21);
    			append(ul1, li8);
    			append(li8, a7);
    			append(a7, i6);
    			append(a7, text22);
    			append(div4, text23);
    			append(div4, div3);
    			append(div3, a8);
    			append(div8, text25);
    			append(div8, div7);
    			append(div7, div6);
    			router._mount(div6, null);
    			append(div6, text26);
    			append(div6, footer);
    			current = true;
    		},

    		p: noop,

    		i: function intro(target, anchor) {
    			if (current) return;

    			this.m(target, anchor);
    		},

    		o: function outro(outrocallback) {
    			if (!current) return;

    			outrocallback = callAfter(outrocallback, 3);

    			if (routerlink0) routerlink0._fragment.o(outrocallback);
    			if (routerlink1) routerlink1._fragment.o(outrocallback);
    			if (router) router._fragment.o(outrocallback);
    			current = false;
    		},

    		d: function destroy$$1(detach) {
    			if (detach) {
    				detachNode(div8);
    			}

    			routerlink0.destroy();
    			routerlink1.destroy();
    			router.destroy();
    		}
    	};
    }

    function App(options) {
    	this._debugName = '<App>';
    	if (!options || (!options.target && !options.root)) {
    		throw new Error("'target' is a required option");
    	}

    	init(this, options);
    	this._state = assign({}, options.data);
    	this._intro = !!options.intro;

    	this._fragment = create_main_fragment$5(this, this._state);

    	if (options.target) {
    		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		this._fragment.c();
    		this._mount(options.target, options.anchor);

    		flush(this);
    	}

    	this._intro = true;
    }

    assign(App.prototype, protoDev);

    App.prototype._checkReadOnly = function _checkReadOnly(newState) {
    };

    const app = new App({
    	target: document.body,
    	data: {
    		name: 'MyApp'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
