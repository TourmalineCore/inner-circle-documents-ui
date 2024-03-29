import { makeAutoObservable } from 'mobx';
import { UploadedDocumentsProps } from '../types';

export class AllDocumentsState {
  private _uploadedDocuments: UploadedDocumentsProps = [];

  private _notValidDocumentsIds: number[] = [];

  private _isSent: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get allUploadedDocuments() {
    return [...this._uploadedDocuments].sort((a, b) => (a.file.name[2] < b.file.name[2] ? 1 : -1));
  }

  get allNotValidDocuments() {
    return this._notValidDocumentsIds;
  }

  get isSent() {
    return this._isSent;
  }

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

  setIsSent(value: boolean) {
    this._isSent = value;
  }

  initialize({
    uploadedDocuments = [],
    notValidDocumentsIds = [],
  }: {
    uploadedDocuments?: UploadedDocumentsProps
    notValidDocumentsIds?: number[]
  }) {
    this._uploadedDocuments = uploadedDocuments;
    this._notValidDocumentsIds = notValidDocumentsIds;
  }
}
