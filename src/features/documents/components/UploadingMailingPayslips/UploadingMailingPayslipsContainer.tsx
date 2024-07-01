import { useContext } from 'react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { UploadingMailingPayslipsContent } from './UploadingMailingPayslipsContent';
import { api } from '../../../../common/api';
import { LINK_TO_DOCUMENTS_SERVICE } from '../../../../common/config/config';
import { DocumentsStateContext } from '../state/DocumentsStateContext';
import { objectToFormData } from '../../../../common/utils/objectToFormData';

export const UploadingMailingPayslipsContainer = observer(() => {
  const documentsState = useContext(DocumentsStateContext);

  return (
    <UploadingMailingPayslipsContent
      onSubmit={sendMailingPayslipsAsync}
      onUploadDocuments={getEmployeesForValidationAsync}
    />
  );

  async function sendMailingPayslipsAsync() {
    const data = documentsState.allUploadedDocuments.map((uploadedDocument) => ({
      File: uploadedDocument.file,
      LastName: uploadedDocument.file.name.split(' ')[2],
    }));

    const formData = objectToFormData({ payslips: data });

    try {
      documentsState.setIsSent(true);
      await api.post(`${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`, formData);
      documentsState.clearUploadedDocuments();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      documentsState.setIsSent(false);
    }
  }

  async function getEmployeesForValidationAsync() {
    const {
      data: employees,
    } = await api.get(`${LINK_TO_DOCUMENTS_SERVICE}getEmployees`);

    documentsState.initialize({
      employees,
    });
  }
});
