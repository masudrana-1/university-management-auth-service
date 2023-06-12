import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  } catch (err) {
    // error handler from global error handler
    next(err);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
