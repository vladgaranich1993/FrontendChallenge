import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees",
      );

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

  public async createEmployee(
    params: unknown,
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/employee/${params.id}`);
      if (response.status === 429) {
        console.error('🍌');
        return undefined;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const data = await response.json();
      return data.data as EmployeeModel;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async updateEmployeeById(
    params: { id: number, newData: { name: string, salary: string, age: string }},
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public async deleteEmployeeById(
    params: GetEmployeeByIdParams,
  ) {
     try {
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/delete/${params.id}`, { method: 'DELETE' });
      console.log("RESPONSE", response)
      if (response.status === 429) {
        console.error('🍌');
        return undefined;
      }
      if (response.status !== 200) {
        console.error('Failed to delete employee data');
        return undefined;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}