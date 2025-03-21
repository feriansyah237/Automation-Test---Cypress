class checkAddres{
    getAddres(getAddres){
        cy.get('.ship-to > .shipping-information-content').should('include.text', getAddres)
    }
}

export default new checkAddres()