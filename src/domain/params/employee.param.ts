import { z } from "zod";
import { EmployeeIdSchema } from "../models/employee.model";

export const GetEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;

export const EditEmployeeSchema = z.object({
  name: z.string().min(1),
  salary: z.number().positive(),
  age: z.number().positive(),
});
export type EditEmployeeModel = z.infer<typeof EditEmployeeSchema>;

export const CreateEmployeeSchema = z.object({
  name: z.string().min(1),
  salary: z.number().positive(),
  age: z.number().positive(),
});
export type CreateEmployeeParams = z.infer<typeof EditEmployeeSchema>;

export const UpdateEmployeeSchema = z.object({
    id: EmployeeIdSchema,
    newData: EditEmployeeSchema,
});
export type UpdateEmployeeParams = z.infer<typeof UpdateEmployeeSchema>;
