import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it(`
  GIVEN component DatePicker 
  WHEN visit a page that uses component DatePicker
  THEN render date picker component
  `, () => {
    mountComponent();

    cy.getByData('date-picker')
      .should('exist');
  });

  it(`
  GIVEN component DatePicker 
  WHEN visit a page that uses component DatePicker
  THEN render correct date
  `, () => {
    mountComponent();

    cy.getByData('date-picker-result')
      .should('have.text', 'October 2024');
  });

  it(`
  GIVEN component DatePicker  
  WHEN select month
  THEN call onChange functions
  `, () => {
    mountComponent();

    cy.getByData('date-picker-select')
      .click();

    cy.contains('Jan')
      .click();

    cy.get('@onChange')
      .should('have.been.calledOnce');
  });
});

function mountComponent() {
  const selectedDate = new Date('2024-10-01T05:00:00Z');
  const onChangeSpy = cy.spy().as('onChange');

  cy.mount(
    <DatePicker
      selectedDate={selectedDate}
      onChange={onChangeSpy}
    />,
  );
}
