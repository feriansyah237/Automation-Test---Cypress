import checkAddres from "../../support/pageObject/check-addres"

describe('Testing Procced to checkout until finish', () => {
  beforeEach(() => {
    
    cy.visit('/')
    cy.get('.panel > .header > .authorization-link > a').click()
    cy.get('.base').should('have.text', 'Customer Login')
    cy.get('#email').type('ramee2711@gmail.com')
    cy.get('#pass').type('Ayam2711!')
    cy.get('#send2').click()
    cy.get(':nth-child(2) > .greet > .logged-in').should('have.text', 'Welcome, Ramee El Noodle!')
  })
  
  it('Checkout use same existing addres for shipping and payment', () => {
    //choose product
    cy.addProduct()
    //showcart
    cy.get('.showcart').click()
    //cy.get('.toggle').click()

    //navigate to shopping chart page
    cy.get(':nth-child(7) > .secondary > .action > span').click()
    cy.get('.base').should('have.text', 'Shopping Cart')
    cy.get('.item > .product-item-details > .product-item-name > a').should('have.text', 'Tristan Endurance Tank')

    //proceed to checkout
    cy.get('.checkout-methods-items > :nth-child(1) > .action').click()

    //choose shipping addres and method
    cy.get('[class="step-title"]').should('include.text', 'Shipping Address')
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click()
    cy.get('.button').click()

    //review and payment
    cy.get('.payment-group > .step-title').should('have.text', 'Payment Method')
    checkAddres.getAddres('751 River Drive, Copperas Cove, TX 76522')
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click()

    //verify if checkout already succes
    cy.get('.base').should('have.text', 'Thank you for your purchase!')
  })

  it('Checkout use other existing addres for shipping and payment', () => {
    //choose product
    cy.addProduct()
    //showcart
    cy.get('.showcart').click()
    //cy.get('.toggle').click()

    //navigate to shopping chart page
    
    cy.get(':nth-child(7) > .secondary > .action > span').click()
    cy.get('.base').should('have.text', 'Shopping Cart')
    cy.get('.item > .product-item-details > .product-item-name > a').should('have.text', 'Tristan Endurance Tank')

    //proceed to checkout
    cy.get('.checkout-methods-items > :nth-child(1) > .action').click() //click button checkout
    

    //choose shipping addres and method
    cy.get('[class="step-title"]').should('include.text', 'Shipping Address')
    cy.get('[class="action action-select-shipping-item"]').click() // choose other addres
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click()
    cy.get('.button').click()

    //review and payment
    cy.get('.payment-group > .step-title').should('have.text', 'Payment Method')
    checkAddres.getAddres('2 Roosevelt St., Dickinson, TX 77539')
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click()

    //verify if checkout already succes
    cy.get('.base').should('have.text', 'Thank you for your purchase!')
  })

  it('Checkout with new shipping addres without Company', () => {
    cy.addProduct()
    cy.get('.showcart').click()
    //cy.get('.toggle').click()

    //navigate to shopping chart page
    cy.get(':nth-child(7) > .secondary > .action > span').click()
    cy.get('.base').should('have.text', 'Shopping Cart')
    //cy.get('.item > .product-item-details > .product-item-name > a').should('have.text', 'Tristan Endurance Tank')
    cy.get('.checkout-methods-items > :nth-child(1) > .action').click()
    

    //Add new Address and check out
    cy.get('.new-address-popup > .action').click()
    cy.fixture('addres.json').then((addres) => {
    const dataAddres = addres[2];
    cy.inputAddres(dataAddres.cmpny, dataAddres.street1, dataAddres.street2, dataAddres.street3, dataAddres.city, dataAddres.regionid, dataAddres.postcode, dataAddres.country, dataAddres.telephone)
    cy.get('#shipping-save-in-address-book').click() //to uncheck save addres
    cy.get('[class="action primary action-save-address"]').click()
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click()
    cy.get('.button').click()
    })

    //review and payment
    cy.get('.payment-group > .step-title').should('have.text', 'Payment Method')
    checkAddres.getAddres('643 Bridge Rd., Houston, TX 77089')
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click()

    //verify if checkout already succes
    cy.get('.base').should('have.text', 'Thank you for your purchase!')

  })

  it('Checkout with new shipping addres without Addres', () => {
    cy.addProduct()
    cy.get('.showcart').click()
    //cy.get('.toggle').click()
    
    //navigate to shopping chart page
    cy.get(':nth-child(7) > .secondary > .action > span').click()
    cy.get('.base').should('have.text', 'Shopping Cart')
    //cy.get('.item > .product-item-details > .product-item-name > a').should('have.text', 'Tristan Endurance Tank')
    cy.get('.checkout-methods-items > :nth-child(1) > .action').click()

    //Add new Address and check out
    cy.get('.new-address-popup > .action').click()
    cy.fixture('addres.json').then((addres) => {
    const dataAddres = addres[3];
    cy.inputAddres(dataAddres.cmpny, dataAddres.street1, dataAddres.street2, dataAddres.street3, dataAddres.city, dataAddres.regionid, dataAddres.postcode, dataAddres.country, dataAddres.telephone)
    cy.get('#shipping-save-in-address-book').click() //to uncheck save addres
    cy.get('[class="field-error"]').should('include.text', 'This is a required field.')

    })

  })

})
