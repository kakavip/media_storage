import path from 'path';
import { BASE_STORAGE_PATH, BASE_STREAM_HOST } from '../config/contants';
import HttpException from '../exceptions/HttpException';

const getStorageFilePath = (bucket: string, key: string): string => {
  if (!bucket || !key) {
    throw new HttpException(500, 'Invalid data. Missing bucket or key.');
  }
  return path.join(BASE_STORAGE_PATH, bucket, key);
};

const getStreamHostPath = (bucket: string, key: string): string => {
  if (!bucket || !key) {
    throw new HttpException(500, 'Invalid data. Missing bucket or key.');
  }

  return `${BASE_STREAM_HOST}/${path.join(bucket, key)}`;
};

export { getStorageFilePath, getStreamHostPath };
