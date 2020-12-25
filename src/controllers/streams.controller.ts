import { Response, Request, NextFunction } from 'express';
import FileService from '../services/files.service';
import fs from 'fs';
import FileType from 'file-type';

class StreamController {
  private fileService: FileService;
  constructor() {
    this.fileService = new FileService();
  }

  public fileStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pathToFile: string = req.params.pid;
      const filePath: string = await this.fileService.getFilePath(pathToFile);
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const formatInfo = await FileType.fromFile(filePath);

      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
          res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
          return;
        }

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          // tslint:disable-next-line:object-literal-sort-keys
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': formatInfo.mime,
        };

        res.writeHead(206, head);
        file.pipe(res);
        return;
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': `${formatInfo.mime}`,
        };

        res.writeHead(200, head);
        const stream = fs.createReadStream(filePath);
        stream.on('open', () => stream.pipe(res));
        stream.on('error', err => res.end(err));

        return;
      }

      res.status(200).json({ status: 'Success' });
    } catch (error) {
      next(error);
    }
  };
}

export default StreamController;
