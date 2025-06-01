
describe('API Requests', () => {

    const mockQuestion = [
        {
        "question": "Test question",
        "answers": [
          { "text": "T", "isCorrect": false },
          { "text": "e", "isCorrect": true },
          { "text": "s", "isCorrect": false },
          { "text": "t", "isCorrect": false }
        ]
      }
    ]

    it('should GET quiz questions and load the quiz when the start quiz button is pressed.', () => {
        cy.intercept('GET', '/api/questions/random', mockQuestion).as('getQuestions')
        cy.visit('/')
    
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions')
            .its('response.body')
            .should('deep.equal', mockQuestion)
        // after button is clicked, intercept this route '/api/questions/random' and make sure it gets questions
        // might fail because its only getting 10 random questions instead of whole thing
      })
})