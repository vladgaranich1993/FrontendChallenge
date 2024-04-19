import { QueryKey, useQuery } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeList = () => {
  return useQuery({
    queryKey: ["getEmployeeList"] as QueryKey,
    queryFn: () => service.getEmployeeList(),
  });
};
