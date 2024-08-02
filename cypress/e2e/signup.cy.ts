describe('Signup Flow', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });
  
    it('should display an error if fields are empty', () => {
      cy.get('button').contains('Sign up').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Full Name is required'); // Updated expected message
      });
    });
  
    it('should display an error for invalid email', () => {
      cy.get('input[placeholder="Full name"]').type('John Doe');
      cy.get('input[placeholder="Email Address"]').type('invalid-email');
      cy.get('input[placeholder="Phone no"]').type('+1234567890');
      cy.get('input[placeholder="Date of birth"]').type('2000-01-01');
      cy.get('input[placeholder="Password"]').type('Password1!');
      cy.get('input[placeholder="Confirm Password"]').type('Password1!');
      cy.get('button').contains('Sign up').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Email is not valid');
      });
    });
  
    it('should display an error if passwords do not match', () => {
      cy.get('input[placeholder="Full name"]').type('John Doe');
      cy.get('input[placeholder="Email Address"]').type('john@example.com');
      cy.get('input[placeholder="Phone no"]').type('+1234567890');
      cy.get('input[placeholder="Date of birth"]').type('2000-01-01');
      cy.get('input[placeholder="Password"]').type('Password1!');
      cy.get('input[placeholder="Confirm Password"]').type('Password2!');
      cy.get('button').contains('Sign up').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Password and Confirm Password do not match');
      });
    });
  
    it('should sign up successfully with valid details', () => {
      cy.get('input[placeholder="Full name"]').type('John Doe');
      cy.get('input[placeholder="Email Address"]').type('john@example.com');
      cy.get('input[placeholder="Phone no"]').type('+1234567890');
      cy.get('input[placeholder="Date of birth"]').type('2000-01-01');
      cy.get('input[placeholder="Password"]').type('Password1!');
      cy.get('input[placeholder="Confirm Password"]').type('Password1!');
      cy.get('button').contains('Sign up').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Signup Successful');
      });
  
      cy.url().should('include', '/'); // Check if redirected to login page
    });
  });
  