import { useContext } from 'react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { UploadingPayslipsContent } from './UploadingPayslipsContent';
import { api } from '../../../../common/api';
import { LINK_TO_DOCUMENTS_SERVICE } from '../../../../common/config/config';
import { PayslipsStateContext } from '../state/PayslipsStateContext';
import { objectToFormData } from '../../../../common/utils/objectToFormData';

export const UploadingPayslipsContainer = observer(() => {
  const payslipsState = useContext(PayslipsStateContext);

  return (
    <UploadingPayslipsContent
      onSubmit={sendPayslipsAsync}
      onUploadPayslips={getEmployeesForValidationAsync}
    />
  );

  async function sendPayslipsAsync() {
    const data = payslipsState.allUploadedPayslips.map((uploadedPayslip) => ({
      File: uploadedPayslip.file,
      LastName: uploadedPayslip.file.name.split(' ')[2],
    }));

    const formData = objectToFormData({
      payslips: data,
    });

    try {
      payslipsState.setIsSent(true);
      await api.post(
        `${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`,
        formData,
      );
      payslipsState.clearUploadedPayslips();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      payslipsState.setIsSent(false);
    }
  }

  async function getEmployeesForValidationAsync() {
    const {
      data: employees,
    } = await api.get(`${LINK_TO_DOCUMENTS_SERVICE}getEmployees`);

    payslipsState.initialize({
      employees,
    });
  }
});
