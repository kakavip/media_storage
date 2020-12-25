import { NextFunction, Request, Response } from 'express';
import { RemoveFileInfo, UploadFileInfo } from '../dtos/files.dto';
import FileService from '../services/files.service';

class FilesController {
  private fileService: FileService;
  constructor() {
    this.fileService = new FileService();
  }
  public uploadFile = async (req: Request | any, res: Response | any, next: NextFunction): Promise<void> => {
    try {
      const fileUrl: string = await this.fileService.createFile(new UploadFileInfo(req.body.bucket, req.body.key, req.files['file']));
      res.status(200).json({ status: 'Success', publicUrl: fileUrl });
    } catch (error) {
      next(error);
    }
  };

  public removeFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      this.fileService.removeFile(new RemoveFileInfo(req.body.bucket, req.body.key));
      res.status(200).json({ status: 'Success' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };
}

export default FilesController;
