import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
// import ApiError from './errors/ApiErrors'

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application route

app.use('/api/v1/', routes);
// app.use('//api/v1/', routes);

// app.use('/api/v1/users/', userRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhandled Promise Rejection'))
//   console.log(x)
// })

app.get('/', (req: Request, res: Response) => {
  res.send('🙂🙂🙂Working successfully🙂🙂🙂');
});

// global error handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});
export default app;
