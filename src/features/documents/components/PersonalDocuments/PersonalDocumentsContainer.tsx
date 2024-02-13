import { useMemo } from 'react';
import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';
import { PersonalDocumentsContent } from './PersonalDocumentsContent';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';

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
