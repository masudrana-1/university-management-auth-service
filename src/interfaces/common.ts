import { IGenericErrorMessage } from './error';

// error handler interface
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
