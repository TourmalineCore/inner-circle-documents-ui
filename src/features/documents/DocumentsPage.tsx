import { useMemo } from 'react';
import { AllDocumentsStateContext } from './components/AllDocuments/state/AllDocumentsStateContext';
import { AllDocumentsState } from './components/AllDocuments/state/AllDocumentsState';
import { DatePickerAllDocuments } from './components/AllDocuments/components/DatePickerAllDocument/DatePickerAllDocuments';

function DocumentsPage() {
  const documentsState = useMemo(
    () => new AllDocumentsState(),
    [],
  );

  return (
    <AllDocumentsStateContext.Provider value={documentsState}>
      <DatePickerAllDocuments />
    </AllDocumentsStateContext.Provider>
  );
}

export default DocumentsPage;
