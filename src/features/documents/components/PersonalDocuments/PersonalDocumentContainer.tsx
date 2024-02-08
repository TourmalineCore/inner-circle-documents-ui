import { useMemo } from 'react';
import { AllDocumentsState } from '../AllDocuments/state/AllDocumentsState';
import { PersonalDocumentsContent } from './PersonalDocumentsContent';
import { AllDocumentsStateContext } from '../AllDocuments/state/AllDocumentsStateContext';

export function PersonalDocumentsContainer() {
  const documentsState = useMemo(
    () => new AllDocumentsState(),
    [],
  );

  return (
    <AllDocumentsStateContext.Provider value={documentsState}>
      <PersonalDocumentsContent />
    </AllDocumentsStateContext.Provider>
  );
}
