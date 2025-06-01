
describe('A users journey through the application', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3001/');
  });

  it('should load the page with a start quiz button', () => {
    cy.visit('/')

    cy.get('div').first().within(() => {
      cy.get('button').contains('Start Quiz').should('be.visible')
    })
  });

  it('should load the quiz with the first question when the start button is pressed', () => {
    cy.get('button').contains('Start Quiz').click();

    cy.get('.card').should('be.visible')
    cy.get('h2').should('be.visible').and('not.be.empty')
    cy.get('button').should('have.length.at.least', 4)
  });

  it('should load the next question after an answer is chosen', () => {
    cy.get('button').contains('Start Quiz').click();

    cy.get('h2').as('questionText')
    cy.get('@questionText').invoke('text').then((oldText) => {
      cy.get('button').first().click()

      cy.get('.card').should('be.visible')

      cy.get('h2').should('be.visible').and('not.be.empty').then(($newQuestion) => {
        expect($newQuestion.text()).to.not.equal(oldText) 
    })
    })

    cy.get('button').should('have.length.at.least', 4)
  });

  it('should end the quiz when all questions are answered', () => {
    
    cy.get('button').contains('Start Quiz').click();
    
    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
    }

    cy.get('h2').should('have.text', 'Quiz Completed').and('be.visible')
    cy.get('.alert').should('include.text', 'Your score:').and('be.visible')
    cy.get('button').should('have.text', 'Take New Quiz').and('be.visible')
  });

  it('should display the users score when the quiz is over', () => {
    
    cy.get('button').contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
    }

   
    cy.get('.alert')
      .should('be.visible')
      .invoke('text')
      .should((text) => {
        expect(text).to.match(/Your score: \d+\/\d+/);
      })

    
  });

  it('should start a new quiz when the take new quiz button is pressed', () => {

    cy.get('button').contains('Start Quiz').click();
    
    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
    }

    cy.get('button').should('have.text', 'Take New Quiz').click();

    cy.get('.card').should('be.visible')
    cy.get('h2').should('be.visible').and('not.be.empty')
    cy.get('button').should('have.length.at.least', 4)
  });
})