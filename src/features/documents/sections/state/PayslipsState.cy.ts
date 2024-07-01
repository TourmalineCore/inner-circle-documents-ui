import { PayslipsState } from './PayslipsState';

describe('PayslipsState', () => {
  it(`
  GIVEN one uploaded payslip
  WHEN upload payslip
  THEN return array with one uploaded payslip
  `, () => {
    const payslipsState = new PayslipsState();

    const testFile = new File([''], 'filename.pdf', { type: 'application/pdf' });

    payslipsState.addUploadedPayslips([testFile]);

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(1);
  });

  it(`
  GIVEN two uploaded payslips
  WHEN upload payslips
  THEN return array with two uploaded payslips
  `, () => {
    const payslipsState = new PayslipsState();

    const firstTestFile = new File([''], 'FirstFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'SecondFile.pdf', { type: 'application/pdf' });

    payslipsState.addUploadedPayslips([firstTestFile, secondTestFile]);

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(2);
  });

  it(`
  GIVEN empty uploaded and not valid payslip
  WHEN delete uploaded payslip
  THEN uploaded and not valid payslip is empty
  `, () => {
    const payslipsState = new PayslipsState();

    payslipsState.addUploadedPayslips([new File([''], 'testFile.pdf', { type: 'application/pdf' })]);

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(1);

    payslipsState.deleteUploadedPayslip(payslipsState.allUploadedPayslips[0].id);

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(0);

    expect(payslipsState.allNotValidPayslips).to.has.lengthOf(0);
  });

  it(`
  GIVEN one not valid payslip
  WHEN uploaded not valid payslip
  THEN return array with one not valid payslip
  `, () => {
    const payslipsState = new PayslipsState();

    const testId = 'abc1';

    payslipsState.addNotValidPayslipsId(testId);

    expect(payslipsState.allNotValidPayslips).to.has.lengthOf(1);
  });

  it(`
  GIVEN uploaded payslips page 
  WHEN clear uploaded payslips
  THEN return empty uploaded payslips array
  `, () => {
    const payslipsState = new PayslipsState();

    const testFile = {
      id: 'abc1',
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    payslipsState.addUploadedPayslips([testFile.file]);

    payslipsState.clearUploadedPayslips();

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(0);
  });

  it(`
  GIVEN 'isSent' equal true 
  WHEN use method 'setIsSent'
  THEN value 'isSent' changed
  `, () => {
    const payslipsState = new PayslipsState();

    payslipsState.setIsSent(true);

    expect(payslipsState.isSent).to.eq(true);
  });

  it(`
  GIVEN three uploaded payslips
  WHEN upload payslips
  THEN return array with this uploaded payslips in asc order
  `, () => {
    const payslipsState = new PayslipsState();

    const firstTestFile = new File([''], 'aFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'bFile.pdf', { type: 'application/pdf' });
    const thirdTestFile = new File([''], 'cFile.pdf', { type: 'application/pdf' });

    payslipsState.addUploadedPayslips([thirdTestFile, firstTestFile, secondTestFile]);

    expect(payslipsState.allUploadedPayslips[0].file.name).to.eq(firstTestFile.name);
    expect(payslipsState.allUploadedPayslips[1].file.name).to.eq(secondTestFile.name);
    expect(payslipsState.allUploadedPayslips[2].file.name).to.eq(thirdTestFile.name);
  });

  it(`
  GIVEN two uploaded payslips
  WHEN upload this two payslips
  AND after upload another one payslip
  THEN return array with this uploaded payslips in asc order
  `, () => {
    const payslipsState = new PayslipsState();

    const firstTestFile = new File([''], 'aFile.pdf', { type: 'application/pdf' });
    const secondTestFile = new File([''], 'bFile.pdf', { type: 'application/pdf' });
    const thirdTestFile = new File([''], 'cFile.pdf', { type: 'application/pdf' });

    payslipsState.addUploadedPayslips([thirdTestFile, secondTestFile]);

    payslipsState.addUploadedPayslips([firstTestFile]);

    expect(payslipsState.allUploadedPayslips[0].file.name).to.eq(firstTestFile.name);
    expect(payslipsState.allUploadedPayslips[1].file.name).to.eq(secondTestFile.name);
    expect(payslipsState.allUploadedPayslips[2].file.name).to.eq(thirdTestFile.name);
  });

  it(`
  GIVEN one uploaded payslip
  WHEN upload this payslip
  AND it is invalid
  THEN return disable send button
  `, () => {
    const payslipsState = new PayslipsState();

    const testFile = {
      id: 'abc1',
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    payslipsState.addNotValidPayslipsId(testFile.id);

    expect(payslipsState.isSendButtonDisabled).to.eq(true);
  });

  it(`
  GIVEN one uploaded payslip
  WHEN upload this payslip
  AND it is invalid
  THEN return disable send button
  `, () => {
    const payslipsState = new PayslipsState();

    const testFile = {
      id: 'abc1',
      file: new File([''], 'testFile.pdf', { type: 'application/pdf' }),
    };

    payslipsState.addUploadedPayslips([testFile.file]);

    expect(payslipsState.isSendButtonDisabled).to.eq(false);
  });
});
