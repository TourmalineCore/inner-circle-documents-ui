import { useMemo } from 'react';
import { UploadingMailingPayslipsContainer } from './sections/list/UploadingMailingPayslipsContainer';
import { DocumentsState } from './sections/state/DocumentsState';
import { DocumentsStateContext } from './sections/state/DocumentsStateContext';

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
