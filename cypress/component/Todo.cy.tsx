import Todo from '../../src/components/Todo';
import { mount } from 'cypress/react';
import '../../src/app/globals.css'

describe('Test for checking todo component', () => {
  it('Checks the length of todo list after adding a new todo', () => {
      mount(<Todo />)

      // Test to add 2 todos
      const todoMsg1 = 'This is the first todo';
      const todoMsg2 = 'This is the second todo';
      cy.get('.todo-container .input-container input').type(todoMsg1)
      cy.get('button[type="submit"]').click()
      cy.get('.todo-container .input-container input').type(todoMsg2)
      cy.get('button[type="submit"]').click()
      cy.get('.todo-list .todo-item-row').should('have.lengthOf', 2)

      // Test 'mark as done'
      cy.get('button').contains('Done').click()
      cy.get('.todo-list .todo-item-row span').contains(todoMsg1).should('have.class', 'line-through')

      // Test to remove the first todo
      cy.get('.todo-list .todo-item-row button').contains('Remove').click()
      cy.get('.todo-list .todo-item-row').should('have.lengthOf', 1)
  })
})