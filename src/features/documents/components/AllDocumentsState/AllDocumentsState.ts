import { makeAutoObservable } from 'mobx';
import { DocumentsProps, UploadedDocumentsProps } from '../types';

export class AllDocumentsState {
  private _selectedDate: Date = new Date();

  private _documents: DocumentsProps = [];

  private _uploadedDocuments: UploadedDocumentsProps = [];

  private _notValidDocuments: number[] = [];

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
    return this._notValidDocuments;
  }

  updateDate = (newDate: Date) => {
    this._selectedDate = newDate;
  };

  addUploadedDocuments(files: File[]) {
    this._uploadedDocuments.push(...files.map((file, index) => ({ id: this._uploadedDocuments.length + index, file })));
  }

  deleteUploadedDocument(fileId: number) {
    this._uploadedDocuments = this._uploadedDocuments.filter(({ id }) => id !== fileId);
    this._notValidDocuments = this._notValidDocuments.filter((id) => id !== fileId);
  }

  addNotValidDocuments(fileId: number) {
    this._notValidDocuments.push(fileId);
  }

  initialize({
    documents,
    uploadedDocuments,
    notValidDocuments,
  }: {
    uploadedDocuments: UploadedDocumentsProps
    documents: DocumentsProps,
    notValidDocuments: number[]
  }) {
    this._documents = documents;
    this._uploadedDocuments = uploadedDocuments;
    this._notValidDocuments = notValidDocuments;
  }
}
