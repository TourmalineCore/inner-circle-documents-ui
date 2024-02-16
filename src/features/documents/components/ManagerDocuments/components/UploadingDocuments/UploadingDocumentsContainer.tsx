import { useMemo } from 'react';
import { UploadingDocumentsContent } from './UploadingDocumentsContent';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { AllDocumentsState } from '../../../AllDocumentsState/AllDocumentsState';

export function UploadingDocumentsContainer() {
  const documentsState = useMemo(
    () => new AllDocumentsState(),
    [],
  );

  return (
    <AllDocumentsStateContext.Provider value={documentsState}>
      <UploadingDocumentsContent />
    </AllDocumentsStateContext.Provider>
  );
}
