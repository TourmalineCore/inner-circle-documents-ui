import { useContext, useEffect } from 'react';
import { ManagementDocumentsContent } from './ManagementDocumentsContent';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';

export function ManagementDocumentsContainer() {
  const documentsState = useContext(AllDocumentsStateContext);

  useEffect(() => {
    loadManagementDocuments();
  }, []);

  return (
    <ManagementDocumentsContent />
  );

  async function loadManagementDocuments() {
    const mockDocuments = [{
      id: 1,
      name: 'Ivanov I.I',
      date: new Date(),
      previewLink: '',
      downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
    },
    {
      id: 2,
      name: 'Sidorov S.S',
      date: new Date('2024-01-21T13:51:50.417Z'),
      previewLink: '',
      downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
    },
    {
      id: 3,
      name: 'Petrov P.P',
      date: new Date(),
      previewLink: '',
      downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
    }];

    documentsState.initialize({
      documents: mockDocuments,
    });
  }
}
