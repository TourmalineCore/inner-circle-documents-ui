import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocument } from './components/UploadedDocuments/UploadedDocuments';
import { UploaderDocuments } from './components/UploaderDocuments/UploaderDocuments';

const BEGIN_TIME = 3;

export const UploadingDocumentsContent = observer(() => {
  const [sendTime, setSendTime] = useState(BEGIN_TIME);
  const [timerRun, setTimerRun] = useState(false);

  const documentsState = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;
  const notValidDocumentsIsEmpty = documentsState.allNotValidDocuments.length === 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRun) {
      timer = setTimeout(() => setSendTime(sendTime - 1), 1000);

      if (sendTime < 0) {
        uploadDocuments();
        setSendTime(BEGIN_TIME);
        setTimerRun(false);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timerRun, sendTime]);

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
           {documentsState.allUploadedDocuments.map((file) => (
             <li
               key={file.name}
               className="uploading-documents-content__item"
               data-cy="uploading-documents-content-item"
             >
               <UploadedDocument
                 file={file}
                 addNotValidDocuments={() => documentsState.addNotValidDocuments(file)}
               />
             </li>
           ))}
         </ul>
       )}
    </section>
  );

  function startSend() {
    setTimerRun(true);
  }

  function endSend() {
    setTimerRun(false);
    setSendTime(BEGIN_TIME);
  }

  async function uploadDocuments() {
    // TODO TEST LOG
    console.log('SUCCESS');
  }
});
