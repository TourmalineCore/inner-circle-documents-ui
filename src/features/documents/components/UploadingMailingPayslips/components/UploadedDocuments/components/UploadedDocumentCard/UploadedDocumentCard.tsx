import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useContext } from 'react';
import IconDelet from '../../../../../../../../assets/icons/icon-delete.svg';
import { DocumentsStateContext } from '../../../../../DocumentsState/DocumentsStateContext';
import InfoTip from '../../../../../../../../components/InfoTip/InfoTip';
import IconQuestionMark from '../../../../../../../../assets/icons/question-mark-circle.svg';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ERROR_TEXT = 'The lastName in the file doesn\'t match the file name';

export function UploadedDocumentCard({
  fileId,
  name,
  error,
}: {
  fileId: number,
  name: string;
  error: boolean;
}) {
  const documentsState = useContext(DocumentsStateContext);
  const lastName = name.split(' ')[2];

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
          <span
            className="uploaded-document-card__name"
            data-cy="uploaded-document-card-name"
          >
            {lastName}
          </span>
          <div className="uploaded-document-card__actions">
            <InfoTip
              icon={(
                <img
                  src={IconQuestionMark}
                  width="18"
                  height="18"
                  alt="QestionMarkIcon"
                />
              )}
              content={name}
            />
            <button
              type="button"
              className="uploaded-document-card__delete"
              data-cy="uploaded-document-card-delete"
              disabled={documentsState.isSent}
              onClick={() => documentsState.deleteUploadedDocument(fileId)}
            >
              <img
                className="uploaded-document-card__delete-icon"
                data-cy="uploaded-document-card-delete-icon"
                src={IconDelet}
                width="18"
                height="18"
                alt="DeleteIcon"
              />
            </button>
          </div>
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
