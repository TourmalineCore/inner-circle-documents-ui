import { makeAutoObservable } from 'mobx';
import { DocumentsProps } from '../types';

export class AllDocumentsState {
  private _selectedDate: Date = new Date();

  private _documents: DocumentsProps = [];

  private _uploadedDocuments: File[] = [];

  private _notValidDocuments: File[] = [];

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
    this._uploadedDocuments.push(...files);
  }

  deleteUploadedDocument(fileName: string) {
    this._uploadedDocuments = this._uploadedDocuments.filter(({ name }) => name !== fileName);
    this._notValidDocuments = this._notValidDocuments.filter(({ name }) => name !== fileName);
  }

  addNotValidDocuments(file: File) {
    this._notValidDocuments.push(file);
  }

  initialize({
    documents,
    uploadedDocuments,
    notValidDocuments,
  }: {
    uploadedDocuments: File[]
    documents: DocumentsProps,
    notValidDocuments: File[]
  }) {
    this._documents = documents;
    this._uploadedDocuments = uploadedDocuments;
    this._notValidDocuments = notValidDocuments;
  }
}
