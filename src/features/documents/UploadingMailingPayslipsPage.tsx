import { useMemo } from 'react';
import { UploadingMailingPayslipsContainer } from './components/UploadingMailingPayslips/UploadingMailingPayslipsContainer';
import { DocumentsState } from './components/state/DocumentsState';
import { DocumentsStateContext } from './components/state/DocumentsStateContext';

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
