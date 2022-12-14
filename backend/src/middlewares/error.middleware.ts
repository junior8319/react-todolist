import express, { NextFunction, Request, Response } from 'express';

class ErrorMiddleware {
  public app: express.Application;

  public name: any;

  public message: any;


  constructor(error: Error = new Error) {
    this.app = express();
    this.name = error.name as any;
    this.message = error.message as any;

    this.handleErrors();
  }

  handleErrors = () => {
    this.app.use(
      (error: Error, _req: Request, res: Response, next: NextFunction) => {
        switch(this.name) {
          case 'ValidationError':
            return res.status(400).json({ message: this.message });
          case 'NotFoundError':
            return res.status(404).json({ message: this.message });
          case 'ConflictError':
            return res.status(409).json({ message: this.message });
          default:
            console.error(error);
            res.sendStatus(500);
        }

        next();
      }
    );
  };
}

export default new ErrorMiddleware();