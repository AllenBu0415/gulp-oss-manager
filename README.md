# gulp-oss-manager

基于阿里云 OSS SDK开发的文件上传助手

### 安装

```shell
npm install -D gulp-oss-manager
```

### 使用

示例文件目录

    ---
     |
     |---- src
     |    |
     |    |---- App.vue
     |    |
     |    |---- OSS/    // 需要上传的目录
     |    |    |
     |    略   ｜---- logo.png
     |         |
     |         |---- max.png
     |         |
     |         略 （ 同 main 结构）
     |
     |---- 
     略

配置文件

```javascript
// gulpfile.js

const {src} = require("gulp");
const ossManager = require("gulp-oss-manager");

function upload () {
  return src("src/OSS/**/**.*").pipe(
    new ossManager({
      accessKeyId: '阿里云 accessKeyId',
      accessKeySecret: "阿里云 accessKeySecret",
      region: "阿里云 region",
      bucket: "阿里云 bucket",
      customPath: "自定义的路径，非必填",
      timeout: "超时时间，默认为60000ms，非必填"
    }),
  );
}

module.exports.default = upload;

```
