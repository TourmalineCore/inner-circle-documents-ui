import { DocumentsState } from './DocumentsState';

describe('DocumentsState', () => {
  it(`
  GIVEN one uploaded documents
  WHEN upload documents
  THEN return array with one uploaded document
  `, () => {
    const documentsState = new DocumentsState();

    const testFile = new File([''], 'filename.pdf', { type: 'application/pdf' });

    documentsState.addUploadedDocuments([testFile]);

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN two uploaded documents
  WHEN upload documents
  THEN return array with two uploaded documents
  `, () => {
    const documentsState = new DocumentsState();

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
    const documentsState = new DocumentsState();

    documentsState.addUploadedDocuments([new File([''], 'testFile.pdf', { type: 'application/pdf' })]);

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(1);

    documentsState.deleteUploadedDocument(documentsState.allUploadedDocuments[0].id);

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(0);

    expect(documentsState.allNotValidDocuments).to.has.lengthOf(0);
  });

  it(`
  GIVEN one not valid documents
  WHEN uploaded not valid documents
  THEN return array with one not valid document
  `, () => {
    const documentsState = new DocumentsState();

    const testId = 'abc1';

    documentsState.addNotValidDocumentsId(testId);

    expect(documentsState.allNotValidDocuments).to.has.lengthOf(1);
  });

  it(`
  GIVEN uploaded documents page 
  WHEN clear uploaded documents
  THEN return empty uploaded documents array
  `, () => {
    const documentsState = new DocumentsState();

    const testFile = {
      id: 1,
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    documentsState.addUploadedDocuments([testFile.file]);

    documentsState.clearUploadedDocuments();

    expect(documentsState.allUploadedDocuments).to.has.lengthOf(0);
  });

  it(`
  GIVEN 'isSent' equal true 
  WHEN use method 'setIsSent'
  THEN value 'isSent' changed
  `, () => {
    const documentsState = new DocumentsState();

    documentsState.setIsSent(true);

    expect(documentsState.isSent).to.eq(true);
  });

  it(`
    GIVEN three uploaded documents
    WHEN upload documents
    THEN return array with this uploaded documents in asc order
    `, () => {
    const documentsState = new DocumentsState();

    const firstTestFile = new File([''], 'aFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'bFile.pdf', { type: 'application/pdf' });
    const thirdTestFile = new File([''], 'cFile.pdf', { type: 'application/pdf' });

    documentsState.addUploadedDocuments([thirdTestFile, firstTestFile, secondTestFile]);

    expect(documentsState.allUploadedDocuments[0].file.name).to.eq(firstTestFile.name);
    expect(documentsState.allUploadedDocuments[1].file.name).to.eq(secondTestFile.name);
    expect(documentsState.allUploadedDocuments[2].file.name).to.eq(thirdTestFile.name);
  });

  it(`
    GIVEN two uploaded documents
    WHEN upload this two documents
    AND after upload another one document
    THEN return array with this uploaded documents in asc order
    `, () => {
    const documentsState = new DocumentsState();

    const firstTestFile = new File([''], 'aFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'bFile.pdf', { type: 'application/pdf' });
    const thirdTestFile = new File([''], 'cFile.pdf', { type: 'application/pdf' });

    documentsState.addUploadedDocuments([thirdTestFile, secondTestFile]);

    documentsState.addUploadedDocuments([firstTestFile]);

    expect(documentsState.allUploadedDocuments[0].file.name).to.eq(firstTestFile.name);
    expect(documentsState.allUploadedDocuments[1].file.name).to.eq(secondTestFile.name);
    expect(documentsState.allUploadedDocuments[2].file.name).to.eq(thirdTestFile.name);
  });
});
