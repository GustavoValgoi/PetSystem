import { HttpException } from '@nestjs/common';

export class HttpAppError extends HttpException {
  constructor(error) {
    super(
      {
        statusCode: error.response.statusCode,
        message: error.response.message,
        error: error.response.error,
      },
      error.response.statusCode,
    );
  }
}
