import { DocumentsState } from './DocumentsState';

const documentsState = new DocumentsState();

describe('DocumentsState', () => {
  it(`
  GIVEN one uploaded documents
  WHEN upload documents
  THEN return array with one uploaded document
  `, () => {
    const testFile = new File([''], 'filename.pdf', { type: 'application/pdf' });

    documentsState.addUploadedDocuments([testFile]);

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN two uploaded documents
  WHEN upload documents
  THEN return array with two uploaded documents
  `, () => {
    documentsState.initialize({
      uploadedDocuments: [],
    });

    const firstTestFile = new File([''], 'FirstFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'SecondFile.pdf', { type: 'application/pdf' });

    documentsState.addUploadedDocuments([firstTestFile, secondTestFile]);

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(2);
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

    documentsState.initialize({
      uploadedDocuments: [testFile],
      notValidDocumentsIds: [1],
    });

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(1);

    documentsState.deleteUploadedDocument(testFile.id);

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(0);

    expect(documentsState.allNotValidDocuments).to.has.lengthOf(0);
  });

  it(`
  GIVEN one not valid documents
  WHEN uploaded not valid documents
  THEN return array with one not valid document
  `, () => {
    const testId = 1;

    documentsState.addNotValidDocumentsId(testId);

    expect(documentsState.allNotValidDocuments).to.has.lengthOf(1);
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

    documentsState.initialize({
      uploadedDocuments: [testFile],
    });

    documentsState.clearUploadedDocuments();

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(0);
  });

  it(`
  GIVEN 'isSent' equal true 
  WHEN use method 'setIsSent'
  THEN value 'isSent' changed
  `, () => {
    documentsState.setIsSent(true);

    expect(documentsState.isSent).to.eq(true);
  });
});
