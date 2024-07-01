import { ChangeEvent, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { DocumentsStateContext } from '../DocumentsState/DocumentsStateContext';

export const UploaderDocuments = observer(({
  onUploadDocuments,
}:{
  onUploadDocuments: () => unknown,
}) => {
  const documentsState = useContext(DocumentsStateContext);
  return (
    <label
      className="uploader-documents"
      data-cy="uploader-documents"
    >
      <input
        className="uploader-documents__input"
        onChange={handleChange}
        type="file"
        value=""
        multiple
        accept=".pdf"
      />
      <span
        className="uploader-documents__text"
        data-cy="uploader-documents-text"
      >
        Upload payslips
      </span>
    </label>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList: File[] = Object.values(event.target.files!);
    documentsState.addUploadedDocuments(fileList);

    onUploadDocuments();
  }
});
