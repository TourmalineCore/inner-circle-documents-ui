import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useContext } from 'react';
import IconDelet from '../../../../../../../../../../assets/icons/icon-delete.svg';
import { AllDocumentsStateContext } from '../../../../../../../AllDocumentsState/AllDocumentsStateContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ERROR_TEXT = 'The data in the file does not match the file name';

export function UploadedDocumentCard({
  name,
  error,
}: {
  name: string;
  error: boolean
}) {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <div
      className="uploaded-document-card"
      data-cy="uploaded-document-card"
    >
      <div
        className="uploaded-document-card__inner"
        data-cy="uploaded-document-card-inner"
      >
        <div
          className="uploaded-document-card__header"
          data-cy="uploaded-document-card-header"
        >
          <h3
            className="uploaded-document-card__name"
            data-cy="uploaded-document-card-name"
          >
            {name.split(' ')[2]}
          </h3>
          <button
            type="button"
            className="uploaded-document-card__delete"
            data-cy="uploaded-document-card-delete"
            onClick={() => documentsState.deleteUploadedDocument(name)}
          >
            <img
              className="uploaded-document-card__icon"
              data-cy="uploaded-document-card-icon"
              src={IconDelet}
              width="20"
              height="20"
              alt="DeleteIcon"
            />
          </button>
        </div>
        {error && (
          <span
            className="uploaded-document-card__error"
            data-cy="uploaded-document-card-error"
          >
            {ERROR_TEXT}
          </span>
        )}
      </div>
    </div>
  );
}
