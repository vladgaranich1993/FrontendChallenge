'use client';

import { useCreateEmployee } from '@/domain/hooks/useCreateEmployee.hook';
import {
  EditEmployeeModel
} from "@/domain/params/employee.param";
import EmployeeForm from '@/ui/components/EmployeeForm.component';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateEmployeePage = () => {
  const router = useRouter();
  const createMutation = useCreateEmployee();

  const [newEmployee, setNewEmployee] = useState<EditEmployeeModel>({
    name: '',
    salary: 0,
    age: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      let validationErrors: { [key: string]: string } = {};
      if (!newEmployee.name.trim()) {
        validationErrors.name = 'Name is required';
      }
      if (!newEmployee.salary || isNaN(newEmployee.salary)) {
        validationErrors.salary = 'Valid salary is required';
      }
      if (!newEmployee.age || isNaN(newEmployee.age)) {
        validationErrors.age = 'Valid age is required';
      }
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        console.log(newEmployee)
        const createResult = await createMutation.mutateAsync(newEmployee);
        if (createResult?.status === 'success') {
          router.push(`/employee/${createResult.data.id}`);
        } else {
          validationErrors.general = 'Something went wrong. Please try again.';
          setErrors(validationErrors);
        }
      } catch (error) {
        console.error('Error updating employee:', error);
      }
  };

  return (
    <div>
      <h1>Create Employee</h1>
      <EmployeeForm
        initialValues={newEmployee}
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
        buttonText="Create"
      />
    </div>
  );
};

export default CreateEmployeePage;
