'use strict';

var OSS = require('ali-oss');
var gulpUtil = require('gulp-util');
var through = require('through2');
var ora = require('ora');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var OSS__default = /*#__PURE__*/_interopDefaultLegacy(OSS);
var through__default = /*#__PURE__*/_interopDefaultLegacy(through);
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var name = "gulp-oss-manager";

const defaultOptions = {
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
};
function gulpOssManager(_options) {
    const options = Object.assign(defaultOptions, _options);
    if (options == null) {
        throw new gulpUtil.PluginError(name, 'Missing options Object!');
    }
    const client = new OSS__default["default"](options);
    const spinner = ora__default["default"]();
    return through__default["default"].obj(function (file, enc, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file.isNull())
                cb(null, file);
            if (file.isStream())
                this.emit('error', new gulpUtil.PluginError(name, 'Buffers not supported!'));
            try {
                spinner.start('Upload......');
                let result = yield client.put(`${options.customPath != undefined ? options.customPath : ''}/${file.relative}`, file.contents);
                setTimeout(() => {
                    if (result.res.status == 200) {
                        spinner.succeed(`${file._base}/${file.relative}  ===>  ${result.url}`);
                    }
                    else {
                        spinner.fail(`${file._base}/${file.relative}`);
                    }
                    cb(null, file);
                }, 3000);
            }
            catch (err) {
                this.emit('error', new gulpUtil.PluginError(name, err.message.toString()));
            }
        });
    });
}

module.exports = gulpOssManager;
