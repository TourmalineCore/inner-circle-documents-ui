import { observer } from 'mobx-react-lite';
import { useContext, useLayoutEffect } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocument } from './components/UploadedDocuments/UploadedDocuments';
import { UploaderDocuments } from './components/UploaderDocuments/UploaderDocuments';
import { useTimer } from './hooks/useTimer';

export const UploadingDocumentsContent = observer(() => {
  const {
    timerRun, sendTime,
    startSend, endSend,
  } = useTimer();
  const documentsState = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;
  const notValidDocumentsIsEmpty = documentsState.allNotValidDocuments.length === 0;

  useLayoutEffect(() => {
    endSend();
  }, [documentsState.allUploadedDocuments]);

  return (
    <section className="uploading-documents-content" data-cy="uploading-documents-content">
      <div
        className="uploading-documents-content__header"
        data-cy="uploading-documents-content-header"
      >
        <UploaderDocuments />
        <Button
          className="uploading-documents-content__button"
          data-cy="uploading-documents-content-button"
          disabled={!notValidDocumentsIsEmpty ? true : uploadedDocumentsIsEmpty}
          onClick={timerRun ? endSend : startSend}
        >
          {timerRun ? `Cancel...${sendTime}` : 'Confirm'}
        </Button>
      </div>
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
