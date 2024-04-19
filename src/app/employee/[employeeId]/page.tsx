"use client";

import { useDeleteEmployeeById } from '@/domain/hooks/useDeleteEmployeeById.hook';
import { useGetEmployeeById } from '@/domain/hooks/useGetEmployeeById.hook';
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useState } from 'react';

export default function EditEmployeePage({params: { employeeId }}: {
  params: { employeeId: string };
}) {
  // TODO Implement employee details page and delete feature
  const employee = useGetEmployeeById(Number(employeeId)).data;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteSuccesful, setIsDeleteSuccesful] = useState<boolean | undefined>(undefined);
  const mutation = useDeleteEmployeeById();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await mutation.mutateAsync(Number(employeeId));
      console.log('Delete result:', result);
      if (result === undefined) {
        setIsDeleteSuccesful(false);
      } else {
        setIsDeleteSuccesful(true);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setIsDeleteSuccesful(false);
    } finally {
      setIsDeleting(false);
    }
  };
  if (!employee) {
    return (
      <main className="flex h-screen flex-col items-start justify-start p-4">
        <h1>Employee Not Found</h1>
      </main>
    );
  }

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      {isDeleteSuccesful !== true &&
        <div>
          <h1>Employee Details</h1>
          <EmployeeCard employee={employee} />
          <Link
            className="border px-2 py-1 rounded-md"
            href={`/employee/${employee.id}/edit`}
          >
            Edit
          </Link>
          <button onClick={handleDelete} className="border px-2 py-1 rounded-md" disabled={isDeleting}>Delete</button>
        </div>
      }
      {isDeleteSuccesful === true && 
        <div>
          <p>Employee deleted successfully</p>
          <Link
            className="border px-2 py-1 rounded-md"
            href={`/`}
          >Go home</Link>
          </div>
        }
      {isDeleteSuccesful === false && <p>Failed to delete employee</p>}
      {isDeleting && <p>Deleting employee...</p>}
    </main>
  );
}
