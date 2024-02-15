import { observer } from 'mobx-react-lite';
import { ChangeEvent, useContext } from 'react';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocuments } from './components/UploadedDocuments/UploadedDocuments';

export const UploadingDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;

  return (
    <section className="uploading-documents-content" data-cy="uploading-documents-content">
      <input
        className="uploading-documents-content__uploader"
        data-cy="uploading-documents-content-uploader"
        onChange={handleChange}
        type="file"
        multiple
        accept=".pdf"
      />
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
               <UploadedDocuments file={file} />
             </li>
           ))}
         </ul>
       )}
    </section>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList: File[] = Object.values(event.target.files!);

    documentsState.setUploadedDocuments(fileList);
  }
});
