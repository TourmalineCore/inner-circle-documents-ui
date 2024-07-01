import { useMemo } from 'react';
import { UploadingMailingPayslipsContainer } from './components/UploadingMailingPayslips/UploadingMailingPayslipsContainer';
import { DocumentsState } from './components/DocumentsState/DocumentsState';
import { DocumentsStateContext } from './components/DocumentsState/DocumentsStateContext';

export function UploadingMailingPayslipsPage() {
  const documentsState = useMemo(
    () => new DocumentsState(),
    [],
  );

  return (
    <DocumentsStateContext.Provider value={documentsState}>
      <UploadingMailingPayslipsContainer />
    </DocumentsStateContext.Provider>

  );
}
