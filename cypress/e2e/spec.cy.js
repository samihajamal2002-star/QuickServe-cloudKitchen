describe('QuickServe Login Test', () => {
  it('should load login page successfully', () => {
    cy.visit('http://localhost:5173/login');
    cy.contains('Login').should('be.visible');
  });
});