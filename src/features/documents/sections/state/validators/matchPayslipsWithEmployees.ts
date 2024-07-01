/** returns map of matched payslipId-employee key value pairs */
export function matchPayslipsWithEmployees({
  payslips,
  employees,
} : {
  payslips: {
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
    [payslipId: string]: {
      lastName: string;
    };
  } = {};

  payslips.forEach((payslip) => {
    const matchingEmployee = employees.find((employee) => payslip.file.name.toLowerCase().includes(employee.lastName.toLowerCase()));

    if (matchingEmployee) {
      result[payslip.id] = {
        lastName: matchingEmployee.lastName,
      };
    }
  });

  return result;
}
