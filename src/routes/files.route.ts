import { Router } from 'express';
import FilesController from '../controllers/files.controller';
import Route from '../interfaces/routes.interface';

class FilesRoute implements Route {
  public path = '/files';
  public router = Router();
  public filesController = new FilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, this.filesController.uploadFile);
    this.router.put(`${this.path}/remove`, this.filesController.removeFile);
  }
}

export default FilesRoute;
