'use client';

import { useGetEmployeeById } from '@/domain/hooks/useGetEmployeeById.hook';
import { useUpdateEmployeeById } from '@/domain/hooks/useUpdateEmployeeById.hook';
import {
  EditEmployeeModel
} from "@/domain/params/employee.param";
import EmployeeForm from '@/ui/components/EmployeeForm.component';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EmployeeDetailsPage = ({ params: { employeeId } }: { params: { employeeId: string } }) => {
  const userId = Number(employeeId);
  const router = useRouter();
  const { data: employee, isLoading, isError, refetch } = useGetEmployeeById(userId);
  const updateMutation = useUpdateEmployeeById();

  const [updatedData, setUpdatedData] = useState<EditEmployeeModel>({
    name: '',
    salary: 0,
    age: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (employee) {
      setUpdatedData({
        name: employee.employee_name,
        salary: employee.employee_salary,
        age: employee.employee_age,
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const retry = () => {
    refetch();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      let validationErrors: { [key: string]: string } = {};
      if (!updatedData.name.trim()) {
        validationErrors.name = 'Name is required';
      }
      if (!updatedData.salary || isNaN(updatedData.salary)) {
        validationErrors.salary = 'Valid salary is required';
      }
      if (!updatedData.age || isNaN(updatedData.age)) {
        validationErrors.age = 'Valid age is required';
      }
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        const updateResult = await updateMutation.mutateAsync({ id: userId, newData: updatedData });
        if (updateResult?.status === 'success') {
          router.push(`/employee/${userId}`);
        } else {
          validationErrors.general = 'Something went wrong. Please try again.';
          setErrors(validationErrors);
        }
      } catch (error) {
        console.error('Error updating employee:', error);
      }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return(
    <>
      <div>Error fetching employee details</div>
      <button onClick={retry}>Retry</button>
    </>
  )

  return (
    <div>
      <h1>Employee Details</h1>
      <EmployeeForm
        initialValues={updatedData}
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
        buttonText="Save"
      />
    </div>
  );
};

export default EmployeeDetailsPage;
