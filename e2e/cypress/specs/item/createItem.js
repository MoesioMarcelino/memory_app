// https://docs.cypress.io/api/introduction/api.html

describe("Create task", () => {
  const key1 = `key1${Date.now()}`;
  const key2 = `key2${Date.now()}`;
  const value1 = `value1${Date.now()}`;
  const tagName1 = `firstTag${Date.now()}`
  const tagName2 = `secondTag${Date.now()}`

  beforeEach(() => {
    cy.login()
    cy.createTag(tagName1);
    cy.visit('/')
    cy.get('[data-cy=home__add_item_button]').click();
  });
  after(() => {
    cy.deleteTestData()
  });
  describe('When fill data properly', () => {
    beforeEach(() => {
      cy.get('[data-cy=item_modal__key_input]').type(key1);
      cy.get('[data-cy=item_modal__value_input]').type(value1);
      cy.get('[data-cy=item_modal__confirm_button]').click();
    });

    it("Should contains formated key: value", () => {
      cy.contains(`${key1}: ${value1}`);
    });
  });

  describe('When fill data not properly (repeated key)', () => {
    beforeEach(() => {
      cy.get('[data-cy=item_modal__key_input]').type(key1);
      cy.get('[data-cy=item_modal__value_input]').type(value1);
      cy.get('[data-cy=item_modal__confirm_button]').click();
    });

    it("Should has error for invalid key", () => {
      cy.get('[data-cy=item_modal__error_message]').should("exist");
    });
  });

  describe('When use tags', () => {
    it("Should contains tags", () => {
      cy.get('[data-cy=item_modal__key_input]').type(key2);
      cy.get('[data-cy=item_modal__value_input]').type(value1);
      cy.get('[data-cy=item_modal__tag_autocomplete]').type(tagName1);
      cy.get('.dropdown-item').click();
      cy.get(`[data-cy=item_modal__tag_spam_${tagName1}]`).should('exist')

      cy.get('[data-cy=item_modal__confirm_button]').click();

      cy.get(`[data-cy=show_item__edit_button_${key2}]`).click();
      cy.get(`[data-cy=item_modal__tag_spam_${tagName1}]`).should('exist')
    });
  });
});
