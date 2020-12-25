import { Router } from 'express';
import StreamController from '../controllers/streams.controller';
import Route from '../interfaces/routes.interface';

class StreamsRoute implements Route {
  public path = '/file_streams';
  public router = Router();
  public streamController = new StreamController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:pid(*)`, this.streamController.fileStream);
  }
}

export default StreamsRoute;
