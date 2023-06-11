import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import ApiError from './errors/ApiErrors'

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application route

// console.log(app.get('env'))

app.use('/api/v1/users/', userRoutes);
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

export default app;
