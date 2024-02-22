import { makeAutoObservable } from 'mobx';
import { DocumentsProps, UploadedDocumentsProps } from '../types';
import { getMonthAndYear } from '../../../../common/utils/getMonthAndYear';

export class AllDocumentsState {
  private _selectedDate: Date | null = new Date();

  private _documents: DocumentsProps = [];

  private _uploadedDocuments: UploadedDocumentsProps = [];

  private _notValidDocumentsIds: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get selectedDate() {
    return this._selectedDate;
  }

  get allDocuments() {
    return this._selectedDate !== null
      ? this._documents.filter((document) => getMonthAndYear(document.date) === getMonthAndYear(this._selectedDate!))
      : [...this._documents].sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  get allUploadedDocuments() {
    return this._uploadedDocuments;
  }

  get allNotValidDocuments() {
    return this._notValidDocumentsIds;
  }

  updateDate = (newDate: Date | null) => {
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

  clearUploadedDocuments() {
    this._uploadedDocuments = [];
  }

  initialize({
    documents,
    uploadedDocuments = [],
    notValidDocumentsIds = [],
  }: {
    documents: DocumentsProps,
    uploadedDocuments?: UploadedDocumentsProps
    notValidDocumentsIds?: number[]
  }) {
    this._documents = documents;
    this._uploadedDocuments = uploadedDocuments;
    this._notValidDocumentsIds = notValidDocumentsIds;
  }
}
