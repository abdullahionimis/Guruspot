import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validateData = (schema: z.ZodObject<any, any>) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {

      if (error instanceof ZodError) {

        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          error: 'Invalid request data',
          details: errorMessages,
        });
      }

      next(error);
    }
  };
};
