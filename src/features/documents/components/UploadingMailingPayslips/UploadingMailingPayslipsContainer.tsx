import { useContext } from 'react';
import { UploadingMailingPayslipsContent } from './UploadingMailingPayslipsContent';
import { api } from '../../../../common/api';
import { LINK_TO_DOCUMENTS_SERVICE } from '../../../../common/config/config';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { objectToFormData } from '../../../../common/utils/objectToFormData';

export function UploadingMailingPayslipsContainer() {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <UploadingMailingPayslipsContent onSubmit={sendMailingPayslipsAsync} />
  );

  async function sendMailingPayslipsAsync() {
    const data = documentsState.allUploadedDocuments.map((uploadedDocument) => ({
      lastName: uploadedDocument.file.name.split(' ')[2],
      file: uploadedDocument.file,
    }));
    const formData = objectToFormData(data);

    try {
      await api.post(`${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`, formData);
      documentsState.clearUploadedDocuments();
    } catch (e) {
      console.log(e);
    } finally {
      documentsState.setIsSent(false);
    }
  }
}
