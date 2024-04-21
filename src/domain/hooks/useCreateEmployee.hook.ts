import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateEmployeeParams) => service.createEmployee(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
    },
  });
};

export default useCreateEmployee;
