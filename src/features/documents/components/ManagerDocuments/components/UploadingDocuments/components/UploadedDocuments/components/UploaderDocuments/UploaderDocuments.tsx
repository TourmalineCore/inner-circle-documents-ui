import { ChangeEvent, useContext } from 'react';
import { AllDocumentsStateContext } from '../../../../../../../AllDocumentsState/AllDocumentsStateContext';

export function UploaderDocuments() {
  const documentsState = useContext(AllDocumentsStateContext);

  return (
    <input
      className="uploader-documents"
      data-cy="uploader-documents"
      onChange={handleChange}
      type="file"
      multiple
      accept=".pdf"
    />
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList: File[] = Object.values(event.target.files!);

    documentsState.setUploadedDocuments(fileList);
  }
}
