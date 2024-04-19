import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployeeById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => service.deleteEmployeeById({id}),
    onSuccess: () => {
      queryClient.invalidateQueries("getEmployeeList");
    },
  });
};

export default useDeleteEmployeeById;
