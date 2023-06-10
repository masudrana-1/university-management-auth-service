import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handlerValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

// const handlerValidationError = (
//   err: mongoose.Error.ValidationError
// ): IGenericErrorResponse => {
//   const errors: IGenericErrorMessage[] = Object.values(
//     err.errors as Record<
//       string,
//       mongoose.Error.ValidatorError | mongoose.Error.CastError
//     >
//   ).map((el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//     if (el instanceof mongoose.Error.ValidatorError) {
//       // handle validator error
//       return {
//         path: el.path,
//         message: el.message,
//       }
//     } else {
//       // handle cast error
//       return {
//         path: el.path,
//         message: el.reason?.message || 'Invalid value',
//       }
//     }
//   })

//   const statusCode = 400
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorMessages: errors,
//   }

//   // return errors // return the errors array
// }

export default handlerValidationError
