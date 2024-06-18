/** returns array of ids of uploadedPayslipDocuments for which we found no employees */
export function validatePayslipsFileNames({
  uploadedPayslipDocuments,
  employees,
}: {
  uploadedPayslipDocuments: {
    id: string,
    file: {
      name: string
    }
  }[],
  employees: {
    lastName: string
  }[],
}) {
  const ids: string[] = [];

  uploadedPayslipDocuments.forEach((document) => {
    const noEmployeeWithMatchingName = employees.every((employee) => !document.file.name.toLowerCase().includes(employee.lastName.toLowerCase()));

    if (noEmployeeWithMatchingName) {
      ids.push(document.id);
    }
  });

  return ids;
}
