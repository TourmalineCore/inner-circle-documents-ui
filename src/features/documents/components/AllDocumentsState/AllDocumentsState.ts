import { makeAutoObservable } from 'mobx';
import { DocumentsProps, UploadedDocumentsProps } from '../types';

export class AllDocumentsState {
  private _selectedDate: Date = new Date();

  private _documents: DocumentsProps = [];

  private _uploadedDocuments: UploadedDocumentsProps = [];

  private _notValidDocumentsIds: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get selectedDate() {
    return this._selectedDate;
  }

  get monthYearDate() {
    const month = this._selectedDate.getMonth() + 1;
    const year = this._selectedDate.getFullYear();
    return { month, year };
  }

  get allDocuments() {
    return this._documents;
  }

  get allUploadedDocuments() {
    return this._uploadedDocuments;
  }

  get allNotValidDocuments() {
    return this._notValidDocumentsIds;
  }

  updateDate = (newDate: Date) => {
    this._selectedDate = newDate;
  };

  addUploadedDocuments(files: File[]) {
    this._uploadedDocuments.push(...files.map((file, index) => ({ id: this._uploadedDocuments.length + index, file })));
  }

  deleteUploadedDocument(fileId: number) {
    this._uploadedDocuments = this._uploadedDocuments.filter(({ id }) => id !== fileId);
    this._notValidDocumentsIds = this._notValidDocumentsIds.filter((id) => id !== fileId);
  }

  addNotValidDocumentsId(fileId: number) {
    this._notValidDocumentsIds.push(fileId);
  }

  initialize({
    documents,
    uploadedDocuments,
    notValidDocumentsIds,
  }: {
    uploadedDocuments: UploadedDocumentsProps
    documents: DocumentsProps,
    notValidDocumentsIds: number[]
  }) {
    this._documents = documents;
    this._uploadedDocuments = uploadedDocuments;
    this._notValidDocumentsIds = notValidDocumentsIds;
  }
}
