import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const getProcessingTimeInMS = (time: [number, number]): number => {
  return +(time[0] * 1000 + time[1] / 1e6).toFixed(2);
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // get timestamp
    const now = new Date();
    const timestamp = [
      now.getMonth() + 1,
      '-',
      now.getDate(),
      '-',
      now.getFullYear(),
      ' ',
      now.getHours(),
      ':',
      now.getMinutes(),
      ':',
      now.getSeconds(),
    ].join('');

    // get api endpoint
    const { method, url } = req;

    // log start of the execution process
    const start = process.hrtime();
    const timeStampText = `[${timestamp}]`;

    // trigger once a response is sent to the client
    res.once('finish', () => {
      // log end of the execution process
      const end = process.hrtime();
      const endText = `DURATION:${(
        getProcessingTimeInMS(end) - getProcessingTimeInMS(start)
      ).toFixed(2)}ms`;
      console.log(
        `${timeStampText} METHOD:${method}:${url} STATUS:${res.statusCode} ${endText}`,
      );
    });
    next();
  }
}
