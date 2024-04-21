import {
  EditEmployeeModel
} from "@/domain/params/employee.param";
import { ReactNode } from "react";

interface EmployeeFormProps {
    initialValues: EditEmployeeModel;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    errors: { [key: string]: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    buttonText: string;
  }

const EmployeeForm = ({ initialValues, onSubmit, errors, onChange, buttonText }: EmployeeFormProps): ReactNode => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={initialValues.name} onChange={onChange} />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </label>
      </div>
      <div>
        <label>
          Salary:
          <input type="number" name="salary" value={initialValues.salary || ''} onChange={onChange} />
          {errors.salary && <span style={{ color: 'red' }}>{errors.salary}</span>}
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="number" name="age" value={initialValues.age || ''} onChange={onChange} />
          {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
        </label>
      </div>
      <button type="submit">{buttonText}</button>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </form>
  );
};
export default EmployeeForm;
