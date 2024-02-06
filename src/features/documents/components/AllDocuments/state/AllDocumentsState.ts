import { makeAutoObservable } from 'mobx';

export class AllDocumentsState {
  private _selectedDate: Date = new Date();

  private _documents: string[] = [];

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

  updateDate(newDate: Date) {
    this._selectedDate = newDate;
  }

  initialize({
    documents,
  }: {
    documents: string[],
  }) {
    this._documents = documents;
  }
}
