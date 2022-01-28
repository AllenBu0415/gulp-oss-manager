/// <reference types="node" />
interface OssManager {
    accessKeyId: string;
    accessKeySecret: string;
    region: string;
    bucket: string;
    customPath?: string;
    timeout?: number;
}
export default function gulpOssManager(_options: OssManager): import("stream").Transform;
export {};
