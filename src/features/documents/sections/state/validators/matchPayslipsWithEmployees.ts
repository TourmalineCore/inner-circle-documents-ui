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

  // TODO using Unicode-compatible comparison
  // This ensures accurate matching even if the names contain Unicode characters with accents or other diacritical marks
  // Normalization Form D (NFD) - canonical decomposition. Decompose cześć into c, z, e, c + ´, s + ´
  payslips.forEach((payslip) => {
    const matchingEmployee = employees.find((employee) => payslip.file.name.toLowerCase().includes(employee.lastName.toLowerCase()));

    //const matchingEmployee = employees.find(
    //    (employee) => payslip.file.name.toLowerCase()
    //        .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    //        .includes(employee.lastName.toLowerCase()
    //            .normalize('NFD').replace(/\p{Diacritic}/gu, '')),
    //);

    if (matchingEmployee) {
      result[payslip.id] = {
        lastName: matchingEmployee.lastName,
      };
    }
  });

  return result;
}
