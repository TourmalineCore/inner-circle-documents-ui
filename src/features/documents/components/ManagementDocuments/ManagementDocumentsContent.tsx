import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { DocumentsList } from '../DocumentsList/DocumentsList';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { DocumentsProps } from '../types';
import { UploaderDocuments } from '../UploaderDocuments/UploaderDocuments';

const mockDocuments: DocumentsProps = [
  {
    id: 1,
    name: 'Ivanov I.I',
    date: new Date(),
    previewLink: '',
    downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
  },
];

export const ManagementDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <section className="management-documents-content" data-cy="management-documents-content">
      <div
        className="management-documents-content__header"
        data-cy="management-documents-content-header"
      >
        <DatePicker
          selectedDate={documentsState.selectedDate}
          onChange={documentsState.updateDate}
        />
        <UploaderDocuments />
      </div>
      <DocumentsList list={mockDocuments} />
    </section>
  );
});
