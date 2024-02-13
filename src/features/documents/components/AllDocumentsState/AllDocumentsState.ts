import { makeAutoObservable } from 'mobx';
import { DocumentsProps } from '../types';

export class AllDocumentsState {
  private _selectedDate: Date = new Date();

  private _documents: DocumentsProps = [];

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

  updateDate = (newDate: Date) => {
    this._selectedDate = newDate;
  };

  initialize({
    documents,
  }: {
    documents: DocumentsProps,
  }) {
    this._documents = documents;
  }
}
