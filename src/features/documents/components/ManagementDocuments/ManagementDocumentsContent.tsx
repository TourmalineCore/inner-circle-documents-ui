import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { DocumentsList } from '../DocumentsList/DocumentsList';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { UploaderDocuments } from '../UploaderDocuments/UploaderDocuments';

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
          onClearDate={documentsState.updateDate}
        />
        <UploaderDocuments />
      </div>
      <DocumentsList list={documentsState.allDocuments} />
    </section>
  );
});
