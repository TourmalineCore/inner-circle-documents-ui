import '../../../../../../cypress/support/commands';
import { AllDocumentsState } from './AllDocumentsState';

const allDocumentsState = new AllDocumentsState();

describe('AllDocumentsState', () => {
  it(`
    GIVEN all documents page 
    WHEN visit documents page
    THEN get current date
    `, () => {
    const currentDate = new Date();

    expect(allDocumentsState.monthYearDate.month).eq(currentDate.getMonth() + 1);
    expect(allDocumentsState.monthYearDate.year).eq(currentDate.getFullYear());
  });

  it(`
  GIVEN all documents page 
  WHEN called update date
  THEN get value filter
  `, () => {
    const currentDate = new Date('2023-10-01T05:00:00Z');

    allDocumentsState.updateDate(currentDate);
    expect(allDocumentsState.monthYearDate.month).eq(currentDate.getMonth() + 1);
    expect(allDocumentsState.monthYearDate.year).eq(currentDate.getFullYear());
  });
});
