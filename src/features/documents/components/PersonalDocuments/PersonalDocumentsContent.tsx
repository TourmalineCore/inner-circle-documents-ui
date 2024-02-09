import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { DocumentsList } from '../DocumentsList/DocumentsList';
import { DocumentsProps } from '../types';

const mockDocuments: DocumentsProps = [
  {
    id: '1',
    name: 'Ivanov I.I',
    date: new Date(),
    previewLink: '',
    downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
  },
];

export const PersonalDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <section className="personal-documents-content" data-cy="personal-documents-content">
      <DatePicker
        selectedDate={documentsState.selectedDate}
        onChange={documentsState.updateDate}
      />
      <DocumentsList list={mockDocuments} />
    </section>
  );
});
