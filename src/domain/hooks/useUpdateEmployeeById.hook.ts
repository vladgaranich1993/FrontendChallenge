import { UpdateEmployeeParams } from "@/domain/params/employee.param";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useUpdateEmployeeById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateEmployeeParams) => service.updateEmployeeById(params),
    });
};

export default useUpdateEmployeeById;
