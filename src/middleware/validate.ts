import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { LoginInfo } from '../types/user';

class Validate {
  private joi = Joi;

  validate = async (schema: Joi.ObjectSchema, data: any, res: Response, next: NextFunction): Promise<void> => {
    const { error } = schema.validate(data);
    if (error) {
      res.status(400).json({
        isSuccessful: false,
        error: error.message,
      });
      return;
    }
    next();
  };

  sign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const schema = this.joi.object<LoginInfo>({
      loginId: this.joi.string().max(10).required(),
      password: this.joi
        .string()
        .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/)
        .required(),
    });

    this.validate(schema, req.body, res, next);
  };
}

const validator = new Validate();

export default validator;
