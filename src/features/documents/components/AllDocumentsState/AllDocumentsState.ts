import { makeAutoObservable } from 'mobx';
import { DocumentsProps } from '../types';

export class AllDocumentsState {
  private _selectedDate: Date = new Date();

  private _documents: DocumentsProps = [];

  private _uploadedDocuments: File[] = [];

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

  updateDate = (newDate: Date) => {
    this._selectedDate = newDate;
  };

  addUploadedDocuments(files: File[]) {
    this._uploadedDocuments.push(...files);
  }

  deleteUploadedDocument(fileName: string) {
    this._uploadedDocuments = this._uploadedDocuments.filter(({ name }) => name !== fileName);
  }

  initialize({
    documents,
    uploadedDocuments,
  }: {
    uploadedDocuments: File[]
    documents: DocumentsProps,
  }) {
    this._documents = documents;
    this._uploadedDocuments = uploadedDocuments;
  }
}
