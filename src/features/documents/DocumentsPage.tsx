import { useMemo } from 'react';
import { AllDocumentsStateContext } from './components/AllDocuments/state/AllDocumentsStateContext';
import { AllDocumentsState } from './components/AllDocuments/state/AllDocumentsState';
import { DatePickerAllDocuments } from './components/AllDocuments/components/DatePickerAllDocument/DatePickerAllDocuments';
import { DocumentsList } from './components/AllDocuments/components/DocumentsList/DocumentsList';

const mockDocuments = ['file-1', 'file-2', 'file-3'];

export function DocumentsPage() {
  const documentsState = useMemo(
    () => new AllDocumentsState(),
    [],
  );

  return (
    <AllDocumentsStateContext.Provider value={documentsState}>
      <DatePickerAllDocuments />
      <DocumentsList list={mockDocuments} />
    </AllDocumentsStateContext.Provider>
  );
}
