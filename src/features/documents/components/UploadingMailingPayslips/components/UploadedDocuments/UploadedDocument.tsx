import { useContext, useState } from 'react';
import {
  Document, Page, pdfjs,
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { TextContent } from 'pdfjs-dist/types/src/display/api';
import { UploadedDocumentCard } from './components/UploadedDocumentCard/UploadedDocumentCard';
import { DocumentsStateContext } from '../../../DocumentsState/DocumentsStateContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const NON_EXISTING_EMPLOYEE_IN_FILE_NAME_ERROR_MESSAGE = 'This file name doesn\'t contain an existing employee last name';
const NO_EMPLOYEE_LAST_NAME_IN_FILE_ERROR_MESSAGE = 'This file doesn\'t contain the same employee last name as in its file name';
const UNDEFIND_EMPLOYEE = 'Undefind';

export function UploadedDocument({
  fileId,
  file,
}: {
  fileId: string
  file: File;
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [validationFinish, setValidationFinish] = useState(false);

  const documentsState = useContext(DocumentsStateContext);

  const nonExistingEmployeeInFileName = documentsState
    .documentIdsWithNonExistingEmployeeInFileName
    .includes(fileId);

  const lastName = !nonExistingEmployeeInFileName
    ? documentsState.documentIdsEmployeeMap[fileId].lastName
    : UNDEFIND_EMPLOYEE;

  return (
    <>
      {
        !nonExistingEmployeeInFileName && (
          <div style={{ display: 'none' }}>
            <Document file={file}>
              <Page
                pageNumber={1}
                renderAnnotationLayer={false}
                onGetTextSuccess={validationTextDocument}
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
            lastName={lastName}
          />
        )
      }
      {
        validationFinish && (
          <UploadedDocumentCard
            fileId={fileId}
            name={file.name}
            errorMessage={errorMessage}
            lastName={lastName}
          />
        )
      }
    </>
  );

  function validationTextDocument(text: TextContent) {
    const doesNotContainLastNameInFileText = text
      .items
      // @ts-ignore
      .every((item) => !item.str.includes(lastName));

    if (doesNotContainLastNameInFileText) {
      documentsState.addNotValidDocumentsId(fileId);
      setErrorMessage(NO_EMPLOYEE_LAST_NAME_IN_FILE_ERROR_MESSAGE);
    }

    setValidationFinish(true);
  }
}
