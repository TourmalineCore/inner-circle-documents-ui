import { useContext } from 'react';
import { UploadingMailingPayslipsContent } from './UploadingMailingPayslipsContent';
import { api } from '../../../../common/api';
import { LINK_TO_DOCUMENTS_SERVICE } from '../../../../common/config/config';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';

export function UploadingMailingPayslipsContainer() {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <UploadingMailingPayslipsContent onSubmit={sendMailingPayslipsAsync} />
  );

  async function sendMailingPayslipsAsync() {
    const formData = new FormData();

    for (const document of documentsState.allUploadedDocuments) {
      formData.append(document.file.name, document.file);
    }

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
