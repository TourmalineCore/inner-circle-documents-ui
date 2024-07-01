/** returns map of matched documentId-employee key value pairs */
export function matchDocumentsWithEmployees({
  payslipDocuments,
  employees,
} : {
  payslipDocuments: {
    id: string,
    file: {
      name: string
    }
  }[],
  employees: {
    lastName: string
  }[],
}) {
  const result: {
    [documentId: string]: {
      lastName: string;
    };
  } = {};

  payslipDocuments.forEach((document) => {
    const matchingEmployee = employees.find((employee) => document.file.name.toLowerCase().includes(employee.lastName.toLowerCase()));

    if (matchingEmployee) {
      result[document.id] = {
        lastName: matchingEmployee.lastName,
      };
    }
  });

  return result;
}
