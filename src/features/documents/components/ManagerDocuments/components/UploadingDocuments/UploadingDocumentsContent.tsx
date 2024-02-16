import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocument } from './components/UploadedDocuments/UploadedDocuments';
import { UploaderDocuments } from './components/UploaderDocuments/UploaderDocuments';

export const UploadingDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;

  return (
    <section className="uploading-documents-content" data-cy="uploading-documents-content">
      <UploaderDocuments />
      {!uploadedDocumentsIsEmpty
       && (
         <ul
           className="uploading-documents-content__list"
           data-cy="uploading-documents-content-list"
         >
           {documentsState.allUploadedDocuments.map((file) => (
             <li
               key={file.name}
               className="uploading-documents-content__item"
               data-cy="uploading-documents-content-item"
             >
               <UploadedDocument file={file} />
             </li>
           ))}
         </ul>
       )}
    </section>
  );
});
