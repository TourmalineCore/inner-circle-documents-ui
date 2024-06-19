import { useContext, useState } from 'react';
import {
  Document, Page, pdfjs,
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { UploadedDocumentCard } from './components/UploadedDocumentCard/UploadedDocumentCard';
import { DocumentsStateContext } from '../../../DocumentsState/DocumentsStateContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const NON_EXISTING_EMPLOYEE_IN_FILE_NAME_ERROR_MESSAGE = 'This file name doesn\'t contain an existing employee last name';
const NO_EMPLOYEE_LAST_NAME_IN_FILE_ERROR_MESSAGE = 'This file doesn\'t contain the same employee last name as in its file name';

export function UploadedDocument({
  fileId,
  file,
  addNotValidDocuments,
}: {
  fileId: string
  file: File;
  addNotValidDocuments: () => void
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [validationFinish, setValidationFinish] = useState(false);

  const documentsState = useContext(DocumentsStateContext);

  const nonExistingEmployeeInFileName = documentsState
    .documentIdsWithNonExistingEmployeeInFileName
    .includes(fileId);

  return (
    <>
      {
        !nonExistingEmployeeInFileName && (
          <div style={{ display: 'none' }}>
            <Document file={file}>
              <Page
                pageNumber={1}
                renderAnnotationLayer={false}
                onGetTextSuccess={(text) => validationTextDocument(text)}
              />
            </Document>
          </div>
        )
      }
      {
        nonExistingEmployeeInFileName && (
          <UploadedDocumentCard
            fileId={fileId}
            name={file.name}
            errorMessage={NON_EXISTING_EMPLOYEE_IN_FILE_NAME_ERROR_MESSAGE}
          />
        )
      }
      {
        validationFinish && (
          <UploadedDocumentCard
            fileId={fileId}
            name={file.name}
            errorMessage={errorMessage}
          />
        )
      }
    </>
  );

  function validationTextDocument(texts: any) {
    const lastName = file.name.split(' ')[2];

    for (const item of texts.items) {
      if (item.str.includes(lastName)) {
        setValidationFinish(true);
        return;
      }
    }
    addNotValidDocuments();
    setErrorMessage(NO_EMPLOYEE_LAST_NAME_IN_FILE_ERROR_MESSAGE);
    setValidationFinish(true);
  }
}
