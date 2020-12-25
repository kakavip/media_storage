class UploadFileInfo {
  public bucket: string;
  public key: string;
  public file: any;

  constructor(bucket: string, key: string, file: any) {
    this.bucket = bucket;
    this.key = key;
    this.file = file;
  }
}

class RemoveFileInfo {
  public key: string;
  public bucket: string;

  constructor(bucket: string, key: string) {
    this.bucket = bucket;
    this.key = key;
  }
}
export { UploadFileInfo, RemoveFileInfo };
