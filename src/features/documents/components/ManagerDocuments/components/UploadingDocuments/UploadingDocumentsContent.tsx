import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';

export const UploadingDocumentsContent = observer(() => {
  const { allUploadedDocuments } = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = allUploadedDocuments.length === 0;

  return (
    <section className="uploading-documents-content" data-cy="uploading-documents-content">
      <input
        className="uploading-documents-content__uploader"
        data-cy="uploading-documents-content-uploader"
        type="file"
        multiple
        accept=".pdf"
      />
      { !uploadedDocumentsIsEmpty
       && (
         <ul
           className="uploading-documents-content__list"
           data-cy="uploading-documents-content-list"
         />
       )}
    </section>
  );
});
