import { AllDocumentsState } from './AllDocumentsState';

const allDocumentsState = new AllDocumentsState();

describe('AllDocumentsState', () => {
  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN get current date
    `, () => {
    const currentDate = new Date();

    expect(allDocumentsState.monthYearDate.month).eq(currentDate.getMonth() + 1);
    expect(allDocumentsState.monthYearDate.year).eq(currentDate.getFullYear());
  });

  it(`
  GIVEN documents page 
  WHEN called update date
  THEN get value filter
  `, () => {
    const currentDate = new Date('2023-10-01T05:00:00Z');

    allDocumentsState.updateDate(currentDate);
    expect(allDocumentsState.monthYearDate.month).eq(currentDate.getMonth() + 1);
    expect(allDocumentsState.monthYearDate.year).eq(currentDate.getFullYear());
  });

  it(`
  GIVEN documents page 
  WHEN initialized
  THEN return all documents
  `, () => {
    allDocumentsState.initialize({
      documents: [{
        id: 1,
        name: 'Ivanov I.I',
        date: new Date(),
        previewLink: '',
        downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
      }],
      uploadedDocuments: [],
      notValidDocumentsIds: [],
    });

    expect(allDocumentsState.allDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN documents page 
  WHEN upload documents
  THEN return all uploaded documents
  `, () => {
    const testFile = new File([''], 'filename.pdf', { type: 'application/pdf' });

    allDocumentsState.addUploadedDocuments([testFile]);

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN uploaded documents page 
  WHEN upload documents
  THEN return all uploaded documents
  `, () => {
    allDocumentsState.initialize({
      documents: [],
      uploadedDocuments: [],
      notValidDocumentsIds: [],
    });

    const firstTestFile = new File([''], 'FirstFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'SecondFile.pdf', { type: 'application/pdf' });

    allDocumentsState.addUploadedDocuments([firstTestFile, secondTestFile]);

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(2);
  });

  it(`
  GIVEN uploaded documents page 
  WHEN delete uploaded documents
  THEN uploaded and not valid document deleted
  `, () => {
    const testFile = {
      id: 1,
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    allDocumentsState.initialize({
      documents: [],
      uploadedDocuments: [testFile],
      notValidDocumentsIds: [1],
    });

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(1);

    allDocumentsState.deleteUploadedDocument(testFile.id);

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(0);

    expect(allDocumentsState.allNotValidDocuments).to.has.lengthOf(0);
  });

  it(`
  GIVEN uploaded documents page 
  WHEN uploaded not valid documents
  THEN return not valid documents
  `, () => {
    const testId = 1;

    allDocumentsState.addNotValidDocumentsId(testId);

    expect(allDocumentsState.allNotValidDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN uploaded documents page 
  WHEN clear uploaded documents
  THEN return empty uploaded documents list
  `, () => {
    const testFile = {
      id: 1,
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    allDocumentsState.initialize({
      documents: [],
      uploadedDocuments: [testFile],
      notValidDocumentsIds: [],
    });

    allDocumentsState.clearUploadedDocuments();

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(0);
  });
});
