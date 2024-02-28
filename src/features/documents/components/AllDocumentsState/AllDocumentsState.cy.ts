import { AllDocumentsState } from './AllDocumentsState';

const allDocumentsState = new AllDocumentsState();

describe('AllDocumentsState', () => {
  it(`
  GIVEN one uploaded documents
  WHEN upload documents
  THEN return array with one uploaded document
  `, () => {
    const testFile = new File([''], 'filename.pdf', { type: 'application/pdf' });

    allDocumentsState.addUploadedDocuments([testFile]);

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN two uploaded documents
  WHEN upload documents
  THEN return array with two uploaded documents
  `, () => {
    allDocumentsState.initialize({
      uploadedDocuments: [],
    });

    const firstTestFile = new File([''], 'FirstFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'SecondFile.pdf', { type: 'application/pdf' });

    allDocumentsState.addUploadedDocuments([firstTestFile, secondTestFile]);

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(2);
  });

  it(`
  GIVEN empty uploaded and not valid documents 
  WHEN delete uploaded documents
  THEN uploaded and not valid document is empty
  `, () => {
    const testFile = {
      id: 1,
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    allDocumentsState.initialize({
      uploadedDocuments: [testFile],
      notValidDocumentsIds: [1],
    });

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(1);

    allDocumentsState.deleteUploadedDocument(testFile.id);

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(0);

    expect(allDocumentsState.allNotValidDocuments).to.has.lengthOf(0);
  });

  it(`
  GIVEN one not valid documents
  WHEN uploaded not valid documents
  THEN return array with one not valid document
  `, () => {
    const testId = 1;

    allDocumentsState.addNotValidDocumentsId(testId);

    expect(allDocumentsState.allNotValidDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN uploaded documents page 
  WHEN clear uploaded documents
  THEN return empty uploaded documents array
  `, () => {
    const testFile = {
      id: 1,
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    allDocumentsState.initialize({
      uploadedDocuments: [testFile],
    });

    allDocumentsState.clearUploadedDocuments();

    expect(allDocumentsState.allUploadedDocuments).to.has.lengthOf(0);
  });

  it(`
  GIVEN 'isSent' equal true 
  WHEN use method 'setIsSent'
  THEN value 'isSent' changed
  `, () => {
    allDocumentsState.setIsSent(true);

    expect(allDocumentsState.isSent).to.eq(true);
  });
});
