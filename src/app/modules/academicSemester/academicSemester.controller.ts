import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationField } from '../../constants/paginationField';
import { academicSemesterFilterableField } from './academicSemester.constant';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

// pagination controller
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  // search and filter
  const filters = pick(req.query, academicSemesterFilterableField);

  // pagination
  const paginationOptions = pick(req.query, paginationField);

  const result = await AcademicSemesterService.getAllSemesters(
    // search and filter
    filters,

    // pagination
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// for single semester
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    data: result,
  });
});

// for update semester route
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters updated successfully',
    data: result,
  });
});

// delete semester

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
