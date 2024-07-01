import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { ToastContainer } from 'react-toastify';
import { DocumentsStateContext } from '../state/DocumentsStateContext';
import { UploadedDocument } from './components/UploadedDocuments/UploadedDocument';
import { UploaderDocuments } from '../UploaderDocuments/UploaderDocuments';
import Preloader from '../../../../components/Preloader/Preloader';
import 'react-toastify/dist/ReactToastify.css';

export const UploadingMailingPayslipsContent = observer(({
  onSubmit = () => {},
  onUploadDocuments,
}: {
  onSubmit?: () => void,
  onUploadDocuments: () => unknown,
}) => {
  const documentsState = useContext(DocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;
  const notValidDocumentsIsEmpty = documentsState.allNotValidDocuments.length === 0;

  return (
    <>
      <section
        className="uploading-payslips-content"
        data-cy="uploading-payslips-content"
      >
        <div
          className="uploading-payslips-content__header"
          data-cy="uploading-payslips-content-header"
        >
          <Button
            className="uploading-payslips-content__button"
            data-cy="uploading-payslips-content-button"
            disabled={!notValidDocumentsIsEmpty || documentsState.isSent ? true : uploadedDocumentsIsEmpty}
            onClick={() => onSubmit()}
          >
            Send
          </Button>
          <UploaderDocuments onUploadDocuments={onUploadDocuments} />
        </div>
        {!uploadedDocumentsIsEmpty
       && (
         <ul
           className="uploading-payslips-content__list"
           data-cy="uploading-payslips-content-list"
         >
           {
             documentsState
               .allUploadedDocuments
               .map(({
                 id,
                 file,
               }) => (
                 <li
                   key={id}
                   className="uploading-payslips-content__item"
                   data-cy="uploading-payslips-content-item"
                 >
                   <UploadedDocument
                     fileId={id}
                     file={file}
                   />
                 </li>
               ))
           }
         </ul>
       )}
      </section>
      <ToastContainer position="top-center" />
      {documentsState.isSent && <Preloader />}
    </>
  );
});
