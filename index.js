"use strict";var t=require("ali-oss"),e=require("gulp-util"),r=require("through2"),n=require("ora");function u(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var i=u(t),o=u(r),s=u(n);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function a(t,e,r,n){return new(r||(r=Promise))((function(u,i){function o(t){try{a(n.next(t))}catch(t){i(t)}}function s(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?u(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(o,s)}a((n=n.apply(t,e||[])).next())}))}var c="gulp-oss-manager";const l={accessKeyId:"",accessKeySecret:"",bucket:"",region:""};module.exports=function(t){const r=Object.assign(l,t);if(null==r)throw new e.PluginError(c,"Missing options Object!");const n=new i.default(r),u=s.default();return o.default.obj((function(t,i,o){return a(this,void 0,void 0,(function*(){t.isNull()&&o(null,t),t.isStream()&&this.emit("error",new e.PluginError(c,"Buffers not supported!"));try{u.start("Upload......");let e=yield n.put(`${null!=r.customPath?r.customPath:""}/${t.relative}`,t.contents);200==e.res.status?u.succeed(`${t._base}/${t.relative}  ===>  ${e.url}`):u.fail(`${t._base}/${t.relative}`),o(null,t)}catch(t){this.emit("error",new e.PluginError(c,t.message.toString()))}}))}))};
