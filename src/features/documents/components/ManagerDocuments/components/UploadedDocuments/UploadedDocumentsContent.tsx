export function UploadedDocumentsContent() {
  return (
    <section className="uploaded-documents-content" data-cy="uploaded-documents-content">
      <input
        className="uploaded-documents-content__uploader"
        data-cy="uploaded-documents-content-uploader"
        type="file"
        multiple
        accept=".pdf"
      />
    </section>
  );
}
