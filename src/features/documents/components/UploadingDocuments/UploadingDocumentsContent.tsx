import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocument } from './components/UploadedDocuments/UploadedDocuments';
import { UploaderDocuments } from '../UploaderDocuments/UploaderDocuments';
import 'react-toastify/dist/ReactToastify.css';

export const UploadingDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;
  const notValidDocumentsIsEmpty = documentsState.allNotValidDocuments.length === 0;

  return (
    <section className="uploading-documents-content" data-cy="uploading-documents-content">
      <div
        className="uploading-documents-content__header"
        data-cy="uploading-documents-content-header"
      >
        <Button
          className="uploading-documents-content__button"
          data-cy="uploading-documents-content-button"
          disabled={!notValidDocumentsIsEmpty ? true : uploadedDocumentsIsEmpty}
          onClick={() => toast.info('Sending payslips', { toastId: 1 })}
        >
          Send
        </Button>
        <UploaderDocuments />
      </div>
      <ToastContainer
        position="top-center"
      />
      {!uploadedDocumentsIsEmpty
       && (
         <ul
           className="uploading-documents-content__list"
           data-cy="uploading-documents-content-list"
         >
           {documentsState.allUploadedDocuments.map(({ id, file }) => (
             <li
               key={id}
               className="uploading-documents-content__item"
               data-cy="uploading-documents-content-item"
             >
               <UploadedDocument
                 fileId={id}
                 file={file}
                 addNotValidDocuments={() => documentsState.addNotValidDocumentsId(id)}
               />
             </li>
           ))}
         </ul>
       )}
    </section>
  );
});
