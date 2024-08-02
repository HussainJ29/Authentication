describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/'); // Ensure the page is loaded before each test
  });

  it('should display an error if fields are empty', () => {
    cy.get('button').contains('Sign in').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please fill all the fields');
    });
  });

  it('should display an error for invalid credentials', () => {
    cy.get('input[placeholder="Email Address"]').type('invalid@example.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button').contains('Sign in').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect Credentials');
    });
  });

  it('should login successfully with correct credentials', () => {
    cy.intercept('POST', '/api/login', { fixture: 'login.json' }).as('loginRequest');

    cy.get('input[placeholder="Email Address"]').type('validuser@example.com');
    cy.get('input[placeholder="Password"]').type('validpassword');
    cy.get('button').contains('Sign in').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Login Successful');
    });

    cy.url().should('include', '/user');
  });

});
