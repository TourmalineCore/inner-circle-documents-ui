export function UploadedDocumentCard() {
  return (
    <div
      className="uploaded-document-card"
      data-cy="uploaded-document-card"
    >
      <div
        className="uploaded-document-card__inner"
        data-cy="uploaded-document-card-inner"
      >
        <h3
          className="uploaded-document-card__name"
          data-cy="uploaded-document-card-name"
        >
          Title
        </h3>
        <span
          className="uploaded-document-card__delete"
          data-cy="uploaded-document-card-delete"
        />
      </div>
    </div>
  );
}
