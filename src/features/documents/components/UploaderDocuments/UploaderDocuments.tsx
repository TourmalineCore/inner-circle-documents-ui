import { ChangeEvent, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';

export function UploaderDocuments() {
  const documentsState = useContext(AllDocumentsStateContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
      <span className="uploader-documents__text">
        Upload files
      </span>
    </label>

  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (pathname !== '/documents/uploading-documents') {
      navigate('uploading-documents');
    }

    const fileList: File[] = Object.values(event.target.files!);
    documentsState.addUploadedDocuments(fileList);
  }
}
