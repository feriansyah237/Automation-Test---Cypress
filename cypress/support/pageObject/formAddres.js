class shippingAddres{
    fillcompany(cmpny){
        cy.get('[name="company"]').type(cmpny)
    }

    fillstreet1(street1){
        cy.get('[name="street[0]"]').type(street1)
    }

    fillstreet2(street2){
        cy.get('[name="street[1]"]').type(street2)
    }

    fillstreet3(street3){
        cy.get('[name="street[2]"]').type(street3)
    }

    fillcity(city){
        cy.get('[name="city"]').type(city)
    }

    selectRegion(regionid){ 
        cy.get('[name="region_id"]').select(regionid)
    }

    fillpostcode(postcode){
        cy.get('[name="postcode"]').type(postcode)
    }

    fillcountry(country){
        cy.get('[name="country_id"]').select(country)
    }

    fillTelephone(telephone){
        cy.get('[name="telephone"]').type(telephone)
    }


}

export default new shippingAddres()