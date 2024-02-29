import { useContext } from 'react';
import { UploadingMailingPayslipsContent } from './UploadingMailingPayslipsContent';
import { api } from '../../../../common/api';
import { LINK_TO_DOCUMENTS_SERVICE } from '../../../../common/config/config';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { objectToFormData } from '../../../../common/utils/objectToFormData';

export function UploadingMailingPayslipsContainer() {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <UploadingMailingPayslipsContent onSubmit={sendMailingPayslips} />
  );

  async function sendMailingPayslips() {
    const data = documentsState.allUploadedDocuments.map((uploadedDocument) => objectToFormData({
      lastName: uploadedDocument.file.name.split(' ')[2],
      file: uploadedDocument.file,
    }));

    try {
      await api.post(`${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`, data);
      documentsState.clearUploadedDocuments();
      documentsState.setIsSent(false);
    } catch (e) {
      console.log(e);
    }
  }
}
