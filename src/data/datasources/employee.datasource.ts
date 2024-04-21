import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  UpdatedEmployeeModel,
  UpdatedEmployeeSchema
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams, UpdateEmployeeParams } from "@/domain/params/employee.param";

const API_URL = 'https://dummy.restapiexample.com/api/v1';
// const API_URL = 'http://localhost:4000/api/v1'; // Uncomment this line to use local API (use Mockoon - file available in the project root)

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(`${API_URL}/employees`);

      if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  async createEmployee(params: UpdateEmployeeParams): Promise<UpdatedEmployeeModel | undefined> {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        body: JSON.stringify(params.newData),
      });

      if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }

      if (response.status !== 200) {
        throw new Error('Failed to create employee');
      }

      const data = await response.json();
      return UpdatedEmployeeSchema.parse(data);
    } catch (error) {
      console.error('Error creating employee:', error);
      return undefined;
    }
  }

  async getEmployeeById(params: GetEmployeeByIdParams): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${API_URL}/employee/${params.id}`);

      if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }

      if (response.status !== 200) {
        throw new Error('Failed to fetch employee data');
      }

      const json = await response.json();
      const data = json.data;

      return data as EmployeeModel;
    } catch (error) {
      console.error('Error fetching employee by ID:', error);
      return undefined;
    }
  }

  async updateEmployeeById(params: UpdateEmployeeParams): Promise<UpdatedEmployeeModel | undefined> {
    try {
      const response = await fetch(`${API_URL}/update/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.newData),
      });

      if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }

      if (response.status !== 200) {
        throw new Error('Failed to update employee data');
      }

      const data = await response.json();
      return UpdatedEmployeeSchema.parse(data);
    } catch (error) {
      console.error('Error updating employee by ID:', error);
      return undefined;
    }
  }

  async deleteEmployeeById(params: GetEmployeeByIdParams) {
     try {
      const response = await fetch(`${API_URL}/delete/${params.id}`, {
        method: 'DELETE'
      });

      if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }

      if (response.status !== 200) {
        throw new Error('Failed to delete employee data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting employee by ID:', error);
      return undefined;
    }
  }
}
