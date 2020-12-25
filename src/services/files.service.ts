import { RemoveFileInfo, UploadFileInfo } from '../dtos/files.dto';
import fs from 'fs';
import { getStorageFilePath, getStreamHostPath } from '../utils/storagePathUtils';
import HttpException from '../exceptions/HttpException';

class FileService {
  public async createFile(fileInfoDto: UploadFileInfo): Promise<string> {
    const filePath = getStorageFilePath(fileInfoDto.bucket, fileInfoDto.key);
    fileInfoDto.file.mv(filePath, error => {
      if (error) {
        throw new HttpException(500, "Can't upload file.");
      }
    });
    return getStreamHostPath(fileInfoDto.bucket, fileInfoDto.key);
  }

  public async removeFile(fileInfoDto: RemoveFileInfo): Promise<void> {
    const bucket: string = fileInfoDto.bucket;
    const key: string = fileInfoDto.key;
    const filePath: string = getStorageFilePath(bucket, key);

    if (!fs.existsSync(filePath)) {
      throw new HttpException(500, 'File is not found.');
    }

    fs.unlink(filePath, error => {
      if (error) {
        throw new HttpException(500, 'Having some error when handling remove file.');
      }
    });
  }

  public async getFilePath(pathToFile: string) {
    const names: string[] = pathToFile.split('/');
    const bucket: string = names[0];
    const key: string = pathToFile.slice(bucket.length + 1);

    const filePath: string = getStorageFilePath(bucket, key);
    if (!fs.existsSync(filePath)) {
      throw new HttpException(403, 'File not found.');
    }

    return filePath;
  }
}

export default FileService;
