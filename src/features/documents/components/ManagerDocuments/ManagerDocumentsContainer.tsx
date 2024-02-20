import { useMemo } from 'react';
import { ManagerDocumentsContent } from './ManagerDocumentsContent';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';

export function ManagerDocumentsContainer() {
  const documentsState = useMemo(
    () => new AllDocumentsState(),
    [],
  );

  return (
    <AllDocumentsStateContext.Provider value={documentsState}>
      <ManagerDocumentsContent />
    </AllDocumentsStateContext.Provider>
  );
}
