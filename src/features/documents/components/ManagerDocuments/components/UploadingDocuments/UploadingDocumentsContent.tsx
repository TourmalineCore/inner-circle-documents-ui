export function UploadingDocumentsContent() {
  return (
    <section className="uploading-documents-content" data-cy="uploading-documents-content">
      <input
        className="uploading-documents-content__uploader"
        data-cy="uploading-documents-content-uploader"
        type="file"
        multiple
        accept=".pdf"
      />
    </section>
  );
}
