/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import handlerValidationError from '../../errors/handleValidationError';
import config from '../../config';
import ApiError from '../../errors/ApiErrors';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  config.env === 'development'
    ? console.log('🚀 globalErrorHandler ~', error)
    : errorLogger.error('🚀 globalErrorHandler ~', error);

  let statusCode = 500;
  let message = 'Something went wrong!😞';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidatorError') {
    const simpliyfiedError = handlerValidationError(error);
    statusCode = simpliyfiedError.statusCode;
    message = simpliyfiedError.message;
    errorMessages = simpliyfiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    // res.status(200).json({ error });
    const simpliyfiedError = handleCastError(error);

    statusCode = simpliyfiedError.statusCode;
    message = simpliyfiedError.message;
    errorMessages = simpliyfiedError.errorMessages;
  } else if (error instanceof ZodError) {
    // zod validation

    const simpliyfiedError = handleZodError(error);
    statusCode = simpliyfiedError.statusCode;
    message = simpliyfiedError.message;
    errorMessages = simpliyfiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
