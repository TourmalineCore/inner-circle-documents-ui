import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { validatePayslipsFileNames } from './validators/validatePayslipsFileNames';
import { matchDocumentsWithEmployees } from './validators/matchDocumentsWithEmployees';

export class DocumentsState {
  private _uploadedDocuments: {
    id: string;
    file: File;
  }[] = [];

  private _notValidDocumentsIds: string[] = [];

  private _employees: {
    lastName: string
  }[] = [];

  private _isSent: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initialize({
    employees,
  }: {
    employees: {
      lastName: string
    }[],
  }) {
    this._employees = employees;
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

  get documentIdsWithNonExistingEmployeeInFileName() {
    return validatePayslipsFileNames({
      payslipDocuments: this._uploadedDocuments,
      employees: this._employees,
    });
  }

  get documentIdsEmployeeMap() {
    return matchDocumentsWithEmployees({
      payslipDocuments: this._uploadedDocuments,
      employees: this._employees,
    });
  }

  addUploadedDocuments(files: File[]) {
    this
      ._uploadedDocuments
      .push(...files.map((file) => ({
        id: uuidv4(),
        file,
      })));
  }

  deleteUploadedDocument(fileId: string) {
    this._uploadedDocuments = this._uploadedDocuments.filter(({ id }) => id !== fileId);
    this._notValidDocumentsIds = this._notValidDocumentsIds.filter((id) => id !== fileId);
  }

  addNotValidDocumentsId(fileId: string) {
    this._notValidDocumentsIds.push(fileId);
  }

  clearUploadedDocuments() {
    this._uploadedDocuments = [];
  }

  setIsSent(value: boolean) {
    this._isSent = value;
  }
}
