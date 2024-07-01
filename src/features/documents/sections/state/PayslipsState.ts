import { makeAutoObservable } from 'mobx';
import { validatePayslipsFileNames } from './validators/validatePayslipsFileNames';
import { matchPayslipsWithEmployees } from './validators/matchPayslipsWithEmployees';

export class PayslipsState {
  private _uploadedPayslips: {
    id: string;
    file: File;
  }[] = [];

  private _notValidPayslipsIds: string[] = [];

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

  get allUploadedPayslips() {
    return [...this._uploadedPayslips].sort((a, b) => (a.file.name < b.file.name ? -1 : 1));
  }

  get allNotValidPayslips() {
    return this._notValidPayslipsIds;
  }

  get isSent() {
    return this._isSent;
  }

  get payslipIdsWithNonExistingEmployeeInFileName() {
    return validatePayslipsFileNames({
      payslips: this._uploadedPayslips,
      employees: this._employees,
    });
  }

  get payslipIdsEmployeeMap() {
    return matchPayslipsWithEmployees({
      payslips: this._uploadedPayslips,
      employees: this._employees,
    });
  }

  get isSendButtonDisabled() {
    const uploadedPayslipsIsEmpty = this.allUploadedPayslips.length === 0;
    const notValidDocumentsIsEmpty = this.allNotValidPayslips.length === 0;

    return !notValidDocumentsIsEmpty
    || this.isSent
      ? true
      : uploadedPayslipsIsEmpty;
  }

  addUploadedPayslips(files: File[]) {
    this
      ._uploadedPayslips
      .push(...files.map((file) => ({
        id: crypto.randomUUID(),
        file,
      })));
  }

  deleteUploadedPayslip(fileId: string) {
    this._uploadedPayslips = this._uploadedPayslips.filter(({ id }) => id !== fileId);
    this._notValidPayslipsIds = this._notValidPayslipsIds.filter((id) => id !== fileId);
  }

  addNotValidPayslipsId(fileId: string) {
    this._notValidPayslipsIds.push(fileId);
  }

  clearUploadedPayslips() {
    this._uploadedPayslips = [];
  }

  setIsSent(value: boolean) {
    this._isSent = value;
  }
}
