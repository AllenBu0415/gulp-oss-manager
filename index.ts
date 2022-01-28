import OSS from 'ali-oss'
import {log, PluginError} from 'gulp-util'
import through from 'through2'
import * as pkg from './package.json'
import ora from 'ora'

interface OssManager {
  accessKeyId: string,  // 阿里云账号 AccessKey
  accessKeySecret: string, // 阿里云账号 AccessKey
  region: string,  // Bucket所在地域
  bucket: string,  // Bucket名称
  customPath?: string, // 上传路径前缀前缀
  timeout?: number  // 超时时间
}

const defaultOptions: OssManager = {
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
  region: '',
}

export default function gulpOssManager(_options: OssManager) {

  const options = Object.assign(defaultOptions, _options)

  if (options == null) {
    throw new PluginError(pkg.name, 'Missing options Object!')
  }

  const client = new OSS(options)

  const spinner = ora()

  return through.obj(async function(file, enc, cb) {


    if (file.isNull()) cb(null, file)

    if (file.isStream()) this.emit('error', new PluginError(pkg.name, 'Buffers not supported!'))

    try {
      spinner.start('Upload......')

      let result = await client.put(`${options.customPath != undefined ? options.customPath : ''}/${file.relative}`, file.contents)

      setTimeout(() => {

        if (result.res.status == 200) {
          spinner.succeed(`${file._base}/${file.relative}  ===>  ${result.url}`)
        } else {
          spinner.fail(`${file._base}/${file.relative}`)
        }

        cb(null, file)
      }, 3000)

    } catch (err: any) {
      this.emit('error', new PluginError(pkg.name, err.message.toString()))
    }
  })
}
