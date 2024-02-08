import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { AllDocumentsStateContext } from '../AllDocuments/state/AllDocumentsStateContext';

export const PersonalDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <section className="personal-documents-content" data-cy="personal-documents-content">
      <DatePicker
        selectedDate={documentsState.selectedDate}
        onChange={documentsState.updateDate}
      />
    </section>
  );
});
