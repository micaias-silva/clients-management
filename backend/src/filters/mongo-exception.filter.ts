import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';

@Catch(mongoose.mongo.MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    console.log(exception);

    switch (exception.code) {
      case 11000:
        status = HttpStatus.CONFLICT;
        message = `Duplicata encontrada: ${Object.keys(exception.keyValue)}`;
        break;

      default:
        break;
    }

    return response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
