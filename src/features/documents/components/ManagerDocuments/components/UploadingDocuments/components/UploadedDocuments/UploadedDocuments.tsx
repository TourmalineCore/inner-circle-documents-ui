import { useState } from 'react';
import {
  Document, Page, pdfjs,
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { UploadedDocumentCard } from './components/UploadedDocumentCard/UploadedDocumentCard';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function UploadedDocument({
  file,
  addNotValidDocuments,
}: {
  file: File;
  addNotValidDocuments: () => void
}) {
  const [error, setError] = useState(false);
  const [validationFinish, setValidationFinish] = useState(false);

  return (
    <>
      <div style={{ display: 'none' }}>
        <Document file={file}>
          <Page
            pageNumber={1}
            renderAnnotationLayer={false}
            onGetTextSuccess={(text) => validationTextDocument(text)}
          />
        </Document>
      </div>
      {validationFinish && (
        <UploadedDocumentCard
          name={file.name}
          error={error}
        />
      )}
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
    setError(true);
    setValidationFinish(true);
  }
}
