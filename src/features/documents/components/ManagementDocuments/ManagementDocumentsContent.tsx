import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { DocumentsList } from '../DocumentsList/DocumentsList';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { UploaderDocuments } from '../UploaderDocuments/UploaderDocuments';
import { getMonthAndYear } from '../../../../common/utils/getMonthAndYear';

export const ManagementDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  const documents = documentsState.selectedDate !== null
    ? documentsState.allDocuments.filter((document) => getMonthAndYear(document.date) === getMonthAndYear(documentsState.selectedDate!))
    : [...documentsState.allDocuments].sort((a, b) => (a.date > b.date ? 1 : -1));

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
      <DocumentsList list={documents} />
    </section>
  );
});
