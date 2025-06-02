describe('A user\'s journey through the application', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3001/');
  });

  it('should load the page with a Start Quiz button', () => {
    cy.contains('button', 'Start Quiz').should('be.visible');
  });

  it('should load the quiz with the first question when the Start Quiz button is clicked', () => {
    cy.contains('button', 'Start Quiz').click();

    cy.get('.card', { timeout: 10000 }).should('be.visible');
    cy.get('h2').should('be.visible').and('not.be.empty');
    cy.get('.card button').should('have.length.at.least', 4);
  });

  it('should load the next question after an answer is chosen', () => {
    cy.contains('button', 'Start Quiz').click();

    cy.get('h2').as('questionText');
    cy.get('@questionText').invoke('text').then((oldText) => {
      // You can refine this selector to be more specific if answer buttons have a class or attribute
      cy.get('.card button').first().click();

      cy.get('.card', { timeout: 10000 }).should('be.visible');
      cy.get('h2').should('be.visible').and('not.be.empty').invoke('text').should((newText) => {
        expect(newText).not.to.eq(oldText);
      });
    });
  });

  it('should end the quiz when all questions are answered', () => {
    cy.contains('button', 'Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('.card button').first().click();
    }

    cy.contains('h2', 'Quiz Completed', { timeout: 10000 }).should('be.visible');
    cy.get('.alert').should('contain.text', 'Your score:').and('be.visible');
    cy.contains('button', 'Take New Quiz').should('be.visible');
  });

  it('should display the user\'s score when the quiz is over', () => {
    cy.contains('button', 'Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('.card button').first().click();
    }

    cy.get('.alert')
      .should('be.visible')
      .invoke('text')
      .should((text) => {
        expect(text).to.match(/Your score: \d+\/\d+/);
      });
  });

  it('should start a new quiz when the "Take New Quiz" button is pressed', () => {
    cy.contains('button', 'Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('.card button').first().click();
    }

    cy.contains('button', 'Take New Quiz').click();

    cy.get('.card', { timeout: 10000 }).should('be.visible');
    cy.get('h2').should('be.visible').and('not.be.empty');
    cy.get('.card button').should('have.length.at.least', 4);
  });
});
